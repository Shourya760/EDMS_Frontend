// import { useEffect, useState } from "react";
// import AdminLayout from "../layouts/AdminLayout";
// import { getCurrentUser, updateUser } from "../services/authService";

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [edit, setEdit] = useState(false);
//   const [image, setImage] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//   });

//   // getting current user 
//   const loadUser = async () => {
//     try {
//       const { data } = await getCurrentUser();

//       setUser(data);
//       setFormData({
//         name: data.name || "",
//         phone: data.phone || "",
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//     loadUser();
//   }, []);


//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSave = async () => {
//     try {
//       const form = new FormData();
//       form.append("id", user._id);
//       form.append("data", JSON.stringify(formData));

//       if (image) {
//         form.append("profile_image", image);
//       }

//       await updateUser(form);
//       await loadUser();

//       setImage(null);
//       setEdit(false);

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleCancel = () => {
//     setFormData({
//       name: user.name || "",
//       phone: user.phone || "",
//     });

//     setImage(null);
//     setEdit(false);
//   };

//   if (!user) {
//     return (
//       <AdminLayout>
//         <div className="max-w-4xl mx-auto p-6 animate-pulse">
//           <div className="bg-white rounded-xl shadow p-6">

//             <div className="flex items-center gap-5">
//               <div className="w-28 h-28 rounded-full bg-gray-300"></div>

//               <div className="space-y-3 flex-1">
//                 <div className="h-6 w-48 bg-gray-300 rounded"></div>
//                 <div className="h-4 w-64 bg-gray-200 rounded"></div>
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-5 mt-8">
//               {[...Array(6)].map((_, i) => (
//                 <div key={i}>
//                   <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
//                   <div className="h-11 w-full bg-gray-200 rounded"></div>
//                 </div>
//               ))}
//             </div>

//           </div>
//         </div>
//       </AdminLayout>
//     );
//   }

//   const preview = image
//     ? URL.createObjectURL(image)
//     : user.profile_image;

//   const initials = user.name
//     ?.split(" ")
//     .map((n) => n[0])
//     .join("")
//     .toUpperCase();

//   return (
//     <AdminLayout>
//       <div className="max-w-4xl mx-auto p-6">

//         <div className="bg-white rounded-xl shadow p-6">

//           {/* Profile */}
//           <div className="flex flex-col md:flex-row justify-between items-center gap-6">

//             <div className="flex items-center gap-5">

//               {preview ? (
//                 <img
//                   src={preview}
//                   alt="Profile"
//                   className="w-28 h-28 rounded-full object-cover"
//                 />
//               ) : (
//                 <div className="w-28 h-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
//                   {initials}
//                 </div>
//               )}

//               <div>
//                 <h2 className="text-2xl font-bold">{user.name}</h2>
//                 <p className="text-gray-500">{user.email}</p>

//                 {edit && (
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="mt-3 block w-full text-sm text-gray-600
//       file:mr-4 file:rounded-md file:border-0
//       file:bg-blue-600 file:px-4 file:py-2
//       file:text-white file:cursor-pointer
//       hover:file:bg-blue-700"
//                     onChange={(e) => setImage(e.target.files[0])}
//                   />
//                 )}
//               </div>

//             </div>

//             {edit ? (
//               <div className="space-x-2">
//                 <button
//                   onClick={handleSave}
//                   className="px-4 py-2 bg-green-600 text-white rounded"
//                 >
//                   Save
//                 </button>

//                 <button
//                   onClick={handleCancel}
//                   className="px-4 py-2 bg-gray-300 rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={() => setEdit(true)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded"
//               >
//                 Edit Profile
//               </button>
//             )}

//           </div>

//           {/* Information */}
//           <div className="grid md:grid-cols-2 gap-5 mt-8">

//             <div>
//               <label className="font-semibold">Name</label>

//               {edit ? (
//                 <input
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full border rounded p-2 mt-1"
//                 />
//               ) : (
//                 <p>{user.name}</p>
//               )}
//             </div>

//             <div>
//               <label className="font-semibold">Email</label>
//               <p>{user.email}</p>
//             </div>

//             <div>
//               <label className="font-semibold">Phone</label>

//               {edit ? (
//                 <input
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="w-full border rounded p-2 mt-1"
//                 />
//               ) : (
//                 <p>{user.phone || "Not Provided"}</p>
//               )}
//             </div>

//             <div>
//               <label className="font-semibold">User ID</label>
//               <p className="break-all">{user._id}</p>
//             </div>

//             <div>
//               <label className="font-semibold">Created</label>
//               <p>{new Date(user.createdAt).toLocaleDateString()}</p>
//             </div>

//             <div>
//               <label className="font-semibold">Updated</label>
//               <p>{new Date(user.updatedAt).toLocaleDateString()}</p>
//             </div>

//           </div>

//         </div>

//       </div>
//     </AdminLayout>
//   );
// };

// export default Profile;





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
                  {user._id}
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
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                  >
                    Save
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

