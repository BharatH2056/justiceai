const fs = require('fs');
const path = 'c:/Users/Anirudh/OneDrive/Desktop/Juctice-AI/src/pages/EstimatorPage.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Inject statutoryBasis into the useMemo return object
const targetReturn = `return {
      courtFee: Math.round(courtFee),
      stampDuty: Math.round(stampDuty),
      miscExpenses: Math.round(miscExpenses),
      lawyerMin,
      lawyerMax,
      timeMin,
      timeMax,
      totalMin: Math.round(totalMin),
      totalMax: Math.round(totalMax),
      caseData,
    };`;

const updatedReturn = `let statutoryBasis = 'Standard baseline court fee estimate';
    if (caseType === 'criminal') statutoryBasis = 'No court fee for state prosecution (CrPC / BNSS)';
    else if (caseType === 'rti') statutoryBasis = 'Standard fee under Right to Information Act 2005';
    else if (caseType === 'consumer') statutoryBasis = 'Court fee calculated per Consumer Protection Act 2019, Schedule rules';
    else if (caseType === 'civil' || caseType === 'property') statutoryBasis = 'Ad-valorem fee per Court Fees Act 1870, Section 7';
    else if (caseType === 'divorce') statutoryBasis = 'Fixed fee per Family Courts Act 1984 / Hindu Marriage Act 1955';
    else if (caseType === 'rent') statutoryBasis = 'State-specific Rent Control Act court fee schedules';
    else if (caseType === 'labour') statutoryBasis = 'Nominal fees under Industrial Disputes Act 1947';

    return {
      courtFee: Math.round(courtFee),
      stampDuty: Math.round(stampDuty),
      miscExpenses: Math.round(miscExpenses),
      lawyerMin,
      lawyerMax,
      timeMin,
      timeMax,
      totalMin: Math.round(totalMin),
      totalMax: Math.round(totalMax),
      caseData,
      statutoryBasis,
    };`;

content = content.replace(targetReturn, updatedReturn);

// 2. Render the statutoryBasis under the Total Estimate card
const targetUI = `<ResultCard 
                  icon={Scale} 
                  label="Court Fees (Statutory)"`;

const updatedUI = `
                <div className="flex items-center gap-2 px-2 py-1 bg-ink border border-white/5 rounded-lg justify-start max-w-fit mb-2 shadow-sm">
                  <Scale className="w-3 h-3 text-gold-light opacity-80" />
                  <p className="text-[9px] text-text-tertiary font-mono uppercase tracking-[0.05em]">{estimate.statutoryBasis}</p>
                </div>
                
                <ResultCard 
                  icon={Scale} 
                  label="Court Fees (Statutory)"`;

content = content.replace(targetUI, updatedUI);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully injected Statutory Basis citation into EstimatorPage.jsx');
