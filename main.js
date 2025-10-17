// Typing animation for hero text
document.addEventListener('DOMContentLoaded', function() {
    new Typed('#typed-text', {
        strings: ['AI Solutions.', 'Data Science.', 'Automation.', 'Innovation.'],
        typeSpeed: 70, // Slower typing speed
        backSpeed: 30,
        loop: true,
        startDelay: 500,
        backDelay: 2000,
    });
});

// Intersection Observer for revealing elements on scroll
const revealElements = document.querySelectorAll('.service-item, .reason, .mission-vision, .contact-grid');

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
