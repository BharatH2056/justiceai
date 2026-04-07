const fs = require('fs');
const path = 'c:/Users/Anirudh/OneDrive/Desktop/Juctice-AI/src/pages/GlossaryPage.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  "import { Search, BookMarked, Scale, Gavel, Building2, Briefcase, Shield, ChevronDown, ChevronUp, ArrowRight, Hash } from 'lucide-react';",
  "import { Search, BookMarked, Scale, Gavel, Building2, Briefcase, Shield, ChevronDown, ChevronUp, ArrowRight, Hash, Users, ShoppingBag } from 'lucide-react';"
);

content = content.replace(
  "import Footer from '../components/ui/Footer';",
  "import Footer from '../components/ui/Footer';\nimport { GLOSSARY_TERMS } from '../data/legalGlossaryData';"
);

const newCategories = `const CATEGORIES = [
  { id: 'all', label: 'All Terms', icon: BookMarked },
  { id: 'constitutional', label: 'Constitutional', icon: Scale },
  { id: 'criminal', label: 'Criminal', icon: Gavel },
  { id: 'civil', label: 'Civil', icon: Building2 },
  { id: 'family', label: 'Family', icon: Users },
  { id: 'corporate', label: 'Corporate', icon: Briefcase },
  { id: 'consumer', label: 'Consumer', icon: ShoppingBag },
  { id: 'procedural', label: 'Procedural', icon: Shield },
];`;

content = content.replace(/const CATEGORIES = \[([\s\S]*?)\];/, newCategories);

content = content.replace(/const GLOSSARY_TERMS = \[([\s\S]*?)\];\n/g, "");

const oldRefStr = `<div className="space-y-1.5">
                <label className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.15em] text-gold">
                  <Scale className="w-3.5 h-3.5" />
                  Legal Reference
                </label>
                <span className="text-[11px] px-3 py-1.5 bg-gold/5 text-gold-light rounded-lg border border-gold/10 font-mono inline-block">
                  {term.reference}
                </span>
              </div>`;

const newRefStr = `<div className="space-y-1.5">
                <label className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.15em] text-gold">
                  <Scale className="w-3.5 h-3.5" />
                  Legal Reference
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] px-3 py-1.5 bg-gold/5 text-gold-light rounded-lg border border-gold/10 font-mono inline-block">
                    {term.reference}
                  </span>
                  {term.bnsEquivalent && (
                    <span className="text-[11px] px-3 py-1.5 bg-gold/5 text-gold-gradient rounded-lg border border-gold/30 font-mono font-bold flex items-center gap-1.5 shadow-sm shadow-gold/5">
                      <Hash className="w-3 h-3" />
                      NEW: {term.bnsEquivalent}
                    </span>
                  )}
                </div>
              </div>`;

content = content.replace(oldRefStr, newRefStr);

fs.writeFileSync(path, content, 'utf8');
console.log("Updated GlossaryPage.jsx");
