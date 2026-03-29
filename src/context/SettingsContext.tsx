import { createContext, useContext, useState, type ReactNode } from 'react';

interface SettingsContextType {
    isMinimalView: boolean;
    toggleMinimalView: () => void;
    isSalaarMode: boolean;
    setIsSalaarMode: (val: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [isMinimalView, setIsMinimalView] = useState(false);
    const [isSalaarMode, setIsSalaarMode] = useState(false);

    const toggleMinimalView = () => setIsMinimalView(prev => !prev);

    return (
        <SettingsContext.Provider value={{
            isMinimalView,
            toggleMinimalView,
            isSalaarMode,
            setIsSalaarMode,
        }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
