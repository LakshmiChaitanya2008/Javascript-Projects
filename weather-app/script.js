const inp = document.querySelector("input");
const form = document.querySelector("form");
const labelCity = document.querySelector(".city");
const labelTemp = document.querySelector(".temp");
const labelWeather = document.querySelector(".weather");
const labelMinMax = document.querySelector(".hi-low");

const key = "d7681e7535a4b5a75b255b1ab312d798";
const keyLocation = "pk.de9b2c7acf1405437d83751bf89e297e";

// Getting City With lat,lng
const getCity = function (lat, lng) {
  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=573bb7557b384d8897f6bcfa8f2cf803`
  )
    .then((res) => res.json())
    .then((res) => {
      const city = res.features[0].properties.city;
      getResults(city);
    })
    .catch((error) => alert(error));
};

// Getting User Location
const getLocation = function () {
  navigator.geolocation.getCurrentPosition(function (pos) {
    const { latitude: lat, longitude: lng } = pos.coords;
    getCity(lat, lng);
  });
};

getLocation();

// Rendering Results from getResults
const renderResults = function (data) {
  labelCity.textContent = `${data.name} ${
    data.sys.country === undefined ? "" : `,${data.sys.country}`
  }`;
  labelWeather.textContent = `${data.weather[0].main}`;
  labelTemp.textContent = `${Math.round(data.main.temp) - 273}°c`;
  labelMinMax.textContent = `${Math.round(data.main.temp_min) - 273}°c / ${
    Math.round(data.main.temp_max) - 273
  }°c`;
};

// Fetching Weather by city
const getResults = async function (city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    );

    const data = await res.json();

    renderResults(data);
  } catch (err) {
    alert("Can't Find Location");
  }
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  getResults(inp.value);
});
