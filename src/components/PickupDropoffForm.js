import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PickupDropoffForm = ({ setRouteData }) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [cycleUsed, setCycleUsed] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { pickup, dropoff, cycle: cycleUsed };

    try {
      const response = await axios.post('https://your-backend-url.com/api/routes/', data);
      setRouteData(response.data);  // Update frontend with backend response
      alert('Route submitted successfully!');
    } catch (error) {
      console.error('Error submitting route:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Pickup & Dropoff Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={pickup} onChange={(e) => setPickup(e.target.value)} required />
        <input type="text" value={dropoff} onChange={(e) => setDropoff(e.target.value)} required />
        <input type="number" value={cycleUsed} onChange={(e) => setCycleUsed(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
      <Link to="/route-details">Go to Route Details</Link>
    </div>
  );
};

export default PickupDropoffForm;