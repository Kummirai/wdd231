document.addEventListener('DOMContentLoaded', function() {
    // Set timestamp when page loads
    const now = new Date();
    document.getElementById('timestamp').value = now.toLocaleString();
    
    // Modal functionality
    const modalLinks = document.querySelectorAll('.learn-more');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');
    
    modalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('href');
            document.querySelector(modalId).style.display = 'block';
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.closest('.modal').style.display = 'none';
        });
    });
    
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Form validation for position field
    const positionField = document.querySelector('input[name="position"]');
    if (positionField) {
        positionField.addEventListener('input', function() {
            const pattern = /^[a-zA-Z\- ]{7,}$/;
            if (this.value && !pattern.test(this.value)) {
                this.setCustomValidity('Please use only letters, hyphens, and spaces (minimum 7 characters)');
            } else {
                this.setCustomValidity('');
            }
        });
    }
});