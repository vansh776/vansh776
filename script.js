document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animations on Scroll)
    AOS.init({
        duration: 1200, // Longer duration for softer, more elegant animations
        once: true,    // Only animate once
        offset: 80,    // Trigger animation when element is 80px from viewport bottom
        easing: 'ease-out-quart', // Smoother easing
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Check if it's a valid hash and not just '#'
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                // If href is just '#', scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dark/Light mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        // Default to dark theme if no preference
        body.classList.add('dark-theme');
        updateThemeIcon('dark-theme');
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
            updateThemeIcon('light-theme');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
            updateThemeIcon('dark-theme');
        }
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'light-theme') {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    }

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Basic Contact Form handling (client-side only for visual feedback)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real application, you would send this data to a backend service (e.g., Formspree, Netlify Forms, custom API)
            alert('Thank you for your message! Vansh will get back to you soon. (Note: This form is for demo purposes and does not send actual emails.)');
            this.reset(); // Clear the form
        });
    }
});