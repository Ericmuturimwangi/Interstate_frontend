import React from 'react';

const RouteDetails = ({ routeData }) => {
  if (!routeData) return null;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg space-y-4">
      <h2 className="text-2xl font-semibold text-center text-gray-700">Route Details</h2>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          <strong className="font-medium text-gray-800">Pickup:</strong> {routeData.pickup}
        </p>
        <p className="text-sm text-gray-600">
          <strong className="font-medium text-gray-800">Dropoff:</strong> {routeData.dropoff}
        </p>
        <p className="text-sm text-gray-600">
          <strong className="font-medium text-gray-800">Cycle Hours:</strong> {routeData.cycle}
        </p>
        {/* Add more details like stops, fuel stations, etc. */}
      </div>
    </div>
  );
};

export default RouteDetails;