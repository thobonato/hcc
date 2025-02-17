import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Expand, Star, Info, PanelRightClose, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
            <div className="h-full overflow-y-auto rounded-l-lg">
              {/* Header */}
              <div className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-normal tracking-tight">BENZENE</h1>
                  <Star className="w-5 h-5" />
                </div>
              </div>

            <Tabs value={value} onValueChange={setValue} className="w-full">
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

                <TabsContent value="modules" className="mt-0">
                  {/* View Controls */}
                  <div className="p-4 flex justify-between items-center">
                    <Button variant="ghost" size="icon" className="bg-fill-secondary">
                      <Expand className="w-5 h-5" />
                    </Button>
                    <div className="flex gap-1">
                      <Button 
                        variant="secondary"
                        size="sm" 
                        className="bg-gray-100 hover:bg-gray-200 text-black font-normal"
                      >
                        2D
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-black font-normal"
                      >
                        3D
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-gray-400 font-normal"
                      >
                        Both
                      </Button>
                    </div>
                  </div>

                  {/* Molecule Image */}
                  <div className="px-4">
                    <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center">
                      [Molecule Image]
                    </div>
                  </div>

                  {/* Data Table */}
                  <div className="p-4">
                    <table className="w-full">
                      <thead>
                        <tr className="text-sm text-gray-500">
                          <th className="text-left font-normal py-2">ENDPOINT</th>
                          <th className="text-right font-normal py-2">
                            P(ACTIVE) <Info className="w-4 h-4 inline ml-1 text-gray-400"/>
                          </th>
                          <th className="text-right font-normal py-2">
                            CONFIDENCE <Info className="w-4 h-4 inline ml-1 text-gray-400"/>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-red-500"/>
                              [GHS] Skin Corrosion/Irritation
                            </div>
                          </td>
                          <td className="text-right">100%</td>
                          <td className="text-right">1.0</td>
                        </tr>
                        <tr className="border-t">
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-yellow-500"/>
                              [GHS] Acute Toxicity
                            </div>
                          </td>
                          <td className="text-right">34%</td>
                          <td className="text-right">0.5</td>
                        </tr>
                        <tr className="border-t">
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-green-500"/>
                              Cellular Activity
                            </div>
                          </td>
                          <td className="text-right">20%</td>
                          <td className="text-right">0.5</td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full mt-4 text-gray-500 hover:bg-gray-50"
                    >
                      <span className="text-gray-400">+14 more</span>
                      <ChevronDown className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="citations">
                  {/* Citations content */}
                </TabsContent>
              </Tabs>

              {/* Footer */}
              <div className="p-4 border-t mt-auto">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>2 Modules Selected (Default)</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModulePanel;