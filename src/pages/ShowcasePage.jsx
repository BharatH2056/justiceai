import React from 'react';
import { Milestone, Shield, Scale, Cpu, ArrowLeft, Zap, Terminal } from 'lucide-react';
import { MorphingCardStack } from '../components/ui/morphing-card-stack';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import { useNavigate } from 'react-router-dom';

const pillarCards = [
  {
    id: '1',
    title: 'BNS_INTELLIGENCE_LAYER',
    description:
      'DEEP-LEARNING ANALYSIS OF THE BHARATIYA NYAYA SANHITA (2023). BRIDGING THE PROTOCOL GAP BETWEEN LEGACY IPC AND DIGITAL-FIRST LEGAL FRAMEWORKS.',
    icon: <Milestone className="w-6 h-6 text-red" />,
  },
  {
    id: '2',
    title: 'CIVIL_RIGHTS_SHIELD',
    description:
      'CONSTITUTIONAL SAFEGUARDS. INSTANT DIRECTIVES ON FUNDAMENTAL RIGHTS AND DIRECTIVE PRINCIPLES PROTECTING ALL CITIZEN DEPLOYMENTS.',
    icon: <Shield className="w-6 h-6 text-red" />,
  },
  {
    id: '3',
    title: 'SUPREME_ADVOCACY_ENGINE',
    description:
      'PROFESSIONAL-GRADE STRATEGY HUB. CO-PILOT SYNC WITH SENIOR ADVOCATE ANALYTICAL RIGOR FOR HIGH-PRECISION CASE BUILDING.',
    icon: <Scale className="w-6 h-6 text-red" />,
  },
  {
    id: '4',
    title: 'DIGITAL_INDIA_INTEGRATION',
    description:
      'JUDICIAL INFRASTRUCTURE SYNC. FULL INTEGRATION WITH E-COURTS AND NALSA PROTOCOLS FOR SEAMLESS, PAPERLESS LEGAL CYCLES.',
    icon: <Cpu className="w-6 h-6 text-red" />,
  },
];

export default function ShowcasePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-void flex flex-col font-mono">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full">
        <div className="space-y-16">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-end justify-between gap-10 pb-10 border-b-2 border-white/5">
            <div className="space-y-6 max-w-2xl">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-3 text-red font-display font-extrabold text-[10px] uppercase tracking-[0.4em] hover:text-white transition-all italic group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                RETURN_TO_BASE_TERMINAL
              </button>
              <h1 className="text-6xl md:text-8xl font-display font-bold text-white uppercase tracking-tighter leading-none italic">
                AUTHORITY <span className="text-red">CORE</span>
              </h1>
              <p className="text-lg text-text-tertiary font-body uppercase tracking-wider italic leading-relaxed">
                FEBRUARY_CYLE_V4.2.0: FOUR FUNDAMENTAL SYSTEM LAYERS DEPLOYED FOR 1.4B CITIZEN ACCESS. 
              </p>
            </div>
            <div className="hidden lg:block relative group">
              <div className="absolute inset-0 bg-red/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6 bg-void border-2 border-red/20 rounded shadow-hard-red flex items-center gap-5 italic">
                <div className="w-12 h-12 rounded bg-red/10 border-2 border-red/40 flex items-center justify-center">
                  <Terminal className="w-6 h-6 text-red" />
                </div>
                <div className="text-[10px] uppercase font-extrabold tracking-[0.2em] text-text-tertiary">
                  CORE_STATUS: <span className="text-red">OPERATIONAL</span>
                  <br />
                  SEC_LEVEL: <span className="text-white">ALPHA_V1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Component Demo Section */}
          <div className="py-16 bg-void border-2 border-white/5 shadow-inner relative overflow-hidden group">
            {/* Tactical Grid Background Overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            <div className="max-w-4xl mx-auto py-12 relative z-10">
              <MorphingCardStack cards={pillarCards} defaultLayout="stack" />
            </div>

            <div className="text-center pb-12 space-y-3 relative z-10">
              <p className="text-[10px] uppercase tracking-[0.6em] font-extrabold text-red italic">
                INTERACTION_INTERFACE_LOADED
              </p>
              <p className="text-xs text-text-tertiary font-mono italic opacity-60">
                 // TOGGLE ARCHITECTURE VIEWS TO EXPLORE SYSTEM HIERARCHY protocols.
              </p>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="grid md:grid-cols-2 gap-10">
            <div className="p-10 rounded bg-void border-2 border-white/5 shadow-hard space-y-6 relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                 <Zap className="w-12 h-12 text-white" />
               </div>
              <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tighter italic">
                ADAPTIVE-MORPHING_PROTOCOL
              </h3>
              <p className="text-sm text-text-tertiary leading-relaxed font-body uppercase tracking-wider italic opacity-80">
                OUR INTERFACE ADAPTS TO COGNITIVE LOAD PARAMETERS. EMPLOY THE **STACK** MODE FOR FOCUSED DATA EXPLORATION, **GRID** FOR COMPARATIVE METRICS, AND **LIST** FOR RAPID SCANNING.
              </p>
            </div>
            <div className="p-10 rounded bg-void border-2 border-red/[0.15] shadow-hard-red space-y-6 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 p-4 opacity-10">
                <Shield className="w-16 h-16 text-red" />
              </div>
              <h3 className="text-2xl font-display font-bold text-red uppercase tracking-tighter italic">
                BNS_COMPLIANCE_STRATUM
              </h3>
              <p className="text-sm text-red-light/60 leading-relaxed font-body uppercase tracking-wider italic">
                EVERY VECTOR IN THIS STACK REPRESENTS A REAL-WORLD CAPABILITY OF THE JUSTICEAI ENGINE, HARD-CODED FOR THE BHARATIYA NYAYA SANHITA TRANSITION CYCLE. NO CITIZEN LEFT BEHIND.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
