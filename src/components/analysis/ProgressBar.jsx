import React from 'react';
import { motion } from 'framer-motion';

export function ProgressBar({ progress = 0 }) {
  // progress is 0-100
  const stages = [
    { label: "Intake", threshold: 20 },
    { label: "Facts", threshold: 50 },
    { label: "Analysis", threshold: 80 },
    { label: "Strategy", threshold: 100 }
  ];

  return (
    <div className="w-full space-y-3 py-4 border-b border-white/5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-text-tertiary">
          Case Profile Completion
        </span>
        <span className="text-[10px] font-mono text-gold font-bold">
          {progress}%
        </span>
      </div>

      <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute h-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.4)]"
        />
      </div>

      <div className="flex justify-between">
        {stages.map((stage, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className={`w-1 h-1 rounded-full ${progress >= stage.threshold ? 'bg-gold' : 'bg-white/10'}`} />
            <span className={`text-[8px] uppercase tracking-widest font-bold ${progress >= stage.threshold ? 'text-gold-light' : 'text-text-tertiary'}`}>
              {stage.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
