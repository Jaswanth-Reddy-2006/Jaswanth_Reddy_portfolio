import Navbar from './Navbar';
import ChapterOne from './chapters/ChapterOne';
import ChapterTwo from './chapters/ChapterTwo';
import ChapterThree from './chapters/ChapterThree';
import ChapterFour from './chapters/ChapterFour';
import ChapterFive from './chapters/ChapterFive';
import ChapterSix from './chapters/ChapterSix';
import RealWorldExperience from './RealWorldExperience';
import GlobalCinematicBackground from './GlobalCinematicBackground';
import CustomCursor from './CustomCursor';
import ScrollAnimSection from './ScrollAnimSection';
import ScrollProgressIndicator from './ScrollProgressIndicator';
import { portfolioData } from '../data/portfolio';
import { motion, AnimatePresence } from 'framer-motion';
import SocialTerminal from './SocialTerminal';
import PortfolioHUD from './PortfolioHUD';
import SalaarHUD from './salaar/SalaarHUD';
import SalaarActivation from './salaar/SalaarActivation';
import SalaarScrollScene from './salaar/SalaarScrollScene';
import { useSettings } from '../context/SettingsContext';
import { useState, useEffect } from 'react';
import InterviewMode from './InterviewMode';
import RoadmapHUD from './RoadmapHUD';

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

