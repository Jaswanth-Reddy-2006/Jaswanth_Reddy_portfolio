import { motion } from 'framer-motion';
import { Zap, Maximize, User } from 'lucide-react';
import type { CoreValue } from '../data/portfolio';

interface CoreValuesProps {
    values: CoreValue[];
}

const iconMap: Record<string, any> = {
    Zap,
    Maximize,
    User
};

export default function CoreValues({ values }: CoreValuesProps) {
    if (!values) return null;

    return (
        <section className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-sm font-mono font-bold text-mutedBlue uppercase tracking-[0.4em] mb-4">Engineering Philosophy</h2>
                    <h3 className="text-3xl md:text-5xl font-bold text-darkText tracking-tight">Core <span className="text-mutedBlue italic serif">Directives</span></h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((value, index) => {
                        const Icon = iconMap[value.icon] || Zap;
                        return (
                            <motion.div
                                key={value.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                whileHover={{ y: -10 }}
                                className="group p-10 bg-white border border-softGray rounded-[2.5rem] shadow-soft hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-mutedBlue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-mutedBlue/10 transition-colors" />

                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-mutedBlue/10 rounded-2xl flex items-center justify-center text-mutedBlue mb-8 group-hover:bg-mutedBlue group-hover:text-white transition-all duration-500 shadow-lg shadow-mutedBlue/5">
                                        <Icon size={28} />
                                    </div>
                                    <h4 className="text-2xl font-bold text-darkText mb-4 group-hover:text-mutedBlue transition-colors">{value.title}</h4>
                                    <p className="text-lightText leading-relaxed font-light">
                                        {value.description}
                                    </p>
                                </div>

                                <div className="mt-8 pt-8 border-t border-softGray flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span className="text-[10px] font-mono font-bold text-mutedBlue uppercase tracking-widest">Protocol 0{index + 1}</span>
                                    <div className="w-12 h-px bg-mutedBlue/20" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
