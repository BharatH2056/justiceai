import { Milestone, Scale, Quote, AlertTriangle, MessageSquare } from 'lucide-react';

export function CourtroomPrepCard({ prep, grounds }) {
  if (!prep) return null;

  return (
    <div className="space-y-10 pt-12 border-t-2 border-white/5 relative">
      <div className="absolute top-0 left-0 w-2 h-12 bg-red opacity-30" />
      <div className="flex items-center gap-4">
        <Milestone className="w-6 h-6 text-red" />
        <h3 className="text-[14px] uppercase tracking-[0.5em] font-extrabold text-white">
          Trial Documentation Prep
        </h3>
      </div>

      {/* NEW: Statutory & Constitutional Basis */}
      {grounds && grounds.length > 0 && (
        <div className="p-8 rounded bg-void border-2 border-white/10 space-y-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.8)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue/5 blur-3xl rounded-full" />
          <label className="text-[10px] uppercase font-extrabold tracking-[0.4em] text-blue flex items-center gap-3 relative z-10">
            <Scale className="w-4 h-4" />
            <span>Statutory_Grounding_Matrix</span>
          </label>
          <div className="flex flex-wrap gap-3 relative z-10">
            {grounds.map((ground, i) => (
              <span
                key={i}
                className="text-[10px] px-4 py-2 rounded bg-blue/10 border-2 border-blue/20 text-white font-extrabold tracking-widest uppercase italic shadow-[4px_4px_0px_0px_rgba(37,99,235,0.05)]"
              >
                {ground}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Opening Statement */}
      <div className="p-10 rounded bg-void border-2 border-red/40 space-y-6 relative overflow-hidden group shadow-[12px_12px_0px_0px_rgba(225,29,72,0.1)]">
        <Quote className="absolute top-6 right-6 w-16 h-16 text-red/10 -rotate-12 transition-transform group-hover:scale-110" />
        <label className="text-[10px] uppercase font-extrabold tracking-[0.5em] text-red-light flex items-center gap-3">
          <span>Opening_Directive_Protocol</span>
        </label>
        <p className="text-[16px] italic text-white leading-relaxed font-body relative z-10 border-l-4 border-red/20 pl-8">
          "{prep.openingStatement}"
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 pt-4">
        {/* What NOT to say */}
        <div className="space-y-6">
          <label className="flex items-center gap-3 text-[10px] uppercase font-extrabold tracking-[0.4em] text-red">
            <AlertTriangle className="w-4 h-4" />
            <span>Forbidden_Dialog_Log</span>
          </label>
          <ul className="space-y-3">
            {prep.whatNotToSay?.map((item, i) => (
              <li
                key={i}
                className="text-[11px] text-text-secondary leading-relaxed bg-void p-5 rounded border-2 border-red/20 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)] italic"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Judge Questions */}
        <div className="space-y-6">
          <label className="flex items-center gap-3 text-[10px] uppercase font-extrabold tracking-[0.4em] text-accent-success">
            <MessageSquare className="w-4 h-4" />
            <span>Expected_Interrogation_Paths</span>
          </label>
          <div className="space-y-4">
            {prep.judgeQuestions?.map((item, i) => (
              <div
                key={i}
                className="p-5 rounded bg-void border-2 border-accent-success/20 space-y-3 group transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)] border-l-4 border-l-accent-success"
              >
                <p className="text-[11px] font-extrabold text-accent-success uppercase tracking-widest group-hover:text-white transition-colors italic">
                  Q_PROMPT: {item.question}
                </p>
                <p className="text-[12px] text-text-secondary leading-relaxed font-body italic border-t border-white/5 pt-2">
                  A_RESPONSE: {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
