const api = {
  key: "eb64fe4ee08dbe8e8ddd2069e01dd31f",
  baseUrl: "api.openweathermap.org/data/2.5/",
};

navigator.geolocation.getCurrentPosition(success, error, options);

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function success(pos) {
  const latitude = pos.coords.latitude;
  const longtitude = pos.coords.longitude;
  console.log(latitude, longtitude);

  fetch(
    `https://${api.baseUrl}/weather?lat=${latitude}&lon=${longtitude}&appid=${api.key}&units=metric&lang=bg`
  )
    .then((res) => res.json())
    .then((data) => currentPos(data));
}

function currentPos(data) {
  console.log(data)
  const name = data.name;
  const description = data.weather[0].description;
  const temp = data.main.temp;
  const feels = data.main.feels_like;
  const icon = data.weather[0].icon;
  const wind = data.wind.speed;
  const domLocation = document.getElementsByClassName("location")[1];
  domLocation.innerHTML = `<p>Местоположение: ${name}</p>
<p><img src='http://openweathermap.org/img/w/${icon}.png'></p>
<p>Описание: ${description}</p>
<p>Темпрература: ${temp}&#176</p>
<p>Усеща се: ${feels}&#176</p>
<p>Скорост на вятъра: ${wind}m/s</p>`;
}
