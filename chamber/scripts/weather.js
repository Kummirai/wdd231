const apiKey = '6b10a1745a0180a6cabcc287a727a674'; 
const city = 'Johannesburg';

let weathHtml = ""
let forecastHtml = ""

const weatherDiv = document.querySelector('.weather');
const weatherForecastDiv = document.querySelector('.forecast');

async function getWeather(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        weathHtml += `<h3>Weather in ${data.name}</h3>`;
        weathHtml += `<p><em>${data.weather[0].description}</em></p>`;
        weathHtml += `<p><span>Temperature: </span>${(data.main.temp).toFixed(0)}°C</p>`;
        weathHtml += `<p><span>Humidity: </span>${data.main.humidity}%</p>`;
        weathHtml += `<p><span>Wind Speed: </span>${data.wind.speed} m/s</p>`;

        weatherDiv.innerHTML = weathHtml;
    

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

getWeather(city);
