import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  User,
  Bot,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Download,
  Mic,
  StopCircle,
  AlertCircle,
  BookOpen,
  Scale,
  Clock,
  ChevronDown,
} from 'lucide-react';
import { useToast } from '../components/ui/Toast';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

// Legal personalities for AI responses
const PERSONALITIES = [
  { id: 'neutral', label: 'Neutral Advisor', description: 'Balanced, factual responses' },
  { id: 'empathetic', label: 'Empathetic Counselor', description: 'Understanding and supportive' },
  { id: 'formal', label: 'Formal Legal Expert', description: 'Professional, detailed analysis' },
  { id: 'simple', label: 'Plain Language Guide', description: 'Simple explanations for everyone' },
];

// Pre-built prompts for common legal scenarios
const QUICK_PROMPTS = [
  { icon: Scale, text: 'How do I file a consumer complaint?', category: 'Consumer' },
  { icon: Clock, text: 'What is the limitation period for filing an FIR?', category: 'Criminal' },
  { icon: BookOpen, text: 'How do I file an RTI application?', category: 'RTI' },
  { icon: AlertCircle, text: 'My landlord is harassing me, what can I do?', category: 'Tenant' },
];


function TypewriterEffect({ text, speed = 15 }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <div className="whitespace-pre-wrap font-body text-sm text-text-secondary leading-relaxed">
      {displayedText}
      {!isComplete && <span className="inline-block w-2 h-4 bg-purple animate-pulse ml-1" />}
    </div>
  );
}

