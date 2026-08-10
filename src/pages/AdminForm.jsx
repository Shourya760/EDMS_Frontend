import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { useState } from "react";
import { registerUser } from "../services/authService";
import Skeleton_Loading from "../components/Skeleton_loading";





const AdminForm = () => {
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState("");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
        phone: "",
        address: "",
        profile_image: null,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleFileChange = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            profile_image: event.target.files[0],
        }));
    };


    const handelSubmit = async (event) => {
        event.preventDefault();
        try {
            setFormError("");
            setLoading(true);

            const data = new FormData();

            console.log("Form Data :", formData)


            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("password", formData.password);
            data.append("confirmpassword", formData.confirmpassword);
            data.append("phone", formData.phone);
            data.append("address", formData.address);

            if (formData.profile_image) {
                data.append("profile_image", formData.profile_image);
            }
            for (const [key, value] of data.entries()) {
                console.log(`${key}:`, value);
            }

            const response = await registerUser(data);

            console.log("response", response);

            if (response.success) {
                window.alert("Admin Created")





                navigate(-1);

            } else {
                console.log("Error:", response.data?.message);
            }

        } catch (error) {
            console.log("Error in adding Super Admin: ", error);
            // setFormError(error);
        } finally {
            setLoading(false);
        }

    }

    if (loading) {
        return (
            <Skeleton_Loading />
        );
    }
    return (
        <AdminLayout>
            <form
                onSubmit={handelSubmit}
                className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >

                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Add Super Admin
                    </h1>

                    <button
                        type="button"
                        onClick={() => { navigate(-1) }}
                        className="flex items-center justify-center rounded-lg border border-slate-200 px-3 py-1.5 text-lg text-slate-600 bg-slate-100 hover:bg-slate-200"
                    >
                        ← Back
                    </button>

                </div>

                {formError && (
                    <div className="mb-4 flex items-center gap-2 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                        <span className="font-bold">!</span>
                        <span>{formError}</span>
                    </div>
                )}


                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        className="w-full rounded border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        placeholder="Enter phone number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium">
                        Address
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full rounded border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full rounded border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        placeholder="Confirm password"
                        name="confirmpassword"
                        value={formData.confirmpassword}
                        onChange={handleChange}
                        className="w-full rounded border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium">
                        Profile Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        name="profile_image"
                        onChange={handleFileChange}
                        className="w-full rounded border border-slate-300 px-3 py-2"
                    />
                    {formData.profile_image && (
                        <p className="mt-2 text-sm text-green-600">
                            File Name : {formData.profile_image.name}
                        </p>
                    )
                    }
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
                    >
                        {loading ? "Creating..." : "Create Super Admin"}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
};

export default AdminForm;