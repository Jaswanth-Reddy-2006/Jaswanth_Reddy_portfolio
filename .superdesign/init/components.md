# Components Context

## ScrollAnimSection (`src/components/ScrollAnimSection.tsx`)
A wrapper for sections that animates them into view as the user scrolls.

```tsx
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollAnimSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    id?: string;
}

const premiumEase = [0.22, 1, 0.36, 1] as const;

export default function ScrollAnimSection({ children, className = '', delay = 0, id }: ScrollAnimSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <motion.section
            ref={ref}
            id={id}
            initial={{ opacity: 0, y: 60, scale: 0.98, filter: 'blur(10px)' }}
            animate={isInView ? {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                transitionEnd: { filter: 'none' }
            } : {}}
            transition={{
                duration: 0.9,
                delay,
                ease: premiumEase,
            }}
            style={{ willChange: 'transform, opacity' }}
            className={className}
        >
            {children}
        </motion.section>
    );
}
```

## HighlightGroup & HighlightItem (`src/components/SmartHighlight.tsx`)
A hover-based highlighting system where non-hovered items dim.

```tsx
import { createContext, useContext, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

const HighlightContext = createContext<{
    hoveredId: string | null;
    setHoveredId: (id: string | null) => void;
}>({
    hoveredId: null,
    setHoveredId: () => { },
});

export function HighlightGroup({ children, className = "" }: { children: ReactNode, className?: string }) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    return (
        <HighlightContext.Provider value={{ hoveredId, setHoveredId }}>
            <div className={className}>{children}</div>
        </HighlightContext.Provider>
    );
}

export function HighlightItem({ id, children, className = "", onClick }: any) {
    const { hoveredId, setHoveredId } = useContext(HighlightContext);
    const isHovered = hoveredId === id;
    const isDimmed = hoveredId !== null && hoveredId !== id;

    return (
        <motion.div
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={onClick}
            animate={{
                opacity: isDimmed ? 0.5 : 1,
                scale: isDimmed ? 0.98 : (isHovered ? 1.01 : 1),
                y: isHovered ? -4 : 0,
                filter: isDimmed ? 'blur(1px)' : 'blur(0px)',
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`${className} transition-shadow duration-300 ${isHovered ? 'z-10 shadow-lg' : 'z-0'}`}
        >
            {children}
        </motion.div>
    );
}
```
