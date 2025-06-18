const API_KEY = "LK4WZR3576JYHX48RDMHM8Y4S";
async function fetchData(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${API_KEY}&contentType=json`,
      { mode: "cors" }
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return console.error("Something went wrong", error);
  }
}

async function processData(data, day) {
  if (!data) return;
  const currentDay = data.days[day];
  const currentConditions = data.currentConditions;
  if (!currentDay) {
    console.error("This day does not available");
    return;
  }
  return {
    city: data.resolvedAddress,
    date: currentDay.datetime,
    temperature: currentConditions.temp,
    description: currentDay.description,
    humidity: currentConditions.humidity,
    windSpeed: currentConditions.windspeed,
    icon: currentConditions.icon,
    sunrise:currentConditions.sunrise,
    sunset:currentConditions.sunset,
    uvindex:currentConditions.uvindex
  };
}

async function getWeatherDataForCity(city, day) {
  const rawData = await fetchData(city);
  const weatherInfo = await processData(rawData, day);
  
  return weatherInfo;
}

export { getWeatherDataForCity };



