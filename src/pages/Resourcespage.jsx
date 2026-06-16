import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Rocket, LogOut, ChevronDown, ChevronUp, BookOpen,
  Briefcase, Link2, Users, Twitter, Globe, Mail, Megaphone,
  MessageSquare,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const TOPICS = [
  {
    id: "upwork",
    icon: <Briefcase size={18} />,
    iconBg: "bg-emerald-100 text-emerald-700",
    title: "Upwork / Fiverr",
    badge: "Best for beginners",
    badgeColor: "bg-emerald-100 text-emerald-700",
    prompts: [
      {
        title: "Cold Proposal — Web Redesign",
        body: "Hi [Name], I noticed your site could use a modern refresh. I specialize in conversion-focused redesigns for small businesses. I'd love to show you 2–3 quick wins — mind if I send over a short Loom?",
      },
      {
        title: "Follow-up After No Response",
        body: "Hey [Name], just circling back on my earlier message. I know inboxes get busy! If you're still looking for web help, I'm happy to jump on a 15-min call this week.",
      },
      {
        title: "New Client — Intro Offer",
        body: "As a new seller building my portfolio, I'm offering a discounted starter package for the first 3 clients. You get a full 5-page site for $X — and I'll work until you're 100% happy.",
      },
    ],
  },
  {
    id: "linkedin",
    icon: <Link2 size={18} />,
    iconBg: "bg-blue-100 text-blue-700",
    title: "LinkedIn",
    badge: "Highest value leads",
    badgeColor: "bg-blue-100 text-blue-700",
    prompts: [
      {
        title: "Connection Request Note",
        body: "Hi [Name], I build fast, modern websites for [industry] businesses. Loved your recent post on [topic] — would love to connect and share some ideas.",
      },
      {
        title: "DM After Connecting",
        body: "Thanks for connecting, [Name]! I help businesses like yours increase leads through better web presence. Would a quick audit of your current site be useful?",
      },
      {
        title: "Value-First Outreach",
        body: "I did a quick review of your website and spotted 3 things that could be hurting your conversions. Happy to share them — no strings attached. Want me to send them over?",
      },
    ],
  },
  {
    id: "facebook",
    icon: <Users size={18} />,
    iconBg: "bg-indigo-100 text-indigo-700",
    title: "Facebook Groups",
    badge: "High local volume",
    badgeColor: "bg-purple-100 text-purple-700",
    prompts: [
      {
        title: "Group Post — Offering Help",
        body: "Hey everyone! 👋 I'm a web developer offering free 15-min website audits this week for local businesses. No pitch, just honest feedback. Drop your site below or DM me!",
      },
      {
        title: "Reply to Someone Asking for Recommendations",
        body: "Hi [Name]! I'd love to help — I've built sites for several [industry] businesses in the area. I can show you some examples and give you a quote. Want to jump on a quick call?",
      },
      {
        title: "Comment on a Pain-Point Post",
        body: "This is such a common issue! A lot of business owners lose leads because of slow or outdated sites. I'd be happy to take a look at yours and suggest some fixes — totally free.",
      },
    ],
  },
  {
    id: "twitter",
    icon: <Twitter size={18} />,
    iconBg: "bg-sky-100 text-sky-700",
    title: "X (Twitter)",
    badge: "Fast discovery",
    badgeColor: "bg-sky-100 text-sky-700",
    prompts: [
      {
        title: "Reply to a Struggling Business Owner",
        body: "Your product looks great — but your site might be losing you sales. I help founders fix that fast. DM me if you'd like a free look 👀",
      },
      {
        title: "Cold DM",
        body: "Hey [Name]! Love what you're building. I noticed your site takes 6+ seconds to load on mobile — that's killing conversions. I can usually cut that in half. Worth a quick chat?",
      },
      {
        title: "Thread Hook for Visibility",
        body: "I audited 50 small business websites last month. Here's what I found (and how to fix it) 🧵👇",
      },
    ],
  },
  {
    id: "email",
    icon: <Mail size={18} />,
    iconBg: "bg-orange-100 text-orange-700",
    title: "Cold Email",
    badge: "High conversion",
    badgeColor: "bg-orange-100 text-orange-700",
    prompts: [
      {
        title: "Subject: Quick question about [Company]'s website",
        body: "Hi [Name],\n\nI came across [Company] and noticed a few things on your site that might be holding back leads.\n\nI help [industry] businesses fix exactly this — mind if I send over a short video breakdown?\n\nBest,\n[Your name]",
      },
      {
        title: "Follow-up Email #1",
        body: "Hi [Name],\n\nJust wanted to bump this up in case it got buried! I've helped 3 similar businesses in [city] grow their inbound leads by improving their site.\n\nHappy to share results if helpful.\n\n[Your name]",
      },
      {
        title: "Break-up Email",
        body: "Hi [Name],\n\nI'll stop following up after this one — I know you're busy! If you ever need web help down the road, I'd love to work together.\n\nAll the best,\n[Your name]",
      },
    ],
  },
  {
    id: "google",
    icon: <Globe size={18} />,
    iconBg: "bg-red-100 text-red-700",
    title: "Google / Local SEO",
    badge: "Long-term growth",
    badgeColor: "bg-red-100 text-red-700",
    prompts: [
      {
        title: "Google Business Profile Response",
        body: "Thank you for your kind words, [Name]! We're so glad we could help. If you know any other businesses that need a website, we'd love to help them too 🙌",
      },
      {
        title: "Local Directory Bio",
        body: "We build fast, mobile-friendly websites for [city] businesses. From restaurants to law firms, we create sites that get found on Google and turn visitors into customers.",
      },
      {
        title: "Google Ads Headline Ideas",
        body: "• Affordable Web Design in [City]\n• Get a Website That Ranks on Google\n• Custom Sites From $X — Fast Delivery",
      },
    ],
  },
  {
    id: "referral",
    icon: <Megaphone size={18} />,
    iconBg: "bg-yellow-100 text-yellow-700",
    title: "Referral & Word of Mouth",
    badge: "Highest trust",
    badgeColor: "bg-yellow-100 text-yellow-700",
    prompts: [
      {
        title: "Ask a Past Client for a Referral",
        body: "Hey [Name], it was great working together! If you know anyone else who needs a website, I'd love the intro — I'll give them 10% off as a thank-you to you both.",
      },
      {
        title: "Partner Pitch to a Marketing Agency",
        body: "Hi [Name], I'm a web developer looking to partner with agencies for overflow work. I'm fast, reliable, and white-label friendly. Would you be open to a quick call?",
      },
      {
        title: "Post-Project Follow-Up",
        body: "Hi [Name], hope the new site is bringing in results! I'm taking on 2 new clients this month — if you know anyone who needs a site, I'd really appreciate the referral 🙏",
      },
    ],
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────

const STATS = [
  { label: "Platforms covered", value: TOPICS.length },
  { label: "Total prompts", value: TOPICS.reduce((s, t) => s + t.prompts.length, 0) },
  { label: "Best for beginners", value: "Upwork" },
  { label: "Highest value leads", value: "LinkedIn" },
];

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
      ZOZOWeb
    </p>
    <p className="text-gray-400 text-sm mt-1">Loading Resources...</p>
  </div>
);

// ─── Component ────────────────────────────────────────────────────────────────

const ResourcesPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [pageReady, setPageReady] = useState(false);
  const [openId, setOpenId] = useState(null);
  const [copied, setCopied] = useState(null);

  // ─── Auth guard ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    } else {
      setPageReady(true);
    }
  }, []);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // ─── Render ─────────────────────────────────────────────────────────────────

  if (!pageReady) return <PageLoader />;

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12 px-8">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* ── Page header bar ── */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#162660] rounded-xl flex items-center justify-center">
              <BookOpen className="text-white w-5 h-5" />
            </div>
            <h1 className="text-3xl font-bold text-[#162660]">Resources</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/admin/messages")}
              className="flex items-center gap-2 px-4 py-2 bg-[#162660]/10 text-[#162660] rounded-xl hover:bg-[#162660]/20 transition-colors font-medium text-sm"
            >
              <MessageSquare size={16} />
              Messages
            </button>
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="flex items-center gap-2 px-4 py-2 bg-[#162660]/10 text-[#162660] rounded-xl hover:bg-[#162660]/20 transition-colors font-medium text-sm"
            >
              <Rocket size={15} />
              Dashboard
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
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="text-[#162660] w-5 h-5" />
            <h2 className="text-xl font-bold text-[#162660]">
              🚀 Client Outreach Prompts
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-5">
            Copy-ready messages for web developers to hunt clients across every major platform.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STATS.map((s) => (
              <div key={s.label} className="border border-gray-200 rounded-xl p-3">
                <p className="text-gray-400 text-[11px] leading-tight mb-1">{s.label}</p>
                <p className="text-[#162660] font-bold text-lg leading-tight">{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Accordion list ── */}
        <div className="space-y-3">
          {TOPICS.map((topic) => {
            const isOpen = openId === topic.id;
            return (
              <div key={topic.id} className="bg-white rounded-2xl shadow overflow-hidden">

                {/* Row header */}
                <button
                  onClick={() => toggle(topic.id)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${topic.iconBg}`}
                  >
                    {topic.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm">{topic.title}</p>
                    <span
                      className={`inline-block mt-0.5 text-[11px] font-semibold px-2 py-0.5 rounded-full ${topic.badgeColor}`}
                    >
                      {topic.badge}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-gray-400 text-xs">
                      {topic.prompts.length} prompts
                    </span>
                    {isOpen
                      ? <ChevronUp size={16} className="text-[#162660]" />
                      : <ChevronDown size={16} className="text-gray-400" />
                    }
                  </div>
                </button>

                {/* Expanded prompts */}
                {isOpen && (
                  <div className="border-t border-gray-100 px-5 py-4 space-y-4 bg-gray-50/60">
                    {topic.prompts.map((prompt, idx) => {
                      const copyKey = `${topic.id}-${idx}`;
                      return (
                        <div
                          key={idx}
                          className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <p className="text-[#162660] font-semibold text-sm leading-snug">
                              {prompt.title}
                            </p>
                            <button
                              onClick={() => handleCopy(prompt.body, copyKey)}
                              className={`flex-shrink-0 text-[11px] font-bold px-3 py-1 rounded-lg transition-colors ${
                                copied === copyKey
                                  ? "bg-green-100 text-green-700"
                                  : "bg-[#162660]/10 text-[#162660] hover:bg-[#162660]/20"
                              }`}
                            >
                              {copied === copyKey ? "Copied!" : "Copy"}
                            </button>
                          </div>
                          <p className="text-gray-500 text-xs leading-relaxed whitespace-pre-line">
                            {prompt.body}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default ResourcesPage;