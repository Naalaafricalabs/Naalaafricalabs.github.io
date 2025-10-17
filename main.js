
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


// Intersection Observer for revealing elements on scroll
const revealElements = document.querySelectorAll('section, .section-divider, .service-item, .reason, .mission-vision, .contact-grid, .about-item');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1 // Trigger when 10% of the element is visible
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('nav ul a');

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    });
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

// Back to top button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Preloader
const preloader = document.querySelector('.preloader');

window.addEventListener('load', () => {
    preloader.style.display = 'none';
});

// Contact form validation
const contactForm = document.querySelector('.contact-form form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('#name');
    const email = contactForm.querySelector('#email');
    const message = contactForm.querySelector('#message');

    let isValid = true;

    if (name.value.trim() === '') {
        isValid = false;
        showError(name, 'Name is required');
    } else {
        hideError(name);
    }

    if (email.value.trim() === '') {
        isValid = false;
        showError(email, 'Email is required');
    } else if (!isValidEmail(email.value)) {
        isValid = false;
        showError(email, 'Please enter a valid email');
    } else {
        hideError(email);
    }

    if (message.value.trim() === '') {
        isValid = false;
        showError(message, 'Message is required');
    } else {
        hideError(message);
    }

    if (isValid) {
        // Here you would typically send the form data to a server
        alert('Form submitted successfully!');
        contactForm.reset();
    }
});

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');

    if (error) {
        error.textContent = message;
    } else {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        formGroup.appendChild(errorElement);
    }
}

function hideError(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');

    if (error) {
        error.remove();
    }
}

function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
