let apiKey = "2718952144ed077c12e7c160fb6fc351";

function getForecast(coordinates) {
  let apiURLForecastEndpoint = `https://api.openweathermap.org/data/2.5/onecall`;
  let units = "imperial";
  let apiURLForecast = `${apiURLForecastEndpoint}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiURLForecast).then(showForecast);
}
function weather(response) {
  fahrenTemp = response.data.main.temp;

  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(fahrenTemp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector(".weather").innerHTML = response.data.weather[0].main;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();

  let city = document.querySelector("#search-text-input").value;
  let apiUrlSearchEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "imperial";

  let apiUrlSearch = `${apiUrlSearchEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlSearch).then(weather);
}

let form = document.querySelector("#search-form");

form.addEventListener("submit", search);

function CurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrlCurrentEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "imperial";
  let apiUrlCurrent = `${apiUrlCurrentEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlCurrent).then(weather);
}

function position(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(CurrentLocation);
}

let button = document.querySelector("button");
button.addEventListener("click", position);

let now = new Date();

function currentTime() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];

  let hours = now.getHours();

  let minutes = now.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `Lasted updated: ${day} ${hours}:${minutes}${ampm}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index >= 1) {
      forecastHtml =
        forecastHtml +
        `
          <div class="col-2">
          <div class ="future-days">${formatDay(forecastDay.dt)}</div>
       

            <img src = "http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" />
       

        
          <div class= "future-temperatures">
            ${Math.round(
              forecastDay.temp.max
            )}° <span class="min-temp">${Math.round(
          forecastDay.temp.min
        )}°</span>
          </div>
        </div>
     `;
    }
  });

  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

let time = document.querySelector(".day-and-time");

time.innerHTML = currentTime(now);
