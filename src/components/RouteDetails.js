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

  if (!routeData) return <p>No Route found for this Trip.</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2>Route Details</h2>
      <p><strong>Route ID:</strong> {routeData.id}</p>
      <p><strong>Route:</strong> {routeData.route}</p>
      <p><strong>Distance:</strong> {routeData.distance} km</p>
      <p><strong>Duration:</strong> {routeData.duration} hours</p>
    </div>
  );
};

export default RouteDetails;