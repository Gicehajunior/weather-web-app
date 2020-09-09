const searchBtn = document.querySelector(".search-button");
const WeatherDisplay = document.querySelector(".weather-updates");
let result = "";
let weatherSearch = [];


search();


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
        let apiKey = "e3bee19e89f08ed2a14bb5c9f164ce35";

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
                    result = `<p><b>${response.name}</b> <img src="public/images/${value.icon}.png" width="200" height="180"> ${response.main.temp} &deg;C ${value.main} ${value.description}<p>`;
                    WeatherDisplay.innerHTML = result;

                    dataRetrieved = {
                        city: response.name,
                        icon: value.icon,
                        temperature: response.main.temp,
                        caption: value.main,
                        description: value.description,
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






