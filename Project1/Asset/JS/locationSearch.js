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
  setupMap(center);
  saveCoordinatesToStorage(center);
}

// Geolocation error callback
function errorLocation(error) {
  console.log('Geolocation error:', error);
  const defaultCenter = [-2.24, 53.48];
  setupMap(defaultCenter);
  saveCoordinatesToStorage(defaultCenter);
}

// Set up the map
function setupMap(center) {
  // Set the Mapbox access token
  mapboxgl.accessToken = mapBoxToken;

  // Create the map
  const map = new mapboxgl.Map({
    container: 'map',
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
}

// Usage example
const storedCoordinates = getCoordinatesFromStorage();
if (storedCoordinates) {
  setupMap(storedCoordinates);
}
