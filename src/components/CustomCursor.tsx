import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
    const [isPointer, setIsPointer] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            const target = e.target as HTMLElement;
            const isClickable =
                window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName === 'A' ||
                target.tagName === 'BUTTON';
            setIsPointer(isClickable);
        };

        const mouseDown = () => setIsClicking(true);
        const mouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', mouseDown);
        window.addEventListener('mouseup', mouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', mouseDown);
            window.removeEventListener('mouseup', mouseUp);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-6 h-6 border-2 border-mutedBlue rounded-full pointer-events-none z-[9999] hidden md:block"
            style={{
                x: springX,
                y: springY,
                translateX: '-50%',
                translateY: '-50%',
            }}
            animate={{
                scale: isClicking ? 0.8 : (isPointer ? 1.5 : 1),
                backgroundColor: isPointer ? 'rgba(51, 102, 204, 0.1)' : 'transparent',
                borderColor: isPointer ? 'rgba(51, 102, 204, 0.8)' : 'rgba(51, 102, 204, 0.4)',
            }}
        >
            <motion.div
                className="absolute inset-0 m-auto w-1 h-1 bg-mutedBlue rounded-full"
                animate={{
                    scale: isPointer ? 0 : 1,
                }}
            />
        </motion.div>
    );
}
