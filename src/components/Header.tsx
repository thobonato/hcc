import React, { useState } from 'react';
import { User, Search, File, Star, Clock, CircleHelp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
    <header className="w-full bg-white border-b">
      <div className="max-w-screen-xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Profile Section */}
          <div className="flex items-center space-x-0">
            
            {/* IF LOGGED IN HERE */}
            {/* <img src="/api/placeholder/32/32" alt="Profile" className="w-8 h-8 rounded-full" /> */}
            {/* <span className="text-sm">info@fennell.cv</span> */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-2 hover:bg-transparent">
                    <User/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Payments</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <Button size="icon" className='bg-gray-100'>
              <Search className="h-5 w-5" />
            </Button>
            
            {/* New Chat */}
            <Button size="icon" className='bg-gray-100'>
              <File className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Star className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className="p-2">
                  <h3 className="text-sm font-medium mb-2">FAVORITES</h3>
                  {favorites.map((item, index) => (
                    <DropdownMenuItem key={index}>{item}</DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                
                {/* Clock */}
                <Button variant="ghost" size="icon">
                  <Clock className="h-5 w-5" />
                </Button>
              
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className="p-2">
                  <h3 className="text-sm font-medium mb-2">RECENTS</h3>
                  {recents.map((item, index) => (
                    <DropdownMenuItem key={index}>{item}</DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Circle Help */}
            <Button variant="ghost" size="icon">
              <CircleHelp className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;