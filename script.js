// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-theme');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');

    if (body.classList.contains('light-theme')) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Simple Floating Particles Background
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.3 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        const isLightTheme = body.classList.contains('light-theme');
        // Use slightly darker particles for light theme, lighter for dark theme
        const particleColor = isLightTheme
            ? `rgba(74, 144, 226, ${this.opacity * 0.8})`
            : `rgba(100, 181, 246, ${this.opacity})`;

        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

let particlesArray = [];

function initParticles() {
    particlesArray = [];
    const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    // Simple gradient background - adapts to theme
    const isLightTheme = body.classList.contains('light-theme');
    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

    if (isLightTheme) {
        bgGradient.addColorStop(0, '#ffffff');
        bgGradient.addColorStop(1, '#f5f5f5');
    } else {
        bgGradient.addColorStop(0, '#000000');
        bgGradient.addColorStop(1, '#0a0a0a');
    }

    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw and update particles
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }

    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Scroll Animations - Fade in elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for fade-in animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Skill bars animation
const skillsSection = document.querySelector('#skills');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            const skillBars = document.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            });
            skillsAnimated = true;
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Navbar background on scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = '#4A90E2';
        navbar.style.boxShadow = '0 10px 40px rgba(74, 144, 226, 0.4)';
    } else {
        navbar.style.background = '#4A90E2';
        navbar.style.boxShadow = '0 10px 40px rgba(74, 144, 226, 0.3)';
    }

    lastScroll = currentScroll;
});

// Form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Here you would typically send this data to a server
        // For now, we'll just show an alert
        alert(`Thank you, ${name}! Your message has been received. I'll get back to you at ${email} soon.`);

        // Reset form
        contactForm.reset();
    });
}

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typing effect for the greeting
const greeting = document.querySelector('.greeting');
if (greeting) {
    const text = greeting.textContent;
    greeting.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            greeting.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    setTimeout(typeWriter, 500);
}

// Project cards animation
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cardObserver.observe(card);
});

// Dynamic year in footer
const footerText = document.querySelector('.footer-content p');
if (footerText) {
    const currentYear = new Date().getFullYear();
    footerText.textContent = footerText.textContent.replace('2024', currentYear);
}

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
    pointer-events: none;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.pointerEvents = 'auto';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.pointerEvents = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px) scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0) scale(1)';
});

// WAT Clock (West Africa Time - UTC+1)
function updateWATClock() {
    const watTimeElement = document.getElementById('watTime');

    if (watTimeElement) {
        const now = new Date();

        // Get UTC time and add 1 hour for WAT (UTC+1)
        const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
        const watTime = new Date(utcTime + (3600000 * 1)); // Add 1 hour for WAT

        // Format time
        let hours = watTime.getHours();
        const minutes = String(watTime.getMinutes()).padStart(2, '0');
        const seconds = String(watTime.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // Convert 0 to 12
        hours = String(hours).padStart(2, '0');

        watTimeElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    }
}

// Update clock immediately and then every second
updateWATClock();
setInterval(updateWATClock, 1000);
