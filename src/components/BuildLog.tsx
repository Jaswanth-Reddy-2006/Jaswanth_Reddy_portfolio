import { motion } from 'framer-motion';
import type { BuildLogItem } from '../data/portfolio';

interface BuildLogProps {
    items: BuildLogItem[];
}

export default function BuildLog({ items }: BuildLogProps) {
    return (
        <section id="build-log" className="py-32 px-6 bg-white border-t border-softGray relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_10%,rgba(51,102,204,0.02)_0%,transparent_50%)]" />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-end gap-3 mb-12 md:mb-20"
                >
                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold text-darkText tracking-tight mb-2 px-4 md:px-0">Build <span className="text-mutedBlue italic serif">Log</span></h2>
                        <p className="text-sm md:text-base text-lightText font-light px-4 md:px-0">Documenting the iterative process of system refinement.</p>
                    </div>
                    <div className="hidden md:block h-px flex-1 bg-softGray mb-2 mx-8" />
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-2 h-2 bg-deepEmerald rounded-full animate-pulse" />
                        <span className="text-[10px] font-mono font-bold text-lightText uppercase tracking-widest">v2.4.0-stable</span>
                    </div>
                </motion.div>

                <div className="space-y-4">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group grid grid-cols-1 md:grid-cols-12 gap-4 p-6 rounded-2xl hover:bg-mutedBlue/5 transition-all duration-500 border border-transparent hover:border-mutedBlue/10"
                        >
                            <div className="md:col-span-2">
                                <span className="text-xs font-mono font-bold text-mutedBlue/60 group-hover:text-mutedBlue transition-colors uppercase tracking-tighter block mt-1">
                                    [{item.date}]
                                </span>
                            </div>
                            <div className="md:col-span-1 pt-1 flex justify-center md:justify-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-softGray group-hover:bg-mutedBlue transition-all duration-500 group-hover:scale-150" />
                            </div>
                            <div className="md:col-span-9">
                                <p className="text-lg text-darkText font-light leading-relaxed group-hover:translate-x-1 transition-transform duration-500">
                                    <span className="text-mutedBlue/40 mr-2 font-mono">{'>'}</span>
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-softGray/20 border border-softGray/50">
                        <span className="text-xs font-mono text-lightText uppercase tracking-widest">End of stream</span>
                        <div className="w-4 h-[1px] bg-lightText/30" />
                        <span className="w-1.5 h-3 bg-mutedBlue animate-pulse" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
