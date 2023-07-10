let destinationMap = document.getElementById("destinationMap");
let geocoderResetButton = document.getElementById("geocoderResetButton");
let webTitle = document.getElementById("webTitle");

//---------------- UI -----------------

let button = document.querySelector('.desti-route-button');

// return to the home page upon click
webTitle.addEventListener('click', (event) => {
    window.location.href = "../../index.html";
})

// carousel
let carousel = document.querySelector('[data-carousel]');
let slides = document.getElementsByClassName('carousel-cell');
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


// carousel function
let flkty = new Flickity(carousel, options);

flkty.on('scroll', () => {
    flkty.slides.forEach((slide, i) => {
        let image = slides[i];
        let x = (slide.target + flkty.x) * -1 / 3;
        image.style.backgroundPosition = x + 'px';
    });
});


//---------------- UI events -----------------
// create an empty searchHistory Object
let searchHistory = [];

geocoderResetButton.addEventListener("click", (event) => {

    geocoderResetButton.classList.add('clicked');
    setTimeout(function () {
        geocoderResetButton.classList.remove('clicked');
    }, 200);
    searchHistory = [];

    localStorage.setItem("searchHistory", "");
})



//---------------- Unsplash API-----------------
const client_id = "g9ZK5ag6po5d9rJet7HIMBi2dJdI4GDcL2KoZyZDOyg";
let page = "1";
let per_page = "7";


// get the image urls and load to the carousel using unsplash API
const getDestinationImage = (destination) => {
    let apiUrl = `https://api.unsplash.com/search/photos/?page=${page}&per_page=${per_page}&query=${destination}&client_id=${client_id}`;
    let slides = document.getElementsByClassName('carousel-cell');
    let titles = document.getElementsByClassName('title');

    fetch(apiUrl)
        .then((response) => {
            if (response.ok) {

                response.json().then((data) => {


                    // return if there is no search result
                    if (data.results.length === 0) { return; } // added a warning that location does not have any related images
                    else {

                        // avoid repeat destination data in the localStorage
                        let hasDestination = searchHistory.some(function (history) {
                            return history.locationName === destination;
                        });
                        if (!hasDestination) {
                            searchHistory.push({ locationName: destination, url: data.results[0].urls.regular, description: data.results[0].alt_description });
                            localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
                        }
                    }

                    for (let i = 0; i < slides.length; i++) {
                        let url = data.results[i].urls.regular;
                        let alt_description = data.results[i].alt_description;

                        slides[i].style.backgroundImage = `url(${url})`;
                        titles[i].textContent = alt_description;
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


//---------------- init -----------------

let siteLocation = "";
const init = () => {

    // get the local search history
    searchHistory = localStorage.getItem("searchHistory");

    if (!searchHistory) {
        searchHistory = [];
    } else {
        searchHistory = JSON.parse(searchHistory);
    }

    // get the data from the URL
    const searchParams = new URLSearchParams(window.location.search);
    siteLocation = searchParams.get("data");

    if (siteLocation) {
        getDestinationImage(siteLocation);
    }

}


init();