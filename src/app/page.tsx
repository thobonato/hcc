"use client";
import { useState } from 'react';
import Logo from '@/components/Logo';
import BasicMolViewer from '@/components/Sidebar/Modules/BasicMolViewer';
import Smiles2DViewer from '@/components/Sidebar/Modules/Smiles2DViewer';

const Home = () => {
  const [dataPdb, setDataPdb] = useState("");
  const [inputPdbValue, setInputPdbValue] = useState("");
  const [dataSmiles, setDataSmiles] = useState("C1C[N+]2(CCC1[C@H](C2)OC(=O)C(C3=CC=CS3)(C4=CC=CS4)O)CCCOC5=CC=CC=C5");
  const [inputDataSmiles, setInputDataSmiles] = useState("");

  return (
    <div className="min-h-screen bg-surface-background font-sans w-full">
      <div className="flex justify-center pt-10">
        <h1 className="text-lg text-black">
          Human Chemical Co.
        </h1>
      </div>

      {/* content */}
      <div className="max-w-6xl mx-auto px-4">
        {/* logo */}
        <div className="flex justify-center mt-10">
          <Logo className="max-w-36 max-h-36" loopDelay={2500} />
        </div>

      {/* Link to chat (WIP) */}
      <div className="flex justify-center space-x-4 mt-10 font-sans">
        <div className="border border-black p-1">
          <button 
        onClick={() => window.location.href='/chat'} 
        className="px-2 py-1 text-black"
          >
          Chat Interface Preview
          </button>
        </div>
        <div className="border border-black p-1">
          <button 
        onClick={() => window.location.href='/test'} 
        className="px-2 py-1 text-black"
          >
        Test for SMILES to 3D
          </button>
        </div>
      </div>

        {/* viewers */}
        <div className="flex flex-col md:flex-row justify-center md:space-x-16 space-y-8 md:space-y-0 px-4">
          
          {/* 3D Viewer Container */}
          <div>
            {/* pdb data input group */}
            <div className="w-full max-w-2xl">
              {/* SMILES notice */}
              <div className="flex justify-center mt-2">
          <h1 className="text-xs text-black">
            SMILES support coming soon.
          </h1>
              </div>
              <div className="relative" style={{ width: '500px' }}>
          <input 
            type="text" 
            placeholder="Enter PDB ID (e.g. 1ZRX, 1BNA, 2HHD)" 
            className="w-full p-3 pr-24 border border-black border-b-0 focus:outline-none"
            value={inputPdbValue}
            onChange={(e) => setInputPdbValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setDataPdb(inputPdbValue);
              }
            }}
          />
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-surface-background text-black border border-black hover:bg-gray-100 hover:border-gray-800 transition-colors duration-200"
            onClick={() => setDataPdb(inputPdbValue)}
          >
            View
          </button>
              </div>
            </div>
            {/* end input */}

            <div className="w-full max-w-2xl">
              <div className="aspect-square border border-black p-4 relative flex items-center justify-center h-125 w-125">
          {dataPdb && (
            <BasicMolViewer className="absolute inset-0 w-full h-full" dataPdb={dataPdb} />
          )}
              </div>
            </div>
          </div>

          
          {/* 2D Viewer Container */}
          <div>
            {/* smiles data input group */}
            <div className="w-full max-w-2xl">
              <div className="relative mt-6" style={{ width: '500px' }}>
          <input 
            type="text" 
            placeholder="Enter SMILES data (e.g. O=C=O, default is Aclidinium)" 
            className="w-full p-3 pr-24 border border-black border-b-0 focus:outline-none"
            value={inputDataSmiles}
            onChange={(e) => setInputDataSmiles(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setDataSmiles(inputDataSmiles);
              }
            }}
          />
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-surface-background text-black border border-black hover:bg-gray-100 hover:border-gray-800 transition-colors duration-200"
            onClick={() => setDataSmiles(inputDataSmiles)}
          >
            View
          </button>
              </div>
            </div>
            {/* end input */}
            
            <div className="w-full max-w-2xl">
                <div className="aspect-square border border-black p-4 relative flex items-center justify-center h-125 w-125">
              <Smiles2DViewer 
              smiles={dataSmiles} 
              />
                </div>
            </div>
          </div>
        </div>

        {/* coming soon notice */}
        <div className="flex justify-center mt-16 mb-8">
          <h1 className="text-sm text-black">
            Stay tuned.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;