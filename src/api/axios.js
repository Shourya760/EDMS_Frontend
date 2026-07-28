import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5050/api",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


// Handle expired or invalid token
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {

            // Remove the expired token
            localStorage.removeItem("token");
            localStorage.removeItem("user");


            // Redirect to login
            window.location.replace("/login");
        }

        return Promise.reject(error);
    }
);




export default api;