// Initialize Lucide Icons
lucide.createIcons();

// --- 1. CMS / Data Rendering (Scalability) ---
// Language State
let currentLang = 'pt';

function setLanguage(lang) {
    currentLang = lang;
    const data = siteData[lang];
    if (!data) return;

    // 0. Navigation
    const navItems = document.querySelectorAll('.nav-links li a');
    if (data.navigation) {
        navItems.forEach((link, index) => {
            if (data.navigation[index]) {
                link.textContent = data.navigation[index];
            }
        });
    }

    // 1. Hero
    document.querySelector('.badget').textContent = data.hero.badge;
    document.querySelector('.hero h1').innerHTML = data.hero.title;
    document.querySelector('.hero p').textContent = data.hero.subtitle;
    document.querySelector('.hero-buttons .btn-primary').innerHTML = `${data.hero.btnPrimary} <i data-lucide="arrow-right"></i>`;
    document.querySelector('.hero-buttons .btn-outline').textContent = data.hero.btnSecondary;

    // 2. Achievements
    const stats = document.querySelectorAll('.stat-item');
    stats.forEach((item, index) => {
        if (data.achievements[index]) {
            item.querySelector('h3').textContent = data.achievements[index].title;
            item.querySelector('p').textContent = data.achievements[index].text;
        }
    });

    // 3. About
    document.querySelector('.about h2').innerHTML = data.about.title;
    const aboutParas = document.querySelectorAll('.about-text p');
    if (aboutParas.length >= 2) {
        aboutParas[0].textContent = data.about.description[0];
        aboutParas[1].textContent = data.about.description[1];
    }
    const aboutList = document.querySelectorAll('.about-list li');
    aboutList.forEach((li, index) => {
        if (data.about.features[index]) {
            // Preserve icon
            const icon = li.querySelector('i'); // or svg
            li.innerHTML = '';
            if (icon) li.appendChild(icon);
            else {
                // re-add icon check-circle if missing
                const i = document.createElement('i');
                i.setAttribute('data-lucide', 'check-circle');
                li.appendChild(i);
            }
            li.append(` ${data.about.features[index]}`);
        }
    });

    // 4. Services
    document.querySelector('.services .section-header h2').textContent = data.services.header.title;
    document.querySelector('.services .section-header p').textContent = data.services.header.subtitle;

    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
        if (data.services.cards[index]) {
            card.querySelector('h3').textContent = data.services.cards[index].title;
            card.querySelector('p').textContent = data.services.cards[index].description;
            // Handle Button Text inside Link
            const btn = card.querySelector('.btn-text');
            btn.innerHTML = `${data.services.cards[index].cta} <i data-lucide="arrow-right"></i>`;
        }
    });

    // 5. Gallery & Social & CTA
    document.querySelector('.gallery .section-header h2').textContent = data.gallery.title;
    document.querySelector('.gallery .section-header p').textContent = data.gallery.subtitle;

    document.querySelector('.social-preview .section-header h2').textContent = data.social.title;
    document.querySelector('.social-preview .section-header p').textContent = data.social.subtitle;
    document.querySelector('.instagram-card .social-content p').textContent = data.social.insta;
    document.querySelector('.tiktok-card .social-content p').textContent = data.social.tiktok;

    document.querySelector('.cta-banner h2').textContent = data.cta_footer.title;
    document.querySelector('.cta-banner p').textContent = data.cta_footer.subtitle;
    document.querySelector('.cta-banner .btn').textContent = data.cta_footer.btn;

    // 6. WhatsApp Links
    const wa = data.whatsappMessages;
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

    setLink('.wa-btn', wa.widget);

    // 7. Modal (New Dynamic)
    if (data.modal) {
        document.querySelector('.modal-content h3').textContent = data.modal.title;
        document.querySelector('.modal-content p').textContent = data.modal.p;
        document.querySelector('#client-name').placeholder = data.modal.placeholder;
        // Preserve Icon in Button
        const btn = document.querySelector('#confirm-name');
        const iconInfo = btn.querySelector('i') || document.createElement('i');
        iconInfo.setAttribute('data-lucide', 'message-circle');

        btn.textContent = data.modal.btn + ' '; // Add space
        btn.appendChild(iconInfo);
    }

    // Re-render icons if needed (sometimes innerHTML wipes them)
    lucide.createIcons();
}

