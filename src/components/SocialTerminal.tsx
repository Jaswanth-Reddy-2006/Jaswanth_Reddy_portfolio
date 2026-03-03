import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Github, Code2, Trophy, Linkedin } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import type { SocialProfile } from '../data/portfolio';
import ProfilePreviewCard from './ProfilePreviewCard';

interface SocialTerminalProps {
    socials: SocialProfile[];
}

const platformIcons = {
    LeetCode: Code2,
    GitHub: Github,
    Codeforces: Trophy,
    LinkedIn: Linkedin,
};

import BattleGrid from './salaar/BattleGrid';

export default function SocialTerminal({ socials }: SocialTerminalProps) {
    const { isSalaarMode } = useSettings();
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const selectedProfile = socials.find(s => s.platform === selectedId);

    return (
        <section id="connect" className={`py-40 px-6 transition-colors duration-1000 relative ${isSalaarMode ? 'bg-black' : 'bg-transparent'}`}>
            {isSalaarMode && <BattleGrid opacity={0.3} />}
            <div className="max-w-4xl mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className="relative group/pill">
                        {/* Hover Line (Above for Salaar) */}
                        {isSalaarMode && (
                            <motion.div
                                className="absolute -top-1 left-0 right-0 h-[2px] bg-red-600 origin-left scale-x-0 group-hover/pill:scale-x-100 transition-transform duration-300"
                            />
                        )}
                        <div className="flex flex-col items-center mb-8 gap-4">
                        </div>
                        <h2 className={`text-2xl md:text-5xl font-bold tracking-tight mb-4 px-4 transition-colors duration-700 ${isSalaarMode ? 'text-white font-mono uppercase tracking-[0.2em]' : 'text-darkText'
                            }`}>
                            {isSalaarMode ? 'CONNECT_WITH' : 'Connect with the'} <span className={`${isSalaarMode ? 'text-red-600' : 'text-mutedBlue italic serif'}`}>{isSalaarMode ? 'COMMANDER' : 'Architect'}</span>
                        </h2>
                        <p className={`font-light max-w-xl mx-auto transition-colors duration-700 ${isSalaarMode ? 'text-white/40 font-mono text-sm' : 'text-lightText'
                            }`}>
                            {isSalaarMode
                                ? '[UPLINK_STATUS]: STANDBY. Multi-channel communication channels active.'
                                : 'Real-time synchronization with external engineering platforms. Hover for deeper insights.'}
                        </p>
                    </div>
                </motion.div>

                <div className={`relative p-8 md:p-12 border transition-all duration-700 ${isSalaarMode
                    ? 'bg-red-950/5 border-red-900/30 rounded-none'
                    : 'bg-white/50 backdrop-blur-xl border-softGray rounded-[3rem]'
                    }`}>
                    {isSalaarMode && <BattleGrid isCard opacity={0.4} />}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative z-10 justify-items-center">
                        {socials.map((social) => {
                            const Icon = platformIcons[social.platform];
                            return (
                                <div
                                    key={social.platform}
                                    className="relative w-16 h-16 md:w-20 md:h-20"
                                    onMouseEnter={() => setHoveredId(social.platform)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    <motion.a
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => {
                                            if (window.innerWidth < 768) {
                                                e.preventDefault();
                                                setSelectedId(social.platform);
                                            }
                                        }}
                                        className={`w-full h-full flex items-center justify-center transition-all duration-500 shadow-lg border outline-none ${isSalaarMode
                                            ? `rounded-none ${hoveredId === social.platform || selectedId === social.platform ? 'bg-red-700 text-white border-white shadow-[0_0_20px_rgba(153,0,0,0.5)]' : 'bg-black/80 text-red-600 border-red-900/30'}`
                                            : `rounded-2xl md:rounded-[2rem] ${hoveredId === social.platform || selectedId === social.platform ? 'bg-darkText text-white border-darkText shadow-darkText/20' : 'bg-white text-lightText border-softGray hover:border-mutedBlue/30 shadow-soft'}`
                                            }`}
                                    >
                                        <Icon size={28} className="md:w-8 md:h-8" />
                                    </motion.a>

                                    <AnimatePresence>
                                        {hoveredId === social.platform && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95, y: 10, x: "-50%" }}
                                                animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
                                                exit={{ opacity: 0, scale: 0.95, y: 10, x: "-50%" }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute bottom-full left-1/2 mb-4 z-[100] hidden md:block w-max pointer-events-auto"
                                            >
                                                <div className="relative">
                                                    {/* Pointer (Rhombus/Triangle) - Mathematically centered with x: "-50%" */}
                                                    <div
                                                        style={{ left: "50%", transform: "translate(-50%, 50%) rotate(45deg)" }}
                                                        className={`absolute bottom-0 w-3 h-3 border-r border-b transition-colors duration-700 z-10 ${isSalaarMode
                                                            ? 'bg-black border-red-900/50'
                                                            : 'bg-white border-softGray'
                                                            }`}
                                                    />
                                                    <ProfilePreviewCard profile={social} />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile Modal Representation */}
                <AnimatePresence>
                    {selectedId && selectedProfile && (
                        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:hidden">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative z-[210] w-full max-w-sm"
                            >
                                <ProfilePreviewCard profile={selectedProfile} />
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className={`absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-xl border ${isSalaarMode
                                        ? 'bg-red-900 text-white border-red-700'
                                        : 'bg-white text-darkText border-softGray'
                                        }`}
                                >
                                    ✕
                                </button>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
