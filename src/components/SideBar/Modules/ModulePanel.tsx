import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Star, PanelRightClose, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Citations } from '@/components/SideBar/Citations';
import { MoleculeViewer } from '@/components/SideBar/Modules/MoleculeViewer';
import { DataTable } from '@/components/SideBar/Modules/DataTable';
import ModulesFooter from "@/components/SideBar/Modules/ModulesSelector";
import { Module } from "@/lib/types";

interface ModulePanelProps {
  onOpenChange?: (open: boolean) => void;
}

const ModulePanel = ({ onOpenChange }: ModulePanelProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [value, setValue] = useState("modules");
  
  const availableModules: Module[] = [
    { id: '1', name: 'Visuals', isDefault: true },
    { id: '2', name: 'Information', isDefault: false },
    { id: '3', name: 'Endpoints', isDefault: true },
  ];

  const [activeModules, setActiveModules] = useState<Module[]>(
    availableModules.filter(m => m.isDefault)
  );

  const handleModulesChange = (selectedModules: Module[]) => {
    setActiveModules(selectedModules);
  };

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
  const renderModuleContent = (module: Module) => {
    switch (module.name) {
      case 'Visuals':
        return <MoleculeViewer />;
      case 'Information':
        return (
          <div className="p-4 bg-surface-background rounded-lg m-4">
            <p className="text-text-primary">Information to be placed here</p>
          </div>
        );
      case 'Endpoints':
        return <DataTable />;
      default:
        return null;
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
            className="fixed top-2 right-2 bottom-2 w-[40%] bg-fill-secondary rounded-xl shadow-none overflow-hidden"
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            
            <div className="h-full flex flex-col overflow-hidden rounded-l-lg">
              
              {/* Header */}  
              <div className="px-4 pt-2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-normal tracking-tight">BENZENE</h1>
                  <Star className="w-4 h-4" />
                </div>
              </div>

              {/* Modules/Citations Selector */}
              <Tabs value={value} onValueChange={setValue} className="w-full flex-1 flex flex-col">
                <div className="bg-fill-secondary rounded-xl m-4">
                  <TabsList className="w-full h-14 p-1 bg-transparent relative">
                    <motion.div 
                      className="absolute top-1 left-1 w-[calc(50%-4px)] h-[calc(100%-8px)] bg-surface-background rounded-lg shadow-none"
                      animate={{ x: value === "modules" ? "0%" : "100%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      layout
                    />
                    <TabsTrigger 
                      value="modules" 
                      className={`flex-1 h-full relative rounded-lg z-10 ${value === "modules" ? 'text-text-primary' : 'text-text-secondary'}`}
                    >
                      <div className="flex items-center gap-2">
                        <span>Modules</span>
                        <span className="px-2 py-0.5 text-xs font-medium bg-green-50 text-green-600 rounded">NEW</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="citations"
                      className={`flex-1 h-full relative rounded-lg ${value === "citations" ? 'text-text-primary' : 'text-text-secondary'} z-10`}
                    >
                      Citations (5)
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Modules */}
                <div className="flex-1 overflow-hidden">
                <TabsContent value="modules" className="mt-0 h-full">
                  <div className="h-full flex flex-col">
                    {/* Scrollable content area */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide pb-4">
                      {availableModules
                        .filter(module => activeModules.some(active => active.id === module.id))
                        .sort((a, b) => parseInt(a.id) - parseInt(b.id))
                        .map((module) => (
                          <div key={module.id}>
                            {renderModuleContent(module)}
                          </div>
                        ))}
                    </div>

                    {/* Modules Selector */}
                    <div className="flex-shrink-0">
                      <ModulesFooter
                        availableModules={availableModules}
                        onModulesChange={handleModulesChange}
                        initialSelectedModules={availableModules.filter(m => m.isDefault)}
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Citations */}
                <TabsContent value="citations" className="mt-0 h-full">
                  <div className="h-full flex flex-col">
                    <Citations/>
                  </div>
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