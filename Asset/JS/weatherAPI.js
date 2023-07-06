function callForecast(locationText) {
    var baseURL = 'http://api.weatherapi.com/v1/forecast.json?';
    var key = 'key=c5136b5d7b324af38a1103907232906';
    var searchLocation = locationText;
    var finalURL;

    searchLocation = 'Sydney'

    finalURL = baseURL + key + '&q=' + searchLocation + '&days=5';

    fetch(finalURL)
        .then(function (response) {
            if (!response.ok) {
                console.log("Error " + response.status)
            }
            return response.json();
        })
        .then((data) => {
            console.log(data)
            this.displayWeather(data);
        })
}


function displayWeather(data) {
    var weatherEl = document.getElementById('destination-weather');
    var cityNameEl = document.createElement('p');
    cityNameEl.innerHTML = data.location.name + ", " + data.location.region + ", " + data.location.country;
    // console.log(cityNameEl.innerHTML);
    weatherEl.appendChild(cityNameEl);
    var currentConditionEl = document.createElement('p');
    currentConditionEl.innerHTML = data.current.condition.text;
    weatherEl.appendChild(currentConditionEl);
    var currentConditionImg = document.createElement('img');
    var icon = 'https:' + data.current.condition.icon
    console.log(icon)
    currentConditionImg.setAttribute('src', icon)
    currentConditionEl.appendChild(currentConditionImg)
    var currentTempEl = document.createElement('p');
    currentTempEl.innerHTML = "Current Temperature: " + data.current.temp_c;
    // console.log(currentTempEl.innerHTML)
    weatherEl.appendChild(currentTempEl)

}


var temporaryLocation = "Sydney"


callForecast(temporaryLocation)