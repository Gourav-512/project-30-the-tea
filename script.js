// Wait for window load
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
        initAnimations(); // Start animations after loader is gone
    }, 500);
});

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function initAnimations() {

    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled', 'shadow-md');
            navbar.classList.remove('h-24');
            navbar.classList.add('h-20');
        } else {
            navbar.classList.remove('nav-scrolled', 'shadow-md');
            navbar.classList.remove('h-20');
            navbar.classList.add('h-24');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        mobileMenu.classList.toggle('translate-x-full');
    }

    mobileBtn.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // 3. Hero Slider (Manual Logic for 2 Slides)
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('data-active'));
        slides[index].classList.add('data-active');
        currentSlide = index;
    }

    // Define globally so HTML can access them
    window.nextSlide = function () {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    window.prevSlide = function () {
        let prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    // Auto play
    setInterval(window.nextSlide, 7000);

    // 4. Hero Content Animation (Removed per user request)


    // 5. About Section Reveal
    gsap.utils.toArray('.reveal-left').forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power2.out'
        });
    });

    gsap.utils.toArray('.reveal-right').forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power2.out'
        });
    });

    // Vertical Reveal (Up)
    gsap.utils.toArray('.reveal-up').forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out'
        });
    });

    // 6. Product Swiper Initialization (Seamless Loop)
    if (document.querySelector('.product-swiper')) {
        new Swiper('.product-swiper', {
            slidesPerView: 2,
            spaceBetween: 10,
            loop: true,
            speed: 5000, // Very slow transition for continuous feel
            allowTouchMove: false, // Make it uncontrollable for pure marquee feel
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            breakpoints: {
                480: { slidesPerView: 3, spaceBetween: 20 },
                768: { slidesPerView: 4, spaceBetween: 30 },
                1024: { slidesPerView: 5, spaceBetween: 40 },
                1440: { slidesPerView: 6, spaceBetween: 50 }
            }
        });
    }

    // 7. Franchise Cards Stagger (Robust Logic)
    // Use set properly to ensuring hiding before animation starts
    const cards = gsap.utils.toArray('.franchise-card');

    // Set initial state immediately to avoid flash
    gsap.set(cards, { autoAlpha: 0, y: 50 });

    ScrollTrigger.batch(cards, {
        start: "top 85%",
        onEnter: batch => gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.2)',
            overwrite: true
        }),
        once: true // Fix: Ensure it only runs once to prevent glitching on scroll up/down
    });

    // 8. Gallery Animation
    const galleryImages = document.querySelectorAll('#gallery img');
    galleryImages.forEach((img, i) => {
        gsap.from(img.parentElement, { // Animate the container/parent
            scrollTrigger: {
                trigger: img, // Trigger on the image itself or earlier
                start: 'top 85%',
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: i * 0.1
        });
    });

    // 9. Contact Section Animation
    gsap.from('#contact .bg-\\[\\#2d241e\\]', {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 70%',
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
}
