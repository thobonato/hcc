import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Copy, CheckCircle2, RotateCcw, ThumbsDown, ThumbsUp } from 'lucide-react'
import HCCLogo from '@/app/hcc.png';
import Image from 'next/image';
import MarkdownRenderer from '@/components/chat/MarkDownRenderer';

interface ModelResponseProps {
  content: string;
  timestamp: string;
  onRegenerate?: () => void;
  onThumbsUp?: () => void;
  onThumbsDown?: () => void;
}

const ModelResponse = ({ 
  content, 
  timestamp,
  onRegenerate,
  onThumbsUp,
  onThumbsDown 
}: ModelResponseProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="mb-8">
      <div className="max-w-4xl relative">
        <div className="flex items-start pl-4">
          <div className="flex-shrink-0 pt-4 pr-4">
            <Image 
              src={HCCLogo} 
              alt="HCC Logo" 
              width={32} 
              height={32}
              className="opacity-50 mr-2"
            />
          </div>
          <div className="text-base">
            <MarkdownRenderer content={content} />
          </div>
          </div>
          <div className="flex gap-2 mt-4 pl-16">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-text-secondary rounded-lg"
              onClick={handleCopy}
            >
              {isCopied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-text-secondary rounded-lg"
              onClick={onRegenerate}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-text-secondary rounded-lg"
              onClick={onThumbsUp}
            >
              <ThumbsUp className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-text-secondary rounded-lg"
              onClick={onThumbsDown}
            >
              <ThumbsDown className="w-4 h-4" />
            </Button>
        </div>
      </div>
    </div>
  );
};

export default ModelResponse;