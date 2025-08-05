import axios from "axios";

console.log("BASE_URL", import.meta.env.VITE_REACT_SERVER_BASE_URL);
// Create axios instance - Option 1
const Axios = axios.create({
	baseURL: import.meta.env.VITE_REACT_SERVER_BASE_URL,
	headers: { "Content-Type": "application/json" },
});

// Request Interceptor - Add access token
Axios.interceptors.request.use((config) => {
    
  const token = localStorage.getItem("token");
  // console.log("API RESPONSE TOKEN ===========>>> ", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
		return config;
	}, (error) => {
    Promise.reject(error)
});

export default Axios;