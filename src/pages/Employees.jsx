import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { fetchAllDepartments } from "../services/departmentservices";
import { fetchEmployeeData } from "../services/employeeservices";

const Employees = () => {
  const [searchText, setSearchText] = useState("");
  const [employeeData, setEmployeeData] = useState([]);

  const navigate = useNavigate();

  // const [showOptions, setShowOptions] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const employees = await fetchEmployeeData();
        setEmployeeData(employees.data);
        console.log(employees.data)

      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);




  const filteredEmployees = employeeData.filter((employee) => {

    const matchesSearch =
      (employee.name || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (employee.email || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (employee.designation || "").toLowerCase().includes(searchText.toLowerCase());

    return matchesSearch;

  });


  return (

    <AdminLayout>
     




      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">Employee records</p>
          <h1 className="text-3xl font-bold text-slate-950">Employees</h1>
        </div>

        {!open ? (
          <button
            onClick={() => setOpen(true)}
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            + Add Employee
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/employees/bulk-new"
              className="rounded-lg border border-blue-200 bg-blue-50 px-5 py-2.5 font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              + Add Many
            </Link>
            <Link
              to="/employees/new"
              className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              + Add One
            </Link>

            <button
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              title="Cancel"
            >
              ✕
            </button>
          </div>
        )}
      </div>







      {/* Searching  And Shorting  */}
      <div className="mb-6 grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_240px]">
        <input
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search employees..."
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 transition-all duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none"
        />
      </div>

      {/* Listing  */}
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="text-left p-4">Profile</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Designation</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((employee) => (
              <tr
                key={employee._id}
                className="cursor-pointer border-t border-slate-200 hover:bg-slate-50"
                onClick={() => navigate(`/employees/${employee._id}`)}
              >
                <td className="p-4 font-medium">
                  {employee.profile_image ? (
                    <img
                      src={employee.profile_image}
                      alt={employee.name}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                      {employee.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </td>
                <td className="p-4 font-medium text-slate-950">
                  <div className="flex items-center gap-2">
                    <span>{employee.name || "UNKNOWN"}</span>

                    {employee.is_manager && (
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                        Manager
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4 text-slate-600">{employee.email}</td>
                <td className="p-4 text-slate-600">{employee.designation}</td>
                <td className="p-4">
                  <span className={`mt-3 inline-block rounded-full px-4 py-1 text-sm font-medium ${employee.status
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                    }`}
                  >
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

    </AdminLayout >
  );
};

export default Employees;
