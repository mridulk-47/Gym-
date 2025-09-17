document.addEventListener('DOMContentLoaded', function() {
    fetch('modal.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);

            const callNowBtn = document.querySelectorAll('.call-now-btn');
            const modal = document.getElementById('call-modal');
            const closeBtn = document.querySelector('.close-btn');

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
});
