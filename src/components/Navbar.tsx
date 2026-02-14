import { motion } from 'framer-motion';
import { Menu, X, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useSettings } from '../context/SettingsContext';

const navLinks = [
    { id: 'chapter-1', label: 'Intro' },
    { id: 'chapter-2', label: 'Work' },
    { id: 'chapter-3', label: 'Skills' },
    { id: 'chapter-4', label: 'Certs' },
    { id: 'chapter-5', label: 'Vision' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { isMinimalView, toggleMinimalView } = useSettings();

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
            className="fixed top-0 left-0 right-0 z-50 bg-warmWhite/90 backdrop-blur-md border-b border-softGray transition-all duration-300"
        >
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg font-bold text-darkText tracking-tight block"
                        >
                            The Making of an Engineer
                        </motion.div>
                    </div>

                    {/* Desktop Controls */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollToChapter(link.id)}
                                className="text-sm font-medium text-lightText hover:text-darkText transition-colors"
                            >
                                {link.label}
                            </button>
                        ))}

                        <button
                            onClick={toggleMinimalView}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${isMinimalView
                                ? 'bg-mutedBlue text-white'
                                : 'bg-softGray/50 text-lightText hover:bg-softGray'
                                }`}
                            title={isMinimalView ? "Disable Minimal View" : "Enable Minimal View"}
                        >
                            {isMinimalView ? <EyeOff size={14} /> : <Eye size={14} />}
                            {isMinimalView ? "Minimal On" : "Minimal Off"}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4 md:hidden">
                        <button
                            onClick={toggleMinimalView}
                            className={`p-2 rounded-full transition-all ${isMinimalView ? 'text-mutedBlue' : 'text-lightText'}`}
                        >
                            {isMinimalView ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-darkText"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden mt-4 pb-4 space-y-3 border-t border-softGray pt-4"
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
            </div>
        </motion.nav>
    );
}
