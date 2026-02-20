import { motion } from 'framer-motion';
import { useSettings } from '../../context/SettingsContext';
import { Crosshair } from 'lucide-react';

export default function SalaarHUD() {
    const { isSalaarMode } = useSettings();

    if (!isSalaarMode) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden font-mono uppercase text-[10px] tracking-[0.2em] text-red-600/50">
            {/* Top Bar Diagnostics */}
            <div className="absolute top-20 left-10 right-10 flex justify-between items-start">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Crosshair size={10} className="text-red-600 animate-pulse" />
                        <span>SALAAR_INIT: READY</span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="flex items-center justify-end gap-2 text-white/40">
                        <span>KHANSAAR_PROTOCOL_V4</span>
                        <Crosshair size={10} />
                    </div>
                </div>
            </div>

            {/* Side Scanning Indicators */}
            <div className="absolute top-1/2 -left-4 -translate-y-1/2 flex flex-col gap-4 opacity-30">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ width: [4, 12, 4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                        className="h-px bg-red-600"
                    />
                ))}
            </div>

            <div className="absolute top-1/2 -right-4 -translate-y-1/2 flex flex-col gap-4 opacity-30 items-end">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ width: [4, 20, 4] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        className="h-px bg-red-600"
                    />
                ))}
            </div>

            {/* Corner Bracket Accents */}
            <div className="absolute top-24 left-10 w-4 h-4 border-t-2 border-l-2 border-red-900/40" />
            <div className="absolute top-24 right-10 w-4 h-4 border-t-2 border-r-2 border-red-900/40" />
            <div className="absolute bottom-10 left-10 w-4 h-4 border-b-2 border-l-2 border-red-900/40" />
            <div className="absolute bottom-10 right-10 w-4 h-4 border-b-2 border-r-2 border-red-900/40" />

            {/* Scrolling Scanline Effect */}
            <motion.div
                animate={{ y: ["0%", "1000%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 top-0 h-px bg-red-900/20 shadow-[0_0_10px_#990000]"
            />
        </div>
    );
}
