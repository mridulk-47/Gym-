document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
        });
    }

    mobileNav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            mobileNav.classList.remove('active');
        }
    });
});
