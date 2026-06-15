export default function Settings({ user, onLogout }) {
  return (
    <div style={{ padding: "28px 32px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 600, marginBottom: "4px" }}>Settings</h1>
        <p style={{ fontSize: "13px", color: "var(--text2)" }}>Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px", maxWidth: "480px", marginBottom: "16px" }}>
        <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
          <i className="ti ti-user" style={{ color: "var(--text2)" }} /> Profile
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label style={{ fontSize: "12px", color: "var(--text2)", display: "block", marginBottom: "5px" }}>Full name</label>
          <input defaultValue={user?.name || ""} style={{
            width: "100%", background: "var(--bg3)", border: "1px solid var(--border)",
            borderRadius: "8px", padding: "10px 14px", fontSize: "13px", color: "var(--text)", outline: "none",
          }} />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontSize: "12px", color: "var(--text2)", display: "block", marginBottom: "5px" }}>Email</label>
          <input defaultValue={user?.email || ""} style={{
            width: "100%", background: "var(--bg3)", border: "1px solid var(--border)",
            borderRadius: "8px", padding: "10px 14px", fontSize: "13px", color: "var(--text)", outline: "none",
          }} />
        </div>
        <button style={{
          background: "var(--purple)", border: "none", borderRadius: "8px",
          padding: "9px 20px", fontSize: "13px", fontWeight: 600, color: "white", cursor: "pointer",
        }}>
          Save changes
        </button>
      </div>

      {/* Plan */}
      <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px", maxWidth: "480px", marginBottom: "16px" }}>
        <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
          <i className="ti ti-crown" style={{ color: "var(--amber)" }} /> Plan — {user?.plan === "guest" ? "Guest" : "Free"}
        </div>
        <p style={{ fontSize: "13px", color: "var(--text2)", marginBottom: "16px", lineHeight: 1.6 }}>
          Free plan includes 3 resume analyses per month. Upgrade to Pro for unlimited analyses, priority AI processing, and PDF export.
        </p>
        <button style={{
          background: "linear-gradient(135deg, var(--purple), #a78bfa)",
          border: "none", borderRadius: "8px", padding: "9px 20px",
          fontSize: "13px", fontWeight: 600, color: "white", cursor: "pointer",
        }}>
          Upgrade to Pro
        </button>
      </div>

      {/* Sign out */}
      <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px", maxWidth: "480px" }}>
        <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
          <i className="ti ti-logout" style={{ color: "var(--text2)" }} /> Account
        </div>
        <button
          onClick={onLogout}
          style={{
            background: "none", border: "1px solid var(--border)", color: "var(--text2)",
            padding: "8px 16px", borderRadius: "8px", fontSize: "13px", cursor: "pointer",
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
