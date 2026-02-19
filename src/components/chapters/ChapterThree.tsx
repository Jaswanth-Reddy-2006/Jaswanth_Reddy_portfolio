import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Server, Binary, Wrench, ArrowRight } from 'lucide-react';
import type { SkillCategory } from '../../data/portfolio';
import { useState } from 'react';

interface ChapterThreeProps {
    skills: SkillCategory[];
}

const iconMap: Record<string, any> = {
    Code2,
    Server,
    Binary,
    Wrench,
};

export default function ChapterThree({ skills }: ChapterThreeProps) {
    const [expandedSkill, setExpandedSkill] = useState<string | null>(skills[0]?.category || null);

    return (
        <section id="chapter-3" className="min-h-screen px-4 md:px-6 py-16 md:py-24 bg-white relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-mutedBlue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-deepEmerald/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-darkText mb-6 tracking-tight flex flex-col md:flex-row items-center justify-center gap-4">
                        <div className="relative w-16 h-16 md:w-20 md:h-20">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-2 border-dashed border-mutedBlue/20 rounded-full"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-2 border border-dotted border-deepEmerald/20 rounded-full"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-2 h-2 bg-mutedBlue rounded-full shadow-[0_0_10px_#3366CC]" />
                            </div>
                            <motion.div
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-mutedBlue/5 rounded-full"
                            />
                        </div>
                        Technical <span className="text-mutedBlue italic serif">Arsenal</span>
                    </h2>
                    <p className="text-xl text-lightText max-w-2xl mx-auto font-light leading-relaxed">
                        A curated collection of technologies used to architect
                        <span className="text-darkText font-medium"> scalable, high-impact systems</span>.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left: Category Selection */}
                    <div className="lg:col-span-5 space-y-4">
                        {skills.map((skillCategory, index) => {
                            const Icon = iconMap[skillCategory.icon] || Code2;
                            const isActive = expandedSkill === skillCategory.category;

                            return (
                                <motion.div
                                    key={skillCategory.category}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    onClick={() => setExpandedSkill(skillCategory.category)}
                                    className={`group cursor-pointer p-6 rounded-2xl transition-all duration-500 border ${isActive
                                        ? 'bg-white shadow-xl border-mutedBlue/20 scale-102'
                                        : 'bg-transparent border-transparent hover:bg-mutedBlue/5'}`}
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={`p-4 rounded-xl transition-all duration-500 ${isActive
                                            ? 'bg-mutedBlue text-white shadow-lg shadow-mutedBlue/20'
                                            : 'bg-softGray/50 text-mutedBlue group-hover:bg-mutedBlue/10'}`}>
                                            <Icon size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`text-xl font-bold transition-colors duration-500 ${isActive ? 'text-darkText' : 'text-lightText group-hover:text-darkText'}`}>
                                                {skillCategory.category}
                                            </h3>
                                            <p className="text-sm font-mono text-mutedBlue/60">
                                                0{index + 1} // {skillCategory.skills.length} core units
                                            </p>
                                        </div>
                                        {isActive && (
                                            <motion.div layoutId="active-indicator">
                                                <ArrowRight className="text-mutedBlue" size={20} />
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Right: Skill Visualization */}
                    <div className="lg:col-span-7 h-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={expandedSkill}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="bg-gradient-to-br from-white to-warmWhite rounded-3xl p-8 md:p-12 shadow-inner border border-softGray h-full min-h-[400px] flex flex-col justify-center"
                            >
                                <div className="space-y-8">
                                    <div className="flex flex-wrap gap-4">
                                        {skills.find(s => s.category === expandedSkill)?.skills.map((skill, i) => (
                                            <motion.div
                                                key={skill}
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                className="px-6 py-3 bg-white rounded-xl shadow-sm border border-softGray hover:border-mutedBlue/30 hover:shadow-md transition-all group/skill relative overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-mutedBlue/5 translate-y-full group-hover/skill:translate-y-0 transition-transform duration-300" />
                                                <span className="text-lg font-medium text-darkText relative z-10">{skill}</span>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="pt-8 border-t border-softGray/50 mt-auto">
                                        <div className="flex items-center gap-4 text-lightText italic">
                                            <div className="w-12 h-[1px] bg-mutedBlue/30" />
                                            <p className="text-sm">Mastery through implementation and continuous performance benchmarking.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
