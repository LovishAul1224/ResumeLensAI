import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { usePersistentHistory } from "./hooks/usePersistentHistory";
import Landing from "./components/Landing";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Upload from "./components/Upload";
import Dashboard from "./components/Dashboard";
import History from "./components/History";
import Settings from "./components/Settings";

function Spinner() {
  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        width: "36px", height: "36px", borderRadius: "50%",
        border: "3px solid var(--bg4)", borderTopColor: "var(--purple)",
        animation: "spin .8s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ---------- Login route ---------- */
function LoginRoute({ user }) {
  const [searchParams] = useSearchParams();
  const initialPage = searchParams.get("mode") === "signup" ? "signup" : "login";
  const [authPage, setAuthPage] = useState(initialPage);

  if (user) return <Navigate to="/dashboard" replace />;

  return <Auth page={authPage} onPageChange={setAuthPage} />;
}

/* ---------- Authenticated app shell ---------- */
function AppShell({ user, onLogout }) {
  const navigate = useNavigate();
  const [page, setPage] = useState("upload");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filename, setFilename] = useState("");

  // Persisted history — survives page reloads
  const { history, addEntry, clearHistory } = usePersistentHistory(user?.uid);

  const handleResult = (result, fname) => {
    setData(result);
    setFilename(fname);
    addEntry({
      name: fname,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      score: result.score,
      ats: result.ats_compatibility,
      result,
    });
    setPage("dashboard");
  };

  const handleLogout = async () => {
    await onLogout();
    navigate("/", { replace: true });
  };

  const renderPage = () => {
    switch (page) {
      case "upload":
        return <Upload onResult={handleResult} loading={loading} setLoading={setLoading} />;
      case "dashboard":
        return data
          ? <Dashboard data={data} filename={filename} onAnalyzeAnother={() => setPage("upload")} />
          : <Upload onResult={handleResult} loading={loading} setLoading={setLoading} />;
      case "history":
        return (
          <History
            history={history}
            onView={(item) => { setData(item.result); setFilename(item.name); setPage("dashboard"); }}
            onClear={clearHistory}
          />
        );
      case "settings":
        return <Settings user={user} onLogout={handleLogout} />;
      default:
        return <Upload onResult={handleResult} loading={loading} setLoading={setLoading} />;
    }
  };

  return (
    <Layout page={page} onNav={setPage} user={user} hasResult={!!data}>
      {renderPage()}
    </Layout>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          name: firebaseUser.displayName || firebaseUser.email.split("@")[0],
          email: firebaseUser.email,
          avatar: firebaseUser.photoURL,
          plan: "free",
          uid: firebaseUser.uid,
        });
      } else {
        setUser(false);
      }
      setAuthChecked(true);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(false);
  };

  if (!authChecked) return <Spinner />;

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page — public */}
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" replace /> : <Landing />}
        />

        {/* Sign in / sign up — public, redirects to dashboard if already logged in */}
        <Route path="/login" element={<LoginRoute user={user} />} />

        {/* Authenticated app — redirects to login if not signed in */}
        <Route
          path="/dashboard"
          element={user ? <AppShell user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
