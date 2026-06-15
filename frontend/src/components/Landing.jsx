import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Logo from "./Logo";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const features = [
  {
    icon: "ti-chart-bar",
    title: "AI score engine",
    desc: "0–100 ATS score with a weighted breakdown across five key resume sections — updated weekly.",
    tag: "Core",
    tagColor: "#f0f0f0",
    tagText: "#888",
  },
  {
    icon: "ti-shield-check",
    title: "ATS compatibility check",
    desc: "Flags tables, images, and header formats that cause Greenhouse, Lever, and Workday to silently reject resumes.",
    tag: "Critical",
    tagColor: "#fff0f0",
    tagText: "#c0392b",
  },
  {
    icon: "ti-target",
    title: "Job-match keywords",
    desc: "Paste any job description. We extract required skills and surface exactly which ones are missing from your resume.",
    tag: "New",
    tagColor: "#eef0ff",
    tagText: "#4f46e5",
  },
  {
    icon: "ti-bulb",
    title: "Top 5 improvements",
    desc: "Specific, ranked, actionable fixes tied to your actual resume content — not generic advice.",
    tag: "Popular",
    tagColor: "#f0fff4",
    tagText: "#15803d",
  },
  {
    icon: "ti-files",
    title: "PDF & DOCX support",
    desc: "Upload either format with no conversion needed. Content is extracted and parsed instantly.",
    tag: "Core",
    tagColor: "#f0f0f0",
    tagText: "#888",
  },
  {
    icon: "ti-history",
    title: "Version history",
    desc: "Track your ATS score across every draft and see exactly how each edit moved the needle.",
    tag: "Pro",
    tagColor: "#fdf4ff",
    tagText: "#7e22ce",
  },
];

const steps = [
  {
    num: "01",
    title: "Upload your resume",
    desc: "Drop in a PDF or DOCX. We extract and parse text, structure, and metadata instantly.",
    detail: "Supports files up to 10 MB",
  },
  {
    num: "02",
    title: "AI analyzes it",
    desc: "Our engine checks ATS rules, keyword density, formatting, and section quality against thousands of job templates.",
    detail: "Results in under 15 seconds",
  },
  {
    num: "03",
    title: "Get your action plan",
    desc: "See your full score, missing keywords, formatting issues, and the 5 fixes that will move the needle most.",
    detail: "Export full report as PDF",
  },
];

const testimonials = [
  {
    quote:
      "I applied to 40 jobs with zero callbacks. Fixed the 3 issues ResumeLens flagged — got 4 interviews in two weeks.",
    name: "Aditya K.",
    role: "Software Engineer",
    company: "Now at Google",
    initials: "AK",
    bg: "#dbeafe",
    color: "#1d4ed8",
  },
  {
    quote:
      "The keyword matching is insane. I had no idea I was missing React and TypeScript when I literally know both.",
    name: "Sara R.",
    role: "Frontend Developer",
    company: "Now at Stripe",
    initials: "SR",
    bg: "#ede9fe",
    color: "#6d28d9",
  },
  {
    quote:
      "Went from a 54 to 91 in two edits. The ATS formatting check caught things I'd never have spotted on my own.",
    name: "Marcus J.",
    role: "Product Manager",
    company: "Now at Airbnb",
    initials: "MJ",
    bg: "#d1fae5",
    color: "#065f46",
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    desc: "Perfect for trying it out.",
    cta: "Get started free",
    ctaStyle: "outline",
    features: [
      { label: "3 resume scans / month", ok: true },
      { label: "Overall ATS score", ok: true },
      { label: "Top 3 improvements", ok: true },
      { label: "Job-description matching", ok: false },
      { label: "Version history", ok: false },
    ],
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    desc: "For active job seekers who need every edge.",
    cta: "Start Pro — $12/mo",
    ctaStyle: "primary",
    popular: true,
    features: [
      { label: "Unlimited scans", ok: true },
      { label: "Full section breakdown", ok: true },
      { label: "All improvements", ok: true },
      { label: "Job-description matching", ok: true },
      { label: "Version history", ok: true },
    ],
  },
  {
    name: "Teams",
    price: "$49",
    period: "/month",
    desc: "For career coaches and recruiting teams.",
    cta: "Contact sales",
    ctaStyle: "outline",
    features: [
      { label: "Everything in Pro", ok: true },
      { label: "Up to 25 seats", ok: true },
      { label: "Admin dashboard", ok: true },
      { label: "CSV export & API", ok: true },
      { label: "Priority support", ok: true },
    ],
  },
];

