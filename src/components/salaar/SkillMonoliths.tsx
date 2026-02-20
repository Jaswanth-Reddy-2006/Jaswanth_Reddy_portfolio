import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface MonolithProps {
    position: [number, number, number];
    label: string;
    color: string;
}

function Monolith({ position, color }: MonolithProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
            meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.005;
        }
    });

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh ref={meshRef}>
                    <boxGeometry args={[1, 2.5, 0.2]} />
                    <meshStandardMaterial
                        color="#111"
                        metalness={1}
                        roughness={0}
                        emissive={color}
                        emissiveIntensity={0.2}
                    />
                    {/* Neon Border lines */}
                    <lineSegments>
                        <edgesGeometry args={[new THREE.BoxGeometry(1, 2.5, 0.2)]} />
                        <lineBasicMaterial color={color} />
                    </lineSegments>
                </mesh>
            </Float>
        </group>
    );
}

export default function SkillMonoliths() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            <Monolith position={[-4, 0, 0]} label="FRONTEND" color="#4589ff" />
            <Monolith position={[0, 0, -2]} label="BACKEND" color="#ff4545" />
            <Monolith position={[4, 0, 0]} label="SYSTEMS" color="#1165ef" />

            {/* Central energy field */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
                <ringGeometry args={[2, 4, 64]} />
                <meshStandardMaterial color="#4589ff" transparent opacity={0.1} side={THREE.DoubleSide} />
            </mesh>

            <pointLight position={[0, 0, 0]} color="#4589ff" intensity={2} distance={10} />
        </group>
    );
}
