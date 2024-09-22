// src/components/Alerts.js
import React from 'react';

const Alerts = ({ alerts }) => {
  return (
    <div className="bg-red-500 text-white rounded-lg p-4 mt-4">
      <h2 className="text-lg font-bold">Weather Alerts</h2>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index} className="my-2">
            <strong>{alert.event}</strong>: {alert.description} 
            <br />
            <em>{new Date(alert.start * 1000).toLocaleString()} - {new Date(alert.end * 1000).toLocaleString()}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;
