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
        </div>
    );
}
