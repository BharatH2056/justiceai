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
    <div className="flex-1 flex flex-col min-h-0 bg-void relative">
      <div className="absolute inset-0 bg-red/5 blur-[120px] pointer-events-none opacity-20" />
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 md:px-6 py-8 scroll-smooth relative z-10"
      >
        <div className="max-w-4xl mx-auto space-y-10">
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

export function TypingIndicator() {
  return (
    <div className="flex w-full justify-start mb-12">
      <div className="flex items-start gap-5">
        <div className="w-11 h-11 rounded bg-red/10 flex items-center justify-center border-2 border-red/20 shadow-[4px_4px_0px_0px_rgba(225,29,72,0.1)]">
          <div className="w-5 h-5 rounded-sm bg-red/40 animate-pulse" />
        </div>
        <div className="bg-void border-2 border-white/10 px-8 py-5 rounded shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] flex gap-2 items-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-red/60 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.8s' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
