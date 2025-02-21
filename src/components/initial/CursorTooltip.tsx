import { useState, useRef, useEffect } from 'react';
import { CircleHelp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CursorTooltipProps {
  message: string;
  placeholder: string;
}

const CursorTooltip = ({ message, placeholder = "" }: CursorTooltipProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const isMovingRef = useRef(false);
  
  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      if (!triggerRef.current || !isHovered) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const triggerCenterX = triggerRect.left + triggerRect.width / 2;
      const triggerCenterY = triggerRect.top + triggerRect.height / 2;

      const distanceX = Math.abs(e.clientX - triggerCenterX);
      const distanceY = Math.abs(e.clientY - triggerCenterY);

      // If cursor too far from trigger, close tooltip
      const maxDistance = 300;
      if (distanceX > maxDistance || distanceY > maxDistance) {
        setIsHovered(false);
        return;
      }

      // Update tooltip position smoothly
      if (!isMovingRef.current) {
        isMovingRef.current = true;
        setTooltipPosition({
          x: e.clientX + 10,
          y: e.clientY + 20
        });
        
        setTimeout(() => {
          isMovingRef.current = false;
        }, 20);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered]);

  return (
    <div 
      ref={triggerRef}
      className="relative inline-block" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-1 text-text-secondary">
        <CircleHelp size={16} />
        <span>{placeholder}</span>
      </div>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ 
              duration: 0.3,
              ease: "easeOut"
            }}
            style={{
              position: 'fixed',
              left: tooltipPosition.x,
              top: tooltipPosition.y,
            }}
            className="w-64 p-2 text-xs text-text-primary bg-fill-secondary rounded-sm pointer-events-none"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CursorTooltip;