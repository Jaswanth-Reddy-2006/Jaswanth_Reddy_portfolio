import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { useMapNavigation } from '../context/MapContext';
import { MAP_NODES } from '../experience/IntroConstants';
import { CheckCircle2, Navigation, ArrowRight } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import StoryPerson from '../experience/StoryPerson';

// Helper for cubic bezier calculation
const getBezierPoint = (t: number, p0: any, p1: any, p2: any, p3: any) => {
    const cx = 3 * (p1.x - p0.x);
    const bx = 3 * (p2.x - p1.x) - cx;
    const ax = p3.x - p0.x - cx - bx;

    const cy = 3 * (p1.y - p0.y);
    const by = 3 * (p2.y - p1.y) - cy;
    const ay = p3.y - p0.y - cy - by;

    const x = ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + p0.x;
    const y = ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + p0.y;

    return { x, y };
};

// ─── Typing Speech Bubble ───────────────────────────────────────────────────
const GREETING_SEGMENTS = [
    { text: "Hey there! I'm ", bold: false },
    { text: "Jaswanth", bold: true },
    { text: " — let me walk you through the", bold: false },
    { text: " complete map of my journey.", bold: true },
    { text: " Click any node to explore!", bold: false },
];

const FULL_TEXT = GREETING_SEGMENTS.map(s => s.text).join('');

function TypingBubble({ show, posX, posY }: { show: boolean; posX: number; posY: number }) {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!show) {
            setDisplayed('');
            setDone(false);
            return;
        }
        const startDelay = setTimeout(() => {
            let i = 0;
            const type = () => {
                if (i <= FULL_TEXT.length) {
                    setDisplayed(FULL_TEXT.slice(0, i));
                    i++;
                    timeoutRef.current = setTimeout(type, 28);
                } else {
                    setDone(true);
                }
            };
            type();
        }, 800);
        return () => {
            clearTimeout(startDelay);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [show]);

    const renderRich = () => {
        let cursor = 0;
        return GREETING_SEGMENTS.map((seg, idx) => {
            const segStart = cursor;
            const segEnd = cursor + seg.text.length;
            cursor = segEnd;
            const visiblePart = displayed.slice(segStart, Math.min(segEnd, displayed.length));
            if (!visiblePart) return null;
            return seg.bold ? (
                <span key={idx} className="font-extrabold text-blue-300">{visiblePart}</span>
            ) : (
                <span key={idx}>{visiblePart}</span>
            );
        });
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.93 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.95 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="absolute z-[200] pointer-events-none"
                    style={{
                        left: `${posX}%`,
                        top: `${posY}%`,
                        transform: 'translate(-50%, calc(-80% - 210px))',
                        width: '290px',
                    }}
                >
                    {/* Bubble */}
                    <div className="relative bg-[#060e24]/95 backdrop-blur-xl border border-blue-500/40 rounded-2xl px-5 py-4 shadow-[0_0_50px_rgba(59,130,246,0.2),inset_0_0_30px_rgba(59,130,246,0.03)]">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                            <span className="text-[9px] font-mono text-blue-400/50 uppercase tracking-[0.35em]">System // Guide</span>
                        </div>
                        <p className="text-[13px] leading-relaxed text-slate-200/90 font-light min-h-[65px]">
                            {renderRich()}
                            {!done && (
                                <span className="inline-block w-[2px] h-[13px] bg-blue-400 ml-[1px] align-middle animate-pulse" />
                            )}
                        </p>
                    </div>
                    {/* Downward arrow tail */}
                    <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: '-9px' }}>
                        <div style={{
                            width: 0, height: 0,
                            borderLeft: '9px solid transparent',
                            borderRight: '9px solid transparent',
                            borderTop: '10px solid rgba(59,130,246,0.35)',
                        }} />
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: '-7px' }}>
                        <div style={{
                            width: 0, height: 0,
                            borderLeft: '7px solid transparent',
                            borderRight: '7px solid transparent',
                            borderTop: '8px solid #060e24',
                        }} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
// ────────────────────────────────────────────────────────────────────────────

