// Photo Modal Functions
function openPhotoModal() {
    document.getElementById('photoModal').classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closePhotoModal() {
    document.getElementById('photoModal').classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePhotoModal();
    }
});

// Typing animation for hero section (continuous loop)
const typingText = document.getElementById('typing-text');
const textToType = "welcome to my dev world!";
let charIndex = 0;

function typeText() {
    if (charIndex < textToType.length) {
        typingText.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100);
    } else {
        // Wait 2 seconds at the end, then restart
        setTimeout(() => {
            typingText.textContent = '';
            charIndex = 0;
            typeText();
        }, 2000);
    }
}

// Start typing animation after page loads
window.addEventListener('load', () => {
    setTimeout(typeText, 500);
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }

    // Active section detection
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
let isDark = localStorage.getItem('theme') === 'light' ? false : true;

// Set initial theme
if (isDark) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
    themeToggle.querySelector('i').classList.remove('fa-moon');
    themeToggle.querySelector('i').classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    const icon = themeToggle.querySelector('i');
    
    if (isDark) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
});

// Smooth scroll for anchor links
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

// Initialize EmailJS
emailjs.init('NkSQe2XS9R-2NRqf5');

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Hide any previous messages
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');
        
        // Change button text to show loading
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        submitBtn.disabled = true;
        
        try {
            // Send email using EmailJS
            await emailjs.send('service_gua48y4', 'template_xy51j7t', formData);
            
            // Show success message
            successMessage.classList.remove('hidden');
            
            // Clear form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 5000);
            
        } catch (error) {
            console.error('Email send error:', error);
            // Show error message
            errorMessage.textContent = 'Failed to send message. Please try again or contact via email directly.';
            errorMessage.classList.remove('hidden');
            
            // Hide error message after 5 seconds
            setTimeout(() => {
                errorMessage.classList.add('hidden');
            }, 5000);
        } finally {
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Animation on scroll
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

// Observe all sections for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-fade-in');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});