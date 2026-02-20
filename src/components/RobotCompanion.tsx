import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

interface RobotBodyProps {
    mouse: { x: number; y: number };
    emote: string | null;
}

function RobotBody({ mouse, emote }: RobotBodyProps) {
    const groupRef = useRef<THREE.Group>(null);
    const headRef = useRef<THREE.Group>(null);
    const leftEyeRef = useRef<THREE.Mesh>(null);
    const rightEyeRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (groupRef.current && headRef.current) {
            // Gentle floating animation
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;

            // Cursor tracking for head
            const targetRotationX = -mouse.y * 0.5;
            const targetRotationY = mouse.x * 0.5;

            headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotationX, 0.1);
            headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotationY, 0.1);
        }

        // Eye blinking/animation based on emote
        if (leftEyeRef.current && rightEyeRef.current) {
            if (emote === 'wink') {
                rightEyeRef.current.scale.y = 0.1;
                leftEyeRef.current.scale.y = 1;
            } else if (emote === 'smile' || emote === 'hi') {
                leftEyeRef.current.scale.y = 1.2;
                rightEyeRef.current.scale.y = 1.2;
            } else {
                const blink = Math.sin(state.clock.elapsedTime * 2) > 0.98 ? 0.1 : 1;
                leftEyeRef.current.scale.y = blink;
                rightEyeRef.current.scale.y = blink;
            }
        }
    });

    return (
        <group ref={groupRef}>
            {/* Torso */}
            <mesh position={[0, -0.5, 0]}>
                <boxGeometry args={[0.8, 0.8, 0.6]} />
                <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, -0.5, 0.31]}>
                <planeGeometry args={[0.5, 0.3]} />
                <meshStandardMaterial color="#4589ff" emissive="#4589ff" emissiveIntensity={2} />
            </mesh>

            {/* Head */}
            <group ref={headRef} position={[0, 0.3, 0]}>
                <mesh>
                    <boxGeometry args={[0.7, 0.6, 0.6]} />
                    <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.1} />
                </mesh>

                {/* Face Shield */}
                <mesh position={[0, 0, 0.26]}>
                    <planeGeometry args={[0.6, 0.45]} />
                    <meshStandardMaterial color="#000000" metalness={1} roughness={0} />
                </mesh>

                {/* Eyes */}
                <mesh ref={leftEyeRef} position={[-0.18, 0.05, 0.31]}>
                    <planeGeometry args={[0.1, 0.1]} />
                    <meshStandardMaterial color="#4589ff" emissive="#4589ff" emissiveIntensity={5} />
                </mesh>
                <mesh ref={rightEyeRef} position={[0.18, 0.05, 0.31]}>
                    <planeGeometry args={[0.1, 0.1]} />
                    <meshStandardMaterial color="#4589ff" emissive="#4589ff" emissiveIntensity={5} />
                </mesh>

                {/* Mouth */}
                <mesh position={[0, -0.12, 0.31]}>
                    {emote === 'smile' || emote === 'hi' ? (
                        <ringGeometry args={[0.08, 0.1, 32, 1, 0, Math.PI]} />
                    ) : (
                        <planeGeometry args={[0.2, 0.02]} />
                    )}
                    <meshStandardMaterial color="#4589ff" emissive="#4589ff" emissiveIntensity={2} />
                </mesh>
            </group>

            {/* Arms */}
            <mesh position={[-0.55, -0.4, 0]} rotation={[0, 0, 0.2]}>
                <cylinderGeometry args={[0.1, 0.1, 0.6]} />
                <meshStandardMaterial color="#222222" />
            </mesh>
            <mesh position={[0.55, -0.4, 0]} rotation={[0, 0, -0.2]}>
                <cylinderGeometry args={[0.1, 0.1, 0.6]} />
                <meshStandardMaterial color="#222222" />
            </mesh>
        </group>
    );
}

function InteractionOverlay({ emote }: { emote: string | null }) {
    return (
        <AnimatePresence>
            {emote && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    className="absolute bottom-40 right-10 bg-mutedBlue/20 backdrop-blur-md border border-mutedBlue/50 text-white px-4 py-2 rounded-2xl font-mono text-xs uppercase tracking-widest z-50 pointer-events-none"
                >
                    {emote === 'hi' ? 'HELO_WORLD' : emote.toUpperCase() + '_PROTOCOL'}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function RobotCompanion() {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [emote, setEmote] = useState<string | null>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        // Normalize coordinates to -1 to 1
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        setMouse({ x, y });
    };

    const triggerEmote = (type: string) => {
        setEmote(type);
        setTimeout(() => setEmote(null), 2000);
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            className="fixed bottom-0 right-0 w-64 h-80 z-40 group cursor-pointer"
            onClick={() => triggerEmote(['smile', 'hi', 'wink'][Math.floor(Math.random() * 3)])}
        >
            <InteractionOverlay emote={emote} />

            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={40} />
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} intensity={1} color="#4589ff" />
                <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff4545" />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <RobotBody mouse={mouse} emote={emote} />
                </Float>
            </Canvas>
        </div>
    );
}
