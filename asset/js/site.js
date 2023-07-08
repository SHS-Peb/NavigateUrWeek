let searchHistory;

const loadSearchHistoryToHomePage = () => {
    let history = document.getElementById("history");

    if (searchHistory.length === 0) return;
    if (!history) return;

    // added search history
    for (let i = searchHistory.length - 1; i >= 0; i--) {
        let str = `<div class="portfolio-item"><img src="${searchHistory[i].url}" alt="${searchHistory[i].description}" class="thumbnail" height="100" width="100"><h4>${searchHistory[i].locationName}</h4><p>${searchHistory[i].description}</p></div>`;
        history.innerHTML += str;
    }

    // attach event listeners onto the history items
    let items = document.querySelectorAll(".portfolio-item");
    if (items) {

        items.forEach(item => {

            item.addEventListener("click", (event) => {
                let itemHeader = item.querySelector("h4");
                let url = "./asset/html/locationSearch.html?data=" + itemHeader.textContent.trimEnd();
                console.log(url)

                window.location.href = url;

            })
        });
    }
}





//---------------- init -----------------
const init = () => {
    searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (!searchHistory) {
        searchHistory = [];
    }
    console.log(searchHistory);

    loadSearchHistoryToHomePage();
}


init();