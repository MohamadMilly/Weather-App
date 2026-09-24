const API_KEY = "LK4WZR3576JYHX48RDMHM8Y4S";

export async function getWeatherForLocation(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${API_KEY}&contentType=json`,
  );
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP ${response.status}: ${errorText || response.statusText}`,
    );
  }
  return response.json();
}
