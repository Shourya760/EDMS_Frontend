import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { updatePassword } from "../services/authService";

const ForgotPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    // Redirect if token is missing
    useEffect(() => {
        if (!token) {
            navigate("/login", { replace: true });
        }
    }, [token, navigate]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check password match
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (!formData.password) {
            alert("Please enter a password");
            return;
        }

        try {
            setLoading(true);

            const response = await updatePassword({
                token,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
            });

            if (response.success) {
                alert("Password updated successfully. Please login.");
                navigate("/login", { replace: true });

            } else {
                alert(response.message || "Unable to update password");
            }
        } catch (error) {
            console.error("Error updating password:", error);

            alert(
                error?.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md border border-slate-200">

                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-slate-900">
                        Reset Password
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Enter your new password below.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* New Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-slate-700"
                        >
                            New Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter new password"
                            disabled={loading}
                            required
                            className="w-full rounded-md border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block mb-2 text-sm font-medium text-slate-700"
                        >
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm new password"
                            disabled={loading}
                            required
                            className="w-full rounded-md border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Updating..." : "Reset Password"}
                    </button>

                </form>

                <div className="mt-5 text-center">
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;

