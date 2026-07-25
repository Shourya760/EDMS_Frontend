import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { fetchAllDepartments } from "../services/departmentservices";
import { fetchEmployeeData } from "../services/employeeservices";

const Employees = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [employeeData, setEmployeeData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);




  useEffect(() => {
    const loadData = async () => {
      try {
        const employees = await fetchEmployeeData();
        setEmployeeData(employees.data);

        const departments = await fetchAllDepartments();
        setDepartmentData(departments.data);

      } catch (error) {
        console.log(error);
      }
    };


    loadData();
  }, []);



  // console.log(employeeData);
  // console.log("department data ",departmentData);

  const filteredEmployees = employeeData.filter((employee) => {

    const matchesSearch =
      (employee.name || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (employee.email || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (employee.designation || "").toLowerCase().includes(searchText.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "" ||
      employee.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });


  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-700">Employee records</p>
          <h1 className="text-3xl font-bold text-slate-950">Employees</h1>
        </div>

        <Link
          to="/employees/new"
          className="rounded-lg bg-blue-700 px-4 py-2.5 text-center font-semibold text-white shadow-sm transition hover:bg-blue-800"
        >
          Add Employee
        </Link>
      </div>

      <div className="mb-6 grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_240px]">
        <input
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search employees..."
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-600"
        />

        <select
          value={selectedDepartment}
          onChange={(event) => setSelectedDepartment(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-600"
        >
          <option value="">All departments</option>
          console.log("Department_Data = ",departmentData)
          {departmentData.map((department) => (
            <option
              key={department._id}
              value={department.department_name}
            >
              {department.department_name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Department</th>
              <th className="text-left p-4">Designation</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((employee) => (

              <tr
                key={employee._id}
                className="border-t border-slate-200 hover:bg-slate-50"
              >

                <td className="p-4 font-medium text-slate-950">
                  {employee.name ? employee.name : "UNKNOWN"}
                </td>

                <td className="p-4 text-slate-600">{employee.email}</td>
                <td className="p-4 text-slate-600">{employee.department}</td>
                <td className="p-4 text-slate-600">{employee.designation}</td>
                <td className="p-4">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    {employee.status ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredEmployees.length === 0 && (
          <p className="border-t border-slate-200 p-4 text-sm text-slate-500">
            No employees found.
          </p>
        )}



      </div>




    </AdminLayout>
  );
};

export default Employees;
