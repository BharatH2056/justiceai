import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, IndianRupee, Clock, ChevronRight, Scale, TrendingUp, AlertTriangle, Info } from 'lucide-react';
import Header from '../components/ui/Header';

const CASE_TYPES = [
  { id: 'consumer', label: 'Consumer Complaint', icon: '🛒', courtFeeBase: 100, lawyerRange: [5000, 25000], timelineMonths: [3, 12], description: 'Consumer Forum — No lawyer required' },
  { id: 'civil', label: 'Civil Suit', icon: '⚖️', courtFeeBase: 2000, lawyerRange: [15000, 100000], timelineMonths: [12, 60], description: 'District/High Court civil proceedings' },
  { id: 'criminal', label: 'Criminal Case', icon: '🔒', courtFeeBase: 0, lawyerRange: [25000, 200000], timelineMonths: [6, 36], description: 'FIR, Investigation, Trial' },
  { id: 'labour', label: 'Labour Dispute', icon: '👷', courtFeeBase: 0, lawyerRange: [10000, 50000], timelineMonths: [3, 18], description: 'Labour Court / Industrial Tribunal' },
  { id: 'rti', label: 'RTI Application', icon: '📄', courtFeeBase: 10, lawyerRange: [0, 0], timelineMonths: [1, 3], description: 'Right to Information — Self-filing' },
  { id: 'rent', label: 'Rent / Eviction', icon: '🏠', courtFeeBase: 500, lawyerRange: [10000, 50000], timelineMonths: [6, 24], description: 'Rent Controller / Civil Court' },
  { id: 'property', label: 'Property Dispute', icon: '🏗️', courtFeeBase: 5000, lawyerRange: [25000, 150000], timelineMonths: [24, 120], description: 'Title suits, injunctions, partition' },
  { id: 'divorce', label: 'Divorce / Family', icon: '👨‍👩‍👧', courtFeeBase: 1000, lawyerRange: [20000, 100000], timelineMonths: [6, 36], description: 'Family Court proceedings' },
];

const COURT_LEVELS = [
  { id: 'district', label: 'District Court / Forum', multiplier: 1 },
  { id: 'state', label: 'State Commission / High Court', multiplier: 2.5 },
  { id: 'national', label: 'National Commission / Supreme Court', multiplier: 5 },
];

const CITY_TIERS = [
  { id: 'tier1', label: 'Metro (Delhi, Mumbai, Bangalore, Chennai)', multiplier: 2.0 },
  { id: 'tier2', label: 'Tier-2 (Pune, Jaipur, Lucknow, Kochi)', multiplier: 1.4 },
  { id: 'tier3', label: 'Tier-3 / Rural', multiplier: 1.0 },
];

const COMPLEXITY_LEVELS = [
  { id: 'simple', label: 'Simple', multiplier: 1.0, description: 'Straightforward facts, clear evidence' },
  { id: 'moderate', label: 'Moderate', multiplier: 1.5, description: 'Multiple parties or contested facts' },
  { id: 'complex', label: 'Complex', multiplier: 2.5, description: 'Large claims, expert witnesses, appeals' },
];

function SelectCard({ item, isSelected, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`text-left p-4 rounded-2xl border transition-all duration-300 ${
        isSelected
          ? 'bg-gold/10 border-gold/40 shadow-lg shadow-gold/5'
          : 'bg-raised border-white/5 hover:border-white/20'
      }`}
    >
      {children}
    </button>
  );
}

