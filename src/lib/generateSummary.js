export function generateSummary(messages, analysis) {
  if (!analysis) return "";

  const date = new Date().toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const facts = messages
    .filter(m => m.role === 'user')
    .map((m, i) => `${i + 1}. ${m.content}`)
    .join('\n');

  return `
=== JusticeAI Case Summary ===
Generated: ${date}

CASE TYPE: ${analysis.caseType || "Legal Inquiry"}
PREDICTED OUTCOME: ${analysis.verdict ? analysis.verdict.toUpperCase() : "N/A"} (${analysis.confidence || 0}% confidence)

YOUR CASE FACTS:
${facts || "No case facts provided."}

LEGAL STRATEGY & STEPS:
${analysis.strategy ? analysis.strategy.map((s, i) => `${i + 1}. ${s}`).join('\n') : "Strategy not yet developed."}

RELEVANT LAWS (INDIA):
${analysis.laws ? analysis.laws.map(l => `• ${l.act}\n  ${l.description}`).join('\n') : "Laws not yet cited."}

KEY ARGUMENTS TO MAKE:
${analysis.arguments?.for ? analysis.arguments.for.map(a => `✓ ${a}`).join('\n') : "Arguments not yet listed."}

ARGUMENTS TO EXPECT & COUNTER:
${analysis.arguments?.against ? analysis.arguments.against.map(a => `✗ ${a}`).join('\n') : "Counter-arguments not yet listed."}

---
Disclaimer: JusticeAI provides legal information, not legal advice. 
JusticeAI is an AI-powered co-pilot for information purposes and is not a qualified legal practitioner.
Always consult a qualified lawyer before taking any legal action.
  `.trim();
}
