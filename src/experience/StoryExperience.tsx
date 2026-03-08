import { useState, useRef, useEffect, useCallback } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Stars, Sparkles, Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import gsap from 'gsap';
import * as THREE from 'three';
import { useExperience } from './ExperienceContext';
import { scenes, themes } from './IntroConstants';
import StoryPerson from './StoryPerson';
import ThreeWayRocket from './ThreeWayRocket';
import FoggySmoke from './FoggySmoke';

// ─── CONSTANTS ───────────────────────────────────────────────────
const PATH_STEP = 8;
const POINTS_COUNT = 11;

const pathPoints = Array.from({ length: POINTS_COUNT }, (_, i) => ({
    id: i,
    position: [i * PATH_STEP, 0, Math.sin(i * 1.5) * 2] as [number, number, number],
}));

// Map scenes to points (0, 2, 5, 8, 10)
const scenePointIndices = [0, 2, 5, 8, 10];

// ─── CAMERA CONTROLLER ───────────────────────────────────────────
function CameraController({ targetPos }: { targetPos: [number, number, number] }) {
    const { camera } = useThree();
    useFrame(() => {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetPos[0] + 8, 0.05);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetPos[1] + 3, 0.05);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetPos[2] + 12, 0.05);
        camera.lookAt(targetPos[0], targetPos[1] + 1.5, targetPos[2]);
    });
    return null;
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────
export default function StoryExperience() {
    const [status, setStatus] = useState<'intro' | 'journey'>('intro');
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [smokeOpacity, setSmokeOpacity] = useState(0);
    const [personRotation, setPersonRotation] = useState(0);

    // Smooth positions for boy and rocket
    const boyPos = useRef(new THREE.Vector3(pathPoints[0].position[0], 0, 4));
    const rocketPos = useRef(new THREE.Vector3(boyPos.current.x - 8, 3, 10)); // Even more forward
    const rocketRef = useRef<THREE.Group>(null!);
    const boyRef = useRef<THREE.Group>(null!);

    const { completeExperience } = useExperience();

    const currentPointIndex = scenePointIndices[currentSceneIndex];
    const currentPoint = pathPoints[currentPointIndex];

    const cardRef = useRef<HTMLDivElement>(null);

    // Initial entrance
    useEffect(() => {
        if (status === 'journey') {
            gsap.fromTo(cardRef.current, { opacity: 0, scale: 0.9, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.2)" });
            setPersonRotation(Math.PI / 4);
        }
    }, [status, currentSceneIndex]);

    const navigateToPoint = useCallback((targetIndex: number) => {
        if (isTransitioning || targetIndex === currentSceneIndex) return;

        const nextSceneIdx = Math.max(0, Math.min(scenes.length - 1, targetIndex));
        const targetPointIdx = scenePointIndices[nextSceneIdx];
        const targetPoint = pathPoints[targetPointIdx];

        setIsTransitioning(true);

        const tl = gsap.timeline({
            onComplete: () => setIsTransitioning(false)
        });

        // 1. Hide current card
        if (cardRef.current) {
            tl.to(cardRef.current, { opacity: 0, scale: 0.9, y: -20, duration: 0.5 });
        }

        // 2. Rocket Blast Off to the right
        tl.to(rocketPos.current, {
            x: boyPos.current.x + 40,
            duration: 1.8,
            ease: "power2.in",
            onUpdate: () => {
                if (rocketRef.current) {
                    rocketRef.current.position.copy(rocketPos.current);
                    // Add some height variation
                    rocketRef.current.position.y = 2 + Math.sin(rocketPos.current.x * 0.1) * 0.5;
                }
                // Smoke logic
                const progress = tl.progress();
                if (progress < 0.4) setSmokeOpacity(progress * 2.5);
                else if (progress > 0.6) setSmokeOpacity(Math.max(0, (1 - progress) * 2.5));
            },
            onStart: () => {
                if (rocketRef.current) {
                    gsap.to(rocketRef.current.rotation, { z: -0.4, duration: 0.5 });
                    // Lift up slightly on start
                    gsap.to(rocketPos.current, { y: 3, duration: 0.5 });
                }
            }
        }, 0.2);

        // 3. Middle: Teleport boy and rocket re-entry preparation
        tl.add(() => {
            setCurrentSceneIndex(nextSceneIdx);
            setPersonRotation(0);

            // Move boy immediately (or we could animate him walking, but user mentioned rocket smoke covering things)
            boyPos.current.set(...targetPoint.position);
            if (boyRef.current) boyRef.current.position.copy(boyPos.current);

            // Jump rocket to far left for re-entry
            rocketPos.current.set(targetPoint.position[0] - 40, 2, targetPoint.position[2] + 2);
            if (rocketRef.current) {
                rocketRef.current.position.copy(rocketPos.current);
                rocketRef.current.rotation.set(0, 0, 0);
            }
        }, 1.2);

        // 4. Rocket Re-enter from Left
        tl.to(rocketPos.current, {
            x: targetPoint.position[0] - 8, // Changed to -8 for better side clearance
            y: 2,
            duration: 1.8,
            ease: "power3.out",
            onUpdate: () => {
                if (rocketRef.current) rocketRef.current.position.copy(rocketPos.current);
            },
            onStart: () => {
                if (rocketRef.current) gsap.to(rocketRef.current.rotation, { z: 0.2, duration: 0.4 });
                gsap.to({ val: smokeOpacity }, {
                    val: 0,
                    duration: 1.5,
                    onUpdate: function () { setSmokeOpacity(this.targets()[0].val); }
                });
            },
            onComplete: () => {
                if (rocketRef.current) gsap.to(rocketRef.current.rotation, { z: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
            }
        }, 1.2);

        // 5. Reveal new card
        tl.add(() => setPersonRotation(Math.PI / 4), 2.5);
    }, [isTransitioning, currentSceneIndex, smokeOpacity]);

    return (
        <div className="fixed inset-0 z-50 bg-[#050507] overflow-hidden text-sans select-none">

            {/* INTRO SCREEN */}
            {status === 'intro' && (
                <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-[#050507] px-6 text-center pointer-events-auto">
                    <button
                        onClick={() => setStatus('journey')}
                        className="group relative px-12 py-5 bg-white text-black font-bold uppercase tracking-[0.4em] text-xs transition-all hover:bg-[#00ffcc] hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                    >
                        [ LET US START BETTER ]
                        <div className="absolute -inset-1 border border-white/20 group-hover:border-[#00ffcc] group-hover:scale-110 transition-all"></div>
                    </button>
                    <p className="mt-8 text-white/20 text-[10px] uppercase tracking-[0.5em] animate-pulse">Tap to initialize experience</p>
                </div>
            )}

            {/* JOURNEY UI */}
            <div className={`absolute inset-0 z-40 pointer-events-none flex flex-col justify-between p-8 md:p-12 transition-opacity duration-1000 ${status === 'intro' ? 'opacity-0' : 'opacity-100'}`}>

                {/* Top: Progress Map (Only after slide 5) */}
                <div className={`w-full flex justify-end transition-all duration-700 ${currentSceneIndex < 5 ? 'opacity-0 translate-y-[-20px] pointer-events-none' : 'opacity-100 translate-y-0 pointer-events-auto'}`}>
                    <div className="bg-black/50 border border-white/10 backdrop-blur-xl p-6 rounded-2xl">
                        <div className="flex items-center gap-3">
                            {pathPoints.map((_, i) => {
                                const isScene = scenePointIndices.includes(i);
                                const sceneIdx = scenePointIndices.indexOf(i);
                                return (
                                    <button
                                        key={i}
                                        onClick={() => isScene && navigateToPoint(sceneIdx)}
                                        className={`w-3 h-3 rounded-full transition-all duration-500 relative ${i === currentPointIndex ? 'bg-[#00ffcc] scale-150 shadow-[0_0_15px_#00ffcc]' :
                                            isScene ? 'bg-white/20 hover:bg-white/50 cursor-pointer' : 'bg-white/5 cursor-default'
                                            }`}
                                    >
                                        {i === currentPointIndex && <div className="absolute inset-0 rounded-full animate-ping bg-[#00ffcc] opacity-50"></div>}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Center: Card Content */}
                <div ref={cardRef} className="max-w-4xl mx-auto w-full text-center pointer-events-auto">
                    <div className={`p-10 md:p-16 rounded-[40px] transition-all duration-1000 relative overflow-hidden ${currentSceneIndex < 5
                        ? 'bg-transparent border-transparent backdrop-blur-none'
                        : 'bg-black/40 border border-white/10 backdrop-blur-2xl shadow-2xl'
                        }`}>
                        {currentSceneIndex >= 5 && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ffcc] to-transparent opacity-50"></div>}

                        <h2 className={`font-black text-white mb-6 tracking-tight leading-none transition-all duration-700 ${currentSceneIndex < 5 ? 'text-4xl md:text-7xl' : 'text-3xl md:text-5xl'
                            }`}>
                            {scenes[currentSceneIndex].headline}
                        </h2>

                        <p className={`text-white/60 mb-10 font-light transition-all duration-700 ${currentSceneIndex < 5 ? 'text-xl md:text-3xl max-w-2xl mx-auto' : 'text-base md:text-lg'
                            }`}>
                            {scenes[currentSceneIndex].subtext}
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 mb-12">
                            {scenes[currentSceneIndex].insights.map((s, i) => (
                                <span key={i} className="text-[10px] md:text-xs font-mono text-[#00ffcc] border border-[#00ffcc]/30 bg-[#00ffcc]/5 px-4 py-2 rounded-full uppercase tracking-widest">{s}</span>
                            ))}
                        </div>

                        <button
                            onClick={() => navigateToPoint(currentSceneIndex + 1)}
                            disabled={isTransitioning}
                            className={`px-12 py-5 rounded-full font-bold text-xs uppercase tracking-[0.3em] transition-all ${currentSceneIndex === scenes.length - 1
                                ? 'bg-[#00ffcc] text-black shadow-[0_0_30px_rgba(0,255,204,0.3)]'
                                : 'bg-white text-black hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)]'
                                } disabled:opacity-50`}
                        >
                            {currentSceneIndex === scenes.length - 1 ? "FINISH STORY" : "NEXT Phase ->"}
                        </button>
                    </div>
                </div>

                {/* Bottom: Footer Info */}
                <div className="flex justify-between items-end">
                    <button
                        onClick={completeExperience}
                        className="text-[10px] font-mono text-white/20 hover:text-white transition-colors uppercase tracking-[0.4em] pointer-events-auto"
                    >
                        [ EXIT_PROTOCOL ]
                    </button>
                    <div className="text-[10px] font-mono text-white/10 uppercase tracking-[0.4em]">
                        DATA_BLOCK_{currentSceneIndex + 1}_OF_{scenes.length}
                    </div>
                </div>
            </div>

            {/* 3D RENDER LAYER */}
            <div className="absolute inset-0 z-10">
                <Canvas shadows dpr={[1, 1.5]}>
                    <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />
                    <Environment preset="night" />

                    <Stars radius={150} depth={50} count={10000} factor={4} saturation={0} fade speed={1.5} />
                    <Sparkles count={500} scale={[100, 30, 30]} size={2} color="#00ffcc" opacity={0.2} />

                    <CameraController targetPos={currentPoint.position} />

                    {/* Ground Path Dots (Only after slide 5) */}
                    {currentSceneIndex >= 5 && pathPoints.map((_, i) => {
                        const isScenePoint = scenePointIndices.includes(i);
                        const p = pathPoints[i];
                        return (
                            <mesh key={i} position={[p.position[0], -0.1, p.position[2]]} rotation={[-Math.PI / 2, 0, 0]}>
                                <ringGeometry args={[0.2, isScenePoint ? 0.4 : 0.25, 32]} />
                                <meshStandardMaterial
                                    color={i === currentPointIndex ? "#00ffcc" : isScenePoint ? "#fff" : "#222"}
                                    emissive={i === currentPointIndex ? "#00ffcc" : "#000"}
                                    emissiveIntensity={4}
                                    transparent
                                    opacity={isScenePoint ? 0.8 : 0.3}
                                />
                            </mesh>
                        );
                    })}

                    {/* The Character (Only after slide 5) */}
                    {currentSceneIndex >= 5 && (
                        <group ref={boyRef}>
                            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                                <StoryPerson position={[0, 0, 0]} rotationY={personRotation} />
                            </Float>
                        </group>
                    )}

                    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={1}>
                        <group ref={rocketRef} position={[rocketPos.current.x, rocketPos.current.y, rocketPos.current.z]}>
                            <ThreeWayRocket
                                engineColor={themes[currentSceneIndex]}
                                isBursting={isTransitioning}
                            />
                        </group>
                    </Float>

                    {/* Optimized Smoke */}
                    <FoggySmoke
                        color={themes[currentSceneIndex]}
                        active={smokeOpacity > 0}
                        opacity={smokeOpacity}
                        emitterPosition={rocketPos.current}
                    />

                    <EffectComposer multisampling={0}>
                        <Bloom intensity={1.2} luminanceThreshold={0.9} radius={0.4} />
                    </EffectComposer>
                </Canvas>
            </div>
        </div>
    );
}
