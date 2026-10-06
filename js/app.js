// Menú hamburguesa
const menuToggle = document.querySelector('#menu-toggle');
const nav = document.querySelector('#nav');

menuToggle.addEventListener('click', () => {
    const abierto = nav.classList.toggle('abierto');
    menuToggle.setAttribute('aria-expanded', abierto);
});

// Cerrar menú al hacer clic en un enlace
nav.querySelectorAll('a').forEach(enlace => {
    enlace.addEventListener('click', () => {
        nav.classList.remove('abierto');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Dark mode
const darkToggle = document.querySelector('#dark-mode');

// Detectar preferencia del sistema
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
}

darkToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme',
        document.documentElement.classList.contains('dark') ? 'dark' : 'light');
});

// Restaurar preferencia guardada
const temaGuardado = localStorage.getItem('theme');
if (temaGuardado === 'dark') {
    document.documentElement.classList.add('dark');
}

// Smooth scroll (nativo con CSS, pero reforzamos)
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', (e) => {
        e.preventDefault();
        const destino = document.querySelector(enlace.getAttribute('href'));
        if (destino) {
            destino.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Formulario de contacto con validación
const formulario = document.querySelector('#formulario');
const feedback = document.querySelector('#feedback-form');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.querySelector('#nombre').value.trim();
    const email = document.querySelector('#email').value.trim();
    const mensaje = document.querySelector('#mensaje').value.trim();

    if (!nombre || !email || !mensaje) {
        feedback.textContent = 'Por favor completa todos los campos.';
        feedback.className = 'feedback error';
        return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
        feedback.textContent = 'Escribe un correo válido.';
        feedback.className = 'feedback error';
        return;
    }

    feedback.textContent = `¡Gracias ${nombre}! Validación completada. Este es un formulario de demostración.`;
    feedback.className = 'feedback ok';
    formulario.reset();
});
