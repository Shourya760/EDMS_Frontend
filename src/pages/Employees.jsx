import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { fetchAllDepartments } from "../services/departmentservices";
import { fetchEmployeeData, uploadManyEmployees } from "../services/employeeservices";

const Employees = () => {
  const [searchText, setSearchText] = useState("");
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setloading] = useState();
  const [uploadErrors, setUploadErrors] = useState([]);
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


  const handelupload = async (event) => {

    const file = event.target.files[0];

    console.log("File is :", file)
    setloading(true);
    setUploadErrors([]);

    try {
      console.log("updating documents it ..........")
      const formData = new FormData();

      formData.append("file", file);
      const result = await uploadManyEmployees(formData);

      console.log("coming from backend", result);
      alert("Done ✅")
      
    } catch (error) {
      console.log("Failed in uploading Employees => ", error);

      const backendError = error.response?.data;

      if (backendError?.errors) {
        setUploadErrors(backendError.errors);
      } else {
        setUploadErrors([
          {
            row: "-",
            field: "-",
            message: backendError?.message || "Something went wrong",
          },
        ]);
      }
    } finally {
      setloading(false);

    }
  }


  const filteredEmployees = employeeData.filter((employee) => {

    const matchesSearch =
      (employee.name || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (employee.email || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (employee.designation || "").toLowerCase().includes(searchText.toLowerCase());

    return matchesSearch;

  });


  if (loading) {
    return (
      <AdminLayout>
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <h2 className="text-lg font-semibold text-slate-900">
              Importing employees
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Please wait while we process your file...
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (uploadErrors.length > 0) {
    return (
      <AdminLayout>
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="w-full max-w-2xl rounded-xl border border-red-200 bg-white shadow-sm">

            {/* Header */}
            <div className="border-b border-red-100 bg-red-50 px-6 py-4">
              <h2 className="text-lg font-semibold text-red-800">
                Employee import failed
              </h2>

              <p className="mt-1 text-sm text-red-600">
                We found {uploadErrors.length} error
                {uploadErrors.length !== 1 ? "s" : ""} in your file.
              </p>
            </div>

            {/* Errors */}
            <div className="max-h-80 overflow-y-auto px-6 py-4">
              <div className="space-y-3">
                {uploadErrors
                  .sort((a, b) => a.row - b.row)
                  .map((error, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-slate-200 bg-slate-50 p-3"
                    >
                      <div className="flex items-start gap-3">
                        <span className="rounded-md bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                          Row {error.row}
                        </span>

                        <div>
                          <p className="text-sm font-medium text-slate-800">
                            {error.field}
                          </p>

                          <p className="mt-0.5 text-sm text-red-600">
                            {error.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end border-t border-slate-200 px-6 py-4">
              <button
                onClick={() => setUploadErrors([])}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">Employee records</p>
          <h1 className="text-3xl font-bold text-slate-950">Employees</h1>
        </div>

        {!open ? (
          <button
            onClick={() => setOpen(true)}
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-sm transition-all duration-200 ease-in-out hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
          >
            + Add Employee
          </button>
        ) : (
          <div className="flex items-center gap-3">
            {/* Upload Employees */}
            <label
              className={`cursor-pointer rounded-lg border border-blue-200 bg-blue-50 px-5 py-2.5 font-semibold text-blue-700 transition-all duration-400 ease-in-out hover:bg-blue-100 hover:shadow-sm ${loading ? "cursor-not-allowed opacity-50" : ""
                }`}
            >
              {loading ? "Uploading..." : "+ Add Many"}
              <input
                type="file"
                name="file"
                accept=".csv,.xlsx,.xls"
                onChange={handelupload}
                disabled={loading}
                className="hidden"
              />
            </label>

            {/* Add One Employee */}
            <Link
              to="/employees/new"
              className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-sm transition-all duration-200 ease-in-out hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
            >
              + Add One
            </Link>

            {/* Cancel */}
            <button
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition-all duration-200 ease-in-out hover:bg-slate-100 hover:text-slate-700"
              title="Cancel"
              aria-label="Cancel"
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
