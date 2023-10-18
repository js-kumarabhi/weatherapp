document.getElementById('useCurrentLocation').addEventListener('click', function () {
  if ("geolocation" in navigator) {
    // Request user's current location
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      
      // Fetch weather data for the current location
      fetchWeatherByCoordinates(latitude, longitude);
    }, function (error) {
      console.error('Error getting current location:', error);
    });
  } else {
    alert('Geolocation is not supported by your browser.');
  }
});


// Function to fetch weather data 
function getWeather(city) {
    const apiKey = 'f990726aed12f5ab46987269eb90ab10';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Update the HTML elements with weather data
        document.getElementById('sunriseTime').textContent = `${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
        document.getElementById('sunsetTime').textContent = `${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
        document.getElementById('longitude').textContent = `${data.coord.lon}`;
        document.getElementById('latitude').textContent = `${data.coord.lat}`;
        document.getElementById('dateAndTime').textContent = `${new Date(data.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} | Local Time : ${new Date().toLocaleTimeString()}`;
        document.getElementById('weatherDescription').textContent = data.weather[0].description;
        document.getElementById('temperature').textContent = `${Math.round(data.main.temp - 273.15)}°C`;
        document.getElementById('locationName').textContent = `${city}`;
        document.getElementById('countryCode').textContent = data.sys.country;
        document.getElementById('realFeelsTemperature').textContent = `${Math.round(data.main.feels_like - 273.15)}°C`;
        document.getElementById('humidityPercentage').textContent = `${data.main.humidity}%`;
        document.getElementById('pressureValue').textContent = `${data.main.pressure}hPa`;
        document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
        document.getElementById('windTemperature').textContent = `${(data.wind.deg).toFixed(2)}°`;
        document.getElementById('maxTemperature').textContent = `${(data.main.temp_max - 273.15).toFixed(2)}°C`;
        document.getElementById('minTemperature').textContent = `${(data.main.temp_min - 273.15).toFixed(2)}°C`; 
        
// Set the image source based on the weather condition using if statements
const weatherCondition = data.weather[0].main.toLowerCase(); // Convert to lowercase for consistency
const weatherIcon = document.getElementById('weatherIcon');

if (weatherCondition === 'clear') {
  weatherIcon.src = 'images/clear.png';
} else if (weatherCondition === 'clouds') {
  weatherIcon.src = 'images/clouds.png';
} else if (weatherCondition === 'drizzle') {
  weatherIcon.src = 'images/drizzle.png';
} else if (weatherCondition === 'mist') {
  weatherIcon.src = 'images/mist.png';
} else if (weatherCondition === 'rain') {
  weatherIcon.src = 'images/rain.png';
} else if (weatherCondition === 'snow') {
  weatherIcon.src = 'images/snow.png';
} else {
  // Default image for unknown weather condition
  weatherIcon.src = 'images/default.png';
} 
    })
      .catch((err) => {
        console.error('Error fetching weather data:', err);
      });
  }

  // Event listener for each list item in the navbar
document.getElementById('mumbai').addEventListener('click', function () {
    getWeather("Mumbai");
  });
  
  document.getElementById('hyderabad').addEventListener('click', function () {
    getWeather("Hyderabad");
  });
  
  document.getElementById('chennai').addEventListener('click', function () {
    getWeather("Chennai");
  });
  
  document.getElementById('kolkata').addEventListener('click', function () {
    getWeather("Kolkata");
  });
  
  
// Event listener for the "Search" button and hitting Enter
document.getElementById('weatherForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    const city = document.getElementById('cityInput').value;
    if (city) {
      getWeather(city);
    }
  });
  
  // Initial call to getWeather with "Mumbai" as the default city
  getWeather("Mumbai");
  