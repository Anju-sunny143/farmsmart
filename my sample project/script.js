const apiKey = "a63b0e18099c21bd9c5e7ce9f319410d"; // Replace with your OpenWeatherMap API key

function getWeatherByCoordinates(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      // Display today's weather
      document.querySelector(".weather-box:nth-child(1)").innerHTML = `
        <h3>Today's Weather</h3>
        <p>Temperature: ${data.current.temp}°C</p>
        <p>Condition: ${data.current.weather[0].description}</p>
      `;

      // Weekly forecast
      let forecastHTML = "<h3>Weekly Forecast</h3>";
      data.daily.slice(0, 7).forEach(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString();
        forecastHTML += `<p>${date}: ${day.temp.day}°C, ${day.weather[0].main}</p>`;
      });

      document.querySelector(".weather-box:nth-child(2)").innerHTML = forecastHTML;
    })
    .catch(err => {
      console.error("Weather fetch error:", err);
    });
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        getWeatherByCoordinates(latitude, longitude);
      },
      error => {
        alert("Location access denied or unavailable. Showing default weather.");
        getWeatherByCity("Hyderabad"); // fallback
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
    getWeatherByCity("Hyderabad"); // fallback
  }
}

// Fallback using city name (optional)
function getWeatherByCity(city) {
  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      if (data[0]) {
        getWeatherByCoordinates(data[0].lat, data[0].lon);
      }
    });
}

// Start on load
getUserLocation();
