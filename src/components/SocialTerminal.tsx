import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Github, Code2, Trophy, Linkedin, Globe } from 'lucide-react';
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
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-mutedBlue/10 border border-mutedBlue/20 rounded-full text-mutedBlue text-[10px] font-mono font-bold uppercase tracking-widest mb-6">
                        <Globe size={12} className="animate-spin-slow" />
                        External Uplink Active
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-darkText tracking-tight mb-4">
                        Connect with the <span className="text-mutedBlue italic serif">Architect</span>
                    </h2>
                    <p className="text-lightText font-light max-w-xl mx-auto">
                        Real-time synchronization with external engineering platforms. Hover for deeper insights.
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
                                <motion.button
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`w-16 h-16 md:w-20 md:h-20 rounded-[2rem] flex items-center justify-center transition-all duration-500 shadow-lg border ${hoveredId === social.platform
                                            ? 'bg-darkText text-white border-darkText shadow-darkText/20'
                                            : 'bg-white text-lightText border-softGray hover:border-mutedBlue/30 shadow-soft'
                                        }`}
                                >
                                    <Icon size={32} />
                                </motion.button>

                                <AnimatePresence>
                                    {hoveredId === social.platform && (
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 z-50">
                                            <ProfilePreviewCard profile={social} />
                                            {/* Triangular pointer */}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white" />
                                        </div>
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
