// Using native fetch in Node 18+

async function test() {
  console.log('Testing JusticeAI API with simulated Ollama failure...');
  try {
    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Explain Section 302 of the BNS briefly.' }],
        stream: false
      })
    });

    const data = await response.json();
    console.log('--- RESPONSE ---');
    console.log('Status:', response.status);
    console.log('Provider:', data.metadata?.provider);
    console.log('Model:', data.model || data.metadata?.model);
    console.log('Content:', data.message?.content?.substring(0, 200) + '...');
    
    if (data.metadata?.provider === 'Gemini (Cloud Fallback)') {
      console.log('\n✅ SUCCESS: Fallback to Gemini confirmed!');
    } else {
      console.log('\n❌ FAILURE: Response did not indicate Gemini fallback.');
    }
  } catch (err) {
    console.error('Test script error:', err.message);
  }
}

test();
