import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StoryPersonProps {
    position: [number, number, number];
    rotationY?: number;
}

export default function StoryPerson({ position, rotationY = 0 }: StoryPersonProps) {
    const groupRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        if (!groupRef.current) return;
        // Subtle breathing/floating
        groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    });

    return (
        <group ref={groupRef} position={position} rotation={[0, rotationY, 0]}>
            {/* Body */}
            <mesh position={[0, 0.4, 0]}>
                <capsuleGeometry args={[0.15, 0.4, 4, 8]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            {/* Head */}
            <mesh position={[0, 0.85, 0]}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial color="#444" />
            </mesh>
            {/* Arms */}
            <mesh position={[-0.2, 0.5, 0]} rotation={[0, 0, 0.2]}>
                <capsuleGeometry args={[0.04, 0.3, 4, 8]} />
                <meshStandardMaterial color="#222" />
            </mesh>
            <mesh position={[0.2, 0.5, 0]} rotation={[0, 0, -0.2]}>
                <capsuleGeometry args={[0.04, 0.3, 4, 8]} />
                <meshStandardMaterial color="#222" />
            </mesh>
            {/* Legs */}
            <mesh position={[-0.1, 0.1, 0]}>
                <capsuleGeometry args={[0.05, 0.3, 4, 8]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            <mesh position={[0.1, 0.1, 0]}>
                <capsuleGeometry args={[0.05, 0.3, 4, 8]} />
                <meshStandardMaterial color="#111" />
            </mesh>

            {/* Inner Glow */}
            <pointLight position={[0, 0.5, 0.2]} intensity={0.5} color="#fff" distance={2} />
        </group>
    );
}
