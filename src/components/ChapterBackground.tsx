import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';

interface ChapterBackgroundProps {
    chapter: 1 | 2 | 3 | 4 | 5 | 6;
}

// ─── Chapter 1: Hero ───────────────────────────────────────────────────────────
function Chapter1Zen() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Aurora orbs */}
            {[
                { x: '10%', delay: 0, color: 'bg-mutedBlue/10', size: 'w-[500px] h-[500px]' },
                { x: '60%', delay: 2, color: 'bg-deepEmerald/8', size: 'w-[400px] h-[400px]' },
                { x: '80%', delay: 4, color: 'bg-purple-300/6', size: 'w-[300px] h-[300px]' },
            ].map((orb, i) => (
                <motion.div
                    key={i}
                    animate={{ y: [0, -60, 0], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: orb.delay }}
                    className={`absolute top-[20%] ${orb.size} ${orb.color} rounded-full blur-[80px]`}
                    style={{ left: orb.x }}
                />
            ))}
            {/* Soft rising particles */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '-20%', opacity: [0, 0.5, 0] }}
                    transition={{ duration: 10 + Math.random() * 8, repeat: Infinity, delay: i * 1.3, ease: 'easeOut' }}
                    className="absolute w-1 h-1 bg-mutedBlue/30 rounded-full"
                    style={{ left: `${8 + i * 7.5}%` }}
                />
            ))}
        </div>
    );
}

function Chapter1Salaar() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Horizontal energy beams */}
            {[30, 50, 70].map((top, i) => (
                <motion.div
                    key={i}
                    animate={{ x: ['-100%', '200%'], opacity: [0, 0.6, 0] }}
                    transition={{ duration: 4 + i, repeat: Infinity, delay: i * 1.5, ease: 'easeInOut' }}
                    className="absolute h-[1px] w-[60%] bg-gradient-to-r from-transparent via-red-600 to-transparent"
                    style={{ top: `${top}%` }}
                />
            ))}
            {/* Corner flares */}
            <motion.div
                animate={{ opacity: [0.1, 0.4, 0.1], scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-20 -left-20 w-96 h-96 bg-red-900/20 rounded-full blur-[80px]"
            />
            <motion.div
                animate={{ opacity: [0.05, 0.3, 0.05], scale: [1, 1.15, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-red-950/20 rounded-full blur-[100px]"
            />
            {/* Vertical scan lines */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ y: ['-100%', '200%'] }}
                    transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'linear', delay: i * 2.5 }}
                    className="absolute w-[1px] h-[30%] bg-gradient-to-b from-transparent via-red-700/50 to-transparent"
                    style={{ left: `${20 + i * 30}%` }}
                />
            ))}
        </div>
    );
}

// ─── Chapter 2: Projects ───────────────────────────────────────────────────────
function Chapter2Zen() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Blueprint grid */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#3366cc 1px, transparent 1px), linear-gradient(90deg, #3366cc 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            />
            {/* Flowing diagonal lines */}
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ x: ['-100px', '100vw'] }}
                    transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear', delay: i * 4 }}
                    className="absolute h-[1px] bg-gradient-to-r from-transparent via-mutedBlue/15 to-transparent"
                    style={{ top: `${15 + i * 20}%`, width: '600px', transform: `rotate(-8deg)` }}
                />
            ))}
            {/* Soft corner glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-mutedBlue/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-deepEmerald/5 rounded-full blur-[80px]" />
        </div>
    );
}

function Chapter2Salaar() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Radar circle sweep */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
                style={{ opacity: 0.04 }}
            >
                <div className="w-full h-full border border-red-600/30 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1/2 h-[1px] origin-left bg-gradient-to-r from-red-600/60 to-transparent" />
                </div>
            </motion.div>
            {/* Targeting crosshairs fading in/out */}
            {[
                { top: '20%', left: '15%' }, { top: '60%', left: '75%' }, { top: '40%', left: '50%' }
            ].map((pos, i) => (
                <motion.div
                    key={i}
                    animate={{ opacity: [0, 0.15, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 2, ease: 'easeInOut' }}
                    className="absolute w-8 h-8"
                    style={pos}
                >
                    <div className="absolute inset-0 border border-red-600 rounded-full" />
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-red-600" />
                    <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-red-600" />
                </motion.div>
            ))}
            {/* Red tactical glow pools */}
            <div className="absolute -top-40 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-[100px]" />
        </div>
    );
}

