import api from "../api/axios";

export const getalldocument = async () => {
    const response = await api.get("getalldocument");
    return response.data;
}

export const verifydocument = async (data) => {
    const response = await api.patch("verifydocument", data)
    return response.data;
}