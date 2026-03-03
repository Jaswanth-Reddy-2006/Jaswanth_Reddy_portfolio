import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Torus, Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

interface ArmProps {
    position: [number, number, number];
    rotation: [number, number, number];
    isLeft: boolean;
    mouse: { x: number; y: number };
}

function MechaArm({ position, rotation, isLeft, mouse }: ArmProps) {
    const armRef = useRef<THREE.Group>(null);
    const forearmRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (armRef.current && forearmRef.current) {
            const t = state.clock.elapsedTime;
            // Idle movement
            armRef.current.rotation.z = rotation[2] + Math.sin(t * 1.5) * 0.1;

            // Reaction to mouse
            const dist = Math.sqrt(mouse.x ** 2 + mouse.y ** 2);
            if (dist < 0.5) {
                armRef.current.rotation.y = THREE.MathUtils.lerp(armRef.current.rotation.y, (isLeft ? 1 : -1) * 0.5, 0.1);
            } else {
                armRef.current.rotation.y = THREE.MathUtils.lerp(armRef.current.rotation.y, (isLeft ? 0.2 : -0.2), 0.05);
            }
        }
    });

    return (
        <group ref={armRef} position={position} rotation={rotation}>
            <mesh>
                <cylinderGeometry args={[0.08, 0.08, 0.5]} />
                <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
            </mesh>
            <Sphere position={[0, -0.25, 0]} args={[0.1, 16, 16]}>
                <meshStandardMaterial color="#990000" emissive="#990000" emissiveIntensity={0.5} />
            </Sphere>
            <group ref={forearmRef} position={[0, -0.5, 0]}>
                <mesh>
                    <cylinderGeometry args={[0.08, 0.06, 0.5]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
                <Box position={[0, -0.3, 0]} args={[0.15, 0.15, 0.15]}>
                    <meshStandardMaterial color="#990000" emissive="#990000" />
                </Box>
            </group>
        </group>
    );
}

interface LegProps {
    position: [number, number, number];
    rotation: [number, number, number];
}

function MechaLeg({ position, rotation }: LegProps) {
    const legRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (legRef.current) {
            const t = state.clock.elapsedTime;
            legRef.current.rotation.x = rotation[0] + Math.sin(t * 0.5) * 0.05;
        }
    });

    return (
        <group ref={legRef} position={position} rotation={rotation}>
            {/* Upper Leg */}
            <mesh>
                <cylinderGeometry args={[0.07, 0.05, 0.6]} />
                <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Joint */}
            <Sphere position={[0, -0.3, 0]} args={[0.08, 16, 16]}>
                <meshStandardMaterial color="#444" metalness={1} roughness={0.2} />
            </Sphere>
            {/* Lower Leg */}
            <group position={[0, -0.6, 0]}>
                <mesh>
                    <cylinderGeometry args={[0.05, 0.04, 0.6]} />
                    <meshStandardMaterial color="#111" metalness={0.8} />
                </mesh>
                {/* Foot/Base */}
                <Box position={[0, -0.3, 0.05]} args={[0.15, 0.05, 0.25]}>
                    <meshStandardMaterial color="#1a1a1a" metalness={1} />
                </Box>
            </group>
        </group>
    );
}

interface MechaBodyProps {
    mouse: { x: number; y: number };
    state: string;
}

