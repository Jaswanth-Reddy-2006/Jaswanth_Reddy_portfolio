import Navbar from './Navbar';
import ChapterOne from './chapters/ChapterOne';
import ChapterTwo from './chapters/ChapterTwo';
import ChapterThree from './chapters/ChapterThree';
import ChapterFour from './chapters/ChapterFour';
import ChapterFive from './chapters/ChapterFive';
import BuildLog from './BuildLog';
import RealWorldExperience from './RealWorldExperience';
import { portfolioData } from '../data/portfolio';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';

export default function FullPortfolio() {
    const { scrollYProgress } = useScroll();
    const { isMinimalView } = useSettings();

    // Subtle background evolution logic
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.2, 0.4, 0.6, 0.8, 1],
        isMinimalView
            ? ["#F8F6F2", "#F8F6F2", "#F8F6F2", "#F8F6F2", "#F8F6F2", "#F8F6F2"] // Static on minimal
            : ["#F8F6F2", "#F1EFE7", "#EBE9E0", "#E5E3D9", "#DFDDD2", "#D9D7CC"]
    );

    return (
        <motion.div
            style={{ backgroundColor }}
            className="min-h-screen transition-colors duration-1000"
        >
            <Navbar />

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
                            Engineering with Purpose. Building for Impact.
                        </h2>
                        <p className="text-xl text-lightText font-light mb-12 italic max-w-2xl mx-auto leading-relaxed">
                            "The best way to predict the future is to build it. I'm currently looking for opportunities to contribute to systems that matter."
                        </p>
                        <div className="flex flex-col items-center gap-4">
                            <div className="text-sm font-bold text-mutedBlue uppercase tracking-widest bg-mutedBlue/5 px-4 py-2 rounded-full border border-mutedBlue/10">
                                Available for Internship 2026
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
