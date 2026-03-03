import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Server, Binary, Wrench, ArrowRight, ShieldCheck, Crosshair } from 'lucide-react';
import type { SkillCategory } from '../../data/portfolio';
import { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { Canvas } from '@react-three/fiber';
import SkillMonoliths from '../salaar/SkillMonoliths';
import BattleGrid from '../salaar/BattleGrid';

interface ChapterThreeProps {
    skills: SkillCategory[];
}

const iconMap: Record<string, any> = {
    Code2,
    Server,
    Binary,
    Wrench,
};

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

// Light sweep overlay for white mode skill grid
function LightSweep({ trigger }: { trigger: boolean }) {
    return (
        <AnimatePresence>
            {trigger && (
                <motion.div
                    initial={{ x: '-120%', opacity: 0 }}
                    animate={{ x: '300%', opacity: [0, 0.8, 0] }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    className="absolute top-0 bottom-0 w-[60px] pointer-events-none z-20"
                    style={{
                        background: 'linear-gradient(to right, transparent, rgba(107,140,186,0.15), transparent)',
                        transform: 'skewX(-20deg)',
                    }}
                />
            )}
        </AnimatePresence>
    );
}

export default function ChapterThree({ skills }: ChapterThreeProps) {
    const { isSalaarMode } = useSettings();
    const [expandedSkill, setExpandedSkill] = useState<string | null>(skills[0]?.category || null);
    const [sweepTrigger, setSweepTrigger] = useState(false);

    const handleCategorySelect = (cat: string) => {
        setExpandedSkill(cat);
        setSweepTrigger(false);
        setTimeout(() => setSweepTrigger(true), 50);
    };

    return (
        <section
            id="chapter-3"
            className="min-h-screen px-4 md:px-6 py-16 md:py-24 relative overflow-hidden"
        >
            {isSalaarMode && <BattleGrid opacity={0.5} />}

            {/* Ambient Background Elements */}
            {isSalaarMode && (
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 opacity-20">
                        <Canvas dpr={[1, 1.5]}>
                            <SkillMonoliths />
                        </Canvas>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.98, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: PREMIUM_EASE }}
                    className="text-center mb-12 md:mb-20"
                >
                    <h2 className={`text-3xl sm:text-4xl md:text-6xl font-bold mb-6 tracking-tight flex flex-col md:flex-row items-center justify-center gap-4 transition-colors duration-700 ${isSalaarMode ? 'text-white font-mono uppercase tracking-widest' : 'text-darkText'}`}>
                        {isSalaarMode && (
                            <div className="relative w-12 h-12 md:w-20 md:h-20">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                    className={`absolute inset-0 border-2 border-dashed rounded-full border-red-900/40`}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-600 shadow-[0_0_15px_#990000]`} />
                                </div>
                            </div>
                        )}
                        {isSalaarMode ? 'TACTICAL' : 'Technical'} <span className={`${isSalaarMode ? 'text-red-700' : 'text-mutedBlue italic serif'}`}>{isSalaarMode ? 'ARMOURY' : 'Arsenal'}</span>
                    </h2>
                    <p className={`text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed px-4 transition-colors duration-700 ${isSalaarMode ? 'text-white/40 font-mono' : 'text-lightText'}`}>
                        {isSalaarMode
                            ? '[ARMOURY_SYSTEMS]: LOCK_LOADED. All technical units optimized for high-intensity deployment.'
                            : 'A curated collection of technologies used to architect scalable, high-impact systems.'}
                    </p>
                </motion.div>

                {/* Mobile: Horizontal Category Tabs */}
                <div className="lg:hidden mb-8 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 flex gap-4 snap-x">
                    {skills.map((skillCategory) => {
                        const Icon = iconMap[skillCategory.icon] || Code2;
                        const isActive = expandedSkill === skillCategory.category;
                        return (
                            <button
                                key={skillCategory.category}
                                onClick={() => handleCategorySelect(skillCategory.category)}
                                className={`flex-shrink-0 snap-center px-5 py-3 rounded-xl border transition-all flex items-center gap-3 ${isActive
                                    ? isSalaarMode ? 'bg-red-700 text-white border-red-900 shadow-lg shadow-red-900/20' : 'bg-mutedBlue text-white border-mutedBlue shadow-lg'
                                    : isSalaarMode ? 'bg-black/40 text-white/40 border-red-900/10' : 'bg-white text-lightText border-softGray'}`}
                            >
                                <Icon size={18} />
                                <span className="text-sm font-bold whitespace-nowrap uppercase tracking-wider">{skillCategory.category}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
                    {/* Desktop: Vertical Category Selection with stagger */}
                    <div className="hidden lg:block lg:col-span-5 space-y-4">
                        {skills.map((skillCategory, index) => {
                            const Icon = iconMap[skillCategory.icon] || Code2;
                            const isActive = expandedSkill === skillCategory.category;

                            return (
                                <motion.div
                                    key={skillCategory.category}
                                    initial={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
                                    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ duration: 0.7, delay: index * 0.1, ease: PREMIUM_EASE }}
                                    onClick={() => handleCategorySelect(skillCategory.category)}
                                    className={`group cursor-pointer p-6 transition-all duration-500 border relative ${isActive
                                        ? isSalaarMode ? 'bg-red-900/10 border-red-700 rounded-none shadow-[inset_0_0_20px_rgba(153,0,0,0.1)] animate-red-glow' : 'bg-white shadow-xl border-mutedBlue/20 scale-102 rounded-2xl'
                                        : isSalaarMode ? 'bg-transparent border-transparent text-white/40 hover:text-white rounded-none border-l-2' : 'bg-transparent border-transparent hover:bg-mutedBlue/5 rounded-2xl'
                                        }`}
                                >
                                    {isSalaarMode && isActive && (
                                        <div className="absolute top-0 right-0 p-2">
                                            <Crosshair size={10} className="text-red-600 animate-pulse" />
                                        </div>
                                    )}
                                    <div className="flex items-center gap-5">
                                        <div className={`p-4 transition-all duration-500 ${isActive
                                            ? isSalaarMode ? 'bg-red-700 text-white rounded-none' : 'bg-mutedBlue text-white shadow-lg shadow-mutedBlue/20 rounded-xl'
                                            : isSalaarMode ? 'bg-red-950/20 text-red-600 rounded-none' : 'bg-softGray/50 text-mutedBlue group-hover:bg-mutedBlue/10 rounded-xl'
                                            }`}>
                                            <Icon size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`text-xl font-bold transition-all duration-500 ${isActive
                                                ? isSalaarMode ? 'text-white' : 'text-darkText'
                                                : isSalaarMode ? 'text-white/40 group-hover:text-white' : 'text-lightText group-hover:text-darkText'
                                                } ${isSalaarMode ? 'font-mono uppercase tracking-[0.2em]' : ''}`}>
                                                {skillCategory.category}
                                            </h3>
                                            <p className={`text-sm font-mono transition-colors duration-700 ${isSalaarMode ? 'text-red-600/80' : 'text-mutedBlue/60'}`}>
                                                {isSalaarMode ? `ARMY_0${index + 1}` : `0${index + 1}`} // {skillCategory.skills.length} core units
                                            </p>
                                        </div>
                                        {isActive && (
                                            <motion.div layoutId="active-indicator">
                                                <ArrowRight className={isSalaarMode ? 'text-red-700' : 'text-mutedBlue'} size={20} />
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Right/Content: Skill Visualization */}
                    <div className="lg:col-span-7 h-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={expandedSkill}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                                className={`rounded-3xl p-6 md:p-12 border transition-all duration-1000 h-full min-h-[300px] md:min-h-[400px] flex flex-col relative overflow-hidden ${isSalaarMode
                                    ? 'bg-black/80 border-red-900/20 shadow-[inset_0_0_50px_rgba(153,0,0,0.05)] rounded-none'
                                    : 'bg-gradient-to-br from-white to-warmWhite border-softGray shadow-inner'
                                    }`}
                            >
                                {isSalaarMode && <BattleGrid isCard opacity={0.6} />}
                                {isSalaarMode && (
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-700 to-transparent opacity-50 z-10" />
                                )}
                                {/* White mode light sweep */}
                                {!isSalaarMode && <LightSweep trigger={sweepTrigger} />}

                                <div className="space-y-6 md:space-y-8 relative z-10">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className={`text-xs font-bold uppercase tracking-widest transition-colors duration-700 ${isSalaarMode ? 'text-red-600' : 'text-mutedBlue lg:hidden'}`}>
                                            {isSalaarMode ? `ACTIVE_CORE: ${expandedSkill}` : `Active Core Module: ${expandedSkill}`}
                                        </h4>
                                    </div>
                                    <div className="flex flex-wrap gap-2 md:gap-4">
                                        {skills.find(s => s.category === expandedSkill)?.skills.map((skill, i) => (
                                            <motion.div
                                                key={skill}
                                                initial={{ scale: 0.7, opacity: 0, filter: 'blur(8px)' }}
                                                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                                                transition={{
                                                    duration: 0.5,
                                                    delay: i * 0.07,
                                                    ease: PREMIUM_EASE,
                                                }}
                                                className={`px-4 py-2 md:px-6 md:py-3 transition-all duration-500 group/skill relative overflow-hidden flex items-center gap-2 border ${isSalaarMode
                                                    ? 'bg-red-900/10 text-white border-red-900/30 rounded-none hover:bg-red-900/20 hover:border-red-600 shadow-[0_0_10px_rgba(153,0,0,0.1)]'
                                                    : 'bg-white text-darkText border-softGray hover:border-mutedBlue/30 shadow-sm rounded-xl animate-float-skill'
                                                    }`}
                                                style={!isSalaarMode ? { animationDelay: `${i * 0.3}s` } : {}}
                                            >
                                                {isSalaarMode && <ShieldCheck size={12} className="text-red-600" />}
                                                <span className={`text-sm sm:text-base md:text-lg font-medium ${isSalaarMode ? 'font-mono' : ''}`}>{skill}</span>

                                                {/* Skill Chip energy scan line */}
                                                <motion.div
                                                    initial={{ x: '-100%' }}
                                                    animate={{ x: '100%' }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        delay: i * 0.2,
                                                        ease: "linear"
                                                    }}
                                                    className={`absolute inset-0 w-1/2 h-full opacity-20 pointer-events-none ${isSalaarMode ? 'bg-gradient-to-r from-transparent via-red-600 to-transparent' : 'bg-gradient-to-r from-transparent via-mutedBlue/30 to-transparent'}`}
                                                    style={{ skewX: '-20deg' }}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <div className={`pt-6 md:pt-8 border-t mt-12 transition-colors duration-700 ${isSalaarMode ? 'border-red-900/10' : 'border-softGray/50'}`}>
                    <div className="flex items-center gap-3 italic">
                        <div className={`w-8 md:w-12 h-[1px] ${isSalaarMode ? 'bg-red-600/30' : 'bg-mutedBlue/30'}`} />
                        <p className={`text-[10px] md:text-sm transition-colors duration-700 ${isSalaarMode ? 'text-white/40 font-mono' : 'text-lightText'}`}>
                            {isSalaarMode ? 'All systems operational. Redlining performance parameters.' : 'Mastery through implementation and benchmarking.'}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
