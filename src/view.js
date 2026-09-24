import {
  formatDate,
  getIcon,
  formatNumber,
  getTemperature,
  getBackground,
} from "./utils.js";

const weatherContainer = document.querySelector(".weather-container");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const toggleUnitButton = document.querySelector("#toggle-unit-button"); // add this to header
const loadingContainer = document.querySelector(".loading-container");
const errorContainer = document.querySelector(".error-container");

function createElement(tagName, textContent, className) {
  const element = document.createElement(tagName);

  if (textContent !== undefined) element.textContent = textContent;
  if (className) element.className = className;

  return element;
}

function appendIcon(parent, icon) {
  const iconDocument = new DOMParser().parseFromString(
    getIcon(icon),
    "image/svg+xml",
  );
  const svg = iconDocument.documentElement;

  if (svg.nodeName === "parsererror") return;
  parent.appendChild(document.importNode(svg, true));
}

function appendTemperature(parent, value, currentUnit, includeSpace = false) {
  if (includeSpace) parent.appendChild(document.createTextNode(" "));

  const temperature = createElement(
    "span",
    getTemperature(value, currentUnit),
    "temp",
  );
  const unit = createElement("span", currentUnit, "unit");

  parent.append(temperature, document.createTextNode("°"), unit);
}

function appendDetail(list, label, value) {
  const item = createElement("li");
  item.append(document.createTextNode(`${label}: ${value}`));
  list.appendChild(item);
}

export function renderWeather(
  weather,
  currentUnit,
  container = weatherContainer,
) {
  const current = weather.currentConditions;
  const forecast = weather.days.slice(0, 7);
  
  document.body.style.backgroundImage = `url("${getBackground(current.icon)}")`;

  container.replaceChildren();

  const locationHeader = createElement("header");
  locationHeader.append(
    createElement("h1", weather.resolvedAddress),
    createElement("p", weather.description),
    createElement("p", `Timezone: ${weather.timezone}`),
  );

  const currentSection = createElement("section", undefined, "current-weather");
  currentSection.setAttribute("aria-labelledby", "current-weather-title");
  currentSection.appendChild(
    createElement("h2", "Current weather", undefined),
  ).id = "current-weather-title";

  appendIcon(currentSection, current.icon);

  const currentTemperature = createElement("p");
  appendTemperature(currentTemperature, current.temp, currentUnit);
  currentSection.append(
    currentTemperature,
    createElement("p", current.conditions),
  );

  const feelsLike = createElement("p");
  feelsLike.append(document.createTextNode("Feels like "));
  appendTemperature(feelsLike, current.temp, currentUnit);
  currentSection.appendChild(feelsLike);

  const details = createElement("ul");
  appendDetail(details, "Humidity", `${formatNumber(current.humidity)}%`);
  appendDetail(details, "Wind", `${formatNumber(current.windspeed)} mph`);
  appendDetail(details, "UV index", current.uvindex);
  appendDetail(details, "Visibility", `${current.visibility} mi`);
  currentSection.appendChild(details);

  const forecastSection = createElement("section", undefined, "forecast");
  forecastSection.setAttribute("aria-labelledby", "forecast-title");
  forecastSection.appendChild(createElement("h2", "7-day forecast")).id =
    "forecast-title";

  const forecastList = createElement("div", undefined, "forecast-list");
  forecast.forEach((day) => {
    const forecastDay = createElement("article", undefined, "forecast-day");
    forecastDay.appendChild(createElement("h3", formatDate(day.datetime)));
    appendIcon(forecastDay, day.icon);
    forecastDay.appendChild(createElement("p", day.conditions));

    const forecastTemperature = createElement("p");
    appendTemperature(forecastTemperature, day.tempmax, currentUnit);
    forecastTemperature.appendChild(document.createTextNode(" / "));
    appendTemperature(forecastTemperature, day.tempmin, currentUnit);
    forecastDay.append(
      forecastTemperature,
      createElement("p", `Rain: ${day.precipprob}%`),
    );
    forecastList.appendChild(forecastDay);
  });

  forecastSection.appendChild(forecastList);
  container.append(locationHeader, currentSection, forecastSection);
}

export function syncToggleButtonLabel(currentUnit) {
  if (!toggleUnitButton) return;
  toggleUnitButton.textContent = currentUnit === "F" ? "Show °C" : "Show °F";
}

export function updateUnit(previousUnit, nextUnit) {
  syncToggleButtonLabel(nextUnit);
  const temps = document.querySelectorAll(".temp");
  const units = document.querySelectorAll(".unit");
  units.forEach((unit) => {
    unit.textContent = nextUnit;
  });
  temps.forEach((temp) => {
    temp.textContent = getTemperature(
      Number(temp.textContent),
      nextUnit,
      previousUnit,
    );
  });
}

export function bindSearchTodo(handler) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchQuery = searchInput.value.trim();
    handler(searchQuery);
  });
}

export function bindToggleUnit(handler) {
  toggleUnitButton.addEventListener("click", () => {
    handler();
  });
}

export function showLoading() {
  loadingContainer.style.display = "flex";
  loadingContainer.innerHTML = `<svg width="50px" height="50px" version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><path fill="currentColor" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z"><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="2s" from="0 50 50" to="360 50 50" repeatCount="indefinite"/></path><path fill="currentColor" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z"><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="-360 50 50" repeatCount="indefinite"/></path><path fill="currentColor" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
  L82,35.7z"><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="2s" from="0 50 50" to="360 50 50" repeatCount="indefinite"/></path></svg>`;
}

export function removeLoading() {
  loadingContainer.style.display = "none";
  loadingContainer.innerHTML = ``;
}

export function showError(message) {
  errorContainer.style.display = "block";
  errorContainer.textContent = message;
}
