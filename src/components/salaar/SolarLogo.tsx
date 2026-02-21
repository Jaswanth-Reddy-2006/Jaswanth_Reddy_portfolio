import { motion } from 'framer-motion';
import { useSettings } from '../../context/SettingsContext';

interface SolarLogoProps {
    size?: number;
    className?: string;
}

export default function SolarLogo({ size = 48, className = "" }: SolarLogoProps) {
    const { isSalaarMode } = useSettings();

    if (!isSalaarMode) {
        return (
            <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
                <div className="w-full h-full rounded-full bg-mutedBlue/10 flex items-center justify-center">
                    <div className="w-1/2 h-1/2 rounded-full bg-mutedBlue shadow-[0_0_10px_rgba(51,102,204,0.3)]" />
                </div>
            </div>
        );
    }

    return (
        <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
            {/* Outer Orbiting Rings */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-[1px] border-red-900/30 rounded-full"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 border-[1px] border-dashed border-red-600/20 rounded-full"
            />

            {/* Solar Core */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                        "0 0 10px rgba(153, 0, 0, 0.4)",
                        "0 0 25px rgba(255, 0, 0, 0.6)",
                        "0 0 10px rgba(153, 0, 0, 0.4)"
                    ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-1/2 h-1/2 rounded-full bg-red-700"
            >
                {/* Core Inner Glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black via-transparent to-red-500 opacity-60" />
            </motion.div>

            {/* Solar Flares (Particles) */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        rotate: [i * 60, i * 60 + 360],
                        opacity: [0, 0.8, 0],
                        scale: [0.5, 1.5, 0.5]
                    }}
                    transition={{
                        rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                        opacity: { duration: 3, repeat: Infinity, delay: i * 0.5 },
                        scale: { duration: 3, repeat: Infinity, delay: i * 0.5 }
                    }}
                    className="absolute w-full h-[2px] origin-center flex justify-end px-1"
                >
                    <div className="w-2 h-2 rounded-full bg-red-600 blur-[1px]" />
                </motion.div>
            ))}

            {/* Tactical Crosshair overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <div className="w-full h-[0.5px] bg-red-500" />
                <div className="absolute w-[0.5px] h-full bg-red-500" />
            </div>
        </div>
    );
}
