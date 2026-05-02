"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await api.get("/leaderboard/global-leaderboard");
        if (ignore) return;
        setLeaders(res?.data?.data || []);
      } catch (err) {
        if (!ignore) {
          setError(
            err?.response?.data?.message || "Unable to fetch leaderboard"
          );
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
      <div>
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <p className="mt-2 text-slate-300">
          Global rankings based on accepted submissions and score.
        </p>
      </div>

      {loading && <p className="text-slate-400">Loading leaderboard...</p>}
      {error && <p className="text-red-300">{error}</p>}

      {!loading && !error && (
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#1b2a17]">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/5 text-slate-400">
              <tr>
                <th className="px-5 py-4">Rank</th>
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaders.map((leader) => (
                <tr key={`${leader?.rank}-${leader?.username}`} className="border-t border-white/5">
                  <td className="px-5 py-4 font-semibold text-white">
                    #{leader?.rank}
                  </td>
                  <td className="px-5 py-4 text-slate-200">
                    {leader?.username}
                  </td>
                  <td className="px-5 py-4 text-primary">
                    {leader?.score ?? 0}
                  </td>
                </tr>
              ))}
              {leaders.length === 0 && (
                <tr>
                  <td className="px-5 py-5 text-slate-400" colSpan={3}>
                    No ranking data available yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
