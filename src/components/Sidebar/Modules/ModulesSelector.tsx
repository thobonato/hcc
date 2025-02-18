import { useState, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import type { Module } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

interface ModulesFooterProps {
  availableModules: Module[];
  onModulesChange: (selectedModules: Module[]) => void;
  initialSelectedModules?: Module[];
}

const ModulesFooter = ({ 
  availableModules, 
  onModulesChange,
  initialSelectedModules 
}: ModulesFooterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedModules, setSelectedModules] = useState<Module[]>(
    initialSelectedModules || availableModules.filter(m => m.isDefault)
  );

  useEffect(() => {
    onModulesChange(selectedModules);
  }, [selectedModules, onModulesChange]);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const toggleModule = (module: Module) => {
    setSelectedModules(prev => {
      const isCurrentlySelected = prev.some(m => m.id === module.id);
      if (isCurrentlySelected) {
        return prev.filter(m => m.id !== module.id);
      } else {
        return [...prev, module];
      }
    });
  };

  const modulesByName = availableModules.reduce((acc, module) => {
    if (!acc[module.name]) {
      acc[module.name] = [];
    }
    acc[module.name].push(module);
    return acc;
  }, {} as Record<string, Module[]>);

  return (
    <div className="relative">
        <AnimatePresence>
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-full w-full p-4 pb-0"
                >
                    <div className="bg-fill-secondary rounded-lg py-2">
                        <div className="space-y-2">
                            {Object.entries(modulesByName).map(([name, modules], index, array) => (
                                <div key={name}>
                                    <div className='px-4'>
                                        {modules.map((module) => (
                                            <button
                                                key={module.id}
                                                onClick={() => toggleModule(module)}
                                                className="flex justify-between items-center w-full h-8 cursor-pointer rounded"
                                            >
                                                <span className="text-text-primary text-body-regular">{module.name}</span>
                                                {selectedModules.some(m => m.id === module.id) && (
                                                    <Check className="w-4 h-4 text-primary" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                    {index < array.length - 1 && <hr className="border-border-secondary my-1" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
        
        <div className="p-4 pt-2">
            <button
                onClick={toggleExpanded}
                className="w-full flex justify-between items-center text-body-regular text-text-primary bg-fill-secondary hover:bg-fill-secondary-emphasis transition-colors px-4 py-4 rounded-lg"
            >
                <span>
                    {selectedModules.length} Module{selectedModules.length !== 1 ? 's' : ''} Selected 
                    <span className="text-text-secondary">
                        {selectedModules.length === availableModules.filter(m => m.isDefault).length && 
                         selectedModules.every(m => m.isDefault) ? ' (Default)' : ''}
                    </span>
                </span>
                <ChevronDown
                    className={`w-4 h-4 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                />
            </button>
        </div>
    </div>
  );
};

export default ModulesFooter;