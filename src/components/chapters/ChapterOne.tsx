import { motion } from 'framer-motion';

interface ChapterOneProps {
    name: string;
    tagline: string;
    introduction: string;
}

export default function ChapterOne({ name, tagline, introduction }: ChapterOneProps) {
    return (
        <section id="chapter-1" className="min-h-screen flex items-center justify-center px-6 py-20">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="max-w-4xl mx-auto text-center z-10">
                    <motion.h1
                        className="text-5xl sm:text-6xl md:text-8xl font-bold text-darkText mb-8 leading-tight tracking-tighter px-4"
                    >
                        {"The Curious".split("").map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                                whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 + i * 0.03, duration: 0.5 }}
                            >
                                {char}
                            </motion.span>
                        ))}
                        <br />
                        <span className="text-mutedBlue italic serif font-light">
                            {"Beginning".split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                                    whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + i * 0.03, duration: 0.5 }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="space-y-6"
                    >
                        <motion.h2
                            whileHover={{
                                scale: 1.02,
                                color: "#3366CC",
                                textShadow: [
                                    "0px 0px 0px rgba(51,102,204,0)",
                                    "2px 2px 0px rgba(51,102,204,0.3)",
                                    "-2px -2px 0px rgba(16,185,129,0.3)",
                                    "0px 0px 0px rgba(51,102,204,0)"
                                ]
                            }}
                            className="text-3xl md:text-4xl font-bold text-darkText tracking-tight cursor-default transition-colors"
                        >
                            {name}
                        </motion.h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {tagline.split(" | ").map((tag, i) => (
                                <span key={i} className="text-sm font-mono text-lightText px-3 py-1 bg-softGray/30 rounded-md border border-softGray/50">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                        className="mt-12 text-lg md:text-2xl text-lightText max-w-2xl mx-auto leading-relaxed text-balance font-light"
                    >
                        {introduction.split(/(\*\*.*?\*\*)/).map((part, i) =>
                            part.startsWith('**') && part.endsWith('**') ? (
                                <span key={i} className="text-mutedBlue font-bold">{part.slice(2, -2)}</span>
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
