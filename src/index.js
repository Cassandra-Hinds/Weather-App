let apiKey = "2718952144ed077c12e7c160fb6fc351";

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
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
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

let time = document.querySelector(".day-and-time");

time.innerHTML = currentTime(now);

let fahrenTemp = null;

let celsLink = document.querySelector("#cels-link");

celsLink.addEventListener("click", celsTemperature);

let fahrenLink = document.querySelector("#fahren-link");

fahrenLink.addEventListener("click", fahrenTemperature);
