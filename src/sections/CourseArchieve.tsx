import { useMemo, useState } from "react";
import {
  ShoppingCart,
  Youtube,
  Instagram,
  Smartphone,
  Megaphone,
  Code2,
  Braces,
  Database,
  Shield,
  Cloud,
  Languages,
  Globe,
  Layers,
  ShoppingBag,
  TrendingUp,
  BookOpen,
  Plus,
  Pencil,
  Trash2,
  FolderOpen,
  ExternalLink,
  X,
  Check,
  Search,
  AlertTriangle,
  LogOut,
  MessageSquare,
  Rocket,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------
// Category metadata: icon + color per topic. Colors are functional
// (they let you scan the list by topic at a glance), not decorative.
// ----------------------------------------------------------------
const CATEGORIES = {
  googleAds: { label: "Google Ads", icon: Megaphone, color: "amber" },
  amazon: { label: "Amazon", icon: ShoppingCart, color: "orange" },
  youtube: { label: "YouTube", icon: Youtube, color: "red" },
  marketing: { label: "Digital Marketing", icon: TrendingUp, color: "pink" },
  python: { label: "Python", icon: Code2, color: "sky" },
  javascript: { label: "JavaScript", icon: Braces, color: "yellow" },
  android: { label: "Android", icon: Smartphone, color: "lime" },
  security: { label: "Cyber Security", icon: Shield, color: "slate" },
  database: { label: "Database", icon: Database, color: "indigo" },
  flutter: { label: "Flutter / AI", icon: Layers, color: "cyan" },
  language: { label: "Language", icon: Languages, color: "violet" },
  webdev: { label: "Web Dev", icon: Globe, color: "teal" },
  angular: { label: "Angular", icon: Layers, color: "rose" },
  instagram: { label: "Social Media", icon: Instagram, color: "fuchsia" },
  shopify: { label: "Shopify / eCommerce", icon: ShoppingBag, color: "emerald" },
  azure: { label: "Cloud / Azure", icon: Cloud, color: "blue" },
  general: { label: "General", icon: BookOpen, color: "gray" },
};

const COLOR_CLASSES = {
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200",
  red: "bg-red-50 text-red-700 border-red-200",
  pink: "bg-pink-50 text-pink-700 border-pink-200",
  sky: "bg-sky-50 text-sky-700 border-sky-200",
  yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
  lime: "bg-lime-50 text-lime-700 border-lime-200",
  slate: "bg-slate-100 text-slate-700 border-slate-200",
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
  cyan: "bg-cyan-50 text-cyan-700 border-cyan-200",
  violet: "bg-violet-50 text-violet-700 border-violet-200",
  teal: "bg-teal-50 text-teal-700 border-teal-200",
  rose: "bg-rose-50 text-rose-700 border-rose-200",
  fuchsia: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  gray: "bg-gray-100 text-gray-700 border-gray-200",
};

// ----------------------------------------------------------------
// Seed data, transcribed from the course-list screenshot.
// driveLink is left empty — fill these in with your actual
// Google Drive folder links, or add them from the UI.
// ----------------------------------------------------------------
let nextId = 1;
const seed = (title, category) => ({ id: nextId++, title, category, driveLink: "" });

const INITIAL_COURSES = [
  seed("[DesireCourse.Com] Udemy - Google Adwords PPC Success Google Pay Per Click Ads", "googleAds"),
  seed("Amazon FBA - The Ultimate Guide To Making Money On Amazon FBA", "amazon"),
  seed("Amazon FBA Complete Guide To Start Your Own Home Business", "amazon"),
  seed("Amazon FBA Mini Course Find A Profitable Product To Import", "amazon"),
  seed("Android App Development Course with Kotlin Android A-Z", "android"),
  seed("Android Ethical Hacking Course", "security"),
  seed("AZ-104 Microsoft Azure Administrator - Full Course", "azure"),
  seed("Bestseller Digital marketing course + Facebook ads (2021)", "marketing"),
  seed("Chat GPT Your Personal Digital Marketing Assistant", "marketing"),
  seed("Complete JavaScript Course For Beginners to Master - 2019", "javascript"),
  seed("Complete Python Course from Basics to Brilliance in HD", "python"),
  seed("Complete YouTube Course Grow a Channel with some Strategies", "youtube"),
  seed("Digital Marketing All-In-One For Dummies", "marketing"),
  seed("Digital Marketing All-In-One For Dummies, 2nd Edition", "marketing"),
  seed("Digitorious Technologies - Comprehensive Course on MongoDB and Data Modeling", "database"),
  seed("Flutter Artificial Intelligence Course - Build 15+ AI Apps", "flutter"),
  seed("French Foundation Course with Pronunciation Techniques", "language"),
  seed("German Course 1 The Easy Way to Learn German", "language"),
  seed("Get Top YouTube Ranking - a Complete Masterclass (2018)", "youtube"),
  seed("Google Ads. A complete guide for Google Ads", "googleAds"),
  seed("Google Bard 50 Digital Marketing Hacks to Make Money Online", "marketing"),
  seed("Google Shopping & Merchant Center eCommerce PPC Ads 2021", "googleAds"),
  seed("Learn Complete Web Development Course Using PHP/MySQL", "webdev"),
  seed("Learn Digital Marketing (12 Courses in 1)", "marketing"),
  seed("Learn How To Start & Grow Your Own Digital Marketing Agency", "marketing"),
  seed("Learn Top Digital Marketing Tools", "marketing"),
  seed("Marketing Analytics - Presenting Digital Marketing Data", "marketing"),
  seed("Marshall P. et al. Ultimate Guide to Google Ads 6ed 2020 PDF", "googleAds"),
  seed("New Google Ads 2019 (AdWords) PPC Marketing New Interface!", "googleAds"),
  seed("Online Japanese Beginner Course (All 12 lessons)", "language"),
  seed("Practical Ethical Hacking - The Complete Course", "security"),
  seed("Python And Flask Framework Complete Course For Beginners", "python"),
  seed("Python For Beginners Crash Course Using VS Code", "python"),
  seed("Python Programming Full Course (Basics, OOP, Modules, PyQt)", "python"),
  seed("Reactive Angular Course (with RxJs)", "angular"),
  seed("Sachdev R. Digital Marketing 2024", "marketing"),
  seed("Seen_ The Ultimate Instagram Growth Hacking Course", "instagram"),
  seed("The Beginner Shopify Aliexpress Dropship course", "shopify"),
  seed("The Complete Cyber Security Course Anonymous Browsing!", "security"),
  seed("The Complete Forex Trading Course Line Chart Trading", "general"),
  seed("The Complete Google Ads Masterclass", "googleAds"),
  seed("The Complete 'No Code' Automation Course Build 18 Projects", "webdev"),
  seed("The Complete Oracle SQL Certification Course", "database"),
  seed("The Complete Python 3 Course Beginner to Advanced", "python"),
  seed("The Complete Python Hacking Course Beginner to Advanced!", "python"),
  seed("The Complete Shopify Amazon Affiliate course", "shopify"),
  seed("The Python Mega Course Build 10 Real World Applications", "python"),
  seed("Ultimate Guide to Google Ads, 6th Edition", "googleAds"),
  seed("Understanding YouTube SEO - Grow from ZERO", "youtube"),
  seed("Wix Master Course Make A Website with Wix (FULL 4 HOURS)", "webdev"),
  seed("YouTube Full Guide, Secrets of Success (Beginner to Star)", "youtube"),
  seed("YouTube Masterclass - Your Complete Guide to YouTube", "youtube"),
  seed("YouTube Mastermind - How to Grow a Channel & Audience", "youtube"),
  seed("YouTube SEO Pro", "youtube"),
  seed("YouTube SEO Secret Boost your YouTube Channel", "youtube"),
];

function CategoryIcon({ category, className }) {
  const meta = CATEGORIES[category] || CATEGORIES.general;
  const Icon = meta.icon;
  return <Icon className={className} />;
}

function CategoryBadge({ category }) {
  const meta = CATEGORIES[category] || CATEGORIES.general;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${COLOR_CLASSES[meta.color]}`}
    >
      <CategoryIcon category={category} className="h-3.5 w-3.5" />
      {meta.label}
    </span>
  );
}

// ----------------------------------------------------------------
// Add / edit form, shared between "add new course" and "edit course"
// ----------------------------------------------------------------
function CourseForm({ initial, onSave, onCancel }) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState(initial?.category ?? "general");
  const [driveLink, setDriveLink] = useState(initial?.driveLink ?? "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title: title.trim(), category, driveLink: driveLink.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-[1fr_auto]">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Course title"
          className="col-span-2 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
        >
          {Object.entries(CATEGORIES).map(([key, meta]) => (
            <option key={key} value={key}>
              {meta.label}
            </option>
          ))}
        </select>
        <input
          value={driveLink}
          onChange={(e) => setDriveLink(e.target.value)}
          placeholder="Google Drive folder link"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
        />
      </div>
      <div className="flex gap-2 sm:flex-col">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          <Check className="h-4 w-4" /> Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <X className="h-4 w-4" /> Cancel
        </button>
      </div>
    </form>
  );
}

export default function CourseLibrary() {
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [addingNew, setAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const stats = useMemo(() => {
    const byCategory = {};
    let linked = 0;
    for (const c of courses) {
      byCategory[c.category] = (byCategory[c.category] || 0) + 1;
      if (c.driveLink) linked += 1;
    }
    return {
      total: courses.length,
      linked,
      unlinked: courses.length - linked,
      byCategory,
    };
  }, [courses]);

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesCategory = activeCategory === "all" || c.category === activeCategory;
      const matchesQuery = c.title.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [courses, query, activeCategory]);

  const addCourse = (data) => {
    setCourses((prev) => [{ id: nextId++, ...data }, ...prev]);
    setAddingNew(false);
  };

  const updateCourse = (id, data) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
    setEditingId(null);
  };

  const deleteCourse = (id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    setConfirmDeleteId(null);
  };

  const topCategories = Object.entries(stats.byCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };
  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6">
      
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
                    onClick={() => navigate("/admin/dashboard")}
                    className="flex items-center gap-2 px-4 py-2 bg-[#162660]/10 text-[#162660] rounded-xl hover:bg-[#162660]/20 transition-colors font-medium text-sm"
                  >
                    <Rocket size={15} />
                    Dashboard
                  </button>
                  <button
                    onClick={() => navigate("/admin/messages")}
                    className="flex items-center gap-2 px-4 py-2 bg-[#162660]/10 text-[#162660] rounded-xl hover:bg-[#162660]/20 transition-colors font-medium text-sm"
                  >
                   <MessageSquare size={16} />
                    Messages
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
        
      {/* Header */}
      <div className="mb-6 mt-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Course Library</h1>
          <p className="mt-1 text-sm text-gray-500">
            Every downloaded course in one place, with folder links and category stats.
          </p>
        </div>
        <button
          onClick={() => {
            setAddingNew(true);
            setEditingId(null);
          }}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          <Plus className="h-4 w-4" /> Add course
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Total courses</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.total}</p>
        </div>
        <div className="rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Categories</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {Object.keys(stats.byCategory).length}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Linked to Drive</p>
          <p className="mt-1 text-2xl font-semibold text-emerald-600">{stats.linked}</p>
        </div>
        <div className="rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Missing a link</p>
          <p className="mt-1 text-2xl font-semibold text-amber-600">{stats.unlinked}</p>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory("all")}
          className={`rounded-full border px-3 py-1 text-xs font-medium ${
            activeCategory === "all"
              ? "border-gray-900 bg-gray-900 text-white"
              : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          All ({stats.total})
        </button>
        {topCategories.map(([key, count]) => {
          const meta = CATEGORIES[key] || CATEGORIES.general;
          return (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
                activeCategory === key
                  ? "border-gray-900 bg-gray-900 text-white"
                  : `${COLOR_CLASSES[meta.color]} hover:opacity-80`
              }`}
            >
              <CategoryIcon category={key} className="h-3.5 w-3.5" />
              {meta.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="mb-4 flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2">
        <Search className="h-4 w-4 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search courses..."
          className="w-full text-sm outline-none"
        />
      </div>

      {/* Add new form */}
      {addingNew && (
        <div className="mb-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <CourseForm onSave={addCourse} onCancel={() => setAddingNew(false)} />
        </div>
      )}

      {/* List */}
      <div className="divide-y divide-gray-100 rounded-xl border border-gray-200">
        {filtered.length === 0 && (
          <p className="p-6 text-center text-sm text-gray-400">No courses match your search.</p>
        )}

        {filtered.map((course) => (
          <div key={course.id} className="p-4">
            {editingId === course.id ? (
              <CourseForm
                initial={course}
                onSave={(data) => updateCourse(course.id, data)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-lg border ${
                      COLOR_CLASSES[(CATEGORIES[course.category] || CATEGORIES.general).color]
                    }`}
                  >
                    <CategoryIcon category={course.category} className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900">{course.title}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <CategoryBadge category={course.category} />
                      {!course.driveLink && (
                        <span className="inline-flex items-center gap-1 text-xs text-amber-600">
                          <AlertTriangle className="h-3.5 w-3.5" /> No folder link yet
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-none items-center gap-1.5">
                  {course.driveLink ? (
                    <a
                      href={course.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <FolderOpen className="h-3.5 w-3.5" />
                      Open
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : null}
                  <button
                    onClick={() => {
                      setEditingId(course.id);
                      setAddingNew(false);
                    }}
                    className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>

                  {confirmDeleteId === course.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => deleteCourse(course.id)}
                        className="rounded-lg bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-red-700"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDeleteId(course.id)}
                      className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}