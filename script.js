// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

// Typing Text Animation
const typed = new Typed('#typewriter', {
    strings: [
        'AI/ML Engineer',
        'Data Scientist',
        'Data Analyst',
        'MLOps Developer'
    ],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 1500,
    loop: true
});

// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Toggle icon between bars and times
    const icon = mobileBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Sticky Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 18, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 18, 0.85)';
        navbar.style.boxShadow = 'none';
    }
});

// Initialize Vanta 3D Network Animation Background
window.addEventListener('DOMContentLoaded', () => {
    VANTA.NET({
        el: "#home",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x00d2d3,
        backgroundColor: 0x0a0a12,
        points: 12.00,
        maxDistance: 22.00,
        spacing: 16.00
    });
});

// Image fallback handler for deployed site where local assets are ignored in Git
window.addEventListener('DOMContentLoaded', () => {
    const fallbacks = {
        'profile.jpeg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=400&h=400', // Professional portrait
        'skin_scan.png': 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?fit=crop&w=600&h=400', // Medical clinic/microscope
        'guardian_mcp.png': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?fit=crop&w=600&h=400', // Security/network
        'labor_etl.png': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=600&h=400', // Dashboard charts
        'rag.png': 'https://images.unsplash.com/photo-1677442136019-21780efad99a?fit=crop&w=600&h=400', // AI abstract
        'fininsight.png': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?fit=crop&w=600&h=400', // Financial graphics
        'brain_tumor.png': 'https://images.unsplash.com/photo-1559757175-5700dde675bc?fit=crop&w=600&h=400', // Medical brain scan
        'diabetes.png': 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?fit=crop&w=600&h=400' // Diagnostic healthcare
    };

    document.querySelectorAll('img').forEach(img => {
        // If the image has already failed to load before this script runs
        if (img.naturalWidth === 0) {
            handleImageError(img);
        }
        
        // Listen for future error events
        img.addEventListener('error', () => {
            handleImageError(img);
        });
    });

    function handleImageError(img) {
        const srcAttr = img.getAttribute('src');
        if (!srcAttr) return;
        
        const srcParts = srcAttr.split('/');
        const filename = srcParts[srcParts.length - 1];
        
        if (fallbacks[filename] && img.src !== fallbacks[filename]) {
            img.src = fallbacks[filename];
        }
    }
});

