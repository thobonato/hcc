"use client";
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    $3Dmol: any;
    fs: {
      readFile: (path: string, options?: { encoding?: string }) => Promise<Uint8Array | string>;
    };
  }
}

const TestPage = () => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewer3DRef = useRef<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let scripts: HTMLScriptElement[] = [];

    const loadScripts = async () => {
      try {
        if (!window.$3Dmol) {
          const script1 = document.createElement('script');
          const script2 = document.createElement('script');
          
          script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js';
          script2.src = 'https://3Dmol.org/build/3Dmol-min.js';
          
          // Add scripts to document
          document.body.appendChild(script1);
          document.body.appendChild(script2);
          scripts = [script1, script2];

          // Wait for both scripts to load
          await Promise.all([
            new Promise((resolve) => {
              script1.onload = resolve;
            }),
            new Promise((resolve) => {
              script2.onload = resolve;
            })
          ]);

          // Small delay to ensure scripts are fully initialized
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        if (isMounted) {
          await initializeViewer();
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError('Error loading scripts: ' + err);
          setIsLoading(false);
        }
      }
    };

    const initializeViewer = async () => {
      if (!viewerRef.current || !window.$3Dmol) return;

      try {
        // Clear any existing viewer
        if (viewer3DRef.current) {
          viewer3DRef.current.removeAllModels();
        }

        // Create new viewer with specific config
        const config = {
          backgroundColor: "white",
          antialias: true,
          defaultcolors: window.$3Dmol.rasmolElementColors
        };

        const viewer = window.$3Dmol.createViewer(
          viewerRef.current,
          config
        );
        
        viewer3DRef.current = viewer;

        // Sample SDF data
        const sdfData = `
     RDKit          3D

  0  0  0  0  0  0  0  0  0  0999 V3000
M  V30 BEGIN CTAB
M  V30 COUNTS 11 10 0 0 0
M  V30 BEGIN ATOM
M  V30 1 C 0.0834427 1.71067 1.20428 0
M  V30 2 C 0.335239 0.321536 0.631063 0
M  V30 3 N 0.982037 -0.527727 1.63248 0
M  V30 4 O 1.33478 -1.70384 1.04112 0
M  V30 5 H 1.04296 2.17272 1.51996 0
M  V30 6 H -0.597376 1.64681 2.07959 0
M  V30 7 H -0.387544 2.35403 0.431419 0
M  V30 8 H -0.632442 -0.127275 0.31376 0
M  V30 9 H 0.99342 0.417983 -0.26042 0
M  V30 10 H 0.306245 -0.721446 2.41194 0
M  V30 11 H 0.510219 -2.25656 0.970686 0
M  V30 END ATOM
M  V30 BEGIN BOND
M  V30 1 1 1 2
M  V30 2 1 2 3
M  V30 3 1 3 4
M  V30 4 1 1 5
M  V30 5 1 1 6
M  V30 6 1 1 7
M  V30 7 1 2 8
M  V30 8 1 2 9
M  V30 9 1 3 10
M  V30 10 1 4 11
M  V30 END BOND
M  V30 END CTAB
M  END
$$$$
`;

        // Add model and set style
        viewer.addModel(sdfData, "sdf");
        viewer.setStyle({}, {stick:{radius:0.15}, sphere:{radius:0.25}});
        viewer.zoomTo();

        // Render continuously for smooth rotation
        const animate = () => {
          if (viewer3DRef.current) {
            viewer3DRef.current.rotate(1);
            viewer3DRef.current.render();
            requestAnimationFrame(animate);
          }
        };
        
        animate();
        
      } catch (err) {
        if (isMounted) {
          setError('Error initializing viewer: ' + err);
        }
      }
    };

    loadScripts();

    return () => {
      isMounted = false;
      scripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
      if (viewer3DRef.current) {
        viewer3DRef.current.removeAllModels();
      }
    };
  }, []);

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">3D Molecule Viewer</h1>
      {isLoading && (
        <div className="text-blue-500 mb-4">Loading viewer...</div>
      )}
      {error && (
        <div className="text-red-500 mb-4">
          Error: {error}
        </div>
      )}
      <div
        ref={viewerRef}
        className="viewer_3Dmoljs"
        style={{ 
          position: 'relative', 
          height: '1000px', 
          width: '100%',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: 'white'
        }}
      />
    </div>
  );
};

export default TestPage;