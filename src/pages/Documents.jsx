import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { getalldocument } from "../services/documentservice";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    "10th Marksheet",
    "12th Marksheet",
    "Aadhar Card",
    "PAN Card",
  ];

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await getalldocument();
        setDocuments(response.data);
        console.log("Response", response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDocuments();
  }, []);



  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.document_name
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      doc.document_type
        .toLowerCase()
        .includes(searchText.toLowerCase());

    const matchesCategory =
      selectedCategory === "" ||
      doc.document_type === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getIcon = (type) => {
    switch (type) {
      case "PAN Card":
        return "💳";
      case "Aadhar Card":
        return "🪪";
      case "10th Marksheet":
        return "🎓";
      case "12th Marksheet":
        return "📚";
      default:
        return "📄";
    }
  };

  return (
    <AdminLayout>
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between rounded-xl border bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Employee Management
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-800">
              📂 Document Vault
            </h1>

            <p className="mt-2 text-slate-500">
              Browse and manage all uploaded employee documents.
            </p>
          </div>

          <div className="rounded-xl bg-blue-50 px-6 py-4 text-center">
            <p className="text-sm text-slate-500">Total Documents</p>

            <h2 className="text-3xl font-bold text-blue-700">
              {filteredDocuments.length}
            </h2>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8 rounded-xl border bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">

            <input
              type="text"
              placeholder="🔍 Search by document name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
            >
              <option value="">All Categories</option>

              {categories.map((category) => (
                <option key={category}>
                  {category}
                </option>
              ))}
            </select>

          </div>
        </div>
        {/* Cards */}

        {filteredDocuments.length === 0 ? (

          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-white py-20 text-center shadow-sm">

            <div className="text-6xl">
              📂
            </div>

            <h2 className="mt-4 text-2xl font-semibold text-slate-700">
              No Documents Found
            </h2>

            <p className="mt-2 text-slate-500">
              Try changing your search or filter.
            </p>

          </div>

        ) : (

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {filteredDocuments.map((doc) => (

              <div
                key={doc._id}
                className="rounded-xl  bg-white p-5 shadow-sm hover:shadow-md"
              >

                <div className="mb-4 flex items-center gap-3">

                  <div className="text-4xl">
                    {getIcon(doc.document_type)}
                  </div>

                  <div>

                    <h3 className="font-semibold">
                      {doc.document_type}
                    </h3>

                    <p className="text-sm text-slate-500">
                      Employee Email:
                      {" "}
                      {doc.document_name.split("_").pop()}
                    </p>

                  </div>

                </div>

                <div className="rounded-lg bg-slate-100 p-3">

                  <p className="truncate font-medium">
                    {doc.document_name}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Uploaded :
                    {" "}
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </p>

                </div>

                <div className="mt-5 flex gap-2">

                  <a
                    href={doc.document_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-white hover:bg-blue-700"
                  >
                    View
                  </a>

                  <a
                    href={doc.document_url}
                    download
                    className="flex-1 rounded-lg border py-2 text-center hover:bg-slate-100"
                  >
                    Download
                  </a>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </AdminLayout>
  );
};

export default Documents;