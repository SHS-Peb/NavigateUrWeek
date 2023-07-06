// import { updateDataFromWeatherAPI } from './weatherAPI.js';


//---------------- mapbox API -----------------

// const mapBoxToken = "pk.eyJ1IjoiaG9yYWNlaG91IiwiYSI6ImNsamgwMHVubzBlYnkzZnFnN3U4amZxbmgifQ.mxqdrB6-rH2nfiQ4LA7aug";

let destinationMap = document.getElementById("destinationMap");

// mapboxgl.accessToken = mapBoxToken;

// const map = new mapboxgl.Map({
//     container: destinationMap, // container ID
//     // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
//     style: 'mapbox://styles/mapbox/streets-v12', // style URL
//     // center: [-74.5, 40], // starting position [lng, lat]
//     center: [
//         151.216454,
//         -33.854816
//     ],
//     geometry: {
//         "type": "Point",
//         "coordinates": [
//             151.216454,
//             -33.854816
//         ]
//     },
//     zoom: 12 // starting zoom
// });

// const geocoder = new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken,
//     types: 'country,region,place,postcode,locality,neighborhood',
//     mapboxgl: mapboxgl
// });


// // Add geocoder result to container.
// geocoder.on('result', (event) => {
//     const data = event.result;
//     // display the image based on the search result
//     getDestinationImage(data.text);

//     updateDataFromWeatherAPI(data.text);

//     map.center = data.center;
// });

// Clear results container when search is cleared.
// geocoder.on('clear', () => {
//     results.innerText = '';
// });

// link external geocoder to the map
// document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

// map.addControl(
//     new mapboxgl.GeolocateControl({
//         positionOptions: {
//             enableHighAccuracy: true
//         },
//         // When active the map will receive updates to the device's location as it changes.
//         trackUserLocation: true,
//         // Draw an arrow next to the location dot to indicate which direction the device is heading.
//         showUserHeading: true
//     })
// );

// map.addControl(
//     new MapboxDirections({
//         accessToken: mapboxgl.accessToken
//     }),
//     'top-left'
// );



//---------------- UI -----------------

var button = document.querySelector('.desti-route-button');

button.addEventListener('click', () => {
    button.classList.add('clicked');
    setTimeout(function () {
        button.classList.remove('clicked');
    }, 200);
});


let options = {
    accessibility: true,
    prevNextButtons: true,
    pageDots: true,
    setGallerySize: false,
    arrowShape: {
        x0: 10,
        x1: 60,
        y1: 50,
        x2: 60,
        y2: 45,
        x3: 15
    }
};

let carousel = document.querySelector('[data-carousel]');
let slides = document.getElementsByClassName('carousel-cell');
let flkty = new Flickity(carousel, options);

// create an empty searchHistory Object
let searchHistory = {
    questions: [],
    questionIndex: 0,
    result: 0,
    name: "",
};




flkty.on('scroll', () => {
    // console.log(slides.length);
    flkty.slides.forEach((slide, i) => {
        let image = slides[i];
        let x = (slide.target + flkty.x) * -1 / 3;
        image.style.backgroundPosition = x + 'px';
    });
});


//---------------- Unsplash API-----------------
const client_id = "g9ZK5ag6po5d9rJet7HIMBi2dJdI4GDcL2KoZyZDOyg";
let page = "1";
let per_page = "7";

const getDestinationImage = (destination) => {
    let apiUrl = `https://api.unsplash.com/search/photos/?page=${page}&per_page=${per_page}&query=${destination}&client_id=${client_id}`;
    let slides = document.getElementsByClassName('carousel-cell');
    let titles = document.getElementsByClassName('title');

    fetch(apiUrl)
        .then((response) => {
            if (response.ok) {

                response.json().then((data) => {

                    console.log(data);
                    if (data.results.length === 0) return; // added a warning that location does not have any related images
                    for (let i = 0; i < slides.length; i++) {
                        let url = data.results[i].urls.regular;
                        let alt_description = data.results[i].alt_description;

                        slides[i].style.backgroundImage = `url(${url})`;
                        titles[i].textContent = alt_description;
                        // titles[i].textContent = "";
                        // console.log(url);
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
