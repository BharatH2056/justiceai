import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scale,
  CheckCircle2,
  ShieldAlert,
  HeartHandshake,
  Phone,
  ExternalLink,
  Mail,
  Download,
  MapPin,
  AlertCircle,
  FilePlus,
  Globe,
  ArrowRight,
} from 'lucide-react';
import Header from '../components/ui/Header.jsx';
import Footer from '../components/ui/Footer.jsx';

// Enhanced eligibility criteria based on Section 12 of LSA Act, 1987
const CRITERIA = [
  {
    id: 'gender',
    label: 'Are you a woman or a child?',
    type: 'boolean',
    section: '12(a)',
    desc: 'All women and children are eligible regardless of income.',
  },
  {
    id: 'caste',
    label: 'Are you a member of SC or ST?',
    type: 'boolean',
    section: '12(b)',
    desc: 'Scheduled Castes and Scheduled Tribes are eligible regardless of income.',
  },
  {
    id: 'income',
    label: 'Is your annual family income below ₹3,00,000?',
    type: 'boolean',
    section: '12(h)',
    desc: 'Threshold varies by State (e.g., ₹3L in Delhi, ₹1L elsewhere).',
    isIncome: true,
  },
  {
    id: 'disaster',
    label: 'Victim of mass disaster, violence, flood, or drought?',
    type: 'boolean',
    section: '12(e)',
    desc: 'Victims of ethnic violence or natural disasters.',
  },
  {
    id: 'disability',
    label: 'Are you a person with a disability?',
    type: 'boolean',
    section: '12(d)',
    desc: 'Including mental illness or physical handicap.',
  },
  {
    id: 'custody',
    label: 'Are you in police or judicial custody?',
    type: 'boolean',
    section: '12(g)',
    desc: 'Including protective homes or psychiatric hospitals.',
  },
  {
    id: 'workman',
    label: 'Are you an industrial workman?',
    type: 'boolean',
    section: '12(f)',
    desc: 'As defined under the Industrial Disputes Act.',
  },
  {
    id: 'trafficking',
    label: 'Victim of human trafficking or forced labor?',
    type: 'boolean',
    section: '12(c)',
    desc: 'Victims of begar or trafficking.',
  },
];

const STATE_SLSAs = {
  Delhi: { name: 'Delhi SLSA', email: 'dslsa-phc@nic.in', portal: 'dslsa.org', phone: '1516' },
  Maharashtra: {
    name: 'Maharashtra SLSA',
    email: 'mslsa-bhc@nic.in',
    portal: 'legalservices.maharashtra.gov.in',
    phone: '022-22691395',
  },
  'West Bengal': {
    name: 'West Bengal SLSA',
    email: 'wbslsa@gmail.com',
    portal: 'wbslsa.gov.in',
    phone: '1800-345-3888',
  },
  Karnataka: {
    name: 'Karnataka SLSA',
    email: 'kslsabangalore@gmail.com',
    portal: 'kslsa.kar.nic.in',
    phone: '1800-425-90900',
  },
  'Tamil Nadu': {
    name: 'Tamil Nadu SLSA',
    email: 'tnslsa@gmail.com',
    portal: 'tnslsa.tn.gov.in',
    phone: '044-25342441',
  },
  Telangana: {
    name: 'Telangana SLSA',
    email: 'tslsa-hyd@nic.in',
    portal: 'tslsa.telangana.gov.in',
    phone: '155335',
  },
  'Uttar Pradesh': {
    name: 'UP SLSA',
    email: 'upslsa@nic.in',
    portal: 'upslsa.up.nic.in',
    phone: '1800-419-0234',
  },
};

function generateApplication(state, criteriaMet) {
  const date = new Date().toLocaleDateString('en-IN');
  const grounds = criteriaMet
    .map(
      (c) =>
        `• ${CRITERIA.find((cr) => cr.id === c)?.label} (Sec ${CRITERIA.find((cr) => cr.id === c)?.section})`,
    )
    .join('\n');

  return `To,
The Member Secretary,
${STATE_SLSAs[state]?.name || 'State Legal Services Authority'},
${state}, India.

Subject: Request for Free Legal Services under Section 12 of LSA Act, 1987.

Respected Sir/Madam,

I, the undersigned, am a resident of ${state} and require legal assistance for a matter involving [Case Details].

I satisfy the eligibility criteria for free legal services as per Section 12 of the Legal Services Authorities Act, 1987, on the following grounds:
${grounds}

I request the Authority to kindly:
1. Appoint a Panel Lawyer for my representation.
2. Exempt me from payment of court fees and process fees.
3. Provide assistance in drafting and file verification.

Attached are copies of my ID proof and relevant documents for your perusal.

Thanking you,

Your Faithfully,
[Name]
Date: ${date}
Phone: [Contact Number]`;
}

