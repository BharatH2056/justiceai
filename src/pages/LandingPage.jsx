import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Scale, Gavel, ShieldCheck, FileText, ChevronRight, BookOpen, Calculator, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import Header from '../components/ui/Header';

export default function LandingPage() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const features = [
    {
      icon: MessageSquare,
      title: "AI Legal Chat",
      description: "Describe your case to our intelligent co-pilot. Get strategy, arguments, and courtroom preparation.",
      link: "/chat",
      cta: "Start Analysis"
    },
    {
      icon: FileText,
      title: "Document Generator",
      description: "Generate Legal Notices, Consumer Complaints, RTI Applications, and FIR drafts instantly.",
      link: "/documents",
      cta: "Create Document"
    },
    {
      icon: BookOpen,
      title: "Know Your Rights",
      description: "Explore 18+ rights across Consumer, Tenant, Employee, Women, Digital & Student categories.",
      link: "/rights",
      cta: "Explore Rights"
    },
    {
      icon: Calculator,
      title: "Cost Estimator",
      description: "Calculate court fees, lawyer costs, and expected timelines before committing to legal action.",
      link: "/estimator",
      cta: "Estimate Costs"
    },
  ];

  return (
    <div className="relative min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center md:text-left grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Column: Hero Content */}
          <div className="space-y-10">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 text-gold-light text-[10px] uppercase font-bold tracking-[0.2em] rounded-full border border-gold/20 mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Now with Document Generator & Rights Explorer</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-display font-semibold leading-none">
                Win Your Case <br />
                <span className="text-gold-gradient">Without a Lawyer</span>
              </h1>
              <p className="text-xl md:text-2xl text-text-secondary font-body max-w-xl leading-relaxed">
                Empowering every Indian with an AI Legal Co-pilot. 
                Understand your rights, build a winning strategy, and 
                navigate the law with confidence.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button 
                onClick={() => navigate('/chat')}
                className="group relative bg-gold text-void px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 hover:bg-gold-light transition-all active:scale-95 shadow-xl shadow-gold/10"
              >
                <span>Launch Your Case</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center gap-3 px-6 py-4 rounded-full border border-white/10 premium-blur bg-white/5">
                <ShieldCheck className="w-5 h-5 text-gold-light" />
                <span className="text-sm font-medium text-text-secondary italic">Specialized in Indian Laws</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 pt-8 border-t border-white/5">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-2xl font-display text-gold">40+</span>
                <p className="text-[11px] uppercase tracking-wider text-text-tertiary font-bold">Indian Acts Covered</p>
              </div>
              <div className="space-y-1 text-center md:text-left">
                <span className="text-2xl font-display text-gold">Free</span>
                <p className="text-[11px] uppercase tracking-wider text-text-tertiary font-bold">Hackathon Access</p>
              </div>
              <div className="space-y-1 text-center md:text-left">
                <span className="text-2xl font-display text-gold">Secure</span>
                <p className="text-[11px] uppercase tracking-wider text-text-tertiary font-bold">Local Encryption</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Elements */}
          <motion.div 
            variants={itemVariants}
            className="hidden lg:block relative"
          >
            <div className="absolute inset-0 bg-gold/10 blur-[120px] rounded-full" />
            <div className="relative premium-blur border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-display text-white">Sample Case Analysis</h3>
                  <p className="text-xs text-text-tertiary">Consumer Protection Act, 2019</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Probability of Win</span>
                    <span className="text-gold">82%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "82%" }}
                      transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                      className="h-full gold-gradient" 
                    />
                  </div>
                </div>
                
                <div className="space-y-3 pt-4">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs text-text-secondary leading-relaxed">
                    Based on Section 35, you are entitled to file a complaint for 
                    deficient service. No lawyer required for filing.
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded bg-raised text-[10px] text-gold-light border border-gold/20 italic">Action Required</span>
                    <span className="px-2 py-1 rounded bg-raised text-[10px] text-text-tertiary border border-white/5 uppercase font-medium">Step 1 of 4</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-32 space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-semibold">
              Everything You <span className="text-gold-gradient">Need</span>
            </h2>
            <p className="text-lg text-text-secondary font-body max-w-2xl mx-auto">
              A complete legal toolkit designed for the common citizen. No jargon, no expensive lawyers — just clarity and action.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={i}
                  variants={itemVariants}
                  onClick={() => navigate(feature.link)}
                  className="group cursor-pointer p-7 rounded-[28px] premium-blur border border-white/5 hover:border-gold/30 transition-all duration-500 space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-raised border border-white/10 flex items-center justify-center group-hover:border-gold/40 group-hover:scale-110 transition-all duration-500">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-xl font-display text-white group-hover:text-gold transition-colors">{feature.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed font-body">{feature.description}</p>
                  <div className="flex items-center gap-2 text-xs font-bold text-gold-light uppercase tracking-widest group-hover:gap-3 transition-all">
                    <span>{feature.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </main>

      <footer className="py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-tertiary uppercase tracking-widest font-medium">
            © 2026 JusticeAI — Made for the Digital India Hackathon
          </p>
          <div className="flex gap-8">
            <span className="text-[10px] text-text-tertiary hover:text-gold transition-colors cursor-pointer uppercase font-bold tracking-widest">Privacy</span>
            <span className="text-[10px] text-text-tertiary hover:text-gold transition-colors cursor-pointer uppercase font-bold tracking-widest">Disclaimer</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
