"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CursorTooltip from '@/components/initial/CursorTooltip';
import { ArrowUp } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import DisabledToolTip from '@/components/initial/DisabledToolTip';

interface PromptBoxProps {
    onSubmit: (value: string) => void;
  }  

  const PromptBox = ({ onSubmit }: PromptBoxProps) => {
    const [input, setInput] = useState('');
    const { user } = useAuth();
  
    const handleSubmit = () => {
      if (input.trim()) {
        onSubmit(input);
      }
    };

    const suggestions = [
        { text: 'CCRS', bgColor: 'bg-purple-50', textColor: 'text-purple-400' },
        { text: 'TRNP', bgColor: 'bg-pink-50', textColor: 'text-pink-400' },
        { text: 'CCNO', bgColor: 'bg-yellow-50', textColor: 'text-yellow-400' },
        { text: 'RQSP', bgColor: 'bg-blue-50', textColor: 'text-blue-400' }
    ];

    return (
        <div>
            {/* chat box */}
            <div className="relative flex items-center">
            <DisabledToolTip 
                message="Please login to access"
                disabled={!user}
                className='block w-full'
            >
                <Input
                    type="text"
                    placeholder="Enter a SMILES string"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    disabled={!user}
                    className="w-full h-12 px-4 bg-surface-main border-none focus-visible:ring-0 focus:border-gray-300 rounded-l-lg shadow-none disabled:cursor-default"
                />
            </DisabledToolTip>
                <Button
                    onClick={handleSubmit}
                    disabled={!user}
                    className={`h-12 px-4 ${input ? 'bg-fill-primary' : 'bg-fill-primary-hover'} text-gray-50 shadow-none ml-1`}
                >
                    <ArrowUp size={16}/>
                </Button>
            </div>
            

            {/* options */}
            <div className="flex items-center justify-between text-sm mt-2">
                <div className="flex items-center space-x-2">
                    {suggestions.map((suggestion) => (
                    <button
                        key={suggestion.text}
                        disabled={!user}
                        onClick={() => setInput(suggestion.text)}
                        className={`px-3 py-2 rounded-md ${suggestion.bgColor} ${suggestion.textColor} font-medium`}
                    >
                        {suggestion.text}
                    </button>
                    ))}
                    <span className="px-3 py-2 rounded-md bg-fill-secondary text-black font-medium">+3</span>
                </div>
            
                <div className="relative group inline-block">
                    <CursorTooltip />
                </div>
            </div>
        </div>
    );
};

export default PromptBox;