import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Building2,
  Tag,
  Clock,
  Search,
  RefreshCw,
  Inbox,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";

/* ─── helpers ─── */
const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const subjectColor = (subject) => {
  const map = {
    "Digital Marketing": "bg-blue-100 text-blue-700",
    "Brand Strategy": "bg-purple-100 text-purple-700",
    "Website Design": "bg-cyan-100 text-cyan-700",
    "Landing Page Design": "bg-sky-100 text-sky-700",
    "UI/UX Design": "bg-pink-100 text-pink-700",
    "Mobile Apps": "bg-orange-100 text-orange-700",
    "E-commerce": "bg-yellow-100 text-yellow-700",
    Other: "bg-gray-100 text-gray-600",
  };
  return map[subject] || "bg-[#162660]/10 text-[#162660]";
};

/* ─── Message Card ─── */
const MessageCard = ({ msg, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-white border border-[#162660]/10 rounded-2xl shadow-sm overflow-hidden"
    >
      {/* Card Header — always visible */}
      <div
        className="flex items-start gap-4 p-5 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Avatar */}
        <div className="w-11 h-11 rounded-xl bg-[#162660] flex items-center justify-center text-white font-extrabold text-lg shrink-0 select-none">
          {msg.fullName?.charAt(0).toUpperCase() || "?"}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-bold text-[#162660] text-sm truncate">Full Name:{msg.fullName}</span>
            <span
              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide ${subjectColor(msg.subject)}`}
            >
             Service Interested In: {msg.subject}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#475569]">
            <span className="flex items-center gap-1">
              <Mail size={11} /> Email: {msg.email}
            </span>
            {msg.company && (
              <span className="flex items-center gap-1">
                <Building2 size={11} /> Company: {msg.company}
              </span>
            )}
            <span className="flex items-center gap-1 ml-auto">
              <Clock size={11} /> {formatDate(msg.createdAt)}
            </span>
          </div>
        </div>

        {/* Expand toggle */}
        <button className="text-[#162660]/40 hover:text-[#162660] transition-colors shrink-0 mt-1">
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Expandable message body */}
      {expanded && (
        <div className="px-5 pb-5 pt-0 border-t border-[#162660]/10">
          <p className="text-[#475569] text-sm leading-relaxed whitespace-pre-wrap mt-4">
           Message: {msg.message}
          </p>
          <a
            href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
            className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#22C55E] hover:underline"
          >
            <Mail size={13} /> Reply via Email
          </a>
        </div>
      )}
    </motion.div>
  );
};

/* ─── Main Admin Dashboard ─── */
const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState("All");
  const [refreshing, setRefreshing] = useState(false);

  const fetchMessages = async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/messages`);
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      setError("Failed to load messages. Check your server connection.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  /* Derived filter options */
  const subjects = ["All", ...new Set(messages.map((m) => m.subject).filter(Boolean))];

  const filtered = messages.filter((m) => {
    const matchSearch =
      search === "" ||
      m.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase()) ||
      m.message?.toLowerCase().includes(search.toLowerCase()) ||
      m.company?.toLowerCase().includes(search.toLowerCase());

    const matchSubject = filterSubject === "All" || m.subject === filterSubject;

    return matchSearch && matchSubject;
  });

  /* Stats */
  const stats = [
    { label: "Total Messages", value: messages.length, color: "bg-[#162660] text-white" },
    {
      label: "This Week",
      value: messages.filter((m) => {
        const d = new Date(m.createdAt);
        const now = new Date();
        const diff = (now - d) / (1000 * 60 * 60 * 24);
        return diff <= 7;
      }).length,
      color: "bg-[#22C55E] text-white",
    },
    {
      label: "Unique Services",
      value: new Set(messages.map((m) => m.subject)).size,
      color: "bg-white border border-[#162660]/10 text-[#162660]",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-[#162660]">Contact Messages</h1>
            <p className="text-[#475569] text-sm mt-1">All enquiries submitted via the contact form</p>
          </div>
          <button
            onClick={() => fetchMessages(true)}
            disabled={refreshing}
            className="flex items-center gap-2 bg-[#162660] hover:bg-[#1e2d50] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all disabled:opacity-60"
          >
            <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
            {refreshing ? "Refreshing…" : "Refresh"}
          </button>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className={`rounded-2xl p-5 shadow-sm ${s.color}`}>
              <p className="text-3xl font-extrabold">{s.value}</p>
              <p className="text-sm opacity-70 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Search + Filter ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#475569]" />
            <input
              type="text"
              placeholder="Search by name, email, company or message…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#162660]/10 bg-white text-[#162660] text-sm focus:outline-none focus:border-[#162660] transition-colors"
            />
          </div>
          <div className="relative">
            <Tag size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#475569]" />
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="pl-9 pr-4 py-3 rounded-xl border border-[#162660]/10 bg-white text-[#162660] text-sm focus:outline-none focus:border-[#162660] transition-colors appearance-none"
            >
              {subjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Content ── */}
        {loading ? (
          <div className="flex items-center justify-center py-24 gap-3 text-[#475569]">
            <Loader2 className="animate-spin" size={24} />
            <span className="font-medium">Loading messages…</span>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-rose-500 font-semibold mb-4">{error}</p>
            <button
              onClick={() => fetchMessages()}
              className="px-6 py-3 bg-[#162660] text-white rounded-xl font-bold hover:bg-[#1e2d50] transition-all"
            >
              Retry
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-[#475569]">
            <Inbox size={48} className="mx-auto mb-4 opacity-30" />
            <p className="font-semibold text-lg">
              {messages.length === 0 ? "No messages yet" : "No results match your filters"}
            </p>
            {messages.length > 0 && (
              <button
                onClick={() => { setSearch(""); setFilterSubject("All"); }}
                className="mt-4 text-sm text-[#22C55E] hover:underline font-bold"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-xs text-[#475569] font-medium">
              Showing {filtered.length} of {messages.length} message{messages.length !== 1 ? "s" : ""}
            </p>
            {filtered.map((msg, i) => (
              <MessageCard key={msg._id} msg={msg} index={i} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MessagesPage;