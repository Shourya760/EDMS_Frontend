import { useState, useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { fetchEmployeeData } from "../services/employeeservices";
import { fetchAllDepartments } from "../services/departmentservices";

import api from "../api/axios";
import { fetchAllManager } from "../services/managerServices";

export default function Managers() {

    const [employeeData, setEmployeeData] = useState([]);
    const [departmentData, setDepartmentData] = useState([]);
    const [managerData, setManagerData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [FormError, setFormError] = useState("");
    const [formData, setFormData] = useState({
        department_id: "",
        employee_id: "",
    });


    const loadData = async () => {
        try {
            const employees = await fetchEmployeeData();
            setEmployeeData(employees.data);

            const departments = await fetchAllDepartments();
            setDepartmentData(departments.data);

            const managers = await fetchAllManager();
            setManagerData(managers.data);

            setShowModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);


    console.log(employeeData, departmentData, managerData)


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            setFormError(false);

            const response = await api.post("/addmanager", formData);

            if (response.status) {
                window.alert("Manager Made Successfully")
            } else {
                console.log("Error is :", response.data?.message);
            }

            console.log("form data: ", formData)
            console.log("data saved")

            loadData()
        } catch (error) {
            console.log("data not saved", error);
            setFormError(error.response?.data?.message ||
                error.message ||
                "Something went wrong" + error
            );
        } finally {
            setLoading(false)
        }


    };


    if (loading) {
        return (
            <AdminLayout>
                <div className="flex min-h-[80vh] flex-col items-center justify-center">
                    <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>

                    <h2 className="mt-6 text-xl font-semibold text-slate-800">
                        Saving Manager
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

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-blue-700">
                        Teams
                    </p>
                    <h1 className="text-3xl font-bold text-slate-950">
                        Managers
                    </h1>
                </div>


                <button
                    onClick={() => setShowModal(true)}
                    className="rounded-lg bg-blue-700 px-4 py-2.5 font-semibold text-white shadow-sm hover:bg-blue-800 "
                >
                    Add Manager
                </button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
                <table className="w-full min-w-[720px] text-sm">
                    <thead className="bg-slate-100 text-slate-600">
                        <tr>
                            <th className="p-4 text-left">
                                Manager
                            </th>

                            <th className="p-4 text-left">
                                Department
                            </th>
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
                            managerData.map((item) => (
                                <tr
                                    key={item._id}
                                    className="border-t border-slate-200 hover:bg-slate-50"
                                >
                                    <td className="p-4">
                                        {item.employee_id?.name || "-"}
                                    </td>
                                    <td className="p-4">
                                        {item.department_id?.department_name || "-"}
                                    </td>
                                </tr>
                            ))

                        )}
                        {!loading && managerData.length === 0 && (
                            <tr >
                                <td className="border-t border-slate-200 p-4 text-sm text-slate-500">No Managers Found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 ">

                    <div className="  w-full max-w-md rounded-lg bg-white p-6 shadow-lg">

                        <div className="mb-6 flex items-center  justify-between">
                            <h2 className="text-xl font-bold">
                                Add Manager
                            </h2>

                            <button
                                onClick={() => setShowModal(false)}
                                className="text-2xl text-green-500 "

                            >
                                ×
                            </button>
                        </div>

                        {FormError && (
                            <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-700 shadow-sm">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">⚠️</span>
                                    <span className="font-medium">
                                        {FormError}
                                    </span>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">

                            <div>
                                <label className="mb-2 block font-medium">
                                    Department
                                </label>
                                <select
                                    name="department_id"
                                    value={formData.department_id}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2"
                                >
                                    <option value="">Select Department</option>

                                    {departmentData.map((department) => (
                                        <option
                                            key={department._id}
                                            value={department._id}
                                        >
                                            {department.department_name ? department.department_name : "-"}


                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block font-medium">
                                    Manager
                                </label>
                                <select
                                    name="employee_id"
                                    value={formData.employee_id}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2"
                                >
                                    <option value="">Select Employee</option>

                                    {employeeData.map((employee) => (
                                        <option
                                            key={employee._id}
                                            value={employee._id}
                                        >
                                            {employee.name ? employee.name : "UNKNOWN"}
                                        </option>
                                    ))}
                                </select>


                            </div>

                            <div className="flex justify-end gap-3 pt-4">

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="rounded-lg border border-slate-300 px-4 py-2"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleSave}
                                    className="rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
                                >
                                    Save
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            )}
        </AdminLayout>
    );
}