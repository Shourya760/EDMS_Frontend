import api from "../api/axios";

export const loginUser = async (credentials) => {
    try {
        const response = await api.post("/auth/login", credentials);
        return response.data;
    } catch (error) {
        console.log("Error while Logging in: ", error)
    }
};

export const registerUser = async (data) => {
    const response = await api.post("/auth/register", data);
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await api.get("/auth/profile");
    return response.data;
};