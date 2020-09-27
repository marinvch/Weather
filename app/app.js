let api = {
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
    err = 'Please enable Geolocation'
    alert(err)
}

function success(pos) {
    const latitude = pos.coords.latitude;
    const longtitude = pos.coords.longitude;

    fetch(`https://${api.baseUrl}/weather?lat=${latitude}&lon=${longtitude}&appid=${api.key}&units=metric&lang=bg`)
        .then((res) => res.json())
        .then((data) => todayWeather(data));
}



function todayWeather(data) {
    let deg = data.wind.deg;
    let current_rotation = deg;
    let name = data.name;
    let description = data.weather[0].description;
    let temp = data.main.temp;
    let feels = data.main.feels_like;
    let icon = data.weather[0].icon;
    let wind = data.wind.speed;
    let domLocation = document.querySelector(".today");
    domLocation.innerHTML = `<h4>${currentDate()}</h4>
<h1>${name}, ${data.sys.country}</h1>
<h2><img src='http://openweathermap.org/img/w/${icon}.png'> ${temp.toFixed(0)}&#176 </h2>
<p>${feels.toFixed(0)}&#176 ${description}  <img class="compass" src="./img/Compass-05.png" style="transform:rotate(${current_rotation+180}deg)" /> ${wind}m/s ${windDirection(deg)} </p>
<h5></h5>`;
};

function currentDate() {
    var d = new Date(),
        minutes = d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes(),
        hours = d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours(),
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear() + ' ' + hours + ':' + minutes;
}

function windDirection(deg) {
    switch (true) {
        case deg >= 360 && deg <= 21:
            return deg = "N";
        case deg >= 22 && deg <= 44:
            return deg = "NNE";
        case deg >= 45 && deg <= 66:
            return deg = "NE";
        case deg >= 67 && deg <= 89:
            return deg = "ENE";
        case deg >= 90 && deg <= 111:
            return deg = "E";
        case deg >= 112 && deg <= 134:
            return deg = "ESE";
        case deg >= 135 && deg <= 156:
            return deg = "SE";
        case deg >= 157 && deg <= 179:
            return deg = "SSE";
        case deg >= 180 && deg <= 201:
            return deg = "S";
        case deg >= 202 && deg <= 224:
            return deg = "SSW";
        case deg >= 225 && deg <= 246:
            return deg = "SW";
        case deg >= 247 && deg <= 269:
            return deg = "WSW";
        case deg >= 270 && deg <= 291:
            return deg = "W";
        case deg >= 292 && deg <= 314:
            return deg = "WNW";
        case deg >= 315 && deg <= 336:
            return deg = "NW";
        case deg >= 337 && deg <= 359:
            return deg = "NNW";
        default:
            return deg = "no data"
    }
}