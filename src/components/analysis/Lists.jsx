import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, Milestone, ExternalLink } from 'lucide-react';

export function StrategyList({ strategy }) {
  if (!strategy || !Array.isArray(strategy) || strategy.length === 0) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 border-b-2 border-white/5 pb-4">
        <div className="w-2 h-6 bg-red" />
        <h3 className="text-[11px] uppercase tracking-[0.4em] font-extrabold text-white">
          Tactical Strategy
        </h3>
      </div>

      <div className="space-y-6">
        {strategy.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-6 group"
          >
            <div className="flex-shrink-0 w-9 h-9 rounded bg-void border-2 border-red/40 flex items-center justify-center font-display text-[14px] text-white font-bold group-hover:bg-red group-hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(225,29,72,0.1)]">
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-red uppercase tracking-widest font-extrabold opacity-60 group-hover:opacity-100 transition-opacity">
                Directive_{i + 1}
              </p>
              <p className="text-[15px] leading-relaxed text-text-secondary group-hover:text-white transition-colors font-body italic">
                {step}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function LawsList({ laws }) {
  if (!laws || !Array.isArray(laws) || laws.length === 0) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 border-b-2 border-white/5 pb-4">
        <div className="w-2 h-6 bg-blue" />
        <h3 className="text-[11px] uppercase tracking-[0.4em] font-extrabold text-white">
          Statutory References
        </h3>
      </div>

      <div className="grid gap-4">
        {laws.map((law, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 rounded bg-void border-2 border-white/10 hover:border-blue/40 transition-all group shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] active:translate-x-[2px] active:translate-y-[2px]"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[10px] text-blue font-bold uppercase tracking-tight bg-blue/5 px-3 py-1 rounded border-2 border-blue/20">
                {law.act}
              </span>
              <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-blue group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-xs leading-relaxed text-text-secondary group-hover:text-white transition-colors font-body italic mb-4 border-l-2 border-white/5 pl-4">
              {law.description}
            </p>
            <a
              href={`https://indiankanoon.org/search/?formInput=${encodeURIComponent(law.act)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[9px] text-white/40 font-extrabold uppercase tracking-[0.2em] hover:text-blue hover:opacity-100 transition-all border-b border-transparent hover:border-blue pb-0.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Analyze Digital Citation
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
