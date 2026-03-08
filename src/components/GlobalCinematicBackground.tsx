import { useRef, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

import { useThree } from '@react-three/fiber';

const PARTICLE_COUNT = 12;

function ResponsiveCamera() {
    const { camera, size } = useThree();
    useEffect(() => {
        if (camera instanceof THREE.PerspectiveCamera) {
            camera.fov = size.width < 768 ? 60 : 45;
            camera.position.z = size.width < 768 ? 15 : 10;
            camera.updateProjectionMatrix();
        }
    }, [size.width, camera]);
    return null;
}

// ─── ZEN HERO (F1 / BIKE STYLE) ───

function Megastructure({ position, rotation, scale }: { position: [number, number, number]; rotation: [number, number, number]; scale: number }) {
    return (
        <group position={position} rotation={rotation} scale={scale}>
            <mesh>
                <boxGeometry args={[4, 4, 1]} />
                <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} transparent opacity={0.6} />
            </mesh>
            <mesh position={[0, 0, 0.6]}>
                <boxGeometry args={[3.8, 3.8, 0.1]} />
                <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={0.2} wireframe />
            </mesh>
            {/* Antennae */}
            <mesh position={[2, 2, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 3]} />
                <meshStandardMaterial color="#333" />
            </mesh>
        </group>
    );
}

// ─── THREE.JS SCROLL BACKGROUND ───
function Scene3D({ isSalaar, progress }: { isSalaar: boolean; progress: any }) {
    const groupRef = useRef<THREE.Group>(null);

    // Create static geometry for nodes/debris
    const nodes = useMemo(() => {
        const count = 15;
        return Array.from({ length: count }).map(() => ({
            position: [
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 20 - 15
            ] as [number, number, number],
            scale: Math.random() * 1.5 + 0.5,
            rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number]
        }));
    }, []);

    // ─── MEGASYSTRUCTURES ───
    const structures = useMemo(() => {
        if (isSalaar) return [];
        return [
            { pos: [-15, 10, -25], rot: [0.5, 0.8, 0], scale: 2 },
            { pos: [20, -15, -30], rot: [-0.2, -0.4, 0.3], scale: 3 },
            { pos: [0, 25, -40], rot: [Math.PI / 4, 0, 0], scale: 4 }
        ];
    }, [isSalaar]);

    // ─── ZEN CHARACTERS ───

    useFrame((state) => {
        if (!groupRef.current) return;
        // Scroll-linked rotation and position
        const p = progress.get();
        groupRef.current.rotation.y = p * Math.PI * 0.2;
        groupRef.current.position.y = -p * 5;

        // Idle floating
        groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    });

    return (
        <group ref={groupRef}>
            {structures.map((s, i) => (
                <Megastructure key={`struct-${i}`} position={s.pos as [number, number, number]} rotation={s.rot as [number, number, number]} scale={s.scale} />
            ))}

            {/* Moving characters and ZenHero removed as requested to clear main page clutter */}

            {nodes.map((node, i) => (
                <Float key={i} speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                    <mesh position={node.position} scale={node.scale} rotation={node.rotation}>
                        {isSalaar ? (
                            <>
                                <dodecahedronGeometry args={[1, 0]} />
                                <meshStandardMaterial
                                    color="#200"
                                    emissive="#400"
                                    emissiveIntensity={2}
                                    metalness={1}
                                    roughness={0.2}
                                />
                            </>
                        ) : (
                            <>
                                <boxGeometry args={[1, 1, 1]} />
                                <meshStandardMaterial
                                    color="#fff"
                                    metalness={1}
                                    roughness={0.1}
                                    transparent
                                    opacity={0.1}
                                    wireframe
                                />
                            </>
                        )}
                    </mesh>
                </Float>
            ))}

            {/* Ambient particles */}
            <Points>
                <PointMaterial
                    transparent
                    vertexColors
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

const EmberCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const spriteRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const img = new Image();
        img.src = `${import.meta.env.BASE_URL}assets/cinematic/ember_sprite.png`;
        img.onload = () => { spriteRef.current = img; };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight + window.innerHeight,
            size: Math.random() * 3 + 1,
            speedY: Math.random() * 1.2 + 0.4,
            speedX: Math.random() * 0.4 - 0.2,
            opacity: Math.random() * 0.4 + 0.1,
            sinOffset: Math.random() * Math.PI * 2
        }));

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const render = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.y -= p.speedY;
                p.x += Math.sin(time / 1500 + p.sinOffset) * 0.3 + p.speedX;

                const topFade = Math.min(1, p.y / 300);

                if (p.y < -20) {
                    p.y = canvas.height + 20;
                    p.x = Math.random() * canvas.width;
                    p.opacity = Math.random() * 0.4 + 0.1;
                }

                ctx.globalAlpha = p.opacity * topFade;
                if (spriteRef.current) {
                    ctx.drawImage(spriteRef.current, p.x, p.y, p.size * 5, p.size * 5);
                } else {
                    ctx.fillStyle = '#8b0000';
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />;
};

