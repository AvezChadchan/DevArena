"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import Editor from "@monaco-editor/react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

const LANGUAGES = [
  { id: "javascript", name: "JavaScript", defaultCode: "function solve() {\n  // Your code here\n}\n\nsolve();" },
  { id: "python", name: "Python", defaultCode: "def solve():\n  # Your code here\n  pass\n\nsolve()" },
  { id: "java", name: "Java", defaultCode: "public class Main {\n  public static void main(String[] args) {\n    // Your code here\n  }\n}" },
  { id: "cpp", name: "C++", defaultCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n  // Your code here\n  return 0;\n}" },
  { id: "c", name: "C", defaultCode: "#include <stdio.h>\n\nint main() {\n  // Your code here\n  return 0;\n}" },
];

export default function ContestArenaPage() {
  const params = useParams();
  const problemId = params?.problemId;
  const contestId = params?.contestId;
  const { login } = useAuth();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [language, setLanguage] = useState(LANGUAGES[0].id);
  const [code, setCode] = useState(LANGUAGES[0].defaultCode);
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  useEffect(() => {
    if (!problemId) return;
    let ignore = false;
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/problem/problem/${problemId}`);
        if (!ignore) {
          setProblem(res.data.data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err?.response?.data?.message || "Failed to load problem");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchProblem();
    return () => { ignore = true; };
  }, [problemId]);

  const handleLanguageChange = (e) => {
    const newLangId = e.target.value;
    setLanguage(newLangId);
    const langObj = LANGUAGES.find((l) => l.id === newLangId);
    setCode(langObj?.defaultCode || "");
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmissionResult({
      verdict: "Running",
      output: null,
      stderr: "Your code is being evaluated...",
    });
    try {
      const res = await api.post(
        "/submission/submit-code",
        {
          problemId,
          contestId,
          language,
          code,
        },
        { timeout: 45000 }
      );
      const result = res?.data?.data || {
          verdict: "Error",
          stderr: "The server did not return a submission result.",
        };

      setSubmissionResult(result);
      if (result?.user) {
        login(result.user);
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Submission failed";
      setSubmissionResult({
        verdict: "Error",
        output: null,
        stderr: message.toLowerCase().includes("jwt")
          ? "Session expired. Please log in again."
          : message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-slate-400">Loading problem...</div>;
  if (error) return <div className="p-8 text-red-400">{error}</div>;
  if (!problem) return <div className="p-8 text-slate-400">Problem not found.</div>;

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col lg:flex-row gap-6">
      {/* Left Pane - Problem Details */}
      <div className="flex-1 overflow-y-auto rounded-xl border border-white/10 bg-[#1b2a17] p-6 space-y-6">
        <div>
          <Link href={`/dashboard/contests/${contestId}`} className="text-sm text-primary hover:underline mb-4 inline-block">
            ← Back to Contest
          </Link>
          <div className="flex items-start justify-between">
            <h1 className="text-2xl font-bold">{problem.title}</h1>
            <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
              {problem.difficulty}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-400">Points: {problem.points}</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="whitespace-pre-wrap text-slate-300">{problem.description}</p>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Input Format</h3>
            <p className="whitespace-pre-wrap text-sm text-slate-300 bg-black/20 p-3 rounded-lg mt-1">{problem.inputFormat}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Output Format</h3>
            <p className="whitespace-pre-wrap text-sm text-slate-300 bg-black/20 p-3 rounded-lg mt-1">{problem.outputFormat}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-400">Sample Input</h3>
              <pre className="mt-1 overflow-x-auto rounded-lg bg-black/40 p-4 text-sm font-mono text-slate-300">
                {problem.sampleInput}
              </pre>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-400">Sample Output</h3>
              <pre className="mt-1 overflow-x-auto rounded-lg bg-black/40 p-4 text-sm font-mono text-slate-300">
                {problem.sampleOutput}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane - Code Editor */}
      <div className="flex-1 flex flex-col rounded-xl border border-white/10 bg-[#1b2a17] overflow-hidden">
        <div className="flex items-center justify-between bg-black/20 px-4 py-3 border-b border-white/5">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="rounded bg-[#0f1a0d] px-3 py-1.5 text-sm text-white border border-white/10 outline-none focus:border-primary"
          >
            {LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="rounded-lg bg-primary px-5 py-2 text-sm font-bold text-black transition hover:brightness-110 disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Code"}
          </button>
        </div>

        {submissionResult && (
          <div className="shrink-0 border-b border-white/10 bg-[#0f1a0d] p-4 min-h-36 max-h-72 overflow-y-auto">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-white">Result:</h3>
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                submissionResult.verdict === "Accepted" ? "bg-green-500/20 text-green-400" :
                ["Error", "Compilation Error", "Runtime Error"].includes(submissionResult.verdict) ? "bg-red-500/20 text-red-400" :
                submissionResult.verdict === "Running" ? "bg-sky-500/20 text-sky-300" :
                "bg-yellow-500/20 text-yellow-400"
              }`}>
                {submissionResult.verdict}
              </span>
              {Number(submissionResult.pointsAwarded) > 0 && (
                <span className="text-xs text-primary">+{submissionResult.pointsAwarded} pts</span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              {submissionResult.verdict === "Accepted"
                ? "Your output matched the expected sample output."
                : submissionResult.verdict === "Running"
                  ? "Waiting for Judge0 to finish..."
                  : "Your latest submission has been evaluated."}
            </p>
            {submissionResult.scoreIncremented && (
              <p className="mt-1 text-xs text-primary">
                Score updated. Current score: {submissionResult.currentScore}
              </p>
            )}
            {submissionResult.compileOutput && (
              <div className="mt-2">
                <p className="text-xs text-slate-400 mb-1">Compiler Output:</p>
                <pre className="text-xs font-mono text-slate-300 bg-black/40 p-2 rounded">{submissionResult.compileOutput}</pre>
              </div>
            )}
            {submissionResult.stderr && (
              <div className="mt-2">
                <p className="text-xs text-slate-400 mb-1">
                  {submissionResult.verdict === "Running" ? "Status:" : "Error:"}
                </p>
                <pre className="text-xs font-mono text-red-300 bg-red-950/40 p-2 rounded">{submissionResult.stderr}</pre>
              </div>
            )}
            {submissionResult.output && !submissionResult.stderr && (
              <div className="mt-2">
                <p className="text-xs text-slate-400 mb-1">Output:</p>
                <pre className="text-xs font-mono text-slate-300 bg-black/40 p-2 rounded">{submissionResult.output}</pre>
              </div>
            )}
            {submissionResult.expectedOutput && submissionResult.verdict !== "Accepted" && (
              <div className="mt-2">
                <p className="text-xs text-slate-400 mb-1">Expected Output:</p>
                <pre className="text-xs font-mono text-slate-300 bg-black/40 p-2 rounded">{submissionResult.expectedOutput}</pre>
              </div>
            )}
          </div>
        )}

        <div className="relative min-h-0 flex-1">
          <Editor
            height="100%"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              padding: { top: 16 },
              scrollBeyondLastLine: false,
            }}
          />
        </div>

      </div>
    </div>
  );
}
