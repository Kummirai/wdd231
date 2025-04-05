// Load attractions from JSON
async function loadAttractions() {
    try {
        const response = await fetch('./scripts/discover.json');
        const attractions = await response.json();
        displayAttractions(attractions);
    } catch (error) {
        console.error('Error loading attractions:', error);
    }
}

// Display attractions in the gallery
function displayAttractions(attractions) {
    const container = document.getElementById('attractions');
    
    attractions.forEach(attraction => {
        const card = document.createElement('div');
        card.className = 'attraction-card';
        
        card.innerHTML = `
            <figure>
                <img src="${attraction.image}" alt="${attraction.name}" loading="lazy">
            </figure>
            <div class="attraction-content">
                <h2>${attraction.name}</h2>
                <address>${attraction.address}</address>
                <p>${attraction.description}</p>
                <a href="#" class="learn-more-btn">Learn More</a>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Track visits and display message
function trackVisits() {
    const now = Date.now();
    const lastVisit = localStorage.getItem('lastVisit');
    const visitMessage = document.getElementById('visit-message');
    
    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceLastVisit = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        
        if (daysSinceLastVisit < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            const dayText = daysSinceLastVisit === 1 ? "day" : "days";
            visitMessage.textContent = `You last visited ${daysSinceLastVisit} ${dayText} ago.`;
        }
    }
    
    localStorage.setItem('lastVisit', now);
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadAttractions();
    trackVisits();
});