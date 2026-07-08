import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Rocket, LogOut, BookOpen, MessageSquare, Mail,
  Building2, User, Search, RefreshCw, Inbox
} from "lucide-react";

// ─── Page loader ──────────────────────────────────────────────────────────────

const PageLoader = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 rounded-full border-4 border-[#162660]/10" />
      <div className="absolute inset-0 rounded-full border-4 border-t-[#162660] animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Rocket className="text-[#162660] w-8 h-8" />
      </div>
    </div>
    <p className="mt-4 text-[#162660] font-bold text-lg tracking-widest uppercase">
      WebMagpie
    </p>
    <p className="text-gray-400 text-sm mt-1">Loading Dashboard...</p>
  </div>
);

// ─── Component ────────────────────────────────────────────────────────────────

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [pageReady, setPageReady] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // ─── Auth guard ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    } else {
      setPageReady(true);
    }
  }, []);

  // ─── Fetch messages ─────────────────────────────────────────────────────────
  const fetchMessages = () => {
    setLoadingMessages(true);
    setError(null);
    fetch(`${import.meta.env.VITE_BASE_URL}/api/messages`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load messages");
        return res.json();
      })
      .then((data) => {
        setMessages(Array.isArray(data) ? data : []);
        setLoadingMessages(false);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
        setLoadingMessages(false);
      });
  };

  useEffect(() => {
    if (pageReady) fetchMessages();
  }, [pageReady]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // ─── Derived data ───────────────────────────────────────────────────────────
  const filteredMessages = messages.filter((msg) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      msg.fullName?.toLowerCase().includes(q) ||
      msg.email?.toLowerCase().includes(q) ||
      msg.subject?.toLowerCase().includes(q) ||
      msg.company?.toLowerCase().includes(q)
    );
  });

  const uniqueCompanies = new Set(
    messages.filter((m) => m.company).map((m) => m.company)
  ).size;

  const STATS = [
    { label: "Total messages", value: messages.length },
    { label: "Unique companies", value: uniqueCompanies },
    { label: "Showing", value: filteredMessages.length },
    { label: "Status", value: error ? "Error" : "Live" },
  ];

  // ─── Render ─────────────────────────────────────────────────────────────────

  if (!pageReady) return <PageLoader />;

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12 px-8">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* ── Page header bar ── */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#162660] rounded-xl flex items-center justify-center">
              <Rocket className="text-white w-5 h-5" />
            </div>
            <h1 className="text-3xl font-bold text-[#162660]">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/admin/messages")}
              className="flex items-center gap-2 px-4 py-2 bg-[#162660]/10 text-[#162660] rounded-xl hover:bg-[#162660]/20 transition-colors font-medium text-sm"
            >
              <MessageSquare size={15} />
              Messages
            </button>
            <button
              onClick={() => navigate("/admin/resources")}
              className="flex items-center gap-2 px-4 py-2 bg-[#162660]/10 text-[#162660] rounded-xl hover:bg-[#162660]/20 transition-colors font-medium text-sm"
            >
              <BookOpen size={15} />
              Resources
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors text-sm"
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </div>

        {/* ── Hero card ── */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Inbox className="text-[#162660] w-5 h-5" />
              <h2 className="text-xl font-bold text-[#162660]">
                📨 Client Messages
              </h2>
            </div>
            <button
              onClick={fetchMessages}
              className="flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-lg bg-[#162660]/10 text-[#162660] hover:bg-[#162660]/20 transition-colors"
            >
              <RefreshCw size={13} className={loadingMessages ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
          <p className="text-gray-500 text-sm mb-5">
            Everything submitted through your site's contact form, in one place.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {STATS.map((s) => (
              <div key={s.label} className="border border-gray-200 rounded-xl p-3">
                <p className="text-gray-400 text-[11px] leading-tight mb-1">{s.label}</p>
                <p className="text-[#162660] font-bold text-lg leading-tight">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, subject, or company..."
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#162660]/20 focus:border-[#162660]/40 transition-colors"
            />
          </div>
        </div>

        {/* ── Messages list ── */}
        <div className="space-y-3">
          {loadingMessages && (
            <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-400 text-sm">
              Loading messages...
            </div>
          )}

          {!loadingMessages && error && (
            <div className="bg-white rounded-2xl shadow p-8 text-center">
              <p className="text-red-500 font-medium text-sm mb-1">Couldn't load messages</p>
              <p className="text-gray-400 text-xs mb-4">{error}</p>
              <button
                onClick={fetchMessages}
                className="px-4 py-2 bg-[#162660] text-white rounded-xl text-sm font-medium hover:bg-[#0f1c47] transition-colors"
              >
                Try again
              </button>
            </div>
          )}

          {!loadingMessages && !error && filteredMessages.length === 0 && (
            <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-400 text-sm">
              {messages.length === 0
                ? "No messages yet. New submissions will show up here."
                : "No messages match your search."}
            </div>
          )}

          {!loadingMessages && !error && filteredMessages.map((msg) => (
            <div key={msg._id} className="bg-white rounded-2xl shadow overflow-hidden">
              <div className="px-5 py-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#162660]/10 text-[#162660]">
                      <User size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800 text-sm truncate">
                        {msg.fullName || "Unknown"}
                      </p>
                      <p className="text-gray-400 text-xs truncate">{msg.email}</p>
                    </div>
                  </div>
                  {msg.subject && (
                    <span className="flex-shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      {msg.subject}
                    </span>
                  )}
                </div>

                {msg.company && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                    <Building2 size={13} />
                    {msg.company}
                  </div>
                )}

                <div className="bg-gray-50/60 border border-gray-100 rounded-xl p-3">
                  <p className="text-gray-600 text-xs leading-relaxed whitespace-pre-line">
                    {msg.message}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-3">
                  <Mail size={12} />
                  {msg.createdAt
                    ? new Date(msg.createdAt).toLocaleString()
                    : "Date unavailable"}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;