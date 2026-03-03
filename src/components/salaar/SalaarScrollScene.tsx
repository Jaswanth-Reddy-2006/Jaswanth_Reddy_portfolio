import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const EMBER_COUNT = 20;

function EmberParticles() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            {Array.from({ length: EMBER_COUNT }).map((_, i) => {
                const left = `${5 + (i * 4.7) % 90}%`;
                const delay = `${(i * 0.37) % 4}s`;
                const duration = `${2.5 + (i * 0.31) % 2}s`;
                const size = i % 3 === 0 ? 'w-1.5 h-1.5' : i % 2 === 0 ? 'w-1 h-1' : 'w-0.5 h-0.5';
                const bottom = `${5 + (i * 3.1) % 30}%`;
                return (
                    <div
                        key={i}
                        className={`absolute rounded-full ${size}`}
                        style={{
                            left,
                            bottom,
                            background: i % 2 === 0 ? 'rgba(220,38,38,0.9)' : 'rgba(251,146,60,0.8)',
                            boxShadow: `0 0 ${4 + (i % 4)}px rgba(220,38,38,0.8)`,
                            animation: `emberRise ${duration} ease-out infinite`,
                            animationDelay: delay,
                        }}
                    />
                );
            })}
        </div>
    );
}

function CinematicScene({
    index,
    opacity,
    scale,
    x,
    title,
    subtitle,
    titleOpacity,
}: {
    index: number;
    opacity: any;
    scale: any;
    x?: any;
    title: string;
    subtitle: string;
    titleOpacity: any;
}) {
    const gradients = [
        // Scene 1 — Warrior closeup: dark crimson atmosphere
        'radial-gradient(ellipse at 40% 50%, #3b0000 0%, #1a0000 40%, #000 100%)',
        // Scene 2 — Action frame: orange-red battlefield
        'radial-gradient(ellipse at 60% 40%, #2d0800 0%, #1a0000 50%, #000 100%)',
        // Scene 3 — Dark vast battlefield: near-black with horizon glow
        'radial-gradient(ellipse at 50% 80%, #200000 0%, #0d0000 60%, #000 100%)',
    ];

    const accentLayers = [
        // Scene 1: vertical light beam
        <div key="a1" className="absolute top-0 left-1/3 w-[2px] h-full opacity-20"
            style={{ background: 'linear-gradient(to bottom, transparent, #dc2626 40%, transparent)' }} />,
        // Scene 2: horizontal slash
        <div key="a2" className="absolute top-1/2 left-0 w-full h-[1px] opacity-30"
            style={{ background: 'linear-gradient(to right, transparent, #dc2626 50%, transparent)' }} />,
        // Scene 3: wide glow at bottom
        <div key="a3" className="absolute bottom-0 left-0 right-0 h-[200px]"
            style={{ background: 'linear-gradient(to top, rgba(220,38,38,0.15), transparent)' }} />,
    ];

    return (
        <motion.div
            className="absolute inset-0"
            style={{ opacity }}
        >
            {/* Background gradient simulating cinematic scene */}
            <motion.div
                className="absolute inset-0"
                style={{
                    background: gradients[index],
                    scale,
                    x: x || 0,
                }}
            />

            {/* Vignette overlay */}
            <div className="absolute inset-0 vignette pointer-events-none" />

            {/* Red ambient glow */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(100,0,0,0.2) 0%, transparent 70%)' }} />

            {/* Scene accent decoration */}
            {accentLayers[index]}

            {/* Cinematic letterbox bars */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-black pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-black pointer-events-none" />

            {/* Text overlay */}
            <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center z-20 px-8"
                style={{ opacity: titleOpacity }}
            >
                <div className="text-center max-w-2xl">
                    <div className="text-[9px] font-mono text-red-600 uppercase tracking-[0.5em] mb-4 opacity-80">
                        // CHAPTER_{index + 1}
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tight mb-3"
                        style={{ textShadow: '0 0 40px rgba(220,38,38,0.4)' }}>
                        {title}
                    </h3>
                    <p className="text-sm md:text-base text-white/50 font-mono uppercase tracking-widest">
                        {subtitle}
                    </p>
                    <div className="mt-6 w-16 h-[1px] bg-red-700 mx-auto" />
                </div>
            </motion.div>

            {/* Ember particles on all scenes */}
            <EmberParticles />
        </motion.div>
    );
}

const SCENES = [
    {
        title: 'Warrior Initialized',
        subtitle: 'Power: Absolute. Ceasefire: Broken.',
    },
    {
        title: 'The Architect Moves',
        subtitle: 'Systems: Armed. Deployment: Active.',
    },
    {
        title: 'Battlefield Dominance',
        subtitle: 'Victory: Inevitable. Code: Weaponized.',
    },
];

export default function SalaarScrollScene() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 25,
    });

    // Scene 1: 0% → 40%
    const scene1Opacity = useTransform(smoothProgress, [0, 0.1, 0.3, 0.42], [0, 1, 1, 0]);
    const scene1Scale = useTransform(smoothProgress, [0, 0.4], [1, 1.08]);
    const scene1TextOpacity = useTransform(smoothProgress, [0.05, 0.15, 0.28, 0.4], [0, 1, 1, 0]);

    // Scene 2: 30% → 70%
    const scene2Opacity = useTransform(smoothProgress, [0.3, 0.42, 0.58, 0.7], [0, 1, 1, 0]);
    const scene2Scale = useTransform(smoothProgress, [0.3, 0.7], [1.05, 1]);
    const scene2X = useTransform(smoothProgress, [0.3, 0.7], [-20, 0]);
    const scene2TextOpacity = useTransform(smoothProgress, [0.33, 0.43, 0.58, 0.68], [0, 1, 1, 0]);

    // Scene 3: 60% → 100%
    const scene3Opacity = useTransform(smoothProgress, [0.6, 0.72, 0.9, 1], [0, 1, 1, 0.8]);
    const scene3Scale = useTransform(smoothProgress, [0.6, 1], [1, 1.1]);
    const scene3TextOpacity = useTransform(smoothProgress, [0.65, 0.75, 0.92, 1], [0, 1, 1, 0]);

    // Progress indicator line
    const progressScaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

    return (
        <div ref={containerRef} style={{ height: '300vh' }} className="relative">
            {/* Sticky canvas */}
            <div className="sticky top-0 h-screen overflow-hidden bg-black">

                {/* Scene 1 */}
                <CinematicScene
                    index={0}
                    opacity={scene1Opacity}
                    scale={scene1Scale}
                    title={SCENES[0].title}
                    subtitle={SCENES[0].subtitle}
                    titleOpacity={scene1TextOpacity}
                />

                {/* Scene 2 */}
                <CinematicScene
                    index={1}
                    opacity={scene2Opacity}
                    scale={scene2Scale}
                    x={scene2X}
                    title={SCENES[1].title}
                    subtitle={SCENES[1].subtitle}
                    titleOpacity={scene2TextOpacity}
                />

                {/* Scene 3 */}
                <CinematicScene
                    index={2}
                    opacity={scene3Opacity}
                    scale={scene3Scale}
                    title={SCENES[2].title}
                    subtitle={SCENES[2].subtitle}
                    titleOpacity={scene3TextOpacity}
                />

                {/* Right-side scroll progress bar */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden md:block">
                    <div className="w-[2px] h-32 bg-red-900/20 relative rounded-full overflow-hidden">
                        <motion.div
                            style={{ scaleY: progressScaleY, originY: 0 }}
                            className="absolute inset-0 bg-gradient-to-b from-red-600 to-red-900"
                        />
                    </div>
                    <div className="mt-2 text-[8px] font-mono text-red-700/60 uppercase tracking-widest" style={{ writingMode: 'vertical-rl' }}>
                        SEQUENCE
                    </div>
                </div>

                {/* Persistent grain texture */}
                <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.04]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
                    }}
                />

                {/* Scroll hint at bottom */}
                <motion.div
                    className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none"
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="text-[9px] font-mono text-red-600/60 uppercase tracking-[0.3em]">
                        scroll to advance
                    </div>
                    <div className="mt-1 w-[1px] h-6 bg-red-700/30 mx-auto" />
                </motion.div>

            </div>
        </div>
    );
}
