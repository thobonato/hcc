"use client";
import React, { useState } from 'react';
import Header from '@/components/Header/Header';
import PromptBox from '@/components/PromptBox';
import ChatPanel from '@/components/ChatPanel';
import ModulePanel from '@/components/ModulePanel';
import Logo from '@/components/Logo';

const ChatInterface = () => {
  const [isFirstPrompt, setIsFirstPrompt] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = (value: string) => {
    setIsLoading(true);
    setInput(value);
  };
  React.useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      setTimeout(() => {
        setIsFirstPrompt(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="max-h-screen min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className={`absolute top-0 left-0 ${isLoading ? 'hidden' : ''}`}>
        <Header/>
      </div>

      {isFirstPrompt &&
      <a href='/' className={`${isLoading ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' : ''}`}>
        <Logo className='max-w-32 max-h-32' stopLoop={!isLoading} playbackRate={isLoading ? 1.5 : 1}/>
      </a>
      }
      
      <div className={`w-full max-w-2xl mt-8 ${isLoading ? 'hidden' : ''} ${isFirstPrompt ? '' : 'hidden'}`}>
        <PromptBox onSubmit={handleSubmit}/>
      </div>

      <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-gray-400 ${isLoading ? 'hidden' : ''} ${isFirstPrompt ? '' : 'hidden'}`}>
        © Human Chemical Co, 2025
      </div>

      {!isFirstPrompt && !isLoading && (
      <div className="flex w-full justify-between h-screen">
        <div className={`flex flex-col justify-end transition-all duration-300 ${isOpen ? 'w-3/5' : 'w-full'}`}>
          <ChatPanel />
        </div>
        <div className={`${!isOpen ? 'w-0' : 'w-2/5'}`}>
          <ModulePanel onOpenChange={(open) => setIsOpen(open)} />
        </div>
      </div>
    )}
    </div>
  );
};



export default ChatInterface;