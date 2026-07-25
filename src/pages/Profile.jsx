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

            <button className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-100">
              Profile
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


          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="mb-2 text-lg font-semibold text-slate-900">
              Activity Overview
            </h3>

            <div className="space-y-2 text-sm text-slate-600">
              <p>
                <span className="font-medium">Last Login:</span> Today
              </p>

              <p>
                <span className="font-medium">Account Status:</span> Active
              </p>

              <p>
                <span className="font-medium">Access Level:</span>{" "}
                {user?.role || "Administrator"}
              </p>

              <p>
                <span className="font-medium">Session:</span> Online
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="mb-2 text-lg font-semibold text-slate-900">
              Quick Stats
            </h3>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-white p-4 text-center border border-slate-200">
                <p className="text-2xl font-bold text-blue-700">24</p>
                <p className="text-sm text-slate-500">Tasks</p>
              </div>

              <div className="rounded-lg bg-white p-4 text-center border border-slate-200">
                <p className="text-2xl font-bold text-green-700">12</p>
                <p className="text-sm text-slate-500">Projects</p>
              </div>

              <div className="rounded-lg bg-white p-4 text-center border border-slate-200">
                <p className="text-2xl font-bold text-purple-700">5</p>
                <p className="text-sm text-slate-500">Teams</p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="mb-2 text-lg font-semibold text-slate-900">
              Preferences
            </h3>

            <div className="space-y-2 text-sm text-slate-600">
              <p>
                <span className="font-medium">Theme:</span> Light Mode
              </p>

              <p>
                <span className="font-medium">Language:</span> English
              </p>

              <p>
                <span className="font-medium">Notifications:</span> Enabled
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Profile;