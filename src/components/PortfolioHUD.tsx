import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PortfolioHUD() {
    const { scrollYProgress } = useScroll();

    const scrollPercentage = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const [displayPercent, setDisplayPercent] = useState(0);

    useEffect(() => {
        return scrollPercentage.onChange(v => setDisplayPercent(Math.round(v)));
    }, [scrollPercentage]);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] pointer-events-none p-4 md:p-8 flex items-end justify-center">
            {/* Left HUD: Removed */}

            {/* Middle HUD: Scroll Metrics (Large Screens) */}
            <div className="hidden lg:flex flex-col items-center gap-2 flex-1 max-w-sm px-12">
                <div className="w-full h-[2px] bg-white/5 relative overflow-hidden rounded-full">
                    <motion.div
                        style={{ width: `${displayPercent}%` }}
                        className="absolute inset-y-0 left-0 bg-mutedBlue shadow-[0_0_10px_rgba(51,102,204,0.5)]"
                    />
                </div>
                <div className="flex justify-center w-full text-[9px] font-mono text-lightText/40 uppercase tracking-[0.3em]">
                    <span className="text-mutedBlue font-bold">{displayPercent}% Complete</span>
                </div>
            </div>

            {/* Right HUD: Removed */}
        </div>
    );
}
