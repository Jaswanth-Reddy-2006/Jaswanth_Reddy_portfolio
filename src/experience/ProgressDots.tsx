import { motion } from 'framer-motion';

interface ProgressDotsProps {
    total: number;
    current: number;
}

export default function ProgressDots({ total, current }: ProgressDotsProps) {
    return (
        <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-4">
            {Array.from({ length: total }).map((_, index) => (
                <div key={index} className="relative">
                    {/* Background Dot */}
                    <div className="w-2 h-2 rounded-full bg-softGray" />

                    {/* Active Dot Overlay */}
                    {index === current && (
                        <motion.div
                            layoutId="active-dot"
                            className="absolute inset-0 w-2 h-2 rounded-full bg-darkText"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
