import { motion } from 'framer-motion';
import { Code2, Server, Binary, Wrench } from 'lucide-react';
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
    const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

    return (
        <section id="chapter-3" className="min-h-screen px-6 py-24 bg-white">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-darkText mb-4">
                        Technical <span className="text-deepEmerald">Arsenal</span>
                    </h2>
                    <p className="text-lg text-lightText max-w-2xl mx-auto">
                        A continuous journey of learning and mastering new technologies
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skills.map((skillCategory, index) => {
                        const Icon = iconMap[skillCategory.icon] || Code2;
                        const isExpanded = expandedSkill === skillCategory.category;

                        return (
                            <motion.div
                                key={skillCategory.category}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -4 }}
                                onClick={() => setExpandedSkill(isExpanded ? null : skillCategory.category)}
                                className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all cursor-pointer border border-softGray"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-gradient-to-br from-mutedBlue/10 to-deepEmerald/10 rounded-xl">
                                        <Icon className="text-mutedBlue" size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-darkText mb-1">
                                            {skillCategory.category}
                                        </h3>
                                        <p className="text-sm text-lightText">
                                            {skillCategory.skills.length} skills
                                        </p>
                                    </div>
                                </div>

                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: isExpanded ? 'auto' : 0,
                                        opacity: isExpanded ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-4 border-t border-softGray">
                                        <div className="flex flex-wrap gap-2">
                                            {skillCategory.skills.map((skill) => (
                                                <motion.span
                                                    key={skill}
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="px-3 py-1.5 bg-gradient-to-r from-mutedBlue/10 to-deepEmerald/10 text-sm font-medium text-darkText rounded-lg border border-mutedBlue/20"
                                                >
                                                    {skill}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>

                                <button className="mt-4 text-sm font-medium text-mutedBlue hover:text-deepEmerald transition-colors">
                                    {isExpanded ? 'Collapse' : 'Expand skills'}
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
