import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Home, Briefcase, LandPlot, Play, ArrowRight } from 'lucide-react';
import Header from '../components/ui/Header';

const SAMPLES = [
  {
    id: 'consumer',
    title: "Consumer Rights",
    description: "Defective product from a major electronics retailer with a refused refund.",
    icon: ShoppingBag,
    color: "accent-success",
    initialMessage: "I bought a premium laptop for ₹85,000 last month. It stopped working after 10 days. The retailer refuses a refund and says it's physical damage. The service center says it's a motherboard failure. What are my rights under the Consumer Protection Act?"
  },
  {
    id: 'tenant',
    title: "Tenant Dispute",
    description: "Landlord refusing to return security deposit after moving out.",
    icon: Home,
    color: "gold",
    initialMessage: "I moved out of my flat in Bangalore last week after completing the full notice period. My landlord is refusing to return my security deposit of ₹1,00,000, claiming 'painting charges' and 'minor wear and tear' without any itemized bill. What legal steps can I take?"
  },
  {
    id: 'workplace',
    title: "Workplace Issue",
    description: "Wrongful termination without notice period or severance pay.",
    icon: Briefcase,
    color: "accent-error",
    initialMessage: "I was suddenly terminated from my job yesterday with no prior warning or performance issues. My contract requires a 3-month notice period, but they told me to leave immediately and are refusing to pay for the notice period. This is a clear breach of my employment contract."
  },
  {
    id: 'property',
    title: "Property Boundary",
    description: "Neighbor encroaching on ancestral land with a new construction.",
    icon: LandPlot,
    color: "gold-light",
    initialMessage: "I have ancestral agricultural land in Pune. My neighbor has started a construction project that encroaches about 5 feet into my clearly marked boundary. I have the official land survey records from 1995, but he is ignoring my requests to stop. How do I file an injunction?"
  }
];

export default function SamplesPage() {
  const navigate = useNavigate();

  const handleLaunch = (sample) => {
    // Navigate to chat and pass the sample data via state
    navigate('/chat', { state: { sampleCase: sample.initialMessage, caseType: sample.title } });
  };

  return (
    <div className="min-h-screen bg-void pb-32">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 pt-32 space-y-16">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 text-gold-light text-[10px] uppercase font-bold tracking-[0.2em] rounded-full border border-gold/20">
            <Play className="w-3.5 h-3.5" />
            <span>Interactive Demos</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-semibold">Ready-to-Use <span className="text-gold-gradient">Samples</span></h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto font-body">
            Test JusticeAI instantly with these common legal scenarios. Click any card to launch a pre-configured simulation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLES.map((sample, i) => (
            <motion.div 
              key={sample.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-full"
            >
              <div className="h-full p-8 rounded-[40px] premium-blur border border-white/5 hover:border-gold/30 transition-all duration-500 overflow-hidden flex flex-col">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-gold/5 blur-3xl group-hover:bg-gold/10 transition-all" />
                
                <div className="w-14 h-14 rounded-[20px] bg-raised border border-white/10 flex items-center justify-center mb-6 border-b-4 border-b-gold/20 group-hover:border-b-gold group-hover:scale-110 transition-all duration-500">
                  <sample.icon className={`w-7 h-7 text-gold-light`} />
                </div>

                <h3 className="text-2xl font-display text-white mb-3 group-hover:text-gold transition-colors">{sample.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed font-body mb-8 flex-1">
                  {sample.description}
                </p>

                <button 
                  onClick={() => handleLaunch(sample)}
                  className="w-full flex items-center justify-between gap-3 bg-white/5 hover:bg-gold text-white hover:text-ink px-6 py-4 rounded-2xl font-bold transition-all group-hover:shadow-lg"
                >
                  <span className="text-xs uppercase tracking-widest">Launch Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-12 rounded-[50px] bg-raised border border-white/5 text-center space-y-6">
          <h2 className="text-3xl font-display text-white">Have a unique situation?</h2>
          <p className="text-text-secondary font-body max-w-xl mx-auto">
            You don't need a sample. Start a custom conversation with our legal co-pilot to build a strategy for your specific case.
          </p>
          <motion.a
            href="/chat"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-raised border border-gold/40 text-gold px-12 py-5 rounded-2xl font-bold transition-all shadow-xl hover:bg-gold hover:text-ink"
          >
            <span>Start Fresh Case</span>
            <Play className="w-4 h-4 fill-current" />
          </motion.a>
        </div>
      </main>
    </div>
  );
}
