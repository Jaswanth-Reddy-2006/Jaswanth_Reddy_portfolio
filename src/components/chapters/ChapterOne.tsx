import { motion } from 'framer-motion';
import { useSettings } from '../../context/SettingsContext';

interface ChapterOneProps {
    name: string;
    tagline: string;
    introduction: string;
}

export default function ChapterOne({ name, tagline, introduction }: ChapterOneProps) {
    const { isSalaarMode } = useSettings();

    return (
        <section id="chapter-1" className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
            {isSalaarMode && (
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent" />
                </div>
            )}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
            >
                <div className="text-center z-10 space-y-6 md:space-y-16">
                    {/* Main Headline */}
                    <div className="space-y-4 md:space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className={`text-5xl sm:text-7xl md:text-[9rem] font-bold tracking-tighter leading-[0.85] flex flex-col items-center transition-colors duration-700 ${isSalaarMode ? 'text-white' : 'text-darkText'
                                }`}
                        >
                            {isSalaarMode ? (
                                <>
                                    <span className="font-black relative">
                                        KHANSAAR
                                        <motion.span
                                            animate={{
                                                opacity: [0, 1, 0, 1, 0],
                                                x: [-2, 2, -2, 4, -4],
                                                filter: ["blur(0px)", "blur(2px)", "blur(0px)", "blur(4px)", "blur(0px)"]
                                            }}
                                            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 2 }}
                                            className="absolute inset-0 text-red-700 opacity-50"
                                        >
                                            KHANSAAR
                                        </motion.span>
                                    </span>
                                    <span className="italic text-red-600 font-light -mt-2 md:-mt-4 uppercase tracking-[0.2em] text-4xl md:text-6xl">STRENGTH INITIALIZED</span>
                                </>
                            ) : (
                                <>
                                    <span className="font-extrabold text-balance">The Curious</span>
                                    <span className="italic text-mutedBlue font-light -mt-2 md:-mt-4">Beginning</span>
                                </>
                            )}
                        </motion.h1>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className={`text-xl sm:text-2xl md:text-5xl font-bold tracking-tight cursor-default relative inline-block mx-auto transition-colors duration-700 ${isSalaarMode ? 'text-red-600' : 'text-darkText'
                                }`}
                        >
                            <span className={`relative z-10 ${isSalaarMode ? 'font-mono uppercase tracking-widest' : ''}`}>
                                {isSalaarMode ? `SALAAR: ${name.split(' ').join('_').toUpperCase()}` : name}
                            </span>
                            <motion.div
                                className={`absolute -inset-x-8 sm:-inset-x-12 -inset-y-4 sm:-inset-y-6 blur-2xl sm:blur-3xl rounded-full -z-0 pointer-events-none transition-colors duration-700 ${isSalaarMode ? 'bg-red-900/20' : 'bg-mutedBlue/5'
                                    }`}
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.h2>
                    </div>

                    {/* Tags */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-wrap justify-center gap-2 md:gap-3 px-4"
                    >
                        {tagline.split(" | ").map((tag, i) => (
                            <div key={i} className="relative group">
                                <span
                                    className={`text-[9px] sm:text-[10px] md:text-xs font-mono px-3 py-1.5 md:px-4 md:py-2 transition-all duration-700 whitespace-nowrap shadow-sm backdrop-blur-[2px] ${isSalaarMode
                                        ? 'text-red-500 border-red-900/30 bg-red-900/5 rounded-none skew-x-[-12deg] group-hover:border-red-600 group-hover:bg-red-900/10'
                                        : 'text-lightText/80 bg-softGray/30 rounded-md border border-softGray/50'
                                        }`}
                                >
                                    {isSalaarMode ? `// ${tag.toUpperCase()}` : tag}
                                </span>
                                {isSalaarMode && (
                                    <motion.div
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                                        className="absolute -top-1 -right-1 w-1 h-1 bg-red-600 rounded-full"
                                    />
                                )}
                            </div>
                        ))}
                    </motion.div>

                    {isSalaarMode && (
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "200px" }}
                            viewport={{ once: true }}
                            className="h-1 bg-red-900/20 mx-auto mt-4 relative overflow-hidden"
                        >
                            <motion.div
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-red-600"
                            />
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[8px] font-mono text-red-500 uppercase tracking-widest whitespace-nowrap">
                                Salar Power Sync: {Math.floor(Math.random() * 20) + 80}%
                            </div>
                        </motion.div>
                    )}

                    {/* Introduction */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className={`text-base sm:text-xl md:text-3xl max-w-4xl mx-auto leading-relaxed md:leading-[1.5] text-balance font-light px-6 transition-colors duration-700 ${isSalaarMode ? 'text-white/60' : 'text-lightText/60'
                            }`}
                    >
                        {introduction.split(/(\*\*.*?\*\*)/).map((part, i) =>
                            part.startsWith('**') && part.endsWith('**') ? (
                                <span key={i} className={`${isSalaarMode ? 'text-red-100 font-bold' : 'text-mutedBlue/80 font-semibold'}`}>{part.slice(2, -2)}</span>
                            ) : (
                                part
                            )
                        )}
                    </motion.p>
                </div>
            </motion.div>
        </section >
    );
}
