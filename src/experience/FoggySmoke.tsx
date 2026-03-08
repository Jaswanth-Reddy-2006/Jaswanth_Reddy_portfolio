import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FoggySmokeProps {
    color: string;
    active: boolean;
    opacity: number;
    emitterPosition: THREE.Vector3;
}

export default function FoggySmoke({ color, active, opacity, emitterPosition }: FoggySmokeProps) {
    const pointsRef = useRef<THREE.Points>(null!);
    const count = 4000; // Even more density

    // We'll store life, speed, and original offset for each particle
    const [positions, data] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const d = new Float32Array(count * 4); // [speedX, speedY, speedZ, life]
        for (let i = 0; i < count; i++) {
            // Distribute across a wide area initially but hidden
            pos[i * 3] = 1000;
            d[i * 4] = (Math.random() - 0.5) * 0.08; // speedX
            d[i * 4 + 1] = (Math.random() - 0.5) * 0.08; // speedY
            d[i * 4 + 2] = (Math.random() - 0.5) * 0.08; // speedZ
            d[i * 4 + 3] = Math.random(); // initial life
        }
        return [pos, d];
    }, [count]);

    const texture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d')!;
        const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        grad.addColorStop(0.4, 'rgba(255, 255, 255, 0.1)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 128, 128);
        return new THREE.CanvasTexture(canvas);
    }, []);

    useFrame((_state, delta) => {
        if (!pointsRef.current) return;
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            // Much slower decay for very long trail
            data[i * 4 + 3] -= delta * 0.15;

            if (data[i * 4 + 3] <= 0) {
                if (active) {
                    // Spawn at emitter
                    positions[i * 3] = emitterPosition.x + (Math.random() - 0.5) * 2;
                    positions[i * 3 + 1] = emitterPosition.y + (Math.random() - 0.5) * 1 + Math.sin(emitterPosition.x * 0.1) * 0.5;
                    positions[i * 3 + 2] = emitterPosition.z + (Math.random() - 0.5) * 2;
                    data[i * 4 + 3] = 1.0;
                } else {
                    positions[i * 3] = 1000;
                }
            } else {
                // Drifting outward
                positions[i * 3] += data[i * 4] * delta * 40;
                positions[i * 3 + 1] += data[i * 4 + 1] * delta * 40;
                positions[i * 3 + 2] += data[i * 4 + 2] * delta * 40;
            }
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial
                size={20}
                sizeAttenuation={true}
                map={texture}
                transparent
                opacity={opacity * 0.4}
                color={color}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
