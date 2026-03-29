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

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

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
            className="min-h-screen px-4 md:px-6 pb-20 relative overflow-hidden"
        >
            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.98, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: PREMIUM_EASE }}
                    className="text-center mb-12 md:mb-20"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 tracking-tight flex flex-col md:flex-row items-center justify-center gap-4 transition-colors duration-700 text-darkText">
                        Technical <span className="text-mutedBlue italic serif">Arsenal</span>
                    </h2>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed px-4 transition-colors duration-700 text-lightText">
                        A curated collection of technologies used to architect scalable, high-impact systems.
                    </p>
                </motion.div>

                <div className="lg:hidden mb-8 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 flex gap-4 snap-x">
                    {skills.map((skillCategory) => {
                        const Icon = iconMap[skillCategory.icon] || Code2;
                        const isActive = expandedSkill === skillCategory.category;
                        return (
                            <button
                                key={skillCategory.category}
                                onClick={() => handleCategorySelect(skillCategory.category)}
                                className={`flex-shrink-0 snap-center px-5 py-3 rounded-xl border transition-all flex items-center gap-3 ${isActive
                                    ? 'bg-mutedBlue text-white border-mutedBlue shadow-lg'
                                    : 'bg-white text-lightText border-softGray'}`}
                            >
                                <Icon size={18} />
                                <span className="text-sm font-bold whitespace-nowrap uppercase tracking-wider">{skillCategory.category}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
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
                                        ? 'bg-white shadow-xl border-mutedBlue/20 scale-102 rounded-2xl'
                                        : 'bg-transparent border-transparent hover:bg-mutedBlue/5 rounded-2xl'
                                        }`}
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={`p-4 transition-all duration-500 ${isActive
                                            ? 'bg-mutedBlue text-white shadow-lg shadow-mutedBlue/20 rounded-xl'
                                            : 'bg-softGray/50 text-mutedBlue group-hover:bg-mutedBlue/10 rounded-xl'
                                            }`}>
                                            <Icon size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`text-xl font-bold transition-all duration-500 ${isActive
                                                ? 'text-darkText'
                                                : 'text-lightText group-hover:text-darkText'
                                                }`}>
                                                {skillCategory.category}
                                            </h3>
                                            <p className="text-sm font-mono transition-colors duration-700 text-mutedBlue/60">
                                                {`0${index + 1}`} // {skillCategory.skills.length} core units
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

                    <div className="lg:col-span-7 h-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={expandedSkill}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                                className="rounded-3xl p-6 md:p-12 border transition-all duration-1000 h-full min-h-[300px] md:min-h-[400px] flex flex-col relative overflow-hidden bg-gradient-to-br from-white to-warmWhite border-softGray shadow-inner"
                            >
                                <LightSweep trigger={sweepTrigger} />

                                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-mutedBlue/40 to-transparent pointer-events-none animate-scan-y" />

                                <div className="space-y-6 md:space-y-8 relative z-10">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] transition-colors duration-700 text-mutedBlue/60">
                                            {`Core Intelligence Module // ${expandedSkill}`}
                                        </h4>
                                        <div className="flex gap-1">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-1 h-1 rounded-full bg-mutedBlue/30 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-3 md:gap-5">
                                        {skills.find(s => s.category === expandedSkill)?.skills.map((skill, i) => (
                                            <motion.div
                                                key={skill}
                                                initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
                                                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                transition={{
                                                    duration: 0.6,
                                                    delay: i * 0.05,
                                                    ease: PREMIUM_EASE,
                                                }}
                                                className="px-5 py-3 md:px-8 md:py-4 transition-all duration-500 group/skill relative overflow-hidden flex items-center gap-3 border bg-white/80 backdrop-blur-sm text-darkText border-softGray hover:border-mutedBlue/40 shadow-sm hover:shadow-lg rounded-2xl"
                                            >
                                                <div className="w-2 h-2 rounded-full bg-deepEmerald/40 group-hover/skill:bg-deepEmerald group-hover/skill:scale-125 transition-all duration-300 shadow-[0_0_10px_rgba(16,185,129,0)] group-hover/skill:shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                                <span className="text-sm sm:text-base md:text-lg font-bold tracking-tight">{skill}</span>

                                                <motion.div
                                                    initial={{ x: '-100%' }}
                                                    animate={{ x: '100%' }}
                                                    transition={{
                                                        duration: 3,
                                                        repeat: Infinity,
                                                        delay: i * 0.3,
                                                        ease: "linear"
                                                    }}
                                                    className="absolute inset-0 w-1/3 h-full opacity-10 pointer-events-none bg-gradient-to-r from-transparent via-mutedBlue to-transparent"
                                                    style={{ skewX: '-25deg' }}
                                                />
                                                
                                                <div className="absolute bottom-0 left-0 h-[1px] bg-mutedBlue/20 w-0 group-hover/skill:w-full transition-all duration-700" />
                                            </motion.div>
                                        ))}
                                    </div>
                                    
                                    <div className="mt-12 opacity-20 pointer-events-none">
                                        <div className="grid grid-cols-12 gap-1 h-1">
                                            {Array.from({ length: 48 }).map((_, i) => (
                                                <div key={i} className={`h-full ${i % 4 === 0 ? 'bg-mutedBlue' : 'bg-softGray/30'}`} />
                                            ))}
                                        </div>
                                        <div className="flex justify-between text-[6px] font-mono mt-2 uppercase tracking-[0.5em]">
                                            <span>Buffer_Load_0x{expandedSkill?.length}</span>
                                            <span>Intel_Verified</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="pt-6 md:pt-8 border-t mt-12 transition-colors duration-700 border-softGray/50">
                    <div className="flex items-center gap-3 italic">
                        <div className="w-8 md:w-12 h-[1px] bg-mutedBlue/30" />
                        <p className="text-[10px] md:text-sm transition-colors duration-700 text-lightText">
                            Mastery through implementation and benchmarking.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
