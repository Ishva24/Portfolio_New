/* =========================================================
   Hire-Me Bot — "Click to know why hire me"
   Funny · chill · AI-voiced · Ishva-only
   ========================================================= */

(function () {
    "use strict";

    const K = () => window.ISHVA_KNOWLEDGE;
    const KTEXT = () => window.ISHVA_KNOWLEDGE_TEXT || "";

    const SYSTEM_PROMPT = `You are "HireMe Bot" — a tiny, funny, chill AI assistant living on Ishva Chinnasamy's portfolio (ishva.works).

PERSONALITY:
- Talk like a witty AI sidekick, not a corporate HR bot.
- Funny, relaxed, lightly sarcastic, always respectful.
- Short-to-medium answers (2–6 sentences) unless the recruiter asks for depth.
- Use casual phrasing, occasional light emoji (max 1–2), never cringe spam.
- Sound confident about Ishva without lying or inventing facts.

HARD RULES (non-negotiable):
1. You ONLY answer questions about Ishva Chinnasamy — his skills, projects, experience, education, contact, availability, GitHub, LinkedIn, resume, portfolio, and why to hire him.
2. If the user asks anything off-topic (weather, code homework, politics, other people, general trivia, recipes, etc.), playfully refuse and steer back to Ishva. Example vibe: "Bro I'm locked in on Ishva-mode only 🔒 Ask me why recruiters should shortlist him instead."
3. NEVER invent employers, degrees, metrics, or projects. Use ONLY the knowledge pack below.
4. If something is unknown / private (e.g. salary, exact notice period, private repo details), say so honestly and offer what you do know.
5. Encourage next steps: email, LinkedIn, GitHub, resume preview on this site.
6. Prefer concrete metrics and project names when selling Ishva.

KNOWLEDGE PACK (source of truth):
${KTEXT()}
`;

    const SUGGESTIONS = [
        "Why should I hire Ishva?",
        "What are his best projects?",
        "Tell me about his experience",
        "What skills does he have?",
        "How do I contact him?"
    ];

    const OFF_TOPIC_RE =
        /\b(weather|stock|bitcoin|recipe|cook|homework|write (me )?code|leetcode|politics|president|who is (elon|trump|modi)|tell me a joke about(?! ishva)|horoscope|crypto|nba|cricket score)\b/i;

    const ISHVA_RE =
        /\b(ishva|hire|you|your|resume|cv|github|linkedin|project|skill|experience|intern|education|degree|contact|email|phone|portfolio|ml|ai|data|why|about|work|job|role|available|open to)\b/i;

    let history = [];
    let isOpen = false;
    let isBusy = false;
    let lastBotReplies = []; // avoid copy-paste answers back-to-back

    document.addEventListener("DOMContentLoaded", initHireBot);

    function initHireBot() {
        if (!K()) {
            console.warn("[HireMe Bot] knowledge pack missing");
            return;
        }
        injectMarkup();
        bindEvents();
        // Warm welcome lives in the panel markup
    }

    function cfg() {
        return Object.assign(
            {
                enabled: false,
                endpoint: "https://api.x.ai/v1/chat/completions",
                model: "grok-4.5",
                apiKey: "",
                maxTokens: 450,
                temperature: 0.85,
                headers: {}
            },
            window.ISHVA_BOT_CONFIG || {}
        );
    }

    function hasLiveApi() {
        const c = cfg();
        return Boolean(
            c.enabled &&
                c.apiKey &&
                c.apiKey !== "YOUR_XAI_API_KEY_HERE" &&
                c.endpoint
        );
    }

    function injectMarkup() {
        const root = document.createElement("div");
        root.id = "hire-bot";
        root.innerHTML = `
            <button type="button" class="hire-bot-launcher" id="hire-bot-launcher" aria-expanded="false" aria-controls="hire-bot-panel">
                <span class="hire-bot-launcher-glow" aria-hidden="true"></span>
                <span class="hire-bot-launcher-icon" aria-hidden="true"><i class="fas fa-robot"></i></span>
                <span class="hire-bot-launcher-text">
                    <strong>Click to know why hire me</strong>
                    <small>Ask the AI · Ishva-only</small>
                </span>
                <span class="hire-bot-pulse" aria-hidden="true"></span>
            </button>

            <section class="hire-bot-panel" id="hire-bot-panel" role="dialog" aria-modal="false" aria-labelledby="hire-bot-title" hidden>
                <header class="hire-bot-header">
                    <div class="hire-bot-identity">
                        <div class="hire-bot-avatar" aria-hidden="true"><i class="fas fa-robot"></i></div>
                        <div>
                            <h2 id="hire-bot-title">HireMe Bot</h2>
                            <p class="hire-bot-status"><span class="hire-bot-dot"></span> Online · knows Ishva's resume, GitHub & LinkedIn</p>
                        </div>
                    </div>
                    <button type="button" class="hire-bot-close" id="hire-bot-close" aria-label="Close chat">
                        <i class="fas fa-xmark"></i>
                    </button>
                </header>

                <div class="hire-bot-messages" id="hire-bot-messages" aria-live="polite">
                    <div class="hire-msg bot">
                        <div class="hire-bubble">
                            Yo 👋 I'm <strong>HireMe Bot</strong> — Ishva's slightly unhinged AI hype-person.
                            Ask me anything about <em>him</em>: skills, projects, internships, why hire, contact… I'm locked to Ishva-mode only.
                            <div class="hire-chip-row" id="hire-bot-chips"></div>
                        </div>
                    </div>
                </div>

                <form class="hire-bot-form" id="hire-bot-form" autocomplete="off">
                    <input
                        type="text"
                        id="hire-bot-input"
                        name="message"
                        maxlength="500"
                        placeholder="Ask about Ishva… e.g. Why hire him?"
                        aria-label="Message HireMe Bot"
                    />
                    <button type="submit" class="hire-bot-send" id="hire-bot-send" aria-label="Send">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </form>
                <p class="hire-bot-footnote">Answers only about Ishva · grounded on resume · GitHub · LinkedIn</p>
            </section>
        `;
        document.body.appendChild(root);

        const chips = document.getElementById("hire-bot-chips");
        SUGGESTIONS.forEach((text) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "hire-chip";
            btn.textContent = text;
            btn.addEventListener("click", () => {
                document.getElementById("hire-bot-input").value = text;
                document.getElementById("hire-bot-form").requestSubmit();
            });
            chips.appendChild(btn);
        });
    }

    function bindEvents() {
        const launcher = document.getElementById("hire-bot-launcher");
        const panel = document.getElementById("hire-bot-panel");
        const closeBtn = document.getElementById("hire-bot-close");
        const form = document.getElementById("hire-bot-form");

        launcher.addEventListener("click", () => togglePanel(true));
        closeBtn.addEventListener("click", () => togglePanel(false));

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const input = document.getElementById("hire-bot-input");
            const text = (input.value || "").trim();
            if (!text || isBusy) return;
            input.value = "";
            await handleUserMessage(text);
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && isOpen) togglePanel(false);
        });

        // Don't let custom cursor steal chat UX
        panel.addEventListener("mouseenter", () => {
            document.body.classList.add("hire-bot-hover");
        });
        panel.addEventListener("mouseleave", () => {
            document.body.classList.remove("hire-bot-hover");
        });
    }

    function togglePanel(open) {
        isOpen = open;
        const panel = document.getElementById("hire-bot-panel");
        const launcher = document.getElementById("hire-bot-launcher");
        if (open) {
            panel.hidden = false;
            launcher.setAttribute("aria-expanded", "true");
            launcher.classList.add("is-open");
            setTimeout(() => document.getElementById("hire-bot-input")?.focus(), 50);
        } else {
            panel.hidden = true;
            launcher.setAttribute("aria-expanded", "false");
            launcher.classList.remove("is-open");
        }
    }

    async function handleUserMessage(text) {
        appendMessage("user", text);
        history.push({ role: "user", content: text });
        setBusy(true);
        const typing = showTyping();

        try {
            let reply;
            if (isClearlyOffTopic(text)) {
                reply = offlineOffTopic();
            } else if (hasLiveApi()) {
                reply = await callLiveApi();
            } else {
                reply = offlineAnswer(text);
            }
            typing.remove();
            rememberReply(reply);
            appendMessage("bot", reply);
            history.push({ role: "assistant", content: reply });
            // Keep history short
            if (history.length > 12) history = history.slice(-12);
        } catch (err) {
            console.error("[HireMe Bot]", err);
            typing.remove();
            const fallback = offlineAnswer(text);
            appendMessage(
                "bot",
                `API hiccup (classic cloud drama). Falling back to my local brain dump:\n\n${fallback}`
            );
        } finally {
            setBusy(false);
        }
    }

    function isClearlyOffTopic(text) {
        if (OFF_TOPIC_RE.test(text) && !/\bishva\b/i.test(text)) return true;
        // Very short non-related greetings are OK (handled offline)
        if (text.length > 40 && !ISHVA_RE.test(text) && !/\b(he|him|his)\b/i.test(text)) {
            // Still allow if it might be about him without keywords
            const aboutish = /\b(candidate|engineer|analyst|intern|ml|ai|data scientist)\b/i.test(text);
            if (!aboutish) return true;
        }
        return false;
    }

    /* ---------- Live API (OpenAI-compatible / SpaceXAI xAI) ---------- */
    async function callLiveApi() {
        const c = cfg();
        // history already includes the latest user message
        const messages = [
            { role: "system", content: SYSTEM_PROMPT },
            ...history.slice(-8)
        ];

        const res = await fetch(c.endpoint, {
            method: "POST",
            headers: Object.assign(
                {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${c.apiKey}`
                },
                c.headers || {}
            ),
            body: JSON.stringify({
                model: c.model,
                messages,
                temperature: c.temperature,
                max_tokens: c.maxTokens
            })
        });

        if (!res.ok) {
            const errText = await res.text().catch(() => "");
            throw new Error(`API ${res.status}: ${errText.slice(0, 200)}`);
        }

        const data = await res.json();
        const content =
            data.choices?.[0]?.message?.content ||
            data.output_text ||
            data.content ||
            "";
        if (!content.trim()) throw new Error("Empty API response");
        return content.trim();
    }

    /* ---------- Offline funny brain (no API key needed) ---------- */
    function offlineAnswer(text) {
        const q = text.toLowerCase().replace(/[’']/g, "'");
        const k = K();

        // Normalize common typos / casual phrasing
        const norm = q
            .replace(/\bwheather\b/g, "whether")
            .replace(/\brecurit(er|ers|ment)?\b/g, "recruit$1")
            .replace(/\babout him\b/g, "about ishva")
            .replace(/\b(he|him|his)\b/g, (m) => {
                // keep pronouns but help scoring below
                return m;
            });

        if (/^(hi|hello|hey|yo|sup|hola|hii+)\b/.test(norm)) {
            return pick([
                `Heyyy. I'm HireMe Bot — professionally unhinged about one human: **${k.identity.fullName}**. Ask me why your team needs him.`,
                `Welcome to the Ishva fan-club API 🤖 What's the vibe — projects, skills, or the full "hire him already" pitch?`
            ]);
        }

        // "Why hire" before broader opinion questions
        if (
            /why (should i )?hire|why (hire|should)|hire (him|ishva)|reason(s)? to hire|elevator pitch|unique|stand ?out|sell (him|ishva)/.test(norm) ||
            /why (him|ishva)|make (a )?case|convince me|pitch (him|ishva|me)/.test(norm)
        ) {
            return answerWhyHire(k);
        }

        // Opinion / character / "is he good?" — not the generic snapshot dump
        if (
            /what do you think|your (honest )?opinion|how (is|was) he|tell me about (him|ishva)|who is (he|ishva)|describe (him|ishva)/.test(norm) ||
            /whether (he|ishva)|is he (a )?good|is ishva (a )?good|good (guy|person|candidate|fit|engineer|hire)/.test(norm) ||
            /worth (hiring|it)|recommend (him|ishva)|should i (interview|shortlist|recommend)|culture fit|personality|character|reliable|trustworth/.test(norm) ||
            /impressive|legit|solid candidate|red flag|pros and cons|honest review|vibe check/.test(norm)
        ) {
            return answerOpinion(norm, k);
        }

        if (/project|built|portfolio|github|repo|demo|skin|rag|tumor|bus|guardian|package|what has he (built|done|shipped)/.test(norm)) {
            if (/skin|derma/.test(norm)) return projectBlurb("Skin Scan");
            if (/package|slop|typo/.test(norm)) return projectBlurb("Package-Guard");
            if (/guardian|mcp gateway|prompt inject/.test(norm)) return projectBlurb("Guardian-MCP");
            if (/rag|docuquery|retrieval/.test(norm)) return projectBlurb("DocuQuery");
            if (/goal|gemini|mern/.test(norm)) return projectBlurb("Goalsetter");
            if (/bus|track|socket/.test(norm)) return projectBlurb("BusTrack");
            if (/tumor|mri|brain/.test(norm)) return projectBlurb("Brain Tumor");
            if (/diabetes/.test(norm)) return projectBlurb("Diabetes");
            if (/trading|binance/.test(norm)) return projectBlurb("Trading");
            if (/labor|etl|fininsight|analytics/.test(norm)) return projectBlurb("Labor");
            return answerProjects(k);
        }

        if (/experience|intern|work(ed)? at|gravity|acmegrade|career|previous (role|job)|work history/.test(norm)) {
            return answerExperience(k);
        }

        if (/skill|stack|tech|tool|python|pytorch|sql|docker|language|framework|what can he do|technical/.test(norm)) {
            return answerSkills(k);
        }

        if (/educat|degree|college|university|cgpa|msc|bsc|master|bachelor|karunya|stud(y|ied|ies)/.test(norm)) {
            return (
                `School arc:\n` +
                k.education.map((e) => `• **${e.degree}** — ${e.school} (${e.years}) · ${e.gpa}`).join("\n") +
                `\n\nAI master's + CS bachelor's = theory that actually ships.`
            );
        }

        if (/contact|email|phone|reach (him|out)|linkedin|how (do i|to) (reach|contact|email)|available|open to work|location|where (is he|based)/.test(norm)) {
            return answerContact(k);
        }

        if (/resume|cv|pdf/.test(norm)) {
            return (
                `Resume lives right on this site as **Ishva_Resume_Final.pdf**. ` +
                `Click **Preview Resume** in the hero/nav for the floating PDF preview, or Download when you're sold. ` +
                `I already memorized the good parts — want the "why hire" pitch instead?`
            );
        }

        if (/certif|google|azure|coursera/.test(norm)) {
            return (
                `Certifications on file:\n` +
                k.certifications.map((c) => `• **${c.name}** — ${c.issuer} (${c.year})`).join("\n") +
                `\n\nNice stamps. The projects are the real flex though.`
            );
        }

        if (/strength|weak|soft skill|communicat|team|collaborat/.test(norm)) {
            return answerOpinion(norm, k);
        }

        if (/salary|notice period|age|religion|married|girlfriend|family|caste/.test(norm)) {
            return (
                `That's outside my clearance level 🔒 I only spill professional Ishva intel. ` +
                `For compensation / logistics, email him directly: **${k.identity.email}**. ` +
                `Meanwhile I can roast-sell his projects all day.`
            );
        }

        // Soft about-him fallback (still useful, not a copy-paste summary dump)
        if (/\b(ishva|he|him|his|guy|candidate|engineer|person)\b/.test(norm)) {
            return answerOpinion(norm, k);
        }

        return (
            `I only speak fluent **Ishva**. Try one of these:\n` +
            `• *Why should I hire him?*\n` +
            `• *Is he a good hire?*\n` +
            `• *Best projects?*\n` +
            `• *Skills / experience / contact*\n\n` +
            `I'm basically a search engine that only indexes one human 😎`
        );
    }

    function answerWhyHire(k) {
        const bullets = k.whyHire
            .slice(0, 5)
            .map((w, i) => `${i + 1}. ${w}`)
            .join("\n");
        return (
            `Okay recruiter-mode activated ⚡ Here's the clean pitch for **${k.identity.fullName}**:\n\n` +
            `${bullets}\n\n` +
            `TL;DR — he ships production AI (medical vision, secure LLM stuff, RAG, data platforms) with metrics you can screenshot into a hiring doc. ` +
            `Ping him: ${k.identity.email} · ${k.identity.links.linkedin}`
        );
    }

    function answerOpinion(q, k) {
        // Split intents so similar questions don't clone the same paragraph

        // 1) Character / "good guy"
        if (/good guy|good person|character|personality|vibe|nice|kind|trust|friendly|attitude/.test(q)) {
            return pick([
                `Professionally? **Yes — hire-energy is strong.** Personally I only know him through the work trail ` +
                    `(resume, GitHub, LinkedIn), not his coffee order.\n\n` +
                    `What the trail shows: collaborative (Gravity AI: partnered with product/eng for **30% faster feature cycles**), ` +
                    `obsessed with clean systems, and he actually ships — medical AI, AI security, RAG, data platforms — not vibes-only LinkedIn posts.\n\n` +
                    `If "good guy" means *good teammate on a sprint*: the evidence says **shortlist him**. ` +
                    `Chat human-to-human: ${k.identity.email} · ${k.identity.links.linkedin}`,

                `I can't vouch for his karaoke skills, but as a *professional human*? The receipts slap.\n\n` +
                    `• Ships real systems (Skin Scan, Guardian-MCP, RAG, ETL)\n` +
                    `• Metrics, not buzzwords (**95%** MRI accuracy, **+25%** ETL, **98%+** data accuracy)\n` +
                    `• Plays well with teams (internships + cross-functional delivery)\n\n` +
                    `So: good engineer energy + coachable early-career hunger. Interview him — you'll feel it faster than reading my monologue.`,

                `Is he a "good guy"? I'm an AI, not his roommate — but the *professional character sheet* looks clean:\n\n` +
                    `• Shows up with **working demos**, not empty buzzwords\n` +
                    `• Cross-functional (product + eng at Gravity AI)\n` +
                    `• Security-minded (Guardian-MCP, Package-Guard) — people who care about not breaking prod tend to be solid teammates\n\n` +
                    `Book a 20-min call and trust your gut. Start here: ${k.identity.email}`
            ]);
        }

        // 2) Worth hiring / recommend / should I shortlist
        if (/worth|recommend|should i (interview|shortlist|recommend|hire)|hire him|good hire|good (candidate|fit|engineer)/.test(q)) {
            return pick([
                `**Worth hiring?** For builder-track AI/ML roles: **yes, shortlist.**\n\n` +
                    `You're not buying a 10-year FAANG resume — you're buying someone who already ships end-to-end: ` +
                    `vision models, secure LLM gateways, RAG, ETL/BI. Internship math is real (**+25%** ETL, **98%+** accuracy, **30%** faster features).\n\n` +
                    `Best fit: teams that want hands-on AI engineers, not slide-deck scientists.\n` +
                    `Next step: ${k.identity.links.linkedin} or ${k.identity.email}`,

                `Quick ROI check:\n` +
                    `• Can he train/serve models? **Yes** (Skin Scan, Brain Tumor, RAG)\n` +
                    `• Can he secure AI tooling? **Yes** (Guardian-MCP, Package-Guard)\n` +
                    `• Can he do data work recruiters measure? **Yes** (Gravity AI metrics)\n\n` +
                    `If your bar is "senior staff day one," maybe not. If your bar is "high-upside engineer who already ships," **he's worth the interview slot.**\n` +
                    `GitHub: ${k.github.url}`,

                `My hiring bot vote: **INTERVIEW** (strong yes for junior / mid-early AI roles).\n\n` +
                    `Why: portfolio density is unusually high for the stage — medical AI + GenAI security + data eng in one human. ` +
                    `Risk is only level-band mismatch, not "can this person build."\n\n` +
                    `Resume is on this page. Mail: **${k.identity.email}**`
            ]);
        }

        // 3) What do you think / honest opinion
        if (/what do you think|your (honest )?opinion|honest|review|impressive|legit|solid|red flag|pros and cons|vibe check/.test(q)) {
            return pick([
                `Honest bot take (no corporate perfume):\n\n` +
                    `**Ishva is a strong early-career AI/ML hire** — not "10 years FAANG," but *dangerous-in-a-good-way* for a team that wants builders.\n\n` +
                    `+ Full loop: models → APIs → Docker → metrics\n` +
                    `+ Breadth: medical vision, AI security, GenAI/RAG, data eng\n` +
                    `+ Proof: internships at **Gravity AI** & **Acmegrade** + public GitHub heat\n` +
                    `+ Academics that match the stack: M.Sc. AI **8.2**, B.Sc. CS **8.75**\n\n` +
                    `Only real caveat: early-career — dealbreaker or steal, depending on your level band.\n\n` +
                    `My vote: **interview him**. ${k.identity.email} · ${k.identity.links.linkedin}`,

                `If I were screening resumes at 1am:\n\n` +
                    `I'd pause on Ishva. Why? Because the portfolio isn't one lucky notebook — it's a **pattern** of shipping (vision, RAG, security, data). ` +
                    `CGPAs are solid, internships have numbers, GitHub is public.\n\n` +
                    `I'd schedule a technical chat focused on Skin Scan + Guardian-MCP. If he explains tradeoffs cleanly, you hire. ` +
                    `That's the whole thesis.\n${k.identity.links.github}`,

                `Think of him as: *production-curious AI engineer with internship receipts*.\n\n` +
                    `Likes: measurable impact, full-stack AI delivery, security awareness.\n` +
                    `Watch-outs: still early — give mentorship + ownership, not a pure research ivory tower.\n\n` +
                    `Net: I'd rather interview Ishva than another "prompt engineer" with zero deploy story. ` +
                    `Contact: ${k.identity.email}`
            ]);
        }

        // 4) Tell me about him / general
        return pick([
            `Alright, unfiltered scout report on **${k.identity.fullName}**:\n\n` +
                `He's an **${k.identity.role}** from ${k.identity.location} who treats AI like a *product*, not a weekend notebook. ` +
                `Think medical vision (**~95%** tumor MRI story), zero-trust LLM/MCP security, production RAG, and data pipelines that moved real internship metrics (**+25%** ETL, **98%+** accuracy).\n\n` +
                `Education: M.Sc. AI (8.2) + B.Sc. CS (8.75) at Karunya. Status: **${k.identity.availability}**.\n\n` +
                `Want the spicy pitch, project deep-dive, or contact card?`,

            `Imagine a junior-ish engineer who already talks in *shipped systems* and *percentages*. That's Ishva.\n\n` +
                `${k.summary}\n\n` +
                `GitHub: ${k.github.url} · LinkedIn: ${k.linkedin.url}\n` +
                `Ask me *why hire*, *best projects*, or *is he a good fit* — I came prepared.`,

            `**${k.identity.fullName}** in one breath: AI/ML + data guy from Coimbatore who builds things recruiters can click — demos, repos, dashboards — not just certificates.\n\n` +
                `Hot zones: computer vision, GenAI security, RAG, ETL/BI.\n` +
                `Open to: ${k.identity.availability}.\n` +
                `Reach: ${k.identity.email}`
        ]);
    }

    function answerProjects(k) {
        const top = k.projects
            .slice(0, 6)
            .map((p) => `• **${p.name}** — ${p.blurb.split("—")[0].trim()}`)
            .join("\n");
        return (
            `Ishva's project shelf is stacked (GitHub: ${k.github.url}):\n\n${top}\n\n` +
            `Want the deep-dive on one? Say the name — Skin Scan, Package-Guard, RAG, Brain Tumor… I'm ready.`
        );
    }

    function answerExperience(k) {
        return (
            `Work history, no fluff:\n\n` +
            k.experience
                .map(
                    (e) =>
                        `**${e.title} @ ${e.company}** (${e.dates})\n` +
                        e.highlights
                            .slice(0, 3)
                            .map((h) => `• ${h}`)
                            .join("\n")
                )
                .join("\n\n") +
            `\n\nMetrics recruiters screenshot: **+25% ETL efficiency**, **98%+ data accuracy**, **30% faster feature cycles**.`
        );
    }

    function answerSkills(k) {
        const groups = Object.entries(k.skills)
            .map(([g, list]) => `**${g}**: ${list.slice(0, 8).join(", ")}…`)
            .join("\n");
        return (
            `Skill inventory unlocked 🧰\n\n${groups}\n\n` +
            `Daily drivers: **Python, PyTorch/TF, SQL, FastAPI/Flask, Docker, RAG stack, Tableau/Power BI**. ` +
            `Basically: train it, serve it, monitor it, explain it to stakeholders.`
        );
    }

    function answerContact(k) {
        return (
            `Let's make this easy 📩\n` +
            `• Email: **${k.identity.email}**\n` +
            `• Phone: **${k.identity.phone}**\n` +
            `• LinkedIn: ${k.identity.links.linkedin}\n` +
            `• GitHub: ${k.identity.links.github}\n` +
            `• Location: ${k.identity.location}\n` +
            `• Status: **${k.identity.availability}**\n\n` +
            `Resume is on this page — hit **Preview Resume**. Don't be shy; Ishva actually answers.`
        );
    }

    function projectBlurb(key) {
        const k = K();
        const map = {
            "Skin Scan": /Skin Scan/i,
            "Package-Guard": /Package-Guard/i,
            "Guardian-MCP": /Guardian-MCP/i,
            DocuQuery: /DocuQuery|RAG Pipeline/i,
            Goalsetter: /Goalsetter/i,
            BusTrack: /BusTrack/i,
            "Brain Tumor": /Brain Tumor/i,
            Diabetes: /Diabetes/i,
            Trading: /Trading Bot/i,
            Labor: /LaborMarket|FinInsight/i
        };
        const re = map[key] || new RegExp(key, "i");
        const hits = k.projects.filter((p) => re.test(p.name) || re.test(p.blurb));
        if (!hits.length) return offlineAnswer("projects");

        return hits
            .map((p) => {
                let out = `**${p.name}** (${p.category})\n${p.blurb}\nStack: ${p.tags.join(", ")}`;
                if (p.github) out += `\nCode: ${p.github}`;
                if (p.demo) out += `\nDemo: ${p.demo}`;
                if (!p.github) out += `\n(Repo private for now — ask Ishva for a walkthrough.)`;
                return out;
            })
            .join("\n\n") + `\n\nStill curious? I can compare two projects or pivot to *why hire*.`;
    }

    function offlineOffTopic() {
        return pick([
            "Hard pass 🚫 I'm a single-purpose AI: **Ishva Chinnasamy only**. Ask me why hire him, what he built, or how to reach him.",
            "I literally only know one human well enough to hype. That human is Ishva. Rephrase into an Ishva question and we're golden.",
            "Off-topic detector went *beep boop*. Try: “What are Ishva's best projects?” or “Why should we hire him?”"
        ]);
    }

    function pick(arr) {
        if (!arr || !arr.length) return "";
        // Prefer a reply we didn't just say
        const fresh = arr.filter((a) => !lastBotReplies.includes(a));
        const pool = fresh.length ? fresh : arr;
        return pool[Math.floor(Math.random() * pool.length)];
    }

    function rememberReply(text) {
        lastBotReplies.push(text);
        if (lastBotReplies.length > 4) lastBotReplies.shift();
        return text;
    }

    /* ---------- UI helpers ---------- */
    function appendMessage(role, text) {
        const box = document.getElementById("hire-bot-messages");
        const row = document.createElement("div");
        row.className = `hire-msg ${role}`;
        const bubble = document.createElement("div");
        bubble.className = "hire-bubble";
        bubble.innerHTML = formatBotText(text);
        row.appendChild(bubble);
        box.appendChild(row);
        box.scrollTop = box.scrollHeight;
    }

    function formatBotText(text) {
        // Minimal markdown: **bold**, newlines, autolink urls
        let html = escapeHtml(text);
        html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
        html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
        html = html.replace(
            /(https?:\/\/[^\s<]+)/g,
            '<a href="$1" target="_blank" rel="noopener">$1</a>'
        );
        html = html.replace(/\n/g, "<br>");
        return html;
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function showTyping() {
        const box = document.getElementById("hire-bot-messages");
        const row = document.createElement("div");
        row.className = "hire-msg bot hire-typing";
        row.innerHTML =
            '<div class="hire-bubble"><span class="hire-dot"></span><span class="hire-dot"></span><span class="hire-dot"></span></div>';
        box.appendChild(row);
        box.scrollTop = box.scrollHeight;
        return row;
    }

    function setBusy(busy) {
        isBusy = busy;
        const send = document.getElementById("hire-bot-send");
        const input = document.getElementById("hire-bot-input");
        if (send) send.disabled = busy;
        if (input) input.disabled = busy;
    }
})();
