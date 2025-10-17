// Intersection Observer for revealing elements on scroll
const revealElements = document.querySelectorAll('.service-item');

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
