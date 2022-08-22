
//API variables
var city ="Gahanna";
var APIKey = '2a14eee60fac2d1c078e7179d1e934f3';
var queryURL;

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={'2a14eee60fac2d1c078e7179d1e934f3'}

queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL);