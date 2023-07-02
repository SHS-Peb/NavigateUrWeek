// let destinationCardNav = document.getElementById("destinationCardNav");

// destinationCardNav.addEventListener("scroll", (event) => {
//     console.log("asdf");
// })
$(function () {
    $('.toggle-menu').click(function (e) {
        e.preventDefault();
        $('.sidebar').toggleClass('toggled');
    });
});