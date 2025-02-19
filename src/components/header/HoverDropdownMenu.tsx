import { useState, useRef, useCallback, useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';
import { PlaySquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HoverDropdownMenuProps {
    image?: string;
    icon?: LucideIcon;
    children: React.ReactNode;
    align?: "start" | "center" | "end";
    disabled?: boolean;
}

const HoverDropdownMenu = ({
    image,
    icon: Icon,
    children,
    align = "start",
    disabled = false
}: HoverDropdownMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isMouseInside = useRef(false);

    const clearTimeouts = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    const handleMouseEnter = useCallback((e: React.MouseEvent) => {
        if (disabled) return;
        clearTimeouts();
        isMouseInside.current = true;
        timeoutRef.current = setTimeout(() => {
                setIsOpen(true);
        }, 150);
    }, [clearTimeouts, disabled]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (disabled) return;
        if (!isMouseInside.current) {
            handleMouseEnter(e);
        }
    }, [handleMouseEnter, disabled]);

    const handleMouseLeave = useCallback((e: React.MouseEvent) => {
        if (disabled) return;
        const relatedTarget = e.relatedTarget as HTMLElement;
        const container = containerRef.current;
        
        // Check if the mouse is moving to a child element
        if (container?.contains(relatedTarget)) {
            return;
        }

        isMouseInside.current = false;
        clearTimeouts();
        
        timeoutRef.current = setTimeout(() => {
            if (!isMouseInside.current) {
                setIsOpen(false);
            }
        }, 150);
    }, [clearTimeouts, disabled]);

    useEffect(() => {
        return () => {
            clearTimeouts();
        };
    }, [clearTimeouts]);

    // Add a gap between trigger and content for smoother movement
    const contentClassName = `
        bg-fill-secondary gap-0 p-0 
        animate-in fade-in-0 zoom-in-95 
        data-[state=closed]:animate-out 
        data-[state=closed]:fade-out-0 
        data-[state=closed]:zoom-out-95 
        duration-200
        relative
        before:content-['']
        before:absolute
        before:-top-2
        before:left-0
        before:right-0
        before:h-2
    `;

    return (
        <div
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative inline-block"
        >
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`flex justify-center items-center transition-colors duration-200 m-0.5 ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-fill-secondary-hover'}`}
                        disabled={disabled}
                    >
                        {Icon ? (
                            <Icon className="h-5 w-5" />
                        ) : image ? (
                            <img
                                src={image}
                                alt="Menu icon"
                                className="h-8 w-8 rounded-full mr-2"
                                referrerPolicy="no-referrer"
                                crossOrigin="anonymous"
                            />
                        ) : (
                            <PlaySquare className="h-5 w-5" />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align={align}
                    className={contentClassName}
                    sideOffset={8}
                >
                    {children}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default HoverDropdownMenu;