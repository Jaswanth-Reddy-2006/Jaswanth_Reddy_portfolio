import { useRef, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

function ResponsiveCamera() {
    const { camera, size } = useThree();
    useEffect(() => {
        if (camera instanceof THREE.PerspectiveCamera) {
            camera.fov = size.width < 768 ? 60 : 45;
            camera.position.z = size.width < 768 ? 15 : 10;
            camera.updateProjectionMatrix();
        }
    }, [size.width, camera]);
    return null;
}

function Megastructure({ position, rotation, scale }: { position: [number, number, number]; rotation: [number, number, number]; scale: number }) {
    return (
        <group position={position} rotation={rotation} scale={scale}>
            <mesh>
                <boxGeometry args={[4, 4, 1]} />
                <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} transparent opacity={0.6} />
            </mesh>
            <mesh position={[0, 0, 0.6]}>
                <boxGeometry args={[3.8, 3.8, 0.1]} />
                <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={0.2} wireframe />
            </mesh>
            <mesh position={[2, 2, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 3]} />
                <meshStandardMaterial color="#333" />
            </mesh>
        </group>
    );
}

function Scene3D({ progress }: { progress: any }) {
    const groupRef = useRef<THREE.Group>(null);

    const nodes = useMemo(() => {
        const count = 15;
        return Array.from({ length: count }).map(() => ({
            position: [
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 20 - 15
            ] as [number, number, number],
            scale: Math.random() * 1.5 + 0.5,
            rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number]
        }));
    }, []);

    const structures = useMemo(() => [
        { pos: [-15, 10, -25], rot: [0.5, 0.8, 0], scale: 2 },
        { pos: [20, -15, -30], rot: [-0.2, -0.4, 0.3], scale: 3 },
        { pos: [0, 25, -40], rot: [Math.PI / 4, 0, 0], scale: 4 }
    ], []);

    useFrame((state) => {
        if (!groupRef.current) return;
        const p = progress.get();
        groupRef.current.rotation.y = p * Math.PI * 0.2;
        groupRef.current.position.y = -p * 5;
        groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    });

    return (
        <group ref={groupRef}>
            {structures.map((s, i) => (
                <Megastructure key={`struct-${i}`} position={s.pos as [number, number, number]} rotation={s.rot as [number, number, number]} scale={s.scale} />
            ))}

            {nodes.map((node, i) => (
                <Float key={i} speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                    <mesh position={node.position} scale={node.scale} rotation={node.rotation}>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial
                            color="#fff"
                            metalness={1}
                            roughness={0.1}
                            transparent
                            opacity={0.1}
                            wireframe
                        />
                    </mesh>
                </Float>
            ))}
        </group>
    );
}

export default function GlobalCinematicBackground() {
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const meshTranslateY = useTransform(smoothProgress, [0, 1], ['0%', '-5%']);
    const orbTranslateY = useTransform(smoothProgress, [0, 1], ['-10%', '60%']);
    const archLinesOpacity = useTransform(smoothProgress, [0, 0.4], [0, 0.15]);

    const bgColor = useTransform(
        smoothProgress,
        [0, 0.2, 0.4, 0.6, 0.8, 1],
        ['#f8f9fa', '#f3f4f6', '#e5e7eb', '#d1d5db', '#e5e7eb', '#f3f4f6']
    );

    const globalRotateY = useTransform(smoothProgress, [0, 1], ['0deg', '0.5deg']);

    return (
        <motion.div
            className="fixed inset-0 w-full h-full -z-50 overflow-hidden pointer-events-none"
            style={{ rotateY: globalRotateY, perspective: '2000px' }}
        >
            <div className="absolute inset-x-0 inset-y-0 z-10 pointer-events-none opacity-40">
                <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
                    <ResponsiveCamera />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <Scene3D progress={smoothProgress} />
                </Canvas>
            </div>

            <motion.div
                className="absolute inset-0 transition-colors duration-1000"
                style={{ backgroundColor: bgColor }}
            >
                <motion.div
                    className="absolute inset-0 z-[1] pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
                        `,
                        backgroundSize: '80px 80px',
                        opacity: archLinesOpacity
                    }}
                />

                <motion.div
                    className="absolute inset-x-0 -top-24 h-[120%] opacity-20 will-change-transform z-[0]"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)
                        `,
                        backgroundSize: '40px 40px',
                        y: meshTranslateY
                    }}
                />

                <motion.div
                    className="absolute left-1/2 -ml-[500px] w-[1000px] h-[1000px] opacity-40 will-change-transform blur-[100px]"
                    style={{
                        background: 'radial-gradient(circle, rgba(147,197,253,0.15) 0%, rgba(255,255,255,0) 70%)',
                        y: orbTranslateY,
                        x: '-50%'
                    }}
                />
            </motion.div>
        </motion.div>
    );
}
