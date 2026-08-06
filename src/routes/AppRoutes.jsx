import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Employees from "../pages/Employees";
import EmployeeForm from "../pages/EmployeeForm";
import Documents from "../pages/Documents";
import Dashboard from "../pages/Dashboard";
import Departments from "../pages/Departments";
import ProtectedRoute from "./ProtectedRoute";
import DepartmentForm from "../pages/DepartmentForm";
import Manager from "../pages/Manager";
import EmployeeInfo from "../pages/EmployeeInfo";
import EmployeeEdit from "../pages/EmployeeEdit";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Unprodected Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}

      <Route path="/managers" element={
        <ProtectedRoute>
          <Manager />
        </ProtectedRoute>} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>} />
      <Route path="/departments" element={
        <ProtectedRoute>
          <Departments />
        </ProtectedRoute>} />
      <Route path="/departments/new" element={
        <ProtectedRoute>
          <DepartmentForm />
        </ProtectedRoute>} />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>} />
      <Route path="/employees" element={
        <ProtectedRoute>
          <Employees />
        </ProtectedRoute>} />
      <Route path="/employees/new" element={
        <ProtectedRoute>
          <EmployeeForm />
        </ProtectedRoute>} />
      <Route path="/employees/:id" element={
        <ProtectedRoute>
          <EmployeeInfo />
        </ProtectedRoute>} />
      <Route path="/employees/edit/:id" element={
        <ProtectedRoute>
          <EmployeeEdit />
        </ProtectedRoute>
      } />
      <Route path="/documents" element={
        <ProtectedRoute>
          <Documents />
        </ProtectedRoute>} />
      <Route
        path="*"
        element={
          <div className="grid min-h-screen place-items-center bg-slate-100 px-6 text-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                404
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-950">
                Page not found
              </h1>
              <p className="mt-3 text-slate-500">
                The link may be broken or the page may have moved.
              </p>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="mt-6 rounded-lg bg-blue-700 px-5 py-2.5 font-semibold text-white hover:bg-blue-800"
              >
                Go Back
              </button>
            </div>
          </div>} />
    </Routes>
  );
};

export default AppRoutes;
