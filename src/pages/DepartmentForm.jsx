import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { useState } from "react";
import api from "../api/axios";


const DepartmentForm = () => {
    const naviagte = useNavigate();
    const [Loading, setLoading] = useState(false);
    const [FormError, setFormError] = useState("");


    const [formData, setFormData] = useState({
        department_description: "",
        department_name: "",
        department_manager: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            setFormError("");

            // console.log("form data: ", formData);

            const response = await api.post("/department", formData);

            // console.log(response);


            if (response.status) {
                window.alert("Department Created")
                naviagte(-1);

            } else {
                console.log("Error is :", response.data?.message);
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



    }

    return (
        <AdminLayout>

            <div className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="mb-6 text-2xl font-bold text-slate-900">
                    Add Department
                </h1>

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

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5">
                        
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Department Name
                        </label>
                        <input
                            type="text"
                            name="department_name"
                            placeholder="Enter department name"
                            value={formData.department_name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                     <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Manager
                        </label>
                        <input
                            rows="4"
                            name="department_manager"
                            placeholder="Enter department manager"
                            value={formData.department_manager}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Description
                        </label>
                        <textarea
                            rows="4"
                            name="department_description"
                            placeholder="Enter department description"
                            value={formData.department_description}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                   

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={Loading}
                            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
                        >
                            Save Department
                        </button>

                        <Link
                            to="/employees"
                            className="rounded-lg border border-slate-300 px-5 py-2 font-medium text-slate-700 transition duration-200 hover:bg-green-500 hover:text-white hover:border-green-500 hover:shadow-md"                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default DepartmentForm;