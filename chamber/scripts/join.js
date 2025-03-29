document.addEventListener('DOMContentLoaded', function() {
    // Set timestamp when page loads
    const now = new Date();
    document.getElementById('timestamp').value = now.toLocaleString();
    
    // Modal functionality
    // Get all modal elements
    const modals = document.querySelectorAll('.modal');
    
    // Get all buttons that open modals
    const learnMoreButtons = document.querySelectorAll('.learn-more');
    
    // Get all close buttons
    const closeButtons = document.querySelectorAll('.close');
    
    // When the user clicks a Learn More button, open the corresponding modal
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('href');
            const modal = document.querySelector(modalId);
            modal.style.display = 'block';
        });
    });
    
    // When the user clicks a close button, close the modal
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });
    
    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
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