import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Sparkles, PerspectiveCamera } from '@react-three/drei';

interface SalaarActivationProps {
    onComplete: () => void;
}

function Typewriter({ text, speed = 100, onComplete }: { text: string, speed?: number, onComplete?: () => void }) {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        } else if (onComplete) {
            const finalTimeout = setTimeout(onComplete, 1000);
            return () => clearTimeout(finalTimeout);
        }
    }, [index, text, speed, onComplete]);

    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center text-red-600 font-mono text-xl md:text-3xl tracking-widest text-center max-w-2xl px-6 leading-relaxed">
                <span>{displayedText}</span>
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                    className="inline-block w-[0.5em] h-[1.2em] bg-red-700 ml-1 align-middle"
                />
            </div>
        </div>
    );
}

function BloodSplatter() {
    return (
        <div className="absolute inset-0 pointer-events-none z-[110]">
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, y: -20 }}
                    animate={{
                        opacity: [0, 0.8, 0.4],
                        scale: [0, 1.5, 1.2],
                        y: [0, 100 + Math.random() * 200]
                    }}
                    transition={{
                        duration: 1.5 + Math.random(),
                        delay: 0.2 + (i * 0.1),
                        ease: "easeOut"
                    }}
                    className="absolute rounded-full bg-red-900 shadow-[0_0_15px_rgba(153,0,0,0.5)]"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 80}%`,
                        width: `${Math.random() * 30 + 10}px`,
                        height: `${Math.random() * 60 + 20}px`,
                        filter: 'blur(2px)'
                    }}
                />
            ))}
        </div>
    );
}

function BloodBlast() {
    return (
        <Sparkles
            count={3000}
            scale={[2, 2, 2]}
            size={8}
            speed={20}
            opacity={1}
            color="#d00000"
        />
    );
}

export default function SalaarActivation({ onComplete }: SalaarActivationProps) {
    const [phase, setPhase] = useState<'text' | 'blast' | 'splatter' | 'name' | 'complete'>('text');

    useEffect(() => {
        if (phase === 'blast') {
            const timer = setTimeout(() => setPhase('splatter'), 1500);
            return () => clearTimeout(timer);
        }
        if (phase === 'splatter') {
            const timer = setTimeout(() => setPhase('name'), 2500);
            return () => clearTimeout(timer);
        }
        if (phase === 'name') {
            const timer = setTimeout(() => {
                setPhase('complete');
                setTimeout(onComplete, 1000);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [phase, onComplete]);

    return (
        <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
                {phase === 'text' && (
                    <motion.div
                        key="activating-text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                        className="uppercase font-black"
                    >
                        <Typewriter
                            text="THE CEASEFIRE IS OVER... SALAAR MODE ACTIVATING"
                            speed={60}
                            onComplete={() => setPhase('blast')}
                        />
                    </motion.div>
                )}

                {(phase === 'blast' || phase === 'splatter' || phase === 'name') && (
                    <motion.div
                        key="visual-fx"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        {phase === 'blast' && (
                            <div className="absolute inset-0">
                                <Canvas>
                                    <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                                    <BloodBlast />
                                    <pointLight position={[0, 0, 0]} intensity={20} color="#ff0000" />
                                </Canvas>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 0.4, 0] }}
                                    transition={{ duration: 1 }}
                                    className="absolute inset-0 bg-red-600/30"
                                />
                            </div>
                        )}

                        {phase === 'splatter' && <BloodSplatter />}

                        {phase === 'name' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, letterSpacing: "2em", filter: "blur(20px)" }}
                                animate={{ opacity: 1, scale: 1, letterSpacing: "0.2em", filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="text-red-600 text-5xl md:text-8xl font-black uppercase tracking-widest relative"
                            >
                                <span className="relative z-10">Jaswanth Reddy</span>
                                <motion.div
                                    animate={{ opacity: [0, 0.2, 0] }}
                                    transition={{ duration: 0.1, repeat: Infinity, repeatDelay: Math.random() }}
                                    className="absolute inset-0 text-white blur-sm"
                                >
                                    Jaswanth Reddy
                                </motion.div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ambient Grime */}
            {phase !== 'text' && (
                <div className="absolute inset-0 pointer-events-none opacity-30 select-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-950/40 via-transparent to-black" />
                </div>
            )}
        </div>
    );
}