function ChatMessage({ message, onCopy, onFeedback }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-purple/20 text-purple' : 'bg-accent-info/20 text-accent-info'}`}
      >
        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>
      <div className={`flex-1 max-w-[80%] ${isUser ? 'text-right' : ''}`}>
        <div
          className={`inline-block p-4 rounded-2xl ${isUser ? 'bg-purple/10 border border-purple/20' : 'bg-raised border border-white/5'}`}
        >
          {message.isTyping ? (
            <TypewriterEffect text={message.content} />
          ) : (
            <div className="prose prose-sm prose-invert max-w-none">
              {message.content.split('\n').map((line, i) => (
                <p key={i} className={line === '' ? 'h-4' : ''}>
                  {line.startsWith('**') ? (
                    <strong className="text-white">{line.replace(/\*\*/g, '')}</strong>
                  ) : line.startsWith('•') || line.startsWith('✓') ? (
                    <span className="text-purple">{line}</span>
                  ) : (
                    line
                  )}
                </p>
              ))}
            </div>
          )}
        </div>
        {!isUser && !message.isTyping && (
          <div className="flex items-center gap-2 mt-2">
            {/* Provider badge */}
            <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-purple/10 text-purple border border-purple/20">
              {message.provider || 'Openclaw · Local'}
            </span>
            <div className="flex items-center gap-1 ml-auto">
              <button
                onClick={() => onCopy(message.content)}
                className="p-1 rounded hover:bg-white/5 text-text-tertiary hover:text-purple transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onFeedback(message.id, 'up')}
                className="p-1 rounded hover:bg-white/5 text-text-tertiary hover:text-accent-success transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onFeedback(message.id, 'down')}
                className="p-1 rounded hover:bg-white/5 text-text-tertiary hover:text-accent-error transition-colors"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onCopy(message.content)}
                className="p-1 rounded hover:bg-white/5 text-text-tertiary hover:text-accent-info transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function AIChatPage() {
  const { success, error: showError } = useToast();
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Welcome to Openclaw ⚖️

I'm your AI legal co-pilot powered by Openclaw, running locally on your machine via Ollama (gemma3:4b).

**I can help you with:**
• Understanding your legal rights under Indian law
• Drafting and reviewing legal documents
• Explaining legal procedures step-by-step
• Finding relevant laws, IPC/BNS sections, and case references
• Preparing for court proceedings and moot simulations

**Privacy First:** All responses are generated locally — your queries never leave your device.

**Note:** I provide legal information, not legal advice. For complex matters, please consult a qualified lawyer.

How can I assist you today?`,
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState('neutral');
  const [showQuickPrompts, setShowQuickPrompts] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);
    setShowQuickPrompts(false);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages
            .filter((m) => m.role !== 'system')
            .map((m) => ({ role: m.role, content: m.content })),
          personality: selectedPersonality,
          mode: 'copilot',
          jurisdiction: 'National',
          basePrompt: `You are Openclaw, JusticeAI's local legal co-pilot powered by gemma3:4b running via Ollama. You specialize exclusively in Indian law — IPC, BNS, CrPC, BNSS, Constitution of India, RTI, Consumer Protection Act, and more. Always cite relevant section numbers. Be concise and accurate. End each analysis with: "Disclaimer: This is legal information, not legal advice. Consult a licensed advocate for your specific situation."`,
          provider: localStorage.getItem('justice_ai_provider') || 'ollama',
          apiKeys: JSON.parse(localStorage.getItem('justice_ai_keys') || '{}'),
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Backend error ${response.status}: ${errText}`);
      }

      const data = await response.json();
      const responseText = data.message?.content || 'No response received.';

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date().toISOString(),
        isTyping: true,
        provider: data.metadata?.provider || 'Openclaw · gemma3:4b',
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Disable typewriter after animation completes
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantMessage.id ? { ...m, isTyping: false } : m)),
        );
      }, Math.min(responseText.length * 12, 4000));

    } catch (err) {
      console.error('Chat error:', err);
      showError({
        title: 'Connection Failed',
        message: 'Could not reach the AI backend. Make sure Ollama is running with openclaw and the backend server (node server.js) is active.',
      });
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `⚠️ **Unable to connect to JusticeAI backend.**\n\nPlease ensure:\n• Ollama is running: \`ollama serve\`\n• openclaw model is available: \`ollama run openclaw\`\n• Backend server is running: \`node server.js\``,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (prompt) => {
    sendMessage(prompt.text);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    success({ title: 'Copied!', message: 'Response copied to clipboard' });
  };

  const handleFeedback = (messageId, type) => {
    success({
      title: 'Feedback Recorded',
      message: `Thank you for your ${type === 'up' ? 'positive' : 'negative'} feedback`,
    });
  };

  const clearChat = () => {
    setMessages([messages[0]]);
    setShowQuickPrompts(true);
    success({ title: 'Chat Cleared', message: 'Conversation has been reset' });
  };

  const exportChat = () => {
    const chatText = messages
      .map((m) => `${m.role === 'user' ? 'You' : 'JusticeAI'}: ${m.content}`)
      .join('\n\n---\n\n');

    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `justiceai-chat-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    success({ title: 'Exported!', message: 'Chat history saved to file' });
  };

  return (
    <div className="min-h-screen bg-void pb-8 flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 pt-32 pb-16 flex flex-col">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple/10 text-purple-light text-[10px] uppercase font-bold tracking-[0.2em] rounded-full border border-purple/20">
            <Bot className="w-3.5 h-3.5" />
            <span>Openclaw · Legal Chatbot</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-semibold">
            Ask Your <span className="text-purple-gradient">Legal Questions</span>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto font-body">
            Powered by <span className="text-purple font-semibold">Openclaw</span> — your local AI legal assistant running on{' '}
            <span className="font-mono text-sm bg-purple/10 px-2 py-0.5 rounded">gemma3:4b</span> via Ollama. 100% private, zero cloud.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6 p-4 bg-raised rounded-2xl border border-white/5">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-text-tertiary">
                Personality:
              </span>
              <select
                value={selectedPersonality}
                onChange={(e) => setSelectedPersonality(e.target.value)}
                className="bg-ink border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple/40"
              >
                {PERSONALITIES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={exportChat}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-text-secondary hover:text-purple hover:border-purple/30 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Export
            </button>
            <button
              onClick={clearChat}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-text-secondary hover:text-accent-error hover:border-accent-error/30 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Clear
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 bg-raised rounded-[32px] border border-white/5 p-6 md:p-8 overflow-y-auto mb-6 space-y-6 min-h-[400px] max-h-[60vh]">
          <AnimatePresence>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onCopy={handleCopy}
                onFeedback={handleFeedback}
              />
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {showQuickPrompts && (
          <div className="mb-6">
            <p className="text-[10px] uppercase font-bold tracking-widest text-text-tertiary mb-3">
              Quick Start
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickPrompt(prompt)}
                  className="flex items-center gap-3 p-4 bg-raised rounded-2xl border border-white/5 hover:border-purple/30 transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple/10 border border-purple/20 flex items-center justify-center text-purple group-hover:bg-purple/20 transition-colors">
                    <prompt.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-text-primary font-body">{prompt.text}</p>
                    <p className="text-[10px] text-text-tertiary uppercase font-bold tracking-widest">
                      {prompt.category}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="relative">
          <div className="flex items-end gap-3 p-4 bg-raised rounded-[24px] border border-white/5">
            <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-text-tertiary hover:text-purple hover:border-purple/30 transition-colors flex-shrink-0">
              <Mic className="w-5 h-5" />
            </button>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(inputValue);
                }
              }}
              placeholder="Ask about Indian law, your rights, legal procedures..."
              rows={1}
              className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none resize-none font-body"
              style={{ minHeight: '24px', maxHeight: '120px' }}
            />
            <button
              onClick={() => sendMessage(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              className="p-3 rounded-xl bg-purple hover:bg-purple-light disabled:opacity-30 disabled:cursor-not-allowed text-ink transition-all flex-shrink-0"
            >
              {isLoading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-[10px] text-text-tertiary mt-2 text-center">
            Openclaw responses are for informational purposes only. Consult a licensed advocate for legal advice. All processing is local — no data leaves your device.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
