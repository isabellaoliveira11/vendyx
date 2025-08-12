import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:block w-60 shrink-0">
        <Sidebar />
      </aside>

      {/* Sidebar (mobile - drawer) */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-60 bg-white shadow-xl">
            <Sidebar onLinkClick={() => setOpen(false)} />
          </aside>
        </div>
      )}

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onMenuClick={() => setOpen(true)} userName="Isabela Oliveira" />
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
