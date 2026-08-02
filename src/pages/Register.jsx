import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setError("")
      setLoading(true)
      console.log(formData)

      const response = await api.post("/auth/register", formData);
      console.log(response)
      alert("Registration successful!");
      navigate("/login");

    } catch (error) {
      console.log("Registration failed : ", error);
      setError(
        error.response?.data?.message ||
        error.message ||
        "Registration failed"
      )
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
        <h1 className="mt-2 text-3xl font-bold text-slate-950">Register</h1>
        <p className="mt-2 text-sm text-slate-500">
          Create an admin account for the document management dashboard.
        </p>

        {error && (
          <p className="mt-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <input
          name="name"
          type="text"
          placeholder="Full Name"
          className="mt-6 w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-600"
          onChange={handleChange}
          value={formData.name}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-600"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone"
          className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-600"
          onChange={handleChange}
          value={formData.phone}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          minLength={8}
          className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-600"
          onChange={handleChange}
          value={formData.password}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-blue-700 px-4 py-2.5 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-400"

        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="mt-5 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-blue-700">
            Login
          </Link>
        </p>
      </form>
    </div >
  );

};

export default Register;
