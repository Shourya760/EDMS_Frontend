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



export const updateUser = async (formData) => {
    const response = await api.patch("/auth/updateUser", formData);
    return response.data;
}



export const updatePassword = async (formData) => {
    const response = await api.patch("/auth/updatePassword", formData);
    return response.data;
};
export const resetPassword = async (formData) => {
    const response = await api.post("/auth/forgotPassword", formData);
    return response.data;
};
export const getAllUsers = async () => {
    const response = await api.get("/auth/getAllUsers");
    return response.data;
};