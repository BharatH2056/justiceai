import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Home, Briefcase, Users, Monitor, GraduationCap, Scale, BookOpen, ChevronDown, ChevronUp, ExternalLink, Shield } from 'lucide-react';
import Header from '../components/ui/Header';

const CATEGORIES = [
  { id: 'all', label: 'All Rights', icon: Scale },
  { id: 'consumer', label: 'Consumer', icon: ShoppingBag },
  { id: 'tenant', label: 'Tenant', icon: Home },
  { id: 'employee', label: 'Employee', icon: Briefcase },
  { id: 'women', label: 'Women', icon: Users },
  { id: 'digital', label: 'Digital', icon: Monitor },
  { id: 'student', label: 'Student', icon: GraduationCap },
];

const RIGHTS_DATA = [
  {
    id: 1,
    category: 'consumer',
    title: 'Right to be Protected Against Hazardous Products',
    summary: 'Protection against marketing of goods and services that are hazardous to life and property.',
    details: 'Under the Consumer Protection Act, 2019, every consumer has the right to be protected against the marketing of goods and services which are hazardous to life and property. Product liability claims can be filed against manufacturers, sellers, and service providers.',
    articles: ['Section 2(9) — Consumer Protection Act, 2019', 'Art. 21 — Right to Life includes safety'],
    remedies: ['File complaint at District/State/National Consumer Commission', 'Product liability action under Chapter VI', 'Claim compensation for injury/damage'],
  },
  {
    id: 2,
    category: 'consumer',
    title: 'Right to Refund for Defective Products',
    summary: 'Return defective goods and claim a full refund or replacement within warranty period.',
    details: 'If a product has manufacturing defects or does not match the seller\'s description, you are entitled to a replacement, repair, or full refund. Filing at Consumer Forum requires no lawyer and a minimal ₹100-₹5000 fee.',
    articles: ['Section 35 — Consumer Protection Act, 2019', 'Section 39 — Remedies available'],
    remedies: ['File consumer complaint online at edaakhil.nic.in', 'No lawyer required for filing', 'Court fee: ₹100 (claims < ₹5L) to ₹5000 (claims > ₹1Cr)'],
  },
  {
    id: 3,
    category: 'consumer',
    title: 'Right Against Unfair Trade Practices',
    summary: 'Protection against false advertising, misleading claims, and unfair business tactics.',
    details: 'Unfair trade practices include false representation about quality, misleading advertisements, and bait-and-switch tactics. The CCPA (Central Consumer Protection Authority) can impose penalties up to ₹10 lakh on first offense.',
    articles: ['Section 2(47) — Unfair Trade Practice definition', 'Section 18 — CCPA powers'],
    remedies: ['Complain to CCPA via consumerhelpline.gov.in', 'File at Consumer Forum', 'Report misleading ads to ASCI (ascionline.in)'],
  },
  {
    id: 4,
    category: 'tenant',
    title: 'Right to Security Deposit Refund',
    summary: 'Landlord must return your security deposit (minus legitimate deductions) when you vacate.',
    details: 'Most state Rent Control Acts mandate return of security deposit within 1-3 months of vacating. Deductions can only be made for actual damage beyond normal wear and tear, with itemized proof. In many states, unreasonable withholding is actionable.',
    articles: ['State Rent Control Acts (varies by state)', 'Model Tenancy Act, 2021 — Section 11'],
    remedies: ['Send legal notice demanding return within 15 days', 'File civil suit in Small Causes Court', 'Approach Rent Authority (if state has adopted Model Tenancy Act)'],
  },
  {
    id: 5,
    category: 'tenant',
    title: 'Right Against Arbitrary Eviction',
    summary: 'A landlord cannot evict you without proper legal process and valid grounds.',
    details: 'Eviction requires proper notice (usually 1-3 months), valid legal grounds (non-payment, personal use, subletting without consent, etc.), and a court order. Self-help eviction (changing locks, cutting utilities) is illegal.',
    articles: ['State Rent Control Acts', 'Art. 21 — Right to shelter as part of Right to Life', 'Model Tenancy Act, 2021 — Section 22'],
    remedies: ['File police complaint if forceful eviction attempted', 'Approach Rent Controller/Civil Court for stay', 'File suit for injunction against landlord'],
  },
  {
    id: 6,
    category: 'tenant',
    title: 'Right to Essential Services',
    summary: 'Landlord cannot cut electricity, water, or other essential services to force eviction.',
    details: 'Cutting essential services is a criminal offense under most state laws. Even during disputes, landlords must maintain basic services. You can file a police complaint (criminal intimidation) and approach the Rent Controller.',
    articles: ['Section 503/506 IPC — Criminal Intimidation', 'State Rent Control Acts', 'Art. 21 — Right to dignified living'],
    remedies: ['File police complaint immediately', 'Approach Rent Controller for restoration order', 'File civil suit for mandatory injunction'],
  },
  {
    id: 7,
    category: 'employee',
    title: 'Right to Minimum Wages',
    summary: 'Every worker is entitled to wages not below the minimum wage fixed by the government.',
    details: 'The Code on Wages, 2019 (replacing the Minimum Wages Act) mandates a floor wage set by the Central Government. State governments can set higher minimums. Both scheduled and non-scheduled employment are covered.',
    articles: ['Code on Wages, 2019 — Section 6', 'Art. 43 — Living wage for workers (DPSP)'],
    remedies: ['Complain to Labour Commissioner', 'File claim in Labour Court', 'Helpline: 1800-11-0039 (Shram Suvidha)'],
  },
  {
    id: 8,
    category: 'employee',
    title: 'Right Against Wrongful Termination',
    summary: 'Employer must follow due process for termination including notice period and valid grounds.',
    details: 'Under the Industrial Disputes Act and employment contracts, retrenchment requires 1 month notice or pay in lieu, valid grounds, and compliance with "last in, first out" principle. Establishments with 100+ workers need government permission.',
    articles: ['Industrial Disputes Act, 1947 — Section 25F', 'Art. 14 — Equality; Art. 16 — Equal opportunity'],
    remedies: ['File complaint with Labour Commissioner', 'Approach Labour Court/Industrial Tribunal', 'Constitutional remedy via High Court (Art. 226) for government employees'],
  },
  {
    id: 9,
    category: 'employee',
    title: 'Right to Workplace Safety',
    summary: 'Every employee has the right to a safe working environment free from hazards.',
    details: 'The Occupational Safety, Health and Working Conditions Code, 2020 covers workplace safety. Employers must provide safety equipment, training, health checkups, and maintain safe premises. Violation can result in imprisonment up to 2 years.',
    articles: ['OSH Code, 2020 — Chapter III & IV', 'Art. 21 — Right to healthy working conditions', 'Factories Act, 1948 — Sections 11-20'],
    remedies: ['Report to Factory Inspector / Chief Inspector', 'File workmen\'s compensation claim', 'Approach NHRC for systemic violations'],
  },
  {
    id: 10,
    category: 'women',
    title: 'Right Against Sexual Harassment at Workplace',
    summary: 'Protection against sexual harassment at workplace with mandatory complaint mechanism.',
    details: 'The POSH Act (2013) mandates every organization with 10+ employees to form an Internal Complaints Committee (ICC). Complaints can be filed within 3 months (extendable to 6 months). Employer failure to comply attracts ₹50,000 penalty.',
    articles: ['Sexual Harassment of Women at Workplace Act, 2013', 'Vishaka Guidelines (1997)', 'Art. 14 & 21 — Equality and Dignified Life'],
    remedies: ['File complaint with Internal Complaints Committee (ICC)', 'Approach Local Complaints Committee (LCC) if ICC absent', 'File police complaint under IPC Sec 354A', 'National Commission for Women: ncw.nic.in'],
  },
  {
    id: 11,
    category: 'women',
    title: 'Right Against Domestic Violence',
    summary: 'Protection from physical, emotional, verbal, sexual, and economic abuse by partners/relatives.',
    details: 'The Protection of Women from Domestic Violence Act, 2005 provides civil remedies including protection orders, residence orders, monetary relief, and custody orders. You don\'t need to file for divorce to seek protection.',
    articles: ['Protection of Women from DV Act, 2005', 'IPC Section 498A — Cruelty by husband/relatives', 'Art. 21 — Right to live with dignity'],
    remedies: ['Call Women Helpline: 181 (24x7)', 'File complaint at nearest police station', 'Apply for protection order through Protection Officer or Court', 'File under Section 12 of DV Act in Magistrate court'],
  },
  {
    id: 12,
    category: 'women',
    title: 'Right to Equal Pay',
    summary: 'Women are entitled to equal remuneration for equal work or work of similar nature.',
    details: 'The Code on Wages, 2019 prohibits gender discrimination in wages and recruitment for the same work or work of similar nature. This applies to all establishments regardless of size.',
    articles: ['Code on Wages, 2019 — Section 3', 'Equal Remuneration Act, 1976 (now subsumed)', 'Art. 39(d) — Equal pay for equal work (DPSP)'],
    remedies: ['File complaint with Labour Commissioner', 'Approach Labour Court', 'File writ petition in High Court for government jobs'],
  },
  {
    id: 13,
    category: 'digital',
    title: 'Right to Data Privacy',
    summary: 'Your personal data cannot be collected, processed, or shared without your informed consent.',
    details: 'The Digital Personal Data Protection Act, 2023 gives individuals rights over their data including consent management, right to correction, right to erasure, and right to nominate. Data fiduciaries must obtain clear, informed consent.',
    articles: ['Digital Personal Data Protection Act, 2023', 'IT Act, 2000 — Section 43A', 'K.S. Puttaswamy v. Union of India (2017) — Right to Privacy as Fundamental Right'],
    remedies: ['File complaint with Data Protection Board', 'Withdraw consent from data fiduciaries', 'Report violations at grievance portal of the organization'],
  },
  {
    id: 14,
    category: 'digital',
    title: 'Right Against Cyber Fraud',
    summary: 'Legal protection against online fraud, phishing, identity theft, and financial cyber crimes.',
    details: 'Cyber fraud is punishable under the IT Act with imprisonment up to 3 years and fine up to ₹5 lakh. For financial fraud, banks must credit back unauthorized transactions reported within 3 working days (RBI guidelines).',
    articles: ['IT Act, 2000 — Section 66C (Identity Theft), 66D (Cheating)', 'IPC Section 420 — Cheating', 'RBI Circular on Limited Liability of Customers'],
    remedies: ['Report immediately at cybercrime.gov.in', 'Call Cyber Helpline: 1930', 'File complaint at nearest Cyber Crime Police Station', 'Report to bank within 3 days for zero liability'],
  },
  {
    id: 15,
    category: 'digital',
    title: 'Right Against Online Defamation',
    summary: 'Protection against false, defamatory content published about you on social media or websites.',
    details: 'Online defamation is actionable both as a civil wrong (damages) and criminal offense (imprisonment up to 2 years). Intermediaries like social media platforms must take down content within 36 hours of a court order.',
    articles: ['IPC Section 499/500 — Defamation', 'IT Act Section 79 — Intermediary Liability', 'IT Rules, 2021 — Grievance redressal mechanism'],
    remedies: ['Send takedown notice to platform (grievance officer)', 'File criminal complaint under IPC 500', 'File civil suit for damages and injunction', 'Report at cybercrime.gov.in for cyberstalking'],
  },
  {
    id: 16,
    category: 'student',
    title: 'Right to Education',
    summary: 'Free and compulsory education for every child aged 6-14 years. No child can be denied admission.',
    details: 'The Right of Children to Free and Compulsory Education Act, 2009 mandates free education in neighborhood schools. Private schools must reserve 25% seats for EWS/disadvantaged groups. No screening procedures or capitation fees allowed for admission.',
    articles: ['Art. 21A — Right to Education (Fundamental Right)', 'RTE Act, 2009', '86th Constitutional Amendment'],
    remedies: ['Approach School Management Committee', 'Complain to Block/District Education Officer', 'File complaint at edudel.nic.in (Delhi) or state portal', 'Approach National Commission for Protection of Child Rights (NCPCR)'],
  },
  {
    id: 17,
    category: 'student',
    title: 'Right Against Ragging',
    summary: 'Zero tolerance for ragging in educational institutions with strict criminal penalties.',
    details: 'Ragging is a criminal offense punishable with imprisonment up to 2 years. Every institution must constitute an Anti-Ragging Committee and an Anti-Ragging Squad. UGC regulations mandate FIR registration for complaints.',
    articles: ['UGC Regulations on Curbing Ragging, 2009', 'Supreme Court directions in Vishwa Jagriti Mission v. CBI (2019)', 'IPC 340, 342, 506 — Wrongful confinement, Intimidation'],
    remedies: ['Call National Anti-Ragging Helpline: 1800-180-5522', 'File complaint at antiragging.in', 'File FIR at police station', 'Complain to institution\'s Anti-Ragging Committee'],
  },
  {
    id: 18,
    category: 'student',
    title: 'Right to Fair Examination & Evaluation',
    summary: 'Students have the right to transparent and fair examination, and access to their evaluated answer sheets.',
    details: 'Under RTI Act, you can access your evaluated answer sheets. Universities must have transparent evaluation criteria. Marks/grades must be communicated within a reasonable time. Arbitrary marking can be challenged.',
    articles: ['RTI Act, 2005 — Section 6', 'CBSE Examination Bye-Laws', 'Art. 14 — Right to fair treatment'],
    remedies: ['File RTI for evaluated answer sheets', 'Apply for revaluation/rechecking (as per institution rules)', 'Approach university grievance cell', 'File writ petition in High Court for arbitrary evaluation'],
  },
];

