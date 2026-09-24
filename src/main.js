import * as api from "./api.js";
import * as view from "./view.js";
import * as unitStore from "./unitStore.js";
import "./styles.css";

const weather = await api.getWeatherForLocation("Damascus");

if (weather) {
  view.renderWeather(weather, unitStore.getUnit());
}
view.syncToggleButtonLabel(unitStore.getUnit());

const handleToggleUnit = () => {
  const previousUnit = unitStore.getUnit();
  const nextUnit = unitStore.toggleUnit();
  view.updateUnit(previousUnit, nextUnit);
};

const handleSearchWeather = async (query) => {
  try {
    view.showLoading();
    const weather = await api.getWeatherForLocation(query);

    view.renderWeather(weather, unitStore.getUnit());
  } catch (err) {
    view.showError(err.message);
    console.error("Error: ", err);
  } finally {
    view.removeLoading();
  }
};

view.bindToggleUnit(handleToggleUnit);
view.bindSearchTodo(handleSearchWeather);