// ─── Chapter 3: Skills ─────────────────────────────────────────────────────────
function Chapter3Zen() {
    // Hexagonal mesh: draw hex outlines using divs
    const hexPositions = [
        { top: '5%', left: '2%' }, { top: '5%', left: '18%' }, { top: '5%', left: '34%' },
        { top: '30%', left: '10%' }, { top: '30%', left: '26%' }, { top: '30%', left: '78%' },
        { top: '55%', left: '2%' }, { top: '55%', left: '60%' }, { top: '75%', left: '20%' },
        { top: '75%', left: '50%' }, { top: '75%', left: '80%' }, { top: '15%', left: '70%' },
    ];
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {hexPositions.map((pos, i) => (
                <motion.div
                    key={i}
                    animate={{ opacity: [0.04, 0.12, 0.04], scale: [1, 1.05, 1] }}
                    transition={{ duration: 4 + (i % 3) * 2, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
                    className="absolute w-16 h-16 border border-mutedBlue/20"
                    style={{ ...pos, clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                />
            ))}
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-transparent to-mutedBlue/5" />
        </div>
    );
}

function Chapter3Salaar() {
    // Matrix-style code rain columns
    const columns = [...Array(10)].map((_, i) => ({
        left: `${5 + i * 9.5}%`,
        delay: i * 0.4,
        duration: 8 + (i % 3) * 3,
    }));
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {columns.map((col, i) => (
                <motion.div
                    key={i}
                    initial={{ y: '-100%' }}
                    animate={{ y: '120%' }}
                    transition={{ duration: col.duration, repeat: Infinity, delay: col.delay, ease: 'linear' }}
                    className="absolute text-[9px] font-mono text-red-700/30 whitespace-pre leading-4"
                    style={{ left: col.left, writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                >
                    {Array(30).fill(null).map(() => (Math.random() > 0.5 ? '1' : '0')).join('')}
                </motion.div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0000]/80 via-transparent to-[#0a0000]/80" />
        </div>
    );
}

// ─── Chapter 4: Education ──────────────────────────────────────────────────────
function Chapter4Zen() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Warm dawn gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-transparent to-warmWhite/10" />
            {/* Rising warm particles */}
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '10%', opacity: [0, 0.4, 0] }}
                    transition={{ duration: 12 + i * 0.8, repeat: Infinity, delay: i * 1.1, ease: 'easeOut' }}
                    className="absolute rounded-full"
                    style={{
                        left: `${5 + i * 9}%`,
                        width: `${4 + (i % 3) * 2}px`,
                        height: `${4 + (i % 3) * 2}px`,
                        background: i % 2 === 0 ? 'rgba(255, 191, 36, 0.15)' : 'rgba(59, 130, 246, 0.12)',
                    }}
                />
            ))}
            {/* Horizon glow */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-50/20 to-transparent" />
        </div>
    );
}

function Chapter4Salaar() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Rising red embers */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: '100%', opacity: 0, x: 0 }}
                    animate={{
                        y: '-20%',
                        opacity: [0, 0.6, 0],
                        x: [0, (i % 2 === 0 ? 20 : -20)],
                    }}
                    transition={{ duration: 7 + i * 0.5, repeat: Infinity, delay: i * 0.7, ease: 'easeOut' }}
                    className="absolute w-1 h-1 bg-red-600/60 rounded-full"
                    style={{ left: `${5 + i * 8}%` }}
                />
            ))}
            {/* Dark stone ambiance */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-950/20 via-transparent to-transparent" />
            <motion.div
                animate={{ opacity: [0.05, 0.15, 0.05] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-red-900/10 rounded-full blur-[80px]"
            />
        </div>
    );
}

// ─── Chapter 5: Vision ─────────────────────────────────────────────────────────
function Chapter5Zen() {
    // Starfield parallax
    const stars = [...Array(40)].map((_i) => ({
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        size: 0.5 + Math.random() * 1.5,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
    }));
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {stars.map((star, i) => (
                <motion.div
                    key={i}
                    animate={{ opacity: [0.1, 0.5, 0.1] }}
                    transition={{ duration: star.duration, repeat: Infinity, delay: star.delay, ease: 'easeInOut' }}
                    className="absolute rounded-full bg-mutedBlue/50"
                    style={{ left: star.x, top: star.y, width: star.size, height: star.size }}
                />
            ))}
            {/* Deep space orbs */}
            <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.04, 0.1, 0.04] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[80px]"
            />
        </div>
    );
}

