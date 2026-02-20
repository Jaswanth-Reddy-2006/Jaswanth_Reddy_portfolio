import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function ArchivePortal() {
    const outerRingRef = useRef<THREE.Mesh>(null);
    const innerRingRef = useRef<THREE.Mesh>(null);
    const coreRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        if (outerRingRef.current) {
            outerRingRef.current.rotation.z += 0.01;
            outerRingRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
        }

        if (innerRingRef.current) {
            innerRingRef.current.rotation.z -= 0.02;
            innerRingRef.current.rotation.y = Math.cos(t * 0.5) * 0.2;
        }

        if (coreRef.current) {
            coreRef.current.scale.setScalar(1 + Math.sin(t * 3) * 0.05);
        }
    });

    return (
        <group scale={1.2}>
            <Torus ref={outerRingRef} args={[3, 0.1, 16, 100]}>
                <meshStandardMaterial color="#4589ff" metalness={1} roughness={0.1} />
                {[...Array(12)].map((_, i) => (
                    <mesh key={i} rotation={[0, 0, (i / 12) * Math.PI * 2]} position={[3, 0, 0]}>
                        <boxGeometry args={[0.3, 0.3, 0.4]} />
                        <meshStandardMaterial color="#4589ff" emissive="#4589ff" />
                    </mesh>
                ))}
            </Torus>

            <Torus ref={innerRingRef} args={[2.5, 0.05, 16, 100]}>
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
            </Torus>

            <Sphere ref={coreRef} args={[1, 64, 64]}>
                <MeshDistortMaterial
                    color="#000"
                    emissive="#4589ff"
                    emissiveIntensity={0.5}
                    speed={3}
                    distort={0.3}
                />
            </Sphere>

            <group>
                {[...Array(20)].map((_, i) => (
                    <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
                        <cylinderGeometry args={[0.01, 0.01, 6]} />
                        <meshStandardMaterial color="#4589ff" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
                    </mesh>
                ))}
            </group>

            <pointLight color="#4589ff" intensity={5} distance={10} />
            <ambientLight intensity={0.2} />
        </group>
    );
}
