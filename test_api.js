// Quick test script for the backend API
const body = JSON.stringify({
  messages: [{ role: 'user', content: 'What is Section 302 of BNS?' }],
  personality: 'Neutral',
  mode: 'copilot',
  jurisdiction: 'National'
});

fetch('http://localhost:3001/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body
})
.then(r => {
  console.log('Status:', r.status);
  return r.json();
})
.then(data => {
  console.log('\n✅ REAL AI RESPONSE RECEIVED!\n');
  console.log('Response (first 500 chars):');
  console.log(data.message.content.substring(0, 500));
})
.catch(err => {
  console.error('❌ ERROR:', err.message);
});
