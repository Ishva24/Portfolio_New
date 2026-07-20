/* =========================================================
   Hire-Me Bot — knowledge pack for Ishva Chinnasamy
   Sources: resume PDF, GitHub (Ishva24), LinkedIn (ishva24), portfolio
   ========================================================= */
window.ISHVA_KNOWLEDGE = {
    identity: {
        fullName: "Ishva Chinnasamy",
        firstName: "Ishva",
        role: "AI/ML Engineer & Data Scientist",
        location: "Coimbatore, India",
        email: "ishva006@gmail.com",
        phone: "+91 96776 31401",
        availability: "Open to full-time and internship roles in AI/ML, MLOps, Data Science, and Applied GenAI",
        links: {
            github: "https://github.com/Ishva24",
            linkedin: "https://www.linkedin.com/in/ishva24",
            portfolio: "https://ishva24.github.io/Portfolio_New/",
            resume: "Ishva_Resume_Final.pdf"
        }
    },

    summary:
        "Data Scientist and AI/ML Engineer with an M.Sc. in Artificial Intelligence (CGPA 8.2) " +
        "and a B.Sc. in Computer Science (CGPA 8.75). Ships production AI systems — medical vision, " +
        "secure LLM gateways, RAG pipelines, ETL + BI — not just notebook demos. Proven internship " +
        "impact: +25% ETL efficiency, 98%+ data accuracy, 30% faster feature cycles.",

    whyHire: [
        "Owns the full loop: model design → APIs → evaluation → Docker → clear metrics",
        "Real impact numbers: 95% brain-tumor MRI accuracy, +25% ETL efficiency, 98%+ data accuracy",
        "Breadth that recruiters love: medical AI, AI security, GenAI/RAG, data engineering, full-stack",
        "Ships systems (FastAPI, Flask, React, Docker, CI/CD) — not only Jupyter notebooks",
        "Strong academic base (M.Sc. AI 8.2, B.Sc. CS 8.75) plus internship delivery at Gravity AI & Acmegrade",
        "Clear communicator who partners with product & engineering teams",
        "Actively open to hire and ready to own impact from day one"
    ],

    education: [
        {
            degree: "M.Sc. Artificial Intelligence",
            school: "Karunya University, Coimbatore",
            years: "2024 — 2026",
            gpa: "CGPA 8.2 / 10"
        },
        {
            degree: "B.Sc. Computer Science",
            school: "Karunya University, Coimbatore",
            years: "2021 — 2024",
            gpa: "CGPA 8.75 / 10"
        }
    ],

    experience: [
        {
            title: "Data Analyst Intern",
            company: "Gravity AI",
            dates: "Dec 2025 — May 2026",
            highlights: [
                "Built Python ETL pipelines for labor-market datasets — +25% pipeline efficiency",
                "EDA on employment trends with Pandas/NumPy for strategy insights",
                "Automated validation frameworks achieving 98%+ data accuracy",
                "Tableau & Power BI dashboards for decision-ready metrics",
                "Partnered with product & engineering — 30% faster feature cycles"
            ],
            tech: ["Python", "Pandas", "SQL", "Tableau", "Power BI"]
        },
        {
            title: "Software Intern",
            company: "Acmegrade",
            dates: "Jul 2024 — Dec 2024",
            highlights: [
                "Enterprise ERP module development & testing; logged 50+ bugs; +15% process efficiency",
                "Requirement gathering & analysis — 20% faster development on assigned workstreams"
            ],
            tech: ["Software Testing", "ERP", "Requirements Analysis"]
        }
    ],

    projects: [
        {
            name: "Skin Scan AI (DermaCon-IN)",
            category: "AI / ML",
            blurb:
                "Full-stack AI screening system classifying 20+ skin conditions with Swin Transformer + Concept Bottleneck Model, GradCAM heatmaps, Flask + React 18 + Docker.",
            github: "https://github.com/Ishva24/Skin-Scan",
            demo: "https://huggingface.co/spaces/Ishva24/SkinScanAI-Dermatology-Triage",
            tags: ["PyTorch", "Swin Transformer", "Flask", "React", "Docker"]
        },
        {
            name: "Package-Guard for AI Agents",
            category: "AI Security",
            blurb:
                "Zero-trust package firewall intercepting npm/pip installs from coding agents — blocks slopsquatting, typosquats, and low-reputation packages.",
            github: "https://github.com/Ishva24/Package-Guard---For-AI-Agents",
            tags: ["TypeScript", "CLI Interceptor", "npm / PyPI", "Policy Engine"]
        },
        {
            name: "Guardian-MCP Gateway",
            category: "AI Security",
            blurb:
                "Zero-trust middleware for Model Context Protocol — RS256 JWT auth, role scopes, semantic argument checks against prompt injection.",
            github: "https://github.com/Ishva24/Guardian-MCP",
            tags: ["TypeScript", "Node.js", "JWT", "Docker Compose"]
        },
        {
            name: "DocuQuery RAG Pipeline",
            category: "GenAI / MLOps",
            blurb:
                "Domain-specific RAG: hybrid BM25 + FAISS with RRF, cross-encoder rerank, FastAPI SSE, MLflow prompts, RAGAS evaluation.",
            github: "https://github.com/Ishva24/Domain-Specific-RAG-Pipeline",
            demo: "https://huggingface.co/spaces/Ishva24/DocuQuery-RAG-Pipeline",
            tags: ["FastAPI", "FAISS", "BM25", "MLflow", "RAGAS", "Docker"]
        },
        {
            name: "Goalsetter + MCP Assistant",
            category: "GenAI Full Stack",
            blurb:
                "MERN goal manager with JWT auth and Gemini 2.5 Flash assistant via MCP tools for natural-language task management.",
            github: "https://github.com/Ishva24/mern-goalsetter-mcp",
            tags: ["React", "Node.js", "MongoDB", "Gemini", "MCP"]
        },
        {
            name: "BusTrack — Realtime Tracking",
            category: "Full Stack",
            blurb:
                "Live bus tracking monorepo: Express + JWT, Socket.IO positions from Redis, Prisma/MySQL, Docker, bus simulator.",
            github: "https://github.com/Ishva24/Bus-Tracking",
            tags: ["TypeScript", "Socket.IO", "Redis", "Prisma", "Docker"]
        },
        {
            name: "LaborMarket-ETL Pipeline",
            category: "Data Engineering",
            blurb:
                "Job-market pipeline: ingest → clean → impute → MySQL → Tableau salary analytics. Internship workstream. Repo currently private.",
            github: null,
            tags: ["Python", "Pandas", "SQL", "Tableau"]
        },
        {
            name: "FinInsight Analytics",
            category: "Analytics Engineering",
            blurb:
                "DuckDB ingestion, dbt transforms + tests, Streamlit dashboards, CI/CD ready. Repo currently private.",
            github: null,
            tags: ["DuckDB", "dbt", "Streamlit", "CI/CD"]
        },
        {
            name: "Binance Futures Trading Bot",
            category: "Python / FinTech",
            blurb:
                "CLI for Binance Futures Testnet: Market, Limit, TWAP orders, HMAC client, Rich UI, layered architecture.",
            github: "https://github.com/Ishva24/Trading-Bot-",
            tags: ["Python", "Binance API", "Rich", "TWAP"]
        },
        {
            name: "Brain Tumor MRI Detection",
            category: "Computer Vision",
            blurb:
                "Deep learning MRI classifier with augmentation and histogram equalization — ~95% accuracy, faster clinical turnaround story.",
            github: "https://github.com/Ishva24/Brain_tumor_detection",
            demo: "https://brain-tumor-detection-jade.vercel.app",
            tags: ["TensorFlow", "CNN", "OpenCV", "Keras"]
        },
        {
            name: "Diabetes Diagnostic Prediction",
            category: "Machine Learning",
            blurb:
                "Full diagnostic ML pipeline with feature engineering, Random Forest + tuning, ROC-AUC evaluation — ~85% accuracy.",
            github: "https://github.com/Ishva24/Diabetes_Prediction",
            demo: "https://ishva24.github.io/Diabetes_Prediction/",
            tags: ["scikit-learn", "Random Forest", "Pandas"]
        }
    ],

    skills: {
        "Machine Learning & AI": [
            "PyTorch", "TensorFlow", "Keras", "scikit-learn", "CNNs", "Swin Transformers",
            "Computer Vision", "Concept Bottleneck Models", "OpenCV", "GradCAM",
            "LangChain", "RAG", "FAISS", "MLflow", "MCP", "Gemini"
        ],
        "Data Analytics & BI": [
            "SQL", "Pandas", "NumPy", "Tableau", "Power BI", "Streamlit",
            "DuckDB", "dbt", "Seaborn", "EDA", "A/B Testing"
        ],
        "MLOps & Backend": [
            "Flask", "FastAPI", "Docker", "Docker Compose", "REST APIs", "ETL Pipelines",
            "JWT Auth", "SSE", "CI/CD", "Prisma", "Redis", "Socket.IO", "Git & GitHub"
        ],
        "Languages & Frontend": [
            "Python", "TypeScript", "JavaScript", "SQL", "Java", "C++",
            "React", "Redux", "MongoDB", "HTML / CSS"
        ]
    },

    certifications: [
        { name: "IT Automation with Python", issuer: "Google / Tata Strive & Coursera", year: "2024" },
        { name: "Fundamentals of AI", issuer: "Microsoft Azure", year: "2024" }
    ],

    github: {
        username: "Ishva24",
        url: "https://github.com/Ishva24",
        bio: "Data Scientist | ML Engineer | Building AI/ML & Web Solutions",
        publicRepos: [
            "Skin-Scan",
            "Package-Guard---For-AI-Agents",
            "Guardian-MCP",
            "Domain-Specific-RAG-Pipeline",
            "mern-goalsetter-mcp",
            "Bus-Tracking",
            "Trading-Bot-",
            "Brain_tumor_detection",
            "Diabetes_Prediction",
            "Portfolio_New"
        ],
        note: "LaborMarket-ETL and FinInsight repos are not public yet."
    },

    linkedin: {
        url: "https://www.linkedin.com/in/ishva24",
        headline:
            "AI/ML Engineer & Data Scientist — medical vision, secure LLM systems, RAG, data platforms"
    },

    contactHints: [
        "Email ishva006@gmail.com",
        "LinkedIn https://www.linkedin.com/in/ishva24",
        "GitHub https://github.com/Ishva24",
        "Phone +91 96776 31401",
        "Resume available on this portfolio (Preview Resume button)"
    ]
};

