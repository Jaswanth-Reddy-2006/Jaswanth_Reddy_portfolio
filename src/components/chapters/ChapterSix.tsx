import { motion, AnimatePresence } from 'framer-motion';
import { Award, Eye, X } from 'lucide-react';
import type { Certification } from '../../data/portfolio';
import { useSettings } from '../../context/SettingsContext';
import { useState } from 'react';
import BattleGrid from '../salaar/BattleGrid';

interface ChapterSixProps {
    certifications: Certification[];
}

export default function ChapterSix({ certifications }: ChapterSixProps) {
    const { isSalaarMode } = useSettings();
    const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

    return (
        <section id="chapter-6" className="py-20 px-6 max-w-7xl mx-auto relative overflow-hidden">
            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className={`inline-flex items-center gap-2 px-3 py-1 border rounded-full text-[10px] font-mono font-bold uppercase tracking-widest mb-6 ${isSalaarMode ? 'bg-red-900/20 border-red-600 text-red-500' : 'bg-mutedBlue/10 border-mutedBlue/20 text-mutedBlue'
                        }`}>
                        <Award size={12} />
                        {isSalaarMode ? 'KHANSAAR_CREDENTIALS_SECURED' : 'Professional Path'}
                    </div>
                    <h2 className={`text-2xl md:text-5xl font-bold tracking-tight mb-4 transition-colors duration-700 ${isSalaarMode ? 'text-white font-mono uppercase tracking-[0.2em]' : 'text-darkText'
                        }`}>
                        Professional <span className={isSalaarMode ? 'text-red-700' : 'text-mutedBlue italic serif'}>{isSalaarMode ? 'CREDENTIALS' : 'Certifications'}</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.85, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className={`p-6 md:p-8 border transition-all duration-700 group relative overflow-hidden ${isSalaarMode
                                ? 'bg-black/80 border-red-950/30 rounded-none hover:border-red-600/60 hover:shadow-[0_0_25px_rgba(220,38,38,0.12)]'
                                : 'bg-white/50 border-softGray rounded-2xl hover:border-mutedBlue/20 hover:shadow-lg'
                                }`}
                        >
                            {/* Salaar cinematic light sweep on enter */}
                            {isSalaarMode && (
                                <motion.div
                                    initial={{ x: '-120%', opacity: 0 }}
                                    whileInView={{ x: '300%', opacity: [0, 0.5, 0] }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.9, delay: index * 0.1 + 0.35, ease: 'easeInOut' }}
                                    className="absolute top-0 bottom-0 w-[50px] pointer-events-none z-20"
                                    style={{ background: 'linear-gradient(to right, transparent, rgba(220,38,38,0.25), transparent)', transform: 'skewX(-20deg)' }}
                                />
                            )}
                            {isSalaarMode && <BattleGrid isCard opacity={0.6} intensity="low" />}
                            <div className="flex justify-between items-start gap-4 relative z-10">
                                <div>
                                    <h3 className={`text-lg md:text-xl font-bold mb-2 transition-colors duration-500 ${isSalaarMode ? 'text-white group-hover:text-red-500' : 'text-darkText'
                                        }`}>
                                        {cert.title}
                                    </h3>
                                    <p className={`text-sm mb-4 ${isSalaarMode ? 'text-white/40' : 'text-lightText'}`}>
                                        {cert.organization} • {cert.year}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setSelectedCert(cert)}
                                            className={`flex items-center gap-2 text-xs uppercase tracking-widest font-bold py-2 px-4 border transition-all duration-300 ${isSalaarMode
                                                ? 'bg-red-900/20 border-red-600/30 text-red-500 hover:bg-red-600 hover:text-white rounded-none'
                                                : 'bg-mutedBlue/5 border-mutedBlue/10 text-mutedBlue hover:bg-mutedBlue hover:text-white rounded-lg'
                                                }`}
                                        >
                                            <Eye size={12} /> Preview
                                        </button>
                                    </div>
                                </div>
                                <Award className={`transition-colors duration-500 ${isSalaarMode ? 'text-red-900 group-hover:text-red-600' : 'text-softGray group-hover:text-mutedBlue'
                                    }`} size={32} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedCert && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedCert(null)}
                                className="absolute inset-0 bg-black/60 backdrop-blur-xl"
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                className={`relative w-full max-w-5xl aspect-[4/3] md:aspect-video bg-white overflow-hidden shadow-2xl border ${isSalaarMode ? 'border-red-600 rounded-none' : 'border-softGray rounded-3xl'
                                    }`}
                            >
                                <button
                                    onClick={() => setSelectedCert(null)}
                                    className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all ${isSalaarMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-black/5 text-darkText hover:bg-black/10'
                                        }`}
                                >
                                    <X size={20} />
                                </button>
                                <div className="w-full h-full flex items-center justify-center bg-[#f5f5f5] relative group">
                                    <Award size={100} className="text-mutedBlue/20 absolute" />
                                    <div className="z-10 text-center px-10">
                                        <h2 className="text-3xl md:text-5xl font-bold text-darkText mb-4">{selectedCert.title}</h2>
                                        <p className="text-xl md:text-2xl text-mutedBlue font-serif italic mb-8">{selectedCert.organization}</p>
                                        <div className="h-px w-32 bg-softGray mx-auto mb-8" />
                                        <p className="text-sm md:text-base text-lightText uppercase tracking-[0.3em]">Validation Successful</p>
                                        <p className="text-[10px] md:text-xs text-lightText/60 mt-4 font-mono">CREDENTIAL_ID: {selectedCert.id?.toUpperCase()}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
