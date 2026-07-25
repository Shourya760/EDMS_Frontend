import api from "../api/axios";

export const fetchAllDepartments = async () => {
  const response = await api.get("/getalldepartment");
  return response.data;
};