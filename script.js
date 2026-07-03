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

// Handle broken/missing images (for local assets not pushed to GitHub)
document.addEventListener('error', function(e) {
    if (e.target.tagName.toLowerCase() === 'img') {
        const img = e.target;
        const parent = img.parentElement;
        
        // Hide the broken image
        img.style.display = 'none';
        
        // Add fallback icon/content
        if (parent.classList.contains('hero-img-placeholder')) {
            // Fallback for profile image
            if (!parent.querySelector('.fallback-icon')) {
                const icon = document.createElement('i');
                icon.className = 'fas fa-user-astronaut fallback-icon';
                icon.style.fontSize = '5rem';
                icon.style.color = 'var(--accent)';
                parent.appendChild(icon);
            }
        } else if (parent.classList.contains('project-img')) {
            // Fallback for project cards
            if (!parent.querySelector('.fallback-icon')) {
                const icon = document.createElement('i');
                
                // Determine icon based on project card ID or image source
                const projectCard = parent.closest('.project-card');
                const id = projectCard ? projectCard.id : '';
                
                let iconClass = 'fas fa-laptop-code'; // default
                if (id.includes('skin-scan')) iconClass = 'fas fa-stethoscope';
                else if (id.includes('guardian-mcp')) iconClass = 'fas fa-shield-alt';
                else if (id.includes('labor-etl')) iconClass = 'fas fa-database';
                else if (id.includes('rag')) iconClass = 'fas fa-brain';
                else if (id.includes('fininsight')) iconClass = 'fas fa-chart-line';
                else if (id.includes('brain-tumor')) iconClass = 'fas fa-diagnoses';
                else if (id.includes('diabetes')) iconClass = 'fas fa-heartbeat';
                
                icon.className = `${iconClass} fallback-icon`;
                icon.style.fontSize = '3.5rem';
                icon.style.color = 'var(--accent)';
                parent.appendChild(icon);
            }
        }
    }
}, true); // Use capture phase because error events do not bubble

