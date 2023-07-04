var baseURL = 'http://api.weatherapi.com/v1/';
var forecast = 'forecast.json?';
var current = 'current.json?';
var key = 'key=c5136b5d7b324af38a1103907232906';
var searchLocation = 'Sydney';
var finalURL;



// var getLocation = function () {
//     searchLocation = localStorage.getItem('location');
//     if (searchLocation == null) {
//         searchLocation = "Sydney";
//     };
// };

// getLocation();

finalURL = baseURL + forecast + key + '&q=' + searchLocation;

callApi(finalURL)


function callApi(requestUrl) {
    fetch(requestUrl)
        .then(function (response) {
            if (!response.ok) {
                console.log("Error " + response.status)
            }
            console.log(response)
            return response.json();
        })
        .then((data) => {
            this.displayWeather(data);
        })
}


function displayWeather(data) {
    var cityNameEl = document.getElementById('cityName')
    cityNameEl.textContent = data.location.name + ", " + data.location.region + ", " + data.location.country
    var currentTempEl = document.getElementById('currentTemp')
    currentTempEl.textContent = data.current.feelslike_c
}