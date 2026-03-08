import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useSettings } from '../../context/SettingsContext';
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import StoryPerson from '../../experience/StoryPerson';

interface ChapterOneProps {
    name: string;
    tagline: string;
    introduction: string;
}

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

export default function ChapterOne({ name, tagline, introduction }: ChapterOneProps) {
    const { isSalaarMode } = useSettings();
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

    // White mode — hero exit effects (content only, background handled globally)
    const headlineScale = useTransform(smoothProgress, [0, 0.5], [1, 0.92]);
    const headlineOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);

    // White mode — underline animation
    const underlineScaleX = useTransform(smoothProgress, [0, 0.3], [1, 0]);

    // Salaar — 3D Parallax & Depth
    const heroRotateX = useTransform(smoothProgress, [0, 1], [0, 3]); // Subconscious tilt

    return (
        <section
            ref={sectionRef}
            id="chapter-1"
            className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
            style={{ perspective: '1200px' }}
        >
            {/* ── SALAAR ENGINE 3D LAYERS ── */}
            {isSalaarMode && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Layer 1: Horizon Glow (translateZ: -50px) */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[80%] bg-gradient-to-t from-[#5a0000]/30 to-transparent"
                        style={{ translateZ: '-50px', rotateX: heroRotateX }}
                    />
                </div>
            )}

            {/* ── FOREGROUND CONTENT (Restored original structure) ── */}
            <motion.div
                style={isSalaarMode
                    ? { translateZ: '50px', rotateX: heroRotateX, zIndex: 10 }
                    : { scale: headlineScale, opacity: headlineOpacity }}
                className="max-w-4xl mx-auto relative z-10"
            >
                <div className="text-center space-y-6 md:space-y-12">
                    {/* Perspective Label (Small, top) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className={`text-[10px] uppercase tracking-[0.4em] font-mono ${isSalaarMode ? 'text-red-500/60' : 'text-mutedBlue/40'}`}
                    >
                        {isSalaarMode ? "// KHANSAAR FOUNDATION INITIALIZED" : "EST. 2024 • SYSTEM_01"}
                    </motion.div>

                    {/* Main Headline (Name) */}
                    <div className="space-y-4 md:space-y-6 flex flex-col items-center">
                        <div className="relative inline-block">
                            <motion.h1
                                initial={{ opacity: 0, y: -50, scale: 1.1, filter: 'blur(20px)' }}
                                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                                transition={{ duration: 1.2, ease: PREMIUM_EASE, delay: 0.1 }}
                                className={`text-6xl sm:text-8xl md:text-[10rem] font-black tracking-tighter leading-[0.8] transition-colors duration-700 ${isSalaarMode ? 'text-white italic' : 'text-darkText'}`}
                                style={isSalaarMode ? { textShadow: '0 0 30px rgba(139,0,0,0.4)' } : {}}
                            >
                                {isSalaarMode ? name.toUpperCase() : name}
                            </motion.h1>

                            {/* Floating Character next to Name (Main Page Integration) */}
                            {!isSalaarMode && (
                                <div className="absolute -right-20 -top-10 w-32 h-32 hidden md:block">
                                    <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
                                        <Environment preset="night" />
                                        <ambientLight intensity={0.5} />
                                        <Float speed={3} rotationIntensity={0.6} floatIntensity={0.6}>
                                            <StoryPerson position={[0, -1, 0]} rotationY={-Math.PI / 4} />
                                        </Float>
                                    </Canvas>
                                </div>
                            )}
                        </div>

                        {/* White mode animated underline */}
                        {!isSalaarMode && (
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1, delay: 0.8, ease: "circOut" }}
                                className="mx-auto h-[2px] bg-mutedBlue/40 rounded-full"
                                style={{ scaleX: underlineScaleX, originX: 0, width: '120px' }}
                            />
                        )}

                        {/* Tagline */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: PREMIUM_EASE }}
                            className={`text-xl sm:text-2xl md:text-3xl font-bold tracking-tight px-4 max-w-2xl mx-auto ${isSalaarMode ? 'text-red-600 font-mono italic flex flex-col gap-2' : 'text-mutedBlue'}`}
                        >
                            {isSalaarMode ? tagline.toUpperCase().split(' | ').join(' • ') : tagline}
                        </motion.div>
                    </div>

                    {/* Introduction / Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: PREMIUM_EASE, delay: 0.8 }}
                        className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light px-6 transition-colors duration-700 ${isSalaarMode ? 'text-white/50' : 'text-lightText/60'}`}
                    >
                        {introduction.split(/(\*\*.*?\*\*)/).map((part, i) =>
                            part.startsWith('**') && part.endsWith('**') ? (
                                <span key={i} className={`${isSalaarMode ? 'text-red-200' : 'text-mutedBlue/80 font-semibold'}`}>{part.slice(2, -2)}</span>
                            ) : (
                                part
                            )
                        )}
                    </motion.p>

                </div>
            </motion.div>
        </section>
    );
}
