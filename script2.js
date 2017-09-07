var city;
var temp;
var icon;
var humidity;
var condition;
var windspeed;
var direction;

function getByZip(zip) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?' +
     'zip=' + zip +
     '&units=imperial' +
     '&APPID=2491e0666186be7f2b3b95a85f3be184';
     
     sendRequest(url);
}

function getByCityState(entry) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?' +
    'q=' + entry +
    '&units=imperial' +
    '&APPID=2491e0666186be7f2b3b95a85f3be184';
    
    sendRequest(url);
}

function updateByGeo(lat, lon) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?' +
    'lat=' + lat +
    '&lon=' + lon +
    '&units=imperial' +
    '&APPID=2491e0666186be7f2b3b95a85f3be184';
    
    sendRequest(url);
}

function formSubmission() {
    var entry = document.getElementById('location').value;
    var pat1 = /[0-9]/g;
    if (entry.match(pat1)) {
        var result = entry.match(pat1);
        getByZip(result.join(""));
    } else {
        getByCityState(entry);
    }
}

function getUser() {
    var xmlhttp = new XMLHttpRequest();
    var url = "http://ip-api.com/json";
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
            updateByGeo(data.lat, data.lon);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function sendRequest(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200)    {
          var data = JSON.parse(xmlhttp.responseText);
          var weather = {};
          weather.city = data.name;
          weather.temp = data.main.temp.toFixed(0);
          weather.icon = data.weather[0].icon;
          weather.humidity = data.main.humidity;
          weather.condition = data.weather[0].description;
          weather.windspeed = data.wind.speed.toFixed(0);
          weather.direction = degToDir(data.wind.deg);
          console.log(data);
          update(weather);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function degToDir(deg) {
    var range = 360/16;
    var low = 360 - range/2;
    var high = (low + range) % 360;
    var dirArray = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
     for (i in dirArray) {
        if (deg >= low && deg < high)
            return dirArray[i];
            
        low = (low + range) % 360;
        high = (high + range) % 360;
     }
    return "N";
}

function F2C(f) {
   return f = ((temp - 32) * (5/9)).toFixed(0); 
}

function C2F(c) {
    return c = weather.temp;
}

function update(weather) {
    city.innerHTML = weather.city;
    temp.innerHTML = weather.temp;
    icon.src = "http://openweathermap.org/img/w/"+weather.icon+".png";
    humidity.innerHTML = weather.humidity;
    condition.innerHTML = weather.condition;
    windspeed.innerHTML = weather.windspeed;
    direction.innerHTML = weather.direction;
    
}

function showPosition(position) {
    updateByGeo(position.coords.latitude, position.coords.longitude);
}

window.onload = function () {
    city = document.getElementById('city');
    temp = document.getElementById('temperature');
    icon = document.getElementById('icon');
    humidity = document.getElementById('humidity');
    condition = document.getElementById('condition');
    windspeed = document.getElementById('wind-speed');
    direction = document.getElementById('direction');
    
    var weather = {};
    weather.city = 'Honolulu, HI';
    weather.temp = 75;
    weather.icon = '02d';
    weather.humidity = 35;
    weather.condition = 'few clouds';
    weather.windspeed =  7;
    weather.direction = 'NW';
    
    update(weather);
    
    /*if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        var zip = window.prompt("What's your zipcode?");
        getByZip(zip);
    }*/
    
}
