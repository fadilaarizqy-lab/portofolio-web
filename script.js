
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

                let activeLink = document.querySelector(
                    'header nav a[href*="' + id + '"]'
                );

                if (activeLink) {
                    activeLink.classList.add('active');
                }
            });
        }
    });

    if (header) {
        header.classList.toggle('sticky', top > 100);
    }

    if (navbar) {
        navbar.classList.remove('active');
    }

    if (menuIcon) {
        menuIcon.classList.remove('bx-x');
    }
}

window.addEventListener('scroll', updatePage);


/* ===== SCROLL REVEAL ===== */
if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal({
        distance: '80px',
        duration: 2000,
        delay: 200
    });

    ScrollReveal().reveal('.home-content, .heading', {
        origin: 'top'
    });

    ScrollReveal().reveal(
        '.home-img, .services-container, .portfolio-box, .achievement-box, .contact form',
        { origin: 'bottom' }
    );

    ScrollReveal().reveal('.home-content h1, .about-img', {
        origin: 'left'
    });

    ScrollReveal().reveal('.home-content p, .about-content', {
        origin: 'right'
    });
}


/* ===== TYPED JS ===== */
if (typeof Typed !== 'undefined') {
    const typed = document.querySelector('.multiple-text');

    if (typed) {
        new Typed('.multiple-text', {
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
}


/* ===== CONTACT FORM WITH EMAILJS ===== */

// KONFIGURASI EMAILJS
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

const contactForm = document.querySelector('#contact-form');
const sendButton = document.querySelector('#send-btn');
const formStatus = document.querySelector('#form-status');

// Inisialisasi EmailJS
if (typeof emailjs !== 'undefined') {
    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
    });
}

// Proses pengiriman pesan
if (contactForm) {

    contactForm.addEventListener('submit', async function(e) {

        e.preventDefault();

        if (typeof emailjs === 'undefined') {
            formStatus.textContent =
                'Layanan email belum berhasil dimuat. Silakan coba kembali.';

            formStatus.className = 'error';
            return;
        }

        if (
            EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY' ||
            EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' ||
            EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID'
        ) {
            formStatus.textContent =
                'Konfigurasi EmailJS belum diatur.';

            formStatus.className = 'error';
            return;
        }

        sendButton.disabled = true;
        sendButton.textContent = 'Sending...';

        formStatus.textContent = '';
        formStatus.className = '';

        try {

            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                contactForm
            );

            formStatus.textContent =
                'Pesan berhasil dikirim! Terima kasih sudah menghubungi saya.';

            formStatus.className = 'success';

            contactForm.reset();

        } catch (error) {

            console.error('EmailJS Error:', error);

            formStatus.textContent =
                'Pesan gagal dikirim. Silakan periksa koneksi atau coba kembali.';

            formStatus.className = 'error';

        } finally {

            sendButton.disabled = false;
            sendButton.textContent = 'Send Message';

        }

    });

}


/* ===== SERVICE GALLERY ===== */
const servicesSection = document.querySelector('.services');
const serviceButtons = document.querySelectorAll('.service-btn');
const serviceGallery = document.querySelector('.service-gallery');
const galleryTitle = document.querySelector('#gallery-title');
const galleryDescription = document.querySelector('#gallery-description');
const galleryContainer = document.querySelector('#gallery-container');
const backService = document.querySelector('#back-service');

const serviceData = {
    web: {
        title: 'Web Development',
        description: 'Berikut adalah kumpulan hasil karya website yang telah saya buat.'
    },

    uiux: {
        title: 'UI/UX Design',
        description: 'Berikut adalah kumpulan hasil rancangan tampilan antarmuka yang telah saya buat.'
    },

    graphic: {
        title: 'Graphic Design',
        description: 'Berikut adalah kumpulan hasil desain kreatif yang telah saya buat.'
    }
};


/* ===== OPEN SERVICE GALLERY ===== */
serviceButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();

        const category = this.dataset.category;
        const selectedService = serviceData[category];

        if (!selectedService || !servicesSection || !serviceGallery) {
            return;
        }

        galleryTitle.textContent = selectedService.title;
        galleryDescription.textContent = selectedService.description;

        galleryContainer.innerHTML = `
            <div class="gallery-empty">
                <i class='bx bx-folder-open'></i>
                <h3>My Works</h3>
                <p>Hasil karya akan ditampilkan di sini.</p>
            </div>
        `;

        servicesSection.classList.add('viewing-gallery');
        serviceGallery.classList.add('active');

        history.replaceState(null, '', '#service-gallery');

        serviceGallery.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});


/* ===== BACK TO SERVICES ===== */
if (backService) {
    backService.addEventListener('click', function() {
        if (!servicesSection || !serviceGallery) {
            return;
        }

        serviceGallery.classList.remove('active');
        servicesSection.classList.remove('viewing-gallery');

        history.replaceState(null, '', '#services');

        servicesSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}


/* ===== FLOATING SPARKLES ===== */
for (let i = 0; i < 22; i++) {
    let sparkle = document.createElement('div');

    sparkle.className = 'sparkle';
    sparkle.innerHTML = '✦';

    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.animationDuration = (5 + Math.random() * 10) + 's';
    sparkle.style.animationDelay = Math.random() * 5 + 's';
    sparkle.style.fontSize = (1 + Math.random() * 1.5) + 'rem';

    document.body.appendChild(sparkle);
}
