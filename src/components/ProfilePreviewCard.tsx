import { ExternalLink, Github, Code2, Linkedin, Trophy } from 'lucide-react';
import type { SocialProfile } from '../data/portfolio';
import { useSettings } from '../context/SettingsContext';

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
    const { isSalaarMode } = useSettings();
    const Icon = platformIcons[profile.platform];
    const color = platformColors[profile.platform];

    return (
        <div
            className={`w-[320px] flex-shrink-0 overflow-hidden shadow-2xl border pointer-events-auto transition-all duration-700 ${isSalaarMode
                ? 'bg-black border-red-900/50 rounded-none'
                : 'bg-white border-softGray rounded-3xl'
                }`}
        >
            {/* Header */}
            <div
                className="p-6 text-white flex items-center justify-between"
                style={{ backgroundColor: isSalaarMode ? '#1a0000' : color, borderBottom: isSalaarMode ? '1px solid #990000' : 'none' }}
            >
                <div className="flex items-center gap-3">
                    <Icon size={24} className={isSalaarMode ? 'text-red-600' : 'text-white'} />
                    <div>
                        <h4 className={`font-bold text-sm leading-none ${isSalaarMode ? 'text-red-500' : 'text-white'}`}>{profile.platform}</h4>
                        <span className={`text-[10px] opacity-80 font-mono ${isSalaarMode ? 'text-red-400' : 'text-white'}`}>@{profile.username}</span>
                    </div>
                </div>
                <a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full transition-colors ${isSalaarMode ? 'bg-red-900/20 hover:bg-red-900/40' : 'bg-white/20 hover:bg-white/30'}`}
                >
                    <ExternalLink size={16} className={isSalaarMode ? 'text-red-600' : 'text-white'} />
                </a>
            </div>

            {/* Metrics Grid */}
            <div className={`p-6 min-h-[160px] flex flex-col transition-all duration-700 ${isSalaarMode ? 'bg-black' : 'bg-gradient-to-b from-white to-warmWhite'}`}>
                <div className="grid grid-cols-2 gap-3 flex-1">
                    {Object.entries(profile.metrics).map(([key, value]) => (
                        <div key={key} className={`p-3 border transition-all duration-700 ${isSalaarMode
                            ? 'bg-red-900/5 border-red-900/20 rounded-none'
                            : 'bg-softGray/20 border-softGray/40 rounded-2xl'
                            }`}>
                            <span className={`block text-[9px] uppercase font-bold tracking-tighter mb-1 transition-colors duration-700 ${isSalaarMode ? 'text-red-500/60' : 'text-lightText/60'}`}>
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <span className={`block text-sm font-bold font-mono ${isSalaarMode ? 'text-red-400' : 'text-darkText'}`}>
                                {value}
                            </span>
                        </div>
                    ))}
                </div>

                <div className={`mt-6 pt-6 border-t flex flex-col gap-2 ${isSalaarMode ? 'border-red-900/30' : 'border-softGray/50'}`}>
                    <a
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-3 text-xs font-bold transition-all flex items-center justify-center gap-2 group ${isSalaarMode
                            ? 'bg-red-900/20 text-red-500 border border-red-900/40 hover:bg-red-900/40 rounded-none'
                            : 'bg-darkText text-white rounded-xl hover:bg-mutedBlue'
                            }`}
                    >
                        {isSalaarMode ? 'ENGAGE PROTOCOL' : 'View Full Profile'}
                        <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
    );
}
