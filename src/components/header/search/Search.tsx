import React, { useState, useEffect } from 'react';
import Logo from '@/components/initial/Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface SearchProps {
    isOpen: boolean;
    onClose: () => void;
    onLoadChat?: (sessionId: string) => void;
}

interface ChatSession {
    id: string;
    title: string;
    is_favorite: boolean;
    created_at: string;
}

const Search: React.FC<SearchProps> = ({ isOpen, onClose, onLoadChat }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchInFavorites, setSearchInFavorites] = useState(false);
    const [favorites, setFavorites] = useState<ChatSession[]>([]);
    const [recents, setRecents] = useState<ChatSession[]>([]);
    const { user, supabase } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isOpen && user?.email) {
            loadChatSessions();
        }
    }, [isOpen, user?.email]);

    const loadChatSessions = async () => {
        if (!user?.email) return;

        try {
            const { data: sessions, error } = await supabase
                .from('chat_sessions')
                .select('id, title, is_favorite, created_at')
                .eq('user_email', user.email)
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (sessions) {
                setFavorites(sessions.filter(chat => chat.is_favorite));
                setRecents(sessions);
            }
        } catch (error) {
            console.error('Error loading chat sessions:', error);
        }
    };

    const handleChatClick = (sessionId: string) => {
        if (onLoadChat) {
            onLoadChat(sessionId);
        }
        router.push(`/chat?session=${sessionId}`);
        onClose();
    };

    const getTimeAgo = (timestamp: string) => {
        const diff = Date.now() - new Date(timestamp).getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);

        if (minutes < 60) return `${minutes} minutes ago`;
        if (hours < 24) return `${hours} hours ago`;
        if (days < 7) return `${days} days ago`;
        if (weeks < 4) return `${weeks} weeks ago`;
        return `${months} months ago`;
    };

    const filterItems = (items: ChatSession[]) => {
        return items.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const renderSearchItems = (items: ChatSession[]) => {
        const filteredItems = filterItems(items);
        return filteredItems.map((item) => (
            <div 
                key={item.id} 
                className="flex justify-between items-center py-1 px-4 border-b border-border-default hover:bg-fill-secondary-header cursor-pointer"
                onClick={() => handleChatClick(item.id)}
            >
                <span className="text-text-primary">{item.title}</span>
                <span className="text-text-secondary text-sm">
                    {getTimeAgo(item.created_at)}
                </span>
            </div>
        ));
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-surface-backdrops flex items-center justify-center z-[100] p-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-surface-background rounded-md shadow-lg w-3/5 h-3/5 flex flex-col overflow-hidden max-h-[90vh]"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                    >
                        <div className="m-2 mt-3 px-4 bg-surface-main rounded-md">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Search past chats..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full p-2 text-body-regular bg-transparent outline-none text-text-primary"
                                    autoFocus
                                />
                                <button
                                    onClick={() => setSearchInFavorites(!searchInFavorites)}
                                    className="px-3 py-1 rounded-md text-sm text-text-secondary"
                                >
                                    <Star className={`w-4 h-4 ${searchInFavorites ? 'fill-current' : ''}`} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-auto">
                            {searchInFavorites ? (
                                <div className="py-2">
                                    <div className="px-4 py-2 text-sm text-text-secondary">FAVORITES</div>
                                    {renderSearchItems(favorites)}
                                </div>
                            ) : (
                                <>
                                    <div className="py-2">
                                        <div className="px-4 py-2 text-sm text-text-secondary">FAVORITES</div>
                                        {renderSearchItems(favorites)}
                                    </div>
                                    <div className="py-2">
                                        <div className="px-4 py-2 text-sm text-text-secondary">RECENTS</div>
                                        {renderSearchItems(recents)}
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="flex justify-center pb-2 mt-auto opacity-20">
                            <Logo className="w-12 h-12" />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Search;