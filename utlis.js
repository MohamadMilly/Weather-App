let currentUnit = "F";
function convertTemperature(value) {
  if (!value) return;
  if (typeof value !== "number") {
    throw new Error("Temperature value must be a number.");
  }
  if (currentUnit === "C") {
    currentUnit = "F";
    return parseInt(value * (9 / 5) + 32) + "°F";
  } else if (currentUnit === "F") {
    currentUnit = "C";
    return parseInt((value - 32) * (5 / 9)) + "°C";
  } else {
    throw new Error("Invalid unit. Use 'C' for Celsius or 'F' for Fahrenheit.");
  }
}

const BASE_IP_URL = "https://ipapi.co/json";

export async function getUserServerLocation() {
  try {
    const response = await fetch(`${BASE_IP_URL}`, { mode: "cors" });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    const location = await response.json();
    return location;
  } catch (error) {
    console.error("Failed to fetch location data:", error);
    // throw error;
  }
}

function getTemperature(value) {
  if (!value) return;
  if (typeof value !== "number") {
    throw new Error("Temperature value must be a number.");
  }

  if (currentUnit === "C") {
    return ((value - 32) * (5 / 9)).toFixed(1);
  } else if (currentUnit === "F") {
    return value;
  } else {
    throw new Error("Invalid unit. Use 'C' for Celsius or 'F' for Fahrenheit.");
  }
}
// deprecated
function changeClass(element, class1, class2) {
  if (element.classList.contains(class1)) {
    element.classList.remove(class1);
    element.classList.add(class2);
  } else if (element.classList.contains(class2)) {
    element.classList.add(class1);
    element.classList.remove(class2);
  } else {
    element.classList.add(class1);
  }
}

function formatDate(date) {
  const locationDate = new Date(date);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Saturday",
  ];
  const day = days[locationDate.getDay()];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[locationDate.getMonth()];

  return `${day}, ${month}, ${locationDate.getFullYear()}`;
}

export {
  convertTemperature,
  getTemperature,
  changeClass,
  currentUnit,
  formatDate,
};
