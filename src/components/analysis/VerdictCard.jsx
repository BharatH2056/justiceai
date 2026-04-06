import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, AlertTriangle, Scale } from 'lucide-react';

export function VerdictCard({ verdict, confidence }) {
  const variants = {
    win: {
      label: 'favorable',
      icon: Trophy,
      color: 'text-accent-success',
      bg: 'bg-accent-success/10',
      border: 'border-accent-success/20',
      description: 'The facts of your case align strongly with established Indian legal precedents.'
    },
    loss: {
      label: 'unfavorable',
      icon: AlertTriangle,
      color: 'text-accent-error',
      bg: 'bg-accent-error/10',
      border: 'border-accent-error/20',
      description: 'Based on the current information, there are significant legal hurdles to overcome.'
    },
    partial: {
      label: 'partial',
      icon: Scale,
      color: 'text-accent-warning',
      bg: 'bg-accent-warning/10',
      border: 'border-accent-warning/20',
      description: 'Your case has merit, but the outcome may depend heavily on specific document evidence.'
    }
  };

  const config = variants[verdict] || variants.partial;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-2xl border ${config.bg} ${config.border} space-y-4 shadow-lg active:scale-[0.99] transition-transform cursor-default`}
    >
      <div className="flex items-center justify-between">
        <div className={`p-2.5 rounded-xl bg-void/50 border ${config.border} shadow-inner`}>
          <Icon className={`w-6 h-6 ${config.color}`} />
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary font-bold">Predicted Outcome</p>
          <h3 className={`text-2xl font-display font-semibold ${config.color} capitalize`}>{config.label}</h3>
        </div>
      </div>
      
      <p className="text-sm font-body text-text-secondary leading-relaxed">
        {config.description}
      </p>

      <div className="space-y-2 pt-2">
        <div className="flex justify-between items-end">
          <span className="text-[10px] uppercase font-bold tracking-widest text-text-tertiary">Confidence Score</span>
          <span className="text-sm font-display text-gold-light font-bold">{confidence}%</span>
        </div>
        <div className="h-2 bg-void/50 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${confidence}%` }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="h-full gold-gradient shadow-[0_0_10px_rgba(212,175,55,0.4)]" 
          />
        </div>
      </div>
    </motion.div>
  );
}
