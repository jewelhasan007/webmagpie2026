"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUp, Mail } from "lucide-react";

/**
 * Terms & Conditions page for a web dev / SEO / digital marketing agency.
 * Shares the same design system as PrivacyPolicyPage.jsx — sticky numbered
 * TOC with scroll-spy, Ubuntu type, indigo accent — so the two pages read
 * as one product.
 *
 * Drop this into app/terms/page.jsx (App Router) or pages/terms.jsx
 * (Pages Router). Swap the placeholders in AGENCY for your real details,
 * and edit SECTIONS to match how you actually work.
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
  email: "hello@meridiandigital.com",
  address: "48 Foundry Lane, Suite 300, Austin, TX 78701",
  effective: "September 1, 2026",
  updated: "September 1, 2026",
  jurisdiction: "the State of Texas",
};

const SECTIONS = [
  {
    id: "acceptance",
    label: "Acceptance of terms",
    body: (
      <>
        <p>
          By visiting {AGENCY.site}, submitting an inquiry, or signing a proposal with {AGENCY.name} ("we,"
          "us," "our"), you agree to these Terms & Conditions. If you're accepting on behalf of a company, you
          confirm you have authority to bind that company.
        </p>
        <p>
          Where a signed statement of work (SOW) or master services agreement conflicts with this page, the
          signed agreement governs for that engagement.
        </p>
      </>
    ),
  },
  {
    id: "services",
    label: "Our services",
    body: (
      <>
        <p>We provide website design and development, SEO, and digital marketing services, which may include:</p>
        <ul className="mt-4 space-y-2 list-disc pl-5 marker:text-[var(--accent)]">
          <li>Custom website design, development, and hosting setup</li>
          <li>On-page, technical, and off-page SEO</li>
          <li>Paid advertising management (search, social, display)</li>
          <li>Content strategy, copywriting, and email marketing</li>
          <li>Analytics setup and reporting</li>
        </ul>
        <p className="mt-4">
          Exact deliverables, timelines, and pricing for each engagement are set out in your SOW, not this
          page — this page covers the terms that apply across all engagements.
        </p>
      </>
    ),
  },
  {
    id: "client-responsibilities",
    label: "Client responsibilities",
    body: (
      <>
        <p>To deliver on schedule, we need you to:</p>
        <ul className="mt-4 space-y-2 list-disc pl-5 marker:text-[var(--accent)]">
          <li>Provide content, brand assets, and account access on the dates in your SOW</li>
          <li>Give feedback within the review windows we agree on</li>
          <li>Designate one point of contact authorized to approve work</li>
          <li>Hold rights to any content, images, or trademarks you supply us</li>
        </ul>
        <p className="mt-4">
          Delays in feedback or asset delivery push project timelines back by an equivalent amount — we'll
          flag this as it happens rather than silently absorbing it.
        </p>
      </>
    ),
  },
  {
    id: "payment",
    label: "Payment terms",
    body: (
      <>
        <p>
          Project work is billed per the schedule in your SOW — typically a deposit before kickoff, milestone
          payments, or a fixed monthly retainer. Invoices are due within 15 days unless your SOW states
          otherwise.
        </p>
        <p className="mt-4">
          Accounts more than 30 days overdue may have work paused until the balance is settled. Late payments
          may carry a 1.5% monthly late fee where permitted by law. Retainers renew automatically each period
          until cancelled per the notice period in your SOW.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    label: "Intellectual property",
    body: (
      <>
        <p>
          Once a project is paid in full, ownership of the final deliverables — the website, designs, and
          copy created specifically for you — transfers to you. We retain the right to display the work in
          our portfolio and case studies unless you ask us not to.
        </p>
        <p className="mt-4">
          We retain ownership of our own pre-existing tools, frameworks, boilerplate code, and internal
          processes used to build your project, and license them to you for use as part of the delivered
          work.
        </p>
      </>
    ),
  },
  {
    id: "revisions",
    label: "Timelines & revisions",
    body: (
      <>
        <p>
          Project timelines in your SOW are estimates based on timely feedback and asset delivery from your
          side. Each project phase includes a set number of revision rounds; additional rounds are billed at
          our standard hourly rate.
        </p>
        <p className="mt-4">
          Scope changes requested after a phase is approved are treated as new work and quoted separately
          before we begin.
        </p>
      </>
    ),
  },
  {
    id: "third-party-tools",
    label: "Third-party tools & platforms",
    body: (
      <>
        <p>
          Our work often relies on third-party platforms — hosting providers, CMSs, ad platforms, plugins,
          and SaaS tools. We'll recommend tools in good faith, but we don't control their pricing, uptime, or
          policy changes, and aren't liable for outages or costs on your platform accounts.
        </p>
        <p className="mt-4">
          Where we manage ad spend on your behalf, that spend is billed separately from our fees and paid
          directly to the platform or reimbursed to us per your SOW.
        </p>
      </>
    ),
  },
  {
    id: "warranties",
    label: "Warranties & disclaimers",
    body: (
      <>
        <p>
          We'll perform services with reasonable skill and care, consistent with industry standards. We don't
          guarantee specific search rankings, traffic, ad performance, or revenue outcomes — these depend on
          factors outside our control, including algorithm changes and market conditions.
        </p>
        <p className="mt-4">
          Except as stated in your SOW, services are provided "as is," without warranties of any kind, express
          or implied, to the extent permitted by law.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    label: "Limitation of liability",
    body: (
      <p>
        To the extent permitted by law, {AGENCY.name}'s total liability for any claim arising from an
        engagement is capped at the fees paid for that engagement in the preceding 3 months. We aren't liable
        for indirect, incidental, or consequential damages, including lost profits or lost data.
      </p>
    ),
  },
  {
    id: "confidentiality",
    label: "Confidentiality",
    body: (
      <p>
        Both parties agree to keep the other's confidential business information private, and to use it only
        to carry out the engagement. This obligation survives the end of our working relationship and doesn't
        apply to information that becomes public through no fault of either party.
      </p>
    ),
  },
  {
    id: "termination",
    label: "Termination",
    body: (
      <>
        <p>
          Either party may end an engagement with the notice period stated in your SOW (typically 30 days for
          retainers). You'll be billed for work completed and expenses incurred up to the termination date.
        </p>
        <p className="mt-4">
          We may pause or end work immediately if payment is significantly overdue or if continuing would
          require us to act unlawfully.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    label: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of {AGENCY.jurisdiction}, without regard to conflict-of-law
        principles. Disputes will first go through good-faith negotiation before either party pursues formal
        proceedings.
      </p>
    ),
  },
  {
    id: "changes",
    label: "Changes to these terms",
    body: (
      <p>
        We may update these terms as our services evolve, and we'll update the date below when we do. Changes
        don't apply retroactively to an already-signed SOW unless we agree to them in writing.
      </p>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    body: (
      <>
        <p>Questions about these terms or an active engagement:</p>
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

export default function TermsAndConditionsPage() {
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
          Terms & Conditions
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
              Terms &amp; Conditions
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
              Terms &amp; Conditions
            </h1>
            <p className="mt-5 text-[15px] leading-relaxed text-[var(--muted)]">
              The terms that govern working with {AGENCY.name} — from proposal to project delivery.
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