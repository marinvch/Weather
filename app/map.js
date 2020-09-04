document.addEventListener("DOMContentLoaded", function () {
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

    const attribution ='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
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
     
    mymap.addLayer(new L.TileLayer(`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=eb64fe4ee08dbe8e8ddd2069e01dd31f`))
  
   
    marker.bindPopup(`My Location is ${crd.latitude},${crd.longitude}`).openPopup();
  
}







  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
});
