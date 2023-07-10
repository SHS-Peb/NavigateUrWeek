
// Function to fetch current weather data from API
function callWeather(locationText, currentCard) {
    var searchLocation = locationText;
    var requestURL = 'https://api.weatherapi.com/v1/current.json?key=c5136b5d7b324af38a1103907232906&q=' + searchLocation + '&aqi=no';

    fetch(requestURL)
        .then(function (response) {
            if (!response.ok) {
                console.log("Error " + response.status);
            }
            return response.json();
        })
        .then((data) => {
            //console.log(data)
            this.displayWeather(data, currentCard);
        })
}

function displayWeather(data, currentCard) {
    var degreeC = "&deg;C"
    // console.log(data);
    // console.log(currentCard);

    //Assigning variables to html elements
    tempEl = currentCard.querySelector('.currentWeather');
    conditionImgEl = currentCard.querySelector('.currentConditionIcon');
    icon = 'https:' + data.current.condition.icon;
    // Rendering weather data into html elements.
    tempEl.innerHTML = "Current Temperature: " + data.current.temp_c + degreeC;
    conditionImgEl.setAttribute('src', icon);
    conditionImgEl.setAttribute('alt', data.current.condition.text)
}


//Function to fetch weather forecast data, for the location provided by the MapBoxAPI, from the WeatherAPI
function callForecast(locationText) {

    var searchLocation = locationText;
    // console.log(searchLocation)
    var requestURL = 'https://api.weatherapi.com/v1/forecast.json?key=c5136b5d7b324af38a1103907232906&q=' + searchLocation + '&days=6';
    // console.log(requestURL)

    fetch(requestURL)
        .then(function (response) {
            if (!response.ok) {
                console.log("Error " + response.status);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data)
            this.displayForecast(data);
        })
}

// Function to display fetched forecast weather data onto screen - coded for locationSearch.html
function displayForecast(forecastData) {

    // Varibles for reused html strings
    var spacer = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
    var degreeC = "&deg;C";

    //Render todays weather on screen
    // Assigning variables to the html elements that will be changed
    var cityNameEl = document.getElementById('cityName');
    var currentConditionEl = document.getElementById('currentCondition');
    var currentConditionImgEl = document.getElementById('currentConditionImg');
    var currentTempEl = document.getElementById('currentTemp');
    //Changing the innerhtml content of the html elements with data from the fetched data.
    cityNameEl.innerHTML = forecastData.location.name + ", " + forecastData.location.region + ", " + forecastData.location.country;
    currentConditionEl.innerHTML = forecastData.current.condition.text;
    currentTempEl.innerHTML = forecastData.current.temp_c + degreeC;
    //Changing the src attribute for the current condition img element to the link provided by the api.
    currentConditionImgEl.setAttribute('src', 'https:' + forecastData.current.condition.icon);

    //Loop to render the fetched 5 day forecast on screen (skipping array item 0 as that is the current day)
    for (var i = 1; i < forecastData.forecast.forecastday.length; i++) {
        var day;
        var dateEl;
        var forecastDay = forecastData.forecast.forecastday[i];
        //console.log(forecastDay);

        //Changes varible day depending on i
        if (i === 1) {
            day = "tmws";
            // Renders "Tomorrow" on screen instead of date
            dateEl = document.getElementById(day + 'Date')
            dateEl.innerHTML = 'Tomorrow';
        } else if (i === 2) {
            day = "twoDays";
        } else if (i === 3) {
            day = "threeDays";
        } else if (i === 4) {
            day = "fourDays";
        } else {
            day = "fiveDays";

        };
        // Shows date for every day that isnt 'tomorrow'
        if (day != "tmws") {
            dateEl = document.getElementById(day + 'Date')
            dateEl.innerHTML = forecastDay.date;
        }
        //console.log(day);
        //Assigning varibles to html elements that will be changed
        var CondImgEl = document.getElementById(day + 'CondImg');
        var TempLowEl = document.getElementById(day + 'TempLow');
        var TempHighEl = document.getElementById(day + 'TempHigh');
        // Changing the src and alt attributes of the condition image element to reflect the forecast condition for that day.
        CondImgEl.setAttribute('src', 'https:' + forecastDay.day.condition.icon);
        CondImgEl.setAttribute('alt', forecastDay.day.condition.text);
        //Changing the innerhtml of html elements to show specified data entry
        TempLowEl.innerHTML = forecastDay.day.mintemp_c + degreeC + spacer;
        TempHighEl.innerHTML = forecastDay.day.maxtemp_c + degreeC;
    }

}
