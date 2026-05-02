"use client";

import Link from "next/link";
import { useEffect, useMemo, useCallback, useState } from "react";
import { api } from "@/lib/api";

const difficultyClassName = {
  easy: "bg-emerald-500/20 text-emerald-300",
  medium: "bg-amber-500/20 text-amber-300",
  hard: "bg-rose-500/20 text-rose-300",
};

function getProblemId(problem) {
  return problem?._id || problem?.id;
}

export default function ProblemsPage() {
  const [standaloneProblems, setStandaloneProblems] = useState([]);
  const [contestProblems, setContestProblems] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const problemRes = await api.get("/problem/catalog");

        if (ignore) return;
        setStandaloneProblems(problemRes?.data?.data?.standaloneProblems || []);
        setContestProblems(problemRes?.data?.data?.contestProblems || []);
      } catch (err) {
        if (!ignore) {
          setError(err?.response?.data?.message || "Unable to fetch problems");
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

  const filterByDifficulty = useCallback((problems) => {
    if (selectedDifficulty === "all") {
      return problems;
    }

    return problems.filter(
      (problem) =>
        String(problem?.difficulty || "").toLowerCase() === selectedDifficulty
    );
  }, [selectedDifficulty]);

  const filteredStandaloneProblems = useMemo(
    () => filterByDifficulty(standaloneProblems),
    [standaloneProblems, filterByDifficulty]
  );

  const filteredContestProblems = useMemo(
    () => filterByDifficulty(contestProblems),
    [contestProblems, filterByDifficulty]
  );

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Problems</h1>
          <p className="mt-2 text-slate-300">
            Practice standalone problems separately and browse contest-linked
            problems with their contest mapping.
          </p>
        </div>

        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Difficulty filter
          <select
            value={selectedDifficulty}
            onChange={(event) => setSelectedDifficulty(event.target.value)}
            className="rounded-lg border border-white/10 bg-[#1b2a17] px-4 py-3 text-sm text-white"
          >
            <option value="all">All problems</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
      </div>

      {loading && <p className="text-slate-400">Loading problems...</p>}
      {error && <p className="text-red-300">{error}</p>}

      {!loading && !error && (
        <>
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Standalone Problems
                </h2>
                <p className="text-sm text-slate-400">
                  These are not attached to any contest.
                </p>
              </div>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                {filteredStandaloneProblems.length} problems
              </span>
            </div>

            {filteredStandaloneProblems.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/10 bg-[#1b2a17] p-6 text-slate-400">
                No standalone problems available for this filter.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredStandaloneProblems.map((problem) => (
                  <ProblemCard key={getProblemId(problem)} problem={problem} />
                ))}
              </div>
            )}
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Contest Problems
                </h2>
                <p className="text-sm text-slate-400">
                  These are already mapped to one or more contests.
                </p>
              </div>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                {filteredContestProblems.length} problems
              </span>
            </div>

            {filteredContestProblems.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/10 bg-[#1b2a17] p-6 text-slate-400">
                No contest problems available for this filter.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredContestProblems.map((problem) => (
                  <article
                    key={getProblemId(problem)}
                    className="rounded-xl border border-white/10 bg-[#1b2a17] p-5"
                  >
                    <ProblemCardHeader problem={problem} />
                    <p className="mt-3 line-clamp-3 text-sm text-slate-300">
                      {problem?.description}
                    </p>
                    <div className="mt-4 space-y-2 text-sm text-slate-400">
                      <p>Points: {problem?.points ?? "--"}</p>
                      <div className="flex flex-wrap gap-2">
                        {problem?.contests?.map((contest) => (
                          <Link
                            key={`${getProblemId(problem)}-${contest?.id}`}
                            href={`/dashboard/contests/${contest?.id}`}
                            className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary"
                          >
                            {contest?.name} ({contest?.level})
                          </Link>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </section>
  );
}

function ProblemCard({ problem }) {
  const problemId = getProblemId(problem);

  return (
    <article className="rounded-xl border border-white/10 bg-[#1b2a17] p-5">
      <ProblemCardHeader problem={problem} />
      <p className="mt-3 line-clamp-3 text-sm text-slate-300">
        {problem?.description}
      </p>
      <div className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-400">
        <span>Points: {problem?.points ?? "--"}</span>
        <Link
          href={`/dashboard/arena/standalone/${problemId}`}
          className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-black transition hover:brightness-110"
        >
          Solve
        </Link>
      </div>
    </article>
  );
}

function ProblemCardHeader({ problem }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <h2 className="text-lg font-semibold text-white">{problem?.title}</h2>
      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${
          difficultyClassName[problem?.difficulty] ||
          "bg-slate-500/20 text-slate-300"
        }`}
      >
        {problem?.difficulty || "unknown"}
      </span>
    </div>
  );
}
