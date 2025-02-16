
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    SmiDrawer: any;
  }
}

const Smiles2DViewer = ({ 
  smiles = '', 
  width = 400, 
  height = 400,
  theme = 'light',
  options = {}
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error] = useState(null);
  const [uniqueId] = useState(`smiles-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const loadSmilesDrawer = async () => {
      if (!window.SmiDrawer) {
        try {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/smiles-drawer@2.0.1/dist/smiles-drawer.min.js';
          script.async = true;
          
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load SmilesDrawer library'));
            document.body.appendChild(script);
          });
          
          setIsLoaded(true);
        } catch (err) {
          return;
        }
      } else {
        setIsLoaded(true);
      }
    };

    loadSmilesDrawer();
  }, []);

  useEffect(() => {
    if (isLoaded && containerRef.current && smiles) {
      try {
        // Default options that work well for most cases
        const defaultOptions = {
          width,
          height,
          bondThickness: 1.2,
          atomVisualization: 'default',
          isomeric: true,
          debug: false,
          terminalCarbons: true,
          explicitHs: false,
          overlapSensitivity: 0.42,
          overlapResolutionIterations: 1,
          compactDrawing: true
        };

        const smilesDrawer = new window.SmiDrawer(
          { ...defaultOptions, ...options },
          { spacedDrawing: true }
        );

        // Clear previous content
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }

        // Create new SVG element
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('id', uniqueId);
        svg.setAttribute('class', 'w-full h-full');
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        containerRef.current.appendChild(svg);

        // Draw the molecule
        smilesDrawer.draw(smiles, `#${uniqueId}`, theme);
      } catch (err) {
        console.error('Error rendering molecule:', err);
      }
    }
  }, [isLoaded, smiles, width, height, theme, options, uniqueId]);

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center" role="alert">
        {error}
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[100px]">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="w-full aspect-square"
      style={{ maxWidth: width, maxHeight: height }}
    />
  );
};

export default Smiles2DViewer;