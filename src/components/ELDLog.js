import React, { useState } from 'react';

const ELDLog = () => {
  const [logData, setLogData] = useState({
    startTime: '',
    endTime: '',
    description: ''
  });

  const handleChange = (e) => {
    setLogData({
      ...logData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Log Submitted:', logData);
    // You can handle log submission logic here, e.g., send it to a backend
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">ELD Log</h2>
      <form onSubmit={handleSubmit}>
        {/* Start Time */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Start Time:</label>
          <input
            type="datetime-local"
            name="startTime"
            value={logData.startTime}
            onChange={handleChange}
            required
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* End Time */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">End Time:</label>
          <input
            type="datetime-local"
            name="endTime"
            value={logData.endTime}
            onChange={handleChange}
            required
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            name="description"
            value={logData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit Log
        </button>
      </form>
    </div>
  );
};

export default ELDLog;