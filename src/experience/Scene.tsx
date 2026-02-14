import { motion } from 'framer-motion';
import { ArrowRight, Activity } from 'lucide-react';
import SceneBackground, { type BackgroundVariant } from './SceneBackground';
import { useState } from 'react';
import FlowSimulation from './FlowSimulation';

interface SceneProps {
    headline: string;
    subtext: string;
    variant: BackgroundVariant;
    insights?: string[];
    onNext: () => void;
    isLastScene?: boolean;
}

function IdentityAccent({ variant }: { variant: BackgroundVariant }) {
    const paths: Record<string, string> = {
        systems: "M10 20 L290 20", // Straight
        flows: "M10 20 C50 10, 150 30, 290 20", // Curve
        tradeoffs: "M10 20 L150 20 M150 20 L200 10 M150 20 L200 30", // Forked
        shipping: "M10 20 L80 20 L80 10 L150 10 L150 30 L220 30 L220 20 L290 20", // Stepped
        evolution: "M150 20 C150 20, 100 0, 100 20 C100 40, 200 40, 200 20 C200 0, 150 20, 150 20" // Loop
    };

    return (
        <div className="flex justify-center mb-8 h-10">
            <svg width="300" height="40" viewBox="0 0 300 40" fill="none" className="opacity-60">
                <motion.path
                    d={paths[variant] || paths.systems}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-mutedBlue"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                />
            </svg>
        </div>
    );
}

export default function Scene({ headline, subtext, variant, insights = [], onNext, isLastScene = false }: SceneProps) {
    const [showFlow, setShowFlow] = useState(false);
    const [isInsightExpanded, setIsInsightExpanded] = useState(false);

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-warmWhite text-center px-6 relative overflow-hidden">

            <SceneBackground variant={variant} />

            <motion.div
                initial={{ opacity: 0, scale: 1, y: 20, filter: 'blur(0px)' }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    filter: 'blur(0px)'
                }}
                exit={{ opacity: 0, scale: 0.98, y: 0, filter: 'blur(2px)' }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="max-w-4xl relative z-10 transition-transform duration-500 w-full"
            >
                <h1 className="text-4xl md:text-6xl font-bold text-darkText mb-6 tracking-tight text-balance">
                    {headline}
                </h1>

                <IdentityAccent variant={variant} />

                <div className="mb-12">
                    <p className="text-xl md:text-2xl text-lightText mb-4 font-light tracking-wide text-balance">
                        {subtext}
                    </p>

                    {insights.length > 0 && (
                        <div className="mt-4">
                            <button
                                onClick={() => setIsInsightExpanded(!isInsightExpanded)}
                                className="text-sm font-medium text-mutedBlue hover:text-darkText transition-colors"
                            >
                                {isInsightExpanded ? "Show Less ←" : "Show More →"}
                            </button>

                            <motion.div
                                initial={false}
                                animate={{
                                    height: isInsightExpanded ? "auto" : 0,
                                    opacity: isInsightExpanded ? 1 : 0
                                }}
                                transition={{ duration: 0.45, ease: "easeInOut" }}
                                className="overflow-hidden mt-4"
                            >
                                <div className="max-w-md mx-auto space-y-2 border-l border-softGray pl-4 text-left">
                                    {insights.map((insight, idx) => (
                                        <p key={idx} className="text-sm text-lightText leading-relaxed">
                                            {insight}
                                        </p>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>

                {variant === 'flows' && (
                    <div className="mb-8 w-full max-w-3xl mx-auto">
                        {!showFlow ? (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                onClick={() => setShowFlow(true)}
                                className="px-4 py-2 bg-white/50 border border-softGray rounded-lg text-xs font-mono text-mutedBlue hover:bg-white transition-all flex items-center gap-2 mx-auto"
                            >
                                <Activity size={12} />
                                Show Flow
                            </motion.button>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="relative pt-6 pb-2">
                                    <button
                                        onClick={() => setShowFlow(false)}
                                        className="absolute top-0 right-2 text-xs text-mutedBlue hover:text-darkText z-10"
                                    >
                                        Hide Flow
                                    </button>
                                    <FlowSimulation />
                                </div>
                            </motion.div>
                        )}
                    </div>
                )}

                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <motion.button
                        onClick={onNext}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`group flex items-center gap-3 text-lg font-medium transition-all ${isLastScene
                            ? 'px-8 py-3 bg-darkText text-warmWhite rounded-full hover:bg-mutedBlue'
                            : 'text-mutedBlue hover:text-darkText'
                            }`}
                    >
                        {isLastScene ? 'Explore the Work' : 'Continue'}
                        <ArrowRight size={20} className={`transition-transform duration-300 ${isLastScene ? '' : 'group-hover:translate-x-1'}`} />
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
