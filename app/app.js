const app = {
    key: '6b1a8f471d1a6dbb35e2eda0fd6cb56f',
    baseUrl: 'api.openweathermap.org/data/2.5',
    reqOptions: {
        method: 'GET',
        redirect: 'follow',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/plain"
        },
    }

};
//app inputs
const inputs = {
    input: document.querySelector('input'),
    btn: document.querySelector('button')
};

inputs.input.addEventListener('keyup', getData);

function getData() {
    let city = document.querySelector('input').value

    fetch(`http://${app.baseUrl}/weather?q=${city}&appid=${app.key}&units=metric`)
        .then(response => response.json())
        .then(result => displayData(result))
        .catch(error => console.log('404 not Found'));

};

function displayData(result) {

    const info = {
        description: document.getElementById('description'),
        cityname: document.getElementById('city'),
        temperature: document.getElementById('temperature'),
        wind: document.getElementById('wind')
    };

    let name = result.name
    let city = document.querySelector('input').value
    if (city !== '') {


        info.description.innerHTML = `${result.weather[0].description}`;
        info.cityname.innerHTML = `Град: ${result.name}`;
        info.temperature.innerHTML = `Температура: ${result.main.temp}`;
        info.wind.innerHTML = `Вятър: ${result.wind.speed}м/с`;

    } else {
        info.description.innerHTML = ''
        info.cityname.innerHTML = ''
        info.temperature.innerHTML = ''
        info.wind.innerHTML = ''
    }



};

const ipKey = '2c2637df1b55c4';


function currentWeather(result) {
    const fields = {
        icon: document.getElementById('currentIcon'),
        description: document.getElementById('currentDescription'),
        city: document.getElementById('currentCity'),
        temperature: document.getElementById('currentTemperature'),
        wind: document.getElementById('currentWind'),
    }

    fields.city.textContent = `Град: ${result.name}`;
    fields.temperature.textContent = `Температура: ${result.main.temp}`
    fields.wind.textContent = `Вятър: ${result.wind.speed}м/с`;
    fields.description.textContent = `${result.weather[0].description}`;

}


function do_something(coords) {

    fetch(`http://${app.baseUrl}/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${app.key}&lang=bg&units=metric`)
        .then(response => response.json())
        .then(result => currentWeather(result))
        .catch(error => console.log('404 not Found'));

}

navigator.geolocation.getCurrentPosition((position) => {
        do_something(position.coords);
        () => {
            fetch = ('https://ipinfo.io/geo', (response) => {
                var loc = response.loc.split(',');
                var coords = {
                    latitude: loc[0],
                    longitude: loc[1]
                };
                do_something(coords);
            });
        }
    },

);

const googleApi = 'AIzaSyBu8-exdzeJa1o6zsm3l0Qk6h8tv4tbGQM'
const crossOrgin = {

}

fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${googleApi}`, {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/plain"
        }
    })
    .then(response => response.json())
    .then(result => console.log(result))