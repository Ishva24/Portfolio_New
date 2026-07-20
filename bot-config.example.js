/* =========================================================
   Copy to bot-config.local.js and fill your key.
   bot-config.local.js is gitignored.
   ========================================================= */

window.ISHVA_BOT_CONFIG = {
    enabled: true,
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    model: "openai/gpt-4o-mini",
    // Other fun options: "x-ai/grok-3-mini-beta", "google/gemini-2.0-flash-001"
    apiKey: "sk-or-v1-YOUR_OPENROUTER_KEY",
    maxTokens: 420,
    temperature: 0.95,
    headers: {
        "HTTP-Referer": "https://your-portfolio-url.example",
        "X-Title": "Ishva HireMe Bot"
    }
};
