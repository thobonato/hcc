import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Button } from "@/components/ui/button"
  import { Info, ChevronDown } from 'lucide-react'
  import { useState } from 'react'
  
  interface EndpointData {
    id: string;
    name: string;
    pActive: number;
    confidence: number;
    status: 'high' | 'medium' | 'low';
  }
  
  export const DataTable = () => {
    const [showAll, setShowAll] = useState(false)
    
    const endpointData: EndpointData[] = [
      {
        id: '1',
        name: '[GHS] Skin Corrosion/Irritation',
        pActive: 100,
        confidence: 1.0,
        status: 'high'
      },
      {
        id: '2', 
        name: '[GHS] Acute Toxicity',
        pActive: 85,
        confidence: 0.9,
        status: 'high'
      },
      {
        id: '3',
        name: '[GHS] Eye Damage',
        pActive: 78,
        confidence: 0.85,
        status: 'high'
      },
      {
        id: '4',
        name: '[GHS] Carcinogenicity',
        pActive: 65,
        confidence: 0.7,
        status: 'medium'
      },
      {
        id: '5',
        name: '[GHS] Respiratory Sensitization',
        pActive: 55,
        confidence: 0.6,
        status: 'medium'
      },
      {
        id: '6',
        name: 'Cytotoxicity',
        pActive: 45,
        confidence: 0.5,
        status: 'medium'
      },
      {
        id: '7',
        name: 'Cellular Activity',
        pActive: 35,
        confidence: 0.4,
        status: 'low'
      },
      {
        id: '8',
        name: 'Membrane Integrity',
        pActive: 25,
        confidence: 0.3,
        status: 'low'
      },
      {
        id: '9',
        name: 'Protein Binding',
        pActive: 15,
        confidence: 0.2,
        status: 'low'
      },
      {
        id: '10',
        name: 'Enzyme Inhibition',
        pActive: 10,
        confidence: 0.1,
        status: 'low'
      }
    ];
  
    const displayData = showAll ? endpointData : endpointData.slice(0, 3);
    const remainingCount = endpointData.length - 3;
    
    const getStatusColor = (status: EndpointData['status']) => {
      const colors: Record<EndpointData['status'], string> = {
        high: 'bg-red-500',
        medium: 'bg-yellow-500',
        low: 'bg-green-500'
      }
      return colors[status]
    }
  
    return (
      <div className="w-full p-4">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-gray-500 font-normal">ENDPOINT</TableHead>
              <TableHead className="text-right text-gray-500 font-normal">
                P(ACTIVE) <Info className="w-4 h-4 inline ml-1 text-gray-400"/>
              </TableHead>
              <TableHead className="text-right text-gray-500 font-normal">
                CONFIDENCE <Info className="w-4 h-4 inline ml-1 text-gray-400"/>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayData.map((endpoint) => (
              <TableRow key={endpoint.id} className="hover:bg-transparent">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${getStatusColor(endpoint.status)}`}/>
                    {endpoint.name}
                  </div>
                </TableCell>
                <TableCell className="text-right">{endpoint.pActive}%</TableCell>
                <TableCell className="text-right">{endpoint.confidence}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <Button 
          variant="ghost" 
          className="w-full text-text-secondary"
          onClick={() => setShowAll(!showAll)}
        >
          <span className="">
            {showAll ? 'Show Less' : `+${remainingCount} more`}
          </span>
          <ChevronDown className={`ml-2 w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
        </Button>
      </div>
    )
  }