import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import api from "../api/axios";
import Skeleton_Loading from "../components/Skeleton_loading";


const EmployeeForm = () => {
  const navigate = useNavigate();
  const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB
  const [Loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [currentDocument, setCurrentDocument] = useState(
    {
      type: "",
      file: null,
    });

  const [documents, setDocuments] = useState([]);
  const documentOptions = [
    "10th Marksheet",
    "12th Marksheet",
    "Aadhar Card",
    "PAN Card",
  ];
  const availableDocumentOptions = documentOptions.filter(
    (option) => !documents.some((doc) => doc.type === option)
  );
  const allDocumentsAdded = availableDocumentOptions.length === 0;


  const handleDeleteDocument = (index) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };
  const handleDocumentTypeChange = (e) => {
    setCurrentDocument({
      ...currentDocument,
      type: e.target.value,
    });
  };
  const handleDocumentFileChange = (e) => {
    setCurrentDocument({
      ...currentDocument,
      file: e.target.files[0],
    });
  };
  const handleAddDocument = () => {

    if (!currentDocument.type || !currentDocument.file) {
      alert("Please select document type and file.");
      return;
    }
    setDocuments((prev) => [
      ...prev,
      currentDocument,
    ]);
    // Reset inputs
    setCurrentDocument({
      type: "",
      file: null,
    });
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    joining_date: "",
    address: "",
    profileImage: null,
    status: false,
  });

  const handleChange = (event) => {
    const { name, value, files, checked, type } = event.target;

    let fieldValue;

    if (type === "checkbox") {
      fieldValue = checked;
    } else if (type === "file") {
      fieldValue = files?.[0] || null;
    } else {
      fieldValue = value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setFormError("");

      // creating a new from data
      const data = new FormData();

      // Adding info
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("designation", formData.designation);
      data.append("joining_date", formData.joining_date);
      data.append("address", formData.address);
      data.append("status", formData.status);


      if (formData.profileImage) {
        data.append("profile_image", formData.profileImage);
      }
      documents.forEach(doc => {
        data.append("documents", doc.file);
      });

      data.append(
        "documentTypes",
        JSON.stringify(
          documents.map(doc => ({
            type: doc.type
          }))
        )
      );


      console.log("=== FormData Contents ===");
      for (const [key, value] of data.entries()) {
        if (value instanceof File) {
          console.log(`${key}:`, {
            name: value.name,
            size: value.size,
            type: value.type,
          });
        } else {
          console.log(`${key}:`, value);
        }
      }


      const response = await api.post("/employee", data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );

      if (response.status) {
        window.alert("Employee Created")
        navigate(-1);

      } else {
        console.log("Error:", response.data?.message);
      }

    } catch (error) {
      console.log("ERROR WHILE ===>", error)
      setFormError(error.response?.data?.message ||
        error.message ||
        "Something went wrong =>" + error);
    } finally {
      setLoading(false)
    }
  };

  if (Loading) {
    return (
      <Skeleton_Loading />
    );
  }
  return (
    <AdminLayout>
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-6">
          <p className="text-sm font-medium text-blue-700">Employee records</p>
          <h1 className="text-3xl font-bold text-slate-950">Add Employee</h1>
        </div>

        {formError && (
          <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-700 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              <span className="font-medium">
                {formError}
              </span>
            </div>
          </div>
        )}

        {/* From */}
        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
          {/* Information Section */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Full Name
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-600"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-600"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Phone Number
              </span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-600"
              />
            </label>


            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Designation
              </span>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Enter designation"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-600"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Joining Date
              </span>
              <input
                type="date"
                name="joining_date"
                value={formData.joining_date}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-600"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Address
              </span>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="4"
                placeholder="Enter address"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-600"
              />

            </label>
            <label className="flex items-center justify-between rounded-lg border border-slate-300 px-4 py-3">
              <span className="text-sm font-medium text-slate-700">
                Status
              </span>

              <input
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={handleChange}
                className="h-4 w-4"
              />
            </label>



            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Profile Image
              </span>
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-2"
              />
            </label>
          </div>
          {/* Documents Section */}
          <div className="mt-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-800">
              Documents
            </h2>
            {/* Add Document */}
            <div className={"mb-6 rounded-lg border  border-slate-200 bg-white p-4 "}>
              <h3 className="mb-3 font-medium text-slate-700">
                Add Document
              </h3>
              <div className="flex gap-3 ">
                <select
                  name="type"
                  disabled={allDocumentsAdded}
                  value={currentDocument.type}
                  onChange={handleDocumentTypeChange}
                  className="rounded border px-3 py-2"
                >
                  <option value="">Select Document</option>

                  {availableDocumentOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <input
                  type="file"
                  name="file"
                  onChange={handleDocumentFileChange}
                  disabled={allDocumentsAdded}
                  className="rounded border px-3 py-2"
                />

                <button
                  type="button"
                  disabled={allDocumentsAdded}
                  onClick={handleAddDocument}
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
            {/* Added Documents */}
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <h3 className="mb-3 font-medium text-slate-700">
                Added Documents
              </h3>

              {documents.length === 0 ? (
                <p className="text-slate-500">No documents added.</p>
              ) : (
                <div className="space-y-2">
                  {documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded border px-3 py-2"
                    >
                      <div>
                        <p className="font-medium">{doc.type}</p>
                        <p className="text-sm text-slate-500">
                          {doc.file.name}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteDocument(index)}
                        className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* submit or delete */}
          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/employees")}
              className="rounded-lg border border-slate-300 px-5 py-2 font-medium text-slate-700 hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={Loading}
              className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 transition"
            >
              {Loading ? "Saving..." : "Save Employee"}
            </button>
          </div>
        </form>


      </div >
    </AdminLayout >
  );
};

export default EmployeeForm;
