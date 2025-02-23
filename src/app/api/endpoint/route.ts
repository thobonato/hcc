import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const STATIC_FILE = path.join(process.cwd(), 'public', 'static.json');

export const GET = async () => {
  try {
    const staticData = JSON.parse(fs.readFileSync(STATIC_FILE, 'utf-8'));
    
    // Transform the data to match all component needs
    const transformedData = {
      molecule: {
        name: staticData.molecule.name,
        formula: staticData.molecule.formula,
        smiles: staticData.molecule.smiles,
        pdb: staticData.molecule.pdb,
      },
      information: {
        description: staticData.molecule.information_module.description,
        additional_info: staticData.molecule.information_module.additional_info,
        formula: staticData.molecule.formula,
        classification: staticData.molecule.classification,
      },
      endpoints: Object.entries(staticData.body).map(([name, data]: [string, any], index) => ({
        id: String(index + 1),
        name,
        pActive: data.prob,
        confidence: data.confidence,
        status: getStatus(data.prob)
      }))
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error reading model data:', error);
    return NextResponse.json({ message: 'Error reading model data' }, { status: 500 });
  }
}

// Helper function to determine status
function getStatus(prob: number): 'high' | 'medium' | 'low' {
  if (prob >= 80) return 'high';
  if (prob >= 50) return 'medium';
  return 'low';
} 