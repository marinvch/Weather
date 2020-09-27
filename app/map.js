document.addEventListener("DOMContentLoaded", function() {
    navigator.geolocation.getCurrentPosition(success, error, options);
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    function success(pos) {
        var crd = pos.coords;

        const mymap = L.map("mapid", {
            center: [crd.latitude, crd.longitude],
            zoom: 10,

        });

        const attribution =
            '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
        const tileUrl = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`;
        const tiles = L.tileLayer(tileUrl, { attribution });
        tiles.addTo(mymap);

        const weatherIcon = L.icon({
            iconUrl: "../img/marker_icon.png",
            iconSize: [32, 32],
            iconAnchor: [25, 16],
            popupAnchor: [-3, -76],
        });

        const marker = L.marker([0, 0], { icon: weatherIcon }).addTo(mymap);
        marker.setLatLng([crd.latitude, crd.longitude]);

        const wind = new L.TileLayer(
            `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=eb64fe4ee08dbe8e8ddd2069e01dd31f`
        );
        const cloulds = new L.TileLayer(
            `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=eb64fe4ee08dbe8e8ddd2069e01dd31f`
        );

        const precision = new L.TileLayer(
            `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=eb64fe4ee08dbe8e8ddd2069e01dd31f`
        );
        const temperature = new L.TileLayer(
            `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=eb64fe4ee08dbe8e8ddd2069e01dd31f`
        );



        // Layer Grouping

        // const weatherLayers = L.layerGroup([wind, cloulds]);
        const OverlayLayers = {
            wind: wind,
            cloulds: cloulds,
            precision: precision,
            temperature: temperature
        };

        //add layer control

        L.control.layers(null, OverlayLayers).addTo(mymap);

        //
        marker
            .bindPopup(`Вашите Кординати: ${crd.latitude.toFixed(2)} : ${crd.longitude.toFixed(2)}`)
            .openPopup();
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
});