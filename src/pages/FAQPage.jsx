import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, ArrowRight } from 'lucide-react';
import Header from '../components/ui/Header';

const FAQ_DATA = [
  {
    question: "Is JusticeAI a substitute for a real lawyer?",
    answer: "No. JusticeAI is an AI-powered legal co-pilot designed to provide legal information. You should always consult with a qualified advocate for real legal advice and court representation."
  },
  {
    question: "Which Indian laws does the AI understand?",
    answer: "JusticeAI has been trained on a broad range of Indian statutes, including the Indian Penal Code (IPC/BNS), Code of Civil Procedure (CPC), Consumer Protection Act, RTI Act, and specific Real Estate (RERA) and Labor laws. It also understands the latest Constitutional Amendments (up to 2024)."
  },
  {
    question: "Does JusticeAI understand the Constitution?",
    answer: "Yes. JusticeAI integrates the Constitution of India (updated as of May 2024) as its primary legal framework. It can identify violations of Fundamental Rights (like Art. 21) and suggest Constitutional remedies like Writ Petitions under Art. 32 or Art. 226."
  },
  {
    question: "How accurate are the win/loss predictions?",
    answer: "The 'Verdict Prediction' is a statistical estimate based on the factors provided. It is not a guarantee of a court outcome. Legal proceedings are complex and depend on many external variables."
  },
  {
    question: "Can I use the generated summary in court?",
    answer: "The 'Legal Summary' is intended to help you organize your thoughts and prepare for your first meeting with a lawyer. It is not a formal legal pleading and should be reviewed by an advocate before being submitted to any authority."
  },
  {
    question: "Does JusticeAI store my private case details?",
    answer: "Your case data is stored locally in your browser's localStorage for your convenience. We do not store sensitive legal documents on our central servers in this hackathon version."
  },
  {
    question: "Is this tool free to use?",
    answer: "Yes, currently JusticeAI is free for everyone as part of our mission to improve legal access in India."
  },
  {
    question: "Can I handle a criminal case using JusticeAI?",
    answer: "JusticeAI can provide information on criminal procedure and your rights, but criminal cases carry high risks (imprisonment). We strongly recommend immediate legal counsel for any criminal matter."
  },
  {
    question: "How do I start a new case from scratch?",
    answer: "You can click the 'New Case' button in the chat workspace or navigate to the 'Samples' page to pre-load common legal scenarios."
  }
];

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/5 last:border-0 overflow-hidden">
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between py-8 px-6 text-left hover:bg-white/[0.02] transition-colors group"
      >
        <span className={`text-xl font-display transition-colors ${isOpen ? 'text-gold' : 'text-white group-hover:text-gold-light'}`}>
          {question}
        </span>
        <div className={`p-2 rounded-full border transition-all ${isOpen ? 'bg-gold border-gold text-ink rotate-0' : 'bg-transparent border-white/10 text-white rotate-90'}`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-8 text-text-secondary leading-relaxed font-body">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="min-h-screen bg-void pb-32">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 space-y-16">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 text-gold-light text-[10px] uppercase font-bold tracking-[0.2em] rounded-full border border-gold/20">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support Center</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-semibold">Common <span className="text-gold-gradient">Questions</span></h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto font-body">
            Everything you need to know about JusticeAI and how it helps you navigate the Indian legal system.
          </p>
        </div>

        <div className="bg-raised rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
          {FAQ_DATA.map((item, i) => (
            <FAQItem 
              key={i}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>

        <div className="text-center p-12 bg-gold/5 rounded-[40px] border border-gold/10 space-y-6">
          <h2 className="text-2xl font-display text-white italic">Ready to build your strategy?</h2>
          <motion.a
            href="/chat"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 bg-gold text-ink px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-gold/20"
          >
            <span>Launch Your Case</span>
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>
      </main>
    </div>
  );
}
