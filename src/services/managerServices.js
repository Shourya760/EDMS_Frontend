import api from "../api/axios";

export const fetchAllManager = async () => {
    const response = await api.get("/getmanagers")
    return response.data;
}