"use client";

import Link from "next/link";
import { Home, Code2, Trophy, BarChart3, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  console.log("Sidebar auth:", { user, loading });

  return (
    <aside className="w-72 h-screen bg-[#0f1a0d] border-r border-white/5 flex flex-col justify-between px-6 py-8">
      <div>
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-black font-bold">
            &lt;/&gt;
          </div>
          <div>
            <h1 className="text-lg font-extrabold">DevArena</h1>
            <p className="text-xs text-green-400 tracking-wide">
              CODE. COMPETE.
            </p>
          </div>
        </div>

        <nav className="space-y-2">
          <NavItem
            icon={<Home size={18} />}
            label="Dashboard"
            href="/dashboard"
            active={pathname === "/dashboard"}
          />
          <NavItem
            icon={<Code2 size={18} />}
            label="Problems"
            href="/problems"
            active={pathname.startsWith("/problems")}
          />
          <NavItem
            icon={<Trophy size={18} />}
            label="Contests"
            href="/contests"
            active={pathname.startsWith("/contests")}
          />
          <NavItem
            icon={<BarChart3 size={18} />}
            label="Leaderboard"
            href="/leaderboard"
            active={pathname === "/leaderboard"}
          />
        </nav>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-3">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-black font-bold">
            {user?.username?.[0] || "P"}
          </div>
          <div>
            <p className="text-sm font-semibold">
              {" "}
              {loading ? "Loading..." : user?.username}
            </p>
            <p className="text-xs text-slate-400">
              Score:{user?.score ?? "--"}
            </p>
          </div>
        </div>
        <div>
          <NavItem icon={<User size={18} />} label="Profile" href="/profile" />
          <NavItem
            icon={<LogOut size={18} />}
            label="Logout"
            danger
            onClick={logout}
          />
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, href, active, danger, onClick }) {
  if (onClick) {
    return (
      <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition${danger ? "text-red-400 hover:bg-red-500/10" : "text-slate-300 hover:bg-white/5"}`}>{icon}{label}</button>
    );
  }
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
        ${active
          ? "bg-primary text-black shadow-neon"
          : "text-slate-300 hover:bg-white/5"
        }`}
    >
      {icon}
      {label}
    </Link>
  );
}
