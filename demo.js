const lat = 58.7984;
const lng = 17.8081;

fetch(`https://api.stormglass.io/v1/weather/point?lat=${lat}&lng=${lng}`, {
    headers: {
        'Authorization': '1bd087b6-d186-11ea-a109-0242ac130002-1bd0886a-d186-11ea-a109-0242ac130002'
    }
}).then((response) => response.json()).then((jsonData) => {
    console.log(jsonData)
});