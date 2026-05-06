import "./styles.css";
import { getCityWeather } from "./data.js";
import { iconsSvg } from "./icons.js";
import { showWeatherStatus } from "./UI.js";
import { convertTemperature } from "./utlis.js";

import { getUserServerLocation } from "./utlis.js";
import { currentUnit } from "./utlis.js";

// elements
const location = document.querySelector(".location");
const thisDay_icon = document.querySelector(".thisDay-icon");
const thisDay_description = document.querySelector(".thisDay-description");
const thisDay_date = document.querySelector(".thisDay-date");
const thisDay_temperature = document.querySelector(".thisDay-temperature");
const thisDay_humidity = document.querySelector(".thisDay-humidity");
const thisDay_windSpeed = document.querySelector(".thisDay-wind-speed");
const convertUnitButton = document.querySelector(".convert-unit-button");
const thisDay_sunrise = document.querySelector(".thisDay-sunrise");
const thisDay_sunset = document.querySelector(".thisDay-sunset");
const thisDay_uvindex = document.querySelector(".thisDay-uvindex");
const currentLocation = (await getUserServerLocation()).city;
const windSpeedicon = document.querySelector(".wind-speed-icon");
const sunriseIcon = document.querySelector(".sunrise-icon");
const sunsetIcon = document.querySelector(".sunset-icon");
const uvindexIcon = document.querySelector(".uvindex-icon");
const humidityIcon = document.querySelector(".humidity-icon");
const loadingElement = document.querySelector(".loading-background");
const searchButton = document.querySelector(".search-button");

const elements = {
  locationElement: location,
  dateElement: thisDay_date,
  temperatureElement: thisDay_temperature,
  descriptionElement: thisDay_description,
  humidityElement: thisDay_humidity,
  windSpeedElement: thisDay_windSpeed,
  sunriseElement: thisDay_sunrise,
  sunsetElement: thisDay_sunset,
  uvindexElement: thisDay_uvindex,
};

// initializing icons
humidityIcon.innerHTML = iconsSvg.humidity;
windSpeedicon.innerHTML = iconsSvg.windspeed;
sunriseIcon.innerHTML = iconsSvg.sunrise;
sunsetIcon.innerHTML = iconsSvg.sunset;
uvindexIcon.innerHTML = iconsSvg.uvIndex;

getCityWeather(currentLocation, 0)
  .then((result) => {
    loadingElement.style.display = "none";
    showWeatherStatus(result, elements, thisDay_icon);
  })
  .catch((error) => alert("Something went wrong", error));

async function searchHandler() {
  const searchValue = document.querySelector(".search-input").value;
  loadingElement.style.display = "block";
  const result = await getCityWeather(searchValue, 0);
  showWeatherStatus(result, elements, thisDay_icon);
  loadingElement.style.display = "none";
}

searchButton.addEventListener("click", searchHandler);

function convertUnitHandler() {
  if (!thisDay_temperature.textContent) return;
  const currentTempNumeric = parseInt(thisDay_temperature.textContent);
  thisDay_temperature.textContent = convertTemperature(currentTempNumeric);
  convertUnitButton.textContent = "Unit : " + currentUnit;
}

convertUnitButton.addEventListener("click", convertUnitHandler);
