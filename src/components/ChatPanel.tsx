// components/ChatPanel.tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowUp } from 'lucide-react'

const ChatPanel = () => {
 return (
<div className="flex flex-col">

  <div className="p-4">
     <div className="max-w-4xl mx-auto flex items-center gap-2 h-12">
        <Input 
          placeholder="Ask me anything about benzene..." 
          className="bg-surface-main h-12 focus"
        />
        <Button className="h-12 px-4 bg-fill-primary-hover hover:bg-fill-primary text-gray-50 shadow-none">
            <ArrowUp size={16}/>
        </Button>
     </div>
  </div>
</div>
 );
};

export default ChatPanel;