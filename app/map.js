document.addEventListener("DOMContentLoaded", function() {
    navigator.geolocation.getCurrentPosition((position) => {
        postCord(position.coords);
        () => {
            fetch = ('https://ipinfo.io/geo', (response) => {
                var loc = response.loc.split(',');
                var coords = {
                    latitude: loc[0],
                    longitude: loc[1]
                };
                postCord(coords);
            });
        }
    }, );

    function postCord(coords) {
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

        const { latitude, longitude } = coords
        const marker = L.marker([0, 0], { icon: weatherIcon }).addTo(mymap);
        marker.setLatLng([latitude, longitude]);

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