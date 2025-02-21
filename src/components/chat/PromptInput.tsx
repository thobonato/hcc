import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUp } from 'lucide-react'

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

const PromptInput = ({ value, onChange, onSubmit, placeholder = "Enter a SMILES string" }: PromptInputProps) => {
  return (
    <div className="px-12 pb-10">
      <div className="max-w-4xl mx-auto flex items-center h-12">
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
          className="w-full h-12 px-4 bg-surface-main border-none focus-visible:ring-0 focus:border-gray-300 rounded-l-lg shadow-none"
        />
        <Button 
          onClick={onSubmit} 
          className={`h-12 px-4 ${value.trim() ? 'bg-fill-primary' : 'bg-fill-primary-hover'} text-gray-50 shadow-none ml-[4px]`}
        >
          <ArrowUp size={16}/>
        </Button>
      </div>
    </div>
  );
};

export default PromptInput;