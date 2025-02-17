// components/ChatPanel.tsx
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Logo from "@/components/Logo";
import { ArrowUp } from 'lucide-react'

const ChatPanel = () => {
    const [input, setInput] = useState<string>("");

    const handleSubmit = () => {
        // Handle the submit logic here
        console.log("Submitted:", input);
    };
 return (
    <div className="flex flex-col justify-between h-full">
        <a href="/chat">
            <Logo className="w-24 h-24 opacity-50"/>
        </a>

        <div className="px-12 pb-10">
            <div className="max-w-4xl mx-auto flex items-center gap-2 h-12">
                <Input
                    type="text"
                    placeholder="Enter a SMILES string"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    className="w-full h-12 px-4 bg-surface-main border-none focus-visible:ring-0 focus:border-gray-300 rounded-l-lg shadow-none"
                />
                <Button 
                    onClick={handleSubmit} 
                    className={`h-12 px-4 ${input ? 'bg-fill-primary' : 'bg-fill-primary-hover'} text-gray-50 shadow-none ml-1`}
                >
                    <ArrowUp size={16}/>
                </Button>
            </div>
        </div>
    </div>
 );
};

export default ChatPanel;