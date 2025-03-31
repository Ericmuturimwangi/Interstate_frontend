// api.js
import axios from 'axios';


const API_URL = process.env.REACT_APP_API_BASE_URL;

fetch(`${API_BASE_URL}/api/some-endpoint/`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));