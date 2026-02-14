import { createContext, useContext, useState, type ReactNode } from 'react';

interface ExperienceContextType {
    isGuidedMode: boolean;
    isRevealing: boolean;
    completeExperience: () => void;
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

export function ExperienceProvider({ children }: { children: ReactNode }) {
    const [isGuidedMode, setIsGuidedMode] = useState(true);
    const [isRevealing, setIsRevealing] = useState(false);

    const completeExperience = () => {
        setIsRevealing(true);
        setIsGuidedMode(false);
    };

    return (
        <ExperienceContext.Provider value={{ isGuidedMode, isRevealing, completeExperience }}>
            {children}
        </ExperienceContext.Provider>
    );
}

export function useExperience() {
    const context = useContext(ExperienceContext);
    if (context === undefined) {
        throw new Error('useExperience must be used within an ExperienceProvider');
    }
    return context;
}