function Chapter5Salaar() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Warp speed lines */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: [0, 1, 0], opacity: [0, 0.3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }}
                    className="absolute h-[1px] bg-gradient-to-r from-red-600/0 via-red-600/50 to-red-600/0 origin-center"
                    style={{
                        top: `${10 + i * 10}%`,
                        left: '10%',
                        width: '80%',
                    }}
                />
            ))}
            {/* Red nebula */}
            <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.2, 0.08] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-red-900/20 rounded-full blur-[100px]"
            />
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.12, 0.05] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-orange-900/10 rounded-full blur-[80px]"
            />
        </div>
    );
}

// ─── Chapter 6: Certifications ─────────────────────────────────────────────────
function Chapter6Zen() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Ribbons of light */}
            {[
                { top: '20%', rotate: '-15deg', delay: 0 },
                { top: '50%', rotate: '8deg', delay: 1.5 },
                { top: '75%', rotate: '-5deg', delay: 3 },
            ].map((ribbon, i) => (
                <motion.div
                    key={i}
                    animate={{ x: ['-60%', '160%'], opacity: [0, 0.3, 0] }}
                    transition={{ duration: 12 + i * 3, repeat: Infinity, delay: ribbon.delay, ease: 'easeInOut' }}
                    className="absolute h-[2px] w-[50%] bg-gradient-to-r from-transparent via-amber-300/40 to-transparent"
                    style={{ top: ribbon.top, transform: `rotate(${ribbon.rotate})` }}
                />
            ))}
            {/* Golden ambient glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-amber-100/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-10 left-10 w-[300px] h-[200px] bg-yellow-100/8 rounded-full blur-[80px]" />
        </div>
    );
}

function Chapter6Salaar() {
    // Holographic flickering seals
    const seals = [
        { top: '10%', left: '5%' }, { top: '60%', left: '10%' },
        { top: '20%', right: '5%' }, { top: '70%', right: '8%' },
    ];
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {seals.map((pos, i) => (
                <motion.div
                    key={i}
                    animate={{ opacity: [0.04, 0.14, 0.04], scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}
                    className="absolute w-14 h-14 border border-yellow-600/30 rounded-full"
                    style={pos}
                >
                    <div className="absolute inset-2 border border-yellow-500/20 rounded-full" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-yellow-600/30 rounded-full" />
                    </div>
                </motion.div>
            ))}
            {/* Gold credential glow */}
            <motion.div
                animate={{ opacity: [0.05, 0.15, 0.05] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[100px]"
            />
            {/* Scan line */}
            <motion.div
                animate={{ y: ['-10%', '110%'] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
                className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-600/20 to-transparent"
            />
        </div>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function ChapterBackground({ chapter }: ChapterBackgroundProps) {
    const { isSalaarMode } = useSettings();

    const backgrounds = {
        1: isSalaarMode ? <Chapter1Salaar /> : <Chapter1Zen />,
        2: isSalaarMode ? <Chapter2Salaar /> : <Chapter2Zen />,
        3: isSalaarMode ? <Chapter3Salaar /> : <Chapter3Zen />,
        4: isSalaarMode ? <Chapter4Salaar /> : <Chapter4Zen />,
        5: isSalaarMode ? <Chapter5Salaar /> : <Chapter5Zen />,
        6: isSalaarMode ? <Chapter6Salaar /> : <Chapter6Zen />,
    };

    return backgrounds[chapter] ?? null;
}
