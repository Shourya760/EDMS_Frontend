import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";




const Header = ({ onMenuClick }) => {
  
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate()

  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getCurrentUser();

        setUser(response.data.name);
        setEmail(response.data.email);
        setProfile(response.data.profile_image);
        setStatus(response.data.status);

      } catch (error) {
        console.error("ERROR IN GETTING USER:", error);
      }
    };

    loadUser();
  }, []);

  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            aria-label="Open sidebar"
            onClick={onMenuClick}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 lg:hidden"
          >
            <span className="flex flex-col gap-1">
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
            </span>
          </button>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
              Admin Panel
            </p>
            <h2 className="truncate text-base font-semibold text-slate-950 sm:text-lg">
              Employee Document Management System
            </h2>
          </div>
        </div>

        <Link
          to="/profile"
          className="group flex items-center gap-3 rounded-xl px-3 py-2 transition-all duration-300 hover:bg-slate-100"
        >
          <div className="relative">
            <img
              src={profile || { getInitials }}
              alt={user || "Profile"}
              className="h-10 w-10 rounded-full object-cover shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500"
            />
            {/* Indication  of Active / Inavtive */}
            <span
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${status ? "bg-green-500" : "bg-red-500"
                }`}
            />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-700 transition-colors duration-300 group-hover:text-blue-600">
              {user || "Guest"}
            </span>

            <span className="text-xs text-slate-400">
              {email}
            </span>
          </div>
        </Link>


      </div>
    </header>
  );
};

export default Header;
