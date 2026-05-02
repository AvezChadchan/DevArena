"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function CreateContestPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    level: "easy",
    startTime: "",
    endTime: "",
    selectedProblems: [],
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    // If not admin, redirect away
    if (!authLoading && user?.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    let ignore = false;
    const fetchProblems = async () => {
      try {
        const res = await api.get("/problem/problem");
        if (!ignore) {
          setProblems(res.data.data || []);
        }
      } catch (err) {
        if (!ignore) {
          setError(err?.response?.data?.message || "Failed to load problems");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchProblems();
    return () => { ignore = true; };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProblemToggle = (problemId) => {
    setFormData((prev) => {
      const selected = prev.selectedProblems;
      if (selected.includes(problemId)) {
        return { ...prev, selectedProblems: selected.filter((id) => id !== problemId) };
      } else {
        return { ...prev, selectedProblems: [...selected, problemId] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const startTime = new Date(formData.startTime);
    const endTime = new Date(formData.endTime);

    if (Number.isNaN(startTime.getTime()) || Number.isNaN(endTime.getTime())) {
      setSubmitError("Please choose valid start and end times");
      return;
    }

    if (startTime >= endTime) {
      setSubmitError("Start time must be earlier than end time");
      return;
    }

    if (formData.selectedProblems.length === 0) {
      setSubmitError("Select at least one problem for the contest");
      return;
    }

    setSubmitting(true);
    try {
      await api.post("/contest/create", {
        name: formData.name,
        description: formData.description,
        level: formData.level,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        problems: formData.selectedProblems,
      });
      router.push("/dashboard/contests");
    } catch (err) {
      setSubmitError(err?.response?.data?.message || "Failed to create contest");
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || loading) return <div className="p-8 text-slate-400">Loading...</div>;
  if (user?.role !== "admin") return null;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Link href="/dashboard/contests" className="text-sm text-primary hover:underline mb-6 inline-block">
        ← Back to Contests
      </Link>

      <div className="rounded-xl border border-white/10 bg-[#1b2a17] p-8">
        <h1 className="text-2xl font-bold mb-6">Create New Contest</h1>

        {error && <div className="mb-4 p-3 rounded bg-red-500/20 text-red-300">{error}</div>}
        {submitError && <div className="mb-4 p-3 rounded bg-red-500/20 text-red-300">{submitError}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Contest Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg bg-[#0f1a0d] border border-white/10 px-4 py-2 text-white focus:border-primary focus:outline-none"
                placeholder="e.g. Weekly Challenge #1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
              <textarea
                name="description"
                required
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-lg bg-[#0f1a0d] border border-white/10 px-4 py-2 text-white focus:border-primary focus:outline-none"
                placeholder="Describe the contest rules and topics..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Difficulty Level</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-[#0f1a0d] border border-white/10 px-4 py-2 text-white focus:border-primary focus:outline-none"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Start Time</label>
                <input
                  type="datetime-local"
                  name="startTime"
                  required
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-[#0f1a0d] border border-white/10 px-4 py-2 text-white focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">End Time</label>
                <input
                  type="datetime-local"
                  name="endTime"
                  required
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-[#0f1a0d] border border-white/10 px-4 py-2 text-white focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Select Problems</label>
            <div className="max-h-64 overflow-y-auto rounded-lg border border-white/10 bg-[#0f1a0d] p-4 space-y-2">
              {problems.length === 0 ? (
                <p className="text-sm text-slate-500">No problems available to select.</p>
              ) : (
                problems.map((problem) => (
                  <label key={problem._id} className="flex items-start gap-3 p-2 hover:bg-white/5 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 rounded border-white/20 text-primary focus:ring-primary bg-black"
                      checked={formData.selectedProblems.includes(problem._id)}
                      onChange={() => handleProblemToggle(problem._id)}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-white">{problem.title}</p>
                      <p className="text-xs text-slate-400">
                        Difficulty: {problem.difficulty} • Points: {problem.points}
                      </p>
                    </div>
                  </label>
                ))
              )}
            </div>
            <p className="mt-1 text-xs text-slate-400">Selected: {formData.selectedProblems.length}</p>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              type="submit"
              disabled={submitting || formData.selectedProblems.length === 0}
              className="rounded-lg bg-primary px-6 py-2 text-sm font-bold text-black transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Creating..." : "Create Contest"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
