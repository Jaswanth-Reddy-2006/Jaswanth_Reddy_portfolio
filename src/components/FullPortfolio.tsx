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
import CoreValues from './CoreValues';
import SocialTerminal from './SocialTerminal';
import PortfolioHUD from './PortfolioHUD';
import { useSettings } from '../context/SettingsContext';

export default function FullPortfolio() {
    const { scrollYProgress } = useScroll();
    const { isMinimalView } = useSettings();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Subtle background evolution logic
    const backgroundColor = useTransform(
        smoothProgress,
        [0, 0.2, 0.4, 0.6, 0.8, 1],
        isMinimalView
            ? ["#F8F6F2", "#F8F6F2", "#F8F6F2", "#F8F6F2", "#F8F6F2", "#F8F6F2"] // Static on minimal
            : ["#F8F6F2", "#F1EFE7", "#EBE9E0", "#E5E3D9", "#DFDDD2", "#D9D7CC"]
    );

    return (
        <motion.div
            style={{ backgroundColor }}
            className="min-h-screen transition-colors duration-1000 relative"
        >
            <div className="grainy-overlay" />
            <CustomCursor />
            <FloatingBackground />

            <Navbar />
            <PortfolioHUD />

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

                {/* Core Engineering Philosophies */}
                <CoreValues values={portfolioData.coreValues || []} />

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

            <footer className="py-32 px-6 border-t border-softGray bg-white/30 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-darkText mb-6 tracking-tight">
                            Currently building scalable web systems.
                        </h2>
                        <p className="text-xl text-lightText font-light mb-12 italic max-w-2xl mx-auto leading-relaxed">
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
                                <span className="text-[9px] font-mono uppercase tracking-[0.3em]">System Live Matrix</span>
                                <motion.div
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="flex items-center gap-2 text-[9px] font-mono text-mutedBlue"
                                >
                                    <span className="w-1.5 h-1.5 bg-mutedBlue rounded-full" />
                                    <span>[LOG]: {
                                        ['Optimizing kernel...', 'Cache warmed.', 'Routing verified.', 'Buffer flushed.', 'Signal status: 100%'][Math.floor((Date.now() / 3000) % 5)]
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