const logos = ["Google", "Microsoft", "Stripe", "Airbnb", "Figma", "Notion"];

const sectionBars = [
  { label: "Technical Skills", pct: 88, color: "#22c55e" },
  { label: "Work Experience", pct: 74, color: "#6366f1" },
  { label: "Education", pct: 90, color: "#22c55e" },
  { label: "Formatting", pct: 65, color: "#f59e0b" },
  { label: "Keywords", pct: 79, color: "#6366f1" },
];

const issues = [
  {
    icon: "ti-alert-triangle",
    iconBg: "#fff0f0",
    iconColor: "#e53e3e",
    title: "Add quantified metrics",
    desc: "3 bullet points lack numbers — measurable results increase callback rate by 40%.",
    tag: "High impact",
    tagBg: "#fff0f0",
    tagColor: "#c53030",
  },
  {
    icon: "ti-key",
    iconBg: "#fffbeb",
    iconColor: "#d97706",
    title: "5 missing job keywords",
    desc: "React, TypeScript, CI/CD, Agile, REST APIs — all absent from your resume.",
    tag: "Medium impact",
    tagBg: "#fffbeb",
    tagColor: "#b45309",
  },
  {
    icon: "ti-layout",
    iconBg: "#eff6ff",
    iconColor: "#3b82f6",
    title: "Header may confuse ATS",
    desc: "Contact section uses a table layout — replace with plain text for 100% parse rate.",
    tag: "Easy fix",
    tagBg: "#eff6ff",
    tagColor: "#1d4ed8",
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <div
      style={{
        fontFamily: "'Inter', -apple-system, sans-serif",
        background: "#ffffff",
        color: "#111",
      }}
    >
      {/* ─── NAV ─── */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 48px",
          height: "56px",
          borderBottom: "1px solid #f0f0f0",
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          <Logo size={26} />
          <div style={{ display: "flex", gap: "4px" }}>
            {["Product", "Pricing", "Blog", "Docs"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                style={{
                  fontSize: "13px",
                  color: "#666",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "color .15s, background .15s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#111";
                  e.target.style.background = "#f5f5f5";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#666";
                  e.target.style.background = "transparent";
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              fontSize: "11px",
              color: "#666",
              border: "1px solid #e8e8e8",
              borderRadius: "20px",
              padding: "4px 12px",
              fontWeight: 500,
            }}
          >
            ✦ Job-match keywords — new
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/login")}
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#555",
              padding: "7px 16px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Sign in
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/login?mode=signup")}
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#fff",
              background: "#111",
              padding: "7px 18px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Get started free
          </motion.button>
        </div>
      </motion.nav>

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        style={{
          display: "grid",
          gridTemplateColumns: "1.05fr 1fr",
          minHeight: "calc(100vh - 56px)",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        {/* Left */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          style={{
            y: heroY,
            padding: "64px 48px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20px",
            borderRight: "1px solid #f0f0f0",
          }}
        >
          <motion.div variants={fadeUp}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                border: "1px solid #e5e5e5",
                borderRadius: "20px",
                padding: "5px 14px 5px 6px",
                marginBottom: "0",
              }}
            >
              <span
                style={{
                  background: "#111",
                  color: "#fff",
                  fontSize: "10px",
                  fontWeight: 800,
                  padding: "2px 8px",
                  borderRadius: "12px",
                  letterSpacing: "0.4px",
                }}
              >
                NEW
              </span>
              <span
                style={{ fontSize: "12px", color: "#666", fontWeight: 500 }}
              >
                Job-description keyword matching is live
              </span>
              <span style={{ fontSize: "12px", color: "#aaa" }}>→</span>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: "clamp(40px, 5vw, 58px)",
              lineHeight: 1.1,
              fontWeight: 800,
              letterSpacing: "-1.5px",
              color: "#0a0a0a",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Your resume
            <br />
            gets{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              rejected
            </span>
            <br />
            before anyone
            <br />
            reads it.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "15px",
              color: "#6b7280",
              lineHeight: 1.8,
              maxWidth: "420px",
            }}
          >
            ResumeLens scores your resume against real ATS systems, gives you a
            section-by-section breakdown, and shows you exactly what to fix — in
            under 60 seconds.
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{ display: "flex", gap: "10px", alignItems: "center" }}
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/login?mode=signup")}
              style={{
                background: "#111",
                color: "#fff",
                padding: "13px 24px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Analyze my resume <i className="ti ti-arrow-right" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: "none",
                color: "#555",
                padding: "13px 20px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: 600,
                border: "1px solid #e5e5e5",
                cursor: "pointer",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <i className="ti ti-player-play" style={{ fontSize: "13px" }} />{" "}
              Watch demo
            </motion.button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            style={{ display: "flex", alignItems: "center", gap: "12px" }}
          >
            <div style={{ display: "flex" }}>
              {[
                { i: "AK", bg: "#dbeafe", c: "#1d4ed8" },
                { i: "SR", bg: "#ede9fe", c: "#6d28d9" },
                { i: "MJ", bg: "#d1fae5", c: "#065f46" },
                { i: "PL", bg: "#fce7f3", c: "#9d174d" },
              ].map((av, idx) => (
                <div
                  key={idx}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: av.bg,
                    color: av.c,
                    border: "2px solid #fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "9px",
                    fontWeight: 800,
                    marginLeft: idx === 0 ? 0 : "-8px",
                    zIndex: 4 - idx,
                    position: "relative",
                  }}
                >
                  {av.i}
                </div>
              ))}
            </div>
            <span style={{ fontSize: "12px", color: "#9ca3af" }}>
              Trusted by{" "}
              <strong style={{ color: "#555", fontWeight: 700 }}>
                50,000+
              </strong>{" "}
              job seekers this month
            </span>
          </motion.div>
        </motion.div>

        {/* Right — dashboard panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "#fafafa",
            padding: "36px 32px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            overflowY: "auto",
          }}
        >
          {/* Score header */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #ebebeb",
              borderRadius: "14px",
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "16px",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              {/* Ring */}
              <div
                style={{ position: "relative", width: "80px", height: "80px" }}
              >
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    fill="none"
                    stroke="#f0f0f0"
                    strokeWidth="6"
                  />
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="34"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="6"
                    strokeDasharray="213.6"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: 213.6 }}
                    animate={{ strokeDashoffset: 213.6 * 0.18 }}
                    transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
                    transform="rotate(-90 40 40)"
                  />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "22px",
                      fontWeight: 800,
                      color: "#111",
                      lineHeight: 1,
                    }}
                  >
                    82
                  </span>
                  <span
                    style={{ fontSize: "9px", color: "#aaa", fontWeight: 600 }}
                  >
                    /100
                  </span>
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    background: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    borderRadius: "6px",
                    padding: "4px 10px",
                    width: "fit-content",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#22c55e",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#15803d",
                    }}
                  >
                    Above Average
                  </span>
                </div>
                <span style={{ fontSize: "12px", color: "#888" }}>
                  ATS compatibility score
                </span>
                <span
                  style={{ fontSize: "12px", color: "#555", fontWeight: 600 }}
                >
                  Beats 73% of resumes
                </span>
              </div>
            </div>

            {/* Bars */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#aaa",
                  letterSpacing: "0.6px",
                  textTransform: "uppercase",
                  marginBottom: "2px",
                }}
              >
                Section breakdown
              </div>
              {sectionBars.map((bar, i) => (
                <div
                  key={bar.label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "100px 1fr 30px",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#777" }}>
                    {bar.label}
                  </span>
                  <div
                    style={{
                      background: "#f5f5f5",
                      borderRadius: "4px",
                      height: "6px",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${bar.pct}%` }}
                      transition={{
                        duration: 1,
                        delay: 0.7 + i * 0.1,
                        ease: "easeOut",
                      }}
                      style={{
                        height: "100%",
                        background: bar.color,
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: bar.pct < 70 ? "#f59e0b" : "#555",
                      textAlign: "right",
                    }}
                  >
                    {bar.pct}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Issues */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #ebebeb",
              borderRadius: "14px",
              padding: "20px",
            }}
          >
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "#aaa",
                letterSpacing: "0.6px",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              Top 3 improvements
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {issues.map((issue, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.15, duration: 0.4 }}
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "8px",
                      background: issue.iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "1px",
                    }}
                  >
                    <i
                      className={`ti ${issue.icon}`}
                      style={{ fontSize: "14px", color: issue.iconColor }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#111",
                        marginBottom: "2px",
                      }}
                    >
                      {issue.title}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#888",
                        lineHeight: 1.6,
                      }}
                    >
                      {issue.desc}
                    </div>
                    <div
                      style={{
                        display: "inline-block",
                        marginTop: "5px",
                        fontSize: "10px",
                        fontWeight: 700,
                        color: issue.tagColor,
                        background: issue.tagBg,
                        padding: "2px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {issue.tag}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── LOGO STRIP ─── */}
      <div
        style={{
          borderBottom: "1px solid #f0f0f0",
          padding: "16px 48px",
          display: "flex",
          alignItems: "center",
          gap: "0",
          background: "#fafafa",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            color: "#ccc",
            fontWeight: 600,
            marginRight: "28px",
            whiteSpace: "nowrap",
            letterSpacing: "0.4px",
          }}
        >
          TRUSTED BY JOB SEEKERS GOING TO
        </span>
        <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
          {logos.map((l) => (
            <span
              key={l}
              style={{
                fontSize: "12px",
                fontWeight: 800,
                color: "#d1d5db",
                letterSpacing: "-0.3px",
              }}
            >
              {l.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* ─── FEATURES ─── */}
      <section
        id="features"
        style={{ padding: "80px 48px", borderBottom: "1px solid #f0f0f0" }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} style={{ marginBottom: "48px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#6366f1",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              Features
            </div>
            <h2
              style={{
                fontSize: "36px",
                fontWeight: 800,
                letterSpacing: "-0.8px",
                color: "#0a0a0a",
                marginBottom: "10px",
                fontFamily: "inherit",
              }}
            >
              Everything your resume needs to win
            </h2>
            <p
              style={{ fontSize: "15px", color: "#9ca3af", maxWidth: "480px" }}
            >
              Six powerful checks. One upload. Real results that get you in
              front of a human.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
            }}
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 32px rgba(0,0,0,0.07)",
                }}
                transition={{ duration: 0.2 }}
                style={{
                  background: "#fff",
                  border: "1px solid #ebebeb",
                  borderRadius: "14px",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "#f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className={`ti ${f.icon}`}
                      style={{ fontSize: "18px", color: "#555" }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: f.tagText,
                      background: f.tagColor,
                      padding: "3px 9px",
                      borderRadius: "5px",
                    }}
                  >
                    {f.tag}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#111",
                    marginBottom: "8px",
                  }}
                >
                  {f.title}
                </div>
                <div
                  style={{
                    fontSize: "12.5px",
                    color: "#9ca3af",
                    lineHeight: 1.7,
                  }}
                >
                  {f.desc}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section
        id="how-it-works"
        style={{
          padding: "80px 48px",
          background: "#fafafa",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} style={{ marginBottom: "52px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#6366f1",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              How it works
            </div>
            <h2
              style={{
                fontSize: "36px",
                fontWeight: 800,
                letterSpacing: "-0.8px",
                color: "#0a0a0a",
                fontFamily: "inherit",
              }}
            >
              From upload to action plan
              <br />
              in 60 seconds
            </h2>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0",
              position: "relative",
            }}
          >
            {/* connector lines */}
            <div
              style={{
                position: "absolute",
                top: "22px",
                left: "calc(33.33% + 8px)",
                width: "calc(33.33% - 16px)",
                height: "1px",
                background: "#e5e7eb",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "22px",
                left: "calc(66.66% + 8px)",
                width: "calc(33.33% - 56px)",
                height: "1px",
                background: "#e5e7eb",
              }}
            />

            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                variants={fadeUp}
                style={{ padding: "0 32px 0 0", position: "relative" }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "11px",
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: 800,
                    color: "#111",
                    marginBottom: "20px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#111",
                    marginBottom: "8px",
                  }}
                >
                  {s.title}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#9ca3af",
                    lineHeight: 1.7,
                    marginBottom: "10px",
                  }}
                >
                  {s.desc}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#c4c4c4",
                    fontStyle: "italic",
                  }}
                >
                  {s.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section
        style={{ padding: "80px 48px", borderBottom: "1px solid #f0f0f0" }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} style={{ marginBottom: "48px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#6366f1",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              Testimonials
            </div>
            <h2
              style={{
                fontSize: "36px",
                fontWeight: 800,
                letterSpacing: "-0.8px",
                color: "#0a0a0a",
                fontFamily: "inherit",
              }}
            >
              Loved by job seekers
            </h2>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
            }}
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 32px rgba(0,0,0,0.07)",
                }}
                transition={{ duration: 0.2 }}
                style={{
                  background: "#fff",
                  border: "1px solid #ebebeb",
                  borderRadius: "14px",
                  padding: "24px",
                }}
              >
                <div
                  style={{ display: "flex", gap: "2px", marginBottom: "14px" }}
                >
                  {Array(5)
                    .fill(0)
                    .map((_, si) => (
                      <div
                        key={si}
                        style={{
                          width: "12px",
                          height: "12px",
                          background: "#f59e0b",
                          borderRadius: "3px",
                        }}
                      />
                    ))}
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#555",
                    lineHeight: 1.75,
                    fontStyle: "italic",
                    marginBottom: "18px",
                  }}
                >
                  "{t.quote}"
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    paddingTop: "14px",
                    borderTop: "1px solid #f5f5f5",
                  }}
                >
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      background: t.bg,
                      color: t.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 800,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#111",
                      }}
                    >
                      {t.name}
                    </div>
                    <div style={{ fontSize: "11px", color: "#9ca3af" }}>
                      {t.role}
                    </div>
                    <div
                      style={{
                        fontSize: "10.5px",
                        color: "#22c55e",
                        fontWeight: 600,
                        marginTop: "1px",
                      }}
                    >
                      {t.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── PRICING ─── */}
      <section
        id="pricing"
        style={{
          padding: "80px 48px",
          background: "#fafafa",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} style={{ marginBottom: "48px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#6366f1",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              Pricing
            </div>
            <h2
              style={{
                fontSize: "36px",
                fontWeight: 800,
                letterSpacing: "-0.8px",
                color: "#0a0a0a",
                fontFamily: "inherit",
              }}
            >
              Simple, transparent pricing
            </h2>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
            }}
          >
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                whileHover={{
                  y: plan.popular ? -6 : -3,
                  boxShadow: plan.popular
                    ? "0 20px 48px rgba(99,102,241,0.12)"
                    : "0 8px 24px rgba(0,0,0,0.06)",
                }}
                transition={{ duration: 0.2 }}
                style={{
                  background: "#fff",
                  border: plan.popular
                    ? "2px solid #6366f1"
                    : "1px solid #ebebeb",
                  borderRadius: "14px",
                  padding: "28px",
                  position: "relative",
                }}
              >
                {plan.popular && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-12px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#6366f1",
                      color: "#fff",
                      fontSize: "10px",
                      fontWeight: 800,
                      padding: "3px 14px",
                      borderRadius: "12px",
                      letterSpacing: "0.4px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ✦ Most popular
                  </div>
                )}
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#aaa",
                    textTransform: "uppercase",
                    letterSpacing: "0.6px",
                    marginBottom: "10px",
                  }}
                >
                  {plan.name}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "3px",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{ fontSize: "14px", color: "#aaa", fontWeight: 700 }}
                  >
                    $
                  </span>
                  <span
                    style={{
                      fontSize: "36px",
                      fontWeight: 800,
                      color: "#111",
                      lineHeight: 1,
                      letterSpacing: "-1px",
                    }}
                  >
                    {plan.price.replace("$", "")}
                  </span>
                  <span style={{ fontSize: "13px", color: "#aaa" }}>
                    {plan.period}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#9ca3af",
                    marginBottom: "20px",
                    minHeight: "32px",
                  }}
                >
                  {plan.desc}
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    navigate(
                      plan.ctaStyle === "primary"
                        ? "/login?mode=signup"
                        : "/contact"
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "11px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    marginBottom: "20px",
                    background:
                      plan.ctaStyle === "primary" ? "#111" : "transparent",
                    color: plan.ctaStyle === "primary" ? "#fff" : "#555",
                    border:
                      plan.ctaStyle === "primary"
                        ? "none"
                        : "1px solid #e5e5e5",
                  }}
                >
                  {plan.cta}
                </motion.button>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {plan.features.map((f) => (
                    <div
                      key={f.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          flexShrink: 0,
                          background: f.ok ? "#f0fdf4" : "#f9f9f9",
                          border: `1px solid ${f.ok ? "#bbf7d0" : "#e5e5e5"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <i
                          className="ti ti-check"
                          style={{
                            fontSize: "9px",
                            color: f.ok ? "#22c55e" : "#d1d5db",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: "12.5px",
                          color: f.ok ? "#555" : "#d1d5db",
                        }}
                      >
                        {f.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── CTA ─── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        style={{
          padding: "80px 48px",
          textAlign: "center",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            border: "1px solid #ebebeb",
            borderRadius: "20px",
            padding: "60px 48px",
            background: "#fafafa",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "#eef0ff",
              color: "#6366f1",
              fontSize: "11px",
              fontWeight: 700,
              padding: "5px 14px",
              borderRadius: "20px",
              marginBottom: "20px",
              letterSpacing: "0.4px",
            }}
          >
            Free to try · No credit card required
          </div>
          <h2
            style={{
              fontSize: "38px",
              fontWeight: 800,
              letterSpacing: "-1px",
              color: "#0a0a0a",
              marginBottom: "12px",
              fontFamily: "inherit",
            }}
          >
            Ready to see what
            <br />
            recruiters actually see?
          </h2>
          <p
            style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "28px" }}
          >
            Upload once. Get your score, your gaps, and your action plan — all
            in under 60 seconds.
          </p>
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/login?mode=signup")}
            style={{
              background: "#111",
              color: "#fff",
              padding: "14px 30px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Analyze my resume free <i className="ti ti-arrow-right" />
          </motion.button>
        </div>
      </motion.section>

      {/* ─── FOOTER ─── */}
      <footer
        style={{
          padding: "28px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#fafafa",
        }}
      >
        <Logo size={22} />
        <div style={{ display: "flex", gap: "24px" }}>
          {["Privacy", "Terms", "Blog", "Docs", "Status"].map((l) => (
            <a
              key={l}
              href="#"
              style={{
                fontSize: "12px",
                color: "#aaa",
                textDecoration: "none",
              }}
            >
              {l}
            </a>
          ))}
        </div>
        {/* <span style={{ fontSize: "12px", color: "#ccc" }}>© 2026 ResumeLens, Inc.</span> */}
        <span style={{ fontSize: "12px", color: "#ccc" }}>
          Made with ❤️ by Lovish Aul
        </span>
      </footer>
    </div>
  );
}
