
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);

    document.getElementById('displayName').textContent =
        `${urlParams.get('firstName')} ${urlParams.get('lastName')}`;
    document.getElementById('displayEmail').textContent = urlParams.get('email');
    document.getElementById('displayPhone').textContent = urlParams.get('phone');
    document.getElementById('displayBusiness').textContent = urlParams.get('businessName');
    document.getElementById('displayLevel').textContent =
        getMembershipLevelName(urlParams.get('membershipLevel'));
    document.getElementById('displayDate').textContent = urlParams.get('timestamp');

    function getMembershipLevelName(level) {
        switch (level) {
            case 'np': return 'NP Membership (Non-Profit)';
            case 'bronze': return 'Bronze Membership';
            case 'silver': return 'Silver Membership';
            case 'gold': return 'Gold Membership';
            default: return 'Unknown';
        }
    }
});
