import api from "../api/axios";

export const fetchEmployeeData = async () => {
  const response = await api.get("/getemployee");
  return response.data;
};

export const fetchOneEmployeeData = async (id) => {
  const response = await api.get("/getoneemployee", { params: { id } });
  return response.data;
}

export const updateEmployeeData = async (employee_id, data) => {
  const response = await api.patch("/updateemployee", {
    employee_id,
    data,
  });
  return response;
};

export const fetchRecentThreeEmployees = async () => {
  const response = await api.get("/getemployee?recentThree=true");
  return response.data;
};