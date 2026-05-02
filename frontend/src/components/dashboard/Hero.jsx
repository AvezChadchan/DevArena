"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Hero() {
  const { user } = useAuth();

  return (
    <section className="rounded-2xl border border-white/10 bg-[#1b2a17] p-8 shadow-glass">
      <p className="text-sm text-slate-400">Welcome back</p>
      <h1 className="mt-2 text-3xl font-bold text-white">
        {user?.fullname || user?.username || "Coder"}
      </h1>
      <p className="mt-3 max-w-2xl text-slate-300">
        Track progress, join live contests, and submit solutions directly from
        your arena.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/dashboard/contests"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-black"
        >
          Explore Contests
        </Link>
        <Link
          href="/dashboard/problems"
          className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-slate-200"
        >
          Solve Problems
        </Link>
      </div>
    </section>
  );
}