function RightCard({ right, isExpanded, onToggle }) {
  const categoryObj = CATEGORIES.find(c => c.id === right.category);
  const CategoryIcon = categoryObj?.icon || Scale;

  return (
    <motion.div
      layout
      className="bg-raised rounded-[24px] border border-white/5 overflow-hidden hover:border-gold/20 transition-all duration-300"
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-6 flex items-start gap-4"
      >
        <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <CategoryIcon className="w-5 h-5 text-gold" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9px] uppercase tracking-[0.2em] text-gold-light font-extrabold px-2 py-0.5 bg-gold/10 rounded-full border border-gold/20">
              {right.category}
            </span>
          </div>
          <h3 className="text-lg font-display text-white leading-snug pr-4">{right.title}</h3>
          <p className="text-sm text-text-secondary font-body mt-1 leading-relaxed">{right.summary}</p>
        </div>
        <div className={`p-1.5 rounded-lg border transition-all flex-shrink-0 ${isExpanded ? 'bg-gold border-gold text-ink' : 'bg-transparent border-white/10 text-text-tertiary'}`}>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-5 border-t border-white/5 pt-5 ml-14">
              {/* Full Details */}
              <p className="text-sm text-text-secondary leading-relaxed font-body">{right.details}</p>

              {/* Legal References */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.15em] text-gold">
                  <BookOpen className="w-3.5 h-3.5" />
                  Legal References
                </label>
                <div className="flex flex-wrap gap-2">
                  {right.articles.map((art, i) => (
                    <span key={i} className="text-[11px] px-3 py-1.5 bg-gold/5 text-gold-light rounded-lg border border-gold/10 font-mono">
                      {art}
                    </span>
                  ))}
                </div>
              </div>

              {/* Remedies */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.15em] text-accent-success">
                  <Shield className="w-3.5 h-3.5" />
                  What You Can Do
                </label>
                <ul className="space-y-1.5">
                  {right.remedies.map((remedy, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-text-secondary font-body">
                      <span className="text-accent-success mt-0.5">→</span>
                      {remedy}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function RightsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const filteredRights = useMemo(() => {
    let results = RIGHTS_DATA;
    if (activeCategory !== 'all') {
      results = results.filter(r => r.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.details.toLowerCase().includes(q) ||
        r.articles.some(a => a.toLowerCase().includes(q)) ||
        r.remedies.some(rem => rem.toLowerCase().includes(q))
      );
    }
    return results;
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-void pb-32">
      <Header />
      
      <main className="max-w-5xl mx-auto px-6 pt-32 space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 text-gold-light text-[10px] uppercase font-bold tracking-[0.2em] rounded-full border border-gold/20">
            <Scale className="w-3.5 h-3.5" />
            <span>Rights Explorer</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-semibold">
            Know Your <span className="text-gold-gradient">Rights</span>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto font-body">
            Explore your fundamental and statutory rights under Indian law. Every entry includes legal references and actionable remedies.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rights, laws, articles..."
              className="w-full bg-raised border border-white/10 rounded-2xl pl-14 pr-5 py-4 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-gold/40 transition-colors font-body"
            />
            {searchQuery && (
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] text-text-tertiary font-bold uppercase tracking-widest">
                {filteredRights.length} results
              </span>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            const count = cat.id === 'all' ? RIGHTS_DATA.length : RIGHTS_DATA.filter(r => r.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setExpandedId(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-gold text-ink shadow-lg shadow-gold/20'
                    : 'bg-raised border border-white/5 text-text-tertiary hover:text-white hover:border-white/20'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-md ${isActive ? 'bg-ink/20 text-ink' : 'bg-white/5 text-text-tertiary'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Rights Grid */}
        <motion.div layout className="grid gap-4">
          <AnimatePresence>
            {filteredRights.map(right => (
              <RightCard
                key={right.id}
                right={right}
                isExpanded={expandedId === right.id}
                onToggle={() => setExpandedId(expandedId === right.id ? null : right.id)}
              />
            ))}
          </AnimatePresence>

          {filteredRights.length === 0 && (
            <div className="text-center py-16 space-y-4">
              <Search className="w-12 h-12 text-text-tertiary mx-auto opacity-40" />
              <p className="text-text-secondary font-body">No rights found matching your search.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="text-gold text-sm font-bold hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
