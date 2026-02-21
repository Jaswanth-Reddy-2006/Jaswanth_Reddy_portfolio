import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Sun, Crosshair, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import SolarLogo from './salaar/SolarLogo';

const navLinks = [
    { id: 'chapter-1', label: 'Start' },
    { id: 'chapter-2', label: 'Work' },
    { id: 'chapter-3', label: 'Skills' },
    { id: 'chapter-4', label: 'Education' },
    { id: 'chapter-6', label: 'Certs' },
    { id: 'chapter-5', label: 'Vision' },
];

export default function Navbar() {
    const { isSalaarMode, toggleSalaarMode } = useSettings();
    const [isOpen, setIsOpen] = useState(false);
    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const scrollToChapter = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-700 ${isSalaarMode
                ? 'bg-black/95 border-red-900/40 text-white'
                : 'bg-warmWhite/90 border-softGray text-darkText'
                }`}
        >
            <motion.div
                className={`absolute top-0 left-0 right-0 h-1 origin-left z-[60] ${isSalaarMode ? 'bg-red-600' : 'bg-mutedBlue'}`}
                style={{ scaleX }}
            />
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        {isSalaarMode ? (
                            <SolarLogo size={32} />
                        ) : (
                            <div className="w-8 h-8 bg-mutedBlue rounded-lg flex items-center justify-center text-white font-bold">J</div>
                        )}
                        <div className="flex flex-col">
                            <span className={`text-sm md:text-lg font-bold tracking-tight transition-colors duration-700 ${isSalaarMode ? 'text-white font-mono uppercase tracking-[0.2em]' : 'text-darkText'}`}>
                                {isSalaarMode ? 'KHANSAR KA SALAAR' : 'The Making of an Engineer'}
                            </span>
                        </div>
                    </div>

                    {/* Theme Toggle Button (Centered) */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleSalaarMode}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-700 shadow-lg ${isSalaarMode
                            ? 'bg-red-700 text-white shadow-red-900/40 border border-red-500/50'
                            : 'bg-darkText text-white shadow-darkText/10'
                            }`}
                    >
                        {isSalaarMode ? (
                            <>
                                <Sun size={14} className="animate-pulse" />
                                <span>Zen Mode</span>
                            </>
                        ) : (
                            <>
                                <Crosshair size={14} className="animate-pulse" />
                                <span>Salaar Mode</span>
                            </>
                        )}
                    </motion.button>
                    {/* Desktop Controls */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollToChapter(link.id)}
                                className={`text-sm font-medium transition-colors duration-700 ${isSalaarMode ? 'text-white/60 hover:text-white' : 'text-lightText hover:text-darkText'
                                    }`}
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4 md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-darkText"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden mt-4 pb-4 space-y-3 border-t border-softGray pt-4 overflow-hidden"
                        >
                            {navLinks.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollToChapter(link.id)}
                                    className="block w-full text-left px-4 py-2 text-sm font-medium text-lightText hover:text-darkText hover:bg-softGray rounded-lg transition-colors"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}
