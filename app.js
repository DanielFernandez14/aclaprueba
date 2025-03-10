document.addEventListener('DOMContentLoaded', () => {
    // Menú hamburguesa (si lo necesitas en el futuro)
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Efecto Typewriter mejorado
    const typewriterElement = document.getElementById('typewriter');

    function getTypewriterText() {
        // Usamos matchMedia para detectar pantallas menores o iguales a 1024px (mobile y tablet)
        return window.matchMedia('(max-width: 1024px)').matches ? "Aeroclub Lago Argentino" : "A.C.L.A";
    }

    function typeWriter() {
        const text = getTypewriterText();
        let index = 0;
        typewriterElement.textContent = ""; // Limpiar antes de iniciar la animación

        function write() {
            if (index < text.length) {
                typewriterElement.textContent += text.charAt(index);
                index++;
                setTimeout(write, 150); // Velocidad de escritura
            } else {
                // Agregar ícono de avioncito al final
                const icon = document.createElement('i');
                icon.classList.add(''); // Ícono de avión despegando
                typewriterElement.appendChild(icon);

                // Pausa antes de reiniciar
                setTimeout(() => {
                    typeWriter(); // Reiniciar animación
                }, 3000); // Pausa de 3 segundos
            }
        }
        write();
    }

    // Iniciar el efecto
    typeWriter();

    // Intersection Observer para las secciones con clase reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => observer.observe(reveal));
});
