import React, { useState } from 'react';
import { Link } from 'react-router-dom';  
import axios from 'axios';

const PickupDropoffForm = ({ setRouteData }) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [cycleUsed, setCycleUsed] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [routeData, setLocalRouteData] = useState(null);
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [currentLocationCoords, setCurrentLocationCoords] = useState(null);

  // Function to get coordinates from Nominatim API
  const getCoordinates = async (location, setCoords) => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: location,
          format: 'json',
          limit: 1,
        },
      });
  
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setCoords({ lat, lon });
      } else {
        alert('Location not found');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the data object including coordinates
    const data = {
      current_location: currentLocation,
      pickup_location: pickup,
      dropoff_location: dropoff,
      current_cycle_hours: parseFloat(cycleUsed),
      trip: 1, // Assuming you want to link to a trip with ID 1. Adjust as needed.
      current_location_coords: currentLocationCoords,
      pickup_location_coords: pickupCoords,
      dropoff_location_coords: dropoffCoords,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/routes/`, data);
      setRouteData(response.data);
      setLocalRouteData(response.data);
      alert('Route submitted successfully!');
    } catch (error) {
      console.error('Error submitting route:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Pickup & Dropoff Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current Location Input */}
        <input 
          type="text" 
          placeholder="Enter Current Location"
          value={currentLocation} 
          onChange={(e) => setCurrentLocation(e.target.value)} 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => getCoordinates(currentLocation, setCurrentLocationCoords)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Get Coordinates for Current Location
        </button>

        {/* Pickup Location Input */}
        <input 
          type="text" 
          placeholder="Enter Pickup Location"
          value={pickup} 
          onChange={(e) => setPickup(e.target.value)} 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => getCoordinates(pickup, setPickupCoords)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Get Coordinates for Pickup Location
        </button>

        {/* Dropoff Location Input */}
        <input 
          type="text" 
          placeholder="Enter Dropoff Location"
          value={dropoff} 
          onChange={(e) => setDropoff(e.target.value)} 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => getCoordinates(dropoff, setDropoffCoords)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Get Coordinates for Dropoff Location
        </button>

        {/* Cycle Used Input */}
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

      {/* Conditionally render the link if routeData is available */}
      {routeData && (
        <div className="text-center mt-4">
          <p>Generated Route ID: {routeData.id}</p>
          <p>Trip ID: {routeData.trip}</p> {/* Debugging log */}
          <Link to={`/routes/${routeData.id}`} className="text-blue-500 hover:underline">
            Go to Route Details
          </Link>
        </div>
      )}
    </div>
  );
};

export default PickupDropoffForm;