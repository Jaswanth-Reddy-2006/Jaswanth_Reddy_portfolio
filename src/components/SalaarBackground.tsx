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

function AlienSpaceship({ delay = 0 }: { delay?: number }) {
    const ref = useRef<THREE.Group>(null);
    const speed = useMemo(() => Math.random() * 0.05 + 0.02, []);
    const radius = useMemo(() => Math.random() * 10 + 5, []);

    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.elapsedTime + delay;
            ref.current.position.x = Math.cos(t * speed * 10) * radius;
            ref.current.position.y = Math.sin(t * speed * 5) * (radius / 2);
            ref.current.position.z = Math.sin(t * speed * 10) * 5 - 10;
            ref.current.rotation.y += 0.1;
        }
    });

    return (
        <group ref={ref}>
            <Float speed={5} rotationIntensity={2} floatIntensity={2}>
                <mesh>
                    <cylinderGeometry args={[1, 1.2, 0.3, 16]} />
                    <meshStandardMaterial color="#050505" metalness={1} roughness={0.2} />
                </mesh>
                <mesh position={[0, 0.2, 0]}>
                    <sphereGeometry args={[0.5, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#ff0000" transparent opacity={0.4} />
                </mesh>
                {[...Array(8)].map((_, i) => (
                    <mesh key={i} position={[Math.cos(i * Math.PI / 4) * 0.9, -0.1, Math.sin(i * Math.PI / 4) * 0.9]}>
                        <sphereGeometry args={[0.05, 8, 8]} />
                        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={6} />
                    </mesh>
                ))}
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

function TwinklingStars() {
    return (
        <Sparkles
            count={1200}
            scale={[80, 80, 80]}
            size={5}
            speed={2}
            color="#ff4444"
            opacity={0.6}
            noise={1}
        />
    );
}

function BloodNebula() {
    const meshRef = useRef<THREE.Mesh>(null);
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#1a0000") }
    }), []);

    useFrame((state) => {
        if (meshRef.current) {
            (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[60, 64, 64]} />
            <shaderMaterial
                uniforms={uniforms}
                side={THREE.BackSide}
                transparent
                fragmentShader={`
                    varying vec2 vUv;
                    uniform float uTime;
                    uniform vec3 uColor;
                    void main() {
                        vec2 uv = vUv;
                        float noise = sin(uv.x * 8.0 + uTime) * cos(uv.y * 8.0 + uTime);
                        gl_FragColor = vec4(uColor + (0.05 * noise), 0.2);
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
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 30]} fov={50} />
                <color attach="background" args={['#000']} />

                <ambientLight intensity={0.1} />
                <pointLight position={[20, 20, 20]} intensity={1.5} color="#ff0000" />
                <pointLight position={[-20, -20, -20]} intensity={0.5} color="#220000" />

                <Stars radius={150} depth={100} count={8000} factor={4} saturation={0} fade speed={1.5} />
                <TwinklingStars />

                <BloodNebula />

                <Planet position={[-15, 8, -25]} size={5} color="#2a0000" speed={0.04} />
                <Planet position={[25, -15, -30]} size={8} color="#1a0000" speed={0.02} />

                <Rocket delay={0} xOffset={-18} />
                <Rocket delay={7} xOffset={8} />
                <Rocket delay={15} xOffset={25} />

                <AlienSpaceship delay={0} />
                <AlienSpaceship delay={150} />

                <fog attach="fog" args={['#000', 25, 100]} />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-red-950/20 opacity-50 pointer-events-none" />
        </div>
    );
}
