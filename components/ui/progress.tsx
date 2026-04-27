import React from 'react';
import { cn } from "@/lib/utils"

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value, max = 100, className }) => {
  const percentage = (value / max) * 100;

  return (
    <div className={cn("w-full bg-secondary rounded-full h-2.5 overflow-hidden", className)}>
      <div 
        className="bg-primary h-full rounded-full transition-all duration-300" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};