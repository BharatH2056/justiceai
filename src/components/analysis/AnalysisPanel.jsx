import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, FileText, Send, Download, Scale, Milestone } from 'lucide-react';
import { VerdictCard } from './VerdictCard';
import { StrategyList, LawsList } from './Lists';
import { Timeline } from './Timeline';
import { ProgressBar } from './ProgressBar';
import { CourtroomPrepCard } from './CourtroomPrepCard';

export function ArgumentsPanel({ forArgs, againstArgs }) {
  return (
    <div className="grid md:grid-cols-2 gap-8 pt-8 border-t-2 border-white/5">
      <div className="space-y-6">
        <label className="flex items-center gap-3 text-[10px] uppercase font-extrabold tracking-[0.4em] text-accent-success">
          <CheckCircle2 className="w-4 h-4" />
          <span>Proactive Arguments</span>
        </label>
        <ul className="space-y-3">
          {forArgs?.map((arg, i) => (
            <li
              key={i}
              className="text-[11px] text-text-secondary leading-relaxed bg-void p-5 rounded border-2 border-accent-success/20 font-body shadow-[4px_4px_0px_0px_rgba(34,197,94,0.05)] italic"
            >
              {arg}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-6">
        <label className="flex items-center gap-3 text-[10px] uppercase font-extrabold tracking-[0.4em] text-red">
          <XCircle className="w-4 h-4" />
          <span>Counter Measures</span>
        </label>
        <ul className="space-y-3">
          {againstArgs?.map((arg, i) => (
            <li
              key={i}
              className="text-[11px] text-text-secondary leading-relaxed bg-void p-5 rounded border-2 border-red/20 font-body shadow-[4px_4px_0px_0px_rgba(225,29,72,0.05)] italic"
            >
              {arg}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const JURISDICTION_RESOURCES = {
  National: {
    court: 'Supreme Court of India',
    link: 'https://main.sci.gov.in',
    slsa: 'NALSA',
    help: '15100',
  },
  Delhi: {
    court: 'Delhi High Court',
    link: 'https://delhihighcourt.nic.in',
    slsa: 'DSLSA',
    help: '1516',
  },
  Maharashtra: {
    court: 'Bombay High Court',
    link: 'https://bombayhighcourt.nic.in',
    slsa: 'MSLSA',
    help: '022-22691395',
  },
  Karnataka: {
    court: 'Karnataka High Court',
    link: 'https://karnatakajudiciary.kar.nic.in',
    slsa: 'KSLSA',
    help: '1800-425-9090',
  },
  'Tamil Nadu': {
    court: 'Madras High Court',
    link: 'https://hcmadras.tn.gov.in',
    slsa: 'TNSLSA',
    help: '044-25342441',
  },
  'West Bengal': {
    court: 'Calcutta High Court',
    link: 'https://calcuttahighcourt.gov.in',
    slsa: 'WBSLSA',
    help: '1800-345-3888',
  },
};

export default function AnalysisPanel({
  analysis,
  selectedJurisdiction = 'National',
  onExport,
  isLoading,
  progress = 0,
}) {
  const resource =
    JURISDICTION_RESOURCES[selectedJurisdiction] || JURISDICTION_RESOURCES['National'];

  if (!analysis && progress < 20) {
    return (
      <div className="h-full flex flex-col pt-4">
        <div className="px-8 pb-6">
          <ProgressBar progress={progress} />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-8">
          <div className="w-24 h-24 rounded-2xl bg-void border-2 border-white/5 flex items-center justify-center shadow-[12px_12px_0px_0px_rgba(0,0,0,0.8)] relative group">
            <div className="absolute inset-0 bg-red/5 p-2 animate-pulse rounded-2xl" />
            <Scale className="w-12 h-12 text-red relative z-10 group-hover:scale-110 transition-transform" />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-display font-bold text-white uppercase tracking-widest">
              Awaiting Case Log
            </h3>
            <p className="text-xs text-text-tertiary max-w-[320px] leading-relaxed mx-auto font-body uppercase tracking-wider italic">
              Initialize the Engine via the Command Console or upload an evidence dossier to begin
              the tactical strategy sequence.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Loading state with Research Pulse
  if (isLoading || (!analysis && progress >= 20)) {
    return (
      <div className="h-full flex flex-col pt-4">
        <div className="px-8 pb-6">
          <ProgressBar progress={progress} />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-10">
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-x-[-60px] inset-y-[-60px] bg-red/20 rounded-full blur-3xl opacity-20"
            />
            <div className="w-16 h-16 rounded-xl border-4 border-white/5 border-t-red animate-spin relative z-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]" />
          </div>
          <div className="space-y-4 relative z-10">
            <p className="text-lg text-red font-display font-bold italic tracking-[0.4em] uppercase">
              RAG ENGINE PULSE
            </p>
            <p className="text-[10px] text-text-tertiary font-extrabold uppercase tracking-[0.3em] animate-pulse">
              DECODING {selectedJurisdiction} STATUTES...
            </p>
          </div>
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
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b-2 border-white/5 pb-4">
            <span className="px-4 py-1.5 bg-red/10 text-red-light text-[10px] uppercase font-extrabold tracking-[0.3em] rounded border-2 border-red/20 shadow-[4px_4px_0px_0px_rgba(225,29,72,0.1)]">
              {analysis.caseType || 'Operational Logic'}
            </span>
            <span className="text-[9px] text-white/40 font-extrabold tracking-[0.2em] uppercase">
              SEQ-ID: JAI-{Math.floor(Math.random() * 89999) + 10000}
            </span>
          </div>

          <VerdictCard verdict={analysis.verdict} confidence={analysis.confidence} />
        </div>

        {/* Localized Resources */}
        <div className="p-6 bg-void rounded-2xl border-2 border-blue/20 space-y-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.8)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue/5 blur-3xl rounded-full" />
          <div className="flex items-center gap-3 relative z-10">
            <Scale className="w-5 h-5 text-blue" />
            <h4 className="text-[11px] uppercase font-extrabold tracking-[0.3em] text-white">
              Jurisdictional Node: {selectedJurisdiction}
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-4 relative z-10">
            <a
              href={resource.link}
              target="_blank"
              rel="noreferrer"
              className="p-4 bg-void rounded border-2 border-white/5 hover:border-blue/40 transition-all group shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]"
            >
              <p className="text-[10px] text-text-tertiary uppercase font-extrabold mb-1.5 tracking-widest opacity-60">
                Official Archive
              </p>
              <p className="text-[11px] text-white font-display font-bold uppercase tracking-tight group-hover:text-blue truncate italic">
                {resource.court}
              </p>
            </a>
            <div className="p-4 bg-void rounded border-2 border-white/5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] border-l-4 border-l-blue">
              <p className="text-[10px] text-text-tertiary uppercase font-extrabold mb-1.5 tracking-widest opacity-60">
                Support Protocol
              </p>
              <p className="text-sm text-blue font-bold tracking-widest italic">{resource.help}</p>
            </div>
          </div>
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
        <ArgumentsPanel
          forArgs={analysis.arguments?.for}
          againstArgs={analysis.arguments?.against}
        />

        {/* Export Action */}
        <div className="pt-10 border-t-2 border-white/5 pb-16">
          <button
            onClick={onExport}
            className="w-full flex items-center justify-center gap-4 bg-void hover:bg-neutral-900 text-red border-2 border-red/40 px-8 py-6 rounded transition-all group active:translate-x-[2px] active:translate-y-[2px] shadow-[12px_12px_0px_0px_rgba(159,18,57,1)]"
          >
            <Download className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            <span className="text-lg font-bold uppercase tracking-widest italic">
              Commit & Export Log Archive
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
