import { getTemperature } from "./utlis.js";
import { currentUnit } from "./utlis.js";
import { iconsSvg } from "./icons.js";
import { formatDate } from "./utlis.js";

function showWeatherStatus(
  data,
  locationElement,
  dateElement,
  temperatureElement,
  descriptionElement,
  humidityElement,
  windSpeedElement,
  sunriseElement,
  sunsetElement,
  uvindexElement,
  icon
) {
  locationElement.textContent = data.city;
  dateElement.textContent = formatDate(data.date);
  temperatureElement.textContent = getTemperature(
    data.temperature,
    currentUnit
  );
  descriptionElement.textContent = data.description;
  humidityElement.textContent = data.humidity;
  windSpeedElement.textContent = data.windSpeed + "Km/h";
  icon.innerHTML = getWeatherIcon(data.icon);
  sunriseElement.textContent = data.sunrise;
  sunsetElement.textContent = data.sunset;
  uvindexElement.textContent = data.uvindex;

  changeBackground(data.icon);
  // changing background
}

function getWeatherIcon(icon) {
  switch (icon) {
    case "clear-day":
      return iconsSvg.clearSky;
    case "clear-night":
      return iconsSvg.clearNight;
    case "partly-cloudy-day":
      return iconsSvg.partlyCloudy;
    case "partly-cloudy-night":
      return iconsSvg.partlyCloudyNight;
    case "cloudy":
      return iconsSvg.cloudy;
    case "rain":
    case "showers-day":
    case "showers-night":
      return iconsSvg.rain;
    case "snow":
    case "snow-showers-day":
    case "snow-showers-night":
      return iconsSvg.snow;
    case "fog":
      return iconsSvg.fog;
    case "wind":
      return iconsSvg.wind;
    case "hail":
      return iconsSvg.hail;
    case "thunderstorm":
    case "thunder-showers-day":
    case "thunder-showers-night":
      return iconsSvg.thunderDay;
    case "thunder-rain":
      return iconsSvg.thunderRain;
  }

  return "Not available Icon";
}

function changeBackground(icon) {
  document.querySelector("body").style.backgroundImage = `url("./${icon}.jpg")`;
}

export { showWeatherStatus };
