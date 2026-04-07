const fs = require('fs');
const path = 'c:/Users/Anirudh/OneDrive/Desktop/Juctice-AI/src/pages/EstimatorPage.jsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /const estimate = useMemo\(\(\) => \{[\s\S]*?\}, \[caseType, courtLevel, cityTier, complexity, claimAmount\]\);/;

const realCostAlgorithm = `const estimate = useMemo(() => {
    if (!caseType) return null;

    const caseData = CASE_TYPES.find(c => c.id === caseType);
    const court = COURT_LEVELS.find(c => c.id === courtLevel);
    const city = CITY_TIERS.find(c => c.id === cityTier);
    const comp = COMPLEXITY_LEVELS.find(c => c.id === complexity);

    if (!caseData || !court || !city || !comp) return null;

    const claim = parseFloat(claimAmount) || 0;

    let courtFee = 0;
    
    // 1. STATUTORY COURT FEE LOGIC
    if (caseType === 'criminal') {
      courtFee = 0; // State prosecutes
    } else if (caseType === 'rti') {
      courtFee = 10;
    } else if (caseType === 'consumer') {
      // CPA 2019 Slabs
      if (claim <= 500000) courtFee = 0;
      else if (claim <= 1000000) courtFee = 200;
      else if (claim <= 2000000) courtFee = 400;
      else if (claim <= 5000000) courtFee = 2000;
      else if (claim <= 10000000) courtFee = 4000;
      else courtFee = 7500; // National Commission
    } else if (caseType === 'civil' || caseType === 'property') {
      // Ad-valorem (approx 5% capped at 3 Lakhs)
      courtFee = claim > 0 ? Math.min(claim * 0.05, 300000) : 5000;
    } else if (caseType === 'divorce') {
      courtFee = 1000;
    } else {
      courtFee = caseData.courtFeeBase;
    }

    // 2. REALISTIC LAWYER FEES (No more flat multipliers)
    let lawyerMin = 0;
    let lawyerMax = 0;
    
    const cityBaseRate = cityTier === 'tier1' ? 25000 : cityTier === 'tier2' ? 15000 : 10000;
    
    if (caseType === 'criminal') {
      lawyerMin = cityBaseRate + (courtLevel === 'district' ? 20000 : 75000);
      lawyerMax = lawyerMin * (comp.id === 'complex' ? 4 : 2);
    } else if (caseType === 'civil' || caseType === 'property') {
      lawyerMin = cityBaseRate + (courtLevel === 'district' ? 30000 : 100000) + (claim * 0.02);
      lawyerMax = lawyerMin * (comp.id === 'complex' ? 3 : 2);
    } else if (caseType === 'consumer') {
      lawyerMin = cityBaseRate + (courtLevel === 'district' ? 0 : 25000); 
      lawyerMax = lawyerMin * 2 + 30000;
    } else if (caseType === 'divorce') {
      lawyerMin = cityBaseRate + (comp.id === 'simple' ? 15000 : 40000); // Simple = mutual consent
      lawyerMax = lawyerMin * 3;
    } else if (caseType === 'rti') {
      lawyerMin = 0;
      lawyerMax = 0;
    } else {
      lawyerMin = cityBaseRate * 2;
      lawyerMax = cityBaseRate * 5;
    }

    lawyerMin = Math.round(lawyerMin / 1000) * 1000;
    lawyerMax = Math.round(lawyerMax / 1000) * 1000;

    // 3. MISC COSTS (Notary, Clerks, Affidavits)
    const stampDuty = caseType === 'rti' ? 0 : Math.max(100, Math.round(courtFee * 0.1));
    const miscExpenses = caseType === 'rti' ? 50 : Math.max(500, lawyerMin * 0.05);

    // 4. TIMELINES 
    const timeMin = Math.round(caseData.timelineMonths[0] * comp.multiplier);
    const timeMax = Math.round(caseData.timelineMonths[1] * comp.multiplier);

    // Totals
    const totalMin = courtFee + stampDuty + miscExpenses + lawyerMin;
    const totalMax = courtFee + stampDuty + miscExpenses + lawyerMax;

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
    };
  }, [caseType, courtLevel, cityTier, complexity, claimAmount]);`;

content = content.replace(regex, realCostAlgorithm);

// Inject dynamic civil cap warning flag under the court fee card
const oldCourtFeeCard = `<ResultCard icon={Scale} label="Court Fees" value={formatCurrency(estimate.courtFee)} sublabel="Filing + process fees" color="gold" />`;
const newCourtFeeCard = `<ResultCard 
                  icon={Scale} 
                  label="Court Fees (Statutory)" 
                  value={formatCurrency(estimate.courtFee)} 
                  sublabel={
                    estimate.caseData.id === 'consumer' 
                      ? "CPA 2019 Fee Slabs" 
                      : (estimate.caseData.id === 'civil' || estimate.caseData.id === 'property') 
                        ? (estimate.courtFee >= 300000 ? "Ad-Valorem (\u20B93 Lakh State Cap Applied)" : "Ad-Valorem % filing fee") 
                        : "Fixed / Minimal filing fees"
                  } 
                  color="gold" 
                />`;

content = content.replace(oldCourtFeeCard, newCourtFeeCard);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated EstimatorPage.jsx with Real Costs Algorithm');
