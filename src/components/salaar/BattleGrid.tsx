import { useSettings } from '../../context/SettingsContext';

interface BattleGridProps {
    className?: string;
    opacity?: number;
    intensity?: 'low' | 'medium' | 'high';
    isCard?: boolean;
}

export default function BattleGrid({
    className = "",
    opacity = 0.4,
    intensity = 'medium',
    isCard = false
}: BattleGridProps) {
    const { isSalaarMode } = useSettings();

    if (!isSalaarMode) return null;

    const gridColor = "rgba(153, 0, 0, 0.15)";
    const laserColor = "rgba(255, 0, 0, 0.4)";
    const dotColor = "rgba(255, 0, 0, 0.6)";

    const vScanDuration = intensity === 'high' ? '3s' : '5s';
    const hScanDuration = intensity === 'high' ? '4s' : '7s';

    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} style={{ opacity }}>
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scan-v {
                    0% { left: -5%; opacity: 0; }
                    50% { opacity: 1; }
                    100% { left: 105%; opacity: 0; }
                }
                @keyframes scan-h {
                    0% { top: -5%; opacity: 0; }
                    50% { opacity: 1; }
                    100% { top: 105%; opacity: 0; }
                }
                @keyframes pulse-dot {
                    0%, 100% { opacity: 0.2; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.2); }
                }
            `}} />

            {/* Base Tactical Grid */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, ${gridColor} 1px, transparent 1px),
                        linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
                    `,
                    backgroundSize: isCard ? '20px 20px' : '40px 40px'
                }}
            />

            {/* Scanning Vertical Line */}
            <div
                className="absolute top-0 bottom-0 w-[1px] z-10 will-change-transform"
                style={{
                    background: `linear-gradient(to bottom, transparent, ${laserColor}, transparent)`,
                    boxShadow: `0 0 15px 1px ${laserColor}`,
                    animation: `scan-v ${vScanDuration} linear infinite`
                }}
            />

            {/* Scanning Horizontal Line */}
            <div
                className="absolute left-0 right-0 h-[1px] z-10 will-change-transform"
                style={{
                    background: `linear-gradient(to right, transparent, ${laserColor}, transparent)`,
                    boxShadow: `0 0 15px 1px ${laserColor}`,
                    animation: `scan-h ${hScanDuration} linear infinite`,
                    animationDelay: '1s'
                }}
            />

            {/* Glowing Intersections (Pulsing Nodes) - Limited for performance */}
            {!isCard && (
                <div className="absolute inset-0 flex flex-wrap gap-[40px] items-start justify-start p-[20px]">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-[2px] h-[2px] rounded-full will-change-transform"
                            style={{
                                backgroundColor: dotColor,
                                boxShadow: `0 0 8px ${dotColor}`,
                                animation: `pulse-dot ${3 + (i % 3)}s ease-in-out infinite`,
                                animationDelay: `${i * 0.5}s`
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Corner Bracket Overlays for Cards */}
            {isCard && (
                <>
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-600/50" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red-600/50" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-red-600/50" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-600/50" />
                </>
            )}
        </div>
    );
}
