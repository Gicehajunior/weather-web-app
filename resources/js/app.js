const searchBtn = document.querySelector(".search-button");
const weatherSearchesContainer = document.querySelector(".weather-searches");
const WeatherDisplay = document.querySelector(".weather-updates");
const WeatherSearchTimeP = document.querySelector(".weather-status-span");

const bar = document.querySelector(".bar");
const closeSideNavBtn = document.querySelector(".close-btn");
const SideNavbar = document.querySelector(".side-navs");
const toggleBar = document.querySelector(".toggle-bar");

let result = "";
let weatherSearch = [];


search();
openCloseSideNavbar();
getPreviousWeatherSearches();

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
            result = `<p><b>${response.name}</b> <img src="public/images/${value.icon}.png" width="200" height="180"> ${response.main.temp}&deg;C <br> ${value.main} - ${value.description}<p>`;
            WeatherDisplay.innerHTML = result;

            dataRetrieved = {
                city: response.name,
                icon: value.icon,
                temperature: response.main.temp,
                caption: value.main,
                description: value.description,
                datetimeSearched: new Date(),
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
        result = `
                <div class="container weather-container">
                    <h4 class="searched-region"><b>${weather.city}</b></h4>
                    <img src="public/images/${weather.icon}.png" width="200" height="180">
                    <p class="temp">${weather.caption} - ${weather.description}</p>
                    <p class="temp">Temperature as of now is: ${weather.temperature}&deg;C</p>
                </div>
            `;
        WeatherSearchTimeP.innerHTML = weather.datetimeSearched;
        weatherSearchesContainer.innerHTML = result;
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




