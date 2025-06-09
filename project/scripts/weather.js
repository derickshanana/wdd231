// weather.js

const apiKey = '5788f86f49dd9511c1e53639e8331d40';
const city = 'Bulawayo'; // Update with the city you want to use
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

async function fetchWeather() {
    try {
        const currentResponse = await fetch(currentWeatherUrl);
        const currentData = await currentResponse.json();
        
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayCurrentWeather(data) {
    const currentWeatherElement = document.getElementById('current-weather');
    const { main, weather, wind } = data;
    const weatherIcon = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;

    currentWeatherElement.innerHTML = `
        <img src="${weatherIcon}" alt="${weather[0].description}" class="weather-icon">
        <p><strong>${data.name}</strong></p>
        <p>Temperature: ${main.temp}°C</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
    `;
}

function displayForecast(data) {
    const forecastElement = document.getElementById('forecast');
    const forecastList = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3); // Take the next 3 days of forecast

    let forecastHTML = '';
    
    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        const { main, weather, wind } = item;
        const weatherIcon = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;

        forecastHTML += `
            <div class="forecast-card">
                <h4>${date}</h4>
                <img src="${weatherIcon}" alt="${weather[0].description}" class="weather-icon">
                <p>Temperature: ${main.temp}°C</p>
                <p>Weather: ${weather[0].description}</p>
                <p>Wind Speed: ${wind.speed} m/s</p>
            </div>
        `;
    });

    forecastElement.innerHTML = forecastHTML;
}

// Load the weather data when the page loads
document.addEventListener('DOMContentLoaded', fetchWeather);
