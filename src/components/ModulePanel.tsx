import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Star, PanelRightClose, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Citations } from '@/components/SideModule/Citations';
import { MoleculeViewer } from '@/components/SideModule/MoleculeViewer';
import { DataTable } from '@/components/SideModule/DataTable';

interface ModulePanelProps {
  onOpenChange?: (open: boolean) => void;
}

const ModulePanel = ({ onOpenChange }: ModulePanelProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [value, setValue] = useState("modules");

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange?.(newState);
  };

  const panelVariants = {
    initial: { x: "100%", opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.5
      }
    },
    exit: { 
      x: "100%", 
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.5
      }
    }
  };

  return (
    <div className="w-full relative">
      <Button 
        className={`fixed top-4 right-4 z-50 ${!isOpen ? 'bg-fill-secondary' : ''}`} 
        variant="ghost" 
        size="icon" 
        onClick={handleToggle}
      >
        <PanelRightClose className={`w-5 h-5 text-black ${isOpen ? 'text-gray-500' : ''}`}/>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed top-2 right-2 bottom-2 w-[40%] bg-fill-secondary overflow-hidden rounded-xl shadow-none"
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="h-full flex flex-col overflow-hidden rounded-l-lg">
              {/* Header */}
              <div className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-normal tracking-tight">BENZENE</h1>
                  <Star className="w-5 h-5" />
                </div>
              </div>

              <Tabs value={value} onValueChange={setValue} className="w-full flex-1 flex flex-col">
                <div className="bg-fill-secondary mx-4 rounded-xl">
                  <TabsList className="w-full h-14 p-1 bg-transparent relative">
                    <motion.div 
                      className="absolute top-1 left-1 w-[calc(50%-4px)] h-[calc(100%-8px)] bg-white rounded-lg shadow-none"
                      animate={{ x: value === "modules" ? "0%" : "100%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      layout
                    />
                    <TabsTrigger 
                      value="modules" 
                      className="flex-1 h-full relative rounded-lg text-text-primary z-10"
                    >
                      <div className="flex items-center gap-2">
                        <span>Modules</span>
                        <span className="px-2 py-0.5 text-xs font-medium bg-green-50 text-green-600 rounded">NEW</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="citations"
                      className="flex-1 h-full relative rounded-lg text-text-primary z-10"
                    >
                      Citations (4)
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="flex-1 overflow-auto">
                  <TabsContent value="modules" className="mt-0 h-full">
                    <div className="h-full flex flex-col">
                      {/* View Controls */}
                      <div className="p-4">
                        <MoleculeViewer/>
                      </div>

                      {/* Data Table */}
                      <div className="p-4 flex-1">
                        <DataTable/>
                      </div>

                      {/* Footer - only shown in modules tab */}
                      <div className="p-4">
                        <div className="flex justify-between items-center text-sm text-text-primary bg-fill-secondary px-4 py-4 rounded-lg">
                          <span>2 Modules Selected (Default)</span>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Citations */}
                  <TabsContent value="citations" className="h-full">
                    <Citations/>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModulePanel;