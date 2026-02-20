import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function NeuralCore() {
    const coreRef = useRef<THREE.Mesh>(null);
    const outerRef = useRef<THREE.Group>(null);
    const internalRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        if (coreRef.current) {
            coreRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1);
            coreRef.current.rotation.y += 0.01;
        }

        if (outerRef.current) {
            outerRef.current.rotation.y -= 0.005;
            outerRef.current.rotation.z += 0.002;
        }

        if (internalRef.current) {
            internalRef.current.rotation.x += 0.02;
        }
    });

    return (
        <group scale={1.5}>
            {/* Central Pulsing Core */}
            <Sphere ref={coreRef} args={[1, 64, 64]}>
                <MeshDistortMaterial
                    color="#4589ff"
                    emissive="#4589ff"
                    emissiveIntensity={2}
                    speed={2}
                    distort={0.4}
                    radius={1}
                />
            </Sphere>

            {/* Internal "Synapse" structure */}
            <group ref={internalRef}>
                {[...Array(3)].map((_, i) => (
                    <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
                        <torusGeometry args={[0.8, 0.02, 16, 100]} />
                        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={5} />
                    </mesh>
                ))}
            </group>

            {/* Outer Rotating Energy Rings */}
            <group ref={outerRef}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[1.5, 0.01, 16, 100]} />
                    <meshStandardMaterial color="#4589ff" opacity={0.3} transparent />
                </mesh>
                <mesh rotation={[0, Math.PI / 2, 0]}>
                    <torusGeometry args={[1.7, 0.01, 16, 100]} />
                    <meshStandardMaterial color="#4589ff" opacity={0.3} transparent />
                </mesh>
                <mesh rotation={[Math.PI / 4, 0, Math.PI / 4]}>
                    <torusGeometry args={[1.9, 0.01, 16, 100]} />
                    <meshStandardMaterial color="#4589ff" opacity={0.3} transparent />
                </mesh>
            </group>

            {/* Volumetric glow simulation with overlapping spheres */}
            <Sphere args={[1.1, 32, 32]}>
                <meshStandardMaterial color="#4589ff" transparent opacity={0.1} side={THREE.BackSide} />
            </Sphere>
            <Sphere args={[1.3, 32, 32]}>
                <meshStandardMaterial color="#4589ff" transparent opacity={0.05} side={THREE.BackSide} />
            </Sphere>

            <pointLight color="#4589ff" intensity={5} distance={10} />
            <pointLight color="#ffffff" intensity={2} distance={5} />
        </group>
    );
}
