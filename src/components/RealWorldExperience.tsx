import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import type { ExperienceItem } from '../data/portfolio';
import { HighlightGroup, HighlightItem } from './SmartHighlight';

interface RealWorldExperienceProps {
    experience: ExperienceItem[];
}

export default function RealWorldExperience({ experience }: RealWorldExperienceProps) {
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8 md:mb-16"
            >
                <h2 className="text-xl md:text-4xl font-bold text-darkText mb-4 tracking-tight flex items-center gap-3">
                    <Briefcase className="text-mutedBlue" size={24} />
                    Real-World Experience
                </h2>
                <div className="h-1 w-16 bg-mutedBlue rounded-full" />
            </motion.div>

            <HighlightGroup className="space-y-8">
                {experience.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                        <HighlightItem
                            id={item.id}
                            className="bg-white/50 backdrop-blur-sm border border-softGray rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                                {/* Left Column: Meta */}
                                <div className="md:w-1/3 flex-shrink-0">
                                    <h3 className="text-xl font-bold text-darkText mb-1">{item.role}</h3>
                                    <p className="text-lg text-mutedBlue font-medium mb-3">{item.company}</p>
                                    <div className="flex items-center gap-2 text-sm text-lightText bg-warmWhite/80 px-3 py-1.5 rounded-full w-fit">
                                        <Calendar size={14} />
                                        {item.duration}
                                    </div>

                                    {/* Tech Stack Pills - Desktop Position */}
                                    <div className="hidden md:flex flex-wrap gap-2 mt-6">
                                        {item.techStack.map(tech => (
                                            <span key={tech} className="text-xs px-2.5 py-1 bg-white border border-softGray rounded-md text-lightText font-mono">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Column: Impact */}
                                <div className="md:w-2/3">
                                    <ul className="space-y-3">
                                        {item.description.map((point, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-darkText/80 leading-relaxed">
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-deepEmerald flex-shrink-0" />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Tech Stack Pills - Mobile Position */}
                                    <div className="flex md:hidden flex-wrap gap-2 mt-6 pt-6 border-t border-softGray/50">
                                        {item.techStack.map(tech => (
                                            <span key={tech} className="text-xs px-2.5 py-1 bg-white border border-softGray rounded-md text-lightText font-mono">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </HighlightItem>
                    </motion.div>
                ))}
            </HighlightGroup>
        </section>
    );
}
