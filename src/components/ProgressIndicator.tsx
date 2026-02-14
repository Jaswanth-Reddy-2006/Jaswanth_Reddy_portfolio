import { motion, useScroll, useSpring } from 'framer-motion';

export default function ProgressIndicator() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-[73px] left-0 right-0 h-1 bg-softGray z-40"
            style={{ scaleX, transformOrigin: '0%' }}
        >
            <motion.div
                className="h-full bg-gradient-to-r from-mutedBlue to-deepEmerald"
                style={{ scaleX }}
            />
        </motion.div>
    );
}
