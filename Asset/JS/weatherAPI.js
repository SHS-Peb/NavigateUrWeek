var baseURL = 'http://api.weatherapi.com/v1/';
var forecast = 'forecast.json?';
var current = 'current.json?';
var key = 'key=c5136b5d7b324af38a1103907232906';
var searchLocation;
var finalURL;

searchLocation = "Sydney"

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
            console.log(data)
            this.displayWeather(data);
        })
}


function displayWeather(data) {
    var weatherEl = document.getElementsByClassName('desti-weather')
    var cityNameEl = document.createElement('div')
    cityNameEl.textContent = data.location.name + ", " + data.location.region + ", " + data.location.country

    var currentTempEl = document.createElement('div')
    currentTempEl.textContent = data.current.feelslike_c
}


// a duplication of callApi but to be exported
export function callWeatherApi(location) {

    console.log(`callWeatherApi called, ${location}`);
    // use the location arguement from the mapBox function, -- Horace commented
    finalURL = baseURL + forecast + key + '&q=' + location;

    fetch(requestUrl)
        .then(function (response) {
            if (!response.ok) {
                console.log("Error " + response.status)
            }
            console.log(response)
            return response.json();
        })
        .then((data) => {
            console.log(data)
            this.displayWeather(data);
        })
}
