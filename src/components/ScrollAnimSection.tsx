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
                transitionEnd: { filter: 'none' } // Remove filter after reveal for performance
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
