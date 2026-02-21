import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { MessageSquare, Sword, Shield, ChevronDown, Mic } from 'lucide-react';

const interviewQuestions = [
    {
        id: 'q1',
        question: "Why should we choose you?",
        zenAnswer: "I bring a balance of technical proficiency and creative problem-solving. My focus is on writing clean, maintainable code that directly solves user needs.",
        salaarAnswer: "I don't just write code; I build systems that dominate. My technical prowess and battle-tested logic ensure that failure is not an option."
    },
    {
        id: 'q2',
        question: "What is your core experience?",
        zenAnswer: "I specialize in front-end architecture with React, state management solutions, and building high-performance web applications using modern tooling.",
        salaarAnswer: "My experience is forged in the fires of complex architecture. I have constructed robust infrastructures that withstand the highest pressures."
    },
    {
        id: 'q3',
        question: "How do you approach complex problems?",
        zenAnswer: "I break them down into smaller, manageable components, research best practices, and iterate on solutions while maintaining clear communication with my team.",
        salaarAnswer: "I dissect every weakness, analyze the failure points, and re-engineer the system for maximum structural integrity."
    },
    {
        id: 'q4',
        question: "What's your view on technical debt?",
        zenAnswer: "Technical debt is a tool that requires careful management. I advocate for regular refactoring and maintaining high standards to prevent long-term velocity loss.",
        salaarAnswer: "System inefficiency is a vulnerability. I eliminate technical debt to ensure the tactical advantage remains absolute."
    },
    {
        id: 'q5',
        question: "How do you fit in our organization?",
        zenAnswer: "I am a collaborative learner who values feedback and continuous improvement. I strive to contribute positively to the team culture.",
        salaarAnswer: "I am a high-performance unit. I integrate seamlessly into established protocols and elevate the efficiency of the entire operation."
    }
];

import BattleGrid from './salaar/BattleGrid';

export default function InterviewMode() {
    const { isSalaarMode } = useSettings();
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
                const text = isSalaarMode ? question.salaarAnswer : question.zenAnswer;
                const utt = new SpeechSynthesisUtterance(text);
                if (isSalaarMode) {
                    utt.pitch = 0.4;
                    utt.rate = 0.75;
                } else {
                    utt.pitch = 1.1;
                    utt.rate = 1.0;
                }
                window.speechSynthesis.speak(utt);
            }
        }
    };

    return (
        <section id="interview-mode" className={`py-32 px-6 transition-colors duration-1000 relative overflow-hidden ${isSalaarMode ? 'bg-black' : 'bg-warmWhite/30'}`}>
            {isSalaarMode && <BattleGrid opacity={0.3} />}
            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-end gap-3 mb-12 md:mb-20"
                >
                    <div className="flex-1">
                        <h2 className={`text-2xl md:text-5xl font-bold tracking-tight mb-2 px-4 md:px-0 flex items-center gap-3 ${isSalaarMode ? 'text-red-600 font-mono uppercase tracking-[0.2em]' : 'text-darkText'}`}>
                            {isSalaarMode ? <Sword size={32} /> : <Shield size={32} />}
                            {isSalaarMode ? 'KHANSAAR_PROTOCOL' : 'Inquisitive Mode'}
                        </h2>
                        <p className={`text-sm md:text-base font-light px-4 md:px-0 ${isSalaarMode ? 'text-red-500/60 font-mono' : 'text-lightText'}`}>
                            {isSalaarMode ? '[INTERROGATION_START]: DECODING ENGINEER PROTOCOLS...' : 'Understanding the logic behind the engineer.'}
                        </p>
                    </div>
                    <div className={`hidden md:block h-px flex-1 mb-2 mx-8 transition-colors duration-700 ${isSalaarMode ? 'bg-red-900/30' : 'bg-softGray opacity-20'}`} />
                </motion.div>

                <div className="grid grid-cols-1 gap-6">
                    {interviewQuestions.map((q) => (
                        <div key={q.id} className="space-y-4">
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => handleSelect(q.id)}
                                className={`w-full text-left p-6 flex items-center justify-between border transition-all duration-500 relative overflow-hidden ${isSalaarMode
                                    ? 'bg-red-950/10 border-red-900/40 rounded-none hover:bg-red-950/20 shadow-[inset_0_0_20px_rgba(153,0,0,0.05)]'
                                    : 'bg-white border-softGray rounded-2xl hover:shadow-lg'
                                    }`}
                            >
                                {isSalaarMode && <BattleGrid isCard opacity={0.4} intensity="low" />}
                                {isSalaarMode && selectedQ === q.id && (
                                    <motion.div
                                        initial={{ top: '-100%' }}
                                        animate={{ top: '100%' }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="absolute left-0 right-0 h-[1px] bg-red-600/40 z-20 pointer-events-none"
                                    />
                                )}
                                {isSalaarMode && selectedQ === q.id && (
                                    <motion.div
                                        layoutId="active-bg"
                                        className="absolute inset-0 bg-red-900/10 z-0"
                                    />
                                )}
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className={`p-2 rounded-full transition-colors duration-500 ${isSalaarMode
                                        ? selectedQ === q.id ? 'bg-red-700 text-white' : 'bg-red-900/20 text-red-600'
                                        : 'bg-mutedBlue/10 text-mutedBlue'}`}>
                                        <MessageSquare size={18} />
                                    </div>
                                    <span className={`font-medium transition-colors duration-500 ${isSalaarMode
                                        ? selectedQ === q.id ? 'text-white' : 'text-red-400 font-mono text-sm'
                                        : 'text-darkText'}`}>{q.question}</span>
                                </div>
                                <div className={`transition-transform duration-300 relative z-10 ${selectedQ === q.id ? 'rotate-180' : ''}`}>
                                    <ChevronDown size={18} className={isSalaarMode ? 'text-red-600' : 'text-mutedBlue'} />
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
                                        <div className={`p-8 border-l-2 ml-4 relative overflow-hidden ${isSalaarMode
                                            ? 'bg-red-950/10 border-red-600 text-red-100/90 font-mono text-xs italic leading-loose'
                                            : 'bg-softGray/5' + ' border-mutedBlue text-lightText leading-relaxed rounded-r-2xl'}`}>
                                            <div className="flex gap-4 md:gap-6">
                                                <div className="flex-1">
                                                    <span className="opacity-40 mr-2 uppercase tracking-widest">{isSalaarMode ? '[RESPONSE]:' : 'Answer:'}</span>
                                                    {isSalaarMode ? q.salaarAnswer : q.zenAnswer}

                                                    <div className="flex items-center justify-end mt-6">
                                                        <button
                                                            onClick={() => {
                                                                const text = isSalaarMode ? q.salaarAnswer : q.zenAnswer;
                                                                const utt = new SpeechSynthesisUtterance(text);
                                                                if (isSalaarMode) {
                                                                    utt.pitch = 0.4;
                                                                    utt.rate = 0.75;
                                                                } else {
                                                                    utt.pitch = 1.1;
                                                                    utt.rate = 1.0;
                                                                }
                                                                window.speechSynthesis.speak(utt);
                                                            }}
                                                            className={`p-3 rounded-full transition-all duration-500 group/mic ${isSalaarMode
                                                                ? 'bg-red-900/20 border border-red-600/30 text-red-600 hover:bg-red-600 hover:text-white'
                                                                : 'bg-mutedBlue/5 border border-mutedBlue/10 text-mutedBlue hover:bg-mutedBlue hover:text-white'
                                                                }`}
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
