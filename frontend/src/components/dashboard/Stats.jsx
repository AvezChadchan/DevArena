"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";

export default function Stats() {
  const [contests, setContests] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      setLoading(true);
      try {
        const [contestRes, leaderboardRes, submissionRes] = await Promise.all([
          api.get("/contest/get-contests"),
          api.get("/leaderboard/global-leaderboard"),
          api.get("/submission/get-user-submissions").catch(() => null),
        ]);

        if (ignore) return;
        setContests(contestRes?.data?.data || []);
        setLeaders(leaderboardRes?.data?.data || []);
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

  const acceptedCount = useMemo(
    () =>
      submissions.filter((submission) => submission?.verdict === "Accepted")
        .length,
    [submissions]
  );

  const stats = [
    {
      label: "Total Contests",
      value: contests.length,
    },
    {
      label: "Running Contests",
      value: contests.filter((contest) => contest?.status === "running").length,
    },
    {
      label: "My Accepted Submissions",
      value: acceptedCount,
    },
    {
      label: "Global Ranked Users",
      value: leaders.length,
    },
  ];

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold">Quick Stats</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <article
            key={item.label}
            className="rounded-xl border border-white/10 bg-[#1b2a17] p-5"
          >
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className="mt-2 text-2xl font-bold text-white">
              {loading ? "--" : item.value}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
