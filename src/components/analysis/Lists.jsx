import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, Gavel } from 'lucide-react';

export function StrategyList({ strategy }) {
  if (!strategy || strategy.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-white/5 pb-4">
        <CheckCircle2 className="w-5 h-5 text-gold" />
        <h3 className="text-sm uppercase tracking-widest font-bold text-text-secondary">Legal Strategy</h3>
      </div>
      
      <div className="space-y-4">
        {strategy.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex gap-4 group"
          >
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-raised border border-gold/20 flex items-center justify-center font-display text-xs text-gold font-bold group-hover:border-gold/40 transition-colors shadow-sm">
              {i + 1}
            </div>
            <p className="text-[14px] leading-relaxed text-text-secondary group-hover:text-text-primary transition-colors">
              {step}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function LawsList({ laws }) {
  if (!laws || laws.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-white/5 pb-4">
        <Gavel className="w-5 h-5 text-gold" />
        <h3 className="text-sm uppercase tracking-widest font-bold text-text-secondary">Relevant Laws (India)</h3>
      </div>
      
      <div className="grid gap-3">
        {laws.map((law, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="p-4 rounded-xl bg-raised border border-white/5 hover:border-gold/20 transition-all group shadow-sm active:scale-[0.98]"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-mono text-[11px] text-gold-light uppercase tracking-tighter bg-gold/5 px-2 py-0.5 rounded border border-gold/10">
                {law.act}
              </span>
              <ChevronRight className="w-4 h-4 text-text-tertiary group-hover:text-gold transition-colors" />
            </div>
            <p className="text-xs leading-relaxed text-text-secondary group-hover:text-text-primary transition-colors italic">
              {law.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
