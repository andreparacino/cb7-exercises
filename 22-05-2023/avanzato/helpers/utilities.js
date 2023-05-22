const apiKey = "d8a95017ebd046df8eb113847232205";
const apiEndPoint = "http://api.weatherapi.com/v1/current.json";

export const getWeatherData = async (city) => {
  const url = `${apiEndPoint}?key=${apiKey}&q=${city}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

const getTemperatureColor = (degrees) => {
  if (degrees < 13) return "#AEE2FF";
  if (degrees >= 13 && degrees < 25) return "#F5F0BB";
  return "#FFB84C";
};

export const displayWeatherData = (weatherData) => {
  const weatherInfo = document.getElementById("weatherInfo");
  weatherInfo.innerText = "";

  if (weatherData.error)
    weatherInfo.innerHTML =
      "<p>Failed to fetch weather data. Please try again.</p>";

  const location = weatherData.location;
  const current = weatherData.current;

  const card = document.createElement("div");
  card.style.backgroundColor = getTemperatureColor(current.temp_c);
  card.classList.add("weather-card");

  const locationInfo = document.createElement("div");
  locationInfo.innerHTML = `<h2>${location.name}, ${location.region}, ${location.country}</h2>
    <p>Local Time: ${location.localtime}</p>`;
  card.appendChild(locationInfo);

  const weatherDetails = document.createElement("div");
  weatherDetails.innerHTML = `<img src="${current.condition.icon}" alt="${current.condition.text}">
    <h3>${current.condition.text}</h3>
    <p>Temperature: <strong>${current.temp_c}°C</strong></p>
    <p>Feels Like: <strong>${current.feelslike_c}°C</strong></p>
    <p>Wind: <strong>${current.wind_kph} km/h, ${current.wind_dir}</strong></p>
    <p>Humidity: <strong>${current.humidity}%</strong></p>
    <p>Pressure: <strong>${current.pressure_mb} mb</strong></p>`;
  card.appendChild(weatherDetails);

  weatherInfo.appendChild(card);
};
