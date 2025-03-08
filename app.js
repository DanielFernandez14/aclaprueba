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

    // Efecto typewriter
    const text = "A.C.L.A";
    const textContainer = document.getElementById('typewriter-text');
    let index = 0;
    let forward = true;

    function typeWriter() {
        if (forward) {
            if (index < text.length) {
                textContainer.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 150);
            } else {
                setTimeout(() => {
                    forward = false;
                    typeWriter();
                }, 2000);
            }
        } else {
            if (index > 0) {
                textContainer.textContent = text.substring(0, index - 1);
                index--;
                setTimeout(typeWriter, 100);
            } else {
                forward = true;
                setTimeout(typeWriter, 500);
            }
        }
    }
    
    typeWriter();
});