import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PickupDropoffForm = ({ setRouteData }) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [cycleUsed, setCycleUsed] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      pickup,
      dropoff,
      cycle: cycleUsed,
    };
    setRouteData(data); // Set route data for RouteDetails
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Pickup & Dropoff Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Pickup Location */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Pickup Location:</label>
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            required
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Dropoff Location */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Dropoff Location:</label>
          <input
            type="text"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            required
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Cycle Used */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Cycle Used (Hours):</label>
          <input
            type="number"
            value={cycleUsed}
            onChange={(e) => setCycleUsed(e.target.value)}
            required
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>

      {/* Link to RouteDetails */}
      <div className="mt-4 text-center">
        <Link
          to="/route-details"
          className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
        >
          Go to Route Details
        </Link>
      </div>
    </div>
  );
};

export default PickupDropoffForm;
