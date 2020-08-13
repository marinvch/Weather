document.addEventListener("DOMContentLoaded", function() {
    // fetch('http://ip-api.com/json')
    //     .then(res => res.json())
    //     .then(data => postCord(data))

    const location = 'https://ipinfo.io?token=2c2637df1b55c4'
    fetch(location)
        .then(res => res.json())
        .then(data => {
            const [lat, long] = data.loc.split(',')
            postCord(lat, long)
        })

    function postCord(lat, long) {

        //Making the map
        const mymap = L.map('mapid').setView([0, 0], 1);
        const attribution = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
        const tileUrl = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
        const tiles = L.tileLayer(tileUrl, { attribution })
        tiles.addTo(mymap);

        //Making a marker with custom Icon
        const weatherIcon = L.icon({
            iconUrl: '../img/marker_icon.png',
            iconSize: [32, 32],
            iconAnchor: [25, 16],
            popupAnchor: [-3, -76],

        });

        const marker = L.marker([0, 0], { icon: weatherIcon }).addTo(mymap);
        marker.setLatLng([lat, long]);

        const mapLayerToken = 'pk.eyJ1IjoibWFyaW52Y2giLCJhIjoiY2tka2E0NnY4MG1zZjJ0bzh6bXp5dnBsaiJ9.FGZZfWXBjrZ9WIw8PRo1iA'

        // const popup = L.popup()
        //     .setLatLng(latlng)
        //     .setContent('<p>Hello world!<br />This is a nice popup.</p>')
        //     .openOn(map);

        const app = {
            key: '6b1a8f471d1a6dbb35e2eda0fd6cb56f',
            baseUrl: 'api.openweathermap.org/data/2.5',
        };

        //NEW CODE
    }

});