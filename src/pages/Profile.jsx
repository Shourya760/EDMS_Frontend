import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { getCurrentUser, updateUser } from "../services/authService";
import { useLoaderData } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const loadUser = async () => {
    try {
      console.log("debb 1")
      const { data } = await getCurrentUser();
      console.log("debb 2")

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
      setLoading(true)
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
    } finally {
      setLoading(false);
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
        <div className="flex justify-center p-6">
          <div className="w-full max-w-md h-64 bg-gray-200 rounded-2xl animate-pulse" />
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
      <div className="min-h-[80vh] flex items-center justify-center p-6">

        {/* ID Card */}
        <div className="w-full max-w-md bg-white border rounded-2xl shadow-lg overflow-hidden">

          {/* Card Header */}
          <div className="bg-blue-600 text-white p-5">
            <p className="text-sm opacity-80">EMPLOYEE ID CARD</p>
            <h2 className="text-xl font-bold">My Profile</h2>
          </div>

          {/* Profile */}
          <div className="p-6">

            <div className="flex items-center gap-4">

              {preview ? (
                <img
                  src={preview}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold">
                  {initials}
                </div>
              )}

              <div className="flex-1">
                {edit ? (
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                ) : (
                  <h3 className="text-xl font-bold">{user.name}</h3>
                )}

                <p className="text-sm text-gray-500 mt-1">
                  {user.email}
                </p>
              </div>

            </div>

            {/* Image Upload */}
            {edit && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="mt-4 w-full text-sm"
              />
            )}

            {/* Details */}
            <div className="border-t mt-6 pt-5 space-y-4">

              <div>
                <p className="text-xs text-gray-500">EMAIL</p>
                <p className="font-medium">{user.email}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">PHONE</p>

                {edit ? (
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  />
                ) : (
                  <p className="font-medium">
                    {user.phone || "Not Provided"}
                  </p>
                )}
              </div>

              <div>
                <p className="text-xs text-gray-500">USER ID</p>
                <p className="font-medium text-sm break-all">
                  {user._id.slice(-4)}
                </p>
              </div>

              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-xs text-gray-500">JOINED</p>
                  <p className="font-medium">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">UPDATED</p>
                  <p className="font-medium">
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-2">

              {edit ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>

                  <button
                    onClick={handleCancel}
                    className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEdit(true)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              )}

            </div>
          </div>

          {/* Card Footer */}
          <div className="bg-gray-50 px-6 py-3 text-center text-xs text-gray-400">
            This card belongs to the registered user
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default Profile;

