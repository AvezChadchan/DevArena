"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";

export default function ContestDetailPage() {
  const params = useParams();
  const contestId = params?.id;
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joining, setJoining] = useState(false);
  const [joinMessage, setJoinMessage] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);

  const problems = useMemo(
    () => (Array.isArray(contest?.problems) ? contest.problems : []),
    [contest]
  );

  useEffect(() => {
    if (!contestId) return;
    let ignore = false;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const [contestRes, leaderboardRes] = await Promise.all([
          api.get(`/contest/get-contest-details/${contestId}`),
          api.get(`/contest/leaderboard/${contestId}`).catch(() => null),
        ]);
        if (ignore) return;
        setContest(contestRes?.data?.data || null);
        setLeaderboard(leaderboardRes?.data?.data?.leaderboard || []);
      } catch (err) {
        if (!ignore) {
          setError(err?.response?.data?.message || "Unable to fetch contest");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
          setLeaderboardLoading(false);
        }
      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, [contestId]);

  const joinContest = async () => {
    setJoining(true);
    setJoinMessage("");
    try {
      const res = await api.post(`/contest/${contestId}/join-contest`);
      setJoinMessage(res?.data?.message || "Joined contest successfully");
      const leaderboardRes = await api.get(`/contest/leaderboard/${contestId}`);
      setLeaderboard(leaderboardRes?.data?.data?.leaderboard || []);
    } catch (err) {
      setJoinMessage(err?.response?.data?.message || "Unable to join contest");
    } finally {
      setJoining(false);
    }
  };

  if (loading) return <p className="text-slate-400">Loading contest details...</p>;
  if (error) return <p className="text-red-300">{error}</p>;
  if (!contest) return <p className="text-slate-400">Contest not found.</p>;

  return (
    <section className="space-y-6">
      <div>
        <Link
          href="/dashboard/contests"
          className="text-sm text-primary hover:underline"
        >
          ← Back to contests
        </Link>
        <h1 className="mt-3 text-3xl font-bold">{contest?.name}</h1>
        <p className="mt-2 text-slate-300">{contest?.description}</p>
        <p className="mt-3 text-xs text-slate-400">
          {new Date(contest?.startTime).toLocaleString()} -{" "}
          {new Date(contest?.endTime).toLocaleString()}
        </p>
        <span className="mt-2 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
          {contest?.status}
        </span>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#1b2a17] p-4">
        <button
          type="button"
          onClick={joinContest}
          disabled={joining || contest?.status === "ended"}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-black disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {joining ? "Joining..." : contest?.status === "ended" ? "Contest Ended" : "Join Contest"}
        </button>
        {joinMessage && <p className="mt-2 text-sm text-slate-300">{joinMessage}</p>}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Problems</h2>
        {problems.length === 0 && (
          <p className="text-slate-400">No problems in this contest yet.</p>
        )}
        <div className="grid gap-4 md:grid-cols-2">
          {problems.map((problem) => {
            const id = typeof problem === "string" ? problem : problem?._id;
            const title = typeof problem === "string" ? problem : problem?.title;

            return (
              <article
                key={id}
                className="rounded-xl border border-white/10 bg-[#1b2a17] p-5"
              >
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-slate-300">
                  Difficulty: {problem?.difficulty || "N/A"} | Points:{" "}
                  {problem?.points ?? "--"}
                </p>
                <Link
                  href={`/dashboard/arena/${contestId}/${id}`}
                  className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
                >
                  Solve Problem
                </Link>
              </article>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Contest Leaderboard</h2>
          <p className="mt-1 text-sm text-slate-400">
            Rankings are based on accepted contest submissions. Each problem
            counts once per user.
          </p>
        </div>

        {leaderboardLoading ? (
          <p className="text-slate-400">Loading contest leaderboard...</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#1b2a17]">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/5 text-slate-400">
                <tr>
                  <th className="px-5 py-4">Rank</th>
                  <th className="px-5 py-4">User</th>
                  <th className="px-5 py-4">Solved</th>
                  <th className="px-5 py-4">Score</th>
                  <th className="px-5 py-4">Last Accepted</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry) => (
                  <tr
                    key={entry?.userId || `${entry?.rank}-${entry?.username}`}
                    className="border-t border-white/5"
                  >
                    <td className="px-5 py-4 font-semibold text-white">
                      #{entry?.rank}
                    </td>
                    <td className="px-5 py-4 text-slate-200">
                      {entry?.username || "User"}
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      {entry?.solvedCount ?? 0}
                    </td>
                    <td className="px-5 py-4 text-primary">
                      {entry?.totalScore ?? 0}
                    </td>
                    <td className="px-5 py-4 text-slate-400">
                      {entry?.lastAcceptedAt
                        ? new Date(entry.lastAcceptedAt).toLocaleString()
                        : "--"}
                    </td>
                  </tr>
                ))}
                {leaderboard.length === 0 && (
                  <tr>
                    <td className="px-5 py-5 text-slate-400" colSpan={5}>
                      No one has joined this contest yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
