"use client";

import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { api } from "@/lib/api";
import { AuthContext } from "@/context/AuthContext";

const statusClassName = {
  running: "bg-emerald-500/20 text-emerald-300",
  upcoming: "bg-sky-500/20 text-sky-300",
  ended: "bg-slate-500/20 text-slate-300",
};

export default function ContestsPage() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/contest/get-contests");
        if (ignore) return;
        setContests(res?.data?.data || []);
      } catch (err) {
        if (!ignore) {
          setError(err?.response?.data?.message || "Unable to fetch contests");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contests</h1>
          <p className="mt-2 text-slate-300">
            Browse active and upcoming coding contests.
          </p>
        </div>
        {user?.role === "admin" && (
          <Link
            href="/dashboard/admin/create-contest"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-black hover:brightness-110"
          >
            + Create Contest
          </Link>
        )}
      </div>

      {loading && <p className="text-slate-400">Loading contests...</p>}
      {error && <p className="text-red-300">{error}</p>}

      {!loading && !error && contests.length === 0 && (
        <p className="text-slate-400">No contests available.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {contests.map((contest) => (
          <article
            key={contest?.id}
            className="rounded-xl border border-white/10 bg-[#1b2a17] p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-semibold text-white">{contest?.name}</h2>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  statusClassName[contest?.status] || statusClassName.ended
                }`}
              >
                {contest?.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-300">{contest?.description}</p>
            <div className="mt-3 text-xs text-slate-400">
              <p>Problems: {contest?.totalProblems || 0}</p>
              <p>Starts: {new Date(contest?.startTime).toLocaleString()}</p>
              <p>Ends: {new Date(contest?.endTime).toLocaleString()}</p>
            </div>
            <Link
              href={`/dashboard/contests/${contest?.id}`}
              className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
            >
              View Details
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
