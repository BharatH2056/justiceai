import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, PlayCircle } from 'lucide-react';

export function Timeline({ timeline }) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="space-y-6 pt-6 border-t border-white/5">
      <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-text-tertiary block mb-4">
        Case Progression Timeline
      </label>
      
      <div className="space-y-4">
        {timeline.map((item, i) => {
          const isActive = item.status === 'active';
          const isCompleted = item.status === 'completed';

          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-8 pb-4 last:pb-0"
            >
              {/* Vertical Line */}
              {i < timeline.length - 1 && (
                <div className="absolute left-[11px] top-6 w-[2px] h-full bg-white/5" />
              )}

              {/* Status Icon */}
              <div className="absolute left-0 top-1">
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-accent-success" />
                ) : isActive ? (
                  <PlayCircle className="w-6 h-6 text-gold animate-pulse" />
                ) : (
                  <Clock className="w-6 h-6 text-text-tertiary" />
                )}
              </div>

              <div className="space-y-1">
                <h4 className={`text-sm font-semibold transition-colors ${isActive ? 'text-gold' : isCompleted ? 'text-white' : 'text-text-tertiary'}`}>
                  {item.stage}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed font-body">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
