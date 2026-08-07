import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { getCurrentUser, updateUser } from "../services/authService";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  // getting current user 
  const loadUser = async () => {
    try {
      const { data } = await getCurrentUser();

      setUser(data);
      setFormData({
        name: data.name || "",
        phone: data.phone || "",
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadUser();
  }, []);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const form = new FormData();
      form.append("id", user._id);
      form.append("data", JSON.stringify(formData));

      if (image) {
        form.append("profile_image", image);
      }

      await updateUser(form);
      await loadUser();

      setImage(null);
      setEdit(false);

    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      phone: user.phone || "",
    });

    setImage(null);
    setEdit(false);
  };

  if (!user) {
    return (
      <AdminLayout>
        <div className="max-w-4xl mx-auto p-6 animate-pulse">
          <div className="bg-white rounded-xl shadow p-6">

            <div className="flex items-center gap-5">
              <div className="w-28 h-28 rounded-full bg-gray-300"></div>

              <div className="space-y-3 flex-1">
                <div className="h-6 w-48 bg-gray-300 rounded"></div>
                <div className="h-4 w-64 bg-gray-200 rounded"></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-8">
              {[...Array(6)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
                  <div className="h-11 w-full bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </AdminLayout>
    );
  }

  const preview = image
    ? URL.createObjectURL(image)
    : user.profile_image;

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-6">

        <div className="bg-white rounded-xl shadow p-6">

          {/* Profile */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            <div className="flex items-center gap-5">

              {preview ? (
                <img
                  src={preview}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
                  {initials}
                </div>
              )}

              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>

                {edit && (
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-3 block w-full text-sm text-gray-600
      file:mr-4 file:rounded-md file:border-0
      file:bg-blue-600 file:px-4 file:py-2
      file:text-white file:cursor-pointer
      hover:file:bg-blue-700"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                )}
              </div>

            </div>

            {edit ? (
              <div className="space-x-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Save
                </button>

                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEdit(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Edit Profile
              </button>
            )}

          </div>

          {/* Information */}
          <div className="grid md:grid-cols-2 gap-5 mt-8">

            <div>
              <label className="font-semibold">Name</label>

              {edit ? (
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded p-2 mt-1"
                />
              ) : (
                <p>{user.name}</p>
              )}
            </div>

            <div>
              <label className="font-semibold">Email</label>
              <p>{user.email}</p>
            </div>

            <div>
              <label className="font-semibold">Phone</label>

              {edit ? (
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded p-2 mt-1"
                />
              ) : (
                <p>{user.phone || "Not Provided"}</p>
              )}
            </div>

            <div>
              <label className="font-semibold">User ID</label>
              <p className="break-all">{user._id}</p>
            </div>

            <div>
              <label className="font-semibold">Created</label>
              <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>

            <div>
              <label className="font-semibold">Updated</label>
              <p>{new Date(user.updatedAt).toLocaleDateString()}</p>
            </div>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default Profile;