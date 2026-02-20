import Navbar from './Navbar';
import ChapterOne from './chapters/ChapterOne';
import ChapterTwo from './chapters/ChapterTwo';
import ChapterThree from './chapters/ChapterThree';
import ChapterFour from './chapters/ChapterFour';
import ChapterFive from './chapters/ChapterFive';
import BuildLog from './BuildLog';
import RealWorldExperience from './RealWorldExperience';
import FloatingBackground from './FloatingBackground';
import CustomCursor from './CustomCursor';
import { portfolioData } from '../data/portfolio';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import SocialTerminal from './SocialTerminal';
import PortfolioHUD from './PortfolioHUD';
import SalaarBackground from './SalaarBackground';
import SalaarHUD from './salaar/SalaarHUD';
import SalaarActivation from './salaar/SalaarActivation';
import { useSettings } from '../context/SettingsContext';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function FullPortfolio() {
    const { isSalaarMode } = useSettings();
    const [isActivating, setIsActivating] = useState(false);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        if (isSalaarMode) {
            setIsActivating(true);
        } else {
            setIsActivating(false);
        }
    }, [isSalaarMode]);

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const backgroundColor = useTransform(
        smoothProgress,
        [0, 0.2, 0.4, 0.6, 0.8, 1],
        isSalaarMode
            ? ["#0a0000", "#1a0000", "#2b0000", "#3c0000", "#4d0000", "#5e0000"]
            : ["#F8F6F2", "#F1EFE7", "#EBE9E0", "#E5E3D9", "#DFDDD2", "#D9D7CC"]
    );

    return (
        <motion.div
            style={{ backgroundColor }}
            className={`min-h-screen transition-colors duration-1000 relative ${isSalaarMode ? 'text-white' : 'text-darkText'}`}
        >
            <AnimatePresence>
                {isActivating && (
                    <SalaarActivation onComplete={() => setIsActivating(false)} />
                )}
            </AnimatePresence>

            <div className={`grainy-overlay ${isSalaarMode ? 'opacity-[0.03]' : ''}`} />
            <CustomCursor />

            <AnimatePresence mode="wait">
                {isSalaarMode ? (
                    <motion.div
                        key="salaar-bg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <SalaarBackground />
                    </motion.div>
                ) : (
                    <motion.div
                        key="zen-bg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <FloatingBackground />
                    </motion.div>
                )}
            </AnimatePresence>

            <Navbar />
            <PortfolioHUD />
            <SalaarHUD />

            <main className="max-w-6xl mx-auto px-6 py-20 space-y-40">
                {/* Chapter 1: Introduction */}
                <motion.section
                    id="chapter-1"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut"
                    }}
                >
                    <ChapterOne
                        name={portfolioData.name}
                        tagline={portfolioData.tagline}
                        introduction={portfolioData.introduction}
                    />
                </motion.section>

                {/* Chapter 2: Work & Case Studies */}
                <motion.section
                    id="chapter-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <ChapterTwo projects={portfolioData.projects} />
                </motion.section>

                {/* Real World Experience */}
                <motion.section
                    id="chapter-experience"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <RealWorldExperience experience={portfolioData.experience} />
                </motion.section>

                {/* Chapter 3: Skills & Intelligence */}
                <motion.section
                    id="chapter-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <ChapterThree skills={portfolioData.skills} />
                </motion.section>

                {/* Chapter 4: Certifications */}
                <motion.section
                    id="chapter-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <ChapterFour certifications={portfolioData.certifications} />
                </motion.section>

                {/* Social Profiles & External Uplink */}
                <SocialTerminal socials={portfolioData.socials} />

                {/* Chapter 5: The Vision */}
                <motion.section
                    id="chapter-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <ChapterFive vision={portfolioData.vision} />
                </motion.section>

                {/* Build Log */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <BuildLog items={portfolioData.buildLog} />
                </motion.section>
            </main>

            <footer className={`py-32 px-6 border-t transition-all duration-1000 ${isSalaarMode
                ? 'bg-black/60 border-red-900/20'
                : 'bg-white/30 border-softGray'
                } backdrop-blur-sm`}>
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-2xl md:text-4xl font-bold text-darkText mb-6 tracking-tight px-4">
                            Currently building scalable web systems.
                        </h2>
                        <p className="text-base md:text-xl text-lightText font-light mb-12 italic max-w-2xl mx-auto leading-relaxed px-6">
                            Open to internships and backend/full-stack roles.
                        </p>
                        <div className="flex flex-col items-center gap-6">
                            <div className="flex flex-wrap justify-center gap-8">
                                <a href="mailto:jaswanthre9@gmail.com" className="text-lightText hover:text-mutedBlue transition-colors flex items-center gap-2">
                                    <span className="font-mono text-sm">jaswanthre9@gmail.com</span>
                                </a>
                                <a href="https://www.linkedin.com/in/jasreaug/" target="_blank" rel="noopener noreferrer" className="text-lightText hover:text-mutedBlue transition-colors flex items-center gap-2">
                                    <span className="font-mono text-sm">LinkedIn</span>
                                </a>
                                <div className="text-lightText flex items-center gap-2">
                                    <span className="font-mono text-sm">+91 8008154808</span>
                                </div>
                            </div>
                            <div className="text-sm font-bold text-mutedBlue uppercase tracking-widest bg-mutedBlue/5 px-4 py-2 rounded-full border border-mutedBlue/10">
                                Available for Internship 2026
                            </div>
                            <div className="flex flex-col items-center gap-2 mt-8 opacity-40">
                                <span className="text-[9px] font-mono uppercase tracking-[0.3em]">{isSalaarMode ? 'SALAAR SIGNAL MATRIX' : 'System Live Matrix'}</span>
                                <motion.div
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className={`flex items-center gap-2 text-[9px] font-mono ${isSalaarMode ? 'text-red-600' : 'text-mutedBlue'}`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full ${isSalaarMode ? 'bg-red-600' : 'bg-mutedBlue'}`} />
                                    <span>[LOG]: {
                                        isSalaarMode
                                            ? ['Sharpening blades...', 'Ammo checked.', 'Target locked.', 'Ceasefire broken.', 'Blood status: 100%'][Math.floor((Date.now() / 3000) % 5)]
                                            : ['Optimizing kernel...', 'Cache warmed.', 'Routing verified.', 'Buffer flushed.', 'Signal status: 100%'][Math.floor((Date.now() / 3000) % 5)]
                                    }</span>
                                </motion.div>
                            </div>

                            <div className="text-xs text-lightText font-mono mt-8 opacity-50">
                                &copy; {new Date().getFullYear()} • Crafted with TypeScript & Intent
                            </div>
                        </div>
                    </motion.div>
                </div>
            </footer>
        </motion.div>
    );
}
