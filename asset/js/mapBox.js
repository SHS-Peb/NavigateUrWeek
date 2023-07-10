
const mapBoxToken = "pk.eyJ1IjoiaG9yYWNlaG91IiwiYSI6ImNsamgwMHVubzBlYnkzZnFnN3U4amZxbmgifQ.mxqdrB6-rH2nfiQ4LA7aug";

// Check if mapboxgl object is available
if (typeof mapboxgl !== 'undefined') {
    // Execute the geolocation request when the document has finished loading
    document.addEventListener('DOMContentLoaded', () => {
        navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
            enableHighAccuracy: true,
        });
    });
}

// Geolocation success callback
function successLocation(position) {
    const center = [position.coords.longitude, position.coords.latitude];
    callForecast(position.coords.latitude + ',' + position.coords.longitude)
    setupMap(center);
    // saveCoordinatesToStorage(center);
}

// Geolocation error callback
function errorLocation(error) {
    console.log('Geolocation error:', error);
    const defaultCenter = [-2.24, 53.48];
    setupMap(defaultCenter);
    // saveCoordinatesToStorage(defaultCenter);
}

// Set up the map
function setupMap(center) {
    // Set the Mapbox access token
    mapboxgl.accessToken = mapBoxToken;

    // Create the map
    const map = new mapboxgl.Map({
        container: 'destinationMap',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 15,
    });

    // Add navigation control
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);

    // Add directions control
    const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
    });
    map.addControl(directions, 'top-left');

    // Add moved the (geocoder)search bar from locationSearch.JS to mapBox.js
    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        types: 'country,region,place,postcode,locality,neighborhood',
        mapboxgl: mapboxgl
    });
    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

    // Add geocoder result to container.
    geocoder.on('result', (event) => {
        const data = event.result;
        // display the image based on the search result
        console.log(data)
        // call getDestinationImage function from locationSearch.js to update the carousel images
        getDestinationImage(data.text);

        // call callWeatherApi function from weatherAPI.js to update the weather data using city name
        callForecast(data.text);


        // Currently not used code but may be needed for future update.
        //call callWeatherApi function from weatherAPI.js to update the weather data using coordinates
        // var destinationCoords = data.center[1] + "," + data.center[0]
        // console.log(destinationCoords)
        // callForecast(destinationCoords);

        map.center = data.center;
    });

}
