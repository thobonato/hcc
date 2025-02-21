import React, { useState } from 'react';
import Logo from '@/components/initial/Logo';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

interface SearchItem {
    title: string;
    timestamp: string;
}

interface SearchProps {
    isOpen: boolean;
    onClose: () => void;
}

const Search: React.FC<SearchProps> = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchInFavorites, setSearchInFavorites] = useState(false);

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

    const favorites: SearchItem[] = [
        { title: 'TRCA hybrid requires bonding', timestamp: '4 hours ago' },
        { title: 'Polymer needed to make complex', timestamp: '10 hours ago' },
        { title: 'UICG test against TRSA finds that', timestamp: '2 months ago' },
    ];

    const recents: SearchItem[] = [
        { title: 'TRCA hybrid requires bonding', timestamp: '2 hours ago' },
        { title: 'Polymer needed to make complex', timestamp: '2 days ago' },
        { title: 'UICG test against TRSA finds that', timestamp: '4 days ago' },
        { title: 'Polymer needed to make complex', timestamp: '1 week ago' },
        { title: 'UICG test against TRSA finds that', timestamp: '2 weeks ago' },
        { title: 'Polymer needed to make complex', timestamp: '2 weeks ago' },
    ];

    const filterItems = (items: SearchItem[]) => {
        return items.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const renderSearchItems = (items: SearchItem[]) => {
        const filteredItems = filterItems(items);
        return filteredItems.map((item, index) => (
            <div 
                key={index} 
                className="flex justify-between items-center py-1 px-4 border-b border-border-default hover:bg-fill-secondary cursor-pointer"
            >
                <span className="text-text-primary">{item.title}</span>
                <span className="text-text-secondary text-sm">{item.timestamp}</span>
            </div>
        ));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-surface-backdrops flex items-center justify-center z-50 p-10"
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
                                    {searchInFavorites ? (
                                        <Star className='w-4 h-4 fill-current' />
                                    ) : (
                                        <Star className='w-4 h-4' />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-auto">
                            {(!searchInFavorites || searchQuery === '') && (
                                <div className="py-2">
                                    <div className="px-4 py-2 text-sm text-text-secondary">FAVORITES</div>
                                    {renderSearchItems(favorites)}
                                </div>
                            )}

                            {!searchInFavorites && (
                                <div className="py-2">
                                    <div className="px-4 py-2 text-sm text-text-secondary">RECENTS</div>
                                    {renderSearchItems(recents)}
                                </div>
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