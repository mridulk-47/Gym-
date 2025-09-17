document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
    });

    // Testimonial Carousel
    new Swiper('.testimonial-carousel', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });

    // Schedule Tabs
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const day = link.dataset.day;

            tabLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            tabContents.forEach(content => {
                if (content.id === day) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const callNowBtn = document.querySelectorAll('.call-now-btn');
    const modal = document.getElementById('call-modal');
    const closeBtn = document.querySelector('.close-btn');
    const showMoreBtn = document.getElementById('show-more-btn');
    const servicesGrid = document.querySelector('.services-grid');
    const services = servicesGrid ? Array.from(servicesGrid.querySelectorAll('.service-card')) : [];

    const initialVisibleServices = window.innerWidth <= 768 ? 6 : 12;

    function toggleServices() {
        const currentlyVisible = services.filter(service => service.style.display !== 'none').length;

        if (services.length > currentlyVisible) {
            services.forEach(service => service.style.display = 'block');
            showMoreBtn.textContent = 'Show Less';
        } else {
            services.forEach((service, index) => {
                if (index >= initialVisibleServices) {
                    service.style.display = 'none';
                }
            });
            showMoreBtn.textContent = 'Show More';
        }
    }


    callNowBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'block';
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    if (showMoreBtn) {
        services.forEach((service, index) => {
            if (index >= initialVisibleServices) {
                service.style.display = 'none';
            }
        });

        if (services.length <= initialVisibleServices) {
            showMoreBtn.style.display = 'none';
        }

        showMoreBtn.addEventListener('click', toggleServices);
    }

    window.addEventListener('resize', () => {
        const newInitialVisibleServices = window.innerWidth <= 768 ? 6 : 12;
        services.forEach((service, index) => {
            if (index >= newInitialVisibleServices) {
                service.style.display = 'none';
            }
        });
        showMoreBtn.textContent = 'Show More';
    });

    // EmailJS
    (function() {
        emailjs.init({
            publicKey: "WLxQvnr4wgPiIEkAo",
        });
    })();

    const joinForm = document.querySelector('.join-section .form-container form');
    if (joinForm) {
        joinForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const btn = this.querySelector('input[type="submit"]');
            btn.value = 'Sending...';

            // Send welcome email to user via EmailJS
            const serviceID = 'service_yk9crfn';
            const userTemplateID = 'template_uclftu4';
            try {
                await emailjs.sendForm(serviceID, userTemplateID, this);
            } catch (err) {
                console.error('Failed to send welcome email:', err);
            }

            // Submit form to Formspree
            const formData = new FormData(this);
            try {
                const response = await fetch(this.action, {
                    method: this.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                if (response.ok) {
                    btn.value = 'Submit';
                    document.getElementById('thanks-modal').style.display = 'block';
                    joinForm.reset();
                } else {
                    throw new Error('Formspree submission failed');
                }
            } catch (err) {
                btn.value = 'Submit';
                alert('An error occurred. Please try again.');
                console.error(err);
            }
        });
    }

    // Close modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
        window.addEventListener('click', (e) => {
            if (e.target == modal) {
                modal.style.display = 'none';
            }
        });
    });
});
