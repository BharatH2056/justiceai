// Using native fetch in Node 18+

async function testOllamaBackend() {
  console.log('Testing JusticeAI Backend -> Local Ollama...');
  try {
    const response = await fetch('http://127.0.0.1:3001/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Say "JusticeAI Local is Online"' }],
        stream: false
      })
    });

    const data = await response.json();
    console.log('--- RESPONSE ---');
    console.log('Status:', response.status);
    console.log('Provider:', data.metadata?.provider);
    console.log('Content:', data.message?.content);
    
    if (data.metadata?.provider === 'Ollama (Local)') {
      console.log('\n✅ SUCCESS: Local Ollama is now handling requests!');
    } else {
      console.log('\n❌ FAILURE: Response did not indicate local Ollama processing.');
      console.log('Error chain:', data.metadata?.errorChain);
    }
  } catch (err) {
    console.error('Test script error:', err.message);
  }
}

testOllamaBackend();
