document.addEventListener('DOMContentLoaded', () => {
    // Menú hamburguesa
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
    });

    // Efecto Typewriter para "Acla"
    const typewriterElement = document.getElementById('typewriter');
    const text = "A.C.L.A";
    let index = 0;

    function typeWriter() {
    if (index < text.length) {
        typewriterElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 150);
    } else {
        // Pausa antes de reiniciar
        setTimeout(() => {
        typewriterElement.textContent = "";
        index = 0;
        typeWriter();
        }, 3000);
    }
    }
    typeWriter();
});
