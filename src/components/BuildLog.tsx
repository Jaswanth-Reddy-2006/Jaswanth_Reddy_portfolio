import { motion } from 'framer-motion';
import type { BuildLogItem } from '../data/portfolio';

interface BuildLogProps {
    items: BuildLogItem[];
}

export default function BuildLog({ items }: BuildLogProps) {
    return (
        <section id="build-log" className="py-20 px-6 bg-warmWhite border-t border-softGray">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-12"
                >
                    <h2 className="text-2xl font-bold text-darkText">Build Log</h2>
                    <div className="h-px flex-1 bg-softGray" />
                    <span className="text-xs font-mono text-mutedBlue bg-mutedBlue/10 px-3 py-1 rounded-full">
                        continuous-shipping
                    </span>
                </motion.div>

                <div className="relative border-l border-softGray ml-3 space-y-12">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-8"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-deepEmerald border-2 border-warmWhite ring-1 ring-softGray" />

                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                                <span className="text-sm font-mono text-mutedBlue shrink-0 w-24">
                                    {item.date}
                                </span>
                                <p className="text-lightText leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
