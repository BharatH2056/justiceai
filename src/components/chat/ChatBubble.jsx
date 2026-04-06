import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Scale, User } from 'lucide-react';

export default function ChatBubble({ role, content, timestamp }) {
  const isAI = role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`flex w-full mb-8 ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`flex max-w-[85%] md:max-w-[75%] gap-4 ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border ${
          isAI ? 'bg-gold/10 border-gold/20' : 'bg-raised border-white/10'
        }`}>
          {isAI ? <Scale className="w-4 h-4 text-gold" /> : <User className="w-4 h-4 text-text-secondary" />}
        </div>

        <div className={`space-y-1 ${isAI ? 'items-start' : 'items-end'}`}>
          <div className={`px-5 py-3.5 rounded-2xl font-body text-[15px] leading-relaxed shadow-sm ${
            isAI 
              ? 'bg-raised border border-white/5 text-text-primary rounded-tl-none' 
              : 'bg-gold text-void font-medium rounded-tr-none'
          }`}>
            <div className={`prose ${isAI ? 'text-text-primary' : 'text-void'}`}>
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
          <div className={`px-2 text-[10px] uppercase font-bold tracking-widest text-text-tertiary ${
            isAI ? 'text-left' : 'text-right'
          }`}>
            {isAI ? 'JusticeAI' : 'You'} • {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
