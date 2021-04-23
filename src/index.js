function formatDate(date) {
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currentDay = days[date.getDay()];

  return `${currentDay} ${currentHour}:${currentMinutes}`;
}
let currentTime = document.querySelector("#current-time");
let currentDate = new Date();
currentTime.innerHTML = formatDate(currentDate);

function displayCity(event) {
  event.preventDefault();
  let apiKey = "576745a04c3376d5329a519bd2c46d25";
  let city = document.querySelector("#city-search-bar").value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let citySearchBar = document.querySelector("#city-form");
citySearchBar.addEventListener("submit", displayCity);

function convertToCelsius(event) {
  event.preventDefault();
  let headerTemp = document.querySelector("#main-temp");
  headerTemp.innerHTML = 18;
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

function showTemperature(response) {
  document.querySelector("#header-city").innerHTML = response.data.name;
  document.querySelector("#main-temp").innerHTML = Math.round(
    response.data.main.temp
  );

  let maxTemperature = Math.round(response.data.main.temp_max);
  let minTemperature = Math.round(response.data.main.temp_min);
  document.querySelector(
    "#temp-max-min-today"
  ).innerHTML = `${maxTemperature}° / ${minTemperature}°`;

  let description = response.data.weather[0].main;
  let descriptionInput = document.querySelector("#description-index");
  descriptionInput.innerHTML = `${description}`;
}

function search(city) {
  let apiKey = "576745a04c3376d5329a519bd2c46d25";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-bar").value;
  search(city);
}

search("maracaibo");

let chooseCity = document.querySelector("#weather-button");
chooseCity.addEventListener("submit", handleSubmit);

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apikey = "576745a04c3376d5329a519bd2c46d25";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let currentLocationIcon = document.querySelector("#current-location");
currentLocationIcon.addEventListener("click", getCurrentLocation);