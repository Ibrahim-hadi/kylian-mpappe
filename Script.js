// Typing Effect
const words = ["HADI.", "A PROGRAMMER.", "A WEB DESIGNER.", "A GAME DEVELOPER.", "A STUDENT."];
let idx = 0;
let charIdx = 0;
let isDeleting = false;
const changingText = document.getElementById('changing-textB');
const cursor = document.querySelector('.cursor');

function typeEffect() {
    const currentWord = words[idx];

    if (isDeleting) {
        changingText.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
    } else {
        changingText.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
    }

    if (!isDeleting && charIdx === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        idx = (idx + 1) % words.length;
        setTimeout(typeEffect, 300);
    } else {
        const speed = isDeleting ? 50 : 150;
        setTimeout(typeEffect, speed);
    }
}

// Start typing effect after 1 second
setTimeout(typeEffect, 1000);

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Simple form validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === '' || email === '' || message === '') {
        alert('Please fill in all required fields.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
});

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Active Link Highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navlink a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Settings Panel
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const closeSettings = document.getElementById('closeSettings');

settingsBtn.addEventListener('click', () => {
    settingsPanel.classList.toggle('open');
});

closeSettings.addEventListener('click', () => {
    settingsPanel.classList.remove('open');
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('change', function () {
    document.body.classList.toggle('dark-theme', this.checked);
    // Save to localStorage
    localStorage.setItem('darkMode', this.checked);
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-theme');
    darkModeToggle.checked = true;
}

// Color Theme Selection
const themeOptions = document.querySelectorAll('.theme-option');

themeOptions.forEach(option => {
    option.addEventListener('click', function () {
        // Remove active class from all
        themeOptions.forEach(opt => opt.classList.remove('active'));
        // Add active class to clicked
        this.classList.add('active');

        const theme = this.getAttribute('data-theme');

        // Update CSS variables based on theme
        switch (theme) {
            case '1':
                document.documentElement.style.setProperty('--primary', '#2563eb');
                document.documentElement.style.setProperty('--secondary', '#8b5cf6');
                document.documentElement.style.setProperty('--accent', '#ec4899');
                break;
            case '2':
                document.documentElement.style.setProperty('--primary', '#10b981');
                document.documentElement.style.setProperty('--secondary', '#06b6d4');
                document.documentElement.style.setProperty('--accent', '#f59e0b');
                break;
            case '3':
                document.documentElement.style.setProperty('--primary', '#f59e0b');
                document.documentElement.style.setProperty('--secondary', '#ef4444');
                document.documentElement.style.setProperty('--accent', '#8b5cf6');
                break;
            case '4':
                document.documentElement.style.setProperty('--primary', '#8b5cf6');
                document.documentElement.style.setProperty('--secondary', '#ec4899');
                document.documentElement.style.setProperty('--accent', '#fbbf24');
                break;
        }

        // Save theme preference
        localStorage.setItem('theme', theme);
    });
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    const themeToSelect = document.querySelector(`.theme-option[data-theme="${savedTheme}"]`);
    if (themeToSelect) {
        themeOptions.forEach(opt => opt.classList.remove('active'));
        themeToSelect.classList.add('active');
    }
}

// Font Family Selection
const fontOptions = document.querySelectorAll('.font-option');

fontOptions.forEach(option => {
    option.addEventListener('click', function () {
        // Remove active class from all
        fontOptions.forEach(opt => opt.classList.remove('active'));
        // Add active class to clicked
        this.classList.add('active');

        const font = this.getAttribute('data-font');
        let fontFamily = '';

        switch (font) {
            case 'default':
                fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
                break;
            case 'roboto':
                fontFamily = "'Roboto', sans-serif";
                document.head.innerHTML += '<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">';
                break;
            case 'poppins':
                fontFamily = "'Poppins', sans-serif";
                document.head.innerHTML += '<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet">';
                break;
            case 'montserrat':
                fontFamily = "'Montserrat', sans-serif";
                document.head.innerHTML += '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet">';
                break;
            case 'open-sans':
                fontFamily = "'Open Sans', sans-serif";
                document.head.innerHTML += '<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">';
                break;
        }

        document.documentElement.style.setProperty('--font-family', fontFamily);
        localStorage.setItem('font', font);
    });
});

// Load saved font
const savedFont = localStorage.getItem('font');
if (savedFont) {
    const fontToSelect = document.querySelector(`.font-option[data-font="${savedFont}"]`);
    if (fontToSelect) {
        fontOptions.forEach(opt => opt.classList.remove('active'));
        fontToSelect.classList.add('active');
    }
}

// Hero Background Selection
const bgOptions = document.querySelectorAll('.bg-option');

bgOptions.forEach(option => {
    option.addEventListener('click', function () {
        // Remove active class from all
        bgOptions.forEach(opt => opt.classList.remove('active'));
        // Add active class to clicked
        this.classList.add('active');

        const bg = this.getAttribute('data-bg');
        let gradient = '';

        switch (bg) {
            case '1':
                gradient = 'linear-gradient(135deg, #1e3a8a, #4c1d95)';
                break;
            case '2':
                gradient = 'linear-gradient(135deg, #0f766e, #0e7490)';
                break;
            case '3':
                gradient = 'linear-gradient(135deg, #7e22ce, #c026d3)';
                break;
            case '4':
                gradient = 'linear-gradient(135deg, #b91c1c, #c2410c)';
                break;
        }

        document.documentElement.style.setProperty('--hero-bg', gradient);
        localStorage.setItem('heroBg', bg);
    });
});

// Load saved background
const savedBg = localStorage.getItem('heroBg');
if (savedBg) {
    const bgToSelect = document.querySelector(`.bg-option[data-bg="${savedBg}"]`);
    if (bgToSelect) {
        bgOptions.forEach(opt => opt.classList.remove('active'));
        bgToSelect.classList.add('active');
    }
}

(function () {
    emailjs.init('HGnmW0Iaq-_wgg5IY'); // Replace with your EmailJS Public Key
})();

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    emailjs.sendForm('service_mrklqo1', 'template_usg2vzp', this)
        .then(function (response) {
            alert('Message sent successfully!');
            document.getElementById('contactForm').reset();
        }, function (error) {
            alert('Failed to send message. Please try again.');
            console.error('EmailJS error:', error);
        });
});