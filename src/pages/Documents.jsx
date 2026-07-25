import { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { documents, employees } from "../data/mockData";


const Documents = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["Resume", "Aadhaar", "PAN", "Offer Letter"];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.employee.toLowerCase().includes(searchText.toLowerCase()) ||
      doc.documentName.toLowerCase().includes(searchText.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || doc.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });



  return (
    <AdminLayout>
      <div className="mb-6">
        <p className="text-sm font-medium text-blue-700">Document vault</p>
        <h1 className="text-3xl font-bold text-slate-950">Documents</h1>
      </div>

      <div className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-950">
          Upload Document
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <select className="rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-600">
            <option value="">Select employee</option>
            {employees.map((employee) => (
              <option key={employee.id}>{employee.fullName}</option>
            ))}
          </select>

          <select className="rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-600">
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>

          <input
            type="file"
            className="rounded-lg border border-slate-300 px-4 py-2"
          />
        </div>

        <button className="mt-4 rounded-lg bg-blue-700 px-5 py-2.5 font-semibold text-white hover:bg-blue-800">
          Upload
        </button>
      </div>

      <div className="mb-6 grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_240px]">
        <input
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search documents..."
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-600"
        />

        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-600"
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-4 text-left">Employee</th>
              <th className="p-4 text-left">Document</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredDocuments.map((doc) => (
              <tr key={doc.id} className="border-t border-slate-200">
                <td className="p-4 font-medium text-slate-950">
                  {doc.employee}
                </td>
                <td className="p-4 text-slate-600">{doc.documentName}</td>
                <td className="p-4 text-slate-600">{doc.category}</td>
                <td className="p-4 text-slate-600">{doc.uploadDate}</td>
                <td className="p-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {doc.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredDocuments.length === 0 && (
          <p className="border-t border-slate-200 p-4 text-sm text-slate-500">
            No documents found.
          </p>
        )}
      </div>
    </AdminLayout>
  );
};

export default Documents;