export default function LegalAidCheckerPage() {
  const [answers, setAnswers] = useState({});
  const [selectedState, setSelectedState] = useState('Delhi');
  const [showResult, setShowResult] = useState(false);

  const eligibleCriteria = useMemo(
    () =>
      Object.entries(answers)
        .filter(([, val]) => val === true)
        .map(([key]) => key),
    [answers],
  );

  const isEligible = eligibleCriteria.length > 0;

  const handleDownload = () => {
    const text = generateApplication(selectedState, eligibleCriteria);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Legal_Aid_Application_${selectedState}.txt`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-void pb-8 flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-6 pt-32 w-full space-y-10 pb-16">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-red/10 text-red-light text-[10px] uppercase font-extrabold tracking-[0.4em] rounded border-2 border-red/20 shadow-[4px_4px_0px_0px_rgba(225,29_72,0.1)] font-display italic">
            <HeartHandshake className="w-4 h-4" />
            <span>Equal_Access_Gateway_Terminal</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter leading-none italic">
            Legal Aid <span className="text-red">Eligibility</span>
          </h1>
          <p className="text-lg text-text-tertiary leading-relaxed max-w-2xl mx-auto font-body uppercase tracking-wider italic">
            Verified under Section 12 of the LSA Act. Mandated state representation protocols for
            vulnerable nodes. Verify deployment status in 60s.
          </p>
        </div>

        <div className="bg-void rounded border-2 border-white/5 p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red/5 -mr-16 -mt-16 rotate-45 group-hover:bg-red/10 transition-all pointer-events-none" />
          {!showResult ? (
            <div className="space-y-12">
              {/* State Selection */}
              <div className="p-8 bg-void rounded border-2 border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 shadow-inner">
                <div className="space-y-2">
                  <p className="text-[10px] font-extrabold text-red uppercase tracking-[0.4em] italic opacity-60">
                    JURISDICTION_SELECTION
                  </p>
                  <p className="text-xs text-text-tertiary uppercase tracking-widest italic opacity-40">
                    STATUTORY_INCOME_LIMITS_VARY_BY_REGION
                  </p>
                </div>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="bg-void border-2 border-white/10 rounded px-6 py-4 text-sm text-white focus:border-red focus:outline-none min-w-[240px] font-display font-bold uppercase tracking-widest italic shadow-sm"
                >
                  {Object.keys(STATE_SLSAs).map((s) => (
                    <option key={s} value={s} className="bg-void text-white">
                      {s.toUpperCase()}_SLSA
                    </option>
                  ))}
                </select>
              </div>

              {/* Questions */}
              <div className="grid gap-6">
                {CRITERIA.map((q) => (
                  <div
                    key={q.id}
                    className="p-8 rounded border-2 border-white/5 bg-void flex flex-col sm:flex-row items-center justify-between gap-8 hover:border-white/20 transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] group/card"
                  >
                    <div className="space-y-3 flex-1 min-w-0">
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono font-bold text-red/40 px-2 py-0.5 border border-red/20 rounded italic">
                          INDEX_SEC_{q.section}
                        </span>
                        <h3 className="text-lg font-display font-bold text-white uppercase tracking-tight italic group-hover/card:text-red transition-colors">
                          {q.label}
                        </h3>
                      </div>
                      <p className="text-[10px] text-text-tertiary font-body uppercase tracking-wider italic opacity-60 leading-relaxed">
                        {q.desc}
                      </p>
                    </div>
                    <div className="flex gap-4 w-full sm:w-auto">
                      <button
                        onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: true }))}
                        className={`flex-1 sm:flex-none px-8 py-3 rounded border-2 text-[10px] font-extrabold uppercase tracking-widest transition-all italic shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] ${answers[q.id] === true ? 'bg-blue border-blue text-white shadow-blue/20' : 'bg-void border-white/10 text-white/30 hover:text-white hover:border-white/30'}`}
                      >
                        AFFIRMATIVE
                      </button>
                      <button
                        onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: false }))}
                        className={`flex-1 sm:flex-none px-8 py-3 rounded border-2 text-[10px] font-extrabold uppercase tracking-widest transition-all italic shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] ${answers[q.id] === false ? 'bg-red/20 border-red/40 text-red shadow-red/20' : 'bg-void border-white/10 text-white/30 hover:text-white hover:border-white/30'}`}
                      >
                        NEGATIVE
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowResult(true)}
                disabled={Object.keys(answers).length < 3}
                className="w-full bg-red hover:bg-red-dark text-white py-6 rounded border-2 border-red-light/20 font-extrabold font-display text-xl uppercase tracking-[0.3em] italic shadow-[12px_12px_0px_0px_rgba(159,18,57,0.4)] transition-all active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-10 disabled:cursor-not-allowed"
              >
                VERIFY_NATIONAL_ELIGIBILITY_NODE
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="text-center space-y-10">
                <div className="w-24 h-24 bg-void border-4 border-blue rounded flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(37,99,235,0.2)] animate-pulse">
                  <Scale className="w-12 h-12 text-blue" />
                </div>
                <div className="space-y-3">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.5em] text-blue italic">
                    ELIGIBILITY_STATUS: CONFIRMED
                  </p>
                  <h2 className="text-5xl font-display font-bold text-white uppercase tracking-tighter italic">
                    Eligible for <span className="text-blue">Free Aid</span>
                  </h2>
                  <p className="text-sm text-text-tertiary font-body max-w-lg mx-auto uppercase tracking-widest italic opacity-60 leading-relaxed">
                    UNDER MANDATE 12, YOU ARE LEGALLY ENTITLED TO PRO BONO REPRESENTATION AND
                    STATUTORY FEE EXEMPTIONS IN THE STATE_OF_
                    <strong>{selectedState.toUpperCase()}</strong>.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto pt-6">
                  <div className="p-8 bg-void rounded border-2 border-white/5 text-left space-y-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center gap-3 text-blue">
                      <Mail className="w-5 h-5" />
                      <span className="text-[10px] uppercase font-extrabold tracking-[0.3em] italic opacity-60">
                        AUTHORITY_DEPLOYMENT
                      </span>
                    </div>
                    <div>
                      <p className="text-xl font-display font-bold text-white uppercase italic">
                        {STATE_SLSAs[selectedState]?.name}
                      </p>
                      <p className="text-[10px] text-blue font-mono font-bold uppercase italic mt-1">
                        HEAR_HELPLINE: {STATE_SLSAs[selectedState]?.phone}
                      </p>
                    </div>
                    <a
                      href={`mailto:${STATE_SLSAs[selectedState]?.email}`}
                      className="flex items-center justify-center gap-3 w-full py-4 bg-blue text-white rounded border-2 border-blue-light/20 text-[10px] font-extrabold uppercase tracking-widest italic hover:bg-blue-dark transition-all active:translate-x-[1px] active:translate-y-[1px]"
                    >
                      TRANSMIT_INQUIRY <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="p-8 bg-void rounded border-2 border-white/5 text-left space-y-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center gap-3 text-red">
                      <FilePlus className="w-5 h-5" />
                      <span className="text-[10px] uppercase font-extrabold tracking-[0.3em] italic opacity-60">
                        MANIFEST_GENERATOR
                      </span>
                    </div>
                    <p className="text-xs text-text-tertiary font-body uppercase tracking-widest italic leading-relaxed">
                      PRIMARY_APPLICATION_LETTER_COMPILED_BASED_ON_VERIFIED_GROUNDS.
                    </p>
                    <button
                      onClick={handleDownload}
                      className="flex items-center justify-center gap-3 w-full py-4 bg-void text-white border-2 border-white/10 rounded text-[10px] font-extrabold uppercase tracking-widest italic hover:border-white/30 transition-all active:translate-x-[1px] active:translate-y-[1px] shadow-inner"
                    >
                      DOWNLOAD_MANIFEST <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="pt-10">
                  <a
                    href="https://nalsa.gov.in/services/legal-aid/apply-online"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 text-text-tertiary hover:text-white transition-all text-[11px] font-extrabold uppercase tracking-[0.2em] italic group"
                  >
                    <Globe className="w-5 h-5 text-red" /> ACCESS_GLOBAL_NALSA_PORTAL{' '}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          <div className="mt-16 pt-12 border-t-2 border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded bg-void border-2 border-red/20 flex items-center justify-center shadow-inner">
                <Phone className="w-6 h-6 text-red" />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase font-extrabold tracking-[0.4em] text-white/20 italic">
                  NATIONAL_BUREAU_UPLINK
                </p>
                <p className="text-3xl font-display font-bold text-white italic tracking-tighter">
                  15100
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-void border-2 border-white/5 px-6 py-4 rounded shadow-inner">
              <AlertCircle className="w-5 h-5 text-red" />
              <p className="text-[10px] text-text-tertiary font-body uppercase tracking-widest italic opacity-40 leading-tight pr-4">
                DATA_INDICATIVE. FINAL_VERIFICATION_REQUIRED_BY_DLSA_COMMAND.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
