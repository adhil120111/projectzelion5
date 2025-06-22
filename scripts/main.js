// Main JavaScript functionality
(function() {
    'use strict';

    // DOM Elements
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const menuIcon = document.getElementById('menu-icon');
    const subscriptionForm = document.getElementById('subscription-form');
    const emailInput = document.getElementById('email-input');
    const submitButton = document.getElementById('submit-button');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    const selectedOfferDisplay = document.getElementById('selected-offer');
    const selectedOfferText = document.getElementById('selected-offer-text');

    // State
    let currentSlide = 0;
    let isSubmitting = false;
    let selectedOffer = '';

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        initializeNavbar();
        initializeCarousel();
        initializeEmailForm();
        initializeSmoothScrolling();
        initializeIntersectionObserver();
    });

    // Navbar functionality
    function initializeNavbar() {
        // Scroll effect
        window.addEventListener('scroll', function() {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', function() {
                const isOpen = navLinks.classList.contains('open');
                
                if (isOpen) {
                    navLinks.classList.remove('open');
                    menuIcon.className = 'fas fa-bars';
                    menuToggle.setAttribute('aria-expanded', 'false');
                } else {
                    navLinks.classList.add('open');
                    menuIcon.className = 'fas fa-times';
                    menuToggle.setAttribute('aria-expanded', 'true');
                }
            });

            // Close mobile menu when clicking on links
            navLinks.addEventListener('click', function(e) {
                if (e.target.tagName === 'A') {
                    navLinks.classList.remove('open');
                    menuIcon.className = 'fas fa-bars';
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    // Carousel functionality
    function initializeCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        
        if (slides.length === 0) return;

        // Auto-play carousel
        setInterval(function() {
            nextSlide();
        }, 5000);

        function updateCarousel() {
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentSlide);
            });

            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
                indicator.setAttribute('aria-selected', index === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateCarousel();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateCarousel();
        }

        // Global functions for button clicks
        window.changeSlide = function(direction) {
            if (direction > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        };

        window.goToSlide = function(index) {
            currentSlide = index;
            updateCarousel();
        };
    }

    // Email form functionality
    function initializeEmailForm() {
        if (!subscriptionForm) return;

        subscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleEmailSubmission();
        });
    }

    function handleEmailSubmission() {
        if (isSubmitting) return;

        const email = emailInput.value.trim();
        
        // Validation
        if (!email) {
            showError('Please enter your email address');
            return;
        }

        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        // Start submission
        isSubmitting = true;
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        hideError();

        // Simulate API call (replace with actual implementation)
        setTimeout(function() {
            // Success
            showSuccess();
            resetForm();
            isSubmitting = false;
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i>';
        }, 2000);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        errorMessage.setAttribute('aria-live', 'polite');
    }

    function hideError() {
        errorMessage.style.display = 'none';
    }

    function showSuccess() {
        subscriptionForm.style.display = 'none';
        successMessage.style.display = 'block';
    }

    function resetForm() {
        emailInput.value = '';
        selectedOffer = '';
        selectedOfferDisplay.style.display = 'none';
    }

    // Smooth scrolling
    function initializeSmoothScrolling() {
        // Global scroll function
        window.scrollToSection = function(sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                const offsetTop = element.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        };

        // Handle all anchor links
        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                window.scrollToSection(targetId);
            }
        });
    }

    // Intersection Observer for animations
    function initializeIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements that should animate
        const animateElements = document.querySelectorAll(
            '.bento-card, .offer-card, .contact-card, .slide-content'
        );
        
        animateElements.forEach(function(el) {
            observer.observe(el);
        });
    }

    // Offer claim functionality
    window.claimOffer = function(offerName) {
        selectedOffer = offerName;
        selectedOfferText.textContent = `Selected: ${offerName}`;
        selectedOfferDisplay.style.display = 'flex';
        
        // Scroll to email form
        const emailForm = document.getElementById('email-subscription-form');
        if (emailForm) {
            emailForm.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Stepper functionality (placeholder)
    let currentStep = 2;
    
    window.nextStep = function() {
        if (currentStep < 3) {
            currentStep++;
            updateStepperUI();
        }
    };

    window.previousStep = function() {
        if (currentStep > 0) {
            currentStep--;
            updateStepperUI();
        }
    };

    function updateStepperUI() {
        const steps = document.querySelectorAll('.step-circle');
        const stepTitles = document.querySelectorAll('.step-title');
        const connectors = document.querySelectorAll('.step-connector');

        steps.forEach(function(step, index) {
            step.className = 'step-circle';
            if (index < currentStep) {
                step.classList.add('completed');
                step.innerHTML = '<i class="fas fa-check"></i>';
            } else if (index === currentStep) {
                step.classList.add('current');
            } else {
                step.classList.add('upcoming');
            }
        });

        stepTitles.forEach(function(title, index) {
            title.className = 'step-title';
            if (index < currentStep) {
                title.classList.add('completed');
            } else if (index === currentStep) {
                title.classList.add('current');
            } else {
                title.classList.add('upcoming');
            }
        });

        connectors.forEach(function(connector, index) {
            const progress = connector.querySelector('.connector-progress');
            if (progress) {
                if (index < currentStep) {
                    connector.classList.add('completed');
                    progress.style.height = '100%';
                } else {
                    connector.classList.remove('completed');
                    progress.style.height = '0%';
                }
            }
        });
    }

    // Performance optimizations
    let ticking = false;

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }

    function updateScrollEffects() {
        // Update scroll-based effects here
        ticking = false;
    }

    window.addEventListener('scroll', requestTick);

    // Error handling
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
    });

    // Service Worker registration (for PWA capabilities)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('SW registered: ', registration);
                })
                .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }

})();