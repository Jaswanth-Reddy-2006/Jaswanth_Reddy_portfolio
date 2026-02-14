import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface ChapterFiveProps {
    vision: string;
}

export default function ChapterFive({ vision }: ChapterFiveProps) {
    return (
        <section id="chapter-5" className="min-h-screen flex items-center justify-center px-6 py-20 bg-warmWhite">
            <div className="max-w-4xl mx-auto text-center">
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
                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-mutedBlue/20 to-deepEmerald/20 rounded-full mb-8"
                    >
                        <Sparkles className="text-mutedBlue" size={32} />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-4xl md:text-5xl font-bold text-darkText mb-8"
                    >
                        What I'm <span className="text-deepEmerald">Becoming</span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="bg-white rounded-3xl p-8 md:p-12 shadow-soft-lg border border-softGray"
                    >
                        <p className="text-lg md:text-xl text-lightText leading-relaxed text-balance">
                            {vision}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="mt-12 text-sm text-lightText"
                    >
                        <p>The journey continues...</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
