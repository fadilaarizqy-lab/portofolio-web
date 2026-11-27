
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
                    'header nav a[href="#' + id + '"]'
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

    /* ANIMASI EDUCATION */
    ScrollReveal().reveal('.education-box', {
        origin: 'bottom',
        distance: '50px',
        duration: 1500,
        interval: 200
    });

    ScrollReveal().reveal('.education-icon', {
        origin: 'left',
        distance: '30px',
        duration: 1500,
        interval: 200
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


/* ===== ABOUT READ MORE ===== */
const aboutReadMore = document.querySelector('#about-read-more');
const aboutMoreInfo = document.querySelector('#about-more-info');

if (aboutReadMore && aboutMoreInfo) {
    aboutReadMore.addEventListener('click', function() {

        const isHidden = aboutMoreInfo.hidden;

        aboutMoreInfo.hidden = !isHidden;

        if (isHidden) {
            this.textContent = 'Read Less';

            aboutMoreInfo.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        } else {
            this.textContent = 'Read More';
        }

    });
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
            if (formStatus) {
                formStatus.textContent =
                    'Layanan email belum berhasil dimuat. Silakan coba kembali.';
                formStatus.className = 'error';
            }
            return;
        }

        if (
            EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY' ||
            EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' ||
            EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID'
        ) {
            if (formStatus) {
                formStatus.textContent =
                    'Konfigurasi EmailJS belum diatur.';
                formStatus.className = 'error';
            }
            return;
        }

        sendButton.disabled = true;
        sendButton.textContent = 'Sending...';

        if (formStatus) {
            formStatus.textContent = '';
            formStatus.className = '';
        }

        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                contactForm
            );

            if (formStatus) {
                formStatus.textContent =
                    'Pesan berhasil dikirim! Terima kasih sudah menghubungi saya.';
                formStatus.className = 'success';
            }

            contactForm.reset();

        } catch (error) {
            console.error('EmailJS Error:', error);

            if (formStatus) {
                formStatus.textContent =
                    'Pesan gagal dikirim. Silakan periksa koneksi atau coba kembali.';
                formStatus.className = 'error';
            }

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


/* ===== DATA KARYA SERVICES ===== */
const serviceData = {

    typography: {
        title: 'Typography Designer',
        description: 'Berikut adalah kumpulan karya tipografi yang telah saya buat.',
        works: [
            // Tambahkan karya PNG tipografi kamu di sini
        ]
    },

    graphic: {
        title: 'Graphic Designer',
        description: 'Berikut adalah kumpulan hasil karya desain grafis yang telah saya buat.',
        works: [
            // Tambahkan karya PNG desain grafis kamu di sini
        ]
    }

};


/* ===== DISPLAY GALLERY ===== */
function displayGallery(works) {

    if (!galleryContainer) return;

    if (!works || works.length === 0) {
        galleryContainer.innerHTML = `
            <div class="gallery-empty">
                <i class='bx bx-folder-open'></i>
                <h3>My Works</h3>
                <p>Karya akan segera ditampilkan di sini.</p>
            </div>
        `;
        return;
    }

    galleryContainer.innerHTML = '';

    works.forEach(work => {

        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';

        const image = document.createElement('img');
        image.src = work.image;
        image.alt = work.title || 'My Design';
        image.loading = 'lazy';

        const title = document.createElement('h3');
        title.textContent = work.title || 'My Work';

        const imageLink = document.createElement('a');
        imageLink.href = work.image;
        imageLink.target = '_blank';
        imageLink.rel = 'noopener noreferrer';
        imageLink.appendChild(image);

        galleryItem.appendChild(imageLink);
        galleryItem.appendChild(title);

        galleryContainer.appendChild(galleryItem);

    });
}


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

        displayGallery(selectedService.works);

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


/* ===== PORTFOLIO DETAIL DATA ===== */
const portfolioData = {

    wordpress: {
        title: 'WordPress',
        description: 'WordPress merupakan platform yang digunakan untuk membuat dan mengelola website. Dalam proyek ini, saya mempelajari materi perakitan PC maupun komputer sebagai bagian dari proses pembelajaran.',
        extra: 'Hal yang dipelajari: mengenal komponen komputer dan proses perakitan PC.',
        link: 'https://fadilla576.wordpress.com'
    },

    colab: {
        title: 'Google Colab',
        description: 'Google Colab merupakan platform online yang saya gunakan untuk belajar dan menjalankan coding Python. Melalui proyek ini, saya mencoba membuat program sederhana sekaligus memahami dasar pemrograman Python.',
        extra: 'Hal yang dipelajari: dasar pemrograman Python dan menjalankan kode secara online.',
        link: 'https://colab.research.google.com/drive/1eYmKiCG1F3gE03JYP0GcZStVjzBCPuou'
    },

    kangkung: {
        title: 'Budi Daya Kangkung dan Ketahanan Pangan',
        description: 'Proyek pembelajaran mengenai budi daya tanaman kangkung, mulai dari mengenal proses penanaman hingga memahami pentingnya ketahanan pangan.',
        extra: 'Hal yang dipelajari: proses budi daya kangkung dan pentingnya menjaga ketahanan pangan.',
        link: ''
    }

};


/* ===== PORTFOLIO DETAIL ELEMENTS ===== */
const portfolioButtons = document.querySelectorAll('.portfolio-detail-btn');
const portfolioList = document.querySelector('#portfolio-list');
const portfolioDetail = document.querySelector('#portfolio-detail');
const portfolioBack = document.querySelector('#portfolio-back');

const detailImage = document.querySelector('#detail-image');
const detailTitle = document.querySelector('#detail-title');
const detailDescription = document.querySelector('#detail-description');
const detailExtra = document.querySelector('#detail-extra');
const detailLink = document.querySelector('#detail-link');


/* ===== OPEN PORTFOLIO DETAIL ===== */
portfolioButtons.forEach(button => {

    button.addEventListener('click', function() {

        const projectName = this.dataset.project;
        const project = portfolioData[projectName];

        if (!project || !portfolioList || !portfolioDetail) {
            return;
        }

        const projectBox = this.closest('.portfolio-box');
        const projectImage = projectBox
            ? projectBox.querySelector('img')
            : null;

        if (projectImage && detailImage) {
            detailImage.src = projectImage.src;
            detailImage.alt = project.title;
        }

        if (detailTitle) {
            detailTitle.textContent = project.title;
        }

        if (detailDescription) {
            detailDescription.textContent = project.description;
        }

        if (detailExtra) {
            detailExtra.textContent = project.extra;
        }

        if (detailLink) {
            if (project.link) {
                detailLink.href = project.link;
                detailLink.style.display = 'inline-flex';
            } else {
                detailLink.style.display = 'none';
            }
        }

        portfolioList.hidden = true;
        portfolioDetail.hidden = false;

        history.replaceState(null, '', '#portfolio');

        portfolioDetail.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

    });

});


/* ===== BACK TO PORTFOLIO ===== */
if (portfolioBack) {

    portfolioBack.addEventListener('click', function() {

        if (!portfolioList || !portfolioDetail) {
            return;
        }

        portfolioDetail.hidden = true;
        portfolioList.hidden = false;

        history.replaceState(null, '', '#portfolio');

        portfolioList.scrollIntoView({
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
    
