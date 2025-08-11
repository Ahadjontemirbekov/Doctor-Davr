document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loadingScreen = document.querySelector('.loading-screen');

    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        document.body.style.overflow = 'auto';
    }, 2000);

    // Initialize particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#45b649"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#45b649",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Modal oynasi uchun
    const authBtn = document.getElementById('authBtn');
    const authModal = document.getElementById('authModal');
    const closeModal = document.querySelector('.close-modal');
    const loginToggle = document.getElementById('loginToggle');
    const registerToggle = document.getElementById('registerToggle');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Modalni ochish
    if (authBtn) {
        authBtn.addEventListener('click', function(e) {
            e.preventDefault();
            authModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }

    // Modalni yopish
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            authModal.classList.remove('show');
            document.body.style.overflow = '';
        });
    }

    // Toggle forms
    if (loginToggle && registerToggle) {
        loginToggle.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                document.querySelector('.form-toggle').classList.remove('register-active');
                this.classList.add('active');
                registerToggle.classList.remove('active');
                loginForm.classList.add('active-form');
                registerForm.classList.remove('active-form');
            }
        });

        registerToggle.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                document.querySelector('.form-toggle').classList.add('register-active');
                this.classList.add('active');
                loginToggle.classList.remove('active');
                registerForm.classList.add('active-form');
                loginForm.classList.remove('active-form');
            }
        });
    }

    // Show/hide password
    const showPasswordBtns = document.querySelectorAll('.show-password');
    showPasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            if (input.type === 'password') {
                input.type = 'text';
                this.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                input.type = 'password';
                this.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    });

    // Navbar scroll effekti
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const backToTop = document.getElementById('backToTop');

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');

            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Scroll down button
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', function() {
            window.scrollBy({
                top: window.innerHeight - 100,
                behavior: 'smooth'
            });
        });
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scroll for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Video play button
    const videoContainer = document.querySelector('.video-container');
    const videoOverlay = document.querySelector('.video-overlay');
    const video = document.getElementById('tourVideo');
    const playBtn = document.querySelector('.play-btn');

    if (videoContainer) {
        playBtn.addEventListener('click', function() {
            videoOverlay.style.display = 'none';
            video.play();
        });

        video.addEventListener('pause', function() {
            videoOverlay.style.display = 'flex';
        });

        // Video time controls
        const controlBtns = document.querySelectorAll('.control-btn');
        controlBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const timeStr = this.getAttribute('data-time');
                const [minutes, seconds] = timeStr.split(':').map(Number);
                video.currentTime = minutes * 60 + seconds;

                if (video.paused) {
                    videoOverlay.style.display = 'none';
                    video.play();
                }
            });
        });
    }

    // Raqamlar animatsiyasi
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateNumbers() {
        statNumbers.forEach(statNumber => {
            const target = parseInt(statNumber.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(counter);
                    statNumber.textContent = target;
                } else {
                    statNumber.textContent = Math.floor(current);
                }
            }, 16);
        });
    }

    // Scroll animatsiyalari
    function checkScroll() {
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY || window.pageYOffset;

        // About section animatsiyasi
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const aboutPosition = aboutSection.getBoundingClientRect().top;
            if (aboutPosition < windowHeight - 100) {
                animateNumbers();
                window.removeEventListener('scroll', checkScroll);
            }
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Dastlabki tekshirish

    // Services tabs
    const tabBtns = document.querySelectorAll('.services-tabs .tab-btn');
    const tabContents = document.querySelectorAll('.services-tabs .tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Initialize doctors slider
    if (document.querySelector('.doctors-slider')) {
        const doctorsSlider = new Swiper('.doctors-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                }
            }
        });
    }

    // Initialize testimonials slider
    if (document.querySelector('.testimonials-slider')) {
        const testimonialsSlider = new Swiper('.testimonials-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                }
            }
        });
    }

    // FAQ accordion
    const accordionBtns = document.querySelectorAll('.accordion-btn');

    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;

            if (this.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }

            // Close other accordion items
            accordionBtns.forEach(otherBtn => {
                if (otherBtn !== this && otherBtn.classList.contains('active')) {
                    otherBtn.classList.remove('active');
                    otherBtn.nextElementSibling.style.maxHeight = '0';
                }
            });
        });
    });

    // Initialize Fancybox for gallery
    if (typeof Fancybox !== 'undefined') {
        Fancybox.bind("[data-fancybox]", {
            // Your custom options
        });
    }

    // Form submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Show success message
            const formData = new FormData(this);
            console.log('Form submitted:', Object.fromEntries(formData));

            // You can add AJAX form submission here
            // For demo purposes, we'll just show an alert
            this.reset();
        });
    });

    // Ripple effect for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });

    // 3D hover effect for cards
    const cards = document.querySelectorAll('.card, .service-card, .doctor-card, .testimonial-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            this.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        card.addEventListener('mouseenter', function() {
            this.style.transition = 'none';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.5s ease';
            this.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    });

    // Parallax effect for sections
    const parallaxSections = document.querySelectorAll('.hero, .video-section, .appointment-section');
    parallaxSections.forEach(section => {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const sectionPosition = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition > sectionPosition - window.innerHeight && scrollPosition < sectionPosition + sectionHeight) {
                const speed = section.dataset.speed || 0.5;
                const yPos = -(scrollPosition - sectionPosition) * speed;
                section.style.backgroundPositionY = `${yPos}px`;
            }
        });
    });

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    function animateOnScroll() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Interactive background for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            hero.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
        });
    }

    // Dynamic year in footer
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }

    // Cookie consent banner
    if (!localStorage.getItem('cookieConsent')) {
        const cookieBanner = document.createElement('div');
        cookieBanner.className = 'cookie-banner';
        cookieBanner.innerHTML = `
            <p>Biz sizning tajribangizni yaxshilash uchun cookie-fayllardan foydalanamiz. Ushbu veb-saytdan foydalanishda siz <a href="#">Cookie siyosati</a>ga rozilik bildirasiz.</p>
            <button class="btn btn-small" id="acceptCookies">Roziman</button>
        `;
        document.body.appendChild(cookieBanner);

        document.getElementById('acceptCookies').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'true');
            cookieBanner.style.opacity = '0';
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 300);
        });
    }

    // Final initialization
    console.log('9D Tibbiy Markaz veb-sayti yuklandi');
});