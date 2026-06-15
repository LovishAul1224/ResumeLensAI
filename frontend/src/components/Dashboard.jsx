const scoreColor = (s) => s >= 80 ? "#22c97a" : s >= 60 ? "#f59e0b" : "#f05252";

const atsBadgeStyle = (ats) => {
  const map = {
    Excellent: { bg: "rgba(34,201,122,.12)", color: "#4ade80" },
    Good:      { bg: "rgba(34,201,122,.12)", color: "#4ade80" },
    Average:   { bg: "rgba(245,158,11,.12)", color: "#fbbf24" },
    Poor:      { bg: "rgba(240,82,82,.12)",  color: "#f87171" },
  };
  return map[ats] || map.Average;
};

export default function Dashboard({ data, filename, onAnalyzeAnother }) {
  if (!data) return null;

  // Unwrap: backend returns { analysis: {...} } or just {...}
  const d = data.analysis ?? data;

  const sc = typeof d.score === "number" ? d.score : 0;
  const circ = 2 * Math.PI * 48;
  const dash = circ - (circ * sc / 100);

  // Use ONLY what the backend returned — no hardcoded fallbacks
  const sections     = Array.isArray(d.sections)     ? d.sections     : [];
  const atsIssues    = Array.isArray(d.ats_issues)   ? d.ats_issues   : [];
  const strengths    = Array.isArray(d.strengths)    ? d.strengths    : [];
  const weaknesses   = Array.isArray(d.weaknesses)   ? d.weaknesses   : [];
  const missingKws   = Array.isArray(d.missing_keywords) ? d.missing_keywords : [];
  const improvements = Array.isArray(d.improvements) ? d.improvements.slice(0, 5) : [];

  const { bg: atsBg, color: atsColor } = atsBadgeStyle(d.ats_compatibility);

  // If backend returned an error field, show it
  if (d.error) {
    return (
      <div style={{ padding: "28px 32px" }}>
        <div style={{
          padding: "20px", background: "rgba(240,82,82,.08)",
          border: "1px solid rgba(240,82,82,.2)", borderRadius: "12px",
          color: "var(--red)", fontSize: "14px",
        }}>
          <i className="ti ti-alert-circle" style={{ marginRight: "8px" }} />
          Backend error: {d.error}
        </div>
        <button onClick={onAnalyzeAnother} style={{
          marginTop: "16px", background: "var(--purple)", border: "none",
          borderRadius: "8px", padding: "9px 18px", fontSize: "13px",
          fontWeight: 600, color: "white", cursor: "pointer",
        }}>← Try another resume</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "28px 32px" }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: "24px", padding: "16px 20px",
        background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "12px",
      }}>
        <div>
          <div style={{ fontSize: "14px", fontWeight: 500 }}>
            <i className="ti ti-file-text" style={{ fontSize: "15px", marginRight: "6px", color: "var(--text2)" }} />
            {filename || "resume.pdf"}
          </div>
          <div style={{ fontSize: "12px", color: "var(--text2)", marginTop: "2px" }}>
            Analyzed just now · Gemini AI
          </div>
        </div>
        <button onClick={onAnalyzeAnother} style={{
          display: "flex", alignItems: "center", gap: "6px",
          background: "var(--purple)", border: "none", color: "white",
          padding: "9px 18px", borderRadius: "8px", fontSize: "13px",
          fontWeight: 600, cursor: "pointer",
        }}>
          <i className="ti ti-upload" style={{ fontSize: "14px" }} /> Analyze another
        </button>
      </div>

      {/* Score + Breakdown */}
      <div style={{
        display: "grid", gridTemplateColumns: "200px 1fr", gap: "20px",
        background: "var(--bg2)", border: "1px solid var(--border)",
        borderRadius: "12px", padding: "24px", marginBottom: "16px",
      }}>
        {/* Score circle */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <div style={{ position: "relative", width: "120px", height: "120px" }}>
            <svg width="120" height="120" viewBox="0 0 120 120"
              style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}>
              <circle cx="60" cy="60" r="48" fill="none" stroke="var(--bg4)" strokeWidth="8" />
              <circle cx="60" cy="60" r="48" fill="none" stroke={scoreColor(sc)} strokeWidth="8"
                strokeDasharray={circ} strokeDashoffset={dash} strokeLinecap="round" />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "32px", fontWeight: 700, color: scoreColor(sc), lineHeight: 1 }}>{sc}</span>
              <span style={{ fontSize: "12px", color: "var(--text3)" }}>/100</span>
            </div>
          </div>
          <span style={{ fontSize: "12px", color: "var(--text2)", fontWeight: 500 }}>Overall ATS score</span>
          {d.ats_compatibility && (
            <span style={{ background: atsBg, color: atsColor, fontSize: "11px", padding: "3px 10px", borderRadius: "20px", fontWeight: 600 }}>
              {d.ats_compatibility} ATS fit
            </span>
          )}
        </div>

        {/* Section breakdown */}
        <div>
          <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
            <i className="ti ti-layout-list" style={{ color: "var(--text2)" }} /> Section breakdown
          </div>
          {sections.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {sections.map(s => (
                <div key={s.name} style={{ display: "grid", gridTemplateColumns: "130px 1fr 36px", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "12px", color: "var(--text2)" }}>{s.name}</span>
                  <div style={{ background: "var(--bg4)", borderRadius: "4px", height: "6px", overflow: "hidden" }}>
                    <div style={{
                      height: "100%", background: s.color || "var(--purple)",
                      borderRadius: "4px", width: `${s.pct}%`, transition: "width .8s ease",
                    }} />
                  </div>
                  <span style={{ fontSize: "12px", color: "var(--text2)", textAlign: "right" }}>{s.pct}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: "13px", color: "var(--text3)" }}>No section data returned.</p>
          )}
        </div>
      </div>

      {/* Recruiter Verdict */}
      {d.recruiter_verdict && (
        <div style={{
          background: "linear-gradient(135deg, var(--purple4), rgba(30,26,64,.5))",
          border: "1px solid rgba(124,106,247,.25)", borderRadius: "12px",
          padding: "20px", marginBottom: "16px",
        }}>
          <div style={{ fontSize: "11px", color: "var(--purple2)", textTransform: "uppercase", letterSpacing: ".7px", marginBottom: "8px" }}>
            <i className="ti ti-user-check" style={{ fontSize: "12px", marginRight: "4px" }} />Recruiter verdict
          </div>
          <p style={{ fontSize: "14px", color: "var(--text)", lineHeight: 1.65, margin: 0 }}>{d.recruiter_verdict}</p>
        </div>
      )}

      {/* ATS Checks */}
      {atsIssues.length > 0 && (
        <Card title="ATS compatibility check" icon="ti-shield-check" style={{ marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {atsIssues.map((item, i) => (
              <div key={i} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "8px", padding: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 500, marginBottom: "5px" }}>
                  <span style={{
                    width: "7px", height: "7px", borderRadius: "50%", flexShrink: 0,
                    background: item.status === "pass" ? "var(--green)" : item.status === "fail" ? "var(--red)" : "var(--amber)",
                  }} />
                  {item.label}
                </div>
                <p style={{ fontSize: "12px", color: "var(--text2)", lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Keywords */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        <Card title="Strong keywords" icon="ti-check" iconColor="var(--green)">
          <TagList items={strengths} color="green" />
        </Card>
        <Card title="Missing keywords" icon="ti-plus" iconColor="var(--amber)">
          <TagList items={missingKws} color="amber" />
        </Card>
      </div>

      {/* Top 5 tips */}
      {improvements.length > 0 && (
        <Card title="Top 5 improvements" icon="ti-bulb" style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {improvements.map((tip, i) => {
              const title = typeof tip === "string" ? tip : tip.title;
              const desc  = typeof tip === "string" ? "" : tip.desc;
              return (
                <div key={i} style={{ display: "flex", gap: "12px", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "8px", padding: "14px" }}>
                  <div style={{
                    width: "24px", height: "24px", borderRadius: "50%",
                    background: "var(--purple4)", color: "var(--purple2)",
                    fontSize: "12px", fontWeight: 600,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 500, marginBottom: desc ? "3px" : 0 }}>{title}</div>
                    {desc && <p style={{ fontSize: "12px", color: "var(--text2)", lineHeight: 1.5, margin: 0 }}>{desc}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Weaknesses */}
      {weaknesses.length > 0 && (
        <Card title="Gaps to address" icon="ti-alert-triangle" iconColor="var(--red)" style={{ marginBottom: "32px" }}>
          <TagList items={weaknesses} color="red" />
        </Card>
      )}
    </div>
  );
}

function Card({ title, icon, iconColor, children, style }) {
  return (
    <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px", ...style }}>
      <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
        <i className={`ti ${icon}`} style={{ color: iconColor || "var(--text2)", fontSize: "15px" }} />
        {title}
      </div>
      {children}
    </div>
  );
}

function TagList({ items = [], color }) {
  const styles = {
    green:  { bg: "rgba(34,201,122,.1)",  color: "#4ade80", border: "rgba(34,201,122,.2)" },
    red:    { bg: "rgba(240,82,82,.12)",   color: "#f87171", border: "rgba(240,82,82,.2)" },
    amber:  { bg: "rgba(245,158,11,.1)",   color: "#fbbf24", border: "rgba(245,158,11,.2)" },
    purple: { bg: "rgba(124,106,247,.12)", color: "#a394ff", border: "rgba(124,106,247,.2)" },
  };
  const s = styles[color] || styles.purple;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
      {items.length > 0
        ? items.map((item, i) => (
            <span key={i} style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "20px", fontWeight: 500, background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
              {item}
            </span>
          ))
        : <span style={{ fontSize: "13px", color: "var(--text3)" }}>None found</span>
      }
    </div>
  );
}
