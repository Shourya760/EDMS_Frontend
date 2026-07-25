import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: "D" },
    { name: "Employees", path: "/employees", icon: "E" },
    { name: "Departments", path: "/departments", icon: "T" },
    { name: "Documents", path: "/documents", icon: "F" },
    { name: "Profile", path: "/profile", icon: "P" },
  ];

  return (
    <>
      <button
        type="button"
        aria-label="Close sidebar overlay"
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-slate-950/45 transition-opacity lg:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 max-w-[86vw] flex-col bg-slate-950 text-white shadow-2xl transition-transform duration-300 lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:w-64 lg:translate-x-0 lg:shadow-none ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div>
            <h1 className="text-2xl font-bold">EDMS</h1>
            <p className="mt-1 text-xs text-slate-400">
              Employee documents
            </p>
          </div>

          {/* <button
            type="button"
            aria-label="Close sidebar"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-xl hover:bg-white/15 lg:hidden"
          >
            x
          </button> */}
        </div>

        <nav className="flex flex-1 flex-col gap-2 p-5">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <span className="grid h-7 w-7 place-items-center rounded-md bg-white/10 text-xs">
                {link.icon}
              </span>
              {link.name}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => {
            onClose();
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login")
          }}
          className="m-5 rounded-lg bg-red-600 p-3 font-medium transition-colors hover:bg-green-700"
        >
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
