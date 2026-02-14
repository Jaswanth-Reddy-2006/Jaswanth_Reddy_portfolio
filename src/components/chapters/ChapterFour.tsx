import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import type { Certification } from '../../data/portfolio';
import { HighlightGroup, HighlightItem } from '../SmartHighlight';

interface ChapterFourProps {
    certifications: Certification[];
}

export default function ChapterFour({ certifications }: ChapterFourProps) {
    return (
        <section id="chapter-4" className="min-h-screen px-6 py-20 bg-gradient-to-b from-warmWhite to-softGray">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-darkText mb-4">
                        Proof of <span className="text-deepEmerald">Work</span>
                    </h2>
                    <p className="text-lg text-lightText max-w-2xl mx-auto">
                        Validated skills and continuous learning journey
                    </p>
                </motion.div>

                <HighlightGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <HighlightItem
                                id={cert.id}
                                className="h-full bg-white rounded-2xl p-6 shadow-soft border border-softGray"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-gradient-to-br from-mutedBlue/10 to-deepEmerald/10 rounded-xl">
                                        <Award className="text-mutedBlue" size={24} />
                                    </div>
                                    <span className="text-sm font-semibold text-lightText">{cert.year}</span>
                                </div>

                                <h3 className="text-lg font-bold text-darkText mb-2">
                                    {cert.title}
                                </h3>
                                <p className="text-sm text-lightText mb-6">
                                    {cert.organization}
                                </p>

                                {cert.credentialUrl && (
                                    <a
                                        href={cert.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-medium text-mutedBlue hover:text-deepEmerald transition-colors"
                                    >
                                        View Credential
                                        <ExternalLink size={14} />
                                    </a>
                                )}
                            </HighlightItem>
                        </motion.div>
                    ))}
                </HighlightGroup>
            </div>
        </section>
    );
}
