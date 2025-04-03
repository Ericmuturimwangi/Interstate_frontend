import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const PickupDropoffForm = ({ setRouteData }) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [cycleUsed, setCycleUsed] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);

  const navigate = useNavigate();  // Initialize useNavigate

  const getCoordinates = async (location, setCoords) => {
    if (!location) {
      alert("Please enter a valid location.");
      return;
    }
  
    try {
      const response = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: { q: location, format: "json", limit: 1 },
      });
  
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setCoords({ lat, lon });  // Set the coordinates
      } else {
        alert("Location not found");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pickupCoords || !dropoffCoords) {
      alert("Please fetch coordinates for both Pickup and Dropoff locations.");
      return;
    }

    const data = {
      current_location: currentLocation,
      pickup_location: pickup,
      dropoff_location: dropoff,
      current_cycle_hours: parseFloat(cycleUsed),
      trip: 1, // Assuming default trip ID
      routes: [
        {
          pickup_location: pickup,
          dropoff_location: dropoff,
          pickup_location_coords: pickupCoords,
          dropoff_location_coords: dropoffCoords,
        },
      ],
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/routes/`, data);
      setRouteData(response.data);
      alert('Route submitted successfully!');
      // Navigate to the route details page after successful submission
      navigate(`/route-details/${response.data.id}`);  // Assuming the route has an `id` field
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
          placeholder="Enter Current Location"
          value={currentLocation} 
          onChange={(e) => setCurrentLocation(e.target.value)} 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button type="button" onClick={() => getCoordinates(currentLocation, setPickupCoords)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Get Coordinates for Current Location
        </button>

        <input 
          type="text" 
          placeholder="Enter Pickup Location"
          value={pickup} 
          onChange={(e) => setPickup(e.target.value)} 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button type="button" onClick={() => getCoordinates(pickup, setPickupCoords)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Get Coordinates for Pickup Location
        </button>

        <input 
          type="text" 
          placeholder="Enter Dropoff Location"
          value={dropoff} 
          onChange={(e) => setDropoff(e.target.value)} 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button type="button" onClick={() => getCoordinates(dropoff, setDropoffCoords)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Get Coordinates for Dropoff Location
        </button>

        <input 
          type="number" 
          placeholder="Cycle Used"
          value={cycleUsed} 
          onChange={(e) => setCycleUsed(e.target.value)} 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PickupDropoffForm;