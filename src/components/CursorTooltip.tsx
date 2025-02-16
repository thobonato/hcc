import { useState } from 'react';
import { Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CursorTooltip = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="relative inline-block" 
         onMouseMove={handleMouseMove}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}>
      <button className="flex items-center space-x-1 text-gray-400">
        <Info size={16} />
        <span>What's a SMILES string?</span>
      </button>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              left: mousePosition.x + 10,
              top: mousePosition.y + 20,
            }}
            className="w-64 p-2 text-xs text-black bg-gray-100 rounded-sm shadow-lg"
          >
            A SMILES string (Simplified Molecular Input Line Entry System) is a text-based representation of a molecular structure. It encodes a molecule's atoms, bonds, and connectivity in a linear and human-readable format.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CursorTooltip;