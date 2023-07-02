// let destinationCardNav = document.getElementById("destinationCardNav");

// destinationCardNav.addEventListener("scroll", (event) => {
//     console.log("asdf");
// })
// $(function () {
//     $('.toggle-menu').click(function (e) {
//         e.preventDefault();
//         $('.sidebar').toggleClass('toggled');
//     });
// });

const mapBoxToken = "pk.eyJ1IjoiaG9yYWNlaG91IiwiYSI6ImNsamgwMHVubzBlYnkzZnFnN3U4amZxbmgifQ.mxqdrB6-rH2nfiQ4LA7aug";
let destinationMap = document.getElementById("destinationMap");


mapboxgl.accessToken = mapBoxToken;
// var map = new mapboxgl.Map({
//     container: "map",
//     style: 'mapbox://styles/mapbox/streets-v9',
//     center: [151.2336, -33.8979], // Specify the initial center of the map (e.g., [-122.4194, 37.7749] for San Francisco)
//     zoom: 10 // Specify the initial zoom level
// });

const map = new mapboxgl.Map({
    container: destinationMap, // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
});