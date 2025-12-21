// Initialize Lucide Icons
lucide.createIcons();

// --- 1. CMS / Data Rendering (Scalability) ---
function renderContent() {
    // Ideally, we would stick to the static HTML for SEO and just use JS for enhancements,
    // but to demonstrate scalability/templates, we can update text dynamically if needed.
    // For now, we will assume the HTML is already populated or we can strictly use this to 'hydrate' the page
    // allowing the user to just edit content.js.

    // Example: Update Hero Title dynamically
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle && typeof siteData !== 'undefined') {
        heroTitle.innerHTML = siteData.hero.title;
    }

    // Hydrate WhatsApp Links
    if (typeof siteData !== 'undefined' && siteData.whatsappMessages) {
        const wa = siteData.whatsappMessages;
        const setLink = (selector, msg) => {
            const el = document.querySelector(selector);
            if (el) el.href = `${wa.base}?text=${msg}`;
        };

        setLink('.hero-buttons .btn-primary', wa.hero);
        setLink('.nav-links .btn-nav', wa.navbar);
        setLink('.service-card:nth-child(1) .btn-text', wa.consultoria);
        setLink('.service-card:nth-child(2) .btn-text', wa.personal);
        setLink('.service-card:nth-child(3) .btn-text', wa.mentoria);
        setLink('.cta-banner .btn', wa.cta_footer);
        setLink('.wa-btn', wa.widget);
    }

    // In a full implementation, we would map all fields here.
}

document.addEventListener('DOMContentLoaded', () => {
    // renderContent(); // Optional: Enable to overwrite HTML with JSON data
    initPremiumExperience();
});


// --- 2. Premium Experience (Animations & Interactions) ---
function initPremiumExperience() {

    // A. Smooth Scroll (Lenis) - The "Heavy/Premium" Feel
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Enhanced Anchor Scroll (Agency Feel)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    lenis.scrollTo(target, {
                        offset: -80, // Navbar height offset
                        duration: 1.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Same exponential ease as main scroll
                        immediate: false
                    });
                }
            }
        });
    });

    // Connect GSAP ScrollTrigger to Lenis
    gsap.registerPlugin(ScrollTrigger);


    // B. Hero Animations (Intro)
    const tl = gsap.timeline();

    tl.from('.navbar', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    })
        .from('.hero-bg img', {
            scale: 1.2,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out"
        }, "-=0.5")
        .from('.badget', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=1")
        .from('.hero h1', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.6")
        .from('.hero p', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
        .from('.hero-buttons .btn', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.8");


    // C. Scroll Animations (ScrollTrigger)

    // 0. Section Headers (Global Reveal)
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.fromTo(header,
            { opacity: 0, y: 30 },
            {
                scrollTrigger: {
                    trigger: header,
                    start: "top 95%", // Trigger almost immediately when it enters view
                    toggleActions: "play none none reverse"
                },
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out"
            }
        );
    });

    // 1. Achievements (Staggered Fade Up)
    gsap.from('.stat-item', {
        scrollTrigger: {
            trigger: '.achievements',
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });

    // 2. About Section (Parallax & Reveal)
    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '.about',
            start: "top 70%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about',
            start: "top 70%",
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // 3. Services Cards (Staggered Reveal)
    gsap.fromTo('.service-card',
        { opacity: 0, y: 50 },
        {
            scrollTrigger: {
                trigger: '.services',
                start: "top 80%",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        }
    );

    // 4. Gallery (Zoom Effect)
    gsap.utils.toArray('.gallery-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: '.gallery',
                start: "top 80%",
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "back.out(1.2)"
        });
    });


    // D. Magnetic Buttons (Micro-interaction)
    const buttons = document.querySelectorAll('.btn-primary, .btn-outline, .social-links a');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                duration: 0.3,
                x: x * 0.3,
                y: y * 0.3,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                duration: 0.8,
                x: 0,
                y: 0,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
    // F. Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const triggers = document.querySelectorAll('.lightbox-trigger');
    const closeBtn = document.querySelector('.lightbox-close');

    if (lightbox) {
        triggers.forEach(item => {
            item.addEventListener('click', () => {
                const src = item.getAttribute('data-src');
                lightbox.style.display = "block";
                lightboxImg.src = src;
                // Disable Lenis scroll while lightbox is open
                if (lenis) lenis.stop();
            });
        });

        closeBtn.addEventListener('click', () => {
            lightbox.style.display = "none";
            if (lenis) lenis.start();
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = "none";
                if (lenis) lenis.start();
            }
        });
    }
}

// Mobile Menu Logic (Existing functionality)
const mobileMenuBtn = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Simple opacity fade for links
        if (navLinks.classList.contains('active')) {
            gsap.fromTo('.nav-links li',
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
            );
        }
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});
