const apiKey = "d8a95017ebd046df8eb113847232205";
const apiEndPoint = "http://api.weatherapi.com/v1";

export const getWeatherData = async (city) => {
  const url = `${apiEndPoint}/forecast.json?key=${apiKey}&days=7&q=${city}`;
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

  const forecast = document.createElement("div");
  forecast.classList.add("forecast");
  weatherData.forecast.forecastday.forEach((dayData) => {
    const forecastDay = document.createElement("div");
    const date = new Date(dayData.date);
    const formattedMonth = (date.getMonth() + 1).toString().padStart(2, "0");
    const formattedDay = date.getDate().toString().padStart(2, "0");
    forecastDay.classList.add("forecast-day");
    forecastDay.innerHTML = `<h3>${formattedMonth}/${formattedDay}</h3>
        <img src="${dayData.day.condition.icon}" alt="${dayData.day.condition.text}">
        <p>Max: <strong>${dayData.day.maxtemp_c}°C</strong></p>
        <p>Min: <strong>${dayData.day.mintemp_c}°C</strong></p>`;
    forecast.appendChild(forecastDay);
  });

  const weatherDetails = document.createElement("div");
  weatherDetails.innerHTML = `<img src="${current.condition.icon}" alt="${current.condition.text}">
    <h3>${current.condition.text}</h3>
    <p>Temperature: <strong>${current.temp_c}°C</strong></p>
    <p>Feels Like: <strong>${current.feelslike_c}°C</strong></p>
    <p>Wind: <strong>${current.wind_kph} km/h, ${current.wind_dir}</strong></p>
    <p>Humidity: <strong>${current.humidity}%</strong></p>
    <p>Pressure: <strong>${current.pressure_mb} mb</strong></p>`;

  card.append(locationInfo, weatherDetails, forecast);
  weatherInfo.appendChild(card);
};
