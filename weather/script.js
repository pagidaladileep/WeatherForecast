document.addEventListener("DOMContentLoaded", function () {
    let apiKey = "1dbf2c692d957e485688ceefd9657008"; // Replace with your actual API key from a weather service

    let weatherResult = document.getElementById("weather-result");
    let searchButton = document.getElementById("search-button");
    let cityInput = document.getElementById("city");

    // Function to fetch weather details from the API and display them
    let getWeather = () => {
        let cityName = cityInput.value;
        // If input field is empty
        if (cityName.length === 0) {
            weatherResult.innerHTML = `<h3 class="message">Please enter a city name</h3>`;
        }
        // If input field is NOT empty
        else {
            let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
            // Clear the input field
            cityInput.value = "";
            fetch(apiUrl)
                .then((response) => response.json())
                // If city name is valid
                .then((data) => {
                    console.log(data);
                    weatherResult.innerHTML = `
                        <h2>${data.name}</h2>
                        <h4 class="weather">${data.weather[0].main}</h4>
                        <h4 class="description">${data.weather[0].description}</h4>
                        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
                        <h1>${data.main.temp} &#176;C</h1>
                        <div class="temp-container">
                            <div>
                                <h4 class="title">Min</h4>
                                <h4 class="temp">${data.main.temp_min}&#176;C</h4>
                            </div>
                            <div>
                                <h4 class="title">Max</h4>
                                <h4 class="temp">${data.main.temp_max}&#176;C</h4>
                            </div>
                        </div>
                    `;
                })
                // If city name is NOT valid
                .catch(() => {
                    weatherResult.innerHTML = `<h3 class="message">City not found</h3>`;
                });
        }
    };

    searchButton.addEventListener("click", getWeather);

    // Call the getWeather function on page load
    getWeather();
});
