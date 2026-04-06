import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Plus, ChevronLeft, ChevronRight, FileText, Trash2 } from 'lucide-react';

export function CaseHistorySidebar({ history, currentCaseId, onSelect, onNew, onDelete, isOpen, setIsOpen }) {
  return (
    <motion.div 
      initial={false}
      animate={{ width: isOpen ? 280 : 0 }}
      className="relative bg-ink border-r border-white/5 h-full flex flex-col group"
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gold border border-gold/20 flex items-center justify-center text-ink shadow-[0_0_15px_rgba(212,175,55,0.3)] z-50 transition-transform ${isOpen ? '' : 'rotate-180 hover:scale-110'}`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col min-w-[280px] overflow-hidden"
          >
            {/* Sidebar Header */}
            <div className="p-6 border-b border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gold">
                  <History className="w-4 h-4" />
                  <span className="text-xs uppercase font-bold tracking-widest">Case History</span>
                </div>
                <button 
                  onClick={onNew}
                  className="p-2 rounded-xl bg-white/5 hover:bg-gold hover:text-ink transition-all border border-white/10"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3 custom-scrollbar">
              {history.length === 0 ? (
                <div className="text-center py-12 px-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-text-tertiary">
                    <FileText className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-text-tertiary leading-relaxed font-body">
                    No session history found. Start a new case to begin tracking.
                  </p>
                </div>
              ) : (
                history.map((item) => (
                  <div 
                    key={item.id}
                    className={`group relative p-4 rounded-2xl cursor-pointer transition-all border ${
                      currentCaseId === item.id 
                        ? 'bg-gold/10 border-gold/30 shadow-[0_0_20px_rgba(212,175,55,0.1)]' 
                        : 'bg-raised/50 border-white/5 hover:bg-raised hover:border-white/20'
                    }`}
                    onClick={() => onSelect(item.id)}
                  >
                    <div className="space-y-1 pr-6">
                      <h4 className={`text-sm font-display truncate ${currentCaseId === item.id ? 'text-gold' : 'text-white'}`}>
                        {item.title || "Untitled Legal Case"}
                      </h4>
                      <p className="text-[10px] text-text-tertiary font-mono">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item.id);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg text-text-tertiary hover:bg-accent-error/10 hover:text-accent-error opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
