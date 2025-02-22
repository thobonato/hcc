import React, { createContext, useState, useContext, useEffect } from 'react';

interface SettingsContextType {
    customInstructions: string;
    setCustomInstructions: (instructions: string) => void;
}

export const SettingsContext = createContext<SettingsContextType>({
    customInstructions: '',
    setCustomInstructions: () => {},
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [customInstructions, setCustomInstructions] = useState('You are a helpful chemistry assistant.');

    // Add logging for initial mount and any updates
    useEffect(() => {
        console.log('SettingsContext - Current customInstructions:', customInstructions);
    }, [customInstructions]);

    const handleSetCustomInstructions = (instructions: string) => {
        console.log('SettingsContext - Setting new instructions:', instructions);
        setCustomInstructions(instructions);
    };

    return (
        <SettingsContext.Provider value={{ customInstructions, setCustomInstructions: handleSetCustomInstructions }}>
            {children}
        </SettingsContext.Provider>
    );
}; 