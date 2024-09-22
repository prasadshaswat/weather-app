import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import Alerts from './components/Alerts'; // Import Alerts component
import Forecast from './components/Forecast';
import SearchBar from './components/Searchbar';
import WeatherCard from './components/WeatherCard';

const API_KEY = 'fcde9f54650c3a1dcaa942bd95d6be21'; // Replace with your OpenWeatherMap API key

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState('jakarta'); // Default city
  const [timezone, setTimezone] = useState(0); // To store timezone offset
  const [alerts, setAlerts] = useState([]); // To store weather alerts

  // Function to get current location
  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to retrieve your location. Please search for a city.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, []);

  // Fetch current weather data using coordinates
  const fetchWeatherByCoords = useCallback(async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeatherData(data);
        setTimezone(data.timezone); // Set the timezone offset
        fetchWeatherAlerts(lat, lon); // Fetch alerts using coordinates
      } else {
        alert('Location not found');
        setWeatherData(null);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, []);

  // Fetch current weather data and alerts
  const fetchWeather = useCallback(async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeatherData(data);
        setTimezone(data.timezone); // Set the timezone offset
        fetchWeatherAlerts(data.coord.lat, data.coord.lon); // Fetch alerts using coordinates
      } else {
        alert('City not found');
        setWeatherData(null);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, []);

  // Fetch weather alerts based on coordinates
  const fetchWeatherAlerts = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.alerts) {
        setAlerts(data.alerts);
      }
    } catch (error) {
      console.error('Error fetching weather alerts:', error);
    }
  };

  // Fetch 7-day forecast data
  const fetchForecast = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod === "200") {
        setForecastData(data);
      } else {
        alert('City not found');
        setForecastData(null);
      }
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };

  // Fetch weather and forecast data whenever the city changes
  useEffect(() => {
    if (city === 'current') {
      getCurrentLocation();
    } else {
      fetchWeather(city);
      fetchForecast(city);
    }
  }, [city, fetchWeather, getCurrentLocation]); // Include fetchWeather and getCurrentLocation in the dependencies

  return (
    <div className={`app ${weatherData ? weatherData.weather[0].main.toLowerCase() : ''}`}>
      <div className="container mx-auto p-4">
        <SearchBar setCity={setCity} />
        {weatherData && <WeatherCard weather={weatherData} timezone={timezone} />}
        {forecastData && <Forecast forecast={forecastData} timezone={timezone} />}
        {alerts.length > 0 && <Alerts alerts={alerts} />} {/* Show alerts if available */}
      </div>
    </div>
  );
}

export default App;
