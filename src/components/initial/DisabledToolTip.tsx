import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DisabledToolTipProps {
    message: string;
    children: ReactNode;
    disabled?: boolean;
}

const DisabledToolTip = ({ 
    message, 
    children, 
    disabled = false,
    className = '',
}: DisabledToolTipProps & { className?: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const isMovingRef = useRef(false);
    
    useEffect(() => {
        const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
            if (!triggerRef.current || !isHovered || !disabled) return;

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
                    y: e.clientY - 30 // Adjusted to position tooltip at the top right of the cursor
                });
                
                setTimeout(() => {
                    isMovingRef.current = false;
                }, 20);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isHovered, disabled]);

    if (!disabled) return <>{children}</>;

    return (
        <div 
            ref={triggerRef}
            className={`${className}`} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
            
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ 
                            duration: 0.15,
                            ease: "easeOut"
                        }}
                        style={{
                            position: 'fixed',
                            left: tooltipPosition.x,
                            top: tooltipPosition.y,
                            zIndex: 50
                        }}
                        className="px-2 py-1.5 text-text-secondary bg-app-black-4 rounded-sm pointer-events-none text-xs"
                    >
                        {message}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DisabledToolTip;