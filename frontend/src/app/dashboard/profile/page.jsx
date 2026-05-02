"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();
  const [joinedContests, setJoinedContests] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      setLoading(true);

      try {
        const [contestRes, submissionRes] = await Promise.all([
          api.get("/contest/my/contests").catch(() => null),
          api.get("/submission/get-user-submissions").catch(() => null),
        ]);

        if (ignore) return;
        setJoinedContests(contestRes?.data?.data || []);
        setSubmissions(submissionRes?.data?.data || []);
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
      <div className="rounded-2xl border border-white/10 bg-[#1b2a17] p-6">
        <p className="text-sm text-slate-400">Profile</p>
        <h1 className="mt-2 text-3xl font-bold text-white">
          {user?.fullname || user?.username || "Coder"}
        </h1>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white/5 p-4">
            <p className="text-sm text-slate-400">Username</p>
            <p className="mt-2 font-semibold text-white">{user?.username || "--"}</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4">
            <p className="text-sm text-slate-400">Email</p>
            <p className="mt-2 font-semibold text-white">{user?.email || "--"}</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4">
            <p className="text-sm text-slate-400">Score</p>
            <p className="mt-2 font-semibold text-primary">{user?.score ?? 0}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <article className="rounded-xl border border-white/10 bg-[#1b2a17] p-5">
          <h2 className="text-lg font-semibold text-white">Joined Contests</h2>
          {loading ? (
            <p className="mt-4 text-slate-400">Loading contests...</p>
          ) : joinedContests.length === 0 ? (
            <p className="mt-4 text-slate-400">You have not joined any contests yet.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {joinedContests.map((contest) => (
                <div
                  key={contest?.id}
                  className="rounded-lg border border-white/5 bg-white/5 p-4"
                >
                  <p className="font-semibold text-white">{contest?.name}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Status: {contest?.status} | Problems: {contest?.problemCount ?? 0}
                  </p>
                </div>
              ))}
            </div>
          )}
        </article>

        <article className="rounded-xl border border-white/10 bg-[#1b2a17] p-5">
          <h2 className="text-lg font-semibold text-white">Recent Submissions</h2>
          {loading ? (
            <p className="mt-4 text-slate-400">Loading submissions...</p>
          ) : submissions.length === 0 ? (
            <p className="mt-4 text-slate-400">No submissions yet.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {submissions.slice(0, 8).map((submission) => (
                <div
                  key={submission?._id || `${submission?.createdAt}-${submission?.problemDetails?.title}`}
                  className="rounded-lg border border-white/5 bg-white/5 p-4"
                >
                  <p className="font-semibold text-white">
                    {submission?.problemDetails?.title || "Problem"}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {submission?.language} | {submission?.verdict} |{" "}
                    {new Date(submission?.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
