function getWeather() {
  const addressInput = document.getElementById("addressInput").value;

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${addressInput}&appid=7ded80d91f2b280ec979100cc8bbba94`;
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const currentWeatherData = JSON.parse(xhr.responseText);
      displayCurrentWeather(currentWeatherData);
      console.log(currentWeatherData);
    }
  };

  xhr.open("GET", currentWeatherUrl, true);
  xhr.send();

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${addressInput}&appid=7ded80d91f2b280ec979100cc8bbba94`
  )
    .then((response) => response.json())
    .then((forecastData) => {
      console.log(forecastData);
      displayForecast(forecastData);
    });
}

function displayCurrentWeather(data) {
  const currentWeatherElement = document.getElementById("currentWeather");
  const temperatureInCelsius = (data.main.temp - 273.15).toFixed(2);

  currentWeatherElement.innerHTML = `<h2>Aktualna pogoda w ${data.name}</h2>
                                       <p>Temperatura: ${temperatureInCelsius}°C</p>
                                       <p>Ciśnienie: ${data.main.pressure} hPa</p>
                                       <p>Wilgotność: ${data.main.humidity}%</p>`;
}

function displayForecast(data) {
  const forecastElement = document.getElementById("forecast");
  forecastElement.innerHTML = "<h2>Prognoza 5-dniowa:</h2>";

  for (let i = 0; i < data.list.length; i += 8) {
    const forecastItem = data.list[i];
    const temperatureInCelsius = (forecastItem.main.temp - 273.15).toFixed(2);

    forecastElement.innerHTML += `<p>Data: ${forecastItem.dt_txt}</p>
                                      <p>Temperatura: ${temperatureInCelsius}°C</p>
                                      <p>Ciśnienie: ${forecastItem.main.pressure} hPa</p>
                                      <p>Wilgotność: ${forecastItem.main.humidity}%</p><hr>`;
  }
}
