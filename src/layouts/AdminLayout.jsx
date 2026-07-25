import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className="min-w-0 flex-1">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="mx-auto max-w-7xl p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
