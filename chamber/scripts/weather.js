const apiKey = '6b10a1745a0180a6cabcc287a727a674'; 
const city = 'Johannesburg';

async function getWeather(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Weather in ${data.name}: ${data.weather[0].description}`);
        console.log(`Temperature: ${data.main.temp}°C`);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

getWeather(city);
