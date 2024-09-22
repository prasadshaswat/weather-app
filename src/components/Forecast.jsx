import React from 'react';
import './Forecast.css'; // Import the custom CSS for the flip effect

// Helper function to convert forecast times based on timezone
const convertToLocalTime = (timestamp, timezoneOffset) => {
  const localTime = new Date((timestamp + timezoneOffset) * 1000);
  return localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Forecast = ({ forecast, timezone }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
  {forecast.list.slice(0, 7).map((day, index) => (
    <div key={index} className="forecast-card flip-card">
      <div className="flip-card-inner">
        {/* Front Side - Display Date */}
        <div className="flip-card-front">
          <p className="font-extrabold mb-2">
            {new Date(day.dt * 1000).toLocaleDateString(undefined, { weekday: 'long' })}
          </p>
          <p className="text-sm text-gray-500">
            {convertToLocalTime(day.dt, timezone)}
          </p>
        </div>

        <div className="flip-card-back">
  <p className="text-2xl font-semibold mb-2">{Math.round(day.main.temp)}°C</p>
  <p className="capitalize mb-2">{day.weather[0].description}</p>
  <p className="text-sm mb-2">Min: {Math.round(day.main.temp_min)}°C | Max: {Math.round(day.main.temp_max)}°C</p>
  <p className="text-sm mb-2">Wind Speed: {day.wind.speed} m/s</p>
  <p className="text-sm mb-2">Humidity: {day.main.humidity}%</p>
  <p className="text-sm mb-2">Pressure: {day.main.pressure} hPa</p>
  <p className="text-sm mb-2">Visibility: {day.visibility / 1000} km</p>
 
  <p className="text-sm mb-2">
    Chance of Rain: {day.pop ? `${Math.round(day.pop * 100)}%` : 'N/A'}
  </p>
</div>


      </div>
    </div>
  ))}
</div>

  );
};

export default Forecast;