export default function GlobalCinematicBackground() {
    const { isSalaarMode } = useSettings();
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const meshTranslateY = useTransform(smoothProgress, [0, 1], ['0%', '-5%']);
    const orbTranslateY = useTransform(smoothProgress, [0, 1], ['-10%', '60%']);
    const archLinesOpacity = useTransform(smoothProgress, [0, 0.4], [0, 0.15]);

    const bgColor = useTransform(
        smoothProgress,
        [0, 0.2, 0.4, 0.6, 0.8, 1],
        ['#f8f9fa', '#f3f4f6', '#e5e7eb', '#d1d5db', '#e5e7eb', '#f3f4f6']
    );

    const salaarTextureZoom = useTransform(smoothProgress, [0, 1], [1, 1.08]);

    const salaarGlowIntensity = useTransform(
        smoothProgress,
        [0, 0.3, 0.6, 1],
        [0.3, 0.5, 0.7, 0.5]
    );
    const salaarSmokeOpacity = useTransform(
        smoothProgress,
        [0, 0.4, 0.7, 1],
        [0.4, 0.7, 0.8, 0.5]
    );

    const salaarPeakDarken = useTransform(smoothProgress, [0.3, 0.6], [0, 0.25]);

    const salaarSmokeX1 = useTransform(smoothProgress, [0, 1], ['0%', '12%']);
    const salaarSmokeX2 = useTransform(smoothProgress, [0, 1], ['0%', '-8%']);
    const salaarSmokeOpacity2 = useTransform(salaarSmokeOpacity, v => v * 0.4);

    const globalRotateY = useTransform(smoothProgress, [0, 1], ['0deg', '0.5deg']);

    return (
        <motion.div
            className="fixed inset-0 w-full h-full -z-50 overflow-hidden pointer-events-none"
            style={{ rotateY: globalRotateY, perspective: '2000px' }}
        >
            {/* Shared 3D Content Layer */}
            <div className="absolute inset-x-0 inset-y-0 z-10 pointer-events-none opacity-40">
                <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
                    <ResponsiveCamera />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <Scene3D isSalaar={isSalaarMode} progress={smoothProgress} />
                </Canvas>
            </div>

            {/* White Mode Engine */}
            {!isSalaarMode && (
                <motion.div
                    className="absolute inset-0 transition-colors duration-1000"
                    style={{ backgroundColor: bgColor }}
                >
                    <motion.div
                        className="absolute inset-0 z-[1] pointer-events-none"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
                            `,
                            backgroundSize: '80px 80px',
                            opacity: archLinesOpacity
                        }}
                    />

                    <motion.div
                        className="absolute inset-x-0 -top-24 h-[120%] opacity-20 will-change-transform z-[0]"
                        style={{
                            backgroundImage: `
                                radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)
                            `,
                            backgroundSize: '40px 40px',
                            y: meshTranslateY
                        }}
                    />

                    <motion.div
                        className="absolute left-1/2 -ml-[500px] w-[1000px] h-[1000px] opacity-40 will-change-transform blur-[100px]"
                        style={{
                            background: 'radial-gradient(circle, rgba(147,197,253,0.15) 0%, rgba(255,255,255,0) 70%)',
                            y: orbTranslateY,
                            x: '-50%'
                        }}
                    />
                </motion.div>
            )}

            {/* Salaar Mode Engine */}
            {isSalaarMode && (
                <div className="absolute inset-0 bg-[#0b0b0f]">
                    <motion.div
                        className="absolute inset-0 will-change-transform"
                        style={{
                            backgroundImage: `url(${import.meta.env.BASE_URL}assets/cinematic/bg_texture_salar.png)`,
                            backgroundSize: 'cover',
                            scale: salaarTextureZoom,
                            opacity: 0.5
                        }}
                    />

                    <motion.div
                        className="absolute inset-0 bg-black z-[2]"
                        style={{ opacity: salaarPeakDarken }}
                    />

                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-[#1a0000] via-transparent to-transparent z-[1]"
                        style={{ opacity: salaarGlowIntensity }}
                    />

                    <motion.div
                        className="absolute -inset-[15%] mix-blend-screen will-change-transform"
                        style={{
                            backgroundImage: `url(${import.meta.env.BASE_URL}assets/cinematic/bg_smoke_salar_drift.png)`,
                            backgroundSize: 'cover',
                            opacity: salaarSmokeOpacity,
                            x: salaarSmokeX1,
                            scale: 1.1
                        }}
                    />
                    <motion.div
                        className="absolute -inset-[15%] mix-blend-screen will-change-transform"
                        style={{
                            backgroundImage: `url(${import.meta.env.BASE_URL}assets/cinematic/bg_smoke_salar_drift.png)`,
                            backgroundSize: 'cover',
                            opacity: salaarSmokeOpacity2,
                            x: salaarSmokeX2,
                            scale: 1.3,
                            rotate: 180
                        }}
                    />

                    <EmberCanvas />

                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#1a0000]/40 z-[5] pointer-events-none" />
                </div>
            )}
        </motion.div>
    );
}
