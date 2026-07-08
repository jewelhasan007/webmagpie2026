import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Target,
  LineChart,
  ClipboardList,
  Layers,
  Quote,
  Award,
  BarChart3,
  Sliders,
  Wrench,
  RefreshCcw,
  Briefcase,
  Check,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const plans = [
  {
    name: 'Annual Checkpoint',
    tier: '$',
    tagline: 'A yearly pulse check on your marketing.',
    includes: [
      'Full performance audit across your site and campaigns',
      'Annual recommendations to keep your brand competitive',
      'Content review measured against your business goals',
      'Year-end report with a strategic plan for what comes next',
    ],
    fit: 'Small businesses or steady brands with light, infrequent changes.',
  },
  {
    name: 'Quarterly Momentum',
    tier: '$$',
    tagline: 'Steady adjustments, every season.',
    includes: [
      'Quarterly content and design updates tied to your campaigns',
      'User behavior analysis to flag friction before it costs you',
      'Call-to-action tuning to lift engagement',
      'Quarterly reporting with next steps, not just numbers',
    ],
    fit: 'Businesses whose offers or promotions shift with the seasons.',
    featured: true,
  },
  {
    name: 'Monthly Partnership',
    tier: '$$$',
    tagline: 'A team in your corner, every month.',
    includes: [
      'Monthly content and design refreshes to stay current',
      'Ongoing performance checks for speed and usability',
      'A/B testing on key pages to grow conversions',
      'Monthly traffic and conversion reporting',
    ],
    fit: 'High-traffic sites and fast-moving businesses.',
  },
];

const phase1 = [
  {
    title: 'Goal Alignment',
    desc: 'We learn what success looks like for you and set KPIs to track it.',
  },
  {
    title: 'Digital Presence Audit',
    desc: 'A clear-eyed look at how your site and channels perform today.',
  },
  {
    title: 'Content & Funnel Roadmap',
    desc: 'Built from keyword research and real performance data.',
  },
  {
    title: 'Live Reporting Dashboard',
    desc: '24/7 access to the metrics tied to your goals.',
  },
  {
    title: 'Annual Workplan',
    desc: 'A prioritized roadmap with timelines you can hold us to.',
  },
];

const phase2 = [
  {
    title: 'Messaging Guides',
    desc: 'Brand voice and guidelines to keep every asset on-tone.',
  },
  {
    title: 'Social Content',
    desc: 'Copy and design crafted for each platform you run.',
  },
  {
    title: 'Email & Automation',
    desc: 'CRM-ready campaigns, from one-off sends to full drip flows.',
  },
  {
    title: 'Print Materials',
    desc: 'Flyers, postcards, and collateral built to match your brand.',
  },
  {
    title: 'Website Execution',
    desc: 'Copy, design, and implementation, handled end to end.',
  },
];

const reasons = [
  {
    icon: Award,
    title: 'Experienced Team',
    desc: 'Specialists across strategy, design, and copy — not generalists.',
  },
  {
    icon: BarChart3,
    title: 'Transparent Reporting',
    desc: 'Live access to the data behind every decision we make.',
  },
  {
    icon: Sliders,
    title: 'Tiered Pricing',
    desc: 'Plans built to match your goals and your budget.',
  },
  {
    icon: Wrench,
    title: 'In-House Execution',
    desc: 'Strategy, design, and build all handled by one team.',
  },
  {
    icon: RefreshCcw,
    title: 'Routine Check-Ins',
    desc: 'Monthly or quarterly calls keep everyone aligned.',
  },
  {
    icon: Briefcase,
    title: 'Hands-On Management',
    desc: "We keep the project moving so you don't have to.",
  },
];

/* ─────────────────────────────────────────────
   Small building blocks
───────────────────────────────────────────── */
const FadeIn = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

