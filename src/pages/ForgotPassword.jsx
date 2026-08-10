import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { updatePassword } from "../services/authService";
import AdminLayout from "../layouts/AdminLayout";

const ForgotPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            const response = await updatePassword(
                {
                    token,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword
                })

            if (response.success) {
                alert("Done Please Login Now.")
                navigate("/");

            } else {
                alert(response.message)
                console.log(response.message)
            }

            console.log({
                token,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
            });
        } catch (error) {
            console.log("erorr while Updating PAssword in the Frontend: ", error)
        } finally {
            setLoading(false)
        }

    };


    if (loading) {
        return (

            <div>Loading.....</div>

        )
    }
    return (
        <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-6 mt-7 shadow-sm">
            <h1 className="mb-6 text-2xl font-bold text-slate-900">
                Add Department
            </h1>
            <form>
                <div className="mb-4">
                    <label className="block mb-1">New Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        className="w-full p-2.5 mt-1 border rounded"
                    />
                </div>

                <div className="mb-5">
                    <label className="block mb-1">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                        className="w-full p-2.5 mt-1 border rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full p-3 border-0 rounded-md bg-blue-600 text-white text-base cursor-pointer"
                >
                    {loading ? "Updating..." : "Reset Password"}
                </button>

            </form>
        </div>
    );
};

export default ForgotPassword;