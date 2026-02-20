import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Scene from './Scene';
import ProgressDots from './ProgressDots';
import { useExperience } from './ExperienceContext';
import type { BackgroundVariant } from './SceneBackground';

const scenes: { headline: string; subtext: string; variant: BackgroundVariant; insights: string[] }[] = [
    {
        headline: "I don't just build features.",
        subtext: "I build systems that solve meaningful problems.",
        variant: 'systems',
        insights: [
            "Always ask 'Why?' before 'How?'",
            "Consider the system as a whole, not just isolated parts.",
            "Optimize for maintainability and scalability from day one."
        ]
    },
    {
        headline: "I think in flows, not fragments.",
        subtext: "Frontend. Backend. Data. Architecture.",
        variant: 'flows',
        insights: [
            "Data should flow predictably.",
            "State management is the backbone of UX.",
            "Edge cases are not optional; they are the system."
        ]
    },
    {
        headline: "Decisions define engineering.",
        subtext: "Every tool has tradeoffs. I choose deliberately.",
        variant: 'tradeoffs',
        insights: [
            "No silver bullets, only tradeoffs.",
            "Choose boring technology for critical paths.",
            "Innovate where it adds unique value."
        ]
    },
    {
        headline: "Shipping > Talking.",
        subtext: "I build. I iterate. I improve.",
        variant: 'shipping',
        insights: [
            "Perfect is the enemy of done.",
            "Feedback loops accelerate quality.",
            "Deploy early, observe often."
        ]
    },
    {
        headline: "Still evolving.",
        subtext: "The best systems are never static.",
        variant: 'evolution',
        insights: [
            "Learning is a continuous loop.",
            "Refactoring is an investment, not a cost.",
            "Stay curious, stay humble."
        ]
    }
];

export default function GuidedExperience() {
    const [currentScene, setCurrentScene] = useState(0);
    const { completeExperience } = useExperience();

    const handleNext = () => {
        if (currentScene < scenes.length - 1) {
            setCurrentScene(prev => prev + 1);
        } else {
            completeExperience();
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-warmWhite">
            <AnimatePresence mode="wait">
                <Scene
                    key={currentScene}
                    headline={scenes[currentScene].headline}
                    subtext={scenes[currentScene].subtext}
                    variant={scenes[currentScene].variant}
                    insights={scenes[currentScene].insights}
                    onNext={handleNext}
                    isLastScene={currentScene === scenes.length - 1}
                />
            </AnimatePresence>

            <ProgressDots total={scenes.length} current={currentScene} />

            <button
                onClick={completeExperience}
                className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[60] px-5 py-2.5 md:px-6 md:py-3 bg-white/80 backdrop-blur-md border border-mutedBlue/20 rounded-full text-[10px] md:text-xs font-mono font-bold text-mutedBlue shadow-lg hover:bg-mutedBlue hover:text-white transition-all flex items-center gap-2 group"
            >
                <span className="opacity-60 group-hover:opacity-100 italic">Skip Interaction</span>
            </button>
        </div>
    );
}
