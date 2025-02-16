import React, { useState } from 'react';
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
    <header className="w-full bg-white">
      <div className="max-w-screen-xl mx-auto p-6">
        <div className="flex items-center justify-between">
          {/* Profile Section */}
          <div className="flex items-center space-x-0">
            
            {/* IF LOGGED IN HERE */}
            {/* <img src="/api/placeholder/32/32" alt="Profile" className="w-8 h-8 rounded-full" /> */}
            {/* <span className="text-sm">info@fennell.cv</span> */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                    <User/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className='bg-fill-secondary gap-0 p-0'>
                
                {/* email, this is dynamic eventually */}
                <DropdownMenuItem className="py-1 text-text-primary hover:bg-fill-secondary">info@fennell.cv</DropdownMenuItem> 
                <DropdownMenuSeparator className='bg-border-default -mx-0 my-0'/>
                <DropdownMenuItem className="py-1 text-text-primary hover:bg-fill-secondary">Settings</DropdownMenuItem>
                <DropdownMenuSeparator className=' -mx-0 my-0'/>
                <DropdownMenuItem className="py-1 text-text-primary hover:bg-fill-secondary">Payments</DropdownMenuItem>
                <DropdownMenuSeparator className='bg-border-default -mx-0 my-0'/>
                <DropdownMenuItem className="py-1 text-text-primary hover:bg-fill-secondary">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1">
            {/* Search & New Chat*/}
            <div className='bg-fill-secondary rounded-md'>
              <Button size="icon" variant="ghost">
                <Search className="h-5 w-5" />
              </Button>
              
              {/* New Chat */}
              <Button size="icon" variant="ghost">
                <File className="h-5 w-5" />
              </Button>
            </div>


            {/* Favorites & Recents */}
            <div className='bg-fill-secondary rounded-md'>
            {/* Favorites section */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Star className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className='bg-fill-secondary gap-0 p-0'>
                    <h3 className="text-overline-small text-text-secondary font-medium px-2 pt-2">FAVORITES</h3>
                    {favorites.map((item, index) => (
                      <DropdownMenuItem key={index} className="py-1 text-text-primary hover:bg-fill-secondary">
                        {item}
                        {index < favorites.length - 1 && <DropdownMenuSeparator className='bg-border-default -mx-0 my-0'/>}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Recent chats section */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  
                  <Button variant="ghost" size="icon">
                    <Clock className="h-5 w-5" />
                  </Button>
                
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className='bg-fill-secondary gap-0 p-0'>
                    <h3 className="text-overline-small text-text-secondary font-medium px-2 pt-2 pb-1">RECENTS</h3>
                    {recents.map((item, index) => (
                      <DropdownMenuItem key={index} className="py-1 text-text-primary hover:bg-fill-secondary">
                        {item}
                        {index < recents.length - 1 && <DropdownMenuSeparator className='bg-border-default -mx-0 my-0'/>}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
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