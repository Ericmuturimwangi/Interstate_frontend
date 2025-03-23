import React, { useState } from 'react';

const PickupDropoffForm = ({ onSubmit }) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [cycle, setCycle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ pickup, dropoff, cycle });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm">Pickup Location</label>
        <input
          type="text"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter pickup location"
        />
      </div>
      <div>
        <label className="block text-sm">Dropoff Location</label>
        <input
          type="text"
          value={dropoff}
          onChange={(e) => setDropoff(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter dropoff location"
        />
      </div>
      <div>
        <label className="block text-sm">Cycle Used (Hours)</label>
        <input
          type="number"
          value={cycle}
          onChange={(e) => setCycle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter cycle hours"
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default PickupDropoffForm;