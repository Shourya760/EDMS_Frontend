import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/dashboard");
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

        <input
          type="text"
          placeholder="Full Name"
          className="mt-6 w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-600"
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-600"
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-600"
          required
        />

        <button className="mt-5 w-full rounded-lg bg-blue-700 py-2.5 font-semibold text-white hover:bg-blue-800">
          Register
        </button>

        <p className="mt-5 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-blue-700">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
