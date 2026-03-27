import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StoryPersonProps {
    position: [number, number, number];
    rotationY?: number;
    isWalking?: boolean;
}

export default function StoryPerson({ position, rotationY = 0, isWalking = false }: StoryPersonProps) {
    const groupRef = useRef<THREE.Group>(null!);
    const lLegRef = useRef<THREE.Group>(null!);
    const rLegRef = useRef<THREE.Group>(null!);
    const lArmRef = useRef<THREE.Group>(null!);
    const rArmRef = useRef<THREE.Group>(null!);
    const headRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.elapsedTime;
        
        // Idle bobbing
        groupRef.current.position.y = position[1] + Math.sin(t * 2) * 0.03;

        // Walking animation
        if (isWalking) {
            const walkSpeed = 10;
            const walkRange = 0.5;
            
            // Legs
            if (lLegRef.current) lLegRef.current.rotation.x = Math.sin(t * walkSpeed) * walkRange;
            if (rLegRef.current) rLegRef.current.rotation.x = -Math.sin(t * walkSpeed) * walkRange;
            
            // Arms
            if (lArmRef.current) lArmRef.current.rotation.x = -Math.sin(t * walkSpeed) * walkRange;
            if (rArmRef.current) rArmRef.current.rotation.x = Math.sin(t * walkSpeed) * walkRange;

            // Head bob
            if (headRef.current) headRef.current.position.y = 0.85 + Math.abs(Math.sin(t * walkSpeed)) * 0.02;
        } else {
            // Reset limbs
            if (lLegRef.current) lLegRef.current.rotation.x = THREE.MathUtils.lerp(lLegRef.current.rotation.x, 0, 0.1);
            if (rLegRef.current) rLegRef.current.rotation.x = THREE.MathUtils.lerp(rLegRef.current.rotation.x, 0, 0.1);
            if (lArmRef.current) lArmRef.current.rotation.x = THREE.MathUtils.lerp(lArmRef.current.rotation.x, 0.2, 0.1);
            if (rArmRef.current) rArmRef.current.rotation.x = THREE.MathUtils.lerp(rArmRef.current.rotation.x, -0.2, 0.1);
        }
    });

    return (
        <group ref={groupRef} position={position} rotation={[0, rotationY, 0]} scale={[1.2, 1.2, 1.2]}>
            {/* Torso / Shirt */}
            <mesh position={[0, 0.45, 0]} castShadow>
                <capsuleGeometry args={[0.18, 0.35, 8, 16]} />
                <meshStandardMaterial color="#3b82f6" roughness={0.7} /> {/* Blue shirt */}
            </mesh>

            {/* Neck */}
            <mesh position={[0, 0.72, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.1, 8]} />
                <meshStandardMaterial color="#fcd34d" /> {/* Skin tone */}
            </mesh>

            {/* Head */}
            <group ref={headRef} position={[0, 0.85, 0]}>
                {/* Face */}
                <mesh castShadow>
                    <sphereGeometry args={[0.15, 32, 32]} />
                    <meshStandardMaterial color="#fcd34d" /> {/* Skin tone */}
                </mesh>

                {/* Hair */}
                <group position={[0, 0.05, 0]}>
                    <mesh position={[0, 0.1, -0.05]} rotation={[0.2, 0, 0]}>
                        <sphereGeometry args={[0.16, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                        <meshStandardMaterial color="#451a03" /> {/* Dark brown hair */}
                    </mesh>
                    {/* Hair spikes */}
                    <mesh position={[0, 0.16, 0.05]} rotation={[-0.5, 0, 0]}>
                        <coneGeometry args={[0.05, 0.15, 8]} />
                        <meshStandardMaterial color="#451a03" />
                    </mesh>
                </group>

                {/* Eyes */}
                <mesh position={[0.06, 0.02, 0.12]}>
                    <sphereGeometry args={[0.02, 8, 8]} />
                    <meshStandardMaterial color="#000" />
                </mesh>
                <mesh position={[-0.06, 0.02, 0.12]}>
                    <sphereGeometry args={[0.02, 8, 8]} />
                    <meshStandardMaterial color="#000" />
                </mesh>

                {/* Blush */}
                <mesh position={[0.09, -0.03, 0.1]}>
                    <sphereGeometry args={[0.025, 8, 8]} />
                    <meshStandardMaterial color="#f87171" transparent opacity={0.3} />
                </mesh>
                <mesh position={[-0.09, -0.03, 0.1]}>
                    <sphereGeometry args={[0.025, 8, 8]} />
                    <meshStandardMaterial color="#f87171" transparent opacity={0.3} />
                </mesh>
            </group>

            {/* Arms */}
            <group ref={lArmRef} position={[-0.22, 0.65, 0]}>
                <mesh position={[0, -0.15, 0]}>
                    <capsuleGeometry args={[0.05, 0.3, 8, 16]} />
                    <meshStandardMaterial color="#3b82f6" />
                </mesh>
                {/* Hand */}
                <mesh position={[0, -0.32, 0]}>
                    <sphereGeometry args={[0.045, 12, 12]} />
                    <meshStandardMaterial color="#fcd34d" />
                </mesh>
            </group>

            <group ref={rArmRef} position={[0.22, 0.65, 0]}>
                <mesh position={[0, -0.15, 0]}>
                    <capsuleGeometry args={[0.05, 0.3, 8, 16]} />
                    <meshStandardMaterial color="#3b82f6" />
                </mesh>
                {/* Hand */}
                <mesh position={[0, -0.32, 0]}>
                    <sphereGeometry args={[0.045, 12, 12]} />
                    <meshStandardMaterial color="#fcd34d" />
                </mesh>
            </group>

            {/* Legs */}
            <group ref={lLegRef} position={[-0.1, 0.25, 0]}>
                <mesh position={[0, -0.15, 0]} castShadow>
                    <capsuleGeometry args={[0.07, 0.3, 8, 16]} />
                    <meshStandardMaterial color="#1e3a8a" /> {/* Blue pants */}
                </mesh>
                {/* Shoe */}
                <mesh position={[0, -0.3, 0.05]}>
                    <boxGeometry args={[0.12, 0.08, 0.18]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
            </group>

            <group ref={rLegRef} position={[0.1, 0.25, 0]}>
                <mesh position={[0, -0.15, 0]} castShadow>
                    <capsuleGeometry args={[0.07, 0.3, 8, 16]} />
                    <meshStandardMaterial color="#1e3a8a" />
                </mesh>
                {/* Shoe */}
                <mesh position={[0, -0.3, 0.05]}>
                    <boxGeometry args={[0.12, 0.08, 0.18]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
            </group>

            {/* Back Bag */}
            <mesh position={[0, 0.45, -0.2]} castShadow>
                <boxGeometry args={[0.2, 0.25, 0.1]} />
                <meshStandardMaterial color="#ef4444" />
            </mesh>

            {/* Character Glow */}
            <pointLight position={[0, 0.5, 0.5]} intensity={0.4} color="#60a5fa" distance={3} />
        </group>
    );
}
