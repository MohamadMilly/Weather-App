import { backgrounds } from "./backgrounds.js";
import { iconsSvg } from "./icons.js";

export function formatDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatNumber(value) {
  return Math.round(value);
}

export function getIcon(icon) {
  return iconsSvg[icon] ?? "";
}

export function getTemperature(value, currentUnit, fromUnit = "F") {
  let temperature = value;

  if (fromUnit !== currentUnit) {
    temperature =
      fromUnit === "F" ? ((value - 32) * 5) / 9 : (value * 9) / 5 + 32;
  }

  return formatNumber(temperature);
}

export function getBackground(icon) {
  return backgrounds[icon] ?? backgrounds.cloudy;
}
