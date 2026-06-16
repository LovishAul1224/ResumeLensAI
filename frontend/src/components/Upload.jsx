import { useState, useRef } from "react";
import axios from "axios";

// In dev, Vite proxy forwards /upload → http://localhost:8000/upload
// In production, set VITE_API_URL=https://your-backend.com in .env
const API_BASE = import.meta.env.VITE_API_URL || "";
console.log("API_BASE =", API_BASE);

export default function Upload({ onResult, loading, setLoading }) {
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef();

  const stages = [
    "Extracting text…",
    "Running ATS parser…",
    "Scoring sections…",
    "Generating improvements…",
    "Finalizing report…",
  ];

  const simulateProgress = () => {
    let pct = 10;
    let stageIdx = 0;
    setProgress(10);
    setStage(stages[0]);
    const interval = setInterval(() => {
      pct += Math.random() * 12 + 4;
      if (pct >= 92) { pct = 92; clearInterval(interval); }
      stageIdx = Math.min(Math.floor(pct / 20), stages.length - 1);
      setProgress(Math.round(pct));
      setStage(stages[stageIdx]);
    }, 700);
    return interval;
  };

  const handleFile = async (file) => {
    if (!file) return;
    const ext = file.name.split(".").pop().toLowerCase();
    if (!["pdf", "docx"].includes(ext)) {
      setError("Please upload a PDF or DOCX file.");
      return;
    }
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const interval = simulateProgress();

    try {
      const res = await axios.post(`${API_BASE}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000, // 60s — Gemini can be slow
      });

      clearInterval(interval);
      setProgress(100);
      setStage("Done!");

      const raw = res.data;

      // Unwrap: backend returns { analysis: {...} } OR just {...}
      const analysis = raw?.analysis ?? raw;

      if (!analysis || analysis.error) {
        throw new Error(analysis?.error || "Empty response from backend.");
      }

      setTimeout(() => {
        setLoading(false);
        setProgress(0);
        onResult(analysis, file.name);
      }, 500);

    } catch (err) {
      clearInterval(interval);
      setLoading(false);
      setProgress(0);

      if (err.code === "ECONNREFUSED" || err.message?.includes("Network Error")) {
        setError("Cannot reach the backend. Make sure FastAPI is running on port 8000.");
      } else if (err.response?.status === 400) {
        setError(err.response.data?.detail || "Invalid file.");
      } else if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError(err.message || "Something went wrong.");
      }
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "28px 32px" }}>
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <div style={{
            width: "48px", height: "48px", borderRadius: "50%",
            border: "3px solid var(--bg4)", borderTopColor: "var(--purple)",
            animation: "spin .8s linear infinite", margin: "0 auto 20px",
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{ fontSize: "17px", fontWeight: 500, marginBottom: "6px" }}>Analyzing your resume…</div>
          <div style={{ fontSize: "13px", color: "var(--text2)", marginBottom: "20px" }}>{stage}</div>
          <div style={{
            background: "var(--bg4)", borderRadius: "4px", height: "5px",
            maxWidth: "320px", margin: "0 auto", overflow: "hidden",
          }}>
            <div style={{
              height: "100%",
              background: "linear-gradient(90deg, var(--purple), var(--purple2))",
              borderRadius: "4px", width: `${progress}%`, transition: "width .4s ease",
            }} />
          </div>
          <div style={{ fontSize: "12px", color: "var(--text3)", marginTop: "10px" }}>{progress}%</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "28px 32px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 600, marginBottom: "4px" }}>Analyze a resume</h1>
        <p style={{ fontSize: "13px", color: "var(--text2)" }}>
          Upload a PDF or DOCX — get an AI-powered score, ATS flags, and top 5 improvements in seconds.
        </p>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
        onClick={() => inputRef.current?.click()}
        style={{
          border: `1.5px dashed ${dragging ? "var(--purple)" : "var(--border2)"}`,
          borderRadius: "16px", padding: "56px 32px", textAlign: "center",
          cursor: "pointer", background: dragging ? "var(--purple4)" : "var(--bg2)",
          transition: "all .2s",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          style={{ display: "none" }}
          onChange={e => handleFile(e.target.files[0])}
        />
        <div style={{
          width: "52px", height: "52px", background: "var(--bg4)", borderRadius: "12px",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 16px",
        }}>
          <i className="ti ti-file-upload" style={{ fontSize: "22px", color: "var(--text2)" }} />
        </div>
        <div style={{ fontSize: "16px", fontWeight: 500, marginBottom: "6px" }}>Drop your resume here</div>
        <div style={{ fontSize: "13px", color: "var(--text2)", marginBottom: "18px" }}>
          or click to browse from your computer
        </div>
        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
          <span style={{ background: "rgba(239,68,68,.15)", color: "#f87171", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: 600 }}>PDF</span>
          <span style={{ background: "rgba(59,130,246,.15)", color: "#60a5fa", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: 600 }}>DOCX</span>
        </div>
      </div>

      {error && (
        <div style={{
          marginTop: "14px", padding: "12px 16px", background: "rgba(240,82,82,.1)",
          border: "1px solid rgba(240,82,82,.2)", borderRadius: "8px",
          fontSize: "13px", color: "var(--red)",
        }}>
          <i className="ti ti-alert-circle" style={{ marginRight: "6px" }} />{error}
        </div>
      )}

      {/* Feature list */}
      <div style={{
        marginTop: "20px", padding: "20px", background: "var(--bg2)",
        border: "1px solid var(--border)", borderRadius: "12px",
      }}>
        <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
          <i className="ti ti-sparkles" style={{ color: "var(--text2)" }} /> What you'll get
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          {[
            "Overall 0–100 ATS score",
            "Section-by-section breakdown",
            "Killer formatting issue flags",
            "Top 5 specific improvements",
            "Missing high-impact keywords",
            "Recruiter verdict",
          ].map(f => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "13px", color: "var(--text2)" }}>
              <i className="ti ti-check" style={{ color: "var(--green)", fontSize: "15px" }} />{f}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
