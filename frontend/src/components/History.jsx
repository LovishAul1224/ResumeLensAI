const scorePillStyle = (s) => {
  if (s >= 80) return { bg: "rgba(34,201,122,.15)", color: "#4ade80" };
  if (s >= 60) return { bg: "rgba(245,158,11,.15)", color: "#fbbf24" };
  return { bg: "rgba(240,82,82,.15)", color: "#f87171" };
};

const atsBadgeStyle = (ats) => {
  const map = {
    Excellent: { bg: "rgba(34,201,122,.12)", color: "#4ade80" },
    Good:      { bg: "rgba(34,201,122,.12)", color: "#4ade80" },
    Average:   { bg: "rgba(245,158,11,.12)", color: "#fbbf24" },
    Poor:      { bg: "rgba(240,82,82,.12)",  color: "#f87171" },
  };
  return map[ats] || map.Average;
};

export default function History({ history, onView, onClear }) {
  return (
    <div style={{ padding: "28px 32px" }}>
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 600, marginBottom: "4px" }}>Analysis history</h1>
          <p style={{ fontSize: "13px", color: "var(--text2)" }}>
            {history.length > 0 ? `Your last ${history.length} resume ${history.length === 1 ? "analysis" : "analyses"} — saved on this device` : "No analyses yet — upload a resume to get started."}
          </p>
        </div>
        {history.length > 0 && onClear && (
          <button
            onClick={() => { if (confirm("Clear all analysis history? This cannot be undone.")) onClear(); }}
            style={{
              background: "none", border: "1px solid var(--border)", color: "var(--text2)",
              padding: "7px 14px", borderRadius: "8px", fontSize: "12px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: "6px",
            }}
          >
            <i className="ti ti-trash" style={{ fontSize: "14px" }} /> Clear history
          </button>
        )}
      </div>

      <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden" }}>
        {history.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "var(--text3)", fontSize: "13px" }}>
            <i className="ti ti-history" style={{ fontSize: "32px", display: "block", marginBottom: "10px", opacity: .4 }} />
            No history yet
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr>
                {["File", "Date", "Score", "ATS", ""].map(h => (
                  <th key={h} style={{
                    padding: "10px 16px", textAlign: "left",
                    color: "var(--text3)", fontWeight: 500,
                    fontSize: "11px", textTransform: "uppercase", letterSpacing: ".5px",
                    borderBottom: "1px solid var(--border)",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {history.map((item, i) => {
                const sp = scorePillStyle(item.score);
                const ap = atsBadgeStyle(item.ats);
                return (
                  <tr key={i} style={{ borderBottom: i < history.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <td style={{ padding: "13px 16px", color: "var(--text)" }}>
                      <i className="ti ti-file-text" style={{ fontSize: "14px", marginRight: "6px", color: "var(--text3)" }} />
                      {item.name}
                    </td>
                    <td style={{ padding: "13px 16px", color: "var(--text3)" }}>{item.date}</td>
                    <td style={{ padding: "13px 16px" }}>
                      <span style={{ background: sp.bg, color: sp.color, padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 600 }}>
                        {item.score}
                      </span>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <span style={{ background: ap.bg, color: ap.color, padding: "3px 10px", borderRadius: "20px", fontSize: "11px" }}>
                        {item.ats}
                      </span>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      {item.result && (
                        <button
                          onClick={() => onView(item)}
                          style={{ background: "none", border: "none", color: "var(--text3)", cursor: "pointer", fontSize: "12px" }}
                        >
                          View →
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
