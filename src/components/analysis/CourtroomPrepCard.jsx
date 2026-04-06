import React from 'react';
import { motion } from 'framer-motion';
import { Gavel, AlertTriangle, MessageSquare, Quote, Scale } from 'lucide-react';

export function CourtroomPrepCard({ prep, grounds }) {
  if (!prep) return null;

  return (
    <div className="space-y-8 pt-8 border-t border-white/5">
      <div className="flex items-center gap-3">
        <Gavel className="w-5 h-5 text-gold" />
        <h3 className="text-xl font-display text-white">Courtroom Preparation</h3>
      </div>

      {/* NEW: Statutory & Constitutional Basis */}
      {grounds && grounds.length > 0 && (
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
          <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gold flex items-center gap-2">
            <Scale className="w-3.5 h-3.5" />
            <span>Statutory & Constitutional Basis</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {grounds.map((ground, i) => (
              <span key={i} className="text-[11px] px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold-light font-medium">
                {ground}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Opening Statement */}
      <div className="p-6 rounded-3xl bg-gold/5 border border-gold/10 space-y-4 relative overflow-hidden group hover:border-gold/30 transition-all">
        <Quote className="absolute top-4 right-4 w-12 h-12 text-gold/5 -rotate-12 transition-transform group-hover:scale-110" />
        <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gold-light flex items-center gap-2">
            <span>Opening Statement</span>
        </label>
        <p className="text-sm italic text-white/90 leading-relaxed font-serif relative z-10">
          "{prep.openingStatement}"
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* What NOT to say */}
        <div className="space-y-4">
            <label className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-accent-error">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>What NOT to say</span>
            </label>
            <ul className="space-y-2">
                {prep.whatNotToSay?.map((item, i) => (
                    <li key={i} className="text-xs text-text-secondary leading-relaxed bg-accent-error/5 p-3 rounded-xl border border-accent-error/10">
                        {item}
                    </li>
                ))}
            </ul>
        </div>

        {/* Judge Questions */}
        <div className="space-y-4">
            <label className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-accent-success">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Likely Judge Questions</span>
            </label>
            <div className="space-y-3">
                {prep.judgeQuestions?.map((item, i) => (
                    <div key={i} className="p-3 rounded-xl bg-accent-success/5 border border-accent-success/10 space-y-2 group transition-all">
                        <p className="text-xs font-semibold text-accent-success group-hover:text-gold transition-colors">
                            Q: {item.question}
                        </p>
                        <p className="text-[11px] text-text-secondary leading-relaxed font-body">
                            A: {item.answer}
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
