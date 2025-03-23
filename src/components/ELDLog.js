import React from 'react';

const ELDLog = ({ logData }) => {
  if (!logData) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Driver's Daily Log</h2>
      <p><strong>Trip Duration:</strong> {logData.duration} hours</p>
      <p><strong>Start Time:</strong> {logData.startTime}</p>
      <p><strong>End Time:</strong> {logData.endTime}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default ELDLog;