import React, { useState } from 'react';
import axios from 'axios';

const ELDLog = () => {
  const [logData, setLogData] = useState({ startTime: '', endTime: '', description: '' });

  const handleChange = (e) => {
    setLogData({ ...logData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://your-backend-url.com/api/eld-logs/', logData);
      alert('Log submitted successfully!');
    } catch (error) {
      console.error('Error submitting log:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="datetime-local" name="startTime" value={logData.startTime} onChange={handleChange} required />
      <input type="datetime-local" name="endTime" value={logData.endTime} onChange={handleChange} required />
      <textarea name="description" value={logData.description} onChange={handleChange} required />
      <button type="submit">Submit Log</button>
    </form>
  );
};

export default ELDLog;