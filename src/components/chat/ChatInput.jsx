import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Paperclip } from 'lucide-react';

export default function ChatInput({ onSend, isLoading }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!text.trim() || isLoading) return;
    onSend(text.trim());
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [text]);

  return (
    <div className="p-4 md:p-6 border-t border-white/5 bg-void">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative flex items-end gap-3 p-2 bg-raised border border-white/10 rounded-2xl focus-within:border-gold/30 transition-all shadow-inner">
          <button 
            type="button"
            className="p-3 text-text-tertiary hover:text-gold transition-colors active:scale-90"
            title="Attach file (Coming soon)"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your legal situation in detail..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-text-primary placeholder:text-text-tertiary font-body resize-none py-3 text-[15px] max-h-[200px]"
          />

          <button
            type="submit"
            disabled={!text.trim() || isLoading}
            className={`p-3 rounded-xl transition-all flex items-center justify-center ${
              !text.trim() || isLoading
                ? 'bg-white/5 text-text-tertiary cursor-not-allowed'
                : 'bg-gold text-void hover:bg-gold-light active:scale-90'
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="mt-2 text-[10px] text-center text-text-tertiary uppercase tracking-widest font-bold">
          Press Enter to send • <span>JusticeAI is an AI Co-pilot</span>
        </p>
      </form>
    </div>
  );
}
