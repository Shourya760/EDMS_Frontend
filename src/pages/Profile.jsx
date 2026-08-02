import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { getCurrentUser } from "../services/authService";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response.data);
        console.log("Data =>", response.data.profile_image)
      } catch (error) {
        console.log(error);
      }
    };

    loadUser();
  }, []);


  const initials = user?.name
    ? user.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
    : "U";

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-slate-800 mb-6">
          My Profile
        </h1>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md border p-8">

          {/* Top Section */}
          <div className="flex flex-col items-center border-b pb-6">

            <div className="h-28 w-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
              {initials}
            </div>

            <h2 className="mt-4 text-2xl font-semibold">
              {user?.name}
            </h2>

            <p className="text-gray-500">
              {user?.email}
            </p>

            <span className="mt-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              Active User
            </span>

            <button className="mt-5 px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
              Update Profile
            </button>

          </div>

          {/* General Information */}
          <div className="mt-8">

            <h3 className="text-xl font-semibold mb-4">
              General Information
            </h3>

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <p className="text-gray-500 text-sm">Full Name</p>
                <div className="border rounded-lg p-3">
                  {user?.name}
                </div>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <div className="border rounded-lg p-3">
                  {user?.email}
                </div>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <div className="border rounded-lg p-3">
                  {user?.phone || "Not Provided"}
                </div>
              </div>

              <div>
                <p className="text-gray-500 text-sm">User ID</p>
                <div className="border rounded-lg p-3 break-all">
                  {user?._id}
                </div>
              </div>

            </div>

          </div>

          {/* Account Information */}
          <div className="mt-10">

            <h3 className="text-xl font-semibold mb-4">
              Account Information
            </h3>

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <p className="text-gray-500 text-sm">
                  Account Created
                </p>

                <div className="border rounded-lg p-3">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "-"}
                </div>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Last Updated
                </p>

                <div className="border rounded-lg p-3">
                  {user?.updatedAt
                    ? new Date(user.updatedAt).toLocaleDateString()
                    : "-"}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default Profile;