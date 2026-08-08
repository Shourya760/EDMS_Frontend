import { useState } from "react";
import { resetPassword, updatePassword } from "../services/authService";
import { Link } from "react-router-dom";

const ResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: ""
    })
    const [formError, setFormError] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            setFormError("")
            if (!formData.email) {
                setFormError("Email is required");
                setLoading(false);
                return;
            }

            // Call your API here
            const response = await resetPassword({
                email: formData.email,
            })

            console.log(response)

            if (response.success) {
                setFormError(response.message)
            }

        } catch (error) {
            console.log("Error while sending mail")
            setFormError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            )
        } finally {
            setLoading(false)
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-100">
                <div className="rounded-xl bg-white p-8 shadow-lg text-center">
                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>

                    <h2 className="mt-5 text-xl font-semibold text-slate-800">
                        Sending Reset Link...
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Please wait while we send the password reset email.
                    </p>
                </div>
            </div>
        );
    }

    return (

        < div className="flex min-h-screen items-center justify-center bg-slate-100 px-4" >

            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                {
                    formError && (
                        <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-700 shadow-sm"
                        >{formError}</div>
                    )
                }
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Forgot Password
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Enter your registered email address and we'll send you a password reset link.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>

                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Email Address
                    </label>

                    <input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                    />

                    <button
                        type="submit"
                        className="mt-6 w-full rounded-lg bg-blue-700 py-3 font-semibold text-white transition hover:bg-blue-800"
                    >
                        Send Reset Link
                    </button>
                    <div className="mt-5 text-center">
                        <Link
                            to="/login"
                            className="text-sm font-medium text-blue-700 hover:underline"
                        >
                            ← Back to Login
                        </Link>
                    </div>

                </form>

            </div>
        </div >
    );
};

export default ResetPassword;