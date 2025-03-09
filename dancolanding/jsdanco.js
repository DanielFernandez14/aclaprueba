document.addEventListener("DOMContentLoaded", function () {
  // ===============================
  // ANIMACIÓN DE PARTÍCULAS EN EL FONDO
  // ===============================
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particlesArray = [];
  const numberOfParticles = 150;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 4 + 1;
      this.speedX = Math.random() * 1.5 - 0.75;
      this.speedY = Math.random() * 1.5 - 0.75;
      this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
      if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
      ctx.fill();
    }
  }

  function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  });

  initParticles();
  animateParticles();

  // ==================================================
  // INTERACCIÓN DE BURBUJAS
  // ==================================================
  const techCards = document.querySelectorAll(".tech-card");
  const bubbles = [];
  const repulsionDistance = 100; // Distancia en la que el mouse afecta a las burbujas
  const maxRepulsion = 5; // Fuerza máxima de repulsión

  // Inicializar posiciones y velocidades de las burbujas
  techCards.forEach((card) => {
    const x = Math.random() * (window.innerWidth - card.offsetWidth);
    const y = Math.random() * (window.innerHeight - card.offsetHeight);
    card.style.left = `${x}px`;
    card.style.top = `${y}px`;
    const bubble = {
      el: card,
      vx: (Math.random() - 0.5) * 2, // Velocidad inicial en X
      vy: (Math.random() - 0.5) * 2, // Velocidad inicial en Y
    };
    bubbles.push(bubble);

    // Efecto de "pop" al hacer clic
    card.addEventListener("click", () => {
      card.classList.add("pop");
      setTimeout(() => {
        // Reposicionar la burbuja
        const newX = Math.random() * (window.innerWidth - card.offsetWidth);
        const newY = Math.random() * (window.innerHeight - card.offsetHeight);
        card.style.left = `${newX}px`;
        card.style.top = `${newY}px`;
        // Reiniciar velocidad
        bubble.vx = (Math.random() - 0.5) * 2;
        bubble.vy = (Math.random() - 0.5) * 2;
        // Quitar la clase "pop"
        card.classList.remove("pop");
      }, 300); // Tiempo igual a la duración de la transición
    });
  });

  // Rastrear posición del mouse
  let mouseX = 0;
  let mouseY = 0;
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Bucle de animación para mover las burbujas
  function animateBubbles() {
    bubbles.forEach((bubble) => {
      const card = bubble.el;
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2; // Centro X de la burbuja
      const cy = rect.top + rect.height / 2; // Centro Y de la burbuja
      const dx = mouseX - cx; // Distancia en X al mouse
      const dy = mouseY - cy; // Distancia en Y al mouse
      const distance = Math.sqrt(dx * dx + dy * dy); // Distancia total

      // Aplicar repulsión si el mouse está cerca
      if (distance < repulsionDistance) {
        const angle = Math.atan2(dy, dx);
        const force = (1 - distance / repulsionDistance) * maxRepulsion;
        bubble.vx -= Math.cos(angle) * force;
        bubble.vy -= Math.sin(angle) * force;
      }

      // Actualizar posición
      let left = parseFloat(card.style.left) || 0;
      let top = parseFloat(card.style.top) || 0;
      left += bubble.vx;
      top += bubble.vy;

      // Rebote en los bordes
      if (left < 0 || left > window.innerWidth - rect.width) {
        bubble.vx = -bubble.vx;
        left = Math.max(0, Math.min(left, window.innerWidth - rect.width));
      }
      if (top < 0 || top > window.innerHeight - rect.height) {
        bubble.vy = -bubble.vy;
        top = Math.max(0, Math.min(top, window.innerHeight - rect.height));
      }

      card.style.left = `${left}px`;
      card.style.top = `${top}px`;

      // Aplicar fricción para que el movimiento se desacelere
      bubble.vx *= 0.98;
      bubble.vy *= 0.98;
    });
    requestAnimationFrame(animateBubbles);
  }
  animateBubbles();
});