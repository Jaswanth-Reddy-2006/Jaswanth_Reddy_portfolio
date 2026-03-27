import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Stars, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { MINDSET_EXPERIENCES } from './IntroConstants';
import { useNavigate } from 'react-router-dom';
import { useExperience } from './ExperienceContext';

// --- Advanced Rocket Design ---
const RocketShip = ({ isDashing, isTransitioning, color }: { isDashing: boolean, isTransitioning: boolean, color: string }) => {
    const groupRef = useRef<THREE.Group>(null!);
    const coreRef = useRef<THREE.Mesh>(null!);
    
    useFrame((state, delta) => {
        if (isDashing) {
            // Full screen traverse from left (-10) to right (30+)
            groupRef.current.position.x += delta * 180;
            groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, 12, 0.1);
        } else if (isTransitioning) {
            // Strong push during insight switch
            groupRef.current.position.x += delta * 50;
        } else {
            // Hover at a visible starting point
            groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, -4, 0.05);
            groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, 1, 0.1);
        }

        // Core Pulse
        if (coreRef.current) {
            coreRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 10) * 0.1);
        }

        // Sligth tilt
        groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.05;
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    });

    return (
        <group ref={groupRef} rotation={[0, -Math.PI / 2, 0]} position={[-15, 0, 0]}>
            {/* Command Module (Nose) */}
            <mesh position={[1.4, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                <coneGeometry args={[0.3, 0.8, 32]} />
                <meshStandardMaterial color="#fff" metalness={1} roughness={0} />
            </mesh>
            
            {/* Primary Fuselage Shell */}
            <mesh castShadow>
                <cylinderGeometry args={[0.4, 0.45, 2, 32]} rotation={[0, 0, -Math.PI / 2]} />
                <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Glowing Ion Core (Visible through gaps) */}
            <mesh ref={coreRef}>
                <cylinderGeometry args={[0.2, 0.2, 1.8, 16]} rotation={[0, 0, -Math.PI / 2]} />
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
                setIsTransitioning(false);
            }, 600);
        } else {
            setIsDashing(true);
            setTimeout(() => {
                setIsGuidedMode(false);
                navigate('/chapter-1');
            }, 1000);
        }
    };

    return (
        <div className="fixed inset-0 bg-[#020617] text-white flex flex-col md:flex-row overflow-hidden select-none">
            {/* Decorative Smoke Effect (Fullscreen Overlay) */}
            <AnimatePresence>
                {isTransitioning && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-5 pointer-events-none"
                        style={{ backgroundColor: currentColor }}
                    />
                )}
            </AnimatePresence>

            {/* Left: Content Area */}
            <div className="relative z-20 w-full md:w-[45%] h-full flex flex-col justify-center px-12 md:px-24 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent backdrop-blur-[2px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIdx}
                        initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="flex flex-col gap-10"
                    >
                        <div className="flex items-center gap-6">
                            <span className="w-12 h-1 bg-blue-600/50 rounded-full" />
                            <span className="text-[10px] uppercase tracking-[0.6em] text-slate-500 font-black">Mindset Segment {currentIdx + 1}</span>
                        </div>
                        
                        <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] italic italic-outline" style={{ color: currentColor }}>
                            {currentMindset.title}
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed max-w-lg border-l-4 border-white/5 pl-10 py-2">
                            {currentMindset.description}
                        </p>

                        <div className="flex items-center gap-8 mt-6">
                            <button 
                                onClick={handleNext}
                                className="group relative px-16 py-6 overflow-hidden rounded-2xl border border-white/10 hover:border-white/40 transition-all active:scale-95 shadow-2xl bg-black/20"
                            >
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.8em]">
                                    {currentIdx === MINDSET_EXPERIENCES.length - 1 ? "Launch Portfolio" : "Next Protocol"}
                                </span>
                                {/* Smoke Hover Effect */}
                                <motion.div 
                                    className="absolute inset-0 z-0 bg-blue-500/10 blur-3xl opacity-0 group-hover:opacity-100"
                                    animate={{ scale: [1, 1.5, 1] }}
                                    transition={{ repeat: Infinity, duration: 3 }}
                                />
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Vertical Progress */}
                <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                    {MINDSET_EXPERIENCES.map((_, i) => (
                        <div 
                            key={i} 
                            className={`w-1 transition-all duration-700 rounded-full ${i === currentIdx ? 'h-12 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'h-3 bg-slate-800'}`} 
                        />
                    ))}
                </div>
            </div>

            {/* Right: Cinematic WebGL Scene */}
            <div className="absolute right-0 top-0 w-full h-full z-10 pointer-events-none">
                <Canvas shadows dpr={[1, 2]}>
                    <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
                    <ambientLight intensity={0.4} />
                    <pointLight position={[10, 10, 10]} intensity={2} color={currentColor} />
                    
                    <Stars radius={120} depth={50} count={6000} factor={6} saturation={0} fade speed={1.5} />
                    
                    <RocketShip 
                        isDashing={isDashing} 
                        isTransitioning={isTransitioning} 
                        color={currentColor} 
                    />
                    
                    <Environment preset="night" />
                </Canvas>
                
                {/* Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-60" />
            </div>
        </div>
    );
}
