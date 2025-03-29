// Weather API for Johannesburg
const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your actual API key
const city = 'Johannesburg,ZA';
const units = 'metric'; // For Celsius

async function getWeather() {
    try {
        // Current weather
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`
        );
        const currentData = await currentResponse.json();
        
        // Forecast
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`
        );
        const forecastData = await forecastResponse.json();
        
        updateWeatherUI(currentData, forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-desc').textContent = 'Weather data unavailable';
    }
}

function updateWeatherUI(currentData, forecastData) {
    // Current weather
    document.getElementById('current-temp').textContent = Math.round(currentData.main.temp);
    document.getElementById('weather-desc').textContent = currentData.weather[0].description;
    document.getElementById('humidity').textContent = currentData.main.humidity;
    document.getElementById('wind-speed').textContent = Math.round(currentData.wind.speed * 3.6); // Convert m/s to km/h
    
    // Weather icon
    const iconCode = currentData.weather[0].icon;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById('weather-icon').alt = currentData.weather[0].main;
    
    // Forecast (next 3 days)
    const forecastDays = [];
    const today = new Date().getDate();
    
    // Get unique days (skip current day if it's late)
    forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        if (date.getDate() !== today && forecastDays.length < 3) {
            if (!forecastDays.some(d => d.getDate() === date.getDate())) {
                forecastDays.push(date);
                // Get temperature for around noon
                const noonTemp = forecastData.list.find(f => {
                    const fDate = new Date(f.dt * 1000);
                    return fDate.getDate() === date.getDate() && fDate.getHours() >= 12;
                });
                
                if (noonTemp) {
                    const dayElement = document.getElementById(`day${forecastDays.length}-temp`);
                    if (dayElement) {
                        dayElement.textContent = Math.round(noonTemp.main.temp);
                    }
                    
                    const dayNameElement = document.getElementById(`day${forecastDays.length}-name`);
                    if (dayNameElement) {
                        dayNameElement.textContent = date.toLocaleDateString('en-US', { weekday: 'long' });
                    }
                }
            }
        }
    });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', getWeather);