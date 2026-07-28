import AdminLayout from "../layouts/AdminLayout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllDepartments } from "../services/departmentservices";

const Departments = () => {

  const [departmentData, setDepartmentData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const loadData = async () => {

      try {
        setLoading(true);
        const departments = await fetchAllDepartments();
        setDepartmentData(departments.data);
        console.log(departments.data)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();

  }, []);

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-blue-700">Teams</p>
          <h1 className="text-3xl font-bold text-slate-950">Departments</h1>
        </div>

        <Link
          to="/departments/new"
          className="rounded-lg bg-blue-700 px-4 py-2.5 text-center font-semibold text-white shadow-sm transition hover:bg-blue-800"
        >
          Add Department
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Manager</th>
              <th className="text-left p-4">Description</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="2"
                  className="p-4 text-center text-slate-500"
                >
                  Loading departments...
                </td>
              </tr>
            ) : (
              departmentData.map((department) => (
                <tr
                  key={department._id}
                  className="border-t border-slate-200"
                >
                  <td className="p-4 font-medium text-slate-950">
                    {department.department_name}
                  </td>
                  <td className="p-4 text-slate-600">{department.department_manager_id?.name || "..."}</td>
                  <td className="p-4 text-slate-600">{department.department_description}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {!loading && departmentData.length === 0 && (
          <p className="border-t border-slate-200 p-4 text-sm text-slate-500">
            No departments found.
          </p>
        )}
      </div>
    </AdminLayout>
  );
};

export default Departments;