import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, FileText, Send, Download, Scale, Gavel } from 'lucide-react';
import { VerdictCard } from './VerdictCard';
import { StrategyList, LawsList } from './Lists';
import { Timeline } from './Timeline';
import { ProgressBar } from './ProgressBar';
import { CourtroomPrepCard } from './CourtroomPrepCard';

export function ArgumentsPanel({ forArgs, againstArgs }) {
  return (
    <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
      <div className="space-y-4">
        <label className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-accent-success">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Proactive Arguments</span>
        </label>
        <ul className="space-y-2">
          {forArgs?.map((arg, i) => (
            <li key={i} className="text-xs text-text-secondary leading-relaxed bg-accent-success/5 p-3 rounded-lg border border-accent-success/10 font-body">
              {arg}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <label className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-accent-error">
          <XCircle className="w-3.5 h-3.5" />
          <span>Counter These</span>
        </label>
        <ul className="space-y-2">
          {againstArgs?.map((arg, i) => (
            <li key={i} className="text-xs text-text-secondary leading-relaxed bg-accent-error/5 p-3 rounded-lg border border-accent-error/10 font-body">
              {arg}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function AnalysisPanel({ analysis, onExport, isLoading, progress = 0 }) {
  if (!analysis && progress < 20) {
    return (
      <div className="h-full flex flex-col pt-2 md:pt-4">
        <div className="px-6 pb-4">
          <ProgressBar progress={progress} />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-gold/5 flex items-center justify-center border border-gold/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gold/5 animate-pulse" />
                <Scale className="w-10 h-10 text-gold relative z-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-display text-white italic">Awaiting Case Details</h3>
            <p className="text-sm text-text-secondary max-w-[280px] leading-relaxed mx-auto font-body">
              Describe your situation in the chat. My legal co-pilot brain will 
              extract key factors and build your strategy automatically.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If we have some progress but no formal analysis yet, show the progress bar
  if (!analysis) {
    return (
      <div className="h-full flex flex-col pt-2 md:pt-4">
        <div className="px-6 pb-4">
          <ProgressBar progress={progress} />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-gold/20 border-t-gold animate-spin" />
          <p className="text-sm text-gold font-display italic tracking-widest uppercase">Building Strategy Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col pt-2 md:pt-4"
    >
      {/* Fixed Progress at top */}
      <div className="px-6 pb-4">
          <ProgressBar progress={progress} />
      </div>

      <div className="flex-1 overflow-y-auto px-6 space-y-12 pb-24 custom-scrollbar">
        {/* Header Section */}
        <div className="space-y-6">
            <div className="flex items-center justify-between pt-2">
                <span className="px-3 py-1 bg-gold/10 text-gold-light text-[10px] uppercase font-bold tracking-[0.2em] rounded-full border border-gold/20">
                    {analysis.caseType || "Legal Inquiry"}
                </span>
                <span className="text-[10px] text-text-tertiary font-bold tracking-widest uppercase">
                    Case ID: JAI-{Math.floor(Math.random() * 8999) + 1000}
                </span>
            </div>
            
            <VerdictCard verdict={analysis.verdict} confidence={analysis.confidence} />
        </div>

        {/* Timeline Visualization */}
        <Timeline timeline={analysis.timeline} />

        {/* Actionable Content */}
        <div className="grid gap-12 pt-8 border-t border-white/5">
            <StrategyList strategy={analysis.strategy} />
            <LawsList laws={analysis.laws} />
        </div>

        {/* Courtroom Preparation */}
        <CourtroomPrepCard prep={analysis.courtroomPrep} grounds={analysis.constitutionalGrounds} />

        {/* Arguments Mapping */}
        <ArgumentsPanel forArgs={analysis.arguments?.for} againstArgs={analysis.arguments?.against} />

        {/* Export Action */}
        <div className="pt-8 border-t border-white/5 pb-12">
          <button 
            onClick={onExport}
            className="w-full flex items-center justify-center gap-3 bg-raised hover:bg-float text-gold border border-gold/20 px-6 py-4 rounded-2xl font-medium transition-all group active:scale-[0.98] shadow-lg"
          >
            <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Generate & Export Legal Summary</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
