import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';  

const PickupDropoffForm = ({ setRouteData }) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [cycleUsed, setCycleUsed] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');  // Add state for current location

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { 
      current_location: currentLocation,  // Add current_location field
      pickup_location: pickup,
      dropoff_location: dropoff,
      current_cycle_hours: parseFloat(cycleUsed),
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/routes/`, data);
      setRouteData(response.data);
      alert('Route submitted successfully!');
    } catch (error) {
      console.error('Error submitting route:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Pickup & Dropoff Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          placeholder="Enter Current Location"  // Add field for current location
          value={currentLocation} 
          onChange={(e) => setCurrentLocation(e.target.value)} 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="text" 
          placeholder="Enter Pickup Location"
          value={pickup} 
          onChange={(e) => setPickup(e.target.value)} 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="text" 
          placeholder="Enter Dropoff Location"
          value={dropoff} 
          onChange={(e) => setDropoff(e.target.value)} 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="number" 
          placeholder="Cycle Used"
          value={cycleUsed} 
          onChange={(e) => setCycleUsed(e.target.value)} 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
        >
          Submit
        </button>
      </form>
      <div className="text-center mt-4">
        <Link to="/route-details" className="text-blue-500 hover:underline">Go to Route Details</Link>
      </div>
    </div>
  );
};

export default PickupDropoffForm;