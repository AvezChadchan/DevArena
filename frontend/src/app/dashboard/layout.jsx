"use client";
import { AuthProvider } from "@/context/AuthContext";
import Sidebar from "@/components/sidebar/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <AuthProvider>
      <div className="flex h-screen bg-[#152012] text-white">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-10">{children}</main>
      </div>
    </AuthProvider>
  );
}
