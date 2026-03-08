import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import StoryPerson from '../experience/StoryPerson';

const sections = [
    { id: 'chapter-1', label: 'Intro' },
    { id: 'chapter-2', label: 'Work' },
    { id: 'chapter-experience', label: 'Experience' },
    { id: 'chapter-3', label: 'Skills' },
    { id: 'chapter-4', label: 'Education' },
    { id: 'chapter-6', label: 'Certifications' },
    { id: 'chapter-5', label: 'Vision' },
];

export default function RoadmapHUD() {
    const [activeSection, setActiveSection] = useState('chapter-1');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5 }
        );

        sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="fixed left-8 top-1/2 -translate-y-1/2 z-[60] pointer-events-none hidden lg:flex flex-col items-center gap-8">
            {/* The Boy Character */}
            <div className="w-32 h-48 pointer-events-auto">
                <Canvas camera={{ position: [0, 1, 5], fov: 35 }}>
                    <Environment preset="night" />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <StoryPerson position={[0, -1, 0]} rotationY={Math.PI / 6} />
                    </Float>
                </Canvas>
            </div>

            {/* Vertical Roadmap */}
            <div className="flex flex-col gap-4 pointer-events-auto bg-black/20 backdrop-blur-md p-4 rounded-full border border-white/5">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="group relative flex items-center justify-center w-4 h-4"
                    >
                        <div className={`w-2 h-2 rounded-full transition-all duration-500 ${activeSection === section.id
                                ? 'bg-[#00ffcc] scale-150 shadow-[0_0_10px_#00ffcc]'
                                : 'bg-white/20 group-hover:bg-white/50'
                            }`} />

                        <AnimatePresence>
                            {activeSection === section.id && (
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 20 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="absolute left-full ml-4 text-[10px] font-mono text-[#00ffcc] uppercase tracking-widest whitespace-nowrap"
                                >
                                    {section.label}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                ))}
            </div>
        </div>
    );
}
