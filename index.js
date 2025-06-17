import "./styles.css";
import { getWeatherDataForCity } from "./data.js";
import { iconsSvg } from "./icons.js";
import { showWeatherStatus } from "./UI.js";
import { convertTemperature , changeClass } from "./utlis.js";

import { getUserServerLocation } from "./utlis.js";
import { currentUnit } from "./utlis.js";



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
  humidityIcon.innerHTML = iconsSvg.humidity;
   
  windSpeedicon.innerHTML = iconsSvg.windspeed;
  sunriseIcon.innerHTML = iconsSvg.sunrise;
  sunsetIcon.innerHTML = iconsSvg.sunset;
  uvindexIcon.innerHTML = iconsSvg.uvIndex;







getWeatherDataForCity(currentLocation, 0).then((result) => {
  loadingElement.style.display = "none";
  showWeatherStatus(
    result,
    location,
    thisDay_date,
    thisDay_temperature,
    thisDay_description,
    thisDay_humidity,
    thisDay_windSpeed,
    thisDay_sunrise,
    thisDay_sunset,
    thisDay_uvindex,
    thisDay_icon,
  )
   changeClass(thisDay_temperature,"F","C");
}
).catch((error) => alert("Something went wrong",error));



const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click",()=> {
    const searchValue = document.querySelector(".search-input").value;
    loadingElement.style.display = "block";
getWeatherDataForCity(searchValue, 0).then((result) => {
    loadingElement.style.display = "none";
  showWeatherStatus(
    result,
    location,
    thisDay_date,
    thisDay_temperature,
    thisDay_description,
    thisDay_humidity,
    thisDay_windSpeed,
    thisDay_sunrise,
    thisDay_sunset,
    thisDay_uvindex,
    thisDay_icon,
    
  )
  
}
).catch(() =>  alert("Something went wrong"));

})



convertUnitButton.addEventListener("click",()=>{
  if(!thisDay_temperature.textContent) return;
 changeClass(thisDay_temperature,"C","F");
 
  
  const temperatureValue = Number(thisDay_temperature.textContent);
  console.log(temperatureValue);
  
  thisDay_temperature.textContent = convertTemperature(temperatureValue,currentUnit);
 convertUnitButton.textContent = "Unit : " + currentUnit;
 
})






