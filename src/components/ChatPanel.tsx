// components/ChatPanel.tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowUp } from 'lucide-react'
import Logo from "./Logo"

const fakeMessages = [
 { 
   text: "What are its applications in industry?", 
   type: "related",
   count: 4
 }
];

const ChatPanel = () => {
 return (
<div className="flex flex-col">
  <ScrollArea className="flex-1 px-4">
     <div className="max-w-2xl mx-auto space-t-4 pt-4">
        {fakeMessages.map((message, index) => (
          <div key={index} 
             className={`flex items-start gap-2`}
          >
             <div className={`
                flex-1 p-3 rounded-lg
                ${message.type === 'question' ? 'bg-gray-100' : ''}
                ${message.type === 'answer' ? 'bg-white border' : ''}
                ${message.type === 'related' ? 'bg-gray-50' : ''}
             `}>
                {message.text}
             </div>
             {message.count && (
                <Button variant="ghost" size="sm" className="mt-2">
                  +{message.count}
                </Button>
             )}
          </div>
        ))}
     </div>
  </ScrollArea>

  <div className="border-t bg-white p-4">
     <div className="max-w-2xl mx-auto flex items-center gap-2">
        <Input 
          placeholder="Ask me anything about benzene..." 
          className="bg-surface-main"
        />
        <Button size="icon" className="bg-gray-100 hover:bg-gray-200">
          <ArrowUp className="h-4 w-4" />
        </Button>
     </div>
  </div>
</div>
 );
};

export default ChatPanel;