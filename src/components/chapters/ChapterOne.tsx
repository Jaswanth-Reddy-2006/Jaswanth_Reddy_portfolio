import { motion } from 'framer-motion';
import { useSettings } from '../../context/SettingsContext';
import AudioIcon from '../AudioIcon';
import ChapterBackground from '../ChapterBackground';

interface ChapterOneProps {
    name: string;
    tagline: string;
    introduction: string;
}

export default function ChapterOne({ name, tagline, introduction }: ChapterOneProps) {
    const { isSalaarMode } = useSettings();

    return (
        <section id="chapter-1" className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
            <ChapterBackground chapter={1} />
            {isSalaarMode && (
                <>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.6, scale: 1 }}
                        transition={{ duration: 2, delay: 0.5 }}
                        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
                    >
                        <img
                            src="/assets/salaar/logo.png"
                            alt="Salaar Tribal Logo"
                            className="w-[100%] max-w-[1200px] object-contain brightness-0 invert opacity-40 filter invert-[0.4] sepia-[1] saturate-[1200%] hue-rotate-[0deg] contrast-[1.8]"
                            style={{ filter: "drop-shadow(0 0 50px rgba(255, 0, 0, 0.8))" }}
                        />
                    </motion.div>
                    {/* Background Visual Enhancements */}
                    <div className="absolute inset-0 z-[-1] pointer-events-none">
                        <motion.div
                            animate={{ opacity: [0.1, 0.3, 0.1], x: ["-100%", "100%"] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent blur-sm"
                        />
                        <motion.div
                            animate={{ opacity: [0.1, 0.3, 0.1], x: ["100%", "-100%"] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-800 to-transparent blur-sm"
                        />
                    </div>
                </>
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
                                <div className="flex flex-col items-center">
                                    <span className="text-5xl sm:text-7xl md:text-[9rem] font-black relative tracking-tight text-red-600 italic">
                                        KHANSAR KA SALAAR
                                    </span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <span className="text-5xl sm:text-7xl md:text-[9rem] font-extrabold text-balance">The Curious</span>
                                    <span className="italic text-mutedBlue font-light -mt-2 md:-mt-4 text-4xl md:text-6xl">Beginning</span>
                                </div>
                            )}
                        </motion.h1>

                        <div className="flex justify-center mt-4 gap-4">
                            {!isSalaarMode && (
                                <>
                                    <AudioIcon
                                        text="I design, I build a scalable website."
                                        salaarText="I ARCHITECT, I DOMINATE SCALABLE SYSTEMS."
                                    />
                                    <AudioIcon
                                        text="The beginning of a journey in engineering."
                                        salaarText="Khansaar strength initialized. The ceasefire is over."
                                    />
                                </>
                            )}
                        </div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className={`text-xl sm:text-2xl md:text-6xl font-black tracking-tighter cursor-default relative inline-block mx-auto transition-colors duration-700 ${isSalaarMode ? 'text-white italic uppercase' : 'text-darkText'
                                }`}
                        >
                            <span className={`relative z-10 ${isSalaarMode ? 'font-mono' : ''}`}>
                                {isSalaarMode ? name.toUpperCase() : name}
                            </span>
                            <motion.div
                                className={`absolute -inset-x-8 sm:-inset-x-12 -inset-y-4 sm:-inset-y-6 blur-2xl sm:blur-3xl rounded-full -z-0 pointer-events-none transition-colors duration-700 ${isSalaarMode ? 'bg-red-900/40' : 'bg-mutedBlue/5'
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
        </section>
    );
}
