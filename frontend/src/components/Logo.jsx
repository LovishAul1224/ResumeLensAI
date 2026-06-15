export default function Logo({
  size = 32,
  showText = true,
  textColor = "#111",
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        filter: "drop-shadow(0 4px 12px rgba(124,106,247,0.25))",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="lensGrad"
            x1="0"
            y1="0"
            x2="52"
            y2="52"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="35%" stopColor="#8b5cf6" />
            <stop offset="70%" stopColor="#d946ef" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>

        {/* Document */}
        <path
          d="M10 8C10 5.79086 11.7909 4 14 4H34L42 12V44C42 46.2091 40.2091 48 38 48H14C11.7909 48 10 46.2091 10 44V8Z"
          stroke="url(#lensGrad)"
          strokeWidth="2.5"
          fill="rgba(124,106,247,0.06)"
          strokeLinejoin="round"
        />

        {/* Folded Corner */}
        <path
          d="M34 4L42 12H34V4Z"
          stroke="url(#lensGrad)"
          strokeWidth="2.5"
          fill="none"
          strokeLinejoin="round"
        />

        {/* Resume Lines */}
        <line
          x1="16"
          y1="18"
          x2="32"
          y2="18"
          stroke="#9ca3af"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        <line
          x1="16"
          y1="22"
          x2="28"
          y2="22"
          stroke="#9ca3af"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* Scan Line */}
        <rect
          x="14"
          y="27"
          width="22"
          height="2"
          rx="1"
          fill="#ffffff"
          opacity="0.9"
        />

        {/* Magnifying Lens */}
        <circle
          cx="29"
          cy="33"
          r="6"
          stroke="url(#lensGrad)"
          strokeWidth="2.2"
          fill="rgba(255,255,255,0.12)"
        />

        {/* Lens Handle */}
        <line
          x1="33.5"
          y1="37.5"
          x2="39"
          y2="43"
          stroke="url(#lensGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>

      {showText && (
        <span
          style={{
            fontSize: `${Math.round(size * 0.52)}px`,
            fontWeight: 800,
            letterSpacing: "-1px",
            color: textColor,
            fontFamily: "'Inter', sans-serif",
            display: "flex",
            alignItems: "center",
          }}
        >
          Resume
          <span
            style={{
              background:
                "linear-gradient(135deg,#6366f1,#8b5cf6,#d946ef,#f472b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Lens
          </span>

          <span
            style={{
              marginLeft: "6px",
              fontSize: `${Math.max(9, Math.round(size * 0.22))}px`,
              fontWeight: 700,
              padding: "2px 6px",
              borderRadius: "999px",
              background: "rgba(124,106,247,0.12)",
              color: "#7c6af7",
              letterSpacing: "0.5px",
            }}
          >
            AI
          </span>
        </span>
      )}
    </div>
  );
}