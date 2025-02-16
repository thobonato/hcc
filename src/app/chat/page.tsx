"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Header from '@/components/Header';
import CursorTooltip from '@/components/CursorTooltip';
import { ArrowUp } from 'lucide-react';
import Logo from '@/components/Logo';

const ChatInterface = () => {
  const [input, setInput] = useState('');
  const suggestions = [
    { text: 'CCRS', bgColor: 'bg-purple-50', textColor: 'text-purple-400' },
    { text: 'TRNP', bgColor: 'bg-pink-50', textColor: 'text-pink-400' },
    { text: 'CCNO', bgColor: 'bg-yellow-50', textColor: 'text-yellow-400' },
    { text: 'RQSP', bgColor: 'bg-blue-50', textColor: 'text-blue-400' }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
    <div className="absolute top-0 left-0">
      <Header/>
    </div>

     {/* Logo would go here */}
     <a href='/'>
        <Logo className='max-w-32 max-h-32' stopLoop={true}/>
     </a>

      {/* chat box */}
      <div className="w-full max-w-2xl mt-10">
        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder="Enter a SMILES string"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-12 px-4 bg-gray-100 border-none focus-visible:ring-0 focus:border-gray-300 rounded-l-lg shadow-none"
          />
            <Button 
              className="h-12 px-4 bg-gray-300 hover:bg-black text-white shadow-none ml-1 transition-colors duration-200"
            >
            <ArrowUp/>
            </Button>
        </div>
        
        {/* options */}
        <div className="flex items-center justify-between text-sm mt-2">
          <div className="flex items-center space-x-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.text}
                onClick={() => setInput(suggestion.text)}
                className={`px-3 py-2 rounded-md ${suggestion.bgColor} ${suggestion.textColor} font-medium`}
              >
                {suggestion.text}
              </button>
            ))}
            <span className="px-3 py-2 rounded-md bg-gray-50 text-gray-400 font-medium">+3</span>
          </div>
          
          <div className="relative group inline-block">
            <CursorTooltip />
          </div>
        </div>

      </div>
        
      

      {/* footer */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-gray-400">
        © Human Chemical Co, 2025
      </div>
    </div>
  );
};

export default ChatInterface;