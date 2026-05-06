// eslint-disable-next-line
const API_KEY = "LK4WZR3576JYHX48RDMHM8Y4S";
async function fetchWeatherData(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=EL34NM8XBE8PNVXKF274QDPJG&contentType=json`,
    );
    if (!response.ok) {
      throw new Error("Server responded with status code: ", response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return alert("Something went wrong: ", error.message);
  }
}

async function processData(data, day) {
  if (!data) return;
  const currentDay = data.days[day];
  if (!currentDay) {
    console.error("This day is not available");
    return;
  }
  return {
    city: data.resolvedAddress,
    date: currentDay.datetime,
    temperature: currentDay.temp,
    description: currentDay.description,
    humidity: currentDay.humidity,
    windSpeed: currentDay.windspeed,
    icon: currentDay.icon,
    sunrise: currentDay.sunrise,
    sunset: currentDay.sunset,
    uvindex: currentDay.uvindex,
  };
}

async function getCityWeather(city, day) {
  const rawData = await fetchWeatherData(city);
  const weatherInfo = await processData(rawData, day);
  
  return weatherInfo;
}

export { getCityWeather };
