document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const navClose = document.getElementById('nav-close');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });
    }

    if (navClose && navLinks && menuToggle) {
        navClose.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('open');
        });
    }

    // --- Smooth Scrolling for Navigation ---
    // (Already handled by CSS scroll-behavior: smooth, but this ensures clicking nav links closes the mobile menu)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('open');
            }
        });
    });

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                // Once it's revealed, stop observing it
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal classes to all sections and cards
    const revealElements = document.querySelectorAll('.section, .feature-card, .pillar-card, .pipeline-step');
    revealElements.forEach(el => {
        el.classList.add('reveal-hidden');
        revealOnScroll.observe(el);
    });

    // --- Contact Form Submission (Mockup logic) ---
    const contactForm = document.getElementById('idr-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            // Show a "loading" or "success" state
            submitBtn.disabled = true;
            submitBtn.innerText = 'Sending...';
            
            setTimeout(() => {
                submitBtn.innerText = 'Message Sent! (Simulation)';
                submitBtn.style.backgroundColor = '#28a745'; // Green for success
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalText;
                    submitBtn.style.backgroundColor = ''; // Revert to primary orange
                }, 3000);
            }, 1000);
        });
    }
});
