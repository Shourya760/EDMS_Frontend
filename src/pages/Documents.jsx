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


  return (
    <AdminLayout>
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between rounded-xl  bg-white p-6 shadow-sm">
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
        <div className="mb-8 rounded-xl  bg-white p-5 shadow-sm">
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
          <div className="rounded-lg  bg-white p-10 text-center">
            <p className="text-lg font-medium text-slate-700">
              No Documents Found
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filter.
            </p>
          </div>

        ) : (

          <div className="overflow-x-auto rounded-lg  bg-white">
            <table className="w-full text-left">
              <thead className=" bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-sm font-medium text-slate-600">
                    Document
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-slate-600">
                    Employee
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-slate-600">
                    Uploaded
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-slate-600">
                    Status
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredDocuments.map((doc) => (
                  <tr
                    key={doc._id}
                    className=" hover:bg-slate-50"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">

                        <div>
                          <p className="font-medium text-slate-800">
                            {doc.document_type}
                          </p>

                          <p className="max-w-xs  text-sm text-slate-500">
                            {doc.document_name}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-sm text-slate-600">
                      {doc.document_name.split("_").pop()}
                    </td>

                    <td className="px-4 py-3 text-sm text-slate-500">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-3 py-3">
                      <span
                        className={
                          doc.is_verified
                            ? "text-sm text-green-600"
                            : "text-sm text-yellow-600"
                        }
                      >
                        {doc.is_verified ? "Verified" : "Pending"}
                      </span>
                    </td>

                    <td className="py-3">
                      <div className="flex gap-7">
                        <a
                          href={doc.document_url}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded  px-3 py-1.5 text-sm hover:bg-slate-100"
                        >
                          View
                        </a>
                        {!doc.is_verified && (
                          <button
                            onClick={() => handleVerify(doc._id)}
                            className="rounded bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700"
                          >
                            Verify
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default Documents;