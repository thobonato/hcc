import { useState, useRef, useEffect, useContext } from 'react';
import { useSearchParams } from 'next/navigation';
import Logo from '@/components/initial/Logo';
import UserMessage from '@/components/chat/UserMessage';
import ModelResponse from '@/components/chat/ModelResponse';
import PromptInput from '@/components/chat/PromptInput';
import { SettingsContext } from '@/components/header/settings/SettingsContext';
import { useAuth } from '@/hooks/useAuth';
import ModulePanel from '@/components/sidebar/modules/ModulePanel';

interface Message {
    content: string;
    timestamp: string;
    isUser: boolean;
    error?: boolean;
}

interface ChatSession {
    id: string;
    title: string;
    chat_messages: {
        content: string;
        is_user: boolean;
        created_at: string;
    }[];
}

const ChatPanel = () => {
    const [input, setInput] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [showLogo, setShowLogo] = useState(true);
    const [isRegenerating, setIsRegenerating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
    const [currentTitle, setCurrentTitle] = useState("New Chat");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { customInstructions } = useContext(SettingsContext);
    const { user, supabase } = useAuth();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);

    // Load chat session from URL parameter
    useEffect(() => {
        if (!searchParams) return;
        const sessionId = searchParams.get('session');
        if (sessionId && user?.email) {
            loadChatSession(sessionId);
        }
    }, [searchParams, user?.email]);

    const loadChatSession = async (sessionId: string) => {
        if (!user?.email) return;

        try {
            const { data: session, error } = await supabase
                .from('chat_sessions')
                .select(`
                    id,
                    title,
                    chat_messages (
                        content,
                        is_user,
                        created_at
                    )
                `)
                .eq('id', sessionId)
                .eq('user_email', user.email)
                .single();

            if (error) throw error;
            if (!session) return;

            setCurrentSessionId(session.id);
            setCurrentTitle(session.title);
            setShowLogo(false);

            // Convert chat messages to our Message format
            const sortedMessages = session.chat_messages
                .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                .map(msg => ({
                    content: msg.content,
                    timestamp: new Date(msg.created_at).toLocaleTimeString(),
                    isUser: msg.is_user
                }));

            setMessages(sortedMessages);
        } catch (error) {
            console.error('Error loading chat session:', error);
        }
    };

    // Update chat title based on first user message
    const updateChatTitle = async (sessionId: string, message: string) => {
        if (!user?.email) return;

        try {
            const title = message.slice(0, 50) + (message.length > 50 ? '...' : '');
            await supabase
                .from('chat_sessions')
                .update({ title })
                .eq('id', sessionId)
                .eq('user_email', user.email);

            setCurrentTitle(title);
        } catch (error) {
            console.error('Error updating chat title:', error);
        }
    };

    // Modified createNewSession to handle title updates
    const createNewSession = async () => {
        if (!user?.email) return;

        try {
            const { data: session, error } = await supabase
                .from('chat_sessions')
                .insert([{ 
                    user_email: user.email,
                    title: 'New Chat'
                }])
                .select()
                .single();

            if (error) throw error;
            setCurrentSessionId(session.id);
            return session.id;
        } catch (error) {
            console.error('Error creating chat session:', error);
            return null;
        }
    };

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

    // Save chat message
    const saveChatMessage = async (content: string, is_user: boolean, sessionId: string) => {
        if (!user?.email) return;

        try {
            await fetch('/api/supabase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'saveChatMessage',
                    data: {
                        user_email: user.email,
                        session_id: sessionId,
                        content,
                        is_user
                    }
                })
            });
        } catch (error) {
            console.error('Error saving chat message:', error);
        }
    };

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

        // Ensure we have a session ID
        const sessionId = currentSessionId || await createNewSession();
        if (!sessionId) {
            setIsLoading(false);
            return;
        }

        // Update title if this is the first message
        if (messages.length === 0) {
            await updateChatTitle(sessionId, input);
        }

        // Save user message
        await saveChatMessage(input, true, sessionId);

        const aiResponse = await generateAIResponse(input);
        setMessages(prev => [...prev, aiResponse]);
        
        // Save AI response
        await saveChatMessage(aiResponse.content, false, sessionId);
        
        setIsLoading(false);
    };

    const loadChatHistory = async () => {
        if (!user?.email) return;

        try {
            const { data: sessions, error } = await supabase
                .from('chat_sessions')
                .select(`
                    id,
                    title,
                    chat_messages (
                        content,
                        is_user,
                        created_at
                    )
                `)
                .eq('user_email', user.email)
                .order('created_at', { ascending: false });

            if (error) throw error;
            if (!sessions) return;

            const sortedSessions = sessions.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
            const sortedMessages = sortedSessions.map(session => session.chat_messages.map(msg => ({
                content: msg.content,
                timestamp: new Date(msg.created_at).toLocaleTimeString(),
                isUser: msg.is_user
            }))).flat();

            setMessages(sortedMessages);
        } catch (error) {
            console.error('Error loading chat history:', error);
        }
    };

    return (
        <div className="flex flex-1 overflow-hidden">
            <div className={`flex flex-col transition-all duration-300 ${isOpen ? 'w-3/5' : 'w-full'}`}>
                <ModulePanel 
                    onOpenChange={(open) => setIsOpen(open)} 
                    sessionId={currentSessionId}
                    onFavoriteChange={loadChatHistory}
                />
            </div>
        </div>
    );
};

export default ChatPanel;