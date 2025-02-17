'use client';
import React, { useState, useCallback } from 'react';
import { User, Search, File, Star, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CursorTooltip from './CursorTooltipHeader';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Improved HoverDropdownMenu component with debounced close
import { LucideIcon } from 'lucide-react';

const HoverDropdownMenu = ({ icon: Icon, children, align = "start" }: { icon: LucideIcon, children: React.ReactNode, align?: "start" | "center" | "end" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setIsOpen(true);
  }, [closeTimeout]);

  const handleMouseLeave = useCallback(() => {
    const timeout = setTimeout(() => {
      setIsOpen(false);
    }, 150); // Slight delay before closing
    setCloseTimeout(timeout);
  }, []);

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block" // Ensures proper inline positioning
    >
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Icon className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align={align} 
          className='bg-fill-secondary gap-0 p-0'
          sideOffset={5}
        >
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const Header = () => {
  const [favorites] = useState([
    'TRCA hybrid requires bonding t...',
    'Polymer needed to make compl...',
    'UICG test against TRSA finds th...'
  ]);

  const [recents] = useState([
    'TRCA hybrid requires bonding t...',
    'Polymer needed to make compl...',
    'UICG test against TRSA finds th...'
  ]);

  return (
    <header className="w-full bg-surface-background">
      <div className="max-w-screen p-6">
        <div className="flex items-center">
          {/* Profile Section */}
          <div className="flex items-center space-x-2">
            <HoverDropdownMenu icon={User}>
              <DropdownMenuItem className="py-1 text-text-primary hover:bg-fill-secondary">
                info@fennell.cv
              </DropdownMenuItem> 
              <DropdownMenuSeparator className='bg-border-default -mx-0 my-0'/>
              <DropdownMenuItem className="py-1 text-text-primary hover:bg-fill-secondary">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className=' -mx-0 my-0'/>
              <DropdownMenuItem className="py-1 text-text-primary hover:bg-fill-secondary">
                Payments
              </DropdownMenuItem>
              <DropdownMenuSeparator className='bg-border-default -mx-0 my-0'/>
              <DropdownMenuItem className="py-1 text-text-primary hover:bg-fill-secondary">
                Logout
              </DropdownMenuItem>
            </HoverDropdownMenu>
          </div>

            {/* Actions */}
            <div className="flex items-center space-x-1">
            {/* Search & New Chat*/}
            <div className='bg-fill-secondary rounded-md relative'>
              <Button size="icon" variant="ghost" className="group">
              <Search className="h-5 w-5" />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-fill-secondary text-xs text-text-secondary px-1 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Search
                </span>
              </Button>
              
              <Button size="icon" variant="ghost" className="group">
              <File className="h-5 w-5" />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-fill-secondary text-xs text-text-secondary px-1 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  New Chat
                </span>
              </Button>
            </div>

            {/* Favorites & Recents */}
            <div className='bg-fill-secondary rounded-md flex'>
              {/* Favorites section */}
              <HoverDropdownMenu icon={Star}>
                <h3 className="text-overline-small text-text-secondary font-medium px-2 pt-2">FAVORITES</h3>
                {favorites.map((item, index) => (
                  <React.Fragment key={index}>
                    <DropdownMenuItem className="py-1 text-text-primary hover:bg-fill-secondary">
                      {item}
                    </DropdownMenuItem>
                    {index < favorites.length - 1 && 
                      <DropdownMenuSeparator className='bg-border-default -mx-0 my-0'/>
                    }
                  </React.Fragment>
                ))}
              </HoverDropdownMenu>
              
              {/* Recent chats section */}
              <HoverDropdownMenu icon={Clock}>
                <h3 className="text-overline-small text-text-secondary font-medium px-2 pt-2 pb-1">RECENTS</h3>
                {recents.map((item, index) => (
                  <React.Fragment key={index}>
                    <DropdownMenuItem className="py-1 text-text-primary hover:bg-fill-secondary">
                      {item}
                    </DropdownMenuItem>
                    {index < recents.length - 1 && 
                      <DropdownMenuSeparator className='bg-border-default -mx-0 my-0'/>
                    }
                  </React.Fragment>
                ))}
              </HoverDropdownMenu>
            </div>

            {/* Circle Help */}
            <Button variant="ghost" size="icon" className='cursor-default'>
              <CursorTooltip/>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;