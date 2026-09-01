"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUp, Mail } from "lucide-react";

/**
 * Privacy Policy page for a web dev / SEO / digital marketing agency.
 *
 * Drop this into app/privacy/page.jsx (Next.js App Router) or
 * pages/privacy.jsx (Pages Router). Swap the placeholders in
 * AGENCY below for your real details, and edit SECTIONS to taste.
 *
 * Fonts: Ubuntu (display + body), Ubuntu Mono (meta/numbers).
 * Load them in your root layout, e.g.:
 *
 *   import { Ubuntu, Ubuntu_Mono } from "next/font/google";
 *   const display = Ubuntu({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-display" });
 *   const body = Ubuntu({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-body" });
 *   const mono = Ubuntu_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono" });
 *
 * and apply the variables to <html className={`${display.variable} ${body.variable} ${mono.variable}`}>
 * This file falls back to system fonts if those variables aren't present.
 */

const AGENCY = {
  name: "Meridian Digital",
  site: "meridiandigital.com",
  email: "privacy@meridiandigital.com",
  address: "48 Foundry Lane, Suite 300, Austin, TX 78701",
  effective: "September 1, 2026",
  updated: "September 1, 2026",
};

const SECTIONS = [
  {
    id: "overview",
    label: "Overview",
    body: (
      <>
        <p>
          {AGENCY.name} ("we," "us," "our") designs and builds websites, runs
          SEO programs, and manages digital marketing campaigns for clients.
          This policy explains what information we collect through{" "}
          {AGENCY.site} and our client-facing tools, why we collect it, and
          the choices you have.
        </p>
        <p>
          It applies to visitors of our marketing site, prospects who submit
          an inquiry, and clients we work with under a signed agreement.
          Where our work involves a client's own website visitors or ad
          audiences, that data is governed by the client's own privacy
          policy — see{" "}
          <a href="#client-data" className="underline decoration-1 underline-offset-2 hover:text-[var(--accent)]">
            Client &amp; Campaign Data
          </a>{" "}
          below for how the two relate.
        </p>
      </>
    ),
  },
  {
    id: "collect",
    label: "What we collect",
    body: (
      <>
        <p>We collect three broad categories of information:</p>
        <ul className="mt-4 space-y-3">
          <li>
            <span className="font-medium text-[var(--ink)]">Information you give us</span> — name, email, phone,
            company, and project details submitted through contact forms, proposal requests, or onboarding
            paperwork.
          </li>
          <li>
            <span className="font-medium text-[var(--ink)]">Information collected automatically</span> — IP
            address, browser and device type, pages viewed, referring URL, and approximate location, gathered
            via cookies and similar technologies.
          </li>
          <li>
            <span className="font-medium text-[var(--ink)]">Information from third parties</span> — data passed
            to us by ad platforms, your CRM, or analytics accounts you grant us access to as part of a project.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "use",
    label: "How we use it",
    body: (
      <>
        <p>We use the information above to:</p>
        <ul className="mt-4 space-y-2 list-disc pl-5 marker:text-[var(--accent)]">
          <li>Respond to inquiries and prepare proposals</li>
          <li>Deliver contracted work — builds, SEO audits, campaign management</li>
          <li>Send project updates, invoices, and service announcements</li>
          <li>Improve our own site, offers, and case studies</li>
          <li>Meet legal, tax, and accounting obligations</li>
        </ul>
        <p className="mt-4">
          We don't use client project data to build audiences for other clients, and we never sell personal
          data.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    label: "Cookies & tracking",
    body: (
      <>
        <p>
          Our own site uses a small set of cookies: essential ones that keep the site working, and analytics
          cookies (Google Analytics, Search Console) that tell us which pages and content are useful. You'll
          see a banner on first visit where you can accept or decline non-essential cookies; you can change
          that choice any time from the cookie icon in the footer.
        </p>
        <p className="mt-4">
          When we run advertising for a client, we may place platform pixels (Meta, Google Ads, LinkedIn) on
          <em> their</em> site, governed by their policy, not this one.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    label: "Sharing & disclosure",
    body: (
      <>
        <p>We share information only where it's needed to run our business or deliver a project:</p>
        <ul className="mt-4 space-y-2 list-disc pl-5 marker:text-[var(--accent)]">
          <li>Hosting, email, and scheduling tools we rely on to operate (e.g. Vercel, Google Workspace)</li>
          <li>Payment processors, for invoicing</li>
          <li>Subcontractors bound by confidentiality, for overflow project work</li>
          <li>Authorities, where required by law or to protect our rights</li>
        </ul>
        <p className="mt-4">We do not sell personal data, to anyone, ever.</p>
      </>
    ),
  },
  {
    id: "client-data",
    label: "Client & campaign data",
    body: (
      <>
        <p>
          Much of our work means logging into a client's Analytics, Search Console, or ad accounts. Any data
          we see there — a client's own visitors, leads, or customers — belongs to the client and is handled
          under our signed services agreement and data processing terms, not under this policy.
        </p>
        <p className="mt-4">
          If you're a visitor to one of our clients' websites and have a privacy question, please contact that
          business directly; we act as a processor on their behalf, not the controller of that data.
        </p>
      </>
    ),
  },
  {
    id: "security",
    label: "Security & retention",
    body: (
      <>
        <p>
          We use SSL/TLS in transit, restrict internal access to client accounts on a need-to-know basis, and
          require two-factor authentication on our own systems. No system is completely secure, and we'll
          notify affected parties without undue delay if a breach puts personal data at risk.
        </p>
        <p className="mt-4">
          We keep inquiry data for up to 24 months if no project follows, and client project data for the
          length of the engagement plus 7 years to satisfy tax and contract record-keeping requirements.
        </p>
      </>
    ),
  },
  {
    id: "rights",
    label: "Your rights",
    body: (
      <>
        <p>Depending on where you live, you may have the right to:</p>
        <ul className="mt-4 space-y-2 list-disc pl-5 marker:text-[var(--accent)]">
          <li>Access the personal data we hold about you</li>
          <li>Correct or delete it</li>
          <li>Object to or restrict certain processing</li>
          <li>Receive your data in a portable format</li>
          <li>Opt out of marketing email at any time, via the unsubscribe link</li>
        </ul>
        <p className="mt-4">
          To exercise any of these, email{" "}
          <a href={`mailto:${AGENCY.email}`} className="underline decoration-1 underline-offset-2 hover:text-[var(--accent)]">
            {AGENCY.email}
          </a>{" "}
          — we respond within 30 days.
        </p>
      </>
    ),
  },
  {
    id: "children",
    label: "Children's privacy",
    body: (
      <p>
        Our services are directed at businesses, not children. We don't knowingly collect personal data from
        anyone under 16. If you believe a minor has provided us data, contact us and we'll remove it.
      </p>
    ),
  },
  {
    id: "changes",
    label: "Changes to this policy",
    body: (
      <p>
        We'll update this page as our tools or practices change, and update the date below. Material changes
        that affect how we handle existing client data will be communicated directly, not just posted here.
      </p>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    body: (
      <>
        <p>Questions about this policy or your data:</p>
        <div className="mt-5 flex flex-col gap-1 font-[family-name:var(--font-mono,monospace)] text-sm text-[var(--ink)]">
          <span>{AGENCY.name}</span>
          <span>{AGENCY.address}</span>
          <a href={`mailto:${AGENCY.email}`} className="text-[var(--accent)] hover:underline w-fit">
            {AGENCY.email}
          </a>
        </div>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const [navOpen, setNavOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    SECTIONS.forEach((s) => {
      const el = sectionRefs.current[s.id];
      if (el) observer.observe(el);
    });

    const onScroll = () => setShowTop(window.scrollY > 800);
    window.addEventListener("scroll", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const jumpTo = (id) => {
    setNavOpen(false);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeIndex = SECTIONS.findIndex((s) => s.id === activeId);

  return (
    <div
      className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-[family-name:var(--font-body,sans-serif)]"
      style={{
        "--bg": "#FBFBFA",
        "--ink": "#14171B",
        "--muted": "#6E7178",
        "--line": "#E4E4E1",
        "--accent": "#3B4EFF",
        "--accent-soft": "#EEF0FF",
      }}
    >
      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--line)] bg-[var(--bg)]/95 px-5 py-4 backdrop-blur md:hidden">
        <span className="font-[family-name:var(--font-display,sans-serif)] text-sm font-medium">
          Privacy Policy
        </span>
        <button
          onClick={() => setNavOpen((v) => !v)}
          aria-label={navOpen ? "Close section menu" : "Open section menu"}
          className="rounded-md border border-[var(--line)] p-2"
        >
          {navOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {navOpen && (
        <nav className="fixed inset-0 top-[57px] z-20 overflow-y-auto bg-[var(--bg)] px-5 py-4 md:hidden">
          <ol className="space-y-1">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <button
                  onClick={() => jumpTo(s.id)}
                  className={`flex w-full items-baseline gap-3 rounded-md px-3 py-2.5 text-left text-sm ${
                    s.id === activeId ? "bg-[var(--accent-soft)] text-[var(--accent)]" : "text-[var(--muted)]"
                  }`}
                >
                  <span className="font-[family-name:var(--font-mono,monospace)] text-xs tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.label}
                </button>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 pb-32 pt-10 md:grid-cols-[240px_1fr] md:gap-16 md:px-8 md:pt-20">
        {/* Desktop sidebar */}
        <aside className="hidden md:block">
          <div className="sticky top-16">
            <p className="font-[family-name:var(--font-display,sans-serif)] text-lg font-medium leading-snug">
              Privacy Policy
            </p>
            <p className="mt-1 font-[family-name:var(--font-mono,monospace)] text-xs text-[var(--muted)]">
              Effective {AGENCY.effective}
            </p>

            <ol className="mt-8 space-y-0.5 border-l border-[var(--line)]">
              {SECTIONS.map((s, i) => {
                const isActive = s.id === activeId;
                return (
                  <li key={s.id} className="relative">
                    {isActive && (
                      <span className="absolute -left-px top-0 h-full w-px bg-[var(--accent)]" />
                    )}
                    <button
                      onClick={() => jumpTo(s.id)}
                      className={`group flex w-full items-baseline gap-3 py-2 pl-4 text-left text-sm transition-colors ${
                        isActive ? "text-[var(--ink)]" : "text-[var(--muted)] hover:text-[var(--ink)]"
                      }`}
                    >
                      <span
                        className={`font-[family-name:var(--font-mono,monospace)] text-xs tabular-nums ${
                          isActive ? "text-[var(--accent)]" : "text-[var(--muted)]/70 group-hover:text-[var(--muted)]"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={isActive ? "font-medium" : ""}>{s.label}</span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <a
              href={`mailto:${AGENCY.email}`}
              className="mt-10 inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)]"
            >
              <Mail size={14} />
              {AGENCY.email}
            </a>
          </div>
        </aside>

        {/* Content */}
        <main className="min-w-0">
          <header className="max-w-[62ch] border-b border-[var(--line)] pb-10">
            <h1 className="font-[family-name:var(--font-display,sans-serif)] text-4xl font-medium tracking-tight md:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-5 text-[15px] leading-relaxed text-[var(--muted)]">
              How {AGENCY.name} collects, uses, and protects information across our site and our client work.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1 font-[family-name:var(--font-mono,monospace)] text-xs text-[var(--muted)]">
              <span>Effective {AGENCY.effective}</span>
              <span>Last updated {AGENCY.updated}</span>
            </div>
          </header>

          <div className="mt-4">
            {SECTIONS.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                ref={(el) => (sectionRefs.current[s.id] = el)}
                className="max-w-[62ch] scroll-mt-24 border-b border-[var(--line)] py-12 first:pt-10 last:border-b-0"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-[family-name:var(--font-mono,monospace)] text-xs text-[var(--accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-[family-name:var(--font-display,sans-serif)] text-2xl font-medium tracking-tight">
                    {s.label}
                  </h2>
                </div>
                <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[var(--ink)]/85">
                  {s.body}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-10 max-w-[62ch] text-xs text-[var(--muted)]">
            Reading progress: section {activeIndex + 1} of {SECTIONS.length}
          </p>
        </main>
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg)] shadow-sm transition-opacity duration-200 ${
          showTop ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ArrowUp size={16} />
      </button>
    </div>
  );
}