function formatDate(timestamp){
let date = new Date(timestamp);
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[date.getDay()];
return `${day} ${formatHours(timestamp)}`;

}

function formatHours(timestamp){
let date=new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

return `${hours}:${minutes}`;

}

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
  axios.get(apiUrl).then(cityTemp)

  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);

}


function showForecast(response){
  let forecastElement= document.querySelector("#forecast");
  forecastElement.innerHTML=null;
  let forecast= null;

  for (let index = 0; index <6; index++){
  let forecast=(response.data.list[index]);
forecastElement.innerHTML +=` 
   <div class="col-2" class="weatherForecast">
   <h4>${formatHours(forecast.dt*1000)}</h4>
  <img
   src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
   />
  <div id="forecast-temperature">
  <strong>${Math.round(forecast.main.temp_max)}°c</strong> <strong>${Math.round(forecast.main.temp_min)}°c</strong>
  </div>
 </div>  `;

  }


}

function searchCity(city) {
  
  let apiKey = "6a60b4e3bf611302bb287d289f5f7a29";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(cityTemp);

  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);

}



console.log(searchCity.data);
function defaultSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}


function cityTemp(response) {
  console.log(response.data);
  let dateElement = document.querySelector("#date-time");
  let temp = document.querySelector("#city-temp");
  let temperature = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement= document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let humid = Math.round(response.data.main.humidity);
  let feel = document.querySelector("#feels-like");
  let feelsLike = Math.round(response.data.main.feels_like);
  let weatherIcon = document.querySelector("#icon");
  let icon = (response.data.weather[0].icon);
  let timeZone= (response.data.timezone);

  celsiusTemperature=Math.round(response.data.main.temp)

  dateElement.innerHTML= formatHours(response.data.dt * 1000);
  humidity.innerHTML= `Humidity ${humid}% `;
  temp.innerHTML = `${temperature}`;
  cityElement.innerHTML= response.data.name;
  descriptionElement.innerHTML=response.data.weather[0].description;
  feel.innerHTML= `Feels like ${feelsLike}°c`;
  weatherIcon.setAttribute("src",`https://openweathermap.org/img/wn/${icon}@2x.png`);
  
}


function currentLocation(position) {
  let lat =(position.coords.latitude);
  let lon = (position.coords.longitude);
  let key = "6a60b4e3bf611302bb287d289f5f7a29";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=${units}`;

  axios.get(apiUrl).then(cityTemp);



  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);

}


function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}



function fahrenheitConvert(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#city-temp");
 let fahrenheitTemperature= (celsiusTemperature* 9) /5+ 32;
 temperatureElement.innerHTML=Math.round(fahrenheitTemperature);

 celsiusLink.classList.remove("active");
 fahrenheitLink.classList.add("active");

}

function celsiusConvert(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#city-temp");
  temperatureElement.innerHTML=Math.round(celsiusTemperature);

  celsiusLink.classList.add("active");
 fahrenheitLink.classList.remove("active");



}



let celsiusTemperature= null;



let locationButton= document.querySelector("#current-location");
locationButton.addEventListener("click",getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", fahrenheitConvert);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", celsiusConvert);


searchCity("London");


