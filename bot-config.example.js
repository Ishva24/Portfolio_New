/* =========================================================
   Hire-Me Bot — API config EXAMPLE
   ---------------------------------------------------------
   1. Copy this file to:  bot-config.js
   2. Fill in your API key / endpoint
   3. bot-config.js is gitignored so keys stay private

   Default provider: SpaceXAI / xAI (OpenAI-compatible)
   - Get a key: https://console.x.ai
   - Docs: https://docs.x.ai
   ========================================================= */

window.ISHVA_BOT_CONFIG = {
    // Set true once you add a real API key
    enabled: false,

    // OpenAI-compatible chat completions endpoint
    endpoint: "https://api.x.ai/v1/chat/completions",

    // Model name (update if your provider uses a different id)
    model: "grok-4.5",

    // NEVER commit a real key. Paste only in your local bot-config.js
    apiKey: "YOUR_XAI_API_KEY_HERE",

    // Optional: custom headers if your proxy needs them
    // headers: { "X-Custom": "value" },

    // Max tokens for each reply
    maxTokens: 450,

    // Temperature — a bit playful, not chaos
    temperature: 0.85
};
