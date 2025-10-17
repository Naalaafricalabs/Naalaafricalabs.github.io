/* Particles.js implementation */
window.onload = function() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  document.querySelector('.hero').prepend(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = document.querySelector('.hero').offsetHeight;

  let particles = [];
  const particleCount = 100;

  const primaryColor = '#0056b3';
  const secondaryColor = '#ff6600';

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1 + 1; // Start with a small size
      this.maxSize = Math.random() * 3 + 2; // Max size for this particle
      this.growing = true; // Direction flag
      this.speedX = Math.random() * 2 - 1;
      this.speedY = Math.random() * 2 - 1;
      this.color = Math.random() > 0.5 ? primaryColor : secondaryColor;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Pulsing effect logic
      if (this.growing) {
        this.size += 0.05;
        if (this.size >= this.maxSize) {
          this.growing = false;
        }
      } else {
        this.size -= 0.05;
        if (this.size <= 0.2) {
          this.growing = true;
        }
      }

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(animate);
  }

  init();
  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector('.hero').offsetHeight;
    particles = [];
    init();
  });
};
