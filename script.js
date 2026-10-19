
/* ===== MENU ICON ===== */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };
}

/* ===== ACTIVE NAVBAR & STICKY HEADER ===== */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let header = document.querySelector('header');

function updatePage() {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');

                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });

    if (header) {
        header.classList.toggle('sticky', top > 100);
    }

    if (menuIcon && navbar) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
}

window.addEventListener('scroll', updatePage);
updatePage();

/* ===== SCROLL REVEAL ANIMATION ===== */
if (typeof ScrollReveal === 'function') {
    ScrollReveal({
        distance: '80px',
        duration: 2000,
        delay: 200
    });

    ScrollReveal().reveal(
        '.home-content, .heading',
        { origin: 'top' }
    );

    ScrollReveal().reveal(
        '.home-img, .services-container, .portfolio-box, .contact form',
        { origin: 'bottom' }
    );

    ScrollReveal().reveal(
        '.home-content h1, .about-img',
        { origin: 'left' }
    );

    ScrollReveal().reveal(
        '.home-content p, .about-content',
        { origin: 'right' }
    );
}

/* ===== TYPING TEXT ===== */
if (typeof Typed === 'function' &&
    document.querySelector('.multiple-text')) {

    const typed = new Typed('.multiple-text', {
        strings: [
            'Siswa SMK Krian 1 Sidoarjo',
            'Siswa X RPL 1'
        ],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
}

/* ===== CONTACT FORM VALIDATION ===== */
let contactForm = document.querySelector('.contact form');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        alert('Terima kasih! Pesan kamu berhasil divalidasi.');

        contactForm.reset();
    });
        }

