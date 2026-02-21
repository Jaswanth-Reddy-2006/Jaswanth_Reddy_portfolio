import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

function PrabhasBlink() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1, 0] }}
            transition={{ duration: 1.5, times: [0, 0.2, 0.4, 0.8, 1] }}
            className="absolute inset-0 flex items-center justify-center z-[150] bg-black"
        >
            <div className="absolute inset-0 w-full h-full">
                <img
                    src="/assets/salaar/prabhas.jpg"
                    alt="REBEL STAR SALAAR"
                    className="w-full h-full object-cover brightness-[0.5] contrast-[1.3]"
                />
                <motion.div
                    animate={{ opacity: [0, 0.4, 0] }}
                    transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 0.4 }}
                    className="absolute inset-0 bg-red-600/10 mix-blend-color-dodge"
                />
            </div>
        </motion.div>
    );
}

export default function SalaarActivation({ onComplete }: SalaarActivationProps) {
    const [phase, setPhase] = useState<'text' | 'pic_blink' | 'blast' | 'splatter' | 'name' | 'complete'>('text');

    useEffect(() => {
        if (phase === 'pic_blink') {
            const timer = setTimeout(() => setPhase('complete'), 1200);
            return () => clearTimeout(timer);
        }
        if (phase === 'complete') {
            const timer = setTimeout(onComplete, 500);
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
                            onComplete={() => setPhase('pic_blink')}
                        />
                    </motion.div>
                )}

                {phase === 'pic_blink' && <PrabhasBlink />}
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
