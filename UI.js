import { currentUnit } from "./utlis.js";
import { iconsSvg } from "./icons.js";
import { formatDate } from "./utlis.js";

function showWeatherStatus(data, elements, icon) {
  elements.locationElement.textContent = data.city;
  elements.dateElement.textContent = formatDate(data.date);
  elements.temperatureElement.textContent =
    data.temperature + "°" + currentUnit;
  elements.descriptionElement.textContent = data.description;
  elements.humidityElement.textContent = data.humidity;
  elements.windSpeedElement.textContent = data.windSpeed + "Km";
  icon.innerHTML = getWeatherIcon(data.icon);
  elements.sunriseElement.textContent = data.sunrise;
  elements.sunsetElement.textContent = data.sunset;
  elements.uvindexElement.textContent = data.uvindex;
}

const icons = {
  "clear-day": iconsSvg.clearSky,
  "clear-night": iconsSvg.clearNight,
  "partly-cloudy-day": iconsSvg.partlyCloudy,
  "partly-cloudy-night": iconsSvg.partlyCloudyNight,
  cloudy: iconsSvg.cloudy,
  rain: iconsSvg.rain,
  "showers-day": iconsSvg.rain,
  "showers-night": iconsSvg.rain,
  snow: iconsSvg.snow,
  "snow-showers-day": iconsSvg.snow,
  "snow-showers-night": iconsSvg.snow,
  fog: iconsSvg.fog,
  wind: iconsSvg.wind,
  hail: iconsSvg.hail,
  thunderstorm: iconsSvg.thunderDay,
  "thunder-showers-day": iconsSvg.thunderDay,
  "thunder-showers-night": iconsSvg.thunderDay,
  "thunder-rain": iconsSvg.thunderRain,
};

function getWeatherIcon(icon) {
  document.querySelector("body").style.backgroundImage =
    `url("../assests/${icon}.jpg")`;
  const svgIcon = icons[icon];
  if (!svgIcon) {
    return "No Available icon.";
  }
  return svgIcon;
}

export { showWeatherStatus };
