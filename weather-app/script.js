const inp = document.querySelector("input");
const form = document.querySelector("form");
const labelCity = document.querySelector(".city");
const labelTemp = document.querySelector(".temp");
const labelWeather = document.querySelector(".weather");
const labelMinMax = document.querySelector(".hi-low");
// https://geocode.xyz/52.508,13.381?geoit=json.

const key = "f616cf0a4a999d2baa7ecfe8d8445bc2";


const getCity = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}&auth=925964099323857631431x66490?geoit=json`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Something Wen't Wrong! Refresh the page");
      }
      return res.json();
    })
    .then((res) => {
      getResults(res.city);
    })
    .catch((err) => alert(err));
};

const getLocation = function () {
  navigator.geolocation.getCurrentPosition(function (pos) {
    const { latitude: lat, longitude: lng } = pos.coords;
    getCity(lat, lng);
  });
};

console.log(getLocation());

const renderResults = function (data) {
  labelCity.textContent = `${data.name}, ${data.sys.country}`;
  labelWeather.textContent = `${data.weather[0].main}`;
  labelTemp.textContent = `${Math.round(data.main.temp) - 273}°c`;
  labelMinMax.textContent = `${Math.round(data.main.temp_min) - 273}°c / ${Math.round(data.main.temp_max) - 273
    }°c`;
};

const getResults = async function (city) {
  try {
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`
    );

    const data = await res.json();

    console.log(data);
    renderResults(data);
  } catch (err) {
    alert("Can't Find Location")
  }

};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  getResults(inp.value);
});
