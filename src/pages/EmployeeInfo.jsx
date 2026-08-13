import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout"
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchOneEmployeeData, updateEmployeeData, } from "../services/employeeservices";
import api from "../api/axios";
import Skeleton_Loading from "../components/Skeleton_loading";


const EmployeeInfo = () => {
    const { id } = useParams();
    const [EmployeeInfo, SetEmployeeInfo] = useState({});
    const [EmployeeDoc, SetEmployeeDoc] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [formError, setFormError] = useState("");
    const navigate = useNavigate()

    console.log(id);

    useEffect(() => {
        const LoadData = async () => {
            try {
                const Info = await fetchOneEmployeeData(id);
                SetEmployeeInfo(Info.data.employee_data);
                SetEmployeeDoc(Info.data.employee_document);
            } catch (error) {
                console.log("Error while Fatching Emplooyee Data", error);
            }
        }
        LoadData();

    }, [id]);

    console.log("Employee Data", EmployeeInfo);
    console.log("Employee Doc", EmployeeDoc);

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
            setLoading(true);

            console.log(EmployeeInfo._id)
            const response = await api.delete("/deleteemployee",
                {
                    data: {
                        employee_id: EmployeeInfo._id,
                    },
                });
            if (response.status) {
                alert("Removed Successfully.......")
                navigate(-1);
            }
        } catch (error) {
            console.log("Error in deleting Employee Plz try again")
        } finally {
            setLoading(false)
        }
    }

    //Update info
    const handleUpdate = async (updatedFields) => {
        try {
            setLoading(true);
            setFormError("");

            const form = new FormData();

            form.append("employee_id", EmployeeInfo._id);

            form.append(
                "data",
                JSON.stringify(updatedFields)
            );

            const response = await api.patch(
                "/updateemployee",
                form
            );

            if (response.data.success) {
                SetEmployeeInfo((prev) => ({
                    ...prev,
                    ...updatedFields,
                }));
            }

        } catch (error) {
            console.log(error);

            setFormError(
                error.response?.data?.message ||
                error.message ||
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };
    // Skeleton Loading
    if (Loading) {
        return (
            <Skeleton_Loading />
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
                        to={`/employees/edit/${EmployeeInfo._id}`}
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

                    <div className="flex h-28 w-28 items-center justify-center rounded-full overflow-hidden bg-blue-100">
                        {EmployeeInfo.profile_image ? (
                            <img
                                src={EmployeeInfo.profile_image} // image URL from backend
                                alt={EmployeeInfo.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <span className="text-4xl font-bold text-blue-700">
                                {initials}
                            </span>
                        )}
                    </div>

                    <div className="mt-4 md:mt-0">
                        <h2 className="text-2xl font-bold text-slate-900">
                            {EmployeeInfo.name ? EmployeeInfo.name : "Unknown"}
                        </h2>

                        <p className="mt-1 text-slate-500">
                            {EmployeeInfo.designation}
                        </p>

                        <button
                            onClick={() => {
                                handleUpdate({
                                    status: !EmployeeInfo.status
                                })
                            }}
                            className={`mt-3 inline-block rounded-full px-4 py-1 text-sm font-medium ${EmployeeInfo.status
                                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-200"
                                : "bg-red-50 text-red-700 hover:bg-red-200"
                                }`}
                        >
                            {EmployeeInfo.status ? "Active" : "Inactive"}
                        </button>
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

            {/* Documents */}
            <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">
                    Documents
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                    Uploaded employee documents
                </p>

                {EmployeeDoc?.length > 0 ? (
                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {EmployeeDoc.map((doc) => (
                            <a
                                key={doc._id}
                                href={doc.document_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group rounded-xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:border-blue-300 hover:shadow-md"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-2xl transition group-hover:bg-blue-100">
                                    📄
                                </div>

                                <h4 className="mt-4 text-lg font-semibold text-slate-900">
                                    {doc.document_type}
                                </h4>

                                <p className="mt-1 truncate text-sm text-slate-500">
                                    {doc.document_name}
                                </p>

                                <div className="mt-5 text-sm font-medium text-blue-600 group-hover:text-blue-700">
                                    View Document →
                                </div>
                            </a>
                        ))}
                    </div>
                ) : (
                    <div className="mt-6 rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
                        No documents uploaded.
                    </div>
                )}
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