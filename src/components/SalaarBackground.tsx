import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, PerspectiveCamera, Sparkles, Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function Rocket({ delay = 0, xOffset = 0 }: { delay?: number, xOffset?: number }) {
    const ref = useRef<THREE.Group>(null);
    const speed = useMemo(() => Math.random() * 0.15 + 0.1, []);
    const xPos = useMemo(() => (Math.random() - 0.5) * 50 + xOffset, [xOffset]);

    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.elapsedTime + delay;
            ref.current.position.y = 25 - ((t * speed * 25) % 50);
            ref.current.position.x = xPos + Math.sin(t * 0.5) * 2;
            ref.current.rotation.z = Math.PI;
        }
    });

    return (
        <group ref={ref}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh>
                    <cylinderGeometry args={[0.2, 0.3, 1.8, 8]} />
                    <meshStandardMaterial color="#111" metalness={1} roughness={0.5} />
                </mesh>
                <mesh position={[0, -1, 0]}>
                    <coneGeometry args={[0.3, 0.6, 8]} />
                    <meshStandardMaterial color="#990000" />
                </mesh>
                <mesh position={[0, 1, 0]}>
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={4} />
                </mesh>
            </Float>
        </group>
    );
}


function Planet({ position, size, color, speed = 0.1 }: { position: [number, number, number], size: number, color: string, speed?: number }) {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y += speed * 0.1;
            ref.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.01;
        }
    });

    return (
        <Sphere ref={ref} position={position} args={[size, 64, 64]}>
            <meshStandardMaterial
                color={color}
                roughness={0.9}
                metalness={0.1}
                emissive={color}
                emissiveIntensity={0.05}
            />
        </Sphere>
    );
}

function SolarFlare() {
    return (
        <Sparkles
            count={100}
            scale={[60, 40, 60]}
            size={20}
            speed={2}
            color="#ff0000"
            opacity={0.2}
        />
    );
}

function TwinklingStars() {
    return (
        <Sparkles
            count={400}
            scale={[80, 80, 80]}
            size={4}
            speed={1.5}
            color="#ff4444"
            opacity={0.4}
            noise={1}
        />
    );
}

function BloodNebula() {
    const meshRef = useRef<THREE.Mesh>(null);
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#0c0000") } // Darker
    }), []);

    useFrame((state) => {
        if (meshRef.current) {
            (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime * 0.03;
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[70, 16, 16]} />
            <shaderMaterial
                uniforms={uniforms}
                side={THREE.BackSide}
                transparent
                fragmentShader={`
                    varying vec2 vUv;
                    uniform float uTime;
                    uniform vec3 uColor;
                    void main() {
                        float noise = sin(vUv.x * 2.0 + uTime) * sin(vUv.y * 2.0 + uTime);
                        gl_FragColor = vec4(uColor + (0.01 * noise), 0.1);
                    }
                `}
                vertexShader={`
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `}
            />
        </mesh>
    );
}

export default function SalaarBackground() {
    return (
        <div className="fixed inset-0 z-[-1] bg-black">
            <Canvas dpr={[1, 1.5]}> {/* Lower max DPR */}
                <PerspectiveCamera makeDefault position={[0, 0, 30]} fov={50} />
                <color attach="background" args={['#000']} />

                <ambientLight intensity={0.1} />
                <pointLight position={[20, 20, 20]} intensity={0.5} color="#ff0000" />

                <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
                <TwinklingStars />
                <SolarFlare />

                <BloodNebula />

                <Planet position={[-15, 8, -25]} size={4} color="#150000" speed={0.02} />
                <Planet position={[25, -15, -30]} size={6} color="#080000" speed={0.01} />

                <Rocket delay={0} xOffset={-18} />
                <Rocket delay={15} xOffset={25} />


                <fog attach="fog" args={['#000', 40, 100]} />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-red-950/10 opacity-40 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-radial from-red-600/5 to-transparent pointer-events-none animate-pulse-slow" />
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0; }
                    50% { opacity: 0.2; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
            `}} />
        </div>
    );
}
