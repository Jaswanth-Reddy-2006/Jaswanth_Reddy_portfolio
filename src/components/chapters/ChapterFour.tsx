import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, ExternalLink } from 'lucide-react';
import type { Certification } from '../../data/portfolio';
import { HighlightGroup, HighlightItem } from '../SmartHighlight';

interface ChapterFourProps {
    education: Certification[];
}

function CredentialCard({ cert, index }: { cert: Certification; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const inView = useInView(cardRef, { once: true, margin: '-60px' });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.9, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
            <HighlightItem
                id={cert.id}
                className="h-full p-6 transition-all duration-700 border relative overflow-hidden bg-white rounded-2xl shadow-soft border-softGray hover:shadow-xl hover:border-mutedBlue/20"
            >
                <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 transition-colors duration-700 bg-gradient-to-br from-mutedBlue/10 to-deepEmerald/10 text-mutedBlue rounded-xl">
                            <Award size={24} />
                        </div>
                        <span className="text-sm font-semibold transition-colors duration-700 text-lightText">
                            {cert.year}
                        </span>
                    </div>

                    <h3 className="text-lg font-bold mb-2 transition-colors duration-700 text-darkText">
                        {cert.title}
                    </h3>
                    <p className="text-sm mb-6 transition-colors duration-700 text-lightText">
                        {cert.organization}
                    </p>

                    {cert.credentialUrl && (
                        cert.credentialUrl.startsWith('http') ? (
                            <a
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-medium transition-colors text-mutedBlue hover:text-deepEmerald"
                            >
                                View Credential
                                <ExternalLink size={14} />
                            </a>
                        ) : (
                            <div className="text-sm font-bold bg-mutedBlue bg-opacity-10 px-3 py-1 rounded-full w-fit text-mutedBlue">
                                {cert.credentialUrl}
                            </div>
                        )
                    )}
                </div>
            </HighlightItem>
        </motion.div>
    );
}

export default function ChapterFour({ education }: ChapterFourProps) {
    return (
        <section id="chapter-4" className="min-h-screen px-6 py-20 relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.98, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-12 md:mb-16 relative z-10"
                >
                    <h2 className="text-2xl md:text-5xl font-bold mb-4 px-4 transition-colors duration-700 text-darkText">
                        Academic <span className="text-mutedBlue italic serif">Foundation</span>
                    </h2>
                    <p className="text-base md:text-lg max-w-2xl mx-auto px-6 transition-colors duration-700 text-lightText">
                        A solid background in Computer Science, engineering systems, and mathematics.
                    </p>
                </motion.div>

                <HighlightGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    {education.map((cert, index) => (
                        <CredentialCard key={cert.id} cert={cert} index={index} />
                    ))}
                </HighlightGroup>
            </div>
        </section>
    );
}
