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
  
  export interface EndpointData {
    id: string;
    name: string;
    pActive: number;
    confidence: number;
    status: 'high' | 'medium' | 'low';
  }
  
  interface DataTableProps {
    data: EndpointData[];
    loading: boolean;
  }
  
  export const DataTable = ({ data, loading }: DataTableProps) => {
    const [showAll, setShowAll] = useState(false)
    
    // Sort data by pActive in descending order
    const sortedData = [...data].sort((a, b) => b.pActive - a.pActive);
    const displayData = showAll ? sortedData : sortedData.slice(0, 3);
    const remainingCount = Math.max(0, data.length - 3);
    
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
        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-text-secondary border-t-transparent" />
            <div className="text-text-secondary text-body-regular">
              Loading endpoint data...
            </div>
          </div>
        ) : (
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
        )}
      </div>
    );
  }