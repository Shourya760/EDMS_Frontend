import AdminLayout from "../layouts/AdminLayout";

const Profile = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  const initials = user?.name
    ? user.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
    : "U";

  return (
    <AdminLayout>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <p className="text-sm font-medium text-blue-700">Account</p>
          <h1 className="text-3xl font-bold text-slate-950">Profile</h1>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col items-center">
            <div className="mb-4 grid h-28 w-28 place-items-center rounded-full bg-blue-100 text-3xl font-bold text-blue-800">
              {initials}
            </div>

            <button className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-green-100 hover:text-black-400">
              Update Profile
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              value={user?.name || ""}
              className="rounded-lg border border-slate-300 px-4 py-2.5"
              readOnly
            />

            <input
              type="email"
              value={user?.email || ""}
              className="rounded-lg border border-slate-300 px-4 py-2.5"
              readOnly
            />
          </div>


          
          


        </div>
      </div>
    </AdminLayout>
  );
};

export default Profile;