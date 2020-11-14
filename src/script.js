//   <button class="btn btn-outline-dark">Search</button>
//DATE

function nowDate(timestamp) {
  let currentDate = new Date(timestamp);

  let year = currentDate.getFullYear();
  let date = currentDate.getDate();

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

  return `${day} ${date} ${month} ${year} | ${forecastHourlyHours(timestamp)}`;
}
function forecastHourlyHours(timestamp) {
  let currentDate = new Date(timestamp);
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

let currentDay = nowDate();
let span = document.querySelector("span#current-date");
span.innerHTML = currentDay;

//Place

//let form = document.querySelector("form");
//form.addEventListener("submit", submitCity);
//let cityName = response.data.name;
//let input = document.querySelector("#city");
//Celcius

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

  document.querySelector("#current-date").innerHTML = nowDate(
    response.data.dt * 1000
  );
  celsiusTemperature = response.data.main.temp;
}

function showForecastHourly(response) {
  let forecastHourlyElement = document.querySelector("div#hourly");
  forecastHourlyElement.innerHTML = null;
  let forecastHourly = null;

  for (let index = 0; index < 4; index++) {
    forecastHourly = response.data.list[index];

    forecastHourlyElement.innerHTML += `<div class="col-sm-3" class="hourly-forecast">
      <div class="card">
        <div class="card-body">
          <h5 class="hourly-time">${forecastHourlyHours(
            forecastHourly.dt * 1000
          )} PM</h5>
          <br />

          <span>
            <i class="fas fa-cloud-rain current"></i>
          </span>
          <div class="row">
            <div class="col-sm-6 hourly-row">
              <span>${Math.round(forecastHourly.main.temp)}</span>
              <span class="temperature-unit">°C</span>
            </div>
            <div class="col-sm-6 hourly-row">
              <span class="weather-description-current">
                <i class="fas fa-tint"></i>
                ${forecastHourly.main.humidity}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  }
}

function submitCity(city) {
  let units = "metric";
  let apiKey = "086aa1bfd05c11e55d8cff81f8be5a37";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);

  let apiUrlHourly = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlHourly).then(showForecastHourly);
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

function showFahrenheitTemperature(event) {
  event.preventDefault();

  let temperatureF = document.querySelector("#warmth-now");
  celsiusConverter.classList.remove("active");
  fahrenheitConverter.classList.add("active");

  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureF.innerHTML = Math.round(fahrenheiTemperature);

  let temperatureUnit = document.querySelector("#temperature-unit");
  temperatureUnit.innerHTML = `°F`;
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusConverter.classList.add("active");
  fahrenheitConverter.classList.remove("active");
  let temperatureC = document.querySelector("#warmth-now");
  temperatureC.innerHTML = Math.round(celsiusTemperature);
  let temperatureUnit = document.querySelector("#temperature-unit");
  temperatureUnit.innerHTML = `°C`;
}

let celsiusTemperature = null;

let searchButton = document.querySelector("#submit-button");
searchButton.addEventListener("submit", handleSubmitCity);

let currentLocationButton = document.querySelector("#location-now");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitConverter = document.querySelector("#fahrenheit-converter");
fahrenheitConverter.addEventListener("click", showFahrenheitTemperature);

let celsiusConverter = document.querySelector("#celsius-converter");
celsiusConverter.addEventListener("click", showCelsiusTemperature);

submitCity("Reykjavik");
