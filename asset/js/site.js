let searchHistory;

const loadSearchHistoryToHomePage = () => {
    let history = document.getElementById("history");
    if (searchHistory.length === 0) return;
    if (!history) return;

    // added search history
    for (let i = searchHistory.length - 1; i >= 0; i--) {
        let str = `<div class="portfolio-item"><img src="${searchHistory[i].url}" alt="${searchHistory[i].description}" class="thumbnail" height="100" width="100"><h4>${searchHistory[i].locationName}</h4><p><img class="currentConditionIcon" src="" alt=""><span class="currentWeather"></span></p></div>`;
        history.innerHTML += str;
    }
}


// attach event listeners onto the history items
function createEventListeners() {
    let items = document.querySelectorAll(".portfolio-item");
    if (items) {

        items.forEach(item => {

            item.addEventListener("click", (event) => {
                let itemHeader = item.querySelector("h4");
                let url = "./asset/html/locationSearch.html?data=" + itemHeader.textContent.trimEnd();

                window.location.href = url;

            });
        });
    };
};

// Load Weather data for all location cards
function loadWeather() {
    var locationCardEl = document.getElementsByClassName("portfolio-item");
    // Looping through each card element and getting the name of the location and giving it to the weatherapi to get weather data
    for (let i = 0; i < locationCardEl.length; i++) {
        var currentCard = locationCardEl[i];
        var currentLocation = currentCard.querySelector('h4');
        callWeather(currentLocation.innerHTML, currentCard);



    }
}



//---------------- init -----------------
const init = () => {
    //Checking local storage for search history and saving it to searchHistory variable.
    searchHistory = localStorage.getItem("searchHistory");

    if (!searchHistory) {
        searchHistory = [];
    } else {
        searchHistory = JSON.parse(searchHistory);
    }

    loadSearchHistoryToHomePage();
    createEventListeners();
    loadWeather();
}


init();