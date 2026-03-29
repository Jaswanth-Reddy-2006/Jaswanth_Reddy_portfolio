import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
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

    return (
        <section id="chapter-2" className="min-h-screen px-6 pb-12 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 md:mb-24 px-4"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 tracking-tight transition-colors duration-700 text-darkText">
                        The Builder <span className="text-deepEmerald italic serif">Phase</span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed transition-colors duration-700 text-lightText/60">
                        Architecting digital solutions with technical precision and creative intent.
                    </p>
                </motion.div>

                <div className="relative">
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-mutedBlue/20 to-transparent" />

                    <HighlightGroup className="space-y-12 md:space-y-32">
                        {projects.map((project, index) => {
                            const isFocused = focusedId === project.id;
                            const isOtherFocused = focusedId && focusedId !== project.id;

                            return (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    animate={{
                                        opacity: isOtherFocused ? 0.2 : 1,
                                        scale: isFocused ? 1.02 : 1,
                                    }}
                                    className={`relative flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''} ${isFocused ? 'z-50' : 'z-10'}`}
                                >
                                    <div className={`hidden lg:block absolute left-1/2 top-1/2 w-3 h-3 rounded-full border border-warmWhite transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${isFocused ? 'bg-deepEmerald scale-[2.5] shadow-[0_0_15px_rgba(45,95,79,0.5)]' : 'bg-mutedBlue/30 hover:scale-150'}`} />

                                    <div className="w-full lg:w-[calc(50%-3rem)] relative group">
                                        <HighlightItem
                                            id={project.id}
                                            className={`rounded-[2rem] p-6 sm:p-8 md:p-10 border relative h-full transition-all duration-500 overflow-hidden ${isFocused ? 'bg-white shadow-2xl border-mutedBlue/30' : 'bg-white/80 backdrop-blur-md border-softGray/50 shadow-soft-lg hover:border-mutedBlue/20'
                                                } cursor-pointer`}
                                            onClick={() => handleCardClick(project.id)}
                                        >
                                            <div className="flex flex-col h-full relative z-10">
                                                <div className="flex items-center justify-between mb-6">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs font-bold text-lightText/60">{project.year}</span>
                                                    </div>
                                                    {project.impactBadge && (
                                                        <span className="text-[9px] font-bold text-deepEmerald uppercase tracking-widest bg-deepEmerald/5 px-3 py-1.5 rounded-full border border-deepEmerald/10">
                                                            {project.impactBadge}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-4 mb-4">
                                                    <h3 className="text-2xl sm:text-3xl font-bold transition-colors duration-500 text-darkText group-hover:text-mutedBlue">
                                                        {project.title}
                                                    </h3>
                                                </div>

                                                <div className="flex flex-wrap gap-6 mb-8 py-4 border-y border-softGray/30 transition-colors duration-700 text-darkText/80">
                                                    {project.metrics?.map(m => (
                                                        <div key={m.label} className="min-w-[80px]">
                                                            <div className="text-[9px] font-bold uppercase tracking-tighter mb-1 text-mutedBlue/50 transition-colors duration-700">{m.label}</div>
                                                            <div className="text-lg font-bold font-mono leading-none">{m.value}</div>
                                                        </div>
                                                    )) || (
                                                            <div className="min-w-[80px]">
                                                                <div className="text-[9px] font-bold uppercase tracking-tighter mb-1 text-mutedBlue/50">Status</div>
                                                                <div className="text-lg font-bold font-mono leading-none">PRODUCTION</div>
                                                            </div>
                                                        )}
                                                </div>

                                                <div className="text-lightText/70 mb-8 text-base leading-relaxed">
                                                    {project.description.includes('\n') ? (
                                                        <div className="space-y-4">
                                                            {project.description.split('\n').filter(l => l.trim()).slice(0, 2).map((line, i) => {
                                                                const isBullet = line.trim().startsWith('-');
                                                                const content = isBullet ? line.trim().substring(1).trim() : line.trim();
                                                                return (
                                                                    <div key={i} className={`flex items-start gap-3 ${isBullet ? 'pl-2' : ''}`}>
                                                                        {isBullet && <div className="mt-2.5 w-1 h-1 rounded-full bg-mutedBlue/40 flex-shrink-0" />}
                                                                        <span className="flex-1 line-clamp-2">
                                                                            {content.split(/(\*\*.*?\*\*)/).map((part, j) =>
                                                                                part.startsWith('**') && part.endsWith('**') ? (
                                                                                    <span key={j} className="text-darkText font-bold">{part.slice(2, -2)}</span>
                                                                                ) : (
                                                                                    part
                                                                                )
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    ) : (
                                                        <p className="line-clamp-3">
                                                            {project.description.split(/(\*\*.*?\*\*)/).map((part, i) =>
                                                                part.startsWith('**') && part.endsWith('**') ? (
                                                                    <span key={i} className="text-darkText font-bold">{part.slice(2, -2)}</span>
                                                                ) : (
                                                                    part
                                                                )
                                                            )}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="mt-auto pt-6 border-t border-softGray/30 flex items-center justify-between gap-4">
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.techStack.slice(0, 3).map((tech) => (
                                                            <span
                                                                key={tech}
                                                                className="px-3 py-1 bg-warmWhite text-[10px] font-mono font-bold text-lightText/80 rounded-md border border-softGray/30"
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
                                                        className="h-10 px-4 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 group/cta shadow-lg bg-darkText text-white hover:bg-mutedBlue shadow-darkText/10"
                                                    >
                                                        Details
                                                        <ArrowRight size={14} className="group-hover/cta:translate-x-1 transition-transform" />
                                                    </button>
                                                </div>
                                            </div>
                                        </HighlightItem>
                                    </div>

                                    <div className="hidden lg:block w-[calc(50%-3rem)] px-12">
                                        <div className="opacity-10 font-mono text-[10px] space-y-2 pointer-events-none">
                                            <div className="flex gap-4">
                                                <span className="text-mutedBlue">[STATUS]</span>
                                                <span className="text-darkText">DEPLOYED // STABLE</span>
                                            </div>
                                            <div className="flex gap-4">
                                                <span className="text-mutedBlue">[MODULE]</span>
                                                <span className="text-darkText">ENGINE_v.08.12</span>
                                            </div>
                                            <div className="w-full h-[1px] bg-darkText/20 my-4" />
                                            <div className="text-[8px] leading-3 uppercase tracking-widest pl-4 border-l border-mutedBlue/30">
                                                Sub-system link established.<br />
                                                Data integrity verified.<br />
                                                Routing complete.
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </HighlightGroup>
                </div>
            </div>

            <AnimatePresence>
                {(focusedId || caseStudyId) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => { closeFocus(); closeCaseStudy(); }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-xl z-[100] cursor-crosshair"
                    />
                )}

                {caseStudyId && activeProject && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 w-full md:w-[70%] lg:w-[60%] h-screen bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-[110] overflow-y-auto"
                    >
                        <div className="p-8 md:p-16 max-w-4xl mx-auto">
                            <button
                                onClick={closeCaseStudy}
                                className="flex items-center gap-3 text-mutedBlue font-bold uppercase tracking-widest text-xs mb-12 hover:gap-5 transition-all"
                            >
                                <ArrowLeft size={16} /> Back to Modules
                            </button>

                            <div className="space-y-12">
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="px-4 py-1.5 bg-deepEmerald/10 text-deepEmerald text-[10px] font-bold uppercase tracking-widest rounded-full">
                                            {activeProject.impactBadge || 'Production Ready'}
                                        </span>
                                        <span className="text-lightText/60 font-mono text-xs">{activeProject.year}</span>
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-bold text-darkText mb-6">{activeProject.title}</h2>
                                    <p className="text-xl md:text-2xl text-lightText font-light leading-relaxed">
                                        {activeProject.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-warmWhite rounded-[2rem] border border-softGray/50">
                                    {(activeProject.metrics || [{ label: 'Status', value: 'Live' }]).map(m => (
                                        <div key={m.label}>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-mutedBlue/60 mb-1">{m.label}</div>
                                            <div className="text-xl md:text-2xl font-bold text-darkText font-mono">{m.value}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                                    <div className="space-y-8">
                                        <section>
                                            <h4 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-mutedBlue mb-4">
                                                <div className="w-6 h-[1px] bg-mutedBlue/30" />
                                                The Challenge
                                            </h4>
                                            <p className="text-darkText/80 leading-relaxed text-lg">
                                                {activeProject.problem}
                                            </p>
                                        </section>
                                        <section>
                                            <h4 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-mutedBlue mb-4">
                                                <div className="w-6 h-[1px] bg-mutedBlue/30" />
                                                The Solution
                                            </h4>
                                            <p className="text-darkText/80 leading-relaxed text-lg">
                                                {activeProject.outcome}
                                            </p>
                                        </section>
                                    </div>

                                    <div className="space-y-8">
                                        <section className="p-8 bg-darkText text-white rounded-[2rem]">
                                            <h4 className="text-[10px] uppercase tracking-[0.3em] opacity-50 mb-6">Engineering Decisions</h4>
                                            <div className="space-y-6">
                                                <div>
                                                    <div className="text-xs font-bold text-mutedBlue mb-2">Rationale</div>
                                                    <p className="text-sm opacity-80 leading-relaxed">{activeProject.decisions.why}</p>
                                                </div>
                                                <div>
                                                    <div className="text-xs font-bold text-mutedBlue mb-2">Scalability</div>
                                                    <p className="text-sm opacity-80 leading-relaxed">{activeProject.decisions.scalability}</p>
                                                </div>
                                            </div>
                                        </section>
                                        <section>
                                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-mutedBlue mb-4">Stack Architecture</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {activeProject.techStack.map(tech => (
                                                    <span key={tech} className="px-4 py-2 bg-warmWhite border border-softGray text-sm font-medium rounded-xl text-darkText">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
