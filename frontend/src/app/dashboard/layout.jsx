"use client";
import { AuthProvider } from "@/context/AuthContext";
import Sidebar from "@/components/sidebar/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

function AuthGuard({ children }) {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!isAuthenticated) redirect('/login');

  return children;
}

export default function DashboardLayout({ children }) {
  return (
    <AuthProvider>
      <AuthGuard>
        <div className="flex h-screen bg-[#152012] text-white">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-10">{children}</main>
        </div>
      </AuthGuard>
    </AuthProvider>
  );
}
