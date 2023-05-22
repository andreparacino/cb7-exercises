import { displayWeatherData, getWeatherData } from "./helpers/utilities.js";

const cityForm = document.getElementById("queryForm");

cityForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = e.target[0].value;
  const weatherData = await getWeatherData(city);
  displayWeatherData(weatherData);
});
