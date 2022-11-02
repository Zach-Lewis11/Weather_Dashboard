const apiKey = '68e3bb32aa4b114c90e4903b51b891f1';


// take in city input as parameters api call 

var onSubmit = document.getElementById('button-addon2');
console.log(onSubmit)
onSubmit.addEventListener('click', submitFunction);

function submitFunction(){
    var city= document.querySelector('#city-name').value;
    var country= document.querySelector('#inputCountrySelect').value;
    APICall(city, country)
    //make a function to save past searches to local history 
    localStorage.setItem('cities' , JSON.stringify([city, country]));

}

//make a function to load past searches from local history


// function searchHistory(){
//     var savedCities = JSON.parse(localStorage.getItem('cities'))
//     console.log(savedCities)
//     var searchedCities = document.getElementById('search-history')
//     if(savedCities !== null){
//        for ( var x=0; x < localStorage.length; x++){
//             var btnEl = document.createElement('button')
//             btnEl.classList.add('btn', 'col-12', 'btn-primary')
//             btnEl.innerHTML = savedCities[i]
//             searchedCities.append(btnEl)

//         }
// }
// }
// searchHistory();

// make a function to display results

function APICall(cityName, countryCode) {
    // var cityNameVal = document.querySelector('#city-name').value;
    // var countryCodeVal = document.querySelector('#inputCountrySelect').value;
    // var defaultCityName = 'Dallas';
    // var defaultCountryCode = 'US';
    var cityGeoCodeURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + ',' + countryCode + '&appid=' + apiKey;
    
    // make an api call for city geolocation
    fetch(cityGeoCodeURL)
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var latEl = data[0].lat;
        var lonEl = data[0].lon;
        console.log(latEl);
        console.log(lonEl);
        var currentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latEl + '&lon=' + lonEl + '&units=imperial&appid=' + apiKey;
        // make an api call for current weather in city
        fetch(currentWeatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log(data);
            var currentEl = document.getElementById('current-weather')
            if(currentEl.innerHTML){
                currentEl.innerHTML= '';   
            }
            // function to create Current Weather Card
            var currentCard = document.createElement('div')
            currentCard.classList.add('current-card', 'p-3' ,'border', 'rounded' ,'border-dark');
            var currentWeatherCardTitle = document.createElement('h2');
            currentWeatherCardTitle.innerHTML= "<b>Current Weather in: " + cityName + '</b>';
            var currentIcon = document.createElement('p');
            currentIcon.innerHTML= '<img src="http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png">';
            var currentTemp= document.createElement('p');
            currentTemp.innerHTML='<b>Current temp: </b>' + data.main.temp + '°F';
            var feelsLike = document.createElement('p');
            feelsLike.innerHTML='<b>Feels like: </b>' + data.main.feels_like + '°F';
            var currentWind = document.createElement('p');
            currentWind.innerHTML ='<b>Wind Speed: </b>' + data.wind.speed + 'MPH';
            var currentHumidity = document.createElement('p');
            currentHumidity.innerHTML= '<b>Humidity: </b>' + data.main.humidity + '%';
            currentCard.append(currentWeatherCardTitle, currentIcon, currentTemp, feelsLike, currentWind, currentHumidity);
            currentEl.append(currentCard)
            // make an api call for 5 day forecast in city 
            var fiveDayForecastURL= 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latEl + '&lon=' + lonEl + '&units=imperial&appid=' + apiKey;
            fetch(fiveDayForecastURL)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log(data);
                // function to make five day forecast card
                var timeEl = data.list.filter((e) => e.dt_txt.includes('15:00:00'))
                var fiveDayEl = document.getElementById('five-day-forecast')
                //fiveDayCard.remove();
                if(fiveDayEl.innerHTML){
                    fiveDayEl.innerHTML='';   
                }
                for ( var i = 0; i < timeEl.length; i++) {
                    console.log(timeEl[i].main);
                    var fiveDayCard = document.createElement('div')
                    fiveDayCard.classList.add('five-day-card','m-3', 'p-3' ,'border', 'rounded' ,'border-dark');
                    var fiveDayDate = document.createElement('h3')
                    fiveDayDate.innerHTML= timeEl[i].dt_txt.slice(0, 10);
                    console.log(timeEl[i])
                    var fiveDayIcon = document.createElement('p');
                    fiveDayIcon.innerHTML= '<img src="http://openweathermap.org/img/wn/' + timeEl[i].weather[0].icon + '@2x.png">';
                    var fiveDayTemp = document.createElement('p');
                    fiveDayTemp.innerHTML ="<b>Temp: </b>" + timeEl[i].main.temp + '°F';
                    var fiveDayTempMin = document.createElement('p');
                    fiveDayTempMin.innerHTML ="<b>Min: </b>" + timeEl[i].main.temp_min + '°F';
                    var fiveDayTempMax = document.createElement('p');
                    fiveDayTempMax.innerHTML ="<b>Max: </b>" + timeEl[i].main.temp_max + '°F';
                    var fiveDayWind = document.createElement('p');
                    fiveDayWind.innerHTML ="<b>Wind Speed: </b>" + timeEl[i].wind.speed + ' MPH';
                    var fiveDayHumidity = document.createElement('p');
                    fiveDayHumidity.innerHTML ="<b>Humidity: </b>" + timeEl[i].main.humidity + '%';
                    fiveDayCard.append(fiveDayDate,fiveDayIcon, fiveDayTemp, fiveDayTempMin, fiveDayTempMax, fiveDayWind, fiveDayHumidity);
                    fiveDayEl.append(fiveDayCard);

                }
                
            })
        })
    })
};


    

