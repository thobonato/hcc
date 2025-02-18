
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Star, PanelRightClose } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Citations } from '@/components/sidebar/Citations';
import { MoleculeViewer } from '@/components/sidebar/modules/MoleculeViewer';
import { DataTable } from '@/components/sidebar/modules/DataTable';
import ModulesFooter from "@/components/sidebar/modules/ModulesSelector";
import { Module } from "@/lib/types";
import AnimatedTabs from "@/components/sidebar/modules/AnimatedTabs";
import type { TabOption } from "@/lib/types"


interface ModulePanelProps {
  onOpenChange?: (open: boolean) => void;
}

const ModulePanel = ({ onOpenChange }: ModulePanelProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [value, setValue] = useState("modules");
  const [showNewBadge, setShowNewBadge] = useState(true);  // Control badge visibility

  const tabs: TabOption[] = [
    {
      value: "modules",
      label: "Modules",
      badge: {
        text: "NEW",
        className: "bg-green-50 text-green-600",
        show: showNewBadge 
      }
    },
    {
      value: "citations",
      label: "Citations",
      count: 5
    }
  ];

  // hide NEW after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewBadge(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  
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
    <div className="w-full relative pov">
      <div className="relative">
        <Button 
          className={`fixed top-4 right-4 z-50 ${!isOpen ? 'bg-fill-secondary' : ''}`} 
          variant="ghost" 
          size="icon" 
          onClick={handleToggle}
        >
          <PanelRightClose className={`w-5 h-5 text-black ${isOpen ? 'text-gray-500' : ''}`}/>
        </Button>
        {!isOpen && showNewBadge && (
          <span className={`fixed mt-10 top-4 right-2 px-2 py-0.5 text-xs font-medium rounded ${'bg-green-50 text-text-green'}`}>
            <span className="inline-block w-2 h-2 mr-1 bg-text-green rounded-full"></span>
            NEW
          </span>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed top-2 right-2 bottom-2 w-[40%] bg-fill-secondary rounded-xl shadow-none overflow-y-auto"
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            
            <div className="h-full flex flex-col overflow-y-auto rounded-l-lg">
              
              {/* Header */}  
              <div className="px-4 pt-2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-normal tracking-tight">BENZENE</h1>
                  <Star className="w-4 h-4" />
                </div>
              </div>

              <Tabs value={value} onValueChange={setValue} className="w-full flex-1 flex flex-col">
                
                {/* Modules/Citations Selector */}
                <AnimatedTabs 
                  tabs={tabs} 
                  value={value}
                />

                {/* Modules */}
                <div className="flex-1 overflow-y-auto">
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