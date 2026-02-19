import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Terminal, Activity, Cpu } from 'lucide-react';

export default function PortfolioHUD() {
    const { scrollYProgress } = useScroll();
    const [uptime, setUptime] = useState(0);
    const [currentSection, setCurrentSection] = useState('01_INTRO');

    useEffect(() => {
        const interval = setInterval(() => {
            setUptime(prev => prev + 1);
        }, 1000);

        const handleScroll = () => {
            const sections = ['chapter-1', 'chapter-2', 'chapter-experience', 'chapter-3', 'chapter-4', 'chapter-5'];
            for (const id of sections.reverse()) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top < 200) {
                    setCurrentSection(id.replace('chapter-', '0').toUpperCase().replace('EXPERIENCE', 'EXP'));
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            clearInterval(interval);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const formatUptime = (s: number) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const scrollPercentage = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const [displayPercent, setDisplayPercent] = useState(0);

    useEffect(() => {
        return scrollPercentage.onChange(v => setDisplayPercent(Math.round(v)));
    }, [scrollPercentage]);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] pointer-events-none p-4 md:p-8 flex items-end justify-between">
            {/* Left HUD: System Status */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-darkText/90 backdrop-blur-xl border border-white/10 rounded-xl p-3 md:p-4 text-[10px] font-mono text-warmWhite pointer-events-auto shadow-2xl space-y-2 min-w-[140px]"
            >
                <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                        <Activity size={12} className="text-mutedBlue animate-pulse" />
                        <span className="uppercase tracking-widest opacity-60">Status</span>
                    </div>
                    <span className="text-mutedBlue font-bold">STABLE</span>
                </div>

                <div className="space-y-1">
                    <div className="flex justify-between gap-4">
                        <span className="opacity-40">SECTION:</span>
                        <span className="text-mutedBlue">{currentSection}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <span className="opacity-40">UPTIME:</span>
                        <span>{formatUptime(uptime)}</span>
                    </div>
                </div>
            </motion.div>

            {/* Middle HUD: Scroll Metrics (Large Screens) */}
            <div className="hidden lg:flex flex-col items-center gap-2 flex-1 max-w-sm px-12">
                <div className="w-full h-[2px] bg-white/5 relative overflow-hidden rounded-full">
                    <motion.div
                        style={{ width: `${displayPercent}%` }}
                        className="absolute inset-y-0 left-0 bg-mutedBlue shadow-[0_0_10px_rgba(51,102,204,0.5)]"
                    />
                </div>
                <div className="flex justify-between w-full text-[9px] font-mono text-lightText/40 uppercase tracking-[0.3em]">
                    <span>Begin</span>
                    <span className="text-mutedBlue font-bold">{displayPercent}% Complete</span>
                    <span>Finish</span>
                </div>
            </div>

            {/* Right HUD: Quick Actions/Tools */}
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex flex-col items-end gap-3 pointer-events-auto"
            >
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="p-3 bg-white border border-softGray rounded-xl shadow-lg hover:border-mutedBlue/30 hover:shadow-mutedBlue/5 transition-all text-darkText group"
                >
                    <Terminal size={18} className="group-hover:rotate-12 transition-transform" />
                </button>

                <div className="bg-white border border-softGray rounded-xl p-2 px-3 shadow-lg flex items-center gap-3">
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] font-bold text-lightText/40 uppercase tracking-tighter">System Core</span>
                        <span className="text-[10px] font-mono font-bold text-darkText">RJR_NODE_01</span>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-softGray/30 flex items-center justify-center">
                        <Cpu size={16} className="text-mutedBlue" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
