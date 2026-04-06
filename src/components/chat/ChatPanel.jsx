import React, { useRef, useEffect } from 'react';
import ChatBubble from './ChatBubble';

export default function ChatPanel({ messages, isLoading }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-void">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 md:px-6 py-6 scroll-smooth"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              role={msg.role}
              content={msg.content}
              timestamp={msg.timestamp}
            />
          ))}
          {isLoading && <TypingIndicator />}
        </div>
      </div>
    </div>
  );
}

// TypingIndicator.jsx as a sub-component for now
export function TypingIndicator() {
  return (
    <div className="flex w-full justify-start mb-8">
      <div className="flex items-start gap-4">
        <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
          <div className="w-4 h-4 rounded-full bg-gold/20 animate-pulse" />
        </div>
        <div className="bg-raised border border-white/5 px-5 py-4 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-gold/40 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.8s' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
