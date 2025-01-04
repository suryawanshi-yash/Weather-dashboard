const apiKey = 'Your api key'; // Replace with your OpenWeatherMap API key

document.getElementById('searchButton').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    fetchWeather(city);
});

function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert('City not found');
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
    const cityName = document.getElementById('cityName');
    const temperature = document.getElementById('temperature');
    const condition = document.getElementById('condition');
    const currentTime = document.getElementById('currentTime');
    
    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp} °C`;
    condition.textContent = `Condition: ${data.weather[0].description}`;
    
    const weatherCondition = data.weather[0].main.toLowerCase();
    document.body.className = weatherCondition === 'clear' ? 'sunny' : 
                               weatherCondition === 'clouds' ? 'cloudy' : 
                               weatherCondition === 'rain' ? 'rainy' : '';
    
    const now = new Date();
    currentTime.textContent = `Current Time: ${now.toLocaleTimeString()}`;
    
    // Add weather icon
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    const iconElement = document.createElement('img');
    iconElement.src = iconUrl;
    iconElement.alt = data.weather[0].description;
    document.getElementById('weatherInfo').appendChild(iconElement);
}
