// axios
import axios from 'axios'

const API_URL = process.env.MIX_DATA_API_URL

const API = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(function(config) {
  const token = window.$cookies.get('_DMt');

  if ( token != null ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, function(err) {
  return Promise.reject(err);
});


export default API;
