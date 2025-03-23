import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RouteDetails = ({ routeId }) => {
  const [routeData, setRouteData] = useState(null);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await axios.get(`https://your-backend-url.com/api/routes/${routeId}/`);
        setRouteData(response.data);
      } catch (error) {
        console.error('Error fetching route details:', error);
      }
    };

    fetchRoute();
  }, [routeId]);

  if (!routeData) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2>Route Details</h2>
      <p><strong>Pickup:</strong> {routeData.pickup}</p>
      <p><strong>Dropoff:</strong> {routeData.dropoff}</p>
      <p><strong>Cycle Hours:</strong> {routeData.cycle}</p>
    </div>
  );
};

export default RouteDetails;