const MapCharacter = ({ startNodeId, targetNodeId, onReachTarget, onPosChange }: { 
    startNodeId: string, 
    targetNodeId: string | null, 
    onReachTarget: () => void, 
    onPosChange: (pos: { x: number; y: number }) => void 
}) => {
    const startIdx = Math.max(0, MAP_NODES.findIndex(n => n.id === startNodeId));
    const targetIdx = targetNodeId ? Math.max(0, MAP_NODES.findIndex(n => n.id === targetNodeId)) : startIdx;
    
    const isWalking = !!targetNodeId && startIdx !== targetIdx;
    
    // Position states
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);

    // Lift position to parent for bubble rendering
    useEffect(() => {
        onPosChange(pos);
    }, [pos.x, pos.y]);

    useEffect(() => {
        if (!isWalking) {
            const initial = getPosAtStep(startIdx);
            setPos(initial);
            return;
        }

        const direction = targetIdx > startIdx ? 1 : -1;
        const totalSteps = Math.abs(targetIdx - startIdx);
        
        const animateSegment = (stepIndex: number) => {
            if (stepIndex >= totalSteps) {
                onReachTarget();
                return;
            }

            const fromStep = startIdx + stepIndex * direction;
            const toStep = fromStep + direction;

            const p0 = getPosAtStep(fromStep);
            const p3 = getPosAtStep(toStep);
            
            // Complex Serpentine offsets: Alternating control points for "Random but deliberate" look
            const stagger = (fromStep % 2 === 0 ? 1 : -1) * 8; 
            const cpX1 = p0.x + (p3.x - p0.x) * 0.4;
            const cpY1 = p0.y + stagger;
            const cpX2 = p0.x + (p3.x - p0.x) * 0.6;
            const cpY2 = p3.y - stagger;

            const p1 = { x: cpX1, y: cpY1 };
            const p2 = { x: cpX2, y: cpY2 };

            const duration = 1.0; 

            const controls = animate(0, 1, {
                duration,
                ease: "linear",
                onUpdate: (t) => {
                    const point = getBezierPoint(t, p0, p1, p2, p3);
                    setPos(point);
                    
                    // Simple rotation toward destination
                    const angle = Math.atan2(p3.y - p0.y, p3.x - p0.x);
                    setRotation(angle + Math.PI / 2);
                },
                onComplete: () => {
                    animateSegment(stepIndex + 1);
                }
            });

            return () => controls.stop();
        };

        const cleanup = animateSegment(0);
        return cleanup;
    }, [targetNodeId, startNodeId]);

    function getPosAtStep(idx: number) {
        const node = MAP_NODES[idx];
        return {
            x: node.mapX ?? 0,
            y: node.mapY ?? 0
        };
    }

    return (
        <div
            className="absolute z-50 pointer-events-none drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]"
            style={{ 
                left: `${pos.x}%`, 
                top: `${pos.y}%`,
                transform: 'translate(-50%, -80%)',
                transition: 'none'
            }}
        >
            <div className={`w-36 h-48`}>
                <Canvas camera={{ position: [0, 1.5, 4.5], fov: 45 }} gl={{ alpha: true }}>
                    <ambientLight intensity={1.2} />
                    <pointLight position={[10, 10, 10]} intensity={2.5} color="#fff" />
                    <StoryPerson position={[0, -1.2, 0]} isWalking={isWalking} rotationY={rotation} />
                </Canvas>
            </div>
        </div>
    );
};

