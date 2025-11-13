
// Typing animation for hero text
document.addEventListener('DOMContentLoaded', function() {
    new Typed('#typed-text', {
        strings: ['innovation.', 'efficiency.', 'growth.'],
        typeSpeed: 70, // Slower typing speed
        backSpeed: 30,
        loop: true,
        startDelay: 500,
        backDelay: 2000,
    });
});


// Intersection Observer for revealing elements on scroll with enhanced animations
const revealElements = document.querySelectorAll('section, .service-card, .reason, .mission-vision, .contact-grid, .about-item, .process-step, .industry-card');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add staggered animations for grid items
            if (entry.target.classList.contains('service-grid') || entry.target.classList.contains('reasons-grid')) {
                const childItems = entry.target.querySelectorAll('.service-card, .reason');
                childItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 150 * index); // Stagger the animation
                });
            }
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15 // Trigger when 15% of the element is visible
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add subtle parallax effect to hero content and other elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-content');
    
    if (parallax && scrolled < window.innerHeight) {
        const speed = scrolled * 0.3;
        parallax.style.transform = `translateY(${speed}px)`;
    }
    
    // Parallax for section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        const rect = header.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (window.innerHeight - rect.top) * 0.05;
            header.style.transform = `translateY(${-offset}px)`;
        }
    });
});

// Enhanced service card interactions
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
    });
});

// Add animated counters for stats
const animateStatCounters = () => {
    const statElements = document.querySelectorAll('.stat-number');
    statElements.forEach(stat => {
        const target = parseInt(stat.textContent);
        if (!isNaN(target)) {
            const increment = target / 50;
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + (target === 98 ? '%' : (target < 10 ? '+' : ''));
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + (target === 98 ? '%' : (target < 10 ? '+' : ''));
                }
            }, 20);
        }
    });
};

// Trigger stat counter animation when stats section comes into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStatCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Enhanced scroll to top button
const backToTopButton = document.querySelector('.back-to-top');
if (backToTopButton) {
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('nav ul a');
const overlay = document.querySelector('.overlay');

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    });
});

overlay.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
});

// Header scroll effect
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Hero section scroll effect
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrollPercent = Math.min(window.scrollY / (hero.offsetHeight * 0.8), 1);
    hero.style.setProperty('--hero-scroll', scrollPercent);
});

// Back to top button - removed duplicate variable declaration
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Contact form submission with improved functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Clear previous errors
            clearErrors();
            
            let isValid = true;
            
            // Validate name
            if (!name.value.trim()) {
                showError('name-error', 'Name is required');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                showError('email-error', 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                showError('email-error', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                showError('message-error', 'Message is required');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message and reset form
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }
    
    // Function to show error
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    // Function to clear errors
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.style.display = 'none';
            element.textContent = '';
        });
    }
});

// Preloader with smooth fade out
const preloader = document.querySelector('.preloader');

window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 300);
});

// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items
            const wasActive = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });
});
