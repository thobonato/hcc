import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface UserSettings {
    fullName: string;
    email: string;
    birthday: {
        month: string;
        day: string;
        year: string;
    };
    company: string;
    occupation: string;
    customInstructions: string;
}

interface SettingsContextType {
    settings: UserSettings;
    updateSettings: (newSettings: Partial<UserSettings>) => Promise<void>;
    customInstructions: string;
    setCustomInstructions: (instructions: string) => void;
}

const defaultSettings: UserSettings = {
    fullName: '',
    email: '',
    birthday: { month: '', day: '', year: '' },
    company: '',
    occupation: '',
    customInstructions: 'You are a helpful chemistry assistant.'
};

export const SettingsContext = createContext<SettingsContextType>({
    settings: defaultSettings,
    updateSettings: async () => {},
    customInstructions: defaultSettings.customInstructions,
    setCustomInstructions: () => {},
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, supabase } = useAuth();
    const [settings, setSettings] = useState<UserSettings>(defaultSettings);

    useEffect(() => {
        if (user?.email) {
            loadSettings();
        }
    }, [user?.email]);

    const loadSettings = async () => {
        if (!user?.email) return;

        try {
            const { data, error } = await supabase
                .from('user_settings')
                .select()
                .eq('user_email', user.email)
                .single();

            if (error && error.code !== 'PGRST116') {
                throw error;
            }

            if (data) {
                setSettings({
                    ...defaultSettings,
                    ...data,
                    email: user.email
                });
            }
        } catch (err) {
            console.error('Error loading settings:', err instanceof Error ? err.message : 'Unknown error');
        }
    };

    const updateSettings = async (newSettings: Partial<UserSettings>) => {
        if (!user?.email) return;

        try {
            const updatedSettings = { ...settings, ...newSettings };
            const { error } = await supabase
                .from('user_settings')
                .upsert({ 
                    user_email: user.email,
                    ...updatedSettings
                })
                .eq('user_email', user.email);

            if (error) throw error;
            setSettings(updatedSettings);
        } catch (err) {
            console.error('Error updating settings:', err instanceof Error ? err.message : 'Unknown error');
        }
    };

    return (
        <SettingsContext.Provider 
            value={{ 
                settings,
                updateSettings,
                customInstructions: settings.customInstructions,
                setCustomInstructions: (instructions) => 
                    updateSettings({ customInstructions: instructions })
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext); 