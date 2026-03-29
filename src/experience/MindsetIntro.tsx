import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Stars, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { MINDSET_EXPERIENCES } from './IntroConstants';
import { useNavigate } from 'react-router-dom';
import { useExperience } from './ExperienceContext';
import { X } from 'lucide-react';

// --- Advanced Rocket Design ---
const RocketShip = ({ isDashing, isTransitioning, color }: { isDashing: boolean, isTransitioning: boolean, color: string }) => {
    const groupRef = useRef<THREE.Group>(null!);
    const coreRef = useRef<THREE.Mesh>(null!);
    
    useFrame((state, delta) => {
        if (isDashing) {
            // Full screen traverse from left to beyond right
            groupRef.current.position.x += delta * 150;
            groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, 15, 0.1);
        } else if (isTransitioning) {
            // Fast blast during content change
            groupRef.current.position.x += delta * 120;
            groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, 8, 0.1);
        } else {
            // Smooth Hover at left (User requested left position)
            groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, -5, 0.05);
            groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, 1.2, 0.1);
        }

        // Core Pulse
        if (coreRef.current) {
            coreRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 15) * (isTransitioning ? 0.3 : 0.1));
        }

        // Slight tilt and sway
        groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.08;
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
    });

    return (
        <group ref={groupRef} rotation={[0, 0, 0.1]} position={[-15, 0, 0]}>
            {/* Command Module (Nose) */}
            <mesh position={[1.4, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                <coneGeometry args={[0.3, 0.8, 32]} />
                <meshStandardMaterial color="#fff" metalness={1} roughness={0} />
            </mesh>
            
            {/* Primary Fuselage Shell */}
            <mesh castShadow rotation={[0, 0, -Math.PI / 2]}>
                <cylinderGeometry args={[0.4, 0.45, 2, 32]} />
                <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Glowing Ion Core (Visible through gaps) */}
            <mesh ref={coreRef} rotation={[0, 0, -Math.PI / 2]}>
                <cylinderGeometry args={[0.2, 0.2, 1.8, 16]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} transparent opacity={0.6} />
            </mesh>

            {/* Quad Wing Array */}
            {[0, 1, 2, 3].map((i) => (
                <group key={i} rotation={[(i * Math.PI) / 2, 0, 0]}>
                    <mesh position={[-0.2, 0.6, 0]} rotation={[0, 0, 0]}>
                        <boxGeometry args={[1.2, 0.05, 0.3]} />
                        <meshStandardMaterial color="#334155" />
                    </mesh>
                    <mesh position={[-0.6, 0.8, 0]}>
                        <boxGeometry args={[0.4, 0.4, 0.04]} />
                        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
                    </mesh>
                </group>
            ))}

            {/* Engine Exhaust Port */}
            <group position={[-1.1, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                <mesh>
                    <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
                    <meshStandardMaterial color="#1e293b" />
                </mesh>
                <pointLight intensity={10} distance={5} color={color} />
                <Sparkles count={40} scale={2} size={6} speed={3} color={color} />
            </group>
        </group>
    );
};

// --- Main Intro Component ---
export default function MindsetIntro() {
    const navigate = useNavigate();
    const { setIsGuidedMode } = useExperience();
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isDashing, setIsDashing] = useState(false);
    
    const currentMindset = MINDSET_EXPERIENCES[currentIdx];
    const currentColor = useMemo(() => (currentIdx % 2 === 0 ? "#22d3ee" : "#a855f7"), [currentIdx]);

    const handleNext = () => {
        if (currentIdx < MINDSET_EXPERIENCES.length - 1) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentIdx(prev => prev + 1);
                // Reset rocket position to far left to "fly back in"
                // But wait, the logic in useFrame lerps to 0. 
                // Let's force it slightly by hiding or just letting it cycle if it is offscreen.
                setIsTransitioning(false);
            }, 800);
        } else {
            setIsDashing(true);
            setTimeout(() => {
                setIsGuidedMode(false);
                navigate('/chapter-1');
            }, 1000);
        }
    };

    const handleSkip = () => {
        setIsGuidedMode(false);
        navigate('/chapter-1');
    };

    return (
        <div className="fixed inset-0 bg-[#020617] text-white flex flex-col overflow-hidden select-none">
            {/* Skip Button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleSkip}
                className="fixed top-8 right-8 z-[100] group flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 hover:border-white/40 bg-black/20 backdrop-blur-md transition-all active:scale-95 text-[10px] font-black uppercase tracking-[0.4em]"
            >
                <span className="opacity-40 group-hover:opacity-100">Skip Intro</span>
                <X size={14} className="text-white/40 group-hover:text-white" />
            </motion.button>

            {/* Transition Smoke / Blur Overlay */}
            <AnimatePresence>
                {isTransitioning && (
                    <motion.div 
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        className="fixed inset-0 z-[50] pointer-events-none flex items-center justify-center"
                    >
                        <div className="w-full h-full opacity-30 animate-pulse" style={{ backgroundColor: currentColor }} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content: Centered Layout */}
            <div className="relative z-40 w-full h-full flex flex-col justify-center items-center text-center px-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIdx}
                        initial={{ opacity: 0, scale: 0.95, filter: 'blur(15px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.05, filter: 'blur(15px)' }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex flex-col items-center gap-12 max-w-4xl"
                    >
                        <div className="space-y-4">
                            <h1 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-[0.8] italic text-outline transition-colors duration-700" style={{ color: currentColor }}>
                                {currentMindset.title}
                            </h1>
                        </div>

                        {/* Three Points (Insights) - Vertical Bullet List */}
                        <div className="flex flex-col items-center gap-10">
                            <div className="flex flex-col items-center gap-3">
                                <motion.div 
                                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="h-px w-32 bg-gradient-to-r from-transparent via-white/40 to-transparent" 
                                />
                            </div>

                            <div className="flex flex-col gap-5 text-left w-full max-w-sm">
                                {currentMindset.insights?.map((point: string, i: number) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + i * 0.15 }}
                                        className="group relative flex items-center gap-8 pl-6"
                                    >
                                        <div className="absolute left-0 w-1.5 h-1.5 rounded-full ring-8 ring-white/5 transition-all duration-500 group-hover:scale-150" style={{ backgroundColor: currentColor }} />
                                        <div className="flex flex-col">
                                            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-slate-300 group-hover:text-white transition-colors leading-relaxed">{point}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-8 mt-12">
                            <button 
                                onClick={handleNext}
                                className="group relative pr-8 pl-12 py-6 overflow-hidden rounded-full border border-white/10 hover:border-white/40 transition-all active:scale-95 shadow-[0_0_50px_rgba(34,211,238,0.1)] bg-black/40 flex items-center gap-4"
                            >
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative z-10 text-xs font-black uppercase tracking-[1em]">
                                    {currentIdx === MINDSET_EXPERIENCES.length - 1 ? "Launch" : "Next"}
                                </span>
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="relative z-10"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </motion.div>
                                
                                {/* Engine Glow Glow */}
                                <motion.div 
                                    className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl scale-150"
                                    style={{ backgroundColor: `${currentColor}20` }}
                                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                />
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Cinematic WebGL Scene (Full Screen Background) */}
            <div className="fixed inset-0 z-10 pointer-events-none opacity-60">
                <Canvas shadows dpr={[1, 2]}>
                    <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={3} color={currentColor} />
                    
                    <Stars radius={150} depth={50} count={8000} factor={6} saturation={0} fade speed={1.5} />
                    
                    <RocketShip 
                        isDashing={isDashing} 
                        isTransitioning={isTransitioning} 
                        color={currentColor} 
                    />
                    
                    <Environment preset="night" />
                </Canvas>
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-[#020617]" />
            </div>
            
            {/* Cinematic Vignette */}
            <div className="fixed inset-0 z-20 pointer-events-none bg-gradient-radial from-transparent via-transparent to-black/80" />
        </div>
    );
}
