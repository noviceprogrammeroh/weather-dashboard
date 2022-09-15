function initPage() {

  //html element variables
  var searchInputEl = document.querySelector("#search-input");
  var searchButtonEl = document.querySelector(".btn-block");
  var jumbotronDivChildEl = document.querySelector(".jumbotron");
  var jumbotronH1El = document.querySelector("#display-jumbotron-h1");
  var weatherInfoEl = document.querySelector("#weather-info");
  var fiveDayForecastEl = document.querySelector("#five-day-forecast");
  var getGroupDiv = document.querySelector(".list-group");
  // var buttonResetEl = document.querySelector('.reset');


  // var APIKey = "2a14eee60fac2d1c078e7179d1e934f3";
   var APIKey = "b3dd20f120ee6fd6de286935865b65c1";

  //add event listener to the search button
    searchButtonEl.addEventListener("click", function (event) {
    event.preventDefault();
    var city = searchInputEl.value.toLowerCase();
    displayInfoWeather(city);
    renderCities();
    });


  function displayInfoWeather(city) {
    // var city = searchInputEl.value.toLowerCase();
    console.log(city);
    //validation
    if (!city) {
      alert("Please enter a city!");
    }
    
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
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
            var getData = data.list;
            var htmlStr = "";
            for (let i = 0; i < getData.length; i = i + 8) {
              var temp = getData[i].main.temp;
              var getTemp = kelvToFar(temp);
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
            fiveDayForecastEl.innerHTML = htmlStr;
          });
      })
      .catch((e) => console.error(e))
      .finally(console.log("API call finished"));

    lsList(city);
    


   
  }

  //function to convert temp
  function kelvToFar(temp) {
    return Math.floor((temp - 273.15) * 1.8 + 32);
  }

  // //add event listener to the search button
  // searchButtonEl.addEventListener("click", function (event) {


  //   event.preventDefault();
  //   displayInfoWeather();
  // });

  function lsList(city) {
    var getLocalCities = JSON.parse(localStorage.getItem("cities"));
    console.log(city);
    // const arrCities = [];
    // arrCities.push(city);
    if (getLocalCities == null) {
      getLocalCities = [];
    }
    //validation check if the last city is already there, do not include it on the list.
    var index = getLocalCities.indexOf(city);
    console.log(index);
    if (index > -1) {
      getLocalCities.splice(index, 1);
    }

    if (index) {
      getLocalCities.splice(index, 0);
    }

    getLocalCities.push(city);
    console.log(getLocalCities);
    localStorage.setItem("cities", JSON.stringify(getLocalCities));
    renderCities();
  }

  function renderCities() {

    var getLocalCities = JSON.parse(localStorage.getItem("cities"));
    console.log("This is the getlocalCities : ", getLocalCities);

    
    if (Array.isArray(getLocalCities)) {
      getGroupDiv.textContent = "";

      for (var i = 0; i < getLocalCities.length; i++) {
        // var getNameCity = getLocalCities[i];   
        var getNameCity = getLocalCities[i];               
        
        var listSearchBtn = document.createElement("button");
        listSearchBtn.setAttribute(
          "class",
          "list-group-item list-group-item-action active"
        );
        listSearchBtn.setAttribute("id", "btn-id");
        listSearchBtn.setAttribute("value", getNameCity);
        listSearchBtn.textContent = getNameCity;
        getGroupDiv.appendChild(listSearchBtn);
        var getValFromSearchButton = listSearchBtn.value;
        console.log("This is the  get value from seach button: ", getValFromSearchButton);
        
        listSearchBtn.addEventListener('click', function(event){
         var element= event.target;
         var getelementValue = element.getAttribute('value');
         console.log(getelementValue);
         searchInputEl.text="";    
         displayInfoWeather(getelementValue);   
         });  

         }

       }

     }



}
initPage();
