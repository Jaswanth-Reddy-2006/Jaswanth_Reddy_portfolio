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
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold text-darkText mb-6 leading-tight"
                    >
                        The Curious
                        <br />
                        <span className="text-mutedBlue">Beginning</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="space-y-4"
                    >
                        <h2 className="text-2xl md:text-3xl font-semibold text-darkText">
                            {name}
                        </h2>
                        <p className="text-lg text-lightText font-medium">
                            {tagline}
                        </p>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="mt-8 text-lg md:text-xl text-lightText max-w-2xl mx-auto leading-relaxed text-balance"
                    >
                        {introduction}
                    </motion.p>
                </div>
            </motion.div>
        </section >
    );
}
