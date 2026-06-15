import { useState } from "react";
import { motion } from "framer-motion";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import Logo from "./Logo";


const provider = new GoogleAuthProvider();

const tips = [
  {
    headline: "See your resume\nthrough their\neyes.",
    sub: "75% of resumes never reach a human. ResumeLens shows you exactly what the ATS sees — and how to fix it.",
  },
  {
    headline: "One score.\nFive sections.\nZero guesswork.",
    sub: "Get a 0-100 ATS score with a breakdown across experience, skills, education, projects, and formatting.",
  },
  {
    headline: "Find the gaps\nbefore recruiters\ndo.",
    sub: "Missing keywords, weak bullet points, and formatting issues — flagged instantly by AI.",
  },
];

const friendlyError = (code) => {
  switch (code) {
    case "auth/user-not-found":
      return "No account found. Sign up first!";
    case "auth/wrong-password":
      return "Incorrect password. Try again!";
    case "auth/email-already-in-use":
      return "Email already registered. Sign in instead!";
    case "auth/weak-password":
      return "Password needs at least 6 characters.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/popup-closed-by-user":
      return "Google sign-in was cancelled.";
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    default:
      return "Something went wrong. Please try again!";
  }
};

export default function Auth({ page, onPageChange }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isSignup = page === "signup";

  const tip = tips[isSignup ? 1 : 0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isSignup) {
        const cred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(cred.user, { displayName: name });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "grid",
        gridTemplateColumns: "0.95fr 1.05fr",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* LEFT — gradient panel */}
      <motion.div
  initial={{ opacity: 0, x: -24 }}
  animate={{
    opacity: 1,
    x: 0,
    backgroundPosition: [
      "0% 50%",
      "100% 50%",
      "0% 50%",
    ],
  }}
  transition={{
    opacity: { duration: 0.6 },
    x: { duration: 0.6 },
    backgroundPosition: {
      duration: 15,
      repeat: Infinity,
      ease: "linear",
    },
  }}
  style={{
    position: "relative",
    overflow: "hidden",
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    background: `
      radial-gradient(circle at 20% 20%, #ffb4f8 0%, transparent 35%),
      radial-gradient(circle at 80% 20%, #7c3aed 0%, transparent 40%),
      radial-gradient(circle at 60% 80%, #c084fc 0%, transparent 40%),
      linear-gradient(135deg, #f9a8d4 0%, #d946ef 40%, #7c3aed 100%)
    `,

    backgroundSize: "200% 200%",
  }}
>
        {/* subtle diagonal lines overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "repeating-linear-gradient(115deg, transparent 0 40px, rgba(255,255,255,0.025) 40px 42px)",
          }}
        />

        {/* Tag row */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            zIndex: 1,
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "2.5px",
            }}
          >
            A SMART TIP
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,255,255,0.22)",
              maxWidth: "160px",
            }}
          />
        </motion.div>

        {/* Bottom content */}
        <motion.div
          key={tip.headline}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          style={{ zIndex: 1 }}
        >
          <div
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              color: "#fff",
              fontSize: "44px",
              lineHeight: 1.15,
              marginBottom: "18px",
              whiteSpace: "pre-line",
            }}
          >
            {tip.headline}
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "14px",
              lineHeight: 1.7,
              maxWidth: "360px",
            }}
          >
            {tip.sub}
          </div>
        </motion.div>
      </motion.div>

      {/* RIGHT — form */}
      {/* RIGHT — form */}
      <div
        style={{
          background: "#f5f5f5", // or "#fff"
          padding: "32px 56px",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "48px",
          }}
        >
          <Logo size={30} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          style={{
            maxWidth: "380px",
            margin: "0 auto",
            width: "100%",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "38px",
              color: "#111",
              marginBottom: "8px",
              fontWeight: 400,
            }}
          >
            {isSignup ? "Create account" : "Welcome back"}
          </h1>
          <p style={{ fontSize: "13px", color: "#999", marginBottom: "28px" }}>
            {isSignup
              ? "Sign up to start analyzing your resume"
              : "Sign in to view your resume analytics"}
          </p>

          {error && (
            <div
              style={{
                background: "#fdf0f3",
                border: "1px solid #f8d4dc",
                borderRadius: "10px",
                padding: "10px 14px",
                fontSize: "13px",
                color: "#c0406e",
                fontWeight: 500,
                marginBottom: "16px",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    fontSize: "12px",
                    color: "#444",
                    marginBottom: "6px",
                    display: "block",
                    fontWeight: 500,
                  }}
                >
                  Full name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Johnson"
                  required
                  style={inputStyle}
                />
              </div>
            )}

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  fontSize: "12px",
                  color: "#444",
                  marginBottom: "6px",
                  display: "block",
                  fontWeight: 500,
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label
                style={{
                  fontSize: "12px",
                  color: "#444",
                  marginBottom: "6px",
                  display: "block",
                  fontWeight: 500,
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  minLength={6}
                  style={{ ...inputStyle, paddingRight: "44px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#999",
                    display: "flex",
                    alignItems: "center",
                    padding: 0,
                  }}
                >
                  <i
                    className={`ti ${showPassword ? "ti-eye-off" : "ti-eye"}`}
                    style={{ fontSize: "18px" }}
                  />
                </button>
              </div>
            </div>

            {!isSignup && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  color: "#666",
                  marginBottom: "24px",
                  marginTop: "14px",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    style={{
                      width: "14px",
                      height: "14px",
                      accentColor: "#7c6af7",
                      cursor: "pointer",
                    }}
                  />
                  Remember me
                </label>
                <span style={{ cursor: "pointer", color: "#999" }}>
                  Forgot password
                </span>
              </div>
            )}
            {isSignup && <div style={{ marginTop: "8px" }} />}

            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: "#111",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "13px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                marginBottom: "10px",
                fontFamily: "inherit",
              }}
            >
              {loading
                ? "Please wait…"
                : isSignup
                ? "Create account"
                : "Sign in"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              style={{
                width: "100%",
                border: "1px solid #eee",
                background: "#fff",
                borderRadius: "10px",
                padding: "12px",
                fontSize: "13px",
                fontWeight: 500,
                color: "#333",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontFamily: "inherit",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </motion.button>
          </form>

          <div
            style={{
              textAlign: "center",
              fontSize: "12px",
              color: "#999",
              marginTop: "26px",
            }}
          >
            {isSignup ? "Already have an account? " : "Don't have an account? "}
            <span
              onClick={() => {
                onPageChange(isSignup ? "login" : "signup");
                setError("");
              }}
              style={{ color: "#111", fontWeight: 700, cursor: "pointer" }}
            >
              {isSignup ? "Sign in" : "Sign up"}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  background: "#f8f8f9",
  border: "1px solid #eee",
  borderRadius: "10px",
  padding: "12px 14px",
  fontSize: "13px",
  color: "#222",
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box",
};
