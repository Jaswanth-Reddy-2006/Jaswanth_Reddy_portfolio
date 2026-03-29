import { motion } from 'framer-motion';
import { useSettings } from '../../context/SettingsContext';

interface ChapterFiveProps {
    vision: string;
}

export default function ChapterFive({ vision }: ChapterFiveProps) {
    const { isSalaarMode } = useSettings();

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            } as const,
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            } as const,
        },
    };

    const words = vision.split(" ");

    return (
        <section id="chapter-5" className="min-h-screen flex items-center justify-center px-6 pb-20 relative overflow-hidden bg-[#08080a]">
            {/* Cinematic Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-mutedBlue/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-0 w-full h-[400px] grid-horizon" />
                <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-[#08080a] via-transparent to-transparent" />
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-4 inline-block px-4 py-1.5 rounded-full border border-mutedBlue/20 bg-mutedBlue/5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] text-mutedBlue"
                    >
                        {isSalaarMode ? '// SYSTEM_PROTOCOL_INIT' : 'The Visionary Credo'}
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className={`text-4xl md:text-7xl font-bold mb-12 tracking-tighter transition-colors duration-700 ${isSalaarMode ? 'text-white' : 'text-darkText'}`}
                    >
                        {isSalaarMode ? 'The Khansaar' : "What I'm"} <span className={isSalaarMode ? 'text-red-700 font-mono uppercase tracking-[0.2em] italic' : 'text-deepEmerald italic serif'}>{isSalaarMode ? 'PROTOCOL' : 'Becoming'}</span>
                    </motion.h2>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={`p-10 md:p-20 transition-all duration-1000 flex flex-wrap justify-center gap-x-2 gap-y-1 ${isSalaarMode
                            ? 'bg-black/80 border-red-900/20 rounded-none shadow-[inset_0_0_100px_rgba(153,0,0,0.1)]'
                            : 'bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 shadow-2xl'
                            }`}
                    >
                        {words.map((word, index) => (
                            <motion.span
                                key={index}
                                variants={child}
                                className={`text-xl md:text-3xl font-light leading-snug transition-colors duration-700 ${isSalaarMode ? 'text-white/80 font-mono italic' : 'text-white/90'}`}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 0.4, scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1, duration: 1.5 }}
                        className="mt-20 flex flex-col items-center gap-4"
                    >
                        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-mutedBlue to-transparent" />
                        <p className={`text-[10px] md:text-xs tracking-[0.6em] uppercase transition-colors duration-700 ${isSalaarMode ? 'text-red-700 font-mono' : 'text-mutedBlue'}`}>
                            {isSalaarMode ? '// BATTLE_CONTINUITY: TRUE' : 'Endless Refinement // Constant Growth'}
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
