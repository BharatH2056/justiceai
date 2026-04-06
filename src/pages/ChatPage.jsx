import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/ui/Header';
import ChatPanel from '../components/chat/ChatPanel';
import ChatInput from '../components/chat/ChatInput';
import AnalysisPanel from '../components/analysis/AnalysisPanel';
import ExportModal from '../components/ui/ExportModal';
import { CaseHistorySidebar } from '../components/chat/CaseHistorySidebar';
import { sendMessage } from '../lib/claudeApi';
import { parseAIResponse } from '../lib/parseAnalysis';
import { generateSummary } from '../lib/generateSummary';
import { Gavel, Sword, ShieldCheck } from 'lucide-react';

export default function ChatPage() {
  const location = useLocation();
  const [activeCaseId, setActiveCaseId] = useState(Date.now().toString());
  const [history, setHistory] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Case State
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant',
      content: "Namaste. I am your **JusticeAI Legal Co-pilot**. How can I help you today? Please describe your legal situation in detail so I can build a winning strategy for you.",
      timestamp: new Date()
    }
  ]);
  const [analysis, setAnalysis] = useState(null);
  
  // Settings State
  const [mode, setMode] = useState('copilot'); // 'copilot' | 'simulator'
  const [judgePersonality, setJudgePersonality] = useState('Neutral'); // 'Strict' | 'Neutral' | 'Lenient'
  
  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [summary, setSummary] = useState("");

  // Calculate Progress
  const progress = analysis ? 100 : Math.min(Math.floor((messages.length - 1) * 25), 80);

  // 1. Load History on Mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('justice_ai_history');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setHistory(parsed);
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // 2. Handle Samples from Router State
  useEffect(() => {
    if (location.state?.sampleCase) {
      // Start new case with sample content
      const newId = Date.now().toString();
      setActiveCaseId(newId);
      const initialMsgs = [
        {
          id: '1',
          role: 'assistant',
          content: `Launching **${location.state.caseType}** Demo. I am ready to analyze this situation.`,
          timestamp: new Date()
        },
        {
          id: '2',
          role: 'user',
          content: location.state.sampleCase,
          timestamp: new Date()
        }
      ];
      setMessages(initialMsgs);
      setAnalysis(null);
      
      // Auto-trigger analysis for sample
      handleSampleTrigger(initialMsgs, location.state.sampleCase);
    }
  }, [location.state]);

  // 3. Save History to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('justice_ai_history', JSON.stringify(history));
  }, [history]);

  // Case Management Handlers
  const saveCurrentToHistory = () => {
    const title = messages[1]?.content?.substring(0, 40) + "..." || "Untitled Case";
    const caseData = {
      id: activeCaseId,
      title,
      messages,
      analysis,
      timestamp: new Date()
    };

    setHistory(prev => {
      const filtered = prev.filter(c => c.id !== activeCaseId);
      return [caseData, ...filtered];
    });
  };

  const loadCase = (id) => {
    const caseData = history.find(c => c.id === id);
    if (caseData) {
      setActiveCaseId(id);
      setMessages(caseData.messages);
      setAnalysis(caseData.analysis);
    }
  };

  const handleNewCase = () => {
    // Save current before resetting if it has content
    if (messages.length > 1) {
      saveCurrentToHistory();
    }

    const newId = Date.now().toString();
    setActiveCaseId(newId);
    setMessages([{
      id: '1',
      role: 'assistant',
      content: "System Reset. I am ready for your next case. How can I help you today?",
      timestamp: new Date()
    }]);
    setAnalysis(null);
  };

  const deleteCase = (id) => {
    setHistory(prev => prev.filter(c => c.id !== id));
    if (activeCaseId === id) {
      handleNewCase();
    }
  };

  // Helper for sample trigger
  const handleSampleTrigger = async (currentMsgs, content) => {
    setIsLoading(true);
    try {
      const aiResponseRaw = await sendMessage(currentMsgs, content, { judgePersonality, mode });
      const { chatMessage, analysis: newAnalysis } = parseAIResponse(aiResponseRaw);
      const aiMsg = { id: Date.now().toString(), role: 'assistant', content: chatMessage, timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
      if (newAnalysis) setAnalysis(newAnalysis);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (content) => {
    const userMsg = { id: Date.now().toString(), role: 'user', content, timestamp: new Date() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const aiResponseRaw = await sendMessage(updatedMessages, content, { judgePersonality, mode });
      const { chatMessage, analysis: newAnalysis } = parseAIResponse(aiResponseRaw);
      const aiMsg = { id: (Date.now() + 1).toString(), role: 'assistant', content: chatMessage, timestamp: new Date() };
      
      const finaleMsgs = [...updatedMessages, aiMsg];
      setMessages(finaleMsgs);
      
      if (newAnalysis) {
        setAnalysis(newAnalysis);
      }

      // Auto-save to history
      const title = updatedMessages[1]?.content?.substring(0, 40) + "..." || "Untitled Case";
      const caseData = {
        id: activeCaseId,
        title,
        messages: finaleMsgs,
        analysis: newAnalysis || analysis,
        timestamp: new Date()
      };

      setHistory(prev => {
        const filtered = prev.filter(c => c.id !== activeCaseId);
        return [caseData, ...filtered];
      });

    } catch (error) {
      console.error('Chat Error:', error);
      const errorMsg = { id: Date.now().toString(), role: 'assistant', content: `**Error:** ${error.message}`, timestamp: new Date() };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    const textSummary = generateSummary(messages, analysis);
    setSummary(textSummary);
    setIsExportOpen(true);
  };

  return (
    <div className="h-screen flex flex-col bg-void overflow-hidden">
      <Header onNewCase={handleNewCase} />
      
      <main className="flex-1 flex pt-16 h-[calc(100vh-64px)] relative">
        {/* Left: Case History Sidebar */}
        <CaseHistorySidebar 
          history={history}
          currentCaseId={activeCaseId}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          onSelect={loadCase}
          onNew={handleNewCase}
          onDelete={deleteCase}
        />

        {/* Center: Main Workflow Controls */}
        <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
          
          {/* Left: Chat Panel Side */}
          <div className="flex-1 flex flex-col border-r border-white/5 order-2 md:order-1 h-full min-w-0">
            {/* Mode & Personality Controls */}
            <div className="p-3 border-b border-white/5 bg-raised/30 flex items-center justify-between gap-4">
               <div className="flex bg-ink p-1 rounded-xl border border-white/5">
                  <button 
                    onClick={() => setMode('copilot')}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all ${mode === 'copilot' ? 'bg-gold text-ink' : 'text-text-tertiary hover:text-white'}`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Co-pilot</span>
                  </button>
                  <button 
                    onClick={() => setMode('simulator')}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all ${mode === 'simulator' ? 'bg-accent-error text-white' : 'text-text-tertiary hover:text-white'}`}
                  >
                    <Sword className="w-3.5 h-3.5" />
                    <span>Simulator</span>
                  </button>
               </div>

               <div className="flex items-center gap-2">
                  <Gavel className="w-4 h-4 text-gold-light opacity-50" />
                  <select 
                    value={judgePersonality}
                    onChange={(e) => setJudgePersonality(e.target.value)}
                    className="bg-ink border border-white/10 rounded-lg px-3 py-1.5 text-[10px] font-bold text-gold uppercase tracking-widest focus:outline-none focus:border-gold/50"
                  >
                    <option value="Strict">Strict Judge</option>
                    <option value="Neutral">Neutral Judge</option>
                    <option value="Lenient">Lenient Judge</option>
                  </select>
               </div>
            </div>

            <ChatPanel messages={messages} isLoading={isLoading} />
            <ChatInput onSend={handleSend} isLoading={isLoading} />
          </div>

          {/* Right: Analysis Side */}
          <div className="w-full md:w-[420px] lg:w-[480px] bg-raised/50 overflow-hidden order-1 md:order-2 h-full border-b md:border-b-0 border-white/5">
            <AnalysisPanel 
              analysis={analysis} 
              isLoading={isLoading} 
              onExport={handleExport}
              progress={progress}
            />
          </div>
        </div>
      </main>

      <ExportModal 
        isOpen={isExportOpen} 
        onClose={() => setIsExportOpen(false)} 
        summary={summary} 
      />
    </div>
  );
}
