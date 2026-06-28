import React, { useState } from "react";

const API = import.meta.env.VITE_BASE_URL;

// ── Inline SVG icons so no extra import needed ──────────────────────────────
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"
    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"
    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const AdminLogin = () => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res  = await fetch(`${API}/api/auth/login`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        window.location.href = "/admin/dashboard";
      } else {
        setError(data.error || "Login failed");
      }
    } catch {
      setError("Server error — please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Global styles injected once ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .al-root {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        /* ── Background: dark harbour gradient matching the reference ── */
        .al-bg {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              135deg,
              rgba(60, 10, 20, 0.82) 0%,
              rgba(10, 30, 50, 0.70) 45%,
              rgba(0, 90, 80, 0.65) 100%
            ),
            url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80')
              center / cover no-repeat;
          filter: brightness(0.88);
        }

        /* Subtle animated noise grain overlay */
        .al-grain {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.18;
          pointer-events: none;
        }

        /* ── Layout: left panel + right brand ── */
        .al-card {
          position: relative;
          z-index: 10;
          display: flex;
          width: min(900px, 94vw);
          min-height: 480px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.55);
        }

        /* Left — form panel */
        .al-left {
          flex: 1;
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          border: 1px solid rgba(255,255,255,0.12);
          border-right: none;
          padding: 52px 44px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .al-welcome {
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 8px;
          letter-spacing: -0.5px;
        }

        .al-sub {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.55);
          margin: 0 0 32px;
          line-height: 1.6;
          max-width: 280px;
        }

        /* Input rows */
        .al-field {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 10px;
          margin-bottom: 14px;
          transition: border-color 0.2s, background 0.2s;
          overflow: hidden;
        }
        .al-field:focus-within {
          border-color: #1ecfb0;
          background: rgba(255,255,255,0.14);
        }

        .al-field input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          padding: 14px 16px;
          color: #fff;
          font-size: 0.88rem;
          font-family: inherit;
        }
        .al-field input::placeholder { color: rgba(255,255,255,0.38); }

        .al-icon-btn {
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1ecfb0;
          color: #fff;
          border: none;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .al-icon-btn:hover { background: #17b89c; }

        /* Remember me */
        .al-remember {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
          cursor: pointer;
          font-size: 0.82rem;
          color: rgba(255,255,255,0.6);
          user-select: none;
        }
        .al-remember input[type="checkbox"] {
          accent-color: #1ecfb0;
          width: 15px;
          height: 15px;
          cursor: pointer;
        }

        /* Error */
        .al-error {
          font-size: 0.78rem;
          color: #ff6b6b;
          margin-bottom: 12px;
          padding: 8px 12px;
          background: rgba(255,80,80,0.12);
          border-radius: 8px;
          border: 1px solid rgba(255,80,80,0.25);
        }

        /* Login button */
        .al-btn {
          width: 100%;
          padding: 13px;
          border-radius: 10px;
          border: 1.5px solid rgba(255,255,255,0.55);
          background: transparent;
          color: #fff;
          font-size: 0.9rem;
          font-weight: 600;
          font-family: inherit;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          margin-bottom: 20px;
        }
        .al-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.12);
          border-color: #fff;
        }
        .al-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        /* Bottom links */
        .al-links {
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
        }
        .al-links a {
          color: #1ecfb0;
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .al-links a:hover { opacity: 0.75; }

        /* Right — brand panel */
        .al-right {
          width: 260px;
          flex-shrink: 0;
          background: rgba(0,0,0,0.22);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 40px 24px;
        }

        /* Big outlined logo letters — matches reference DOE style */
        .al-logo-text {
          font-size: 5.5rem;
          font-weight: 800;
          letter-spacing: -4px;
          color: transparent;
          -webkit-text-stroke: 2.5px rgba(255,255,255,0.80);
          line-height: 1;
          text-align: center;
          user-select: none;
        }

        .al-vessel {
          font-size: 1rem;
          font-weight: 500;
          color: rgba(255,255,255,0.70);
          letter-spacing: 1px;
          text-align: center;
        }

        /* Divider dot row */
        .al-dots {
          display: flex;
          gap: 6px;
          margin-top: 12px;
        }
        .al-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
        }
        .al-dot.active { background: #1ecfb0; }

        /* ── Responsive: stack on mobile ── */
        @media (max-width: 600px) {
          .al-right   { display: none; }
          .al-left    { padding: 40px 28px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.12); }
          .al-card    { border-radius: 20px; }
        }
      `}</style>

      <div className="al-root">
        {/* Background */}
        <div className="al-bg" />
        <div className="al-grain" />

        {/* Card */}
        <div className="al-card">

          {/* ── Left: form ── */}
          <div className="al-left">
            <h1 className="al-welcome">Welcome!</h1>
            <p className="al-sub">
              Sign in to access your WebMagpie admin panel and manage your dashboard.
            </p>

            <form onSubmit={handleLogin}>
              {/* Email */}
              <div className="al-field">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
                <button type="button" className="al-icon-btn" tabIndex={-1}>
                  <UserIcon />
                </button>
              </div>

              {/* Password */}
              <div className="al-field">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="al-icon-btn"
                  onClick={() => setShowPass((v) => !v)}
                  title={showPass ? "Hide password" : "Show password"}
                >
                  <LockIcon />
                </button>
              </div>

              {/* Remember me */}
              <label className="al-remember">
                <input type="checkbox" />
                Remember me
              </label>

              {/* Error */}
              {error && <p className="al-error">{error}</p>}

              {/* Submit */}
              <button type="submit" className="al-btn" disabled={loading}>
                {loading ? "Signing in…" : "Login"}
              </button>
            </form>

            <div className="al-links">
              <a href="#">New User? Sign Up</a>
              <a href="#">Forgot Password</a>
            </div>
          </div>

          {/* ── Right: brand ── */}
          <div className="al-right">
            <div className=" text-white text-2xl">WebMagpie</div>
            <p className="al-vessel">Admin Portal</p>
            <div className="al-dots">
              <div className="al-dot active" />
              <div className="al-dot" />
              <div className="al-dot" />
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default AdminLogin;