import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';

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

    const { isSalaarMode } = useSettings();

    return (
        <motion.div
            className={`fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block ${isSalaarMode ? '' : 'w-6 h-6 border-2 border-mutedBlue rounded-full'}`}
            style={{
                x: springX,
                y: springY,
                translateX: '-50%',
                translateY: '-50%',
            }}
            animate={{
                scale: isClicking ? 0.8 : (isPointer ? 1.5 : 1),
                backgroundColor: isSalaarMode ? 'transparent' : (isPointer ? 'rgba(51, 102, 204, 0.1)' : 'transparent'),
                borderColor: isSalaarMode ? 'transparent' : (isPointer ? 'rgba(51, 102, 204, 0.8)' : 'rgba(51, 102, 204, 0.4)'),
            }}
        >
            {isSalaarMode ? (
                <div className="relative w-8 h-8 flex items-center justify-center">
                    <div className="absolute inset-0 border-2 border-red-600 rounded-full shadow-[0_0_10px_rgba(255,0,0,0.4)]" />
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
                </div>
            ) : (
                <motion.div
                    className="absolute inset-0 m-auto w-1 h-1 bg-mutedBlue rounded-full"
                    animate={{
                        scale: isPointer ? 0 : 1,
                    }}
                />
            )}
        </motion.div>
    );
}
