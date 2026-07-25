import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
// import { departments } from "../data/mockData";
import api from "../api/axios";
import { fetchAllDepartments } from "../services/departmentservices";



const EmployeeForm = () => {
  const navigate = useNavigate();

  const [Loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [departmentData, setDepartmentData] = useState([]);





  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchAllDepartments();
        setDepartmentData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    joining_date: "",
    address: "",
    profileImage: null,
    status: false,
  });

  const handleChange = (event) => {
    const { name, value, files, checked, type } = event.target;

    let fieldValue;

    if (type === "checkbox") {
      fieldValue = checked;
    } else if (type === "file") {
      fieldValue = files?.[0] || null;
    } else {
      fieldValue = value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setFormError("");

      const data = new FormData();

      console.log("form data: ", formData)

      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("department", formData.department);
      data.append("designation", formData.designation);
      data.append("joining_date", formData.joining_date);
      data.append("address", formData.address);
      data.append("status", formData.status);

      if (formData.profileImage) {
        data.append("profile_image", formData.profileImage);
      }

      // Debug FormData
      for (const pair of data.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await api.post("/employee", data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );

      if (response.status) {
        console.log("Employee Added:", response.data);
        window.alert("Employee Created")
        navigate(-1);

      } else {
        console.log("Error:", response.data?.message);
      }

    } catch (error) {
      console.log("ERROR WHILE ===>", error)
      setFormError(error.response?.data?.message ||
        error.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false)
    }
  };

  if (Loading) {
    return (
      <AdminLayout>
        <div className="flex min-h-[80vh] flex-col items-center justify-center">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>

          <h2 className="mt-6 text-xl font-semibold text-slate-800">
            Saving Employee
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Please wait while we process your request...
          </p>
        </div>
      </AdminLayout>
    );
  }


  return (
    <AdminLayout>
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <p className="text-sm font-medium text-blue-700">Employee records</p>
          <h1 className="text-3xl font-bold text-slate-950">Add Employee</h1>
        </div>

        {formError && (
          <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-700 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              <span className="font-medium">
                {formError}
              </span>
            </div>
          </div>
        )}



        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Full Name
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-600"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-600"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Phone Number
              </span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-600"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Department
              </span>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-600"
              >
                <option value="">Select department</option>
                {departmentData.map((department) => (
                  <option key={department._id} value={department.name}>
                    {department.department_name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Designation
              </span>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Enter designation"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-600"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Joining Date
              </span>
              <input
                type="date"
                name="joining_date"
                value={formData.joining_date}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-600"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Address
              </span>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="4"
                placeholder="Enter address"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-600"
              />

            </label>
            <label className="block flex  justify-between" >
              <span className="mb-2 block text-sm font-medium text-slate-700">Status</span>
              <input
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={handleChange} ></input>
            </label>



            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Profile Image
              </span>
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-2"
              />
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={Loading}
              className="rounded-lg bg-blue-700 px-5 py-2.5 font-semibold text-white hover:bg-blue-800"
            >
              Save Employee
            </button>
            <button
              type="button"
              onClick={() => navigate("/employees")}
              className="rounded-lg border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EmployeeForm;
