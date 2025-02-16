import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Maximize2, Star, Info, ExternalLink, ChevronDown } from 'lucide-react'

const ModulePanel = () => {
 return (
    <div className="w-full bg-white max-h-screen overflow-y-auto">
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b">
         <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">[Molecule Name]</h1>
            <Star className="w-5 h-5" />
         </div>
         <ExternalLink className="w-5 h-5 text-gray-500" />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="modules">
         <TabsList className="w-full">
            <TabsTrigger value="modules" className="flex-1">Modules</TabsTrigger>
            <TabsTrigger value="citations" className="flex-1">Citations (4)</TabsTrigger>
         </TabsList>

         <TabsContent value="modules">
            {/* View Controls */}
            <div className="p-4 flex justify-between">
              <Button variant="ghost" size="icon">
                 <Maximize2 className="w-5 h-5" />
              </Button>
              <div className="flex gap-2">
                 <Button variant="secondary" size="sm">2D</Button>
                 <Button variant="ghost" size="sm">3D</Button>
                 <Button variant="ghost" size="sm">Both</Button>
              </div>
            </div>

            {/* Molecule Image */}
            <div className="p-4">
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                 [Molecule Image]
              </div>
            </div>

            {/* Data Table */}
            <div className="p-4">
              <table className="w-full">
                 <thead>
                    <tr className="text-sm text-gray-500">
                      <th className="text-left">ENDPOINT</th>
                      <th className="text-right">P(ACTIVE) <Info className="w-4 h-4 inline"/></th>
                      <th className="text-right">CONFIDENCE <Info className="w-4 h-4 inline"/></th>
                    </tr>
                 </thead>
                 <tbody>
                    <tr>
                      <td className="py-2">
                         <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500"/>
                            [GHS] Skin Corrosion/Irritation
                         </div>
                      </td>
                      <td className="text-right">100%</td>
                      <td className="text-right">1.0</td>
                    </tr>
                    {/* Additional rows */}
                 </tbody>
              </table>
              
              <Button variant="ghost" className="w-full mt-4">
                 +14 more <ChevronDown className="ml-2 w-4 h-4" />
              </Button>
            </div>
         </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="p-4 border-t mt-auto">
         <div className="flex justify-between items-center">
            <span>2 Modules Selected (Default)</span>
            <ChevronDown className="w-4 h-4" />
         </div>
      </div>
    </div>
 );
};

export default ModulePanel;