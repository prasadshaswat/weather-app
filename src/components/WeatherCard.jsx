import React from 'react';
import { WiBarometer, WiDaySunny, WiFog, WiHumidity, WiStrongWind, WiSunrise, WiSunset, WiThermometer } from 'react-icons/wi';

// Function to determine background color based on weather type
const getBackgroundColor = (weatherType) => {
  switch (weatherType.toLowerCase()) {
    case 'clear':
      return 'bg-gradient-to-r from-yellow-300 to-orange-500'; // Sunny
    case 'clouds':
      return 'bg-gradient-to-r from-gray-400 to-gray-700'; // Cloudy
    case 'rain':
      return 'bg-gradient-to-r from-blue-400 to-blue-700'; // Rainy
    case 'snow':
      return 'bg-gradient-to-r from-blue-200 to-white'; // Snowy
    case 'thunderstorm':
      return 'bg-gradient-to-r from-yellow-600 to-gray-900'; // Thunderstorm
    default:
      return 'bg-gradient-to-r from-teal-300 to-teal-600'; // Default
  }
};

const WeatherCard = ({ weather }) => {
  const { name, main, weather: weatherInfo, wind, sys, visibility } = weather;
  const backgroundColor = getBackgroundColor(weatherInfo[0].main);

  return (
    <div
      className={`rounded-lg shadow-lg p-6 mb-6 max-w-md sm:max-w-lg lg:max-w-xl mx-auto text-center text-white ${backgroundColor} transition-all duration-500 ease-in-out transform hover:scale-105`}
      aria-label={`Weather information for ${name}`}
    >
      <h2 className="text-3xl font-bold mb-1 flex items-center justify-center">
        <WiDaySunny className="text-4xl mr-2" aria-hidden="true" /> {name}
      </h2>
      <p className="text-xl mb-2 capitalize" aria-label="Weather description">
        {weatherInfo[0].description}
      </p>
      <div className="text-6xl font-bold mb-4">
        {Math.round(main.temp)}°C
      </div>

      {/* Temperature Range */}
      <div className="grid grid-cols-2 gap-4 text-lg mb-4">
        <div className="flex items-center justify-center">
          <WiThermometer className="text-2xl mr-1" aria-hidden="true" /> Min: {Math.round(main.temp_min)}°C
        </div>
        <div className="flex items-center justify-center">
          <WiThermometer className="text-2xl mr-1" aria-hidden="true" /> Max: {Math.round(main.temp_max)}°C
        </div>
      </div>

      {/* Humidity and Wind */}
      <div className="grid grid-cols-2 gap-4 text-lg mb-4">
        <div className="flex items-center justify-center" aria-label="Humidity">
          <WiHumidity className="text-2xl mr-1" aria-hidden="true" /> {main.humidity}%
        </div>
        <div className="flex items-center justify-center" aria-label="Wind speed">
          <WiStrongWind className="text-2xl mr-1" aria-hidden="true" /> {wind.speed} m/s
        </div>
      </div>

      {/* Visibility and Pressure */}
      <div className="grid grid-cols-2 gap-4 text-lg mb-4">
        <div className="flex items-center justify-center" aria-label="Visibility">
          <WiFog className="text-2xl mr-1" aria-hidden="true" /> Visibility: {Math.round(visibility / 1000)} km
        </div>
        <div className="flex items-center justify-center" aria-label="Pressure">
          <WiBarometer className="text-2xl mr-1" aria-hidden="true" /> Pressure: {main.pressure} hPa
        </div>
      </div>

      {/* Sunrise and Sunset */}
      <div className="grid grid-cols-2 gap-4 text-lg">
        <div className="flex items-center justify-center" aria-label="Sunrise">
          <WiSunrise className="text-2xl mr-1" aria-hidden="true" /> {new Date(sys.sunrise * 1000).toLocaleTimeString()}
        </div>
        <div className="flex items-center justify-center" aria-label="Sunset">
          <WiSunset className="text-2xl mr-1" aria-hidden="true" /> {new Date(sys.sunset * 1000).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
