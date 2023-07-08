let destinationMap = document.getElementById("destinationMap");
let geocoderResetButton = document.getElementById("geocoderResetButton");
let webTitle = document.getElementById("webTitle");

//---------------- UI -----------------




let button = document.querySelector('.desti-route-button');

// reset localStorage 
// button.addEventListener('click', (event) => {
//     button.classList.add('clicked');
//     setTimeout(function () {
//         button.classList.remove('clicked');
//     }, 200);

// });

webTitle.addEventListener('click', (event) => {
    window.location.href = "../../index.html";
    console.log("click");
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

let flkty = new Flickity(carousel, options);

flkty.on('scroll', () => {
    // console.log(slides.length);
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
    console.log("click");

    geocoderResetButton.classList.add('clicked');
    setTimeout(function () {
        button.classList.remove('clicked');
    }, 200);
    searchHistory = [];

    localStorage.setItem("searchHistory", "");
})



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

                    // return if there is no search result
                    if (data.results.length === 0) { return; } // added a warning that location does not have any related images
                    else {
                        console.log(typeof searchHistory);

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
    searchHistory = JSON.parse(localStorage.getItem("searchHistory"));

    const searchParams = new URLSearchParams(window.location.search);
    siteLocation = searchParams.get("data");

    // geocoder.query(siteLocation);
    if (siteLocation) {
        getDestinationImage(siteLocation);
    }

}


init();