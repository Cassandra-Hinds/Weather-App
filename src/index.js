let apiKey = "2718952144ed077c12e7c160fb6fc351";

function getForecast(coordinates) {
  let apiURLForecastEndpoint = `https://api.openweathermap.org/data/2.5/onecall`;
  let units = "imperial";
  let apiURLForecast = `${apiURLForecastEndpoint}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  console.log(apiURLForecast);
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `Lasted updated: ${day} ${hours}:${minutes}`;
}

function celsTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let celsTemperature = ((fahrenTemp - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsTemperature);
}

function fahrenTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");

  temperatureElement.innerHTML = Math.round(fahrenTemp);
}
function showForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
          <div class="col-2">
          <div class ="future-days">${day}</div>
       

          <div><i class="fas fa-sun future-icon"></i></div>
       

        
          <div class= "future-temperatures">
            73° <span class="min-temp">72°</span>
          </div>
        </div>
     `;
  });

  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

let time = document.querySelector(".day-and-time");

time.innerHTML = currentTime(now);

let fahrenTemp = null;

let celsLink = document.querySelector("#cels-link");

celsLink.addEventListener("click", celsTemperature);

let fahrenLink = document.querySelector("#fahren-link");

fahrenLink.addEventListener("click", fahrenTemperature);
