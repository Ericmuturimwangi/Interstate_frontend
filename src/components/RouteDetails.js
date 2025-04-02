import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RouteDetails = () => {
  const { id } = useParams(); // id is the Trip ID
  const [routeData, setRouteData] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const tripResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/trips/${id}/`);
        console.log("Trip Data:", tripResponse.data);
        
        // Accessing the routes array and getting the first route, since it's now an array
        if (tripResponse.data.routes && tripResponse.data.routes.length > 0) {
          setRouteData(tripResponse.data.routes[0]);  // Use the first route in the array
        }
      } catch (error) {
        console.error("Error fetching trip details:", error);
      }
    };

    fetchTrip();
  }, [id]);

  if (!routeData) return <p className="text-center text-xl text-gray-600">No Route found for this Trip.</p>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Route Details</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <p className="font-semibold text-lg text-gray-700"><strong>Route ID:</strong></p>
          <p className="text-lg text-gray-600">{routeData.id}</p>
        </div>

        <div className="flex justify-between">
          <p className="font-semibold text-lg text-gray-700"><strong>Route:</strong></p>
          <p className="text-lg text-gray-600">{routeData.route}</p>
        </div>

        <div className="flex justify-between">
          <p className="font-semibold text-lg text-gray-700"><strong>Distance:</strong></p>
          <p className="text-lg text-gray-600">{routeData.distance} km</p>
        </div>

        <div className="flex justify-between">
          <p className="font-semibold text-lg text-gray-700"><strong>Duration:</strong></p>
          <p className="text-lg text-gray-600">{routeData.duration} hours</p>
        </div>
      </div>
    </div>
  );
};

export default RouteDetails;