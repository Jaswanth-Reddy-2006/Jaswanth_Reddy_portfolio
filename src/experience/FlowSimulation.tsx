import { motion } from 'framer-motion';

export default function FlowSimulation() {
    const nodes = ['User', 'Frontend', 'API', 'DB'];

    return (
        <div className="w-full max-w-3xl mx-auto my-12 p-8 bg-white/50 backdrop-blur-sm rounded-xl border border-softGray/50 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between relative">
                {/* Connection Line */}
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-softGray -z-10" />

                {/* Animated Data Packet */}
                <motion.div
                    className="absolute top-1/2 left-0 w-3 h-3 bg-mutedBlue rounded-full -mt-1.5 z-0 shadow-[0_0_10px_rgba(74,124,158,0.5)]"
                    initial={{ x: '0%', opacity: 0 }}
                    animate={{
                        x: ['0%', '100%'],
                        opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                        duration: 2,
                        ease: "linear",
                        times: [0, 1],
                        repeat: Infinity,
                        repeatDelay: 1
                    }}
                />

                {/* Nodes */}
                {nodes.map((node, index) => (
                    <motion.div
                        key={node}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="flex flex-col items-center gap-3 bg-white p-3 rounded-lg border border-softGray relative z-10"
                    >
                        <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-darkText' : index === 3 ? 'bg-deepEmerald' : 'bg-softGray'}`} />
                        <span className="text-xs font-mono uppercase tracking-wider text-lightText">{node}</span>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.5 }}
                className="text-center mt-8 text-xs text-mutedBlue font-mono"
            >
                Status: 200 OK • Latency: 45ms
            </motion.div>
        </div>
    );
}
