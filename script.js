// ============================================
// Vanish Trips - Interactive JavaScript
// ============================================

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for fade-in effect
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Observe trip cards
document.querySelectorAll('.trip-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Booking Form Handling
const bookingForm = document.getElementById('booking-form');
const bookingModal = document.getElementById('booking-modal');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        // Get form values
        const formData = new FormData(bookingForm);
        const fullName = formData.get('full-name');
        const email = formData.get('email');
        const destination = formData.get('destination');
        const travelDates = formData.get('travel-dates');
        const travelers = formData.get('travelers');
        const message = formData.get('message');
        
        // Basic validation
        if (!fullName || !email || !destination || !travelDates || !travelers) {
            e.preventDefault();
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show modal with destination info (form will submit to Formspree)
        const modalDestination = bookingModal.querySelector('.modal-destination');
        if (modalDestination) {
            modalDestination.textContent = `Destination: ${destination}`;
        }
        
        // Show modal after a short delay to allow form submission
        setTimeout(() => {
            bookingModal.classList.add('show');
        }, 100);
    });
}


// Book Now Buttons - Pre-fill destination in booking form
document.querySelectorAll('[data-trip]').forEach(button => {
    button.addEventListener('click', function() {
        const tripName = this.getAttribute('data-trip');
        const destinationSelect = document.getElementById('destination');
        
        if (destinationSelect) {
            // Scroll to booking section
            const bookingSection = document.getElementById('booking');
            if (bookingSection) {
                const offsetTop = bookingSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Pre-fill destination after a short delay
                setTimeout(() => {
                    destinationSelect.value = tripName;
                    destinationSelect.focus();
                }, 500);
            }
        } else {
            // If booking form doesn't exist on this page, redirect to index.html with booking section
            window.location.href = `index.html?trip=${encodeURIComponent(tripName)}#booking`;
        }
    });
});

// Handle trip parameter from URL on index.html
window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const tripParam = urlParams.get('trip');
    if (tripParam) {
        setTimeout(() => {
            const destinationSelect = document.getElementById('destination');
            if (destinationSelect) {
                destinationSelect.value = tripParam;
                const bookingSection = document.getElementById('booking');
                if (bookingSection) {
                    const offsetTop = bookingSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        }, 500);
    }
});

// Modal Close Functions
function closeModal() {
    bookingModal.classList.remove('show');
}


// Close modals when clicking outside
if (bookingModal) {
    bookingModal.addEventListener('click', function(e) {
        if (e.target === bookingModal) {
            closeModal();
        }
    });
}


// Close modals with close button
document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        if (modal) {
            modal.classList.remove('show');
        }
    });
});

// Close modals with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (bookingModal && bookingModal.classList.contains('show')) {
            closeModal();
        }
    }
});

// Navbar background on scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'oklch(1.0000 0 0 / 0.98)';
        navbar.style.boxShadow = 'var(--shadow-xl)';
    } else {
        navbar.style.background = 'oklch(1.0000 0 0 / 0.95)';
        navbar.style.boxShadow = 'var(--shadow-md)';
    }
    
    lastScroll = currentScroll;
});

// Date input minimum date (today)
const travelDatesInput = document.getElementById('travel-dates');
if (travelDatesInput) {
    const today = new Date().toISOString().split('T')[0];
    travelDatesInput.setAttribute('min', today);
}

// Form input animations
document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Initialize hero animations on load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButton = document.querySelector('.hero .btn');
    
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 100);
    }
    
    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (heroButton) {
        setTimeout(() => {
            heroButton.style.opacity = '1';
            heroButton.style.transform = 'translateY(0)';
        }, 500);
    }
});

