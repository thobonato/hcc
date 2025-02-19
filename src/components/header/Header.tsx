'use client';
import React, { useState, useCallback } from 'react';
import { PlaySquare, LucideIcon, Search, File, Star, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CursorTooltip from '@/components/header/CursorTooltipHeader';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import HoverDropdownMenu from '@/components/header/HoverDropdownMenu';
import AuthButton from './auth/AuthButton';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const { user } = useAuth();
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
          
          {/* If not signed in, show log in button */}
          {!user ? <AuthButton/> : (
            <div className="flex items-center space-x-2">
              {/* Profile Section */}
              <HoverDropdownMenu 
                image={user?.user_metadata?.avatar_url}
              >
                {/* User email display */}
                <DropdownMenuItem className="py-1 text-text-primary">
                  <span className="bg-fill-primary rounded-full p-1"></span>
                  {user?.user_metadata?.email} 
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
                  {/* Logout */}
                  <AuthButton/>
                </DropdownMenuItem>
              </HoverDropdownMenu>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-1">
            {/* Search & New Chat*/}
            <div className='bg-fill-secondary rounded-md relative'>
                <Button size="icon" variant="ghost" className="group m-0.5 hover:bg-fill-secondary-hover" disabled={!user}>
                <Search className="h-5 w-5" />
                <span className="absolute -bottom-1 right-8 transform translate-y-full bg-fill-secondary text-xs text-text-secondary px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Search
                </span>
              </Button>
              
              <Button size="icon" variant="ghost" className="group m-0.5 hover:bg-fill-secondary-hover" disabled={!user}>
              <File className="h-5 w-5" />
                <span className="absolute -bottom-1 left-7 transform translate-y-full bg-fill-secondary text-xs text-text-secondary px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  New Chat
                </span>
              </Button>
            </div>

            {/* Favorites & Recents */}
            <div className='bg-fill-secondary rounded-md flex'>
              {/* Favorites section */}
              <HoverDropdownMenu icon={Star} disabled={!user}>
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
              <HoverDropdownMenu icon={Clock} disabled={!user}>
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