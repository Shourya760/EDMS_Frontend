import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout"
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchOneEmployeeData } from "../services/employeeservices";
import api from "../api/axios";


const EmployeeInfo = () => {


    const { id } = useParams();
    const [EmployeeInfo, SetEmployeeInfo] = useState("");
    const [ActiveState, useActiveState] = useState(false);
    const [Loading, setLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {

        const LoadData = async () => {
            try {
                console.log(id);
                const Info = await fetchOneEmployeeData(id);
                SetEmployeeInfo(Info.data);
                console.log(EmployeeInfo);

            } catch (error) {
                console.log(error);
            }
        }
        LoadData();

    }, [id, ActiveState]);

    //geting initials of the name 
    const initials = EmployeeInfo?.name
        ? EmployeeInfo.name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()
        : "U";


    // Handeling Delete
    const handleDelete = async (event) => {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmed) return;
        try {
            setLoading(true)
            console.log(EmployeeInfo._id)

            const response = await api.delete("/deleteemployee",
                {
                    data: {
                        employee_id: EmployeeInfo._id,
                    },
                });
            if (response.status) {
                window.alert("Employee Deleted")
                navigate(-1);
            }
        } catch (error) {
            console.log("Error in deleting Employee Plz try again")
        } finally {
            setLoading(false)
        }
    }
    // console.log(EmployeeInfo)

    // This will come while loading
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
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-blue-700">
                        Employee Details
                    </p>

                    <h1 className="text-3xl font-bold text-slate-900">
                        {EmployeeInfo.name}
                    </h1>
                </div>

                <div className="flex gap-3">
                    <Link
                        to="/employees"
                        className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-100"
                    >
                        Back
                    </Link>

                    <Link
                        to={`/employees/edit/1`}
                        className="rounded-lg bg-blue-700 px-5 py-2 text-white font-semibold hover:bg-blue-800"
                    >
                        Edit Employee
                    </Link>
                </div>
            </div>

            {/* Profile Card */}
            <div className=" relative rounded-lg border border-slate-200 bg-white shadow-sm">

                {EmployeeInfo.is_manager && (
                    <div className="absolute right-0 top-6 z-10 ">
                        <div className="bg-red-600 px-6 py-1 text-xs font-bold uppercase text-white ">
                            Manager
                        </div>
                    </div>
                )}

                <div className="flex flex-col items-center border-b border-slate-200 p-8 md:flex-row md:items-center md:gap-6">

                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-100 text-4xl font-bold text-blue-700">
                        {initials}
                    </div>

                    <div className="mt-4 md:mt-0">
                        <h2 className="text-2xl font-bold text-slate-900">
                            {EmployeeInfo.name ? EmployeeInfo.name : "Unknown"}
                        </h2>





                        <p className="mt-1 text-slate-500">
                            {EmployeeInfo.designation}
                        </p>

                        <span
                            className={`mt-3 inline-block rounded-full px-4 py-1 text-sm font-medium ${EmployeeInfo.status
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-red-50 text-red-700"
                                }`}
                        >
                            {EmployeeInfo.status ? "Active" : "Inactive"}
                        </span>
                    </div>
                </div>

                {/* Details */}
                <div className="grid gap-6 p-8 md:grid-cols-2">

                    <div>
                        <p className="text-sm font-medium text-slate-500">
                            Email
                        </p>

                        <p className="mt-1 text-slate-900">
                            {EmployeeInfo.email}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-slate-500">
                            Phone
                        </p>

                        <p className="mt-1 text-slate-900">
                            +91 {EmployeeInfo.phone}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-slate-500">
                            Designation
                        </p>
                        <p className="mt-1 text-slate-900">
                            {EmployeeInfo.designation}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-slate-500">
                            Salary
                        </p>

                        <p className="mt-1 text-slate-900">
                            ₹65,000
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-slate-500">
                            Joining Date
                        </p>

                        <p className="mt-1 text-slate-900">
                            {new Date(EmployeeInfo.joining_date).toLocaleString("en-IN")}

                        </p>
                    </div>

                    <div >
                        <p className="text-sm font-medium text-slate-500">
                            Address
                        </p>

                        <p className="mt-1 text-slate-900">
                            {EmployeeInfo.address}
                        </p>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-6">
                <h3 className="text-lg font-semibold text-red-700">
                    Danger Zone
                </h3>

                <p className="mt-2 text-sm text-red-600">
                    Deleting an employee permanently removes their account and
                    cannot be undone.
                </p>

                <button className="mt-5 rounded-lg bg-red-600 px-5 py-2 font-medium text-white hover:bg-red-700"
                    onClick={handleDelete}
                >
                    Delete Employee
                </button>
            </div>
        </AdminLayout >
    );
};


export default EmployeeInfo;