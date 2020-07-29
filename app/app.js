// app key
const app = {
    key: '6b1a8f471d1a6dbb35e2eda0fd6cb56f',
    baseUrl: 'api.openweathermap.org/data/2.5',
    reqOptions: {
        method: 'GET',
        redirect: 'follow'
    }

};
//app inputs
const inputs = {
    input: document.querySelector('input'),
    btn: document.querySelector('button')
};

inputs.btn.addEventListener('click', getData);

function getData() {

    let city = document.querySelector('input').value
    fetch(`http://${app.baseUrl}/weather?q=${city}&appid=${app.key}&lang=bg&units=metric`, app.reqOptions)
        .then(response => response.json())
        .then(result => displayData(result))
        .catch(error => console.log('404 not Found'));

}


function displayData(result) {
    console.log(result)
    const info = {
        description: document.getElementById('description'),
        cityname: document.getElementById('city'),
        temperature: document.getElementById('temperature'),
        wind: document.getElementById('wind')
    };



    info.description.innerHTML = `${result.weather[0].description}`;
    info.cityname.innerHTML = `Град: ${result.name}`;
    info.temperature.innerHTML = `Температура: ${result.main.temp}`;
    info.wind.innerHTML = `Вятър: ${result.wind.speed}м/с`;

};


const currentPosition = navigator.geolocation.getCurrentPosition((_position) => {
    let lat = _position.coords.latitude;
    let long = _position.coords.longitude
    if (_position) {

        fetch(`http://${app.baseUrl}/weather?lat=${lat}&lon=${long}&appid=${app.key}&lang=bg&units=metric`)
            .then(response => response.json())
            .then(result => currentWeather(result))
            .catch(error => console.log('404 not Found'));
    } else {
        alert('Please use your Location to display the data')
    }
})

function currentWeather(result) {
    const fields = {
        icon: document.getElementById('currentIcon'),
        description: document.getElementById('currentDescription'),
        city: document.getElementById('currentCity'),
        temperature: document.getElementById('currentTemperature'),
        wind: document.getElementById('currentWind'),
    }

    let url = "http://openweathermap.org/img/w/"

    fields.icon.innerText = "http://openweathermap.org/img/w/" + result.weather[0].icon + ".png",
        fields.description.textContent = `${result.weather[0].description}`;
    fields.city.textContent = `Град: ${result.name}`;
    fields.temperature.textContent = `Температура: ${result.main.temp}`
    fields.wind.textContent = `Вятър: ${result.wind.speed}м/с`;
}