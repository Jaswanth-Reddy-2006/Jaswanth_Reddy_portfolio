import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FloatingBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 5000], [0, -500]);
    const y2 = useTransform(scrollY, [0, 5000], [0, -200]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;

            constructor(width: number, height: number) {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = Math.random() > 0.5 ? 'rgba(51, 102, 204, 0.1)' : 'rgba(16, 185, 129, 0.1)';
            }

            update(width: number, height: number) {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > width) this.x = 0;
                if (this.x < 0) this.x = width;
                if (this.y > height) this.y = 0;
                if (this.y < 0) this.y = height;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        const init = () => {
            particles = [];
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle(canvas.width, canvas.height));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                particle.update(canvas.width, canvas.height);
                particle.draw(ctx);
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Base Canvas for subtle particles */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 opacity-40"
            />

            {/* Floating Geometric Orbs */}
            <motion.div
                style={{ y: y1 }}
                className="absolute top-[10%] left-[5%] w-96 h-96 bg-mutedBlue/5 rounded-full blur-[100px]"
            />
            <motion.div
                style={{ y: y2 }}
                className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-deepEmerald/5 rounded-full blur-[120px]"
            />
            <motion.div
                style={{ y: y1 }}
                className="absolute bottom-[20%] left-[15%] w-80 h-80 bg-mutedBlue/3 rounded-full blur-[80px]"
            />

            {/* Technical Grid Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#3366cc 1px, transparent 1px), linear-gradient(90deg, #3366cc 1px, transparent 1px)`,
                    backgroundSize: '100px 100px'
                }}
            />

            {/* Ambient Data Streams */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.05]">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: -1000 }}
                        animate={{ y: 2000 }}
                        transition={{
                            duration: 15 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 2
                        }}
                        className="absolute text-[10px] font-mono text-mutedBlue whitespace-nowrap"
                        style={{ left: `${15 + i * 15}%`, writingMode: 'vertical-rl' }}
                    >
                        {Array(20).fill('01011001-RX4-SYSTEM-ACTIVE-').join(' ')}
                    </motion.div>
                ))}
            </div>

            {/* Periodic Global Scan Line */}
            <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: "200%" }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatDelay: 12,
                    ease: "easeInOut"
                }}
                className="absolute inset-x-0 h-px bg-mutedBlue/20 shadow-[0_0_15px_rgba(51,102,204,0.3)] z-50 pointer-events-none"
            />
        </div>
    );
}
