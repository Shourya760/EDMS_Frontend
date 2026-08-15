import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { useEffect, useState } from "react";
import { getAllUsers, updateUserStatus } from "../services/authService";
import Skeleton_Loading from "../components/Skeleton_loading";

const Admins = () => {
    const [adminsData, setAdminsData] = useState([]);
    const [formError, setFormError] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const loadData = async () => {
            try {
                const admins = await getAllUsers();
                setAdminsData(admins.data);
                console.log(admins.data);

            } catch (error) {
                console.log(error);
            }
        };
        loadData();
    }, []);


    const handelStatus = async (event, admin) => {
        event.preventDefault();

        try {
            setFormError("");
            setLoading(true);

            const response = await updateUserStatus(admin._id, !admin.status);

            if (response.success) {
                setAdminsData((admins) => admins.map((item) =>
                    item._id === admin._id ? { ...item, status: response.data.status } : item
                ));
            }

        } catch (error) {
            console.log("Error while updating admin status =>", error);
            setFormError(error.response?.data?.message || "Could not update admin status. Check that the backend is running.");

        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return (
            <Skeleton_Loading />
        )
    }
    return (
        <AdminLayout>
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <p className="text-sm text-blue-700">Admins records</p>
                    <h1 className="text-3xl font-bold text-slate-950">
                        Admins
                    </h1>
                </div>
                <Link
                    to="/admins/new"
                    className="rounded-lg bg-blue-700 px-4 py-2.5 text-white text-center font-semibold hover:bg-blue-800"
                >
                    Add Admin
                </Link>
            </div>

            {formError && (
                <div className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {formError}
                </div>
            )}

            {/* Admins List */}
            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
                <table className="w-full min-w-[720px] text-sm">
                    <thead className="bg-slate-100 text-slate-600">
                        <tr>
                            <th className="p-4 text-left">Profile</th>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">Status</th>


                        </tr>
                    </thead>

                    <tbody>
                        {adminsData.map((admin) => (
                            <tr
                                key={admin._id}
                                // onClick={() => navigate(`/user/${admin._id}`)}
                                className="cursor-pointer  hover:bg-slate-50"
                            >
                                <td className="p-4 font-medium">
                                    {admin.profile_image ? (
                                        <img
                                            src={admin.profile_image}
                                            alt={admin.name}
                                            className="h-9 w-9 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                                            {admin.name?.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </td>
                                <td className="p-4 font-medium">
                                    <div className="flex items-center gap-2">
                                        {admin.name}
                                    </div>
                                </td>

                                <td className="p-4 text-slate-600">
                                    {admin.email}
                                </td>
                                <td className="p-4 text-slate-600">
                                    <button
                                        onClick={(event) => handelStatus(event, admin)}
                                        className={`mt-3 inline-block rounded-full px-4 py-1 text-sm font-medium  ${admin.status
                                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                            : "bg-red-50 text-red-700 hover:bg-red-100"
                                            }`}
                                    >
                                        {admin.status ? "Active" : "Inactive"}
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout >
    );
};

export default Admins;
