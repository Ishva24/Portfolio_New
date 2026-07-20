/* =========================================================
   HireMe Bot — API config
   Offline mode works without a key (funny local answers).
   To enable live AI replies (SpaceXAI / xAI OpenAI-compatible):
     1. Get a key at https://console.x.ai
     2. Set enabled: true and paste apiKey below
     3. Prefer keeping secrets out of public commits
   ========================================================= */

window.ISHVA_BOT_CONFIG = {
    enabled: false,
    endpoint: "https://api.x.ai/v1/chat/completions",
    model: "grok-4.5",
    apiKey: "",
    maxTokens: 450,
    temperature: 0.85
};
