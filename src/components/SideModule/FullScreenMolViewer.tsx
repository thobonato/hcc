import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    $3Dmol: any;
  }
}

interface BasicMolViewerProps {
  className?: string;
  dataPdb?: string;
  isFullscreen?: boolean;
}


const FullScreenMolViewer: React.FC<BasicMolViewerProps> = ({ className, dataPdb = "1ZRX", isFullscreen = false }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewer3DRef = useRef<any>(null);

  useEffect(() => {
    if (viewer3DRef.current) {
      viewer3DRef.current.resize();
      viewer3DRef.current.render();
    }
  }, [isFullscreen]);

  useEffect(() => {
    let scripts: HTMLScriptElement[] = [];
    let isDestroyed = false;

    const loadScripts = async () => {
      if (!window.$3Dmol) {
        const script1 = document.createElement('script');
        script1.src = 'https://3Dmol.org/build/3Dmol-min.js';
        document.body.appendChild(script1);
        scripts = [script1];
        await new Promise(resolve => script1.onload = resolve);
      }

      if (!isDestroyed) {
        initializeViewer();
      }
    };

    const initializeViewer = async () => {
      if (!viewerRef.current || !window.$3Dmol) return;

      if (viewerRef.current) {
        viewerRef.current.innerHTML = '';
      }

      const viewer = window.$3Dmol.createViewer(viewerRef.current, {
        backgroundColor: "transparent"
      });
      viewer3DRef.current = viewer;

      try {
        const response = await fetch(`https://files.rcsb.org/view/${dataPdb}.pdb`);
        const pdbData = await response.text();
        
        viewer.addModel(pdbData, "pdb");
        viewer.setStyle({}, {stick:{radius:0.1}, sphere:{radius:0.3}});
        viewer.setBackgroundColor("transparent", 0);
        viewer.spin('x',0.05);
        viewer.zoomTo();
        viewer.render();
      } catch (error) {
        console.error('Error loading PDB:', error);
      }
    };

    loadScripts();

    return () => {
      isDestroyed = true;
      scripts.forEach(script => script.parentNode?.removeChild(script));
      if (viewerRef.current) {
        viewerRef.current.innerHTML = '';
      }
    };
  }, [dataPdb, isFullscreen]);


    return (
        <div 
        ref={viewerRef}
        className={`viewer_3Dmoljs ${className}`}
        style={{ 
            position: 'relative', 
            height: 'calc(100vh - 20px)', 
            width: '100%',
            backgroundColor: 'transparent',
            padding: '10px'
        }}
        />
    );
};

export default FullScreenMolViewer;