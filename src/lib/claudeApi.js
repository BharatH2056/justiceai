import { SYSTEM_PROMPT } from './systemPrompt';

const OLLAMA_URL = 'http://localhost:11434/api/chat';
const MODEL = 'qwen2.5-coder:7b'; // Hardcoded local model from Ollama

export async function sendMessage(conversationHistory, userMessage, options = {}) {
  const { judgePersonality = 'Neutral', mode = 'copilot' } = options;

  // Inject current mode and judge personality context into the system instructions if needed
  const modeContext = mode === 'simulator' 
    ? "MODE: Opposing Counsel Simulator. Adopt an adversarial, formal, and aggressive tone."
    : "MODE: Legal Co-pilot. Be empathic and strategic.";
  
  const personalityContext = `JUDGE PERSONALITY: ${judgePersonality}. Adjust your confidence and tone based on this temperament.`;

  // Prepend the system prompt as the first message role
  const formattedMessages = [
    { role: 'system', content: `${SYSTEM_PROMPT}\n\nCURRENT CONTEXT:\n${modeContext}\n${personalityContext}` },
    ...conversationHistory.map(m => ({
      role: m.role,
      content: m.content
    }))
  ];

  const response = await fetch(OLLAMA_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: formattedMessages,
      stream: false,
    })
  });

  if (!response.ok) {
    throw new Error('Failed to connect to local Ollama API');
  }

  const data = await response.json();
  return data.message.content;
}
