import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import api from "../api/axios";
import { fetchOneEmployeeData, updateEmployeeData } from "../services/employeeservices";
import Skeleton_Loading from "../components/Skeleton_loading";

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB
    const [Loading, setLoading] = useState(false);
    const [deletingDocId, setDeletingDocId] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [employeeDoc, setEmployeeDoc] = useState([]);
    const documentOptions = [
        "10th Marksheet",
        "12th Marksheet",
        "Aadhar Card",
        "PAN Card",
    ];
    const [currentDocument, setCurrentDocument] = useState(
        {
            type: "",
            file: null,
        });
    const [formError, setFormError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        designation: "",
        joining_date: "",
        address: "",
        status: false,
        profileImage: null,
    });

    const availableDocumentOptions = documentOptions.filter(
        (option) =>
            !employeeDoc.some((doc) => doc.document_type === option) &&
            !documents.some((doc) => doc.type === option)
    );
    const allDocumentsAdded = availableDocumentOptions.length === 0;



    // Calling API to delete Documnet
    const handleDeleteDocument = async (document_id) => {

        if (!window.confirm("Delete this document?")) {
            return;
        }

        try {

            setDeletingDocId(document_id);

            const response = await api.delete("/deletedocument", {
                data: {
                    document_id,
                },
            });

            if (response.data.success) {
                setEmployeeDoc((prev) =>
                    prev.filter((doc) => doc._id !== document_id)
                );

                alert("Document deleted successfully");
            }
        } catch (error) {
            console.log(error);
            alert("Failed to delete document");
        } finally {
            setDeletingDocId(null);
        }
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
    // Calling API to add Document 
    const handleAddDocument = () => {
        if (!currentDocument.type || !currentDocument.file) {
            alert("Please select document type and file.");
            return;
        }

        if (currentDocument.file.size > MAX_FILE_SIZE) {
            alert("File size should not exceed 1 MB.");
            return;
        }

        setDocuments((prev) => [
            ...prev,
            currentDocument,
        ]);

        setCurrentDocument({
            type: "",
            file: null,
        });
    };
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

    // Getting Employee Data
    useEffect(() => {
        const loadData = async () => {
            try {
                const info = await fetchOneEmployeeData(id);
                const employee = info.data.employee_data;
                setEmployeeDoc(info.data.employee_document || []);
                setFormData({
                    name: employee.name || "",
                    email: employee.email || "",
                    phone: employee.phone || "",
                    designation: employee.designation || "",
                    joining_date: employee.joining_date
                        ? employee.joining_date.split("T")[0]
                        : "",
                    address: employee.address || "",
                    status: employee.status,
                    profileImage: null,
                });

            } catch (error) {
                console.log(error);
            }
        };

        loadData();
    }, [id]);

    console.log("employeeDoc", employeeDoc);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const form = new FormData();

            form.append("employee_id", id);

            form.append(
                "data",
                JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    designation: formData.designation,
                    joining_date: formData.joining_date,
                    address: formData.address,
                    status: formData.status,
                })
            );
            form.append(
                "documentTypes",
                JSON.stringify(
                    documents.map((doc) => ({
                        type: doc.type,
                    }))
                )
            );
            documents.forEach((doc) => {
                form.append("documents", doc.file);
            });

            if (formData.profileImage) {
                form.append("profile_image", formData.profileImage);
            }

            // Debug
            for (const pair of form.entries()) {
                console.log(pair[0], pair[1]);
            }

            const response = await api.patch(
                "/updateemployee",
                form
            );
            setDocuments([]);
            if (response.data.success) {
                alert("Employee Updated");
                navigate("/employees");
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Skeleton Loading
    if (Loading) {
        return (
            <Skeleton_Loading />
        );
    }
    return (
        <AdminLayout>
            <div className="mx-auto max-w-4xl">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-blue-600">
                            Employee Records
                        </p>

                        <h1 className="text-3xl font-bold">
                            Edit Employee
                        </h1>
                    </div>

                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                        ID: {id.slice(-6)}
                    </span>
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
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-600"

                            />
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-slate-700">
                                Email (Not Editable)
                            </span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                disabled
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-600"

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
                                disabled
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
                            <div className="mb-5">
                                <h3 className="text-lg font-semibold text-slate-800">
                                    📄 Add Document
                                </h3>
                                <p className="mt-1 text-sm text-slate-500">
                                    Please select a document type and upload the corresponding file.
                                </p>
                            </div>

                            <div className="mb-5 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
                                Kindly ensure that the file size does not exceed <span className="font-semibold">1 MB</span>.
                            </div>
                            <div className="grid gap-4 md:grid-cols-3">
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
                                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
                                >
                                    Add
                                </button>
                            </div>
                            {currentDocument.file && (
                                <p className="mt-2 text-sm text-green-600">
                                    ✅ {currentDocument.file.name}
                                </p>
                            )}
                        </div>
                        {/* Added Documents */}
                        <div className="rounded-lg border border-slate-200 bg-white p-4">
                            <h3 className="mb-3 font-medium text-slate-700">
                                Added Documents
                            </h3>

                            {employeeDoc.length === 0 && documents.length === 0 ? (
                                <div className="rounded-lg border-2 border-dashed border-slate-300 py-10 text-center">
                                    <p className="text-5xl">📂</p>
                                    <p className="mt-3 font-medium text-slate-700">
                                        No documents uploaded yet
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        Add your first document using the section above.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">

                                    {/* Existing Documents */}
                                    {employeeDoc.map((doc) => (
                                        <div
                                            key={doc._id}
                                            className={`flex items-center justify-between rounded-lg border p-4 transition ${deletingDocId === doc._id
                                                ? "animate-pulse opacity-60"
                                                : "hover:border-blue-300"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-full bg-blue-100 p-3">
                                                    📄
                                                </div>

                                                <div>
                                                    <p className="font-medium text-slate-800">
                                                        {doc.document_type}
                                                    </p>

                                                    <p className="text-sm text-slate-500">
                                                        {doc.document_name}
                                                    </p>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                disabled={deletingDocId === doc._id}
                                                onClick={() => handleDeleteDocument(doc._id)}
                                                className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:opacity-60"
                                            >
                                                {deletingDocId === doc._id
                                                    ? "🗑️ Deleting..."
                                                    : "Delete"}
                                            </button>
                                        </div>
                                    ))}

                                    {/* Newly Added Documents */}
                                    {documents.map((doc, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-full bg-green-100 p-3">
                                                    📄
                                                </div>

                                                <div>
                                                    <p className="font-medium text-green-800">
                                                        {doc.type}
                                                    </p>

                                                    <p className="text-sm text-green-600">
                                                        {doc.file.name}
                                                    </p>

                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setDocuments((prev) => prev.filter((_, i) => i !== index))
                                                }
                                                className="rounded bg-red-500 px-3 py-1 text-white"
                                            >
                                                Remove
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
                            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700  disabled:opacity-60 transition  disabled:cursor-not-allowed "
                        >
                            {Loading ? "Updating..." : "Update Employee"}
                        </button>
                    </div>
                </form>



            </div >
        </AdminLayout>
    );
};

export default EditEmployee;