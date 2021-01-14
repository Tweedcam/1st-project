let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = days[now.getDay()];
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let h2 = document.querySelector("h2");
h2.innerHTML = `${currentDay}</br> ${currentHour}:${minutes}`;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  event.prevent;
  let searchInput = document.querySelector("#city-input");
  let city = `${searchInput.value}`;
  let h1 = document.querySelector("#current-city");
  h1.innerHTML = `${city}`;
  let unit = "metric";
  let apiKey = "6a60b4e3bf611302bb287d289f5f7a29";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(cityTemp);
}

function searchCity(city) {
  let apiKey = "6a60b4e3bf611302bb287d289f5f7a29";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(cityTemp);
}

function defaultSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}


function cityTemp(response) {
  let p = document.querySelector("#city-temp");
  let temperature = Math.round(response.data.main.temp);
  p.innerHTML = `${temperature}°c`;
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML= response.data.name;
  let descriptionElement= document.querySelector("#description");
  descriptionElement.innerHTML=response.data.weather[0].description;
  
}


function currentLocation(position) {
  let lat =(position.coords.latitude);
  let lon = (position.coords.longitude);
  let key = "6a60b4e3bf611302bb287d289f5f7a29";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=${units}`;

  axios.get(apiUrl).then(cityTemp);
}


function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}


let locationButton= document.querySelector("#current-location");
locationButton.addEventListener("click",getCurrentLocation);

searchCity("London")