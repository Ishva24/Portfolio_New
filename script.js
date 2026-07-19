/* =========================================================
   ishva.works — Portfolio interactions
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initAOS();
    initTyped();
    initNavbar();
    initMobileMenu();
    initScrollProgress();
    initActiveNav();
    initCounters();
    initProjectFilters();
    initBackToTop();
    initCustomCursor();
    initMagneticButtons();
    initBentoSpotlight();
});

/* --- AOS --- */
function initAOS() {
    if (typeof AOS === "undefined") return;
    AOS.init({
        duration: 800,
        once: true,
        offset: 80,
        easing: "ease-out-cubic",
        disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches
    });
}

/* --- Typewriter --- */
function initTyped() {
    const el = document.getElementById("typewriter");
    if (!el || typeof Typed === "undefined") return;

    new Typed("#typewriter", {
        strings: [
            "production AI systems",
            "medical vision models",
            "secure LLM gateways",
            "ETL & analytics pipelines",
            "RAG products that ship"
        ],
        typeSpeed: 48,
        backSpeed: 28,
        backDelay: 1600,
        loop: true,
        smartBackspace: true
    });
}

/* --- Navbar scroll state --- */
function initNavbar() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    const onScroll = () => {
        navbar.classList.toggle("scrolled", window.scrollY > 40);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
}

/* --- Mobile menu --- */
function initMobileMenu() {
    const btn = document.getElementById("mobile-toggle");
    const menu = document.getElementById("nav-menu");
    if (!btn || !menu) return;

    const closeMenu = () => {
        menu.classList.remove("open");
        btn.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    };

    btn.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("open");
        btn.classList.toggle("open", isOpen);
        btn.setAttribute("aria-expanded", String(isOpen));
        document.body.style.overflow = isOpen ? "hidden" : "";
    });

    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) closeMenu();
    });
}

/* --- Scroll progress bar --- */
function initScrollProgress() {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;

    const update = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = `${progress}%`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
}

/* --- Active nav section highlight --- */
function initActiveNav() {
    const links = document.querySelectorAll(".nav-link[data-section]");
    const sections = [...links]
        .map((link) => document.getElementById(link.dataset.section))
        .filter(Boolean);

    if (!sections.length) return;

    const setActive = (id) => {
        links.forEach((link) => {
            link.classList.toggle("active", link.dataset.section === id);
        });
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActive(entry.target.id);
                }
            });
        },
        {
            rootMargin: "-40% 0px -50% 0px",
            threshold: 0
        }
    );

    sections.forEach((section) => observer.observe(section));
}

/* --- Animated counters --- */
function initCounters() {
    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    const animate = (el) => {
        const target = Number(el.dataset.count) || 0;
        const suffix = el.dataset.suffix || "";
        const duration = 1400;
        const start = performance.now();

        const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            const value = Math.round(target * eased);
            el.textContent = `${value}${suffix}`;
            if (t < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                animate(entry.target);
                obs.unobserve(entry.target);
            });
        },
        { threshold: 0.4 }
    );

    counters.forEach((el) => observer.observe(el));
}

/* --- Project filters --- */
function initProjectFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".project-card");
    if (!buttons.length || !cards.length) return;

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const filter = btn.dataset.filter;

            buttons.forEach((b) => {
                b.classList.toggle("active", b === btn);
                b.setAttribute("aria-selected", String(b === btn));
            });

            cards.forEach((card) => {
                const category = card.dataset.category;
                const show = filter === "all" || category === filter;
                card.classList.toggle("is-hidden", !show);
            });

            // Refresh AOS for newly visible cards
            if (typeof AOS !== "undefined") AOS.refresh();
        });
    });
}

/* --- Back to top --- */
function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;

    const toggle = () => {
        btn.classList.toggle("visible", window.scrollY > 500);
    };

    window.addEventListener("scroll", toggle, { passive: true });
    toggle();

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* --- Custom cursor (fine pointer only) --- */
function initCustomCursor() {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cursor = document.getElementById("cursor");
    const follower = document.getElementById("cursor-follower");
    if (!cursor || !follower) return;

    document.body.classList.add("has-custom-cursor");

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    const loop = () => {
        followerX += (mouseX - followerX) * 0.18;
        followerY += (mouseY - followerY) * 0.18;
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
        requestAnimationFrame(loop);
    };
    loop();

    const hoverTargets = "a, button, .filter-btn, .skill-badge, .project-card, .nav-cta";
    document.querySelectorAll(hoverTargets).forEach((el) => {
        el.addEventListener("mouseenter", () => follower.classList.add("hover"));
        el.addEventListener("mouseleave", () => follower.classList.remove("hover"));
    });
}

/* --- Magnetic buttons --- */
function initMagneticButtons() {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.querySelectorAll(".magnetic").forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "";
        });
    });
}

/* --- Bento card spotlight follows mouse --- */
function initBentoSpotlight() {
    document.querySelectorAll(".bento-card").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty("--mx", `${x}%`);
            card.style.setProperty("--my", `${y}%`);
        });
    });
}
