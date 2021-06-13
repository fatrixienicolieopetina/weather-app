const GIPHY_API_KEY = "Yw4tONoc5wmCrKPVxoEUbFuCULiYewG0";

function setBackgroundImage() {
    const img = document.querySelector('img');
    const bgGiphyId = "ZxLr4sFdcSRVhajXli";
    const rainGiphyId = "3o7btWO4T2Wp97lbgc";
    const normalGiphyId = "ZxLr4sFdcSRVhajXli";

    fetch(`https://api.giphy.com/v1/gifs/${bgGiphyId}?api_key=${GIPHY_API_KEY}`, {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        document.body.style.backgroundImage = `url('${response.data.images.original.url}')`;
    });
}

function getWeatherByLocation(location) {
    const WEATHER_URL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=99f5272715d7e5ecca0f597fb1ad1d54`;
    
    let weatherData = fetch(WEATHER_URL)
    .then(function(response) {
        // console.log(response.json());
        return response.json();
    })
    .then(function(response) {
        //WEATHER CONDITIONS
        // Group 2xx: Thunderstorm
        // Group 3xx: Drizzle
        // Group 5xx: Rain
        // Group 6xx: Snow
        // Group 7xx: Atmosphere
        // Group 800: Clear
        // Group 80x: Clouds
        // visit https://openweathermap.org/weather-conditions
        //celsius = metric
        // fahreinheight = imperial
        // icon http://openweathermap.org/img/wn/10d@2x.png

        let temp = response['main']['temp'];
        let city = response['name'];
        let weather = response['weather'][0];
        let country = response['sys']['country'];
        let weatherDescription = weather['description'];
        let weatherIcon = weather['icon'];
        console.log({
            temperature : temp,
            city: city,
            weatherDescription : weatherDescription,
            weatherIcon: weatherIcon,
            country: country
        });
        return {
            temperature : temp,
            city: city,
            weatherDescription : weatherDescription,
            weatherIcon: weatherIcon,
            country: country
        };
        
    });

    return weatherData;
}

function setWeatherResults() {
    getWeatherByLocation('London')
    .then(
        function(results) {
            let descriptionElement = document.getElementById('description');
            let cityElement = document.getElementById('city');
            let tempElement = document.getElementById('temperature');
            let imgElement = document.getElementById('weather-icon');
        
            console.log(results);
            descriptionElement.innerText = results['weatherDescription'];
            imgElement.setAttribute('src', `http://openweathermap.org/img/wn/${results['weatherIcon']}@2x.png`)
            cityElement.innerText = `${results['city']}, ${results['country']}`;
            tempElement.innerText = results['temperature'];
        }
    );
}

setBackgroundImage();
// getWeatherByLocation('Cebu');
setWeatherResults();