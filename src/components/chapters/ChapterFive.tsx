import { motion } from 'framer-motion';
import { Sparkles, Brain } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { Canvas } from '@react-three/fiber';
import NetworkGraph from '../salaar/NetworkGraph';

interface ChapterFiveProps {
    vision: string;
}

export default function ChapterFive({ vision }: ChapterFiveProps) {
    const { isSalaarMode } = useSettings();

    return (
        <section id="chapter-5" className={`min-h-screen flex items-center justify-center px-6 py-20 transition-all duration-1000 relative overflow-hidden ${isSalaarMode ? 'bg-[#0a0000]' : 'bg-warmWhite'
            }`}>
            {isSalaarMode && (
                <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent" />
                    <Canvas dpr={[1, 2]}>
                        <NetworkGraph />
                    </Canvas>
                </div>
            )}
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className={`inline-flex items-center justify-center w-16 h-16 transition-colors duration-700 ${isSalaarMode
                            ? 'bg-red-900/20 text-red-600 rounded-none shadow-[0_0_20px_rgba(153,0,0,0.3)]'
                            : 'bg-gradient-to-br from-mutedBlue/20 to-deepEmerald/20 rounded-full'
                            } mb-8`}
                    >
                        {isSalaarMode ? <Brain size={32} /> : <Sparkles size={32} />}
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className={`text-3xl md:text-5xl font-bold mb-8 transition-colors duration-700 ${isSalaarMode ? 'text-white' : 'text-darkText'
                            }`}
                    >
                        {isSalaarMode ? 'The Khansaar' : "What I'm"} <span className={isSalaarMode ? 'text-red-700 font-mono uppercase tracking-widest' : 'text-deepEmerald'}>{isSalaarMode ? 'PROTOCOL' : 'Becoming'}</span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className={`p-6 md:p-12 transition-all duration-1000 border ${isSalaarMode
                            ? 'bg-black/60 border-red-900/20 rounded-none shadow-[inset_0_0_50px_rgba(153,0,0,0.05)]'
                            : 'bg-white rounded-3xl shadow-soft-lg border-softGray'
                            }`}
                    >
                        <p className={`text-base md:text-xl leading-relaxed text-balance px-2 transition-colors duration-700 ${isSalaarMode ? 'text-white/60 font-mono italic' : 'text-lightText'
                            }`}>
                            {isSalaarMode ? `[INTEL]: ${vision}` : vision}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className={`mt-12 text-sm transition-colors duration-700 ${isSalaarMode ? 'text-red-700 font-mono' : 'text-lightText'
                            }`}
                    >
                        <p>{isSalaarMode ? '// BATTLE_CONTINUITY: TRUE' : 'The journey continues...'}</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
