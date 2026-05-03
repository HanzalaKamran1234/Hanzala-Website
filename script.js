// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar scroll effect
const handleNavbar = () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});

// Event listeners
window.addEventListener('scroll', handleNavbar);

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        // Collect data
        const formData = {
            name: contactForm.querySelector('input[placeholder="Your Name"]').value,
            email: contactForm.querySelector('input[placeholder="Your Email"]').value,
            message: contactForm.querySelector('textarea').value
        };

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                btn.classList.replace('btn-primary', 'btn-success');
                contactForm.reset();
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            btn.innerHTML = '<i class="fas fa-times"></i> Error! Try again.';
            btn.classList.replace('btn-primary', 'btn-danger');
        }

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('btn-success', 'btn-danger');
            btn.classList.add('btn-primary');
            btn.disabled = false;
        }, 3000);
    });
}

// Initial call
handleNavbar();
