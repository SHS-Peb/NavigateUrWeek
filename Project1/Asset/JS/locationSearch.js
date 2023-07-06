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

// if (!mapboxgl.supported()) {
//     alert('Your browser does not support Mapbox GL');
// } else { }
const map = new mapboxgl.Map({
    container: destinationMap, // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    // center: [-74.5, 40], // starting position [lng, lat]
    center: [
        151.216454,
        -33.854816
    ],
    geometry: {
        "type": "Point",
        "coordinates": [
            151.216454,
            -33.854816
        ]
    },
    zoom: 12 // starting zoom
});

const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    types: 'country,region,place,postcode,locality,neighborhood',
    mapboxgl: mapboxgl

});

// geocoder.addTo('#geocoder');


// Add geocoder result to container.
geocoder.on('result', (e) => {
    // results.innerText = JSON.stringify(e.result, null, 2);
    // console.log(JSON.stringify(e.result));
    // console.log(e.result.json());


    const data = e.result;

    // display the image based on the search result
    getDestinationImage(data.text)
    console.log(data.text)

    map.center = data.center;
    // console.log(e.result);
});

// Clear results container when search is cleared.
geocoder.on('clear', () => {
    // results.innerText = '';
});

// link external geocoder to the map
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));


map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
    })
);

map.addControl(
    new MapboxDirections({
        accessToken: mapboxgl.accessToken
    }),
    'top-left'
);


// UI
var button = document.querySelector('.desti-route-button');

button.addEventListener('click', () => {
    button.classList.add('clicked');
    setTimeout(function () {
        button.classList.remove('clicked');
    }, 200);
});

let destinationImage = document.getElementById("destinationImage");

const client_id = "g9ZK5ag6po5d9rJet7HIMBi2dJdI4GDcL2KoZyZDOyg";
// let destination = "Sydney";
let page = "1";
let per_page = "7";

let getDestinationImage = (destination) => {
    let apiUrl = `https://api.unsplash.com/search/photos/?page=${page}&per_page=${per_page}&query=${destination}&client_id=${client_id}`;
    let slides = document.getElementsByClassName('carousel-cell');
    let titles = document.getElementsByClassName('title');

    fetch(apiUrl)
        .then((response) => {
            if (response.ok) {
                // console.log(response.j);
                response.json().then((data) => {


                    for (let i = 0; i < slides.length; i++) {
                        // const element = array[index];
                        let url = data.results[i].urls.regular;
                        let alt_description = data.results[i].alt_description;

                        slides[i].style.backgroundImage = `url(${url})`;
                        titles[i].textContent = alt_description;
                        console.log(url);
                    }

                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect');
        });
};
