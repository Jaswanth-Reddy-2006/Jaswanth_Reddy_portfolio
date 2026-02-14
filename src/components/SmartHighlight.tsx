import { createContext, useContext, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';

// Context
const HighlightContext = createContext<{
    hoveredId: string | null;
    setHoveredId: (id: string | null) => void;
}>({
    hoveredId: null,
    setHoveredId: () => { },
});

// Provider Component (The Group)
export function HighlightGroup({ children, className = "" }: { children: ReactNode, className?: string }) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <HighlightContext.Provider value={{ hoveredId, setHoveredId }}>
            <div className={className}>
                {children}
            </div>
        </HighlightContext.Provider>
    );
}

// Item Component
export function HighlightItem({
    id,
    children,
    className = "",
    onClick
}: {
    id: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}) {
    const { hoveredId, setHoveredId } = useContext(HighlightContext);
    const { isMinimalView } = useSettings();

    const isHovered = hoveredId === id;
    const isDimmed = !isMinimalView && hoveredId !== null && hoveredId !== id;
    const shouldAnimate = !isMinimalView;

    return (
        <motion.div
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={onClick}
            animate={{
                opacity: isDimmed ? 0.5 : 1,
                scale: shouldAnimate ? (isDimmed ? 0.98 : (isHovered ? 1.01 : 1)) : 1,
                y: shouldAnimate ? (isHovered ? -4 : 0) : 0,
                filter: shouldAnimate ? (isDimmed ? 'blur(1px)' : 'blur(0px)') : 'none',
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`${className} transition-shadow duration-300 ${isHovered ? 'z-10 shadow-lg' : 'z-0'}`}
        >
            {children}
        </motion.div>
    );
}
