<?php
require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createMutable(__DIR__.'');
$dotenv->load();

// require the private credentials from the .env file
$OPEN_WEATHER_MAP_API_KEY = $_ENV['OPEN_WEATHER_MAP_API_KEY'];
