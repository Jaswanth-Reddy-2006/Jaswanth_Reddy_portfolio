import { motion } from 'framer-motion';

export type BackgroundVariant = 'systems' | 'flows' | 'tradeoffs' | 'shipping' | 'evolution';

interface SceneBackgroundProps {
    variant: BackgroundVariant;
}

export default function SceneBackground({ variant }: SceneBackgroundProps) {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute inset-0 opacity-[0.03] text-mutedBlue">
                {variant === 'systems' && <SystemsBackground />}
                {variant === 'flows' && <FlowsBackground />}
                {variant === 'tradeoffs' && <TradeoffsBackground />}
                {variant === 'shipping' && <ShippingBackground />}
                {variant === 'evolution' && <EvolutionBackground />}
            </div>
        </div>
    );
}

function SystemsBackground() {
    return (
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.circle
                cx="20" cy="20" r="1"
                fill="currentColor"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
                cx="80" cy="50" r="1"
                fill="currentColor"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.circle
                cx="40" cy="80" r="1"
                fill="currentColor"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            {/* Connecting lines */}
            <motion.path
                d="M20 20 L80 50 M80 50 L40 80 M40 80 L20 20"
                stroke="currentColor"
                strokeWidth="0.2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut" }}
            />
        </svg>
    );
}

function FlowsBackground() {
    return (
        <div className="w-full h-full flex flex-col justify-around opacity-50">
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    className="h-[1px] bg-gradient-to-r from-transparent via-current to-transparent w-full"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i
                    }}
                />
            ))}
        </div>
    );
}

function TradeoffsBackground() {
    return (
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Main Path */}
            <motion.path
                d="M50 100 L50 60"
                stroke="currentColor"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
            />
            {/* Left Branch (Faded) */}
            <motion.path
                d="M50 60 L20 20"
                stroke="currentColor"
                strokeWidth="0.3"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            />
            {/* Right Branch (Highlighted) */}
            <motion.path
                d="M50 60 L80 20"
                stroke="currentColor"
                strokeWidth="0.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.circle
                cx="80" cy="20" r="1"
                fill="currentColor"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5 }}
            />
        </svg>
    );
}

function ShippingBackground() {
    const blocks = Array.from({ length: 20 });
    return (
        <div className="w-full h-full grid grid-cols-5 gap-4 opacity-50 p-10 transform -rotate-12 scale-150">
            {blocks.map((_, i) => (
                <motion.div
                    key={i}
                    className="w-full pt-[100%] bg-current rounded-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: Math.random() * 0.5 + 0.2, scale: 1 }}
                    transition={{
                        duration: 0.5,
                        delay: i * 0.1,
                        repeat: Infinity,
                        repeatType: "reverse",
                        repeatDelay: Math.random() * 5
                    }}
                />
            ))}
        </div>
    );
}

function EvolutionBackground() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <motion.div
                className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full border border-dashed border-current opacity-50"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute w-[60vw] h-[60vw] md:w-[30vw] md:h-[30vw] rounded-full border border-dotted border-current opacity-30"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
}