export default function MapOverlay() {
    const { isMapOpen, setIsMapOpen, activeNodeId, setActiveNodeId, visitedNodes, markVisited, animatingToNodeId, setAnimatingToNodeId } = useMapNavigation();
    const [showGreeting, setShowGreeting] = useState(false);
    const [charPos, setCharPos] = useState({ x: 10, y: 15 });

    // Show greeting when map opens for the first time
    useEffect(() => {
        if (isMapOpen) {
            setShowGreeting(true);
            // Auto-hide after 8 seconds
            const t = setTimeout(() => setShowGreeting(false), 8000);
            return () => clearTimeout(t);
        } else {
            setShowGreeting(false);
        }
    }, [isMapOpen]);

    const handleNodeClick = (id: string) => {
        if (animatingToNodeId) return;
        setShowGreeting(false); // dismiss greeting on interaction
        if (id === activeNodeId) {
            setIsMapOpen(false);
            return;
        }
        setAnimatingToNodeId(id);
    };

    const handleNext = () => {
        if (animatingToNodeId) return;
        setShowGreeting(false);
        const currentIndex = MAP_NODES.findIndex(n => n.id === activeNodeId);
        if (currentIndex < MAP_NODES.length - 1) {
            setAnimatingToNodeId(MAP_NODES[currentIndex + 1].id);
        } else {
            setIsMapOpen(false);
        }
    };

    const onReachTarget = () => {
        if (animatingToNodeId) {
            setActiveNodeId(animatingToNodeId);
            markVisited(animatingToNodeId);
            setIsMapOpen(false);
            setAnimatingToNodeId(null);
        }
    };

    const generatePath = () => {
        let d = "";
        for (let i = 0; i < MAP_NODES.length; i++) {
            const x = (MAP_NODES[i].mapX ?? 0) * 10;
            const y = (MAP_NODES[i].mapY ?? 0) * 10;
            
            if (i === 0) d += `M ${x} ${y}`;
            else {
                const prevX = (MAP_NODES[i-1].mapX ?? 0) * 10;
                const prevY = (MAP_NODES[i-1].mapY ?? 0) * 10;
                
                // Wider, smoother Serpentine offsets
                const deltaX = x - prevX;
                const deltaY = y - prevY;
                const stagger = ((i-1) % 2 === 0 ? 1 : -1) * 120;
                
                // Adjust control points based on travel direction
                const cpX1 = prevX + deltaX * 0.4;
                const cpY1 = prevY + (Math.abs(deltaY) < 10 ? stagger : deltaY * 0.2);
                const cpX2 = prevX + deltaX * 0.6;
                const cpY2 = y - (Math.abs(deltaY) < 10 ? stagger : deltaY * 0.2);
                
                d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x} ${y}`;
            }
        }
        return d;
    };

    return (
        <AnimatePresence>
            {isMapOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="fixed inset-0 z-[100] bg-[#020617]/98 flex flex-col justify-center items-center overflow-hidden"
                >
                    {/* Deep Cinematic Background */}
                    <div className="absolute inset-0 z-0 opacity-40">
                    </div>

                    <div className="relative z-10 w-full max-w-[1400px] px-24 h-[600px]">
                        <svg viewBox="0 0 1000 1000" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" preserveAspectRatio="none">
                            <defs>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                                <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#1e3a8a" />
                                    <stop offset="50%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#1e3a8a" />
                                </linearGradient>
                            </defs>
                            
                            {/* Decorative Circuit Background */}
                            {[...Array(20)].map((_, i) => (
                                <circle 
                                    key={i} 
                                    cx={Math.random() * 1000} 
                                    cy={Math.random() * 1000} 
                                    r="1.5" 
                                    fill="#3b82f6" 
                                    opacity="0.1" 
                                />
                            ))}

                            <motion.path 
                                d={generatePath()}
                                stroke="url(#pathGrad)" strokeWidth="6" fill="none" opacity="0.15"
                            />
                            <motion.path 
                                d={generatePath()}
                                stroke="#60a5fa" strokeWidth="2" fill="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2.5, ease: "easeInOut" }}
                                filter="url(#glow)"
                            />

                            {/* Moving Scan Line */}
                            <motion.line 
                                x1="0" y1="0" x2="1000" y2="0"
                                stroke="#3b82f6" strokeWidth="1" opacity="0.1"
                                animate={{ y: [0, 1000] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                            />

                        </svg>

                        <MapCharacter 
                            startNodeId={activeNodeId} 
                            targetNodeId={animatingToNodeId} 
                            onReachTarget={onReachTarget} 
                            onPosChange={setCharPos}
                        />

                        {/* Typing Speech Bubble: absolutely positioned in this container */}
                        <TypingBubble 
                            show={showGreeting && !animatingToNodeId} 
                            posX={charPos.x} 
                            posY={charPos.y} 
                        />

                        {MAP_NODES.map((node, i) => {
                            const isActive = (animatingToNodeId || activeNodeId) === node.id;
                            const isVisited = visitedNodes.includes(node.id) || activeNodeId === node.id;

                            const xPct = node.mapX ?? 0;
                            const yPct = node.mapY ?? 0;

                            return (
                                <motion.div
                                    key={node.id}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.05 * i, type: "spring", stiffness: 100 }}
                                    className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
                                    style={{ left: `${xPct}%`, top: `${yPct}%` }}
                                    onClick={() => handleNodeClick(node.id)}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.15 }}
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 ${isActive ? 'bg-blue-600/30 border-blue-400 shadow-[0_0_40px_rgba(59,130,246,0.3)] backdrop-blur-md' : isVisited ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-900/80 border-slate-800 hover:border-blue-500/50'}`}
                                    >
                                        <div className="relative">
                                            {isActive && (
                                                <motion.div 
                                                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                                                    transition={{ repeat: Infinity, duration: 2 }}
                                                    className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl" 
                                                />
                                            )}
                                            {isActive ? (
                                                <Navigation size={20} className="text-white relative z-10" />
                                            ) : isVisited ? (
                                                <CheckCircle2 size={18} className="text-blue-500/70" />
                                            ) : (
                                                <div className="w-2 h-2 rounded-full bg-slate-700" />
                                            )}
                                        </div>
                                    </motion.div>

                                    <div className={`mt-4 whitespace-nowrap text-[10px] font-black tracking-[0.2em] uppercase transition-colors duration-300 ${isActive ? 'text-blue-400' : 'text-slate-600 group-hover:text-blue-500/70'}`}>
                                        {node.title}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="absolute bottom-12 right-12 z-[110] flex items-center justify-end pointer-events-auto">
                        <button 
                            onClick={handleNext}
                            className="group flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white hover:bg-blue-500 hover:scale-110 transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] border border-blue-400/20"
                            title="Ignite Next Module"
                        >
                            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

