import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import api from "../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard")
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true)
      setError("");

      const response = await api.post("/auth/login", formData);

      if (response.status) {

        const token = response.data.token;
        const user = response.data.user;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/dashboard");

      } else {
        console.log("Error while Loggin", response.message);
        setError(response.message)
      }
    } catch (error) {
      console.log("Error while Logging in: ", error);
      setError(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"
      )
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden bg-blue-700 p-10 text-white md:flex md:flex-col md:justify-center">
          <h1 className="text-4xl font-bold">
            Employee Document
          </h1>
          <h2 className="mt-2 text-3xl font-bold">
            Management System
          </h2>
          <p className="mt-6 text-blue-100 leading-7">
            Manage employees, departments and documents from one
            secure dashboard.
          </p>
          <div className="mt-10 space-y-4 text-blue-100">
            <div className="flex items-center gap-3">
              <span>✔</span>
              <p>Employee Management</p>
            </div>
            <div className="flex items-center gap-3">
              <span>✔</span>
              <p>Document Storage</p>
            </div>
            <div className="flex items-center gap-3">
              <span>✔</span>
              <p>Department Management</p>
            </div>
            <div className="flex items-center gap-3">
              <span>✔</span>
              <p>Secure Authentication</p>
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="p-10">

          <div className="mb-8 text-center">

            <h2 className="text-3xl font-bold text-slate-800">
              Welcome Back
            </h2>

            <p className="mt-2 text-slate-500">
              Sign in to continue
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            {error && (
              <div className="mb-5 rounded-lg bg-red-100 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
            />

            <label className="mt-5 mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-blue-600"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            <div className="mt-3 flex justify-end">

              <Link
                to="/reset"
                className="text-sm font-medium text-blue-700 hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-lg bg-blue-700 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Need an account? Contact HR.{" "}
            <a
              href=""
              className="font-semibold text-blue-700 hover:underline"
            >

              Contact HR.
            </a>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Login;
