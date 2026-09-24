let currentUnit = localStorage.getItem("unit") ?? "F";

export function toggleUnit() {
  const nextUnit = currentUnit === "F" ? "C" : "F";
  localStorage.setItem("unit", nextUnit);
  currentUnit = nextUnit;
  return nextUnit;
}

export function getUnit() {
  return currentUnit;
}
