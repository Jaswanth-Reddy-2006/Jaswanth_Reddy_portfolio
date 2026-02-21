import { motion } from 'framer-motion';
import { useSettings } from '../../context/SettingsContext';

export default function SalaarHUD() {
    const { isSalaarMode } = useSettings();

    if (!isSalaarMode) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden font-mono uppercase text-[10px] tracking-[0.2em] text-red-600/50">

            {/* Corner Bracket Accents */}
            <div className="absolute top-24 left-10 w-4 h-4 border-t-2 border-l-2 border-red-900/40" />
            <div className="absolute top-24 right-10 w-4 h-4 border-t-2 border-r-2 border-red-900/40" />
            <div className="absolute bottom-10 left-10 w-4 h-4 border-b-2 border-l-2 border-red-900/40" />
            <div className="absolute bottom-10 right-10 w-4 h-4 border-b-2 border-r-2 border-red-900/40" />

            {/* Scrolling Scanline Effect */}
            <motion.div
                animate={{ y: ["0%", "100%"] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 top-0 h-[2px] bg-red-600/10"
            />
        </div>
    );
}
