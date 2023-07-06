
//Function to fetch weather data from API
function callForecast(locationText) {

    var searchLocation = locationText;
    var requestURL = 'http://api.weatherapi.com/v1/forecast.json?key=c5136b5d7b324af38a1103907232906&q=' + searchLocation + '&days=6';

    fetch(requestURL)
        .then(function (response) {
            if (!response.ok) {
                console.log("Error " + response.status);
            }
            return response.json();
        })
        .then((data) => {
            //console.log(data)
            this.displayWeather(data);
        })
}


function displayWeather(data) {
    var spacer = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
    var day;
    var degreeC = "&deg;C";
    //Render todays weather data for location on screen
    var cityNameEl = document.getElementById('cityName');
    cityNameEl.innerHTML = data.location.name + ", " + data.location.region + ", " + data.location.country;
    var currentConditionEl = document.getElementById('currentCondition');
    currentConditionEl.innerHTML = data.current.condition.text;
    var currentConditionImgEl = document.getElementById('currentConditionImg');
    var icon = 'https:' + data.current.condition.icon;
    currentConditionImgEl.setAttribute('src', icon);
    var currentTempEl = document.getElementById('currentTemp');
    currentTempEl.innerHTML = data.current.temp_c + degreeC;

    //Render 5 day forecast for location on screen
    for (var i = 1; i < data.forecast.forecastday.length; i++) {
        var dateEl;
        var forecastDay = data.forecast.forecastday[i];
        console.log(forecastDay);
        if (i === 1) {
            day = "tmws";
            dateEl = document.getElementById(day + 'Date')
            dateEl.innerHTML = 'Tomorrow';
        } else if (i === 2) {
            day = "twoDays";
            dateEl = document.getElementById(day + 'Date')
            dateEl.innerHTML = forecastDay.date;
        } else if (i === 3) {
            day = "threeDays";
            dateEl = document.getElementById(day + 'Date')
            dateEl.innerHTML = forecastDay.date;
        } else if (i === 4) {
            day = "fourDays";
            dateEl = document.getElementById(day + 'Date')
            dateEl.innerHTML = forecastDay.date;
        } else {
            day = "fiveDays";
            dateEl = document.getElementById(day + 'Date')
            dateEl.innerHTML = forecastDay.date;
        };
        console.log(day);
        var CondImgEl = document.getElementById(day + 'CondImg');
        var TempLowEl = document.getElementById(day + 'TempLow');
        var TempHighEl = document.getElementById(day + 'TempHigh');

        CondImgEl.setAttribute('src', 'http:' + forecastDay.day.condition.icon);
        CondImgEl.setAttribute('alt', forecastDay.day.condition.text);
        TempLowEl.innerHTML = forecastDay.day.mintemp_c + degreeC + spacer;
        TempHighEl.innerHTML = forecastDay.day.maxtemp_c + degreeC;
    }

}
