import { Button } from "@/components/ui/button"
import { Expand } from 'lucide-react'
import { useState } from 'react'

export const MoleculeViewer = () => {
    const [view, setView] = useState("2D");
    
    return (
      <div className="w-full">
        <div className="p-4 flex justify-between items-center">
          <Button variant="ghost" size="icon" className="bg-fill-secondary">
            <Expand className="w-5 h-5" />
          </Button>
          <div className="flex gap-1">
            {["2D", "3D", "Both"].map((type) => (
              <Button 
                key={type}
                variant={view === type ? "secondary" : "ghost"}
                size="sm"
                className={`${view === type ? 'bg-white' : ''} text-black font-normal`}
                onClick={() => setView(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
        <div className="px-4">
          <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center">
            [Molecule Image]
          </div>
        </div>
      </div>
    );
  };