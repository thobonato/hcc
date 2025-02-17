import { Button } from "@/components/ui/button"
import { Expand } from 'lucide-react'
import { useState } from 'react'
import BasicMolViewer from "@/components/BasicMolViewer";
import Smiles2DViewer from "@/components/Smiles2DViewer";

export const MoleculeViewer = () => {
  const [view, setView] = useState("2D");
  const [dataPdb, setDataPdb] = useState("1ZRX");
  const [dataSmiles, setDataSmiles] = useState("C1C[N+]2(CCC1[C@H](C2)OC(=O)C(C3=CC=CS3)(C4=CC=CS4)O)CCCOC5=CC=CC=C5");
  
  return (
    <div className="w-full">
      <div className="p-4 flex justify-between items-center">
      <Button variant="ghost" size="icon" className="bg-fill-secondary">
        <Expand className="w-5 h-5" />
      </Button>
      <div className="flex gap-1 bg-fill-secondary rounded-lg p-1">
        {["2D", "3D"].map((type) => (
        <Button 
          key={type}
          variant={view === type ? "secondary" : "ghost"}
          size="sm"
          className={`${view === type ? 'bg-fill-secondary-emphasis text-text-primary' : 'text-text-secondary'}`}
          onClick={() => setView(type)}
        >
          {type}
        </Button>
        ))}
      </div>
      </div>
      
      <div className="aspect-video w-full relative">
      {view === "3D" && dataPdb && (
        <BasicMolViewer className="absolute inset-0 w-full h-full" dataPdb={dataPdb} />
      )}
      {view === "2D" && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <Smiles2DViewer smiles={dataSmiles} />
        </div>
      )}
      </div>
    </div>
  );
  };