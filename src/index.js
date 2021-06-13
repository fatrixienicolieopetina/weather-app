const WeatherApp = function() {
    const GIPHY_API_KEY = "Yw4tONoc5wmCrKPVxoEUbFuCULiYewG0";
    const ERROR = "ERROR";
    const DEFAULT_BG_GIPHY_ID = "ZxLr4sFdcSRVhajXli";

    function setBackgroundImage(bgGiphyId) {
        const img = document.querySelector('img');
        fetch(`https://api.giphy.com/v1/gifs/${bgGiphyId}?api_key=${GIPHY_API_KEY}`, 
               {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            document.body.style.backgroundImage = `url('${response.data.images.original.url}')`;
        });
    }
    
    function getWeatherByLocation(location) {
        const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=99f5272715d7e5ecca0f597fb1ad1d54`;
        
        let weatherData = fetch(WEATHER_URL)
        .then(function(response) {
            if(!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(function(response) {
            let temp = response['main']['temp'];
            let city = response['name'];
            let weather = response['weather'][0];
            let country = response['sys']['country'];
            let weatherDescription = weather['description'];
            let weatherIcon = weather['icon'];
            
            if(country == undefined) {
                country = 'N/A';
            }
    
            return {
                id: response['weather'][0]['id'],
                temperature : temp,
                city: city,
                weatherDescription : weatherDescription,
                weatherIcon: weatherIcon,
                country: country
            };
            
        }).catch(function() {
            return ERROR;
        });
    
        return weatherData;
    }
    
    function setWeatherResults(location) {
        getWeatherByLocation(location)
        .then(
            function(results) {
                changeDisplay(results);
            }
        );
    }

    function changeDisplay(results) {
        let descriptionElement = document.getElementById('description');
        let cityElement = document.getElementById('city');
        let tempElement = document.getElementById('temperature');
        let imgElement = document.getElementById('weather-icon');

        if(results === ERROR) {
            descriptionElement.innerText = "NOT FOUND";
            imgElement.setAttribute('src', "notfound.png");
            cityElement.innerText = '';
            tempElement.innerHTML = '';
            setBackgroundImage(DEFAULT_BG_GIPHY_ID);
        } else {
            descriptionElement.innerText = results['weatherDescription'];
            imgElement.setAttribute('src', `https://openweathermap.org/img/wn/${results['weatherIcon']}@2x.png`)
            cityElement.innerText = `${results['city']}, ${results['country']}`;
            tempElement.innerHTML = `${results['temperature']}&deg;C`;
            changeBgDependingOnDescription(results['id']);
        }
    }
    
    function addEventListenerToSearchLocationButton() {
        let searchBtn = document.getElementById('search-location');
        let input = document.getElementById("input-location");
    
        searchBtn.addEventListener("click", function() {setWeatherResults(input.value)});
        document.addEventListener("keypress", function(e) {
            if(e.key === 'Enter') {
                if(input.value !== '') {
                    setWeatherResults(input.value);
                    input.value = '';
                }
                
            }
        });
    }
    
    function changeBgDependingOnDescription(id) {
        let giphyId = DEFAULT_BG_GIPHY_ID;
        const THUNDERSTORM_BG_GIPGY_ID = "3osxYzIQRqN4DOEddC";
        const DRIZZLE_BG_GIPGY_ID = "xT9GEz2CeU9uaI2KZi";
        const RAIN_BG_GIPGY_ID = "3oKIPstwMF15FghbYQ";
        const SNOW_BG_GIPGY_ID = "6YNgoTEPs6vZe";
        const ATMOSPHERE_BG_GIPGY_ID = "hTgdcNl4LXLlOelNvZ";
        const CLEAR_BG_GIPGY_ID = "wNipYAoZ3iaEE";
        const CLOUDS_BG_GIPGY_ID = "oNXIP3xpr00k05NVPQ";

        if(id >= 200 && id < 300) {
            giphyId = THUNDERSTORM_BG_GIPGY_ID;
        } else if(id >= 300 && id < 400) {
            giphyId = DRIZZLE_BG_GIPGY_ID;
        } else if(id >= 500 && id < 600) {
            giphyId = RAIN_BG_GIPGY_ID;
        } else if(id >= 600 && id < 700) {
            giphyId = SNOW_BG_GIPGY_ID;
        } else if(id >= 700 && id < 800) {
            giphyId = ATMOSPHERE_BG_GIPGY_ID;
        } else if(id == 800) {
            giphyId = CLEAR_BG_GIPGY_ID;
        } else if(id >= 800) {
            giphyId = CLOUDS_BG_GIPGY_ID;
        } 

        setBackgroundImage(giphyId);
    }
    
    function init() {
        setWeatherResults('Cebu');
        addEventListenerToSearchLocationButton();
    }

    return {init}
}();

WeatherApp.init();