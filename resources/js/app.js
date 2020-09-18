const searchBtn = document.querySelector(".search-button");
const weatherSearchesPreviousContainer = document.querySelector(".weather-searches-previous-card-body");
const weatherSearchesCurrentContainer = document.querySelector(".weather-searches-current-card-body");

const bar = document.querySelector(".bar");
const closeSideNavBtn = document.querySelector(".close-btn");
const SideNavbar = document.querySelector(".side-navs");
const toggleBar = document.querySelector(".toggle-bar");

let result = "";
let weatherSearch = [];

registerServiceWorker();
search();
openCloseSideNavbar();
getPreviousWeatherSearches();

/*******
 *  This where a service worker is registered. 
 * improves user expeeience on our app.
 */
function registerServiceWorker(){
    if("serviceWorker" in navigator){
        window.addEventListener('load', () => {
            navigator.serviceWorker.register("../serviceWorker.js")
            .then(reg => console.log("Service Worker: Registered"))
            .catch(err => console.log(`Service Worker: Error: ${err}`));
        });
    }
}

/*******
 * this function takes care of any weather search done. 
 * requests and retrieves the requests from the Open Weather Map API
 * parameters accepted here are:
 *      -city. 
 *      -api key for the app
 */
function search(){ 
    searchBtn.addEventListener("click", () => {
        let city = $("#search-bar-input").val();
        let apiKey = $("#api-key").val();

        let data = {
            q: city,
            appid: apiKey,
            units: "metrics",
        };

        $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather",
        data: data,
        dataType: "json",

        success: function (response) {
            $.each(response.weather, (index, value) => { 
                result = `<div class="weather-container"><center><p><h2><b>${response.name}</b></h2> <img src="public/images/${value.icon}.png" width="250" height="200"> <span>${response.main.temp}&deg;C</span> <br> <span>${value.main} - ${value.description}</span><p></center</div>`;
                
                if (response !== "") {
                    weatherSearchesCurrentContainer.innerHTML = result;
                    weatherSearchesCurrentContainer.classList.remove("weather-searches-card-body-inactive"); 
                    weatherSearchesPreviousContainer.classList.add("weather-searches-card-body-inactive");
                } else {
                    weatherSearchesPreviousContainer.innerHTML = result;
                    weatherSearchesPreviousContainer.classList.remove("weather-searches-card-body-inactive");
                    weatherSearchesCurrentContainer.classList.add("weather-searches-card-body-inactive");
                }

                dataRetrieved = {
                    city: response.name,
                    icon: value.icon,
                    temperature: response.main.temp,
                    caption: value.main,
                    description: value.description
                };
                weatherSearch.push(dataRetrieved);
                saveWeatherSearch(weatherSearch);
            });
        },
        });
    });

}

/*********
 * this saves the weather searches to local storage.
 * parameters to be passed here are:
 *      -place, city.
 *      -weathersearch information.
 */
function saveWeatherSearch(weatherSearch){
    localStorage.setItem("weatherSearch", JSON.stringify(weatherSearch));
}

/**********
 * this function takes care of getting the item from Web storage memory.
 * returns the data and displays to the user.
 */
function getPreviousWeatherSearches(){
    let result = "";
    let weatherSearches = JSON.parse(localStorage.getItem("weatherSearch")); 

    weatherSearches.forEach((weather) => { 
        result = `<div class="weather-container"><center><p><h2><b>${weather.city}</b></h2> <img src="public/images/${weather.icon}.png" width="250" height="200"> <br> <span>${weather.temperature}&deg;C</span> <br> <span>${weather.caption} - ${weather.description}</span><p></center></div>`;
        weatherSearchesPreviousContainer.innerHTML = result;
    });
    
}


/********
 * this function takes care of opening and closing the side navbar. 
 * when bar nav is clicked, side navbar opens.
 * when close-btn nav is clicked, side navbar closes.
 */
function openCloseSideNavbar(){
    bar.addEventListener('click', () => {
        toggleBar.style.width = "50%";
        SideNavbar.classList.add("visible");
    });

    closeSideNavBtn.addEventListener('click', () => {
        toggleBar.style.width = "0";
        SideNavbar.classList.remove("visible");
    });
}




