/* =========================================================
   HireMe Bot — public config (NO secrets)
   Live AI: put your key in bot-config.local.js (gitignored)
   or set enabled + apiKey here only on private deploys.
   OpenRouter: https://openrouter.ai
   ========================================================= */

window.ISHVA_BOT_CONFIG = {
    enabled: false,
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    model: "openai/gpt-4o-mini",
    apiKey: "",
    maxTokens: 420,
    temperature: 0.95,
    headers: {
        "HTTP-Referer": "https://ishva24.github.io/Portfolio_New/",
        "X-Title": "Ishva HireMe Bot"
    }
};
