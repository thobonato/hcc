import { Button } from "@/components/ui/button"
import { Expand, Minimize, ChevronDown, ChevronUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import Basic3DViewer from "@/components/sidebar/modules/molviewer/Basic3DViewer"
import Smiles2DViewer from "@/components/sidebar/modules/molviewer/Smiles2DViewer"
import { motion, AnimatePresence } from 'framer-motion'

interface MoleculeViewerProps {
  pdb: string;
  smiles: string;
}

export const MoleculeViewer = ({ pdb, smiles }: MoleculeViewerProps) => {
  const [view, setView] = useState("2D");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMore, setShowMore] = useState(false);

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

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('moleculeViewerFullscreen', { detail: isFullscreen }));
  }, [isFullscreen]);

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  const renderInfoBlurb = () => {
    if (!isFullscreen) return null;
    
    return (
      <div className="absolute bottom-6 left-6 bg-surface-main backdrop-blur-sm rounded-md px-4 pt-2 w-[300px]">
        <h2 className="text-title text-text-primary">
          {view === "3D" ? pdb : "Molecule"}
        </h2>
        <p className="text-body-regular text-text-secondary">
          {view === "3D" 
            ? "Description of the 3D structure"
            : `SMILES: ${showMore 
                ? `\n${smiles}` 
                : `${smiles.slice(0, 20)}...`}`}
        </p>
        <AnimatePresence>
          {showMore && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="text-body-regular text-text-secondary overflow-hidden mt-1"
            >
              <p>Additional information about the molecule like properties, characteristics, etc.</p>
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          variant="ghost"
          size="sm"
          className="text-text-primary p-0"
          onClick={() => setShowMore(!showMore)}
        >
          <div className="flex items-center">
            {showMore ? "LESS " : "MORE "}
            <ChevronDown
                className={`w-4 h-4 transform transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`}
            />
          </div>
        </Button>
      </div>
    );
  };

  return (
    <>
      {isFullscreen && (
        <div className="fixed inset-0 bg-surface-background z-50">
          <div className="p-3 flex justify-between items-center">
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
          
          <div className="w-full h-[calc(100vh-80px)] relative">
            {view === "3D" && pdb && (
              <Basic3DViewer 
                className="w-full h-full" 
                dataPdb={pdb}
                isFullscreen={isFullscreen}
              />
            )}
            {view === "2D" && (
              <div className="w-full h-full flex items-center justify-center">
                <Smiles2DViewer 
                  smiles={smiles} 
                  isFullscreen={isFullscreen}
                />
              </div>
            )}
            {renderInfoBlurb()}
          </div>
        </div>
      )}

      <div className="w-full" style={{ visibility: isFullscreen ? 'hidden' : 'visible' }}>
        <div className="p-3 flex justify-between items-center">
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
          {view === "3D" && pdb && (
            <Basic3DViewer 
              className="absolute inset-0 w-full h-full" 
              dataPdb={pdb}
              isFullscreen={isFullscreen}
            />
          )}
          {view === "2D" && (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
              <Smiles2DViewer 
                smiles={smiles}
                isFullscreen={isFullscreen}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};