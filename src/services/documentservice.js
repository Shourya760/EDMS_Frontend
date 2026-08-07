import api from "../api/axios";

export const getalldocument = async () => {
    const response = await api.get("getalldocument");
    return response.data;
}