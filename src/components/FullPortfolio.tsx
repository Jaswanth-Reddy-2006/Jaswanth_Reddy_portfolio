
import ChapterOne from './chapters/ChapterOne';
import ChapterTwo from './chapters/ChapterTwo';
import ChapterThree from './chapters/ChapterThree';
import ChapterFour from './chapters/ChapterFour';
import ChapterFive from './chapters/ChapterFive';
import ChapterSix from './chapters/ChapterSix';
import RealWorldExperience from './RealWorldExperience';
import StoryMapEngine from './StoryScrollEngine';
import CustomCursor from './CustomCursor';
import { portfolioData } from '../data/portfolio';
import { motion, AnimatePresence } from 'framer-motion';
import SocialTerminal from './SocialTerminal';
import { useEffect } from 'react';

import { useMapNavigation } from '../context/MapContext';
import MapOverlay from './MapOverlay';
import { Navigation, ArrowRight } from 'lucide-react';
import { MAP_NODES } from '../experience/IntroConstants';
import ForceFieldBackground from './ForceFieldBackground';
function ChapterFooter() {
    const { isMapOpen, setIsMapOpen, activeNodeId, setAnimatingToNodeId, animatingToNodeId } = useMapNavigation();
    const currentIndex = MAP_NODES.findIndex(n => n.id === activeNodeId);
    const hasNext = currentIndex < MAP_NODES.length - 1;

    const handleNext = () => {
        if (animatingToNodeId) return;
        const nextId = MAP_NODES[currentIndex + 1].id;
        setIsMapOpen(true);
        setTimeout(() => setAnimatingToNodeId(nextId), 300);
    };

    return (
        <div className="fixed bottom-12 right-12 z-[60] flex flex-col items-center gap-6 pointer-events-none">
            <div className="flex flex-col items-center gap-4 pointer-events-auto">
                {hasNext && (
                    <button 
                        onClick={handleNext}
                        className="group flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white hover:bg-blue-500 hover:scale-110 transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] border border-blue-400/20"
                        title="Analyze Next Module"
                    >
                        <ArrowRight size={24} />
                    </button>
                )}
                
                {!isMapOpen && (
                    <button 
                        onClick={() => setIsMapOpen(true)}
                        className="flex items-center justify-center w-14 h-14 rounded-full bg-slate-900/80 backdrop-blur-xl border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 hover:scale-110 transition-all shadow-xl"
                        title="Open System Map"
                    >
                        <Navigation size={20} />
                    </button>
                )}
            </div>
            {!isMapOpen && (
                <div className="text-[9px] font-mono tracking-[0.3em] uppercase opacity-20 transform rotate-90 origin-right translate-x-12 translate-y-8">
                    Segment /// {activeNodeId}
                </div>
            )}
        </div>
    );
}

import { useParams, useNavigate } from 'react-router-dom';

function PortfolioContent() {
    const { chapterId } = useParams();
    const navigate = useNavigate();
    const { isMapOpen, activeNodeId, setActiveNodeId } = useMapNavigation();

    // Sync URL with context - Ensure param is prioritized
    useEffect(() => {
        if (chapterId && chapterId !== activeNodeId) {
            setActiveNodeId(chapterId);
        }
    }, [chapterId, setActiveNodeId]);

    // Prevent body scroll when map is open
    useEffect(() => {
        if (isMapOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
        return () => { document.body.style.overflow = 'auto'; }
    }, [isMapOpen]);

    // Handle map closing navigation
    useEffect(() => {
        if (!isMapOpen && activeNodeId) {
            navigate(`/${activeNodeId}`, { replace: true });
        }
    }, [isMapOpen, activeNodeId, navigate]);

    return (
        <div className="h-screen w-full transition-colors duration-1000 relative text-darkText bg-[#08080a] overflow-hidden">
            <div className="grainy-overlay z-0 pointer-events-none" />
            
            {/* Global High-Tech Background */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <ForceFieldBackground 
                    hue={210}
                    spacing={12}
                    forceStrength={10}
                    magnifierRadius={150}
                />
            </div>
            <CustomCursor />
            <StoryMapEngine activeNodeId={activeNodeId} />

            <MapOverlay />

            {/* Active Content Window */}
            <main className="relative z-10 w-full h-full overflow-y-auto hide-scrollbar flex flex-col items-center">
                <div className="w-full max-w-6xl px-6 pt-16 pb-20 flex flex-col items-center min-h-full">
                    <AnimatePresence mode="wait">
                        {!isMapOpen && (
                            <motion.div 
                                key={activeNodeId} 
                                initial={{ opacity: 0, y: 20 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                exit={{ opacity: 0, y: -20 }} 
                                transition={{ duration: 0.5 }}
                                className="w-full"
                            >
                                {activeNodeId === 'chapter-1' && <ChapterOne name={portfolioData.name} tagline={portfolioData.tagline} introduction={portfolioData.introduction} />}
                                {activeNodeId === 'chapter-2' && <ChapterTwo projects={portfolioData.projects} />}
                                {activeNodeId === 'chapter-experience' && <RealWorldExperience experience={portfolioData.experience} />}
                                {activeNodeId === 'chapter-3' && <ChapterThree skills={portfolioData.skills} />}
                                {activeNodeId === 'chapter-4' && <ChapterFour education={portfolioData.education} />}
                                {activeNodeId === 'chapter-6' && <ChapterSix certifications={portfolioData.certifications} />}
                                {activeNodeId === 'chapter-5' && <ChapterFive vision={portfolioData.vision} />}
                                {activeNodeId === 'socials' && <SocialTerminal socials={portfolioData.socials} />}
                                <ChapterFooter />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}

export default function FullPortfolio() {
    return (
        <PortfolioContent />
    );
}