export default function FullPortfolio() {
    const { isSalaarMode } = useSettings();
    const [isActivating, setIsActivating] = useState(false);
    const [showSolarFlare, setShowSolarFlare] = useState(false);

    useEffect(() => {
        if (isSalaarMode) {
            setIsActivating(true);
        } else {
            setIsActivating(false);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [isSalaarMode]);

    return (
        <div className={`min-h-screen transition-colors duration-1000 relative ${isSalaarMode ? 'text-white' : 'text-darkText'}`}>
            <AnimatePresence>
                {isActivating && (
                    <SalaarActivation onComplete={() => {
                        setIsActivating(false);
                        setShowSolarFlare(true);
                        setTimeout(() => setShowSolarFlare(false), 2000);
                    }} />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showSolarFlare && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, times: [0, 0.2, 1] }}
                        className="fixed inset-0 z-[100] bg-white pointer-events-none"
                        style={{ mixBlendMode: 'overlay' }}
                    />
                )}
            </AnimatePresence>

            <div className={`grainy-overlay ${isSalaarMode ? 'opacity-[0.03]' : ''}`} />
            <CustomCursor />
            <GlobalCinematicBackground />

            <Navbar />
            <PortfolioHUD />
            <SalaarHUD />
            <ScrollProgressIndicator />
            <RoadmapHUD />

            <main className="relative z-10 max-w-6xl mx-auto px-6 py-20 space-y-40">
                {/* Chapter 1: Introduction — hero parallax handled inside */}
                <section id="chapter-1">
                    <ChapterOne
                        name={portfolioData.name}
                        tagline={portfolioData.tagline}
                        introduction={portfolioData.introduction}
                    />
                </section>

                {/* Chapter 2: Work & Case Studies */}
                <ScrollAnimSection id="chapter-2" delay={0.05}>
                    <ChapterTwo projects={portfolioData.projects} />
                </ScrollAnimSection>

                {/* Salaar: Cinematic 300vh scroll scene between Ch2 and Ch3 */}
                {isSalaarMode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="!my-0 -mx-6"
                    >
                        <SalaarScrollScene />
                    </motion.div>
                )}

                {/* Real World Experience */}
                <ScrollAnimSection id="chapter-experience" delay={0.05}>
                    <RealWorldExperience experience={portfolioData.experience} />
                </ScrollAnimSection>

                {/* Chapter 3: Skills & Intelligence */}
                <ScrollAnimSection id="chapter-3" delay={0.05}>
                    <ChapterThree skills={portfolioData.skills} />
                </ScrollAnimSection>

                {/* Chapter 4: Education */}
                <ScrollAnimSection id="chapter-4" delay={0.05}>
                    <ChapterFour education={portfolioData.education} />
                </ScrollAnimSection>

                {/* Chapter 6: Certifications */}
                <ScrollAnimSection id="chapter-6" delay={0.05}>
                    <ChapterSix certifications={portfolioData.certifications} />
                </ScrollAnimSection>

                {/* Social Profiles & External Uplink */}
                <SocialTerminal socials={portfolioData.socials} />

                {/* Chapter 5: The Vision */}
                <ScrollAnimSection id="chapter-5" delay={0.05}>
                    <ChapterFive vision={portfolioData.vision} />
                </ScrollAnimSection>

                {/* AI Interview Mode */}
                <ScrollAnimSection delay={0.05}>
                    <InterviewMode />
                </ScrollAnimSection>
            </main>

            {/* ── FOOTER ── */}
            <footer className={`py-32 px-6 border-t transition-all duration-1000 ${isSalaarMode
                ? 'bg-black/60 border-red-900/20'
                : 'bg-white/30 border-softGray'
                } backdrop-blur-sm relative overflow-hidden`}>

                {/* White mode: diagonal light beam on scroll-into-view */}
                {!isSalaarMode && (
                    <motion.div
                        initial={{ x: '-120%', opacity: 0 }}
                        whileInView={{ x: '200%', opacity: [0, 0.4, 0] }}
                        viewport={{ once: true }}
                        transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.3 }}
                        className="absolute top-0 bottom-0 w-[80px] pointer-events-none"
                        style={{
                            background: 'linear-gradient(to right, transparent, rgba(107,140,186,0.12), transparent)',
                            transform: 'skewX(-25deg)',
                        }}
                    />
                )}

                {/* Salaar: ambient red beam */}
                {isSalaarMode && (
                    <motion.div
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear', delay: 1 }}
                        className="absolute top-0 bottom-0 w-[40px] pointer-events-none opacity-10"
                        style={{
                            background: 'linear-gradient(to right, transparent, rgba(220,38,38,0.8), transparent)',
                        }}
                    />
                )}

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 60, scale: 0.98, filter: 'blur(10px)' }}
                        whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: PREMIUM_EASE }}
                    >
                        <h2 className="text-2xl md:text-4xl font-bold text-darkText mb-6 tracking-tight px-4">
                            Currently building scalable web systems.
                        </h2>
                        <p className="text-base md:text-xl text-lightText font-light mb-12 italic max-w-2xl mx-auto leading-relaxed px-6">
                            Open to internships and backend/full-stack roles.
                        </p>
                        <div className="flex flex-col items-center gap-6">
                            <div className="flex flex-wrap justify-center gap-8">
                                {/* Social icons with elastic spring */}
                                {[
                                    { href: 'mailto:jaswanthre9@gmail.com', label: 'jaswanthre9@gmail.com' },
                                    { href: 'https://www.linkedin.com/in/jasreaug/', label: 'LinkedIn' },
                                ].map((link, i) => (
                                    <motion.a
                                        key={link.label}
                                        href={link.href}
                                        target={link.href.startsWith('http') ? '_blank' : undefined}
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 300,
                                            damping: 20,
                                            delay: 0.2 + i * 0.1,
                                        }}
                                        className="text-lightText hover:text-mutedBlue transition-colors flex items-center gap-2"
                                    >
                                        <span className="font-mono text-sm">{link.label}</span>
                                    </motion.a>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.4 }}
                                    className="text-lightText flex items-center gap-2"
                                >
                                    <span className="font-mono text-sm">+91 8008154808</span>
                                </motion.div>
                            </div>

                            {/* Breathing CTA button */}
                            <motion.div
                                animate={{ scale: [1, 1.02, 1] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                className="text-sm font-bold text-mutedBlue uppercase tracking-widest bg-mutedBlue/5 px-4 py-2 rounded-full border border-mutedBlue/10"
                            >
                                Available for Internship
                            </motion.div>

                            <div className="flex flex-col items-center gap-2 mt-8 opacity-40">
                                <span className="text-[9px] font-mono uppercase tracking-[0.3em]">
                                    {isSalaarMode ? 'SALAAR SIGNAL MATRIX' : 'System Live Matrix'}
                                </span>
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
        </div>
    );
}
