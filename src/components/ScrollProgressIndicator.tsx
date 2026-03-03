import { motion, useScroll, useSpring } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';

export default function ScrollProgressIndicator() {
    const { isSalaarMode } = useSettings();
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 pointer-events-none hidden md:flex flex-col items-center gap-1">
            {/* Track line */}
            <div
                className={`w-[1.5px] h-[160px] rounded-full ${isSalaarMode ? 'bg-red-900/20' : 'bg-mutedBlue/15'}`}
            />
            {/* Fill line (overlay) */}
            <div className="absolute top-0 left-0 w-full h-[160px] overflow-hidden rounded-full">
                <motion.div
                    style={{ scaleY, originY: 0 }}
                    className={`w-[1.5px] h-full rounded-full ${isSalaarMode
                        ? 'bg-gradient-to-b from-red-600 to-red-900'
                        : 'bg-gradient-to-b from-mutedBlue/80 to-mutedBlue/30'
                        }`}
                />
            </div>
            {/* Dot indicator */}
            <motion.div
                style={{ scaleY }}
                className={`w-1.5 h-1.5 rounded-full mt-1 ${isSalaarMode ? 'bg-red-600 shadow-[0_0_6px_rgba(220,38,38,0.8)]' : 'bg-mutedBlue/60'}`}
            />
        </div>
    );
}
