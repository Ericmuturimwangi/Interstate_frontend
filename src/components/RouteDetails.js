import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import L from 'leaflet';

const RouteDetails = () => {
  const { id } = useParams(); 
  const [routeData, setRouteData] = useState(null);
  const mapRef = React.useRef(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const tripResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/trips/${id}/`);
        if (tripResponse.data.routes && tripResponse.data.routes.length > 0) {
          setRouteData(tripResponse.data.routes[0]);
        }
      } catch (error) {
        console.error("Error fetching trip details:", error);
      }
    };

    fetchTrip();
  }, [id]);

  useEffect(() => {
    if (routeData && routeData.start_latitude && routeData.start_longitude && routeData.end_latitude && routeData.end_longitude) {
      // Initialize the map
      const map = L.map(mapRef.current).setView([routeData.start_latitude, routeData.start_longitude], 8);

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      // Add markers for start and end locations
      L.marker([routeData.start_latitude, routeData.start_longitude]).addTo(map)
        .bindPopup('Start Location')
        .openPopup();

      L.marker([routeData.end_latitude, routeData.end_longitude]).addTo(map)
        .bindPopup('End Location')
        .openPopup();

      // Create and display the route (polyline) if you have coordinates
      const routeCoordinates = [
        [routeData.start_latitude, routeData.start_longitude],
        [routeData.end_latitude, routeData.end_longitude]
      ];

      L.polyline(routeCoordinates, { color: 'blue', weight: 4 }).addTo(map);

      // Cleanup the map instance on component unmount
      return () => {
        map.remove();  // Remove map to avoid memory leaks
      };
    }
  }, [routeData]);

  if (!routeData) {
    // Show loading state or return null if data is not yet available
    return <div>Loading...</div>;
  }

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

      <div id="map" ref={mapRef} style={{ height: '400px', marginTop: '20px' }}></div>
    </div>
  );
};

export default RouteDetails;