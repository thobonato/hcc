import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from 'framer-motion'
import type { TabOption } from "@/lib/types";

interface AnimatedTabsProps {
  tabs: TabOption[];
  value: string;
  className?: string;
}

const AnimatedTabs = ({ tabs, value, className = "m-4" }: AnimatedTabsProps) => {
    const activeIndex = tabs.findIndex(tab => tab.value === value);
  const tabWidth = 100 / tabs.length;

  return (
    <div className={`bg-fill-secondary rounded-xl ${className}`}>
      <TabsList className="w-full h-14 p-1 bg-transparent relative">
        <motion.div 
          className="absolute top-1 left-1 h-[calc(100%-8px)] bg-surface-background rounded-lg shadow-none"
          style={{ width: `calc(${tabWidth}% - 4px)` }}
          animate={{ x: `${activeIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          layout
        />
        {tabs.map((tab) => (
          <TabsTrigger 
            key={tab.value}
            value={tab.value} 
            className={`flex-1 h-full relative rounded-lg z-10 ${
              value === tab.value ? 'text-text-primary' : 'text-text-secondary'
            }`}
          >
            <div className="flex items-center gap-2">
              {typeof tab.label === 'string' ? <span>{tab.label}</span> : tab.label}
              {tab.badge?.show && (
                <span className={`px-2 py-0.5 text-xs font-medium rounded ${tab.badge.className || 'bg-green-50 text-green-600'}`}>
                  {tab.badge.text}
                </span>
              )}
              {tab.count !== undefined && (
                <span>({tab.count})</span>
              )}
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
};

export default AnimatedTabs;