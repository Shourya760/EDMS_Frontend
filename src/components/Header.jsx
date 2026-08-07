import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";
import { useNavigate } from "react-router-dom";




const Header = ({ onMenuClick }) => {

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
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

        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          {profile ? (
            <img
              src={profile}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
              {getInitials(user)}
            </div>
          )}

          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-700">
              {user || "Guest"}
            </span>
            <span className="text-xs text-slate-400">
              {email}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
