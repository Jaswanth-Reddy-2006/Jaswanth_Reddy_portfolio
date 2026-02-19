import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2, Linkedin, Trophy } from 'lucide-react';
import type { SocialProfile } from '../data/portfolio';

const platformIcons = {
    LeetCode: Code2,
    GitHub: Github,
    Codeforces: Trophy,
    LinkedIn: Linkedin,
};

const platformColors = {
    LeetCode: '#FFA116',
    GitHub: '#333',
    Codeforces: '#445ee9',
    LinkedIn: '#0077b5',
};

interface ProfilePreviewCardProps {
    profile: SocialProfile;
}

export default function ProfilePreviewCard({ profile }: ProfilePreviewCardProps) {
    const Icon = platformIcons[profile.platform];
    const color = platformColors[profile.platform];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-[320px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-softGray pointer-events-auto"
        >
            {/* Header */}
            <div
                className="p-6 text-white flex items-center justify-between"
                style={{ backgroundColor: color }}
            >
                <div className="flex items-center gap-3">
                    <Icon size={24} />
                    <div>
                        <h4 className="font-bold text-sm leading-none">{profile.platform}</h4>
                        <span className="text-[10px] opacity-80 font-mono">@{profile.username}</span>
                    </div>
                </div>
                <a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                    <ExternalLink size={16} />
                </a>
            </div>

            {/* Metrics Grid */}
            <div className="p-6 bg-gradient-to-b from-white to-warmWhite">
                <div className="grid grid-cols-2 gap-4">
                    {Object.entries(profile.metrics).map(([key, value]) => (
                        <div key={key} className="bg-softGray/20 p-3 rounded-2xl border border-softGray/40">
                            <span className="block text-[9px] uppercase font-bold text-lightText/60 tracking-tighter mb-1">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <span className="block text-sm font-bold text-darkText font-mono">
                                {value}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-6 pt-6 border-t border-softGray/50 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-lightText/60">
                        <span>CONNECTION STATUS</span>
                        <span className="text-deepEmerald animate-pulse">● ENCRYPTED</span>
                    </div>
                    <a
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 bg-darkText text-white text-xs font-bold rounded-xl text-center hover:bg-mutedBlue transition-all flex items-center justify-center gap-2 group"
                    >
                        View Full Profile
                        <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
