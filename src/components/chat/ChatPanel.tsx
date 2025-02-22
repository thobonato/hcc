import { useState, useRef, useEffect, useContext } from 'react';
import Logo from '@/components/initial/Logo';
import UserMessage from '@/components/chat/UserMessage';
import ModelResponse from '@/components/chat/ModelResponse';
import PromptInput from '@/components/chat/PromptInput';
import { SettingsContext } from '@/components/header/settings/SettingsContext';

interface Message {
    content: string;
    timestamp: string;
    isUser: boolean;
    error?: boolean;
}

const ChatPanel = () => {
    const [input, setInput] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [showLogo, setShowLogo] = useState(true);
    const [isRegenerating, setIsRegenerating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { customInstructions } = useContext(SettingsContext);

    const generateAIResponse = async (messageContent: string) => {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: messageContent,
                    customInstructions,
                    conversationHistory: messages.map(msg => ({
                        role: msg.isUser ? 'user' : 'assistant',
                        content: msg.content
                    }))
                })
            });

            if (!response.ok) {
                throw new Error('Failed to get AI response');
            }

            const data = await response.json();
            
            return {
                content: data.message,
                timestamp: new Date().toLocaleTimeString(),
                isUser: false
            };
        } catch (error) {
            console.error('Error getting AI response:', error);
            return {
                content: "I apologize, but I encountered an error processing your request. Please try again.",
                timestamp: new Date().toLocaleTimeString(),
                isUser: false,
                error: true
            };
        }
    };
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
      }, [messages]);      

    const handleSubmit = async (regenerateIndex?: number) => {
        if (regenerateIndex !== undefined && !isRegenerating) {
            setIsRegenerating(true);
            const userMessage = messages[regenerateIndex - 1]?.content || "";
            
            const aiResponse = await generateAIResponse(userMessage);
            const newMessages = [...messages];
            newMessages[regenerateIndex] = aiResponse;
            setMessages(newMessages);
            setIsRegenerating(false);
            scrollToBottom();
            return;
        }

        if (!input.trim() || isLoading) return;

        const newMessage: Message = {
            content: input,
            timestamp: new Date().toLocaleTimeString(),
            isUser: true
        };

        setMessages([...messages, newMessage]);
        setInput("");
        setShowLogo(false);
        setIsLoading(true);

        const aiResponse = await generateAIResponse(input);
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            <div className="flex-1 overflow-y-auto relative z-0">
                <div className="px-12">
                    {showLogo && (
                        <div className="flex justify-center pt-12">
                            <a href="/chat">
                                <Logo className="w-24 h-24 opacity-50"/>
                            </a>
                        </div>
                    )}
                    
                    <div className="max-w-[770px] mx-auto relative">
                        {messages.map((message, index) => (
                            message.isUser ? (
                                <div key={index} className="pl-[270px]">
                                    <UserMessage
                                        content={message.content}
                                        timestamp={message.timestamp}
                                    />
                                </div>
                            ) : (
                                <div key={index} className="pr-10">
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
                        {isLoading && (
                            <div className="flex w-12 my-8 ml-1">
                                <Logo className="w-12 h-12 opacity-50" playbackRate={2} stopLoop={false}/>
                            </div>
                        )}
                        <div ref={messagesEndRef}/>
                    </div>
                </div>
            </div>
            
            <div className="sticky bg-surface-background pt-4 bottom-0 z-0">
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