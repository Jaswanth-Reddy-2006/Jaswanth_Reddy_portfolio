import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Github, Code2, Trophy, Linkedin, Globe, Crosshair } from 'lucide-react';
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

export default function SocialTerminal({ socials }: SocialTerminalProps) {
    const { isSalaarMode } = useSettings();
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <section className="py-32 px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className={`inline-flex items-center gap-2 px-3 py-1 border rounded-full text-[10px] font-mono font-bold uppercase tracking-widest mb-6 transition-all duration-700 ${isSalaarMode
                        ? 'bg-red-900/20 border-red-600 text-white shadow-[0_0_10px_rgba(153,0,0,0.3)]'
                        : 'bg-mutedBlue/10 border-mutedBlue/20 text-mutedBlue'
                        }`}>
                        {isSalaarMode ? <Crosshair size={12} className="animate-pulse" /> : <Globe size={12} className="animate-spin-slow" />}
                        {isSalaarMode ? 'Signal Status: LOCKED' : 'External Uplink Active'}
                    </div>
                    <h2 className={`text-2xl md:text-5xl font-bold tracking-tight mb-4 px-4 transition-colors duration-700 ${isSalaarMode ? 'text-white' : 'text-darkText'
                        }`}>
                        Connect with the <span className={`${isSalaarMode ? 'text-red-600 font-mono' : 'text-mutedBlue italic serif'}`}>{isSalaarMode ? 'COMMANDER' : 'Architect'}</span>
                    </h2>
                    <p className={`font-light max-w-xl mx-auto transition-colors duration-700 ${isSalaarMode ? 'text-white/40 font-mono text-sm' : 'text-lightText'
                        }`}>
                        {isSalaarMode
                            ? '[BATTLE_INTEL]: 100% precision. Khansaar network established across engineering nodes.'
                            : 'Real-time synchronization with external engineering platforms. Hover for deeper insights.'}
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-6 md:gap-12 relative">
                    {socials.map((social) => {
                        const Icon = platformIcons[social.platform];
                        return (
                            <div
                                key={social.platform}
                                className="relative"
                                onMouseEnter={() => setHoveredId(social.platform)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                <motion.a
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transition-all duration-500 shadow-lg border outline-none ${isSalaarMode
                                        ? `rounded-none ${hoveredId === social.platform ? 'bg-red-700 text-white border-white shadow-[0_0_20px_rgba(153,0,0,0.5)]' : 'bg-black/80 text-red-600 border-red-900/30'}`
                                        : `rounded-2xl md:rounded-[2rem] ${hoveredId === social.platform ? 'bg-darkText text-white border-darkText shadow-darkText/20' : 'bg-white text-lightText border-softGray hover:border-mutedBlue/30 shadow-soft'}`
                                        }`}
                                >
                                    <Icon size={28} className="md:w-8 md:h-8" />
                                </motion.a>

                                <AnimatePresence>
                                    {hoveredId === social.platform && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 z-50 pointer-events-none md:pointer-events-auto"
                                        >
                                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r border-b border-softGray" />
                                            <ProfilePreviewCard profile={social} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
