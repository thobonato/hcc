import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Button } from "@/components/ui/button"
  import { CircleHelp, ChevronDown } from 'lucide-react'
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
      <div className="w-full">
        <Table>
          {/* FIRST ROW */}
          <TableHeader>
            <TableRow className="text-overline bg-surface-dropdowns border-b border-border-default h-7">
              <TableHead className="w-16 h-7"/> 
              <TableHead className="text-text-secondary border-l border-border-default w-full h-7">
                ENDPOINT
              </TableHead>
              <TableHead className="text-text-secondary border-l border-border-default whitespace-nowrap px-4 h-7">
                P(ACTIVE) <CircleHelp className="w-4 h-4 inline ml-1"/>
              </TableHead>
              <TableHead className="text-text-secondary border-l border-border-default whitespace-nowrap px-4 h-7">
                CONFIDENCE <CircleHelp className="w-4 h-4 inline ml-1"/>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              
            {/* MIDDLE ROWS */}
            {displayData.map((endpoint) => (
              <TableRow key={endpoint.id} className="border-b border-border-default h-7">
                <TableCell className="h-7 p-0">
                  <div className={`h-full w-full flex items-center justify-center ${getStatusColor(endpoint.status)} bg-opacity-10`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(endpoint.status)}`} />
                  </div>
                </TableCell>
                <TableCell className="text-body-regular border-l border-border-default h-7 py-0">
                  {endpoint.name}
                </TableCell>
                <TableCell className="text-right border-l border-border-default h-7 py-0">
                  {endpoint.pActive}%
                </TableCell>
                <TableCell className="text-right border-l border-border-default h-7 py-0">
                  {endpoint.confidence}
                </TableCell>
              </TableRow>
            ))}

            {/* FINAL ROW */}
            <TableRow className="h-7">
              <TableCell className="px-3 border-b border-l border-border-default h-7">
                <div className="flex justify-center items-center h-full">
                  <div className="w-2.5 h-2.5 rounded-full bg-black"/>
                </div>
              </TableCell>
              {/* Empty cell for maintaining vertical separator */}
              <TableCell className="border-l border-b border-border-default p-0 h-7">
                <Button 
                  variant="ghost" 
                  className="w-full h-7 text-text-secondary justify-between px-4 hover:bg-transparent"
                  onClick={() => setShowAll(!showAll)}
                >
                  <span>{showAll ? 'Show Less' : `+${remainingCount} more`}</span>
                </Button>
              </TableCell>
              <TableCell className="border-l border-b border-border-default p-0 h-7"/>
              <TableCell 
                colSpan={3} 
                className="border-l border-b border-border-default p-0 h-7"
              >
                <Button 
                  variant="ghost" 
                  className="w-full h-7 text-text-secondary justify-between px-4 hover:bg-transparent"
                  onClick={() => setShowAll(!showAll)}
                >
                  <span className="flex items-center justify-end w-full">
                    {showAll ? 'HIDE' : 'SHOW'}
                    <ChevronDown 
                      className={`w-4 h-4 ml-1 transition-transform ${showAll ? 'rotate-180' : 'rotate-0'}`} 
                    />
                  </span>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }