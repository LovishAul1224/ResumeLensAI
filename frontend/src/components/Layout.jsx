import Logo from "./Logo";

export default function Layout({ children, page, onNav, user, hasResult }) {
  const navItems = [
    { id: "upload", icon: "ti-upload", label: "Analyze" },
    ...(hasResult ? [{ id: "dashboard", icon: "ti-chart-bar", label: "Results" }] : []),
    { id: "history", icon: "ti-clock", label: "History" },
    { id: "settings", icon: "ti-settings", label: "Settings" },
  ];

  const initials = user?.name
    ? user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : "??";

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <nav style={{
        width: "220px", background: "var(--bg2)",
        borderRight: "1px solid var(--border)",
        display: "flex", flexDirection: "column",
        padding: "20px 14px", gap: "4px", flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", padding: "8px 10px 20px" }}>
          <Logo size={26} textColor="#f0eff8" />
        </div>

        {/* Nav */}
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNav(item.id)}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "8px 10px", borderRadius: "8px",
              background: page === item.id ? "var(--purple4)" : "transparent",
              color: page === item.id ? "var(--purple2)" : "var(--text2)",
              border: "none", cursor: "pointer", fontSize: "13px",
              fontWeight: page === item.id ? 500 : 400,
              width: "100%", textAlign: "left", transition: "all .15s",
            }}
          >
            <i className={`ti ${item.icon}`} style={{ fontSize: "16px", width: "18px" }} />
            {item.label}
          </button>
        ))}

        <div style={{ flex: 1 }} />

        {/* User */}
        <div
          onClick={() => onNav("settings")}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "10px", borderRadius: "8px",
            border: "1px solid var(--border)", cursor: "pointer",
            marginTop: "8px", transition: "background .15s",
          }}
        >
          <div style={{
            width: "28px", height: "28px", borderRadius: "50%",
            background: "linear-gradient(135deg, var(--purple), #a78bfa)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "11px", fontWeight: 600, color: "white", flexShrink: 0,
          }}>{initials}</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: "12px", fontWeight: 500, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user?.name}
            </div>
            <div style={{ fontSize: "10px", color: "var(--text3)", textTransform: "capitalize" }}>
              {user?.plan === "guest" ? "Guest" : `${user?.plan || "free"} plan`}
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main style={{ flex: 1, overflowY: "auto", maxHeight: "100vh" }}>
        {children}
      </main>
    </div>
  );
}