const Eyebrow = ({ children, dark }) => (
  <span
    className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[3px] ${
      dark ? 'text-[#22C55E]' : 'text-[#22C55E]'
    }`}
  >
    <span className="w-6 h-[2px] bg-[#22C55E]" />
    {children}
  </span>
);

/* ─────────────────────────────────────────────
   Section 1 — Hero
───────────────────────────────────────────── */
const Hero = () => (
  <section className="relative bg-[#162660] pt-40 pb-28 px-6 overflow-hidden">
    <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#22C55E]/10 blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-[#22C55E]/5 blur-3xl pointer-events-none" />

    <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <FadeIn>
        <Eyebrow dark>Marketing Consulting & Execution</Eyebrow>

        <h1 className="mt-5 text-4xl md:text-5xl font-extrabold text-white leading-tight">
          A data-backed strategy, with a team to carry it out
        </h1>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {['Strategic goal setting', 'Tailored marketing plans', 'In-house execution'].map(
            (item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/80"
              >
                <Check size={15} className="text-[#22C55E]" />
                {item}
              </span>
            )
          )}
        </div>

        <p className="mt-6 text-white/60 text-base leading-relaxed max-w-xl">
          WebMagpie partners with established organizations ready to get more out of their
          marketing. Our consulting and execution retainer gives you a dedicated team to plan
          and build your campaigns, from digital to print, rooted in data and adjusted every
          quarter as your priorities change.
        </p>

        <Link
          to="/contact"
          className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 shadow-lg"
        >
          Join The Waitlist
          <ArrowRight size={16} />
        </Link>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="relative aspect-square max-w-md mx-auto">
          <div className="absolute inset-6 rounded-[2.5rem] bg-[#1e2d50] border border-white/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 p-8">
              {[Target, LineChart, ClipboardList, Layers].map((Icon, i) => (
                <div
                  key={i}
                  className="w-24 h-24 rounded-2xl bg-[#22C55E]/15 border border-[#22C55E]/20 flex items-center justify-center"
                >
                  <Icon className="text-[#22C55E]" size={30} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   Section 2 — Plans
───────────────────────────────────────────── */
const Plans = () => (
  <section className="bg-white py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <FadeIn className="text-center max-w-2xl mx-auto mb-16">
        <Eyebrow>Retainer Options</Eyebrow>
        <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-[#1e2d50]">
          Plans built around your pace
        </h2>
        <p className="mt-4 text-gray-500">
          From a light annual checkup to a full monthly partnership — find the cadence that
          matches how fast your business moves.
        </p>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <FadeIn key={plan.name} delay={i * 0.1}>
            <div
              className={`h-full rounded-2xl p-8 border transition-all duration-300 ${
                plan.featured
                  ? 'bg-[#1e2d50] border-[#22C55E]/30 shadow-2xl lg:-translate-y-3'
                  : 'bg-white border-gray-200 hover:border-[#22C55E]/40 hover:shadow-xl'
              }`}
            >
              {plan.featured && (
                <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#22C55E]/15 text-[#22C55E] text-[11px] font-bold uppercase tracking-widest">
                  Most Popular
                </span>
              )}

              <h3
                className={`text-xl font-bold ${plan.featured ? 'text-white' : 'text-[#1e2d50]'}`}
              >
                {plan.name}
              </h3>
              <p
                className={`text-sm mt-1 mb-4 ${plan.featured ? 'text-white/50' : 'text-gray-500'}`}
              >
                {plan.tagline}
              </p>

              <div
                className={`text-2xl font-extrabold tracking-widest mb-6 ${
                  plan.featured ? 'text-[#22C55E]' : 'text-[#22C55E]'
                }`}
              >
                {plan.tier}
              </div>

              <ul className="flex flex-col gap-3 mb-6">
                {plan.includes.map((line) => (
                  <li
                    key={line}
                    className={`flex items-start gap-2.5 text-sm leading-relaxed ${
                      plan.featured ? 'text-white/70' : 'text-gray-600'
                    }`}
                  >
                    <Check size={16} className="text-[#22C55E] mt-0.5 flex-shrink-0" />
                    {line}
                  </li>
                ))}
              </ul>

              <div
                className={`pt-4 border-t text-xs leading-relaxed ${
                  plan.featured ? 'border-white/10 text-white/40' : 'border-gray-100 text-gray-400'
                }`}
              >
                <span className="font-bold uppercase tracking-widest mr-2">Perfect for</span>
                {plan.fit}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.3} className="text-center mt-14">
        <p className="text-gray-500 mb-4">Looking for something custom? No problem.</p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-7 py-3 border-2 border-[#1e2d50] text-[#1e2d50] rounded-full text-sm font-bold hover:bg-[#1e2d50] hover:text-white transition-all duration-300"
        >
          Reach Out Today
          <ArrowRight size={16} />
        </Link>
      </FadeIn>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   Section 3 — How It Works
───────────────────────────────────────────── */
const PhaseList = ({ items }) => (
  <div className="flex flex-col gap-5">
    {items.map((item) => (
      <div key={item.title} className="flex gap-4">
        <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-2.5 flex-shrink-0" />
        <div>
          <p className="font-bold text-[#1e2d50] text-sm">{item.title}</p>
          <p className="text-gray-500 text-sm leading-relaxed mt-0.5">{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

const HowItWorks = () => (
  <section className="bg-gray-50 py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <FadeIn className="max-w-2xl mb-16">
        <Eyebrow>How It Works</Eyebrow>
        <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-[#1e2d50]">
          Every engagement starts with discovery
        </h2>
        <p className="mt-4 text-gray-500">
          No two clients look alike, so every consulting relationship begins with a deep look
          at where you stand today before we build a plan around it.
        </p>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-10">
        <FadeIn delay={0.1}>
          <div className="bg-white rounded-2xl p-8 border border-gray-200 h-full">
            <span className="text-xs font-bold uppercase tracking-widest text-[#22C55E]">
              Phase 1
            </span>
            <h3 className="text-xl font-bold text-[#1e2d50] mt-2 mb-6">Assessment & Planning</h3>
            <PhaseList items={phase1} />
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="bg-white rounded-2xl p-8 border border-gray-200 h-full">
            <span className="text-xs font-bold uppercase tracking-widest text-[#22C55E]">
              Phase 2
            </span>
            <h3 className="text-xl font-bold text-[#1e2d50] mt-2 mb-6">
              Execution & Optimization
            </h3>
            <PhaseList items={phase2} />
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.3} className="text-center mt-10">
        <p className="text-gray-500 text-sm">
          We stay close through monthly or quarterly check-ins, adjusting tactics as your data
          and priorities shift.
        </p>
      </FadeIn>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   Section 4 — Why Choose Us
───────────────────────────────────────────── */
const WhyChooseUs = () => (
  <section className="relative bg-[#162660] py-24 px-6 overflow-hidden">
    <div className="absolute -left-20 top-1/4 w-72 h-72 rounded-full bg-[#22C55E]/10 blur-3xl pointer-events-none" />

    <div className="relative max-w-7xl mx-auto">
      <FadeIn className="max-w-2xl mb-14">
        <Eyebrow dark>Why WebMagpie</Eyebrow>
        <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-white">
          Why choose us for consulting?
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} className="mb-16">
        <div className="bg-[#1e2d50] border border-white/10 rounded-2xl p-8 md:p-10 max-w-3xl">
          <Quote className="text-[#22C55E]" size={28} />
          <p className="text-white/80 text-lg leading-relaxed mt-4 mb-5">
            Having a dedicated team plan and execute our marketing has taken a huge weight off
            our shoulders — and the results have followed.
          </p>
          <p className="text-white/40 text-sm font-semibold">
            Marketing Director, Regional Healthcare Nonprofit
          </p>
        </div>
      </FadeIn>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reasons.map((reason, i) => {
          const Icon = reason.icon;
          return (
            <FadeIn key={reason.title} delay={i * 0.08}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="text-[#22C55E]" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">{reason.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   Section 5 — Final CTA
───────────────────────────────────────────── */
const FinalCta = () => (
  <section className="bg-white py-24 px-6">
    <div className="max-w-5xl mx-auto">
      <FadeIn>
        <div className="relative rounded-3xl bg-[#1e2d50] px-8 md:px-16 py-16 text-center overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[#22C55E]/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/5 blur-3xl pointer-events-none" />

          <h2 className="relative z-10 text-3xl md:text-4xl font-extrabold text-white leading-snug">
            Your next best marketing hire is a whole team
          </h2>
          <p className="relative z-10 text-white/60 mt-4 max-w-xl mx-auto">
            We'd love to work with you — spots are limited while we onboard our current
            waitlist, so the sooner you reach out, the sooner we can start.
          </p>
          <Link
            to="/contact"
            className="relative z-10 inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Join Our Waitlist
            <ArrowRight size={16} />
          </Link>
        </div>
      </FadeIn>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
const MarketingConsulting = () => (
  <main className="bg-white">
    <Hero />
    <Plans />
    <HowItWorks />
    <WhyChooseUs />
    <FinalCta />
  </main>
);

export default MarketingConsulting;