function createLanguageSwitcher() {
    const switcher = document.createElement('div');
    switcher.className = 'lang-switcher';
    switcher.innerHTML = `
        <button id="btn-pt" class="active">PT</button>
        <span class="divider"></span>
        <button id="btn-en">EN</button>
    `;
    document.body.appendChild(switcher);

    // Initial Styles via JS to avoid modifying style.css heavily
    Object.assign(switcher.style, {
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        zIndex: '1000',
        background: 'rgba(5, 5, 5, 0.8)',
        backdropFilter: 'blur(10px)',
        padding: '0.5rem 1rem',
        borderRadius: '50px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    });

    const btns = switcher.querySelectorAll('button');
    btns.forEach(btn => {
        Object.assign(btn.style, {
            background: 'none',
            border: 'none',
            color: '#fff',
            fontWeight: '600',
            cursor: 'pointer',
            opacity: '0.5',
            transition: '0.3s'
        });
        if (btn.classList.contains('active')) {
            btn.style.opacity = '1';
            btn.style.color = '#D4AF37'; // Gold
        }

        btn.addEventListener('click', () => {
            const lang = btn.id === 'btn-pt' ? 'pt' : 'en';
            setLanguage(lang);
            btns.forEach(b => {
                b.style.opacity = '0.5';
                b.style.color = '#fff';
            });
            btn.style.opacity = '1';
            btn.style.color = '#D4AF37';
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createLanguageSwitcher();
    setLanguage('pt'); // Default to PT (Also hydrates links)
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


// --- 3. Name Capture Modal Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('name-modal');
    const input = document.getElementById('client-name');
    const confirmBtn = document.getElementById('confirm-name');
    const closeBtn = document.querySelector('.modal-close');
    let pendingUrl = '';

    // Function to open modal
    function openModal(originalUrl) {
        pendingUrl = originalUrl;
        modal.style.display = 'flex';
        // Force reflow for transition
        setTimeout(() => modal.classList.add('active'), 10);
        input.value = ''; // Reset input
        setTimeout(() => input.focus(), 100); // Auto focus
    }

    // Function to close modal
    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // Intercept WhatsApp Clicks
    // Select links starting with https://wa.me
    // We use a delegated event listener just in case links are dynamic
    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('a');
        if (target && target.href && target.href.includes('wa.me')) {
            e.preventDefault();
            openModal(target.href);
        }
    });

    // Confirm Action
    confirmBtn.addEventListener('click', () => {
        const name = input.value.trim();
        if (!name) {
            input.style.borderColor = 'red';
            return;
        }

        // Parse the URL to inject the name
        // Format: wa.me/number?text=OldText
        let finalUrl = pendingUrl;

        if (pendingUrl.includes('?text=')) {
            const parts = pendingUrl.split('?text=');
            const base = parts[0];
            const oldMsg = decodeURIComponent(parts[1]);

            // Construct new message: "[Greeting Template] [OldMsg]"
            // Context aware greeting from CMS
            const data = siteData[currentLang];
            let template = data.whatsappMessages.greetingTemplate || (currentLang === 'pt' ? "Olá Wladimir, meu nome é {name}. " : "Hello Wladimir, my name is {name}. ");

            // Replace placeholder and encode
            const greeting = encodeURIComponent(template.replace('{name}', name));

            // We append the new greeting BEFORE the specific request
            finalUrl = `${base}?text=${greeting}${parts[1]}`;
        } else {
            // No text param? Just add it.
            const data = siteData[currentLang];
            let template = data.whatsappMessages.greetingTemplate || (currentLang === 'pt' ? "Olá Wladimir, meu nome é {name}. " : "Hello Wladimir, my name is {name}. ");
            const msg = encodeURIComponent(template.replace('{name}', name));

            finalUrl = `${pendingUrl}?text=${msg}`;
        }

        window.open(finalUrl, '_blank');
        closeModal();
    });

    // Close actions
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Enter key support
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') confirmBtn.click();
    });

    // Remove red border on input
    input.addEventListener('input', () => {
        input.style.borderColor = '#333';
    });
});
