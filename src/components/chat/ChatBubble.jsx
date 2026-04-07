import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Scale, User } from 'lucide-react';

export default function ChatBubble({ role, content, timestamp }) {
  const isAI = role === 'assistant';
  const isSystem = role === 'system';

  if (isSystem) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="flex w-full mb-10 justify-center"
      >
        <div className="bg-void border-2 border-white/10 px-6 py-2.5 rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] flex items-center justify-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" />
          <span className="text-[10px] text-text-tertiary uppercase tracking-[0.3em] font-extrabold italic">
            {content}
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`flex w-full mb-12 ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`flex max-w-[90%] md:max-w-[80%] gap-5 ${isAI ? 'flex-row' : 'flex-row-reverse'}`}
      >
        <div
          className={`flex-shrink-0 w-11 h-11 rounded border-2 flex items-center justify-center transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] ${
            isAI ? 'bg-red/10 border-red/40 rotate-3' : 'bg-void border-white/20 -rotate-3'
          }`}
        >
          {isAI ? (
            <Scale className="w-5 h-5 text-red-light" />
          ) : (
            <User className="w-5 h-5 text-white" />
          )}
        </div>

        <div className={`space-y-3 ${isAI ? 'items-start' : 'items-end'}`}>
          <div
            className={`px-7 py-5 rounded-lg font-body text-[15px] leading-relaxed relative ${
              isAI
                ? 'bg-void border-2 border-white/10 text-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.02)]'
                : 'bg-void border-2 border-red/40 text-white shadow-[8px_8px_0px_0px_rgba(225,29,72,0.1)]'
            }`}
          >
            <div
              className={`prose max-w-none ${isAI ? 'prose-invert prose-red' : 'prose-invert prose-blue'}`}
            >
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
            {/* Tactical Corner Accents */}
            <div
              className={`absolute top-0 ${isAI ? 'left-0 border-l-2 border-t-2' : 'right-0 border-r-2 border-t-2'} w-2 h-2 border-red/40`}
            />
            <div
              className={`absolute bottom-0 ${isAI ? 'right-0 border-r-2 border-b-2' : 'left-0 border-l-2 border-b-2'} w-2 h-2 border-red/40`}
            />
          </div>
          <div
            className={`px-3 text-[9px] uppercase font-extrabold tracking-[0.2em] text-text-tertiary flex items-center gap-2 ${
              isAI ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            <span className={isAI ? 'text-red' : 'text-blue'}>
              {isAI ? 'TERMINAL_AI' : 'CLIENT_AUTH'}
            </span>
            <span className="opacity-30">•</span>
            <span>
              {new Date(timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
