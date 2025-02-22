'use client';
import React, { useState } from 'react';
import { Search, File, Star, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CursorTooltip from '@/components/header/CursorTooltipHeader';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HoverDropdownMenu from '@/components/header/HoverDropdownMenu';
import AuthButton from './auth/AuthButton';
import { useAuth } from '@/hooks/useAuth';
import DisabledToolTip from '@/components/initial/DisabledToolTip';

interface HeaderProps {
  onOpenSettings: () => void;
  onClickSearch: () => void;
  onClickNewChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSettings, onClickSearch, onClickNewChat }) => {
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
    <header className="w-full bg-surface-background z-50">
      <div className="max-w-screen p-6">
        <div className="flex items-center">
          
          {/* If not signed in, show log in button */}
          {!user ? <AuthButton/> : (
            <div className="flex items-center space-x-2">
              {/* Profile Section */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 rounded-full overflow-hidden p-0"
                  >
                    <img 
                      src={user?.user_metadata?.avatar_url} 
                      alt="Profile" 
                      className="h-full w-full object-cover"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-fill-secondary gap-0 p-0 mt-1.5" 
                  align="start"
                >
                  {/* User email display */}
                  <DropdownMenuItem className="py-1 text-text-primary bg-fill-secondary-header">
                    <span className="bg-fill-primary rounded-full p-1"></span>
                    {user?.user_metadata?.email} 
                  </DropdownMenuItem> 
                  <DropdownMenuSeparator className='bg-border-header -mx-0 my-0'/>
                  <DropdownMenuItem 
                    className="py-1 text-text-primary bg-fill-secondary-header hover:bg-border-header"
                    onClick={onOpenSettings}
                  >
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className='bg-border-header -mx-0 my-0'/>
                  <DropdownMenuItem className="py-1 text-text-primary bg-fill-secondary-header hover:bg-border-header">
                    {/* Logout */}
                    <AuthButton/>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-1">
            {/* Search & New Chat*/}
            <div className='bg-fill-secondary-header rounded-md relative'>
              <DisabledToolTip 
                message="Please login to access"
                disabled={!user}
                className='inline-flex'
              >
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="group relative m-0.5 hover:bg-fill-secondary-hover" 
                  disabled={!user} 
                  onClick={onClickSearch}
                >
                  <Search className="h-5 w-5" />
                  <div className="absolute z-50 top-full left-1/2 -translate-x-1/2 pt-2">
                    <div className="pointer-events-none bg-fill-secondary-header text-xs text-text-secondary px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap">
                      Search
                    </div>
                  </div>
                </Button>
              </DisabledToolTip>
              
              <DisabledToolTip 
                message="Please login to access"
                disabled={!user}
                className='inline-flex'
              >
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="group relative m-0.5 hover:bg-fill-secondary-hover" 
                  disabled={!user} 
                  onClick={onClickNewChat}
                >
                  <File className="h-5 w-5" />
                  <div className="absolute z-50 top-full left-1/2 -translate-x-1/2 pt-2">
                    <div className="pointer-events-none bg-fill-secondary text-xs text-text-secondary px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap">
                      New Chat
                    </div>
                  </div>
                </Button>
              </DisabledToolTip>
            </div>

            {/* Favorites & Recents */}
            <div className='bg-fill-secondary rounded-md flex'>
              {/* Favorites section */}
              <DisabledToolTip 
                message="Please login to access"
                disabled={!user}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild disabled={!user}>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`flex justify-center items-center transition-colors duration-200 m-0.5 ${!user ? 'cursor-not-allowed opacity-50' : 'hover:bg-fill-secondary-hover'}`}
                    >
                      <Star className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="bg-fill-secondary gap-0 p-0 mt-1"
                    align="start"
                  >
                    <h3 className="text-overline-small text-text-secondary font-medium px-2 pt-2">FAVORITES</h3>
                    {favorites.map((item, index) => (
                      <React.Fragment key={index}>
                        <DropdownMenuItem className="py-1 text-text-primary bg-fill-secondary-header hover:bg-border-header">
                          {item}
                        </DropdownMenuItem>
                        {index < favorites.length - 1 && 
                          <DropdownMenuSeparator className='bg-border-header -mx-0 my-0'/>
                        }
                      </React.Fragment>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </DisabledToolTip>
              
              {/* Recent chats section */}
              <DisabledToolTip 
                message="Please login to access"
                disabled={!user}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild disabled={!user}>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`flex justify-center items-center transition-colors duration-200 m-0.5 ${!user ? 'cursor-not-allowed opacity-50' : 'hover:bg-fill-secondary-hover'}`}
                    >
                      <Clock className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="bg-fill-secondary gap-0 p-0 mt-1"
                    align="start"
                  >
                    <h3 className="text-overline-small text-text-secondary font-medium px-2 pt-2 pb-1">RECENTS</h3>
                    {recents.map((item, index) => (
                      <React.Fragment key={index}>
                        <DropdownMenuItem className="py-1 text-text-primary bg-fill-secondary-header hover:bg-border-header">
                          {item}
                        </DropdownMenuItem>
                        {index < recents.length - 1 && 
                          <DropdownMenuSeparator className='bg-border-header -mx-0 my-0'/>
                        }
                      </React.Fragment>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </DisabledToolTip>
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