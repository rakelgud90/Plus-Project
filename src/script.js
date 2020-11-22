//Times

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

  return `${day} ${date} ${month} ${year} | Last Updated: ${forecastHourlyHours(
    timestamp
  )}`;
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

function formatForecastDay(timestamp) {
  let date = new Date(timestamp);
  let fWeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let fWeekDay = fWeekDays[date.getDay()];

  return `${fWeekDay}`;
}

function formatForecastDate(timestamp) {
  let date = new Date(timestamp);
  let fDate = date.getDate();

  let fMonths = [
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
  let fMonth = fMonths[date.getMonth()];

  return `${fDate} ${fMonth}`;
}

let currentDay = nowDate();
let span = document.querySelector("span#current-date");
span.innerHTML = currentDay;

//Show the weather

function showWeather(response) {
  maxTempCelcius = response.data.main.temp_max;
  minTempCelcius = response.data.main.temp_min;
  celsiusTemperature = response.data.main.temp;
  windSpeed = response.data.wind.speed;

  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-date").innerHTML = nowDate(
    response.data.dt * 1000
  );
  document.querySelector("#warmth-now").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("span#current-weather-description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#current-humidity").innerHTML =
    response.data.main.humidity;

  document.querySelector("#max-temp").innerHTML = `${Math.round(
    maxTempCelcius
  )}°C`;
  document.querySelector("#min-temp").innerHTML = `${Math.round(
    minTempCelcius
  )}°C`;
  document.querySelector("#current-wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  document
    .querySelector("#today-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#today-icon")
    .setAttribute("alt", response.data.weather[0].description);

  let apiKey = "086aa1bfd05c11e55d8cff81f8be5a37";
  let units = "metric";
  let latitude = response.data.coord.lat;
  let longitude = response.data.coord.lon;

  let apiUrlHourly = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlHourly).then(showForecastHourly);

  let apiUrlDaily = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlDaily).then(showDailyForecast);
}

//Location Details

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
  let apiKey = "086aa1bfd05c11e55d8cff81f8be5a37";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

//Hourly Forecast API

function showForecastHourly(response) {
  let forecastHourlyElement = document.querySelector("div#hourly");
  forecastHourlyElement.innerHTML = null;
  let forecastHourly = null;

  for (let index = 0; index < 8; index++) {
    forecastHourly = response.data.hourly[index];

    forecastHourlyElement.innerHTML += `<div class="col-sm-3" class="hourly-forecast">
      <div class="card">
        <div class="card-body">
          <h5>${forecastHourlyHours(forecastHourly.dt * 1000)} </h5>
          
  
            <img
         src="http://openweathermap.org/img/wn/${
           forecastHourly.weather[0].icon
         }@2x.png" width="80" height="80"
      />
           <div> 
   <span class="hourly-row-1">
              <span
               class="temperature-warmth" >${Math.round(
                 forecastHourly.temp
               )}</span><span class="temperature-warmth-unit">°C</span>
             
        </span>
            <span class="hourly-row-2">
              <span class="weather-description-current">
                <i class="fas fa-tint"></i>
                ${forecastHourly.humidity}%
              </span>
</span>
          </div>
        </div>
      </div>
    </div>
  `;
  }
}

//Daily Forecast API

function showDailyForecast(response) {
  let dailyForecastElement = document.querySelector("#daily");
  dailyForecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 1; index < 7; index++) {
    forecast = response.data.daily[index];
    dailyForecastElement.innerHTML += `<div class="card">
<div class="card-body">
<div class="row forecast-information">
<div class="col-sm-6 forecast-dates">
<h6 class="forecast-day">${formatForecastDay(forecast.dt * 1000)}</h6>
</div>

<div class="col-sm-6 forecast-dates">
<h6>${formatForecastDate(forecast.dt * 1000)}</h6>
</div>
</div>
<div
class="row align-items-center justify-content-center forecast-information"
>
<div class="col-sm-6 forecast-weather-info">

<span class="temperature-warmth">${Math.round(forecast.temp.day)}</span>
<span class="temperature-warmth-unit">°C</span>
<br />
<span>
<i class="fas fa-tint" aria-hidden="true"></i>

${forecast.humidity}%

</span>
</div>
<div class="col-sm-6 forecast-icon">
 <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"  width="65" height="65"
      />
</div>
</div>
</div>
</div>
`;
  }
}

//Fahrenheit Converter

function showFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusConverter.classList.remove("active");
  fahrenheitConverter.classList.add("active");

  let temperatureF = document.querySelector("#warmth-now");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureF.innerHTML = `${Math.round(fahrenheiTemperature)}°F`;

  let windSpeedMiles = document.querySelector("#current-wind");
  let miles = windSpeed * 0.62137119223733;
  windSpeedMiles.innerHTML = `${Math.round(miles)} mph`;

  let maxTempFahrenheit = (maxTempCelcius * 9) / 5 + 32;

  let minTempFahrenheit = (minTempCelcius * 9) / 5 + 32;

  document.querySelector("#min-temp").innerHTML = `${Math.round(
    maxTempFahrenheit
  )}°F`;

  document.querySelector("#max-temp").innerHTML = `${Math.round(
    maxTempFahrenheit
  )}°F`;

  let temperatureWarmth = document.querySelectorAll(".temperature-warmth");

  temperatureWarmth.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  });

  let temperatureWarmthUnit = document.querySelectorAll(
    ".temperature-warmth-unit"
  );

  temperatureWarmthUnit.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = `°F`;
  });
}

//Celcius Converter

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusConverter.classList.add("active");
  fahrenheitConverter.classList.remove("active");

  let temperatureC = document.querySelector("#warmth-now");
  temperatureC.innerHTML = `${Math.round(celsiusTemperature)}°C`;

  let windSpeedKm = document.querySelector("#current-wind");

  windSpeedKm.innerHTML = `${Math.round(windSpeed)} km/h`;

  document.querySelector("#max-temp").innerHTML = `${Math.round(
    maxTempCelcius
  )}°C`;
  document.querySelector("#min-temp").innerHTML = `${Math.round(
    minTempCelcius
  )}°C`;

  let temperatureWarmth = document.querySelectorAll(".temperature-warmth");

  temperatureWarmth.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round(celsiusTemperature);
  });

  let temperatureWarmthUnit = document.querySelectorAll(
    ".temperature-warmth-unit"
  );

  temperatureWarmthUnit.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = `°C`;
  });
}

let celsiusTemperature = null;

let windSpeed = null;

let searchButton = document.querySelector("#submit-button");
searchButton.addEventListener("submit", handleSubmitCity);

let currentLocationButton = document.querySelector("#location-now");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitConverter = document.querySelector("#fahrenheit-converter");
fahrenheitConverter.addEventListener("click", showFahrenheitTemperature);

let celsiusConverter = document.querySelector("#celsius-converter");
celsiusConverter.addEventListener("click", showCelsiusTemperature);

submitCity("Reykjavik");
