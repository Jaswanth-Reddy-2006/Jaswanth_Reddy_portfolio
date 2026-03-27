import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MessageSquare, Shield, ChevronDown, Mic } from 'lucide-react';

const interviewQuestions = [
    {
        id: 'q1',
        question: "Why should we choose you?",
        zenAnswer: "I bring a balance of technical proficiency and creative problem-solving. My focus is on writing clean, maintainable code that directly solves user needs."
    },
    {
        id: 'q2',
        question: "What is your core experience?",
        zenAnswer: "I specialize in front-end architecture with React, state management solutions, and building high-performance web applications using modern tooling."
    },
    {
        id: 'q3',
        question: "How do you approach complex problems?",
        zenAnswer: "I break them down into smaller, manageable components, research best practices, and iterate on solutions while maintaining clear communication with my team."
    },
    {
        id: 'q4',
        question: "What's your view on technical debt?",
        zenAnswer: "Technical debt is a tool that requires careful management. I advocate for regular refactoring and maintaining high standards to prevent long-term velocity loss."
    },
    {
        id: 'q5',
        question: "How do you fit in our organization?",
        zenAnswer: "I am a collaborative learner who values feedback and continuous improvement. I strive to contribute positively to the team culture."
    }
];

export default function InterviewMode() {
    const [selectedQ, setSelectedQ] = useState<string | null>(null);

    const handleSelect = (qId: string) => {
        if (selectedQ === qId) {
            setSelectedQ(null);
            window.speechSynthesis.cancel();
        } else {
            setSelectedQ(qId);
            const question = interviewQuestions.find(q => q.id === qId);
            if (question) {
                window.speechSynthesis.cancel();
                const text = question.zenAnswer;
                const utt = new SpeechSynthesisUtterance(text);
                utt.pitch = 1.1;
                utt.rate = 1.0;
                window.speechSynthesis.speak(utt);
            }
        }
    };

    return (
        <section id="interview-mode" className="py-32 px-6 transition-colors duration-1000 relative overflow-hidden bg-warmWhite/30">
            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-end gap-3 mb-12 md:mb-20"
                >
                    <div className="flex-1">
                        <h2 className="text-2xl md:text-5xl font-bold tracking-tight mb-2 px-4 md:px-0 flex items-center gap-3 text-darkText">
                            <Shield size={32} />
                            Inquisitive Mode
                        </h2>
                        <p className="text-sm md:text-base font-light px-4 md:px-0 text-lightText">
                            Understanding the logic behind the engineer.
                        </p>
                    </div>
                    <div className="hidden md:block h-px flex-1 mb-2 mx-8 transition-colors duration-700 bg-softGray opacity-20" />
                </motion.div>

                <div className="grid grid-cols-1 gap-6">
                    {interviewQuestions.map((q) => (
                        <div key={q.id} className="space-y-4">
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => handleSelect(q.id)}
                                className="w-full text-left p-6 flex items-center justify-between border transition-all duration-500 relative overflow-hidden bg-white border-softGray rounded-2xl hover:shadow-lg"
                            >
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="p-2 rounded-full transition-colors duration-500 bg-mutedBlue/10 text-mutedBlue">
                                        <MessageSquare size={18} />
                                    </div>
                                    <span className="font-medium transition-colors duration-500 text-darkText">{q.question}</span>
                                </div>
                                <div className={`transition-transform duration-300 relative z-10 ${selectedQ === q.id ? 'rotate-180' : ''}`}>
                                    <ChevronDown size={18} className="text-mutedBlue" />
                                </div>
                            </motion.button>

                            <AnimatePresence>
                                {selectedQ === q.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-8 border-l-2 ml-4 relative overflow-hidden bg-softGray/5 border-mutedBlue text-lightText leading-relaxed rounded-r-2xl">
                                            <div className="flex gap-4 md:gap-6">
                                                <div className="flex-1">
                                                    <span className="opacity-40 mr-2 uppercase tracking-widest">Answer:</span>
                                                    {q.zenAnswer}

                                                    <div className="flex items-center justify-end mt-6">
                                                        <button
                                                            onClick={() => {
                                                                const text = q.zenAnswer;
                                                                const utt = new SpeechSynthesisUtterance(text);
                                                                utt.pitch = 1.1;
                                                                utt.rate = 1.0;
                                                                window.speechSynthesis.speak(utt);
                                                            }}
                                                            className="p-3 rounded-full transition-all duration-500 group/mic bg-mutedBlue/5 border border-mutedBlue/10 text-mutedBlue hover:bg-mutedBlue hover:text-white"
                                                        >
                                                            <Mic size={18} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