/** Compact text block injected into LLM system prompts */
window.ISHVA_KNOWLEDGE_TEXT = (function buildKnowledgeText(k) {
    const lines = [];
    lines.push(`Name: ${k.identity.fullName}`);
    lines.push(`Role: ${k.identity.role}`);
    lines.push(`Location: ${k.identity.location}`);
    lines.push(`Email: ${k.identity.email}`);
    lines.push(`Phone: ${k.identity.phone}`);
    lines.push(`Availability: ${k.identity.availability}`);
    lines.push(`GitHub: ${k.identity.links.github}`);
    lines.push(`LinkedIn: ${k.identity.links.linkedin}`);
    lines.push(`Portfolio: ${k.identity.links.portfolio}`);
    lines.push("");
    lines.push("SUMMARY:");
    lines.push(k.summary);
    lines.push("");
    lines.push("WHY HIRE:");
    k.whyHire.forEach((w, i) => lines.push(`${i + 1}. ${w}`));
    lines.push("");
    lines.push("EDUCATION:");
    k.education.forEach((e) =>
        lines.push(`- ${e.degree} @ ${e.school} (${e.years}) — ${e.gpa}`)
    );
    lines.push("");
    lines.push("EXPERIENCE:");
    k.experience.forEach((exp) => {
        lines.push(`- ${exp.title} @ ${exp.company} (${exp.dates})`);
        exp.highlights.forEach((h) => lines.push(`  • ${h}`));
    });
    lines.push("");
    lines.push("PROJECTS:");
    k.projects.forEach((p) => {
        lines.push(`- ${p.name} [${p.category}]: ${p.blurb}`);
        if (p.github) lines.push(`  GitHub: ${p.github}`);
        if (p.demo) lines.push(`  Demo: ${p.demo}`);
        lines.push(`  Tags: ${p.tags.join(", ")}`);
    });
    lines.push("");
    lines.push("SKILLS:");
    Object.entries(k.skills).forEach(([group, list]) => {
        lines.push(`- ${group}: ${list.join(", ")}`);
    });
    lines.push("");
    lines.push("CERTIFICATIONS:");
    k.certifications.forEach((c) => lines.push(`- ${c.name} (${c.issuer}, ${c.year})`));
    lines.push("");
    lines.push(`GitHub username: ${k.github.username} — ${k.github.bio}`);
    lines.push(`Public repos: ${k.github.publicRepos.join(", ")}`);
    lines.push(k.github.note);
    return lines.join("\n");
})(window.ISHVA_KNOWLEDGE);