function MechaBody({ mouse, state: mechaState }: MechaBodyProps) {
    const groupRef = useRef<THREE.Group>(null);
    const headRef = useRef<THREE.Group>(null);
    const leftEyeRef = useRef<THREE.Mesh>(null);
    const rightEyeRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (groupRef.current && headRef.current) {
            const t = state.clock.elapsedTime;
            groupRef.current.position.y = Math.sin(t) * 0.15;

            const targetRotationX = -mouse.y * 0.4;
            const targetRotationY = mouse.x * 0.5;
            headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotationX, 0.1);
            headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotationY, 0.1);
        }

        if (leftEyeRef.current && rightEyeRef.current) {
            let intensity = 2;
            if (mechaState === 'SCANNING') {
                intensity = 5 + Math.sin(state.clock.elapsedTime * 10) * 3;
            } else if (mechaState === 'SLEEP') {
                intensity = 0.2;
            }
            (leftEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
            (rightEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Main Torso */}
            <mesh>
                <boxGeometry args={[0.8, 1, 0.6]} />
                <meshStandardMaterial
                    color="#0a0a0a"
                    metalness={0.9}
                    roughness={0.1}
                    envMapIntensity={2}
                />
            </mesh>
            {/* Core Reactor */}
            <Sphere position={[0, 0, 0.31]} args={[0.2, 32, 32]}>
                <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={5} transparent opacity={0.8} />
            </Sphere>
            <Torus position={[0, 0, 0.31]} args={[0.25, 0.02, 16, 100]} rotation={[0, 0, 0]}>
                <meshStandardMaterial color="#cc0000" emissive="#ff0000" />
            </Torus>

            {/* Back Pack/Power Unit */}
            <Box position={[0, 0, -0.4]} args={[0.6, 0.8, 0.3]}>
                <meshStandardMaterial color="#1a1a1a" metalness={1} roughness={0.3} />
            </Box>

            {/* Head Unit */}
            <group ref={headRef} position={[0, 0.7, 0]}>
                <Box args={[0.6, 0.5, 0.5]}>
                    <meshStandardMaterial color="#111" metalness={1} roughness={0.05} />
                </Box>
                <mesh position={[0, 0, 0.26]}>
                    <planeGeometry args={[0.5, 0.3]} />
                    <meshStandardMaterial color="#000" metalness={1} roughness={0} />
                </mesh>
                <mesh ref={leftEyeRef} position={[-0.15, 0.05, 0.31]}>
                    <planeGeometry args={[0.1, 0.15]} />
                    <meshStandardMaterial color="#ff0000" emissive="#ff6666" emissiveIntensity={2} />
                </mesh>
                <mesh ref={rightEyeRef} position={[0.15, 0.05, 0.31]}>
                    <planeGeometry args={[0.1, 0.15]} />
                    <meshStandardMaterial color="#ff0000" emissive="#ff6666" emissiveIntensity={2} />
                </mesh>
                <mesh position={[0.2, 0.3, 0]}>
                    <cylinderGeometry args={[0.01, 0.01, 0.3]} />
                    <meshStandardMaterial color="#cc0000" />
                </mesh>
            </group>

            {/* Limbs */}
            <MechaArm position={[-0.5, 0.2, 0]} rotation={[0, 0.2, 0.5]} isLeft={true} mouse={mouse} />
            <MechaArm position={[0.5, 0.2, 0]} rotation={[0, -0.2, -0.5]} isLeft={false} mouse={mouse} />

            <MechaLeg position={[-0.25, -0.6, 0]} rotation={[0, 0, 0]} />
            <MechaLeg position={[0.25, -0.6, 0]} rotation={[0, 0, 0]} />
        </group>
    );
}

function HUDOverlay({ state }: { state: string }) {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute bottom-48 right-12 text-right pointer-events-none"
            >
                <div className="flex items-center gap-3 mb-2 bg-black/40 px-3 py-1 border-r-2 border-red-600">
                    <div className="flex flex-col text-right">
                        <span className="text-red-500 font-mono text-[8px] uppercase opacity-60">Status: {state}</span>
                        <span className="text-red-600 font-mono text-[10px] font-bold uppercase tracking-widest leading-tight">Khansaar_Sentinel_Unit</span>
                    </div>
                </div>
                <div className="flex justify-end gap-1">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ height: [4, 12, 4] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                            className="w-1 bg-red-600/50"
                        />
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default function MechaSentinel() {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [mechaState, setMechaState] = useState('IDLE');

    const handleMouseMove = (e: React.MouseEvent) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        setMouse({ x, y });
        if (Math.abs(x) > 0.8 || Math.abs(y) > 0.8) {
            setMechaState('SCANNING');
        } else {
            setMechaState('IDLE');
        }
    };

    const cycleState = () => {
        const states = ['IDLE', 'SCANNING', 'CALIBRATING', 'UPLINKING'];
        const next = states[(states.indexOf(mechaState) + 1) % states.length];
        setMechaState(next);
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            onClick={cycleState}
            className="fixed bottom-0 right-0 w-80 h-[30rem] z-40 cursor-crosshair group"
        >
            <HUDOverlay state={mechaState} />

            <Canvas dpr={[1, 2]} shadows>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={40} />
                <ambientLight intensity={0.4} />
                <pointLight position={[5, 5, 5]} intensity={1.5} color="#990000" castShadow />
                <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff0000" />

                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
                    <MechaBody mouse={mouse} state={mechaState} />
                </Float>

                <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[1, 1.2, 32]} />
                    <meshStandardMaterial color="#990000" transparent opacity={0.2} />
                </mesh>
            </Canvas>
        </div>
    );
}
