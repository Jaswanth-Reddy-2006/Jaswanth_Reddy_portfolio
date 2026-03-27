# Layouts Context

## Navbar (`src/components/Navbar.tsx`)

```tsx
import { useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { id: 'chapter-1', label: 'Start' },
    { id: 'chapter-2', label: 'Work' },
    { id: 'chapter-3', label: 'Skills' },
    { id: 'chapter-4', label: 'Education' },
    { id: 'chapter-6', label: 'Certs' },
    { id: 'chapter-5', label: 'Vision' },
];

export default function Navbar() {
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
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-700 bg-white/90 border-softGray text-darkText"
        >
            <motion.div
                className="absolute top-0 left-0 right-0 h-1 origin-left z-[60] bg-mutedBlue"
                style={{ scaleX }}
            />
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-8 h-8 bg-mutedBlue rounded-lg flex items-center justify-center text-white font-bold">J</div>
                        <div className="flex flex-col">
                            <span className="text-sm md:text-lg font-bold tracking-tight transition-colors duration-700 text-darkText">
                                The Making of an Engineer
                            </span>
                        </div>
                    </div>

                    {/* Desktop Controls */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollToChapter(link.id)}
                                className="text-sm font-medium transition-colors duration-700 text-lightText hover:text-darkText"
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
```

## PortfolioHUD (`src/components/PortfolioHUD.tsx`)

```tsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PortfolioHUD() {
    const { scrollYProgress } = useScroll();
    const scrollPercentage = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const [displayPercent, setDisplayPercent] = useState(0);

    useEffect(() => {
        return scrollPercentage.onChange(v => setDisplayPercent(Math.round(v)));
    }, [scrollPercentage]);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] pointer-events-none p-4 md:p-8 flex items-end justify-center">
            <div className="hidden lg:flex flex-col items-center gap-2 flex-1 max-w-sm px-12">
                <div className="w-full h-[2px] bg-white/5 relative overflow-hidden rounded-full">
                    <motion.div
                        style={{ width: `${displayPercent}%` }}
                        className="absolute inset-y-0 left-0 transition-colors duration-700 bg-mutedBlue shadow-[0_0_10px_rgba(51,102,204,0.5)]"
                    />
                </div>
                <div className="flex justify-center w-full text-[9px] font-mono text-lightText/40 uppercase tracking-[0.3em]">
                    <span className="font-bold text-mutedBlue">{displayPercent}% Complete</span>
                </div>
            </div>
        </div>
    );
}
```
