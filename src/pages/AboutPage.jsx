import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Shield, Users, Target } from 'lucide-react';
import Header from '../components/ui/Header';

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const features = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To democratize legal power. Justice shouldn't be reserved for those who can afford expensive retainers."
    },
    {
      icon: Users,
      title: "For Every Citizen",
      description: "Designed specifically for the common person navigate complex Indian legal procedures with clarity."
    },
    {
      icon: Shield,
      title: "Constitutional Basis",
      description: "Our intelligence is grounded in the Constitution of India (updated 2024) and key statutes like IPC, BNS, and Consumer Acts."
    }
  ];

  return (
    <div className="relative min-h-screen bg-void pb-24">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 space-y-24">
        {/* Hero Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-6"
        >
          <motion.div variants={itemVariants} className="inline-flex p-3 rounded-2xl bg-gold/5 border border-gold/10 mb-4">
            <Scale className="w-8 h-8 text-gold" />
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-display font-semibold">
            Justice for <span className="text-gold-gradient">Everyone</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto font-body">
            JusticeAI was built to bridge the gap between complex legal jargon 
            and the people who need protection the most.
          </motion.p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className="p-8 rounded-3xl premium-blur border border-white/5 space-y-4 hover:border-gold/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-raised flex items-center justify-center border border-white/10 group-hover:border-gold/40 transition-colors">
                <feature.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-xl font-display text-white">{feature.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed font-body">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-12 rounded-[40px] bg-raised border border-white/5 space-y-8"
        >
          <div className="flex items-center gap-4 border-b border-white/5 pb-6">
            <Shield className="w-6 h-6 text-gold" />
            <h2 className="text-2xl font-display text-white">Full Legal Disclaimer</h2>
          </div>
          <div className="space-y-4 text-sm text-text-secondary leading-relaxed font-body">
            <p>
              JusticeAI is an experimental AI-powered legal co-pilot. It is designed for informational 
              purposes only. **JusticeAI is not a lawyer and does not provide legal advice.**
            </p>
            <p>
              While we strive to provide accurate legal information based on Indian statutes, 
              laws and interpretations can change. The predictions and strategies provided are 
              estimates and should not be considered as a guarantee of any legal outcome.
            </p>
            <p>
              Always consult with a qualified advocate or legal professional before taking 
              any formal legal steps, filing cases, or signing legal documents. Your use of 
              JusticeAI acknowledges that you understand these limitations.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
