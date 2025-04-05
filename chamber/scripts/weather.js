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
        weathHtml += `<p>${data.weather[0].description}</p>`;
        weathHtml += `<p><span>Temperature: </span>${data.main.temp}°C</p>`;
        weathHtml += `<p><span>Humidity: </span>${data.main.humidity}%</p>`;
        weathHtml += `<p><span>Wind Speed: </span>${data.wind.speed} m/s</p>`;
        weathHtml += `<p><span>Pressure: </span>${data.main.pressure} hPa</p>`;
        weathHtml += `<p><span>Visibility: </span>${data.visibility / 1000} km</p>`;
        weathHtml += `<p><span>Cloudiness: </span>${data.clouds.all}%</p>`;
        weathHtml += `<p><span>Sunrise: </span>${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>`;
        weathHtml += `<p><span>Sunset: </span>${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>`;

        weatherDiv.innerHTML = weathHtml;

        forecastHtml += `<h3>Weather Forecast for ${data.name}</h3>`;
        forecastHtml += `<p>Temperature: ${data.main.temp}°C</p>`;
        forecastHtml += `<p>Humidity: ${data.main.humidity}%</p>`;
        forecastHtml += `<p>Wind Speed: ${data.wind.speed} m/s</p>`;
        forecastHtml += `<p>Pressure: ${data.main.pressure} hPa</p>`;

        weatherForecastDiv.innerHTML = forecastHtml;


    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

getWeather(city);
