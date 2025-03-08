// script.js

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
    const text = "A.C.L.A"; // Texto a animar
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typewriterElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 150); // Velocidad de escritura
        } else {
            // Agregar ícono de avioncito al final
            const icon = document.createElement('i');
            icon.classList.add('bx', 'bxs-plane-take-off'); // Ícono de avión despegando
            typewriterElement.appendChild(icon);

            // Pausa antes de reiniciar
            setTimeout(() => {
                typewriterElement.textContent = ""; // Limpiar texto e ícono
                index = 0;
                typeWriter(); // Reiniciar animación
            }, 3000); // Pausa de 3 segundos
        }
    }

    // Iniciar el efecto
    typeWriter();
});