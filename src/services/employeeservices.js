import api from "../api/axios";

export const fetchEmployeeData = async () => {
  const response = await api.get("/getemployee");
  return response.data;
};