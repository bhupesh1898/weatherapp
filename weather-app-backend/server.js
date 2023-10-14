// Import required libraries and packages
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for your server
app.use(cors());

// Replace with your OpenWeatherMap API key
const api_key = '99f74f446fc4536011af417209bbd61a';

// Route to fetch current weather data
app.get('/weather', async (req, res) => {
  try {
    const city = req.query.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
    
    // Fetch current weather data
    const response = await axios.get(url);
    const data = response.data;
    
    // Send the weather data as a JSON response
    res.json(data);
  } catch (error) {
    console.error(error);
    
    // Handle errors by sending a 500 Internal Server Error response
    res.status(500).json({ error: 'An error occurred while fetching weather data.' });
  }
});

// Route to fetch daily forecast data
app.get('/daily-forecast', async (req, res) => {
  try {
    const city = req.query.city;
    const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${api_key}`;
    
    // Fetch daily forecast data
    const response = await axios.get(url2);
    const data = response.data;
    
    // Send the forecast data as a JSON response
    res.json(data);
  } catch (error) {
    console.error(error);
    
    // Handle errors by sending a 500 Internal Server Error response
    res.status(500).json({ error: 'An error occurred while fetching daily forecast data.' });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
