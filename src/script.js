//   <button class="btn btn-outline-dark">Search</button>
//DATE

function nowDate() {
  let currentDate = new Date();

  let year = currentDate.getFullYear();
  let date = currentDate.getDate();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[currentDate.getMonth()];
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[currentDate.getDay()];

  let formattedDate = `${day} ${date} ${month} ${year} | ${hours} : ${minutes}`;
  return formattedDate;
}

//Place

//let form = document.querySelector("form");
//form.addEventListener("submit", submitCity);
//let cityName = response.data.name;
//let input = document.querySelector("#city");
//Celcius

function chooseCelsius(event) {
  event.preventDefault();
  warmthNow.innerHTML = "20";
  celcius.innerHTML = "°C";

  return celsiusTemp;
}
function chooseFahrenheit(event) {
  event.preventDefault();
  warmthNow.innerHTML = "86";
  farenheit.innerHTML = "°F";

  return fahrenheitTemp;
}

let warmthNow = document.querySelector("#warmth-now");
let celsius = document.querySelector("#celcius-farenheit");
let celsiusTemp = document.querySelector("#celcius-farenheit");
let fahrenheit = document.querySelector("#celcius-farenheit");
let fahrenheitTemp = document.querySelector("#celcius-farenheit");
let toCelsius = document.querySelector("#celcius");
let toFahrenheit = document.querySelector("#farenheit");

toCelsius.addEventListener("click", chooseCelsius);
toFahrenheit.addEventListener("click", chooseFahrenheit);

function showWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#warmth-now").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("span#current-weather-description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#current-humidity").innerHTML =
    response.data.main.humidity;

  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );

  document.querySelector("#current-wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
}

function submitCity(city) {
  let units = "metric";
  let apiKey = "086aa1bfd05c11e55d8cff81f8be5a37";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function handleSubmitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  submitCity(city);
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "086aa1bfd05c11e55d8cff81f8be5a37";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentDay = nowDate();
let span = document.querySelector("span#current-date");
span.innerHTML = currentDay;
let searchButton = document.querySelector("#submit-button");
searchButton.addEventListener("submit", handleSubmitCity);

let currentLocationButton = document.querySelector("#location-now");
currentLocationButton.addEventListener("click", getCurrentLocation);

submitCity("Reykjavik");
showWeather(response);
