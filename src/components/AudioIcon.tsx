import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';

interface AudioIconProps {
    text: string;
    salaarText?: string;
}

export default function AudioIcon({ text, salaarText }: AudioIconProps) {
    const { isSalaarMode } = useSettings();
    const [isPlaying, setIsPlaying] = useState(false);

    const speak = () => {
        if (isPlaying) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(isSalaarMode && salaarText ? salaarText : text);

        // Voice characteristics refinement
        if (isSalaarMode) {
            // Attempt to find a deep male voice if available
            const voices = window.speechSynthesis.getVoices();
            const deepVoice = voices.find(v => v.name.includes('Google India English Male') || v.name.includes('Male')) || voices[0];
            if (deepVoice) utterance.voice = deepVoice;

            utterance.pitch = 0.3; // Much deeper
            utterance.rate = 0.7;  // Slow, heavy authority 
        } else {
            utterance.pitch = 1.05; // Friendly
            utterance.rate = 1;
        }

        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);

        window.speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        // Pre-fetch voices
        window.speechSynthesis.getVoices();
        return () => window.speechSynthesis.cancel();
    }, []);

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={speak}
            className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-500 ${isSalaarMode
                ? 'bg-red-950/20 border-red-900/40 text-red-600 hover:bg-red-900/40 shadow-[0_0_15px_rgba(153,0,0,0.3)]'
                : 'bg-mutedBlue/5 border-mutedBlue/20 text-mutedBlue hover:bg-mutedBlue/10 shadow-sm'
                }`}
        >
            {isPlaying ? (
                <div className="flex gap-0.5 items-center h-4">
                    {[...Array(4)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ height: [4, 16, 4] }}
                            transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 }}
                            className={`w-1 rounded-full ${isSalaarMode ? 'bg-red-600' : 'bg-mutedBlue'}`}
                        />
                    ))}
                </div>
            ) : (
                <Volume2 size={18} />
            )}
        </motion.button>
    );
}
