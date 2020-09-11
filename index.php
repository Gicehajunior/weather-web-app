<?php include "environment.php"; ?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="manifest" href="app-manifest.json"/>
        <link href="resources/css/app.css" rel="stylesheet">
        
        <!-- jquery -->
        <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    </head>
    <body>
        <div class="container">
            <div class="flex navbar">
                <div class="flex navs">
                    <a href="#" class="nav-link">Home</a>
                    <a href="#" class="nav-link">Explore</a>
                </div>
                <div class="bar">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div class="flex navs toggle-bar">
                    <a href="#" class="close-btn">&times;</a>
                    <div class="side-navs">
                        <a href="#" class="side-nav-link">Home</a>
                        <a href="#" class="side-nav-link">Explore</a>
                        <a href="#" class="side-nav-link">Settings</a>
                    </div>
                </div>
                <div class="search-bar flex">
                    <input type="search" name="" id="search-bar-input" class="search-bar-input" placeholder="Type to search!">
                    <input type="text" hidden="hidden" name="" id="api-key" value="<?php echo $OPEN_WEATHER_MAP_API_KEY; ?>">
                    <button type="button" id="search-button" class="search-button">Search</button>
                </div>
            </div>

            <div class="card-container">
                <div class="row">
                    <div class="card">
                        <h2>Weather Updates with BlogBook Weather!<h2>
                        <div class="weather-searches weather-searches-previous-card-body">

                        </div> 
                        <div class="weather-searches weather-searches-current-card-body weather-searches-card-body-inactive">

                        </div> 
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <p>Weather App Developed and Designed By Giceha Junior. Copyrights &copy; @<?php echo date("Y"); ?></p>
        </div>
        <script src="resources/js/app.js"></script>
    </body>
</html>
