// Get user location(latitude&longitude), get weather; display weather
// show icon/image based on weather
// toggle between F and C
// Use Open Weather API key: 2491e0666186be7f2b3b95a85f3be184
// Ex. api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&APIID=key

$(document).ready(function() {
    //getLocation();
    $('#city').text('Honolulu' + ', ' + 'HI');
    $('#temperature').text(75 + 'ºF');
    $('#icon').html('<img src="http://openweathermap.org/img/w/02d.png"/><br >');
    $('#condition').text('few clouds');
    $('#wind-speed').text('Wind: ' + 7 + ' mph' + ' NW');
});

function getLocation() {
    $.getJSON("http://ip-api.com/json", function(data) {
        // display location city and state
        $('#city').text(data.city + ', ' + data.region);
        // call function with location info
        getWeather(data.lat, data.lon, data.countryCode);
    })
    .fail(function(err) {
        // if error show Hawaii weather
        alert('We encountered an error trying to retrieve your location and weather data. We\'ll show you beautiful Honolulu, Hawaii for now.');
        $('#city').text('Honolulu, HI');
        getWeather(21.3049, -157.858, 'US');
    });
}

function getWeather(lat, lon, countryCode) {
        // get weather data from openweathermap
        var weatherApi = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial' + '&APPID=2491e0666186be7f2b3b95a85f3be184';
        
        $.get(weatherApi, function(weatherData) {
        //console.log(weatherData);
        
        // change temp from double to whole number
        var temp = weatherData.main.temp.toFixed(0);
        // convert F to C
        var tempC = ((temp - 32) * (5/9)).toFixed(0);
        
        // determine F or C based on countryCode, display temp
        var fahrenheit = ['US', 'BS', 'BZ', 'KY', 'PL'];
        if (fahrenheit.indexOf(countryCode) > -1) {
           $('#temperature').text(temp + 'ºF'); 
        } else {
           $('#temperature').text(tempC + 'ºC');
        }
        
        // get weather code, icon and display icon, description
        var icon = weatherData.weather[0].icon;
        var weather = weatherData.weather[0].description;
        $('#icon').html('<img src="http://openweathermap.org/img/w/'+icon+'.png"/><br >');
        $('#condition').text(weather);
        
        var wind = weatherData.wind.speed.toFixed(0);
        // wind-speed MPH to KNOTS
        var windKn = (weatherData.wind.speed * 0.868976).toFixed(1);
        // covert wind direction from degrees to compass heading
        var dir = Math.floor((weatherData.wind.deg / 22.5) + 0.5);
        var dirArray = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        
        $('#wind-speed').text('Wind: ' + wind + ' mph ' + dirArray[(dir % 16)]);
  
        // change display from F to C and back by clicking
        $('#temperature').on('click', function() {
            
            if ($(this).text().indexOf('F') > -1) {
                $(this).text(tempC + 'ºC');
            } else {
                $(this).text(temp + 'ºF');
            }    
        });
        
        $('#wind-speed').on('click', function() {
            
            if ($(this).text().indexOf('mph') > -1) {
                $(this).text('Wind: ' + windKn + ' kn ' + dirArray[(dir % 16)]);
            } else {
                $(this).text('Wind: ' + wind + ' mph ' + dirArray[(dir % 16)]);
            }
        });
       
        });
        
}

function getRequest() {
    var x;
    var urlCity = "http://api.openweathermap.org/data/2.5/weather?q={city name},{country code}";
    var urlZip = "http://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}";
    
    var val = $('#location').value;
    
    if (Number(val)) {
        $.get(urlZip, function(data) {
            
        });
    } else if (city) {
    
    } else {
        // must be city or zipcode
    }
    
    
}






