import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

const Login = () => {
  const navigate = useNavigate();
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
    <div className="grid min-h-screen place-items-center bg-slate-100 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm"
      >
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
          EDMS
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">Login</h1>
        <p className="mt-2 text-sm text-slate-500">
          Sign in to manage employees, departments, and documents.
        </p>

        {error ? (
          <div className="mt-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}


        <input
          type="email"
          name="email"
          placeholder="Email"
          className="mt-6 w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-600"
          required
          onChange={handleChange}
          value={formData.email}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-600"
          required
          onChange={handleChange}
          value={formData.password}
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-lg bg-blue-700 py-2.5 font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-5 text-center text-sm text-slate-600">
          No account?{" "}
          <Link to="/register" className="font-semibold text-blue-700">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
