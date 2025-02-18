import { Button } from "@/components/ui/button"
import { Expand, Minimize } from 'lucide-react'
import { useState, useEffect } from 'react'
import BasicMolViewer from "@/components/SideModule/BasicMolViewer"
import Smiles2DViewer from "@/components/Smiles2DViewer"
import { motion, AnimatePresence } from 'framer-motion'

export const MoleculeViewer = () => {
  const [view, setView] = useState("2D");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dataPdb, setDataPdb] = useState("1ZRX");
  const [dataSmiles, setDataSmiles] = useState("C1C[N+]2(CCC1[C@H](C2)OC(=O)C(C3=CC=CS3)(C4=CC=CS4)O)CCCOC5=CC=CC=C5");

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen]);

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  return (
    <>
      {isFullscreen && (
        <div className="fixed inset-0 bg-surface-background z-50">
          <div className="p-4 flex justify-between items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="bg-fill-secondary"
              onClick={toggleFullscreen}
            >
              <Minimize className="w-5 h-5" />
            </Button>
            <div className={`flex gap-1 bg-fill-secondary rounded-lg p-1 ${isFullscreen ? 'mx-auto' : ''}`}>
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
          
          <div className="w-full h-[calc(100vh-80px)]">
            {view === "3D" && dataPdb && (
              <BasicMolViewer 
                className="w-full h-full" 
                dataPdb={dataPdb}
                isFullscreen={isFullscreen}
              />
            )}
            {view === "2D" && (
              <div className="w-full h-full flex items-center justify-center">
                <Smiles2DViewer 
                  smiles={dataSmiles} 
                  isFullscreen={isFullscreen}
                />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="w-full" style={{ visibility: isFullscreen ? 'hidden' : 'visible' }}>
        <div className="p-4 flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-fill-secondary"
            onClick={toggleFullscreen}
          >
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
        
        <div className={`w-full relative ${isFullscreen ? 'h-[calc(100vh-80px)]' : 'h-[300px]'}`}>
          {view === "3D" && dataPdb && (
            <BasicMolViewer 
              className="absolute inset-0 w-full h-full" 
              dataPdb={dataPdb}
              isFullscreen={isFullscreen}
            />
          )}
          {view === "2D" && (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
              <Smiles2DViewer 
                smiles={dataSmiles}
                isFullscreen={isFullscreen}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};