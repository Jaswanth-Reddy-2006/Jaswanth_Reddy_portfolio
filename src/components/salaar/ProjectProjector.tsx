import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface ShardProps {
    index: number;
    total: number;
}

function ProjectShard({ index, total }: ShardProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const angle = (index / total) * Math.PI * 2;
    const radius = 3;

    useFrame((state) => {
        if (meshRef.current) {
            const t = state.clock.elapsedTime;
            meshRef.current.position.y = Math.sin(t + index) * 0.2;
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.015;
        }
    });

    return (
        <mesh
            ref={meshRef}
            position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
        >
            <octahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial
                color="#1165ef"
                emissive="#1165ef"
                emissiveIntensity={2}
                transparent
                opacity={0.8}
            />
        </mesh>
    );
}

export default function ProjectProjector() {
    const baseRef = useRef<THREE.Group>(null);
    const beamRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (baseRef.current) {
            baseRef.current.rotation.y += 0.005;
        }
        if (beamRef.current) {
            beamRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.05;
        }
    });

    return (
        <group position={[0, -2, 0]}>
            {/* Projector Base */}
            <group ref={baseRef}>
                <Cylinder args={[1.5, 1.8, 0.5, 8]}>
                    <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
                </Cylinder>
                <Cylinder args={[0.8, 0.8, 0.2, 8]} position={[0, 0.3, 0]}>
                    <meshStandardMaterial color="#4589ff" emissive="#4589ff" />
                </Cylinder>
            </group>

            {/* Holographic Projection Beam */}
            <mesh ref={beamRef} position={[0, 2.5, 0]}>
                <coneGeometry args={[3, 5, 24, 1, true]} />
                <meshStandardMaterial
                    color="#4589ff"
                    transparent
                    opacity={0.1}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Floating Project Shards */}
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <group position={[0, 3, 0]}>
                    {[...Array(6)].map((_, i) => (
                        <ProjectShard key={i} index={i} total={6} />
                    ))}
                </group>
            </Float>

            <pointLight position={[0, 3, 0]} color="#4589ff" intensity={3} distance={10} />
        </group>
    );
}
