const apiKey = "b69cb3d133e51654aab8c89b2d28c293";
const form = document.querySelector("form");
const main = document.querySelector("main");
const search = document.querySelector("#search");
const url = (location) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
async function getWeatherByLocation(location) {
  const resp = await fetch(url(location), {
    origin: "cors",
  });
  const respData = await resp.json();
  addWeatherToPage(respData);
}

function addWeatherToPage(data) {
  const temp = KtoC(data.main.temp);
  const weatherEl = document.createElement("div");
  weatherEl.classList.add("weather");
  weatherEl.innerHTML = `<div><img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"><h2>${temp}°C</h2></div>
  `;
  //clean the previous search
  main.innerHTML = "";
  main.appendChild(weatherEl);
}

function KtoC(K) {
  return (K - 273.15).toFixed(2);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const location = search.value;

  if (location) {
    getWeatherByLocation(location);
  }
});
