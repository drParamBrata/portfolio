// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the header element for scroll effects
    const header = document.querySelector('header');
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll event handling
    window.addEventListener('scroll', function() {
        // Add box shadow to header on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Highlight active nav item based on scroll position
        highlightActiveNavItem();
    });
    
    // Function to highlight the active navigation item
    function highlightActiveNavItem() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('nav ul li a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[type="text"]:nth-of-type(2)').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Show success message (in production, this would send data to server)
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Add animation to timeline items when they come into view
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        timelineItems.forEach(item => {
            observer.observe(item);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        timelineItems.forEach(item => {
            item.classList.add('animate');
        });
    }
    
    // Add animation to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    
    if ('IntersectionObserver' in window) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.progress');
                    const width = progressBar.style.width;
                    
                    progressBar.style.width = '0';
                    setTimeout(() => {
                        progressBar.style.transition = 'width 1s ease-in-out';
                        progressBar.style.width = width;
                    }, 200);
                    
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        skillItems.forEach(item => {
            skillObserver.observe(item);
        });
    }
    
    // Add typing effect to hero heading
    const heroHeading = document.querySelector('.hero-content h1');
    if (heroHeading) {
        const text = heroHeading.textContent;
        heroHeading.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // Mobile navigation toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close mobile menu when a nav item is clicked
        document.querySelectorAll('nav ul li a').forEach(item => {
            item.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
});