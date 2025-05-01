const apiKey = "a63b0e18099c21bd9c5e7ce9f319410d"; // Your OpenWeatherMap API key

function getRecommendations(temp, humidity) {
  const crops = [];

  // High temperature and low humidity (Suitable for dry crops)
  if (temp > 30 && humidity < 50) {
    crops.push("Maize", "Cotton", "Sorghum", "Barley");
  }
  // Moderate temperature and low humidity
  else if (temp > 25 && temp <= 30 && humidity < 60) {
    crops.push("Maize", "Cotton", "Peanuts", "Tobacco");
  }
  // Moderate temperature and high humidity (Suitable for crops needing more water)
  else if (temp <= 25 && humidity >= 60) {
    crops.push("Rice", "Sugarcane", "Soybeans", "Sugar Beet");
  }
  // Low temperature and high humidity (Suitable for cool-season crops)
  else if (temp <= 20 && humidity >= 70) {
    crops.push("Wheat", "Millet", "Oats", "Barley");
  }
  // High temperature and high humidity (Suitable for tropical crops)
  else if (temp > 30 && humidity >= 60) {
    crops.push("Bananas", "Coconuts", "Citrus Fruits", "Pineapple");
  }
  // Very high temperature and moderate humidity (Suitable for arid conditions)
  else if (temp > 35 && humidity < 50) {
    crops.push("Cactus", "Agave", "Chili Peppers", "Grapes");
  }
  // Cold temperature (Suitable for frost-tolerant crops)
  else if (temp < 10) {
    crops.push("Potatoes", "Cabbage", "Carrots", "Spinach");
  }

  return crops;
}


function updateUI(data) {
  document.getElementById("temp").textContent = data.main.temp;
  document.getElementById("humidity").textContent = data.main.humidity;
  document.getElementById("condition").textContent = data.weather[0].description;

  // Fetching Wind Speed, Pressure, and Visibility
  const windSpeed = data.wind ? data.wind.speed : "--";
  const pressure = data.main ? data.main.pressure : "--";
  const visibility = data.visibility ? data.visibility : "--";

  // Updating the UI with the fetched data
  document.getElementById("wind").textContent = windSpeed;
  document.getElementById("pressure").textContent = pressure;
  document.getElementById("visibility").textContent = visibility;

  // Handling crop recommendations
  const crops = getRecommendations(data.main.temp, data.main.humidity);
  const cropList = document.getElementById("crop-list");
  cropList.innerHTML = "";
  crops.forEach(crop => {
    const li = document.createElement("li");
    li.textContent = crop;
    cropList.appendChild(li);
  });
}

function getWeatherByCity() {
  const city = document.getElementById("location").value;
  if (!city) {
    alert("Please enter a location.");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      if (data.cod === 200) {
        updateUI(data);
      } else {
        alert("Location not found. Please try again.");
      }
    })
    .catch(err => console.error("Error fetching weather:", err));
}
