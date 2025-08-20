import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const STORAGE_KEY = "sidebar:collapsed";

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(collapsed));
  }, [collapsed]);

  // quando colapsa no desktop: encosta à esquerda e reduz um pouco o padding
  const containerClasses = [
    "w-full",
    "max-w-[1280px]",
    "p-4 sm:p-6",
    collapsed ? "lg:mr-auto lg:ml-0 lg:pl-4 lg:pr-8 lg:py-8" // alinhado à esquerda
              : "lg:mx-auto lg:px-8 lg:py-8",                  // centralizado (padrão)
  ].join(" ");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(v => !v)} />

      <main className="flex-1 min-w-0">
        <div className={containerClasses}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
