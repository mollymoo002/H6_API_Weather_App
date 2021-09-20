// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
var searchBtnEl = document.getElementById("save-button");
var tempTextEl = document.getElementById("temp");
var windTextEl = document.getElementById("wind");
var humidTextEl = document.getElementById("humidity");
var uvTextEl = document.getElementById("uv");
var cityTextEl = document.getElementById("city");

var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=philadelphia&appid=7ea56fe80e9e577a7387e69996a6f935";
console.log(requestUrl);
fetch(requestUrl) 
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });

