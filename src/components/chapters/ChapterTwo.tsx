import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import type { Project } from '../../data/portfolio';
import { HighlightGroup, HighlightItem } from '../SmartHighlight';

interface ChapterTwoProps {
    projects: Project[];
}

export default function ChapterTwo({ projects }: ChapterTwoProps) {
    const [focusedId, setFocusedId] = useState<string | null>(null);
    const [caseStudyId, setCaseStudyId] = useState<string | null>(null);

    const handleCardClick = (id: string) => {
        if (!focusedId) setFocusedId(id);
    };

    const toggleCaseStudy = (id: string) => {
        setCaseStudyId(id);
        setFocusedId(null);
    };

    const closeFocus = () => setFocusedId(null);
    const closeCaseStudy = () => setCaseStudyId(null);

    const activeProject = projects.find(p => p.id === caseStudyId);

    if (caseStudyId && activeProject) {
        return (
            <section className="min-h-screen px-6 py-20 bg-warmWhite transition-all duration-700">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={closeCaseStudy}
                        className="flex items-center gap-2 text-mutedBlue hover:text-darkText transition-colors mb-12 group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Timeline</span>
                    </button>

                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-deepEmerald/10 text-deepEmerald text-xs font-bold rounded-full uppercase tracking-widest">
                                {activeProject.impactBadge}
                            </span>
                            <span className="text-lightText font-mono text-sm">{activeProject.year}</span>
                        </div>
                        <h2 className="text-5xl font-bold text-darkText mb-8">{activeProject.title}</h2>
                        <p className="text-2xl text-lightText font-light leading-relaxed">{activeProject.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-widest text-mutedBlue mb-4">The Problem</h4>
                                <p className="text-darkText/80 leading-relaxed">{activeProject.problem}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-widest text-mutedBlue mb-4">The Outcome</h4>
                                <p className="text-darkText/80 leading-relaxed">{activeProject.outcome}</p>
                            </div>
                        </div>
                        <div className="bg-softGray/30 rounded-3xl p-8 border border-softGray">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-mutedBlue mb-6 text-center">Engineering Metrics</h4>
                            <div className="grid grid-cols-2 gap-8">
                                {activeProject.metrics?.map(m => (
                                    <div key={m.label} className="text-center">
                                        <div className="text-3xl font-bold text-darkText mb-1">{m.value}</div>
                                        <div className="text-[10px] uppercase font-bold text-lightText tracking-tighter">{m.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-softGray pt-12">
                        <h3 className="text-2xl font-bold text-darkText mb-8">Engineering Decisions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <p className="text-darkText/80 leading-relaxed"><span className="font-bold text-mutedBlue">Rationale:</span> {activeProject.decisions.why}</p>
                                <p className="text-darkText/80 leading-relaxed"><span className="font-bold text-mutedBlue">Scalability:</span> {activeProject.decisions.scalability}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-widest text-mutedBlue mb-4">Tradeoffs Considered</h4>
                                <ul className="space-y-3">
                                    {activeProject.decisions.tradeoffs.map((t, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-lightText">
                                            <span className="text-deepEmerald font-bold">•</span>
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section id="chapter-2" className="min-h-screen px-6 py-20 bg-gradient-to-b from-warmWhite to-softGray relative">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-darkText mb-4">
                        The Builder <span className="text-deepEmerald">Phase</span>
                    </h2>
                    <p className="text-lg text-lightText max-w-2xl mx-auto">
                        Every project is a milestone in the journey of learning and creating
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Timeline line - hidden on mobile */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-mutedBlue/20" />

                    <HighlightGroup className="space-y-12 md:space-y-16">
                        {projects.map((project, index) => {
                            const isFocused = focusedId === project.id;
                            const isOtherFocused = focusedId && focusedId !== project.id;

                            return (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    animate={{
                                        opacity: isOtherFocused ? 0.2 : 1,
                                        scale: isFocused ? 1.02 : 1,
                                        filter: isOtherFocused ? 'grayscale(30%)' : 'grayscale(0%)'
                                    }}
                                    className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} ${isFocused ? 'z-50' : 'z-10'}`}
                                >
                                    {/* Timeline dot */}
                                    <div className={`hidden md:block absolute left-1/2 top-8 w-4 h-4 rounded-full border-4 border-warmWhite transform -translate-x-1/2 transition-all duration-300 ${isFocused ? 'bg-deepEmerald scale-150' : 'bg-mutedBlue'}`} />

                                    {/* Project Card */}
                                    <div className="w-full md:w-[calc(50%-2rem)]">
                                        <HighlightItem
                                            id={project.id}
                                            className={`bg-white rounded-2xl p-6 border relative group h-full transition-shadow duration-500 ${isFocused ? 'shadow-2xl border-mutedBlue/30' : 'shadow-soft-lg border-softGray cursor-pointer'}`}
                                            onClick={() => handleCardClick(project.id)}
                                        >
                                            {isFocused && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        closeFocus();
                                                    }}
                                                    className="absolute -top-3 -right-3 p-1.5 bg-darkText text-warmWhite rounded-full shadow-lg hover:bg-mutedBlue transition-colors z-[60]"
                                                >
                                                    <X size={16} />
                                                </button>
                                            )}

                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-semibold text-mutedBlue">{project.year}</span>
                                                    {project.impactBadge && (
                                                        <span className="text-[10px] bg-deepEmerald/5 text-deepEmerald px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                                            {project.impactBadge}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {project.link && (
                                                        <a
                                                            href={project.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-mutedBlue hover:text-darkText transition-colors"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <ExternalLink size={14} />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-darkText mb-2">
                                                {project.title}
                                            </h3>

                                            {/* Metrics Layer */}
                                            <div className="flex gap-4 mb-4">
                                                {project.metrics?.map(m => (
                                                    <div key={m.label} className="border-l-2 border-softGray pl-2">
                                                        <div className="text-[10px] font-bold text-mutedBlue uppercase tracking-tighter">{m.label}</div>
                                                        <div className="text-xs font-mono text-darkText font-bold">{m.value}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            <p className="text-lightText mb-6 text-sm leading-relaxed">
                                                {project.description}
                                            </p>

                                            <div className="flex items-center justify-between gap-4 mt-auto">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {project.techStack.slice(0, 3).map((tech) => (
                                                        <span
                                                            key={tech}
                                                            className="px-2 py-0.5 bg-softGray/30 text-[9px] font-mono text-darkText rounded"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleCaseStudy(project.id);
                                                    }}
                                                    className="text-[11px] font-bold text-mutedBlue hover:text-darkText transition-colors flex items-center gap-1 group/btn"
                                                >
                                                    Case Study
                                                    <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                                </button>
                                            </div>
                                        </HighlightItem>
                                    </div>

                                    {/* Spacer for timeline */}
                                    <div className="hidden md:block w-[calc(50%-2rem)]" />
                                </motion.div>
                            );
                        })}
                    </HighlightGroup>
                </div>
            </div>

            {/* Focus Overlay - Subtle & Inline feeling */}
            <AnimatePresence>
                {focusedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeFocus}
                        className="fixed inset-0 bg-darkText/10 backdrop-blur-[1px] z-40 transition-colors pointer-events-auto"
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
