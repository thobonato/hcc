"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import PromptBox from '@/components/PromptBox';
import Logo from '@/components/Logo';

const ChatInterface = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');

  const handleSubmit = (value: string) => {
    setIsLoading(true);
    setInput(value);
  };
  React.useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className={`absolute top-0 left-0 ${isLoading ? 'hidden' : ''}`}>
        <Header/>
      </div>

      <a href='/' className={isLoading ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' : ''}>
        <Logo className='max-w-32 max-h-32' stopLoop={!isLoading}/>
      </a>
      
      <div className={`w-full max-w-2xl mt-8 ${isLoading ? 'hidden' : ''}`}>
        <PromptBox onSubmit={handleSubmit}/>
      </div>

      <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-gray-400 ${isLoading ? 'hidden' : ''}`}>
        © Human Chemical Co, 2025
      </div>
    </div>
  );
};



export default ChatInterface;