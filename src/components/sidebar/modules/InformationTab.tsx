import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

interface ChemicalInfo {
  formula: string;
  description: string;
  classification: string;
  citations: { id: string; text: string; }[];
  additional_info: string;
}

interface InformationTabProps {
  chemicalInfo: ChemicalInfo;
}

const InformationTab: React.FC<InformationTabProps> = ({ chemicalInfo }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-4 p-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1">
          <p className="text-body-regular">
            {chemicalInfo.description}
            {chemicalInfo.citations.map(citation => (
              <sup key={citation.id} className="ml-0.5 text-blue-600 cursor-pointer">
                [{citation.id}]
              </sup>
            ))}
            . This compound is classified as {chemicalInfo.classification}.
            <motion.span
              initial={false}
              animate={{
                height: isExpanded ? "auto" : 0,
                opacity: isExpanded ? 1 : 0
              }}
              transition={{
                height: { duration: 0.4, ease: "easeInOut" },
                opacity: { duration: 0.3, ease: "easeInOut", delay: isExpanded ? 0 : 0.1 }
              }}
              className="text-body-regular block overflow-hidden"
            >
              {chemicalInfo.additional_info}
            </motion.span>
          </p>
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 mt-2 text-body-regular"
          >
            <span className="tracking-[0.1em] uppercase text-text-primary">{isExpanded ? 'LESS' : 'MORE'}</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4 text-text-primary" />
            </motion.div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InformationTab;
