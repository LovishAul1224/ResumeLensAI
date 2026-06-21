export default function Logo({ size = 32, showText = true, textColor = "#111" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <svg width={size} height={size} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lensGrad" x1="6" y1="4" x2="46" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7c6af7" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>
        {/* Document body with folded corner */}
        <path
          d="M10 8C10 5.79086 11.7909 4 14 4H34L42 12V44C42 46.2091 40.2091 48 38 48H14C11.7909 48 10 46.2091 10 44V8Z"
          stroke="url(#lensGrad)"
          strokeWidth="2.5"
          fill="rgba(124,106,247,0.06)"
          strokeLinejoin="round"
        />
        {/* Folded corner triangle */}
        <path d="M34 4L42 12H34V4Z" stroke="url(#lensGrad)" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
        {/* Network nodes */}
        <circle cx="20" cy="22" r="2.6" fill="#7c6af7" />
        <circle cx="34" cy="22" r="2.6" fill="#f472b6" />
        <circle cx="20" cy="38" r="2.6" fill="#7c6af7" />
        <circle cx="34" cy="38" r="2.6" fill="#f472b6" />
        <circle cx="27" cy="30" r="3" fill="#c084fc" />
        {/* Connector lines */}
        <line x1="20" y1="22" x2="27" y2="30" stroke="#9a7df0" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="34" y1="22" x2="27" y2="30" stroke="#e07ec8" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="20" y1="38" x2="27" y2="30" stroke="#9a7df0" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="34" y1="38" x2="27" y2="30" stroke="#e07ec8" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      {showText && (
        <span style={{
          fontSize: `${Math.round(size * 0.5)}px`,
          fontWeight: 700,
          letterSpacing: "-0.5px",
          color: textColor,
          fontFamily: "'Inter', sans-serif",
        }}>
          Resume<span style={{
            background: "linear-gradient(135deg, #7c6af7, #f472b6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>Lens</span>
        </span>
      )}
    </div>
  );
}
