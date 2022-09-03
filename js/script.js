//function initPage() {

var searchInputEl = document.querySelector("#search-input");
var searchButtonEl = document.querySelector(".btn-block");
var displayJumbotronH1El = document.querySelector("#display-jumbotron-h1");
var cardGroupEl1 = document.querySelector("#card-id-1");
var cardGroupEl2 = document.querySelector("#card-id-2");
var cardGroupEl3 = document.querySelector("#card-id-3");
var cardGroupEl4 = document.querySelector("#card-id-4");
var jumbotronDivEl = document.querySelector("#jumbotron-div-id");
var jumbotronDivChildEl = document.querySelector(".jumbotron");
var cardsEl = document.querySelector("#card-title");
var cardTextEl = document.querySelector("#card-text");
var jumbotronH1El = document.querySelector("#display-jumbotron-h1");
var historyDiv = document.querySelector("#history-div");
var weatherInfoEl = document.querySelector("#weather-info");
var card = document.querySelector(".card");
var fiveDayForecastEl = document.querySelector("#five-day-forecast")
console.log(fiveDayForecastEl)

//api vars
var APIKey = "2a14eee60fac2d1c078e7179d1e934f3";
var city;

function displayInfoWeather() {
  var getVal = searchInputEl.value;
  //console.log(getVal);
  //event.preventDefault();
  city = getVal;

  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;

  fetch(queryURL)
    .then((response) => response.json())

    .then((data) => {
      console.log(data);

      //get current date
      var currentCity = data.name;
      var currentDate = new Date(data.dt * 1000);
      var weatherPic = data.weather[0].icon;
      var currentPicEl = document.createElement("img");
      currentPicEl.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png"
      );
      currentPicEl.setAttribute("alt", data.weather[0].description);

      var day = currentDate.getDate();
      var month = currentDate.getMonth() + 1;
      var year = currentDate.getFullYear();
      var humidity = data.main.humidity;
      var wind = data.wind.speed;
      var temp = data.main.temp;

      jumbotronH1El.innerHTML =
        currentCity + " " + month + "/" + day + "/" + year + " ";
      var ulEl = document.createElement("ul");
      var liHumidity = document.createElement("li");
      var liWind = document.createElement("li");
      var liTemp = document.createElement("li");
      liHumidity.textContent = "Humidity: " + humidity + " %";
      liWind.textContent = "Wind:" + wind + " MPH";
      liTemp.innerHTML = "Temp: " + kelvToFar(temp) + " &#176F";

      ulEl.appendChild(liHumidity);
      ulEl.appendChild(liWind);
      ulEl.appendChild(liTemp);
      weatherInfoEl.textContent = "";
      weatherInfoEl.append(currentPicEl);
      weatherInfoEl.appendChild(ulEl);
      jumbotronDivChildEl.appendChild(weatherInfoEl);

      var lat = data.coord.lat;
      var lon = data.coord.lon;
      var UVQueryURL =
        "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        APIKey +
        "&cnt=1";

      fetch(UVQueryURL)
        .then((response) => response.json())
        .then((data) => {
          var liUV = document.createElement("li");
          var UVIndex = document.createElement("span");
          UVIndex.setAttribute("class", "badge badge-danger");
          console.log(UVIndex);
          UVIndex.innerHTML = "UV Index: " + data[0].value;
          liUV.appendChild(UVIndex);
          ulEl.appendChild(liUV);
        });

      var cityID = data.id;
      console.log("this is the cityID : ", cityID);

      var forecastQueryURL =
        "https://api.openweathermap.org/data/2.5/forecast?id=" +
        cityID +
        "&appid=" +
        APIKey;
      fetch(forecastQueryURL)
        .then((response) => response.json())
        .then((data) => {
          console.log("this is the data of the last fetch ", data);
          var getData = data.list;
          console.log("this is the showdata : ", getData);


          var htmlStr = "";
          for (let i = 0; i < getData.length; i = i + 8) {
            //store data temp from API on the temp variable
           var temp = getData[i].main.temp
           //convert temp to farenheit by passing the temp var to the kelvToFar function to convert to farenheit
           var getTemp =  kelvToFar(temp);


            htmlStr += `<div class="card bg-primary m-3 p-3" id ="div-card">
                  <h6>${getData[i].dt_txt.split(" ")[0]}</h6>
                  <h3>Temp: ${getTemp}</h3>
                  <img src="https://openweathermap.org/img/wn/${
                    getData[i].weather[0].icon
                  }@2x.png" />
                  <h4>wind: ${getData[i].wind.speed} MPH</h4>
                  <h4>humidity: ${getData[i].main.humidity}</h4>
                  <h4>${getData[i].weather[0].description}</h4>
                  </div>`;
          }

          console.log(htmlStr);
          console.log(fiveDayForecastEl);   
          fiveDayForecastEl.innerHTML = htmlStr;

          //  var idIter =  1;
          // for (var i = 0; i < showData.length; i = i + 8) {
          //   // var forecastIndex = i * 8 + 4;


          //   var day = data.list[i];
            // var temperature = day.main.temp;
            // var dateEl = document.querySelector("#weather-date-" + i + forecastIndex);
            // var imgEl = document.querySelector("#weather-img-" + i + forecastIndex);
            // var tempEl = document.querySelector("#weather-temp-" + i + forecastIndex);
            // var humEl = document.querySelector("#weather-hum-" + i + forecastIndex);
            // var windEl = document.querySelector("#weather-wind-" + i + forecastIndex);
            // console.log(dateEl);
            // idIter++;
            // tempEl.innerHTML = "Temp: " + kelvTofar(temperature) + " &#176F";
            // var date = new Date(data.list[forecastIndex].dt * 1000)
            // .toLocaleDateString(
            //   "en-us",
            //   {
            //     weekday: "long",
            //     year: "numeric",
            //     month: "short",
            //     day: "numeric",
            //   }
            // );
            // dateEl.innerHTML = date;
            
            // imgEl.setAttribute(
            //   "src",
            //   "https://openweathermap.org/img/wn/" +
            //     data.list[forecastIndex].weather[0].icon +
            //     "@2x.png"
            // );
            // imgEl.setAttribute("alt", "Weather currentS forecast icon");
            // // imgEl.innerHTML = currentPicEl;
            // var windSpeed = "Wind: " + data.list[i].wind.speed + "" + " MPH";
            // windEl.innerHTML = windSpeed;
            // var humidity = "Humidity: " + data.list[i].main.humidity;
            // humEl.innerHTML = humidity;
            // // var icon = data.list[i].weather[0].icon;

            // // cardGroupEl1.append(liIcon);
            // card.setAttribute("style", "background-color: rgb(0, 94, 255);");
          });

    })
    .catch((e) => console.error(e))
    .finally(console.log("API call finished"));


// //function to convert temp
// function kelvTofar(temperature) {
//   return Math.floor((temperature - 273.15) * 1.8 + 32);
// }

// searchButtonEl.addEventListener("click", function (event) {
//   event.preventDefault();
//   displayInfoWeather();
// })
}

//function to convert temp
function kelvToFar(temp) {
  return Math.floor((temp - 273.15) * 1.8 + 32);
}

searchButtonEl.addEventListener("click", function (event) {
  event.preventDefault();
  displayInfoWeather();
})