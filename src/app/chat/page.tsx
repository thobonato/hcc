"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/header/Header';
import PromptBox from '@/components/initial/PromptBox';
import ChatPanel from '@/components/chat/ChatPanel';
import ModulePanel from '@/components/sidebar/modules/ModulePanel';
import Logo from '@/components/initial/Logo';
import Settings from '@/components/header/settings/Settings';
import Search from '@/components/header/search/Search';
import { useAuth } from '@/hooks/useAuth';
import MobileNotice from '@/components/mobile/MobileNotice';
import { SettingsProvider } from '@/components/header/settings/SettingsContext';

const ChatInterface = () => {
  const [isFirstPrompt, setIsFirstPrompt] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [offsetHeight, setHeaderHeight] = useState(0);
  const user = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const openNewChat = () => {
    window.location.reload();
  };

  const handleSubmit = (value: string) => {
    setIsLoading(true);
    setInput(value);
  };

  // Get header height after mount
  useEffect(() => {
    const header = document.querySelector('header');
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      setTimeout(() => {
        setIsFirstPrompt(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!user) {
      setIsFirstPrompt(true);
    }
  }, [user]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <MobileNotice />;
  }

  return (
    <SettingsProvider>
    <div className="h-screen w-full bg-surface-background flex flex-col overflow-hidden">
      <div className={`${isLoading ? 'hidden' : ''} relative z-50`}>
        <Header 
          onOpenSettings={() => setIsSettingsOpen(true)}
          onClickSearch={() => setIsSearchOpen(true)}
          onClickNewChat={() => openNewChat()}
        />
      </div>

      {isFirstPrompt ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-40">
          <div className="flex flex-col items-center w-full max-w-xl">
            <a href='/' className={`${isLoading ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' : ''}`}>
              <Logo className='max-w-32 max-h-32' stopLoop={!isLoading} playbackRate={isLoading ? 1.75 : 1}/>
            </a>
            
            <div className={`w-full max-w-2xl ${isLoading ? 'hidden' : ''}`}>
              <PromptBox onSubmit={handleSubmit}/>
            </div>
          </div>

          <div className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 text-sm text-text-secondary ${isLoading ? 'hidden' : ''}`}>
            © Human Chemical Co, 2025
          </div>
        </div>
      ) : (
        !isLoading && (
          <div className="flex flex-1 overflow-hidden">
            <div className={`flex flex-col transition-all duration-300 ${isOpen ? 'w-3/5' : 'w-full'}`}>
              <ChatPanel />
            </div>
            <div className={`${!isOpen ? 'w-0' : 'w-2/5'} max-w-lg`}>
              <ModulePanel onOpenChange={(open) => setIsOpen(open)} />
            </div>
          </div>
        )
      )}

      {user && (
        <Settings 
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          userData={{
            fullName: user?.user?.user_metadata?.full_name || '',
            email: user?.user?.user_metadata?.email || '',
            birthday: {
              month: '03',
              day: '15',
              year: '2002'
            },
            company: '',
            occupation: ''
          }}
        />
      )}

      {user && (
        <Search 
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      )}
    </div>
    </SettingsProvider>
  );
};

export default ChatInterface;