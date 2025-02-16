declare global {
  interface Window {
    $3Dmol: any;
  }
}

import React, { useEffect, useRef } from 'react';

interface BasicMolViewerProps {
  className?: string;
  dataPdb?: string;
}

const BasicMolViewer: React.FC<BasicMolViewerProps> = ({ className, dataPdb = "1ZRX" }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewer3DRef = useRef<any>(null);

  useEffect(() => {
    let scripts: HTMLScriptElement[] = [];

    const loadScripts = async () => {
      // Check if scripts are already loaded
      if (!window.$3Dmol) {
        const script1 = document.createElement('script');
        script1.src = 'https://3Dmol.org/build/3Dmol-min.js';
        
        const script2 = document.createElement('script');
        script2.src = 'https://3Dmol.org/build/3Dmol.ui-min.js';
        
        document.body.appendChild(script1);
        document.body.appendChild(script2);
        scripts = [script1, script2];

        // Wait for scripts to load
        await Promise.all([
          new Promise(resolve => script1.onload = resolve),
          new Promise(resolve => script2.onload = resolve)
        ]);
      }

      // Initialize viewer after scripts are loaded
      initializeViewer();
    };

    const initializeViewer = async () => {
      if (!viewerRef.current || !window.$3Dmol) return;

      // Clear existing viewer if any
      if (viewer3DRef.current) {
        viewer3DRef.current.removeAllModels();
      }

      // Create new viewer
      const viewer = window.$3Dmol.createViewer(viewerRef.current, {
        backgroundColor: "0xffffff"
      });
      viewer3DRef.current = viewer;

      try {
        // Fetch and load PDB data
        const response = await fetch(`https://files.rcsb.org/view/${dataPdb}.pdb`);
        const pdbData = await response.text();
        
        viewer.addModel(pdbData, "pdb");
        viewer.setStyle({}, {stick:{radius:0.1}, sphere:{radius:0.3}});
        viewer.spin('x',0.05);
        viewer.zoomTo();
        viewer.render();
      } catch (error) {
        console.error('Error loading PDB:', error);
      }
    };

    loadScripts();

    // Cleanup
    return () => {
      scripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
      if (viewer3DRef.current) {
        viewer3DRef.current.removeAllModels();
      }
    };
  }, [dataPdb]);

  return (
    <div 
      ref={viewerRef}
      className={`viewer_3Dmoljs ${className}`}
      style={{ position: 'relative' }}
    />
  );
};

export default BasicMolViewer;