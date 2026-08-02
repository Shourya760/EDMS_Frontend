import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import StatCard from "../components/StatCard";
import { documents} from "../data/mockData";
import { useEffect } from "react";
import { fetchEmployeeData } from "../services/employeeservices";
import { fetchAllDepartments } from "../services/departmentservices";
import { useState } from "react";

const Dashboard = () => {
  const pendingDocuments = documents.filter((doc) => doc.status === "Pending");
  const verifiedDocuments = documents.filter((doc) => doc.status === "Verified");
  const completionPercent = Math.round((verifiedDocuments.length / documents.length) * 100);
  const [employeeData, setEmployeeData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const modules = [
    {
      id: 1,
      title: "Centralized employee management",
      description: "Store employee details in one place.",
    },
    {
      id: 2,
      title: "Secure document storage",
      description: "Keep employee documents organized safely.",
    },
    {
      id: 3,
      title: "Easy searching and filtering",
      description: "Find employees and documents quickly.",
    },
    {
      id: 4,
      title: "Document organization",
      description: "Group files by employee and document type.",
    },
    {
      id: 5,
      title: "Profile management",
      description: "Manage basic admin profile details.",
    },
  ];



  useEffect(() => {
    const loadData = async () => {
      try {
        const employees = await fetchEmployeeData();
        setEmployeeData(employees.data);

        const departments = await fetchAllDepartments();
        setDepartmentData(departments.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);
  console.log(departmentData)


  
  return (
    <AdminLayout>
      <section className="mb-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.4fr_1fr] lg:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Employee Document Management System
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl font-bold text-slate-950 sm:text-4xl">
              Manage employee information and documents in one simple app.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Organizations often store employee information and documents in
              multiple locations. This project keeps employee records,
              departments, documents, and admin profile details together.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/employees/new"
                className="rounded-lg bg-blue-700 px-5 py-2.5 text-center font-semibold text-white hover:bg-blue-800"
              >
                Add Employee
              </Link>
              <Link
                to="/documents"
                className="rounded-lg border border-slate-300 px-5 py-2.5 text-center font-semibold text-slate-700 hover:bg-slate-100"
              >
                Upload Document
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">Document readiness</p>
                <p className="mt-2 text-4xl font-bold text-slate-950">
                  {completionPercent}%
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                {verifiedDocuments.length} verified
              </span>
            </div>
            <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-blue-700"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <p className="mt-4 text-sm text-slate-500">
              {pendingDocuments.length} pending document needs an admin check.
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          title="Employees"
          value={employeeData.length}
          note="Central employee records"
        />
        <StatCard
          title="Departments"
          value={departmentData.length}
          note="Teams using the document system"
        />
        <StatCard
          title="Pending Documents"
          value={pendingDocuments.length}
          note="Files waiting for verification"
        />
      </div>


      <div className="mt-6  grid-cols-1 gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-blue-700">People</p>
              <h2 className="text-lg font-semibold text-slate-950">
                Recent Employees
              </h2>
            </div>
            <Link
              to="/employees"
              className="text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              View all
            </Link>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[460px] text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="py-3 font-medium">Name</th>
                  <th className="py-3 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {employeeData.slice(-3).map((employee) => (
                  <tr key={employee._id} className="border-b border-slate-100">
                    <td className="py-3 font-medium text-slate-900">
                      {employee.name ?? "Unknown"}                    </td>
                    <td className="py-3">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                        {employee.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </section>

        {/* <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-blue-700">Files</p>
              <h2 className="text-lg font-semibold text-slate-950">
                Recent Documents
              </h2>
            </div>
            <Link
              to="/documents"
              className="text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              Manage
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-3"
              >
                <div>
                  <p className="font-medium text-slate-950">{doc.documentName}</p>
                  <p className="text-sm text-slate-500">
                    {doc.employee} - {doc.uploadDate}
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        </section> */}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <div className="mb-4">
            <p className="text-sm font-medium text-blue-700">Project features</p>
            <h2 className="text-lg font-semibold text-slate-950">
              What this project provides
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {modules.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-slate-200 p-4"
              >
                <h3 className="font-semibold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-5 text-slate-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <p className="text-sm font-medium text-blue-700">Teams</p>
            <h2 className="text-lg font-semibold text-slate-950">
              Department load
            </h2>
          </div>

          <div className="space-y-4">
            {departmentData.slice(0, 4).map((department) => {
              const percent = Math.min(department.employees * 2, 100);

              return (
                <div key={department._id}>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium text-slate-700">
                      {department.department_name}
                    </span>
                    <span className="text-slate-500">
                      20 people
                      {/* {departmentData.employee} */}
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
