"use client";

import { useMemo, useState } from "react";
import { Plus, Search, Rows3, AlignJustify } from "lucide-react";

/**
 * Terms & Conditions — accordion / contract-review layout.
 *
 * Deliberately different UX from the scroll-spy sidebar version:
 * a single centered column styled like a document you'd actually sign,
 * with clauses that expand one at a time (or all at once), a horizontal
 * clause-jump strip instead of a side rail, and a live filter so a client
 * can find "payment" or "termination" without reading the whole thing.
 *
 * Drop into app/terms/page.jsx (App Router) or pages/terms.jsx.
 * Edit AGENCY and SECTIONS to match your business.
 *
 * Fonts: Fraunces (serif display, for the clause titles — gives it the
 * weight of a real contract) + Ubuntu (body + UI) + Ubuntu Mono (meta).
 * Load in your root layout:
 *
 *   import { Fraunces, Ubuntu, Ubuntu_Mono } from "next/font/google";
 *   const display = Fraunces({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-display" });
 *   const body = Ubuntu({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-body" });
 *   const mono = Ubuntu_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono" });
 *
 * apply to <html className={`${display.variable} ${body.variable} ${mono.variable}`}>
 */

const AGENCY = {
  name: "Meridian Digital",
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
    summary: "Using our site or signing a proposal means you agree to these terms.",
    body: (
      <>
        <p>
          By visiting our site, submitting an inquiry, or signing a proposal with {AGENCY.name} ("we," "us,"
          "our"), you agree to these Terms & Conditions. If you're accepting on behalf of a company, you
          confirm you have authority to bind that company.
        </p>
        <p>
          Where a signed statement of work (SOW) conflicts with this page, the signed agreement governs for
          that engagement.
        </p>
      </>
    ),
  },
  {
    id: "services",
    label: "Our services",
    summary: "Web development, SEO, and digital marketing, scoped per project.",
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
          Exact deliverables, timelines, and pricing live in your SOW — this page covers the terms shared
          across every engagement.
        </p>
      </>
    ),
  },
  {
    id: "client-responsibilities",
    label: "Client responsibilities",
    summary: "Timely feedback and assets keep your project on schedule.",
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
          Delays in feedback or assets push timelines back by an equivalent amount — we'll flag this as it
          happens rather than absorb it silently.
        </p>
      </>
    ),
  },
  {
    id: "payment",
    label: "Payment terms",
    summary: "Invoices, due dates, and what happens if payment is late.",
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
    summary: "You own the finished work once it's paid for.",
    body: (
      <>
        <p>
          Once a project is paid in full, ownership of the final deliverables — the website, designs, and copy
          created specifically for you — transfers to you. We retain the right to display the work in our
          portfolio and case studies unless you ask us not to.
        </p>
        <p className="mt-4">
          We retain ownership of our own pre-existing tools, frameworks, boilerplate code, and internal
          processes used to build your project, and license them to you as part of the delivered work.
        </p>
      </>
    ),
  },
  {
    id: "revisions",
    label: "Timelines & revisions",
    summary: "Estimates depend on you; extra rounds are billed separately.",
    body: (
      <>
        <p>
          Project timelines in your SOW are estimates based on timely feedback and asset delivery from your
          side. Each phase includes a set number of revision rounds; additional rounds are billed at our
          standard hourly rate.
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
    summary: "We recommend tools in good faith; we don't control their policies.",
    body: (
      <>
        <p>
          Our work often relies on third-party platforms — hosting providers, CMSs, ad platforms, plugins, and
          SaaS tools. We recommend tools in good faith, but don't control their pricing, uptime, or policy
          changes, and aren't liable for outages or costs on your platform accounts.
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
    summary: "We don't guarantee rankings, traffic, or revenue outcomes.",
    body: (
      <>
        <p>
          We'll perform services with reasonable skill and care, consistent with industry standards. We don't
          guarantee specific search rankings, traffic, ad performance, or revenue outcomes — these depend on
          factors outside our control, including algorithm changes and market conditions.
        </p>
        <p className="mt-4">
          Except as stated in your SOW, services are provided "as is," without warranties of any kind, to the
          extent permitted by law.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    label: "Limitation of liability",
    summary: "Our liability is capped at recent fees paid.",
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
    summary: "Both sides keep the other's business information private.",
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
    summary: "Either party can end an engagement with notice.",
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
    summary: `These terms follow the laws of ${AGENCY.jurisdiction}.`,
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
    summary: "We'll update the date here whenever terms change.",
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
    summary: "Questions about these terms or an active engagement.",
    body: (
      <div className="mt-1 flex flex-col gap-1 font-[family-name:var(--font-mono,monospace)] text-sm text-[var(--ink)]">
        <span>{AGENCY.name}</span>
        <span>{AGENCY.address}</span>
        <a href={`mailto:${AGENCY.email}`} className="w-fit text-[var(--accent)] hover:underline">
          {AGENCY.email}
        </a>
      </div>
    ),
  },
];

export default function TermsAndConditionsPage() {
  const [openId, setOpenId] = useState(SECTIONS[0].id);
  const [expandAll, setExpandAll] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SECTIONS;
    return SECTIONS.filter(
      (s) => s.label.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q)
    );
  }, [query]);

  const toggle = (id) => {
    if (expandAll) return;
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <div
      className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-[family-name:var(--font-body,sans-serif)]"
      style={{
        "--bg": "#F4F3EF",
        "--card": "#FFFFFF",
        "--ink": "#211D18",
        "--muted": "#7A756C",
        "--line": "#DEDAD1",
        "--accent": "#0E6B5C",
        "--accent-soft": "#E4F0EC",
      }}
    >
      <div className="mx-auto max-w-[640px] px-5 pb-32 pt-14 md:pt-20">
        {/* Header, styled like a cover sheet */}
        <header className="border-b-2 border-[var(--ink)] pb-8">
          <p className="font-[family-name:var(--font-mono,monospace)] text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
            {AGENCY.name} — Agreement
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display,serif)] text-[2.6rem] font-semibold leading-[1.05] tracking-tight md:text-5xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-[var(--muted)]">
            The clauses that govern working with us — from proposal to project delivery. Search a clause or
            open them one at a time below.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 font-[family-name:var(--font-mono,monospace)] text-xs text-[var(--muted)]">
            <span>Effective {AGENCY.effective}</span>
            <span>Last updated {AGENCY.updated}</span>
            <span>{SECTIONS.length} clauses</span>
          </div>
        </header>

        {/* Controls: search + expand toggle */}
        <div className="sticky top-0 z-10 -mx-5 mt-6 flex items-center gap-3 bg-[var(--bg)]/95 px-5 py-3 backdrop-blur">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2.5">
            <Search size={15} className="shrink-0 text-[var(--muted)]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find a clause — e.g. payment, IP, termination"
              className="w-full bg-transparent text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none"
            />
          </div>
          <button
            onClick={() => setExpandAll((v) => !v)}
            aria-pressed={expandAll}
            className="flex shrink-0 items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2.5 text-sm text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {expandAll ? <Rows3 size={15} /> : <AlignJustify size={15} />}
            <span className="hidden sm:inline">{expandAll ? "Collapse" : "Read all"}</span>
          </button>
        </div>

        {/* Clause list */}
        <ol className="mt-4 divide-y divide-[var(--line)] border-b border-[var(--line)]">
          {filtered.length === 0 && (
            <li className="py-10 text-center text-sm text-[var(--muted)]">
              No clause matches "{query}".
            </li>
          )}
          {filtered.map((s, i) => {
            const isOpen = expandAll || openId === s.id;
            return (
              <li key={s.id}>
                <button
                  onClick={() => toggle(s.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start gap-4 py-6 text-left"
                >
                  <span className="mt-0.5 font-[family-name:var(--font-display,serif)] text-lg text-[var(--muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-4">
                      <span className="font-[family-name:var(--font-display,serif)] text-xl font-medium tracking-tight">
                        {s.label}
                      </span>
                      {!expandAll && (
                        <Plus
                          size={16}
                          className={`shrink-0 text-[var(--muted)] transition-transform duration-200 ${
                            isOpen ? "rotate-45 text-[var(--accent)]" : ""
                          }`}
                        />
                      )}
                    </span>
                    {!isOpen && (
                      <span className="mt-1 block text-sm text-[var(--muted)]">{s.summary}</span>
                    )}
                    <div
                      className="grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <div className="mt-4 max-w-[54ch] space-y-4 text-[15px] leading-relaxed text-[var(--ink)]/85">
                          {s.body}
                        </div>
                      </div>
                    </div>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <p className="mt-8 text-center text-xs text-[var(--muted)]">
          Questions? Write to{" "}
          <a href={`mailto:${AGENCY.email}`} className="text-[var(--accent)] hover:underline">
            {AGENCY.email}
          </a>
        </p>
      </div>
    </div>
  );
}