// GIVEN a weather dashboard with form inputs
//✅WHEN I search for a city
//✅THEN I am presented with current and future conditions for that city and that city is added to the search history
//✅WHEN I view current weather conditions for that city
//✅THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//✅WHEN I view the UV index
//✅THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
//✅WHEN I view future weather conditions for that city
//✅THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var searchBtnEl = $("#save-button");
var tempTextEl = $("#temp");
var windTextEl = $("#wind");
var humidTextEl = $("#humidity");
var uvTextEl = $("#uv");
var cityTextEl = $("#city");
var inputField = $(input);

// gets the city name from the user and displays it along with the current time. It also informs our weather further down
function getApi() {
  var city = $(inputField).val();
  var requestUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=7ea56fe80e9e577a7387e69996a6f935";
  var today = moment().format("MM/DD/YYYY");
  var cityName = cityTextEl;
  cityName.text(city + ", " + today);
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    // defined the temp, wind, and humidity. Then it adds that to the p tags I hardcoded with labels
    .then(function (data) {
      console.log(data);
      var tempMain = data.main.temp;
      var windMain = data.wind.speed;
      var humidityMain = data.main.humidity;

      tempTextEl.text(tempMain);
      humidTextEl.text(humidityMain);
      windTextEl.text(windMain + "MPH");

      var lat = data.coord.lat;
      var lon = data.coord.lon;

    // api link to get the latitude and longitude of the area, needed for the uv index
      var requestUrlUv =
        "http://api.openweathermap.org/data/2.5/onecall?&units=imperial&lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=7ea56fe80e9e577a7387e69996a6f935";
      fetch(requestUrlUv)
        .then(function (response) {
          return response.json();
        })
        // displays the uv index and color codes it depending on the number
        .then(function (data) {
          console.log(data);
          var uvColor = data.current.uvi;
          uvTextEl.text(uvColor);
          if (uvColor <= 2) {
            uvTextEl.attr("class", "uv-green");
          }
          if (uvColor >= 3 && uvColor <= 5) {
            uvTextEl.attr("class", "uv-yellow");
          }
          if (uvColor >= 6 && uvColor <= 7) {
            uvTextEl.attr("class", "uv-orange");
          }
          if (uvColor >= 8 && uvColor <= 10) {
            uvTextEl.attr("class", "uv-red");
          }
          if (uvColor >= 10) {
            uvTextEl.attr("class", "uv-violet");
          }

        //   gets the 5 day forecast for the city that the user searched for
          var forecastInfo = '';
          forecastInfo += city;
          $.each(data.daily, function (index, val) {
            //   loops through the different days and creates a list of values to display like wind, humidity, and temperature
            if (index < 5) {
                forecastInfo += "<ul>";
                forecastInfo += "<li><b>Day: " + (index + 1) + "</b></li>";
                forecastInfo += "<li><b>Temp: " + val.temp.day + " &degF</b><br></li>";
                forecastInfo += "<li><b>Wind: " + val.wind_speed + " MPH</b><br></li>";
                forecastInfo += "<li><b>Humidity: " + val.humidity + " %</b></li>";
                forecastInfo += "<img src='https://openweathermap.org/img/wn/" + val.weather[0].icon + "@2x.png'>";
                forecastInfo += val.weather[0].description;
                forecastInfo += "</ul>";
            }
          })
        //   displays the text content of the unordered list above and not just what is in the quotes
          $("#forecast").html(forecastInfo);
        });
    });
}

// when the search button is clicked, the getApi function is called
searchBtnEl.on("click", getApi);
