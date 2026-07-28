import api from "../api/axios";

export const fetchEmployeeData = async () => {
  const response = await api.get("/getemployee");
  return response.data;
};

export const fetchOneEmployeeData = async (id) => {
  const response = await api.get("/getoneemployee", {params: { id }});
  return response.data;
}