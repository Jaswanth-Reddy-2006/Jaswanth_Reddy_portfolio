import { motion } from 'framer-motion';
import { Award, ExternalLink, Shield } from 'lucide-react';
import type { Certification } from '../../data/portfolio';
import { HighlightGroup, HighlightItem } from '../SmartHighlight';
import { useSettings } from '../../context/SettingsContext';
import AudioIcon from '../AudioIcon';
import BattleGrid from '../salaar/BattleGrid';
import ChapterBackground from '../ChapterBackground';

interface ChapterFourProps {
    education: Certification[];
}

export default function ChapterFour({ education }: ChapterFourProps) {
    const { isSalaarMode } = useSettings();

    return (
        <section id="chapter-4" className={`min-h-screen px-6 py-20 transition-all duration-1000 relative overflow-hidden ${isSalaarMode
            ? 'bg-black'
            : 'bg-gradient-to-b from-warmWhite to-softGray'
            }`}>
            <ChapterBackground chapter={4} />
            {isSalaarMode && <BattleGrid opacity={0.3} />}
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 md:mb-16 relative z-10"
                >
                    <div className="flex justify-center mb-6">
                        <AudioIcon
                            text="Review my academic foundation. These validate the technical training and engineering principles I've mastered."
                            salaarText="KHANSAAR_FOUNDATION: Accessing certified warfare protocols and structural framework records."
                        />
                    </div>
                    <h2 className={`text-2xl md:text-5xl font-bold mb-4 px-4 transition-colors duration-700 ${isSalaarMode ? 'text-white font-mono uppercase tracking-[0.2em]' : 'text-darkText'
                        }`}>
                        {isSalaarMode ? 'KHANSAAR' : 'Academic'} <span className={`${isSalaarMode ? 'text-red-700' : 'text-mutedBlue italic serif'}`}>{isSalaarMode ? 'FOUNDATION' : 'Foundation'}</span>
                    </h2>
                    <p className={`text-base md:text-lg max-w-2xl mx-auto px-6 transition-colors duration-700 ${isSalaarMode ? 'text-white/40 font-mono text-sm' : 'text-lightText'
                        }`}>
                        {isSalaarMode
                            ? '[FOUNDATION_STRESS_TEST]: SUCCESS. Structural integrity verified across all modules.'
                            : 'A solid background in Computer Science, engineering systems, and mathematics.'}
                    </p>
                </motion.div>

                <HighlightGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    {education.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <HighlightItem
                                id={cert.id}
                                className={`h-full p-6 transition-all duration-500 border relative overflow-hidden ${isSalaarMode
                                    ? 'bg-black/60 border-red-900/20 rounded-none hover:border-red-600 shadow-[0_0_20px_rgba(153,0,0,0.05)]'
                                    : 'bg-white rounded-2xl shadow-soft border-softGray'
                                    }`}
                            >
                                {isSalaarMode && <BattleGrid isCard opacity={0.5} intensity="low" />}
                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 transition-colors duration-700 ${isSalaarMode
                                            ? 'bg-red-950/20 text-red-600'
                                            : 'bg-gradient-to-br from-mutedBlue/10 to-deepEmerald/10 text-mutedBlue'
                                            } ${isSalaarMode ? 'rounded-none' : 'rounded-xl'}`}>
                                            {isSalaarMode ? <Shield size={24} /> : <Award size={24} />}
                                        </div>
                                        <span className={`text-sm font-semibold transition-colors duration-700 ${isSalaarMode ? 'text-red-600 font-mono' : 'text-lightText'
                                            }`}>{isSalaarMode ? `v.${cert.year}` : cert.year}</span>
                                    </div>

                                    <h3 className={`text-lg font-bold mb-2 transition-colors duration-700 ${isSalaarMode ? 'text-white' : 'text-darkText'
                                        }`}>
                                        {isSalaarMode ? cert.title.toUpperCase() : cert.title}
                                    </h3>
                                    <p className={`text-sm mb-6 transition-colors duration-700 ${isSalaarMode ? 'text-white/60 font-mono italic' : 'text-lightText'
                                        }`}>
                                        {cert.organization}
                                    </p>

                                    {cert.credentialUrl && (
                                        cert.credentialUrl.startsWith('http') ? (
                                            <a
                                                href={cert.credentialUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${isSalaarMode ? 'text-red-600 hover:text-white' : 'text-mutedBlue hover:text-deepEmerald'}`}
                                            >
                                                View Intel
                                                <ExternalLink size={14} />
                                            </a>
                                        ) : (
                                            <div className={`text-sm font-bold bg-opacity-10 px-3 py-1 rounded-none w-fit ${isSalaarMode ? 'text-red-600 bg-red-600' : 'text-mutedBlue bg-mutedBlue rounded-full'}`}>
                                                {cert.credentialUrl}
                                            </div>
                                        )
                                    )}
                                </div>
                            </HighlightItem>
                        </motion.div>
                    ))}
                </HighlightGroup>
            </div>
        </section>
    );
}
