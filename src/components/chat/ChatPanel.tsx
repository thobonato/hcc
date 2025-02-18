import { useState } from 'react';
import Logo from "@/components/Logo";
import UserMessage from '@/components/chat/UserMessage';
import ModelResponse from '@/components/chat/ModelResponse';
import PromptInput from '@/components/chat/PromptInput';

interface Message {
    content: string;
    timestamp: string;
    isUser: boolean;
}

const ChatPanel = () => {
    const [input, setInput] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [showLogo, setShowLogo] = useState(true);
    const [isRegenerating, setIsRegenerating] = useState(false);

    const generateAIResponse = (messageContent: string) => {
        return {
            content: `# Testing Markdown Rendering
Here's a **bold statement** about polymers and *italic emphasis* on key points.

### Key Features:
- First feature with some \`inline code\`
- Second feature with a [link](https://example.com)
- Third feature with ~~strikethrough~~ text

#### Results Table
| Property | Value | Unit |
|----------|-------|------|
| Weight | 45.2 | kDa |
| Length | 120 | nm |

> Important note: This is a blockquote about the polymer structure.

1. First ordered step
2. Second ordered step
   - Sub-point A
   - Sub-point B

You can view this in the polymer 3d model. I will make this module visible in your sidebar now. I will highlight it there.

Please feel free to ask further questions about the data that you see.

[Regenerated at ${new Date().toLocaleTimeString()}]`,
            timestamp: "1m ago",
            isUser: false
        };
    };

    const handleSubmit = (regenerateIndex?: number) => {
        if (regenerateIndex !== undefined && !isRegenerating) {
            setIsRegenerating(true);
            const userMessage = messages[regenerateIndex - 1]?.content || "";
            
            setTimeout(() => {
                const newMessages = [...messages];
                newMessages[regenerateIndex] = generateAIResponse(userMessage);
                setMessages(newMessages);
                setIsRegenerating(false);
            }, 1000);
            return;
        }

        if (!input.trim()) return;

        const newMessage: Message = {
            content: input,
            timestamp: "1m ago",
            isUser: true
        };

        setMessages([...messages, newMessage]);
        setInput("");
        setShowLogo(false);

        setTimeout(() => {
            const aiResponse = generateAIResponse(input);
            setMessages(prev => [...prev, aiResponse]);
        }, 1000);
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto">
                <div className="px-12">
                    {showLogo && (
                        <div className="flex justify-center pt-12">
                            <a href="/chat">
                                <Logo className="w-24 h-24 opacity-50"/>
                            </a>
                        </div>
                    )}
                    
                    <div className="max-w-4xl mx-auto">
                        {messages.map((message, index) => (
                            message.isUser ? (
                                <div key={index} className="pl-24">
                                    <UserMessage
                                        content={message.content}
                                        timestamp={message.timestamp}
                                    />
                                </div>
                            ) : (
                                <div key={index} className="pr-24">
                                    <ModelResponse
                                        content={message.content}
                                        timestamp={message.timestamp}
                                        onRegenerate={() => handleSubmit(index)}
                                        onThumbsUp={() => console.log('Thumbs up')}
                                        onThumbsDown={() => console.log('Thumbs down')}
                                    />
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="sticky bg-surface-background pt-4 bottom-0">
                <PromptInput
                    value={input}
                    placeholder='Ask me anything...'
                    onChange={setInput}
                    onSubmit={() => handleSubmit()}
                />
            </div>
        </div>
    );
};

export default ChatPanel;