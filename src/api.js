// api.js
import axios from 'axios';

// Replace with your actual backend URL
const API_URL = 'https://your-django-backend-url.com/api/routes';

export const fetchRouteDetails = async (routeId) => {
  try {
    const response = await axios.get(`${API_URL}/${routeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching route data:', error);
    return null;
  }
};