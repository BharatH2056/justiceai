import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Loader2,
  FileText,
  CheckCircle2,
  Search,
  Brain,
  Database,
  Cpu,
} from 'lucide-react';

const SCAN_STEPS = [
  'Initializing Multi-Modal Vision Model...',
  'Running OCR on Document Layers...',
  'Extracting Party Names & Court Details...',
  'Mapping Context to BNS / BNSS 2023 Guidelines...',
  'Identifying Cause of Action & Limitation Periods...',
  'Building Evidence Strength Matrix...',
  'Correlating with Supreme Court Precedents...',
  'Verification Successful. Initializing Legal Strategy...',
];

export default function DocumentScanningOverlay({ isOpen, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setProgress(0);

      const stepInterval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < SCAN_STEPS.length - 1) return prev + 1;
          clearInterval(stepInterval);
          return prev;
        });
      }, 500);

      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) return prev + 1;
          clearInterval(progressInterval);
          setTimeout(() => onComplete(), 500);
          return prev;
        });
      }, 35);

      return () => {
        clearInterval(stepInterval);
        clearInterval(progressInterval);
      };
    }
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      >
        {/* Backdrop Backdrop blur plus darken */}
        <div className="absolute inset-0 bg-void/90 backdrop-blur-xl" />

        {/* Floating Scan Content */}
        <div className="relative w-full max-w-xl aspect-square md:aspect-video rounded-[32px] border border-white/5 bg-raised overflow-hidden shadow-2xl flex flex-col items-center justify-center p-12 space-y-8">
          <div
            className="absolute top-0 left-0 w-full h-[2px] bg-purple-gradient shadow-[0_0_20px_rgba(204,0,51,0.5)] z-20"
            style={{ top: `${progress}%` }}
          />

          {/* Animated Core Icons */}
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="w-32 h-32 rounded-full border-2 border-dashed border-purple/20"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-purple/10 rounded-full flex items-center justify-center border border-purple/30 shadow-xl shadow-purple/20">
                <Cpu className="w-10 h-10 text-purple animate-pulse" />
              </div>
            </div>
          </div>

          <div className="text-center space-y-4 w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple/10 text-purple text-[9px] uppercase font-bold tracking-[0.2em] rounded-full border border-purple/20">
              <Brain className="w-3.5 h-3.5" />
              <span>AI Intelligence Unit</span>
            </div>

            <h2 className="text-3xl font-display text-white">
              Deep Scanning <span className="text-purple-gradient">Case Law</span>
            </h2>

            <div className="space-y-1">
              <div className="flex justify-between items-end text-[10px] uppercase font-bold tracking-[0.2em]">
                <span className="text-text-tertiary">Document Extraction</span>
                <span className="text-purple">{progress}%</span>
              </div>
              <div className="h-1 bg-void rounded-full overflow-hidden border border-white/5">
                <motion.div className="h-full bg-purple" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Step Text */}
            <div className="h-6 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xs text-text-secondary font-body italic"
                >
                  {SCAN_STEPS[currentStep]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Floating Floating Scan Details */}
          <div className="absolute top-12 left-12 opacity-20 pointer-events-none hidden md:block">
            <Database className="w-24 h-24 text-purple" />
          </div>
          <div className="absolute bottom-12 right-12 opacity-20 pointer-events-none hidden md:block">
            <Search className="w-24 h-24 text-purple" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
