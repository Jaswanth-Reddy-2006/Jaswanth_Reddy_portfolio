import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ThreeWayRocketProps {
    engineColor: string;
    isBursting: boolean;
}

export default function ThreeWayRocket({ engineColor, isBursting }: ThreeWayRocketProps) {
    const groupRef = useRef<THREE.Group>(null!);
    const mainEngineRef = useRef<THREE.Mesh>(null!);
    const leftEngineRef = useRef<THREE.Mesh>(null!);
    const rightEngineRef = useRef<THREE.Mesh>(null!);
    const glowRef = useRef<THREE.PointLight>(null!);

    useFrame((state) => {
        if (!groupRef.current) return;

        // High-frequency shake during burst
        const shake = isBursting ? 0.08 : 0.01;
        groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 20) * shake;
        groupRef.current.position.z += Math.cos(state.clock.elapsedTime * 20) * shake;

        // Engine flicker & glow
        const flicker = 1 + Math.sin(state.clock.elapsedTime * 30) * 0.3;
        const intensity = isBursting ? 15 : 5;

        [mainEngineRef, leftEngineRef, rightEngineRef].forEach(ref => {
            if (ref.current) {
                (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity * flicker;
                const s = isBursting ? 1.4 : 1.0 + Math.sin(state.clock.elapsedTime * 10) * 0.05;
                ref.current.scale.set(s, s, s * 2); // Elongated flare
            }
        });

        if (glowRef.current) {
            glowRef.current.intensity = intensity * flicker * 0.5;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Main Body - Sleek Metallic */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.3, 0.4, 2.8, 16]} />
                <meshStandardMaterial
                    color="#222"
                    metalness={1}
                    roughness={0.1}
                    emissive={engineColor}
                    emissiveIntensity={0.1}
                />
            </mesh>

            {/* Premium Gold/Chrome Trim */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                <torusGeometry args={[0.42, 0.02, 16, 32]} />
                <meshStandardMaterial color={engineColor} metalness={1} />
            </mesh>

            {/* Nose Cone */}
            <mesh position={[1.6, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                <coneGeometry args={[0.3, 0.8, 16]} />
                <meshStandardMaterial color="#333" metalness={1} roughness={0.05} />
            </mesh>

            {/* Side Boosters with detailed couplers */}
            {[0.5, -0.5].map((z, i) => (
                <group key={i} position={[0.2, 0, z]}>
                    <mesh rotation={[0, 0, -Math.PI / 2]} castShadow>
                        <cylinderGeometry args={[0.18, 0.22, 2, 12]} />
                        <meshStandardMaterial color="#111" metalness={1} roughness={0.2} />
                    </mesh>
                    <mesh position={[1.15, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                        <coneGeometry args={[0.18, 0.5, 12]} />
                        <meshStandardMaterial color="#222" metalness={1} />
                    </mesh>
                    {/* Booster Engines */}
                    <mesh ref={i === 0 ? leftEngineRef : rightEngineRef} position={[-1.1, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                        <cylinderGeometry args={[0.15, 0, 0.6, 16]} />
                        <meshStandardMaterial color="#fff" emissive={engineColor} emissiveIntensity={4} transparent opacity={0.8} />
                    </mesh>
                </group>
            ))}

            {/* Main Engine Flare */}
            <mesh ref={mainEngineRef} position={[-1.6, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                <cylinderGeometry args={[0.25, 0, 1.2, 16]} />
                <meshStandardMaterial color="#fff" emissive={engineColor} emissiveIntensity={6} transparent opacity={0.9} />
            </mesh>

            {/* Dynamic Light */}
            <pointLight ref={glowRef} position={[-2, 0, 0]} color={engineColor} distance={10} />

            {/* Aerodynamic Fins */}
            {[0, Math.PI / 2, Math.PI, -Math.PI / 2].map((rot, i) => (
                <group key={`fin-${i}`} rotation={[rot, 0, 0]} position={[-0.8, 0, 0]}>
                    <mesh position={[0, 0.6, 0]} rotation={[0, 0, 0.4]}>
                        <boxGeometry args={[0.8, 0.4, 0.05]} />
                        <meshStandardMaterial color="#333" metalness={1} />
                    </mesh>
                </group>
            ))}
        </group>
    );
}
