import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export default function NetworkGraph() {
    const groupRef = useRef<THREE.Group>(null);
    const count = 30;

    const points = useMemo(() => {
        const p = [];
        for (let i = 0; i < count; i++) {
            p.push({
                pos: new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10),
                speed: Math.random() * 0.2 + 0.1
            });
        }
        return p;
    }, []);

    const lineGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * count * 6); // Max possible connections
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geometry;
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            const time = state.clock.elapsedTime;
            const positions = lineGeometry.attributes.position.array as Float32Array;
            let lineIdx = 0;

            points.forEach((p, i) => {
                p.pos.y += Math.sin(time * p.speed + i) * 0.005;
                p.pos.x += Math.cos(time * p.speed + i) * 0.005;
            });

            for (let i = 0; i < count; i++) {
                for (let j = i + 1; j < count; j++) {
                    const dist = points[i].pos.distanceTo(points[j].pos);
                    if (dist < 4) {
                        positions[lineIdx++] = points[i].pos.x;
                        positions[lineIdx++] = points[i].pos.y;
                        positions[lineIdx++] = points[i].pos.z;
                        positions[lineIdx++] = points[j].pos.x;
                        positions[lineIdx++] = points[j].pos.y;
                        positions[lineIdx++] = points[j].pos.z;
                    }
                }
            }
            lineGeometry.attributes.position.needsUpdate = true;
            lineGeometry.setDrawRange(0, lineIdx / 3);
            groupRef.current.rotation.y += 0.002;
        }
    });

    return (
        <group ref={groupRef}>
            {points.map((p, i) => (
                <Sphere key={i} position={p.pos} args={[0.05, 16, 16]}>
                    <meshStandardMaterial color="#4589ff" emissive="#4589ff" emissiveIntensity={2} />
                </Sphere>
            ))}
            <lineSegments geometry={lineGeometry}>
                <lineBasicMaterial color="#4589ff" transparent opacity={0.2} />
            </lineSegments>
            <pointLight color="#4589ff" intensity={2} distance={15} />
        </group>
    );
}
