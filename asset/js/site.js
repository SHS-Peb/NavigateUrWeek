let searchHistory;

const loadSearchHistoryToHomePage = () => {
    let history = document.getElementById("history");

    if (searchHistory.length === 0) return;
    if (!history) return;

    searchHistory.forEach(data => {
        let str = `<div class="portfolio-item"><img src="${data.url}" alt="${data.description}" class="thumbnail" height="100" width="100"><h4>${data.locationName}</h4><p>${data.description}</p></div>`;
        history.innerHTML += str;
    });

    let items = document.querySelectorAll(".portfolio-item");
    if (items) {
        items.forEach(item => {

            item.addEventListener("click", (event) => {
                let itemHeader = item.querySelector("h4");
                let url = "./asset/html/locationSearch.html?data=" + itemHeader.textContent.trimEnd();

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