import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Crosshair } from 'lucide-react';
import { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { Canvas } from '@react-three/fiber';
import ProjectProjector from '../salaar/ProjectProjector';
import type { Project } from '../../data/portfolio';
import { HighlightGroup, HighlightItem } from '../SmartHighlight';

interface ChapterTwoProps {
    projects: Project[];
}

export default function ChapterTwo({ projects }: ChapterTwoProps) {
    const { isSalaarMode } = useSettings();
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
            <section className={`min-h-screen px-6 py-20 transition-all duration-700 ${isSalaarMode ? 'bg-[#0a0000]' : 'bg-warmWhite'}`}>
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={closeCaseStudy}
                        className={`flex items-center gap-2 transition-colors mb-12 group ${isSalaarMode ? 'text-red-500' : 'text-mutedBlue'}`}
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
        <section id="chapter-2" className={`min-h-screen px-6 py-20 transition-all duration-1000 relative overflow-hidden ${isSalaarMode
            ? 'bg-[#0a0000]'
            : 'bg-gradient-to-b from-warmWhite to-softGray'
            }`}>
            {isSalaarMode && (
                <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#55000012_1px,transparent_1px),linear-gradient(to_bottom,#55000012_1px,transparent_1px)] bg-[size:40px_40px]" />
                    <div className="absolute inset-0">
                        <Canvas dpr={[1, 2]}>
                            <ProjectProjector />
                        </Canvas>
                    </div>
                </div>
            )}
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 md:mb-24 px-4"
                >
                    <h2 className={`text-3xl sm:text-4xl md:text-6xl font-bold mb-6 tracking-tight transition-colors duration-700 ${isSalaarMode ? 'text-white' : 'text-darkText'
                        }`}>
                        {isSalaarMode ? 'The Battle' : 'The Builder'} <span className={`${isSalaarMode ? 'text-red-600 italic' : 'text-deepEmerald italic serif'}`}>{isSalaarMode ? 'Grid' : 'Phase'}</span>
                    </h2>
                    <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed transition-colors duration-700 ${isSalaarMode ? 'text-white/40 font-mono' : 'text-lightText/60'
                        }`}>
                        {isSalaarMode
                            ? 'Computational warfare and solutions forged in blood and grit.'
                            : 'Architecting digital solutions with technical precision and creative intent.'}
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Timeline line - hidden on small screens */}
                    <div className={`hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] ${isSalaarMode ? 'bg-gradient-to-b from-transparent via-red-900/40 to-transparent' : 'bg-gradient-to-b from-transparent via-mutedBlue/20 to-transparent'}`} />

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
                                    {/* Timeline dot */}
                                    <div className={`hidden lg:block absolute left-1/2 top-1/2 w-3 h-3 rounded-full border border-warmWhite transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${isFocused ? (isSalaarMode ? 'bg-red-700 scale-[2.5] shadow-[0_0_15px_rgba(153,0,0,0.5)]' : 'bg-deepEmerald scale-[2.5] shadow-[0_0_15px_rgba(45,95,79,0.5)]') : (isSalaarMode ? 'bg-red-900/40 hover:scale-150' : 'bg-mutedBlue/30 hover:scale-150')}`} />

                                    <div className="w-full lg:w-[calc(50%-3rem)] relative group">
                                        {isSalaarMode && (
                                            <div className="absolute -inset-[1px] bg-gradient-to-r from-red-900/50 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        )}
                                        <HighlightItem
                                            id={project.id}
                                            className={`rounded-[2rem] p-6 sm:p-8 md:p-10 border relative h-full transition-all duration-500 overflow-hidden ${isSalaarMode
                                                ? `bg-black/90 backdrop-blur-xl border-red-900/30 ${isFocused ? 'shadow-[0_0_30px_rgba(153,0,0,0.2)] border-red-800/50' : 'hover:border-red-900/50'}`
                                                : `bg-white/80 backdrop-blur-md border-softGray/50 ${isFocused ? 'shadow-2xl border-mutedBlue/30' : 'shadow-soft-lg hover:border-mutedBlue/20'}`
                                                } cursor-pointer`}
                                            onClick={() => handleCardClick(project.id)}
                                        >
                                            {isSalaarMode && (
                                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                                                    <Crosshair size={40} className="text-red-700" />
                                                </div>
                                            )}
                                            <div className="flex flex-col h-full">
                                                <div className="flex items-center justify-between mb-6">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs font-mono font-bold text-mutedBlue/40 uppercase tracking-widest leading-none">
                                                            P.0{index + 1}
                                                        </span>
                                                        <span className="w-1 h-1 rounded-full bg-softGray" />
                                                        <span className="text-xs font-bold text-lightText/60">{project.year}</span>
                                                    </div>
                                                    {project.impactBadge && (
                                                        <span className="text-[9px] font-bold text-deepEmerald uppercase tracking-widest bg-deepEmerald/5 px-3 py-1.5 rounded-full border border-deepEmerald/10">
                                                            {project.impactBadge}
                                                        </span>
                                                    )}
                                                </div>

                                                <h3 className={`text-2xl sm:text-3xl font-bold mb-4 transition-colors duration-500 ${isSalaarMode ? 'text-white' : 'text-darkText group-hover:text-mutedBlue'
                                                    }`}>
                                                    {isSalaarMode ? `// MISSION_${project.title.split(' ').join('_').toUpperCase()}` : project.title}
                                                </h3>

                                                <div className={`flex flex-wrap gap-6 mb-8 py-4 border-y transition-colors duration-700 ${isSalaarMode ? 'border-red-900/30' : 'border-softGray/30'
                                                    }`}>
                                                    {project.metrics?.map(m => (
                                                        <div key={m.label} className="min-w-[80px]">
                                                            <div className={`text-[9px] font-bold uppercase tracking-tighter mb-1 transition-colors duration-700 ${isSalaarMode ? 'text-red-600' : 'text-mutedBlue/50'
                                                                }`}>{m.label}</div>
                                                            <div className={`text-lg font-bold font-mono leading-none transition-colors duration-700 ${isSalaarMode ? 'text-white' : 'text-darkText'
                                                                }`}>{m.value}</div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="text-lightText/70 mb-8 text-base leading-relaxed">
                                                    {project.description.includes('\n') ? (
                                                        <div className="space-y-4">
                                                            {project.description.split('\n').filter(l => l.trim()).map((line, i) => {
                                                                const isBullet = line.trim().startsWith('-');
                                                                const content = isBullet ? line.trim().substring(1).trim() : line.trim();
                                                                return (
                                                                    <div key={i} className={`flex items-start gap-3 ${isBullet ? 'pl-2' : ''}`}>
                                                                        {isBullet && <div className="mt-2.5 w-1 h-1 rounded-full bg-mutedBlue/40 flex-shrink-0" />}
                                                                        <span className="flex-1">
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
                                                        <p>
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
                                                        className={`h-10 px-4 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 group/cta shadow-lg ${isSalaarMode
                                                            ? 'bg-red-700 text-white hover:bg-white hover:text-red-700'
                                                            : 'bg-darkText text-white hover:bg-mutedBlue shadow-darkText/10'
                                                            }`}
                                                    >
                                                        {isSalaarMode ? 'Initialize Intel' : 'Details'}
                                                        <ArrowRight size={14} className="group-hover/cta:translate-x-1 transition-transform" />
                                                    </button>
                                                </div>
                                            </div>
                                        </HighlightItem>
                                    </div>

                                    {/* Decorative Spacer Card (Desktop only) */}
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
                {focusedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeFocus}
                        className="fixed inset-0 bg-warmWhite/40 backdrop-blur-sm z-40 transition-colors cursor-crosshair"
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
