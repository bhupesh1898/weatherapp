import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherApp.css'; // Import CSS styles
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import cloud_icon from '../Assets/cloud.png';
import maxtempe from '../Assets/maxtempe.png';
import mintempe from '../Assets/mintempe.png';

// Define a React functional component called WeatherApp
const WeatherApp = () => {
  // State variables for component
  const [wicon, setWicon] = useState(cloud_icon); // Weather icon, default to 'cloud_icon'
  const [dailyData, setDailyData] = useState([]); // Daily forecast data
  const [city, setCity] = useState(''); // City input

  // Function to search for weather data
  const search = async () => {
    // Check if the city input is empty
    if (city === '') {
      return; // Exit the function if it's empty
    }

    try {
      // Fetch current weather data from the backend
      const weatherResponse = await axios.get(`http://localhost:5000/weather?city=${city}`);
      const weatherData = weatherResponse.data;

      // Update component state with weather data
      const humidity = document.getElementsByClassName('humidity-percent');
      const wind = document.getElementsByClassName('wind-rate');
      const temperature = document.getElementsByClassName('weather-temp');
      const location = document.getElementsByClassName('weather-location');
      const mintemp = document.getElementsByClassName('min-temp');
      const maxtemp = document.getElementsByClassName('max-temp');

      humidity[0].innerHTML = weatherData.main.humidity + '%';
      wind[0].innerHTML = Math.floor(weatherData.wind.speed) + 'km/h';
      temperature[0].innerHTML = Math.floor(weatherData.main.temp) + '°C';
      location[0].innerHTML = weatherData.name + ', ' + weatherData.sys.country;
      mintemp[0].innerHTML = Math.floor(weatherData.main.temp_min) + '°C';
      maxtemp[0].innerHTML = Math.floor(weatherData.main.temp_max) + '°C';

      // Fetch daily forecast data from the backend
      const dailyResponse = await axios.get(`http://localhost:5000/daily-forecast?city=${city}`);
      const dailyData = dailyResponse.data.list;

      // Update daily forecast state
      setDailyData(dailyData);

      // Update weather icon based on weather conditions
      if (weatherData.weather[0].icon === '01d' || weatherData.weather[0].icon === '01n') {
        setWicon(clear_icon);
      } else if (weatherData.weather[0].icon === '02d' || weatherData.weather[0].icon === '02n') {
        setWicon(cloud_icon);
      } else if (weatherData.weather[0].icon === '03d' || weatherData.weather[0].icon === '03n') {
        setWicon(drizzle_icon);
      } else if (weatherData.weather[0].icon === '04d' || weatherData.weather[0].icon === '04n') {
        setWicon(drizzle_icon);
      } else if (weatherData.weather[0].icon === '09d' || weatherData.weather[0].icon === '09n') {
        setWicon(rain_icon);
      } else if (weatherData.weather[0].icon === '10d' || weatherData.weather[0].icon === '10n') {
        setWicon(rain_icon);
      } else if (weatherData.weather[0].icon === '13d' || weatherData.weather[0].icon === '13n') {
        setWicon(snow_icon);
      } else {
        setWicon(clear_icon);
      }
    } catch (error) {
      console.error(error);
      // Handle errors as needed
    }
  };

  // Call the search function when the component mounts
  useEffect(() => {
    search();
  }, []);

  // Render the component's HTML structure
  return (
    <div className="container d-flex flex-column align-item-center justify-content-center">
      {/* Top bar with search input and icon */}
      <div className="top-bar d-flex text-center align-items-center justify-content-center">
        <input
          type="text"
          className="cityInput px-4"
          placeholder="search"
          onChange={(e) => setCity(e.target.value)}
        />
        <div className="search-icon p-3" onClick={search}>
          <img
            src={search_icon}
            alt=""
            className="img-fluid d-flex aligh-items-center rounded-circle"
          />
        </div>
      </div>
      {/* Weather icon */}
      <div className="weather-image d-flex justify-content-center">
        <img src={wicon} alt="" className="img-fluid" />
      </div>
      {/* Current temperature and location */}
      <div className="weather-temp">--°C</div>
      <div className="weather-location">------</div>
      {/* Weather data elements */}
      <div className="data-container">
        <div className="col d-flex my-5">
          <div className="element py-3">
            <img src={mintempe} alt="" className="icon" />
            <div className="data">
              <div className="min-temp">--</div>
              <div className="text">Min. Temperature</div>
            </div>
          </div>
          <div className="element py-3">
            <img src={maxtempe} alt="" className="icon" />
            <div className="data">
              <div className="max-temp">--</div>
              <div className="text">Max. Temperature</div>
            </div>
          </div>
        </div>
        <div className="col d-flex my-5">
          <div className="element py-3">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">--</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element py-3">
            <img src={wind_icon} alt="" className="icon" />
            <div className="data">
              <div className="wind-rate">--</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
      {/* Daily forecast */}
      <div className="daily-title text-white fs-5 mt-4">Forecast for every 3 hours</div>
      <div className="daily_data d-flex overflow-auto text-white mt-2 pb-4">
        {dailyData.map((item, index) => (
          <div key={index} className="daily-element">
            <div className="data px-4">
              <div className="d-w" style={{ fontSize: '1em' }}>
                {Math.floor(item.main.temp)}°C
              </div>
              <div className="text" style={{ fontSize: '0.4em' }}>
                {item.dt_txt}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherApp;