function ResultCard({ icon: Icon, label, value, sublabel, color = 'gold' }) {
  const colorMap = {
    gold: 'text-gold bg-gold/10 border-gold/20',
    success: 'text-accent-success bg-accent-success/10 border-accent-success/20',
    warning: 'text-accent-warning bg-accent-warning/10 border-accent-warning/20',
    info: 'text-accent-info bg-accent-info/10 border-accent-info/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-[24px] bg-raised border border-white/5"
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${colorMap[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-tertiary mb-1">{label}</p>
          <p className="text-2xl font-display text-white">{value}</p>
          {sublabel && <p className="text-xs text-text-secondary font-body mt-1">{sublabel}</p>}
        </div>
      </div>
    </motion.div>
  );
}

export default function EstimatorPage() {
  const [caseType, setCaseType] = useState(null);
  const [courtLevel, setCourtLevel] = useState('district');
  const [cityTier, setCityTier] = useState('tier2');
  const [complexity, setComplexity] = useState('simple');
  const [claimAmount, setClaimAmount] = useState('');

  const estimate = useMemo(() => {
    if (!caseType) return null;

    const caseData = CASE_TYPES.find(c => c.id === caseType);
    const court = COURT_LEVELS.find(c => c.id === courtLevel);
    const city = CITY_TIERS.find(c => c.id === cityTier);
    const comp = COMPLEXITY_LEVELS.find(c => c.id === complexity);

    if (!caseData || !court || !city || !comp) return null;

    const claim = parseFloat(claimAmount) || 0;

    // Court fee calculation
    let courtFee = caseData.courtFeeBase * court.multiplier;
    if (claim > 0 && caseType === 'civil') {
      courtFee = Math.max(courtFee, claim * 0.01); // ~1% ad valorem for civil
    }
    if (claim > 0 && caseType === 'consumer') {
      if (claim <= 500000) courtFee = 100;
      else if (claim <= 2000000) courtFee = 200;
      else if (claim <= 5000000) courtFee = 500;
      else if (claim <= 10000000) courtFee = 2000;
      else courtFee = 5000;
    }

    // Lawyer fees
    const lawyerMin = Math.round(caseData.lawyerRange[0] * city.multiplier * comp.multiplier);
    const lawyerMax = Math.round(caseData.lawyerRange[1] * city.multiplier * comp.multiplier);

    // Stamp duty & misc
    const stampDuty = caseType === 'rti' ? 0 : Math.max(100, Math.round(courtFee * 0.3));
    const miscExpenses = Math.round((courtFee + stampDuty) * 0.5 + 500); // notary, travel, etc.

    // Timeline
    const timeMin = Math.round(caseData.timelineMonths[0] * comp.multiplier);
    const timeMax = Math.round(caseData.timelineMonths[1] * comp.multiplier);

    // Totals
    const totalMin = courtFee + stampDuty + miscExpenses + lawyerMin;
    const totalMax = courtFee + stampDuty + miscExpenses + lawyerMax;

    return {
      courtFee: Math.round(courtFee),
      stampDuty,
      miscExpenses,
      lawyerMin,
      lawyerMax,
      timeMin,
      timeMax,
      totalMin,
      totalMax,
      caseData,
    };
  }, [caseType, courtLevel, cityTier, complexity, claimAmount]);

  const formatCurrency = (val) => `₹${val.toLocaleString('en-IN')}`;
  const formatTimeline = (min, max) => {
    if (min === max) return `~${min} months`;
    return `${min}–${max} months`;
  };

  return (
    <div className="min-h-screen bg-void pb-32">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 pt-32 space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 text-gold-light text-[10px] uppercase font-bold tracking-[0.2em] rounded-full border border-gold/20">
            <Calculator className="w-3.5 h-3.5" />
            <span>Cost Estimator</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-semibold">
            Legal Cost <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto font-body">
            Get an instant estimate of court fees, lawyer costs, and expected timelines for your legal proceedings in India.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr,400px] gap-8">
          {/* Left: Configuration */}
          <div className="space-y-10">
            {/* Step 1: Case Type */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-[11px] uppercase font-bold tracking-[0.15em] text-gold">
                <span className="w-6 h-6 rounded-full bg-gold text-ink flex items-center justify-center text-[10px] font-extrabold">1</span>
                Type of Case
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {CASE_TYPES.map(ct => (
                  <SelectCard key={ct.id} item={ct} isSelected={caseType === ct.id} onClick={() => setCaseType(ct.id)}>
                    <div className="text-2xl mb-2">{ct.icon}</div>
                    <h4 className={`text-sm font-display font-semibold ${caseType === ct.id ? 'text-gold' : 'text-white'}`}>{ct.label}</h4>
                    <p className="text-[10px] text-text-tertiary font-body mt-1">{ct.description}</p>
                  </SelectCard>
                ))}
              </div>
            </div>

            {caseType && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                {/* Step 2: Claim Amount */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-[11px] uppercase font-bold tracking-[0.15em] text-gold">
                    <span className="w-6 h-6 rounded-full bg-gold text-ink flex items-center justify-center text-[10px] font-extrabold">2</span>
                    Claim Amount (Optional)
                  </label>
                  <div className="relative max-w-sm">
                    <IndianRupee className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                    <input
                      type="number"
                      value={claimAmount}
                      onChange={(e) => setClaimAmount(e.target.value)}
                      placeholder="e.g. 500000"
                      className="w-full bg-ink border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-gold/40 transition-colors font-body"
                    />
                  </div>
                </div>

                {/* Step 3: Court Level */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-[11px] uppercase font-bold tracking-[0.15em] text-gold">
                    <span className="w-6 h-6 rounded-full bg-gold text-ink flex items-center justify-center text-[10px] font-extrabold">3</span>
                    Court Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {COURT_LEVELS.map(cl => (
                      <SelectCard key={cl.id} item={cl} isSelected={courtLevel === cl.id} onClick={() => setCourtLevel(cl.id)}>
                        <Scale className={`w-5 h-5 mb-2 ${courtLevel === cl.id ? 'text-gold' : 'text-text-tertiary'}`} />
                        <h4 className={`text-xs font-display font-semibold ${courtLevel === cl.id ? 'text-gold' : 'text-white'}`}>{cl.label}</h4>
                      </SelectCard>
                    ))}
                  </div>
                </div>

                {/* Step 4: City Tier */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-[11px] uppercase font-bold tracking-[0.15em] text-gold">
                    <span className="w-6 h-6 rounded-full bg-gold text-ink flex items-center justify-center text-[10px] font-extrabold">4</span>
                    City / Location
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {CITY_TIERS.map(ct => (
                      <SelectCard key={ct.id} item={ct} isSelected={cityTier === ct.id} onClick={() => setCityTier(ct.id)}>
                        <h4 className={`text-xs font-display font-semibold ${cityTier === ct.id ? 'text-gold' : 'text-white'}`}>{ct.label}</h4>
                      </SelectCard>
                    ))}
                  </div>
                </div>

                {/* Step 5: Complexity */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-[11px] uppercase font-bold tracking-[0.15em] text-gold">
                    <span className="w-6 h-6 rounded-full bg-gold text-ink flex items-center justify-center text-[10px] font-extrabold">5</span>
                    Case Complexity
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {COMPLEXITY_LEVELS.map(cl => (
                      <SelectCard key={cl.id} item={cl} isSelected={complexity === cl.id} onClick={() => setComplexity(cl.id)}>
                        <h4 className={`text-xs font-display font-semibold mb-1 ${complexity === cl.id ? 'text-gold' : 'text-white'}`}>{cl.label}</h4>
                        <p className="text-[10px] text-text-tertiary font-body">{cl.description}</p>
                      </SelectCard>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: Results Panel */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {!estimate ? (
              <div className="p-12 rounded-[32px] bg-raised border border-white/5 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gold/5 flex items-center justify-center mx-auto border border-gold/10">
                  <Calculator className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-xl font-display text-white italic">Select a Case Type</h3>
                <p className="text-sm text-text-secondary font-body">
                  Choose from the options on the left to get an instant cost estimate.
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Total Estimate */}
                <div className="p-6 rounded-[24px] gold-gradient text-ink">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-70 mb-1">Estimated Total Cost</p>
                  <p className="text-3xl font-display font-semibold">
                    {formatCurrency(estimate.totalMin)} — {formatCurrency(estimate.totalMax)}
                  </p>
                  <p className="text-xs font-body mt-1 opacity-80">{estimate.caseData.label} • {estimate.caseData.description}</p>
                </div>

                <ResultCard icon={Scale} label="Court Fees" value={formatCurrency(estimate.courtFee)} sublabel="Filing + process fees" color="gold" />
                <ResultCard icon={IndianRupee} label="Stamp Duty & Misc" value={formatCurrency(estimate.stampDuty + estimate.miscExpenses)} sublabel="Notary, affidavit, travel" color="info" />
                
                {estimate.lawyerMax > 0 && (
                  <ResultCard 
                    icon={TrendingUp} 
                    label="Lawyer Fees (estimated)" 
                    value={`${formatCurrency(estimate.lawyerMin)} — ${formatCurrency(estimate.lawyerMax)}`} 
                    sublabel="Depends on experience & reputation" 
                    color="warning" 
                  />
                )}

                <ResultCard 
                  icon={Clock} 
                  label="Expected Timeline" 
                  value={formatTimeline(estimate.timeMin, estimate.timeMax)} 
                  sublabel="From filing to resolution" 
                  color="success" 
                />

                {/* Disclaimer */}
                <div className="p-4 rounded-2xl bg-accent-warning/5 border border-accent-warning/10">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-accent-warning flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] text-accent-warning leading-relaxed font-body">
                      These are rough estimates based on general rates. Actual costs vary significantly by jurisdiction, lawyer, and case specifics. Consult a local advocate for accurate pricing.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
