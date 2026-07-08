import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Plus,
  Minus,
  Search,
  BarChart3,
  Megaphone,
  Mail,
  Share2,
  PenTool,
  Gauge,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const stats = [
  { value: '3.4x', label: 'Average lift in qualified leads' },
  { value: '48hrs', label: 'Turnaround on campaign changes' },
  { value: '92%', label: 'Clients still with us after year one' },
];

const timeline = [
  {
    step: '01',
    title: 'Discover',
    window: 'Week 1–2',
    desc: 'Audit your channels, your competitors, and the data you already have sitting unused.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Plan',
    window: 'Week 3',
    desc: 'A prioritized roadmap with the channels, budget split, and KPIs we will hold ourselves to.',
    icon: Gauge,
  },
  {
    step: '03',
    title: 'Launch',
    window: 'Week 4+',
    desc: 'Campaigns go live across paid, organic, and email — built and managed in-house.',
    icon: Megaphone,
  },
  {
    step: '04',
    title: 'Refine',
    window: 'Ongoing',
    desc: 'Monthly reporting turns into next month\u2019s plan, not just a look back.',
    icon: BarChart3,
  },
];

const channels = [
  {
    icon: Search,
    name: 'SEO',
    desc: 'Rank for the terms your buyers actually search.',
    image: '/how-marketing/seo.jpg',
  },
  {
    icon: Megaphone,
    name: 'Paid Media',
    desc: 'Search and social ads managed to a target CPA.',
    image: '/how-marketing/paid.jpg',
  },
  {
    icon: Mail,
    name: 'Email & CRM',
    desc: 'Lifecycle flows that turn leads into repeat customers.',
    image: '/how-marketing/email.jpg',
  },
  {
    icon: Share2,
    name: 'Social',
    desc: 'Organic content calendars built around your goals.',
    image: '/how-marketing/social.jpg',
  },
  {
    icon: PenTool,
    name: 'Content',
    desc: 'Blogs, guides, and landing pages that convert.',
    image: '/how-marketing/content.jpg',
  },
  {
    icon: BarChart3,
    name: 'Analytics',
    desc: 'Dashboards that tie spend directly to revenue.',
    image: '/how-marketing/analytics.jpg',
  },
];

const billing = {
  monthly: [
    { name: 'Starter', price: '$1,200', per: '/mo', blurb: 'One channel, done right.' },
    {
      name: 'Growth',
      price: '$3,000',
      per: '/mo',
      blurb: 'Multi-channel management with a dedicated strategist.',
      featured: true,
    },
    { name: 'Scale', price: '$4,500', per: '/mo', blurb: 'Full-funnel coverage for larger budgets.' },
  ],
  quarterly: [
    { name: 'Starter', price: '$1,100', per: '/mo, billed quarterly', blurb: 'One channel, done right.' },
    {
      name: 'Growth',
      price: '$2,500',
      per: '/mo, billed quarterly',
      blurb: 'Multi-channel management with a dedicated strategist.',
      featured: true,
    },
    { name: 'Scale', price: '$4,000', per: '/mo, billed quarterly', blurb: 'Full-funnel coverage for larger budgets.' },
  ],
};

const faqs = [
  {
    q: 'How fast will we see results?',
    a: 'Paid channels typically show movement within the first 30 days. SEO and content compound over 3–6 months as authority builds.',
  },
  {
    q: 'Do you work with our existing tools?',
    a: 'Yes — we plug into whatever CRM, analytics, or ad platforms you already use rather than asking you to switch.',
  },
  {
    q: 'Is there a minimum contract length?',
    a: 'Our plans run month to month after an initial 90-day ramp-up period, which is how long it takes most channels to find their footing.',
  },
  {
    q: 'What if we only need one channel?',
    a: 'The Starter plan is built for exactly that — pick the single channel that matters most and we\u2019ll run it well.',
  },
];

/* ─────────────────────────────────────────────
   Small building blocks
───────────────────────────────────────────── */
const FadeIn = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.55, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─────────────────────────────────────────────
   Section 1 — Hero with stat rail
───────────────────────────────────────────── */
const Hero = () => (
  <section className="bg-[#162660] pt-40 pb-20 px-6">
    <div className="max-w-7xl mx-auto">
      <FadeIn className="max-w-3xl">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[3px] text-[#22C55E]">
          <span className="w-6 h-[2px] bg-[#22C55E]" />
          Digital Marketing Consulting
        </span>

        <h1 className="mt-5 text-4xl md:text-6xl font-extrabold text-white leading-[1.1]">
          Marketing that earns its budget back
        </h1>

        <p className="mt-6 text-white/60 text-lg leading-relaxed max-w-2xl">
          We plan and run digital marketing for businesses that have outgrown guesswork —
          SEO, paid media, email, and social, managed by one in-house team and tied to numbers
          you can hold us accountable to.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Book A Strategy Call
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white rounded-full text-sm font-bold hover:border-[#22C55E] hover:text-[#22C55E] transition-all duration-300"
          >
            See Client Results
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="mt-16 grid sm:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[#1e2d50] p-8">
              <div className="text-3xl md:text-4xl font-extrabold text-[#22C55E]">
                {stat.value}
              </div>
              <p className="text-white/50 text-sm mt-2 leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   Section 2 — Channels grid
───────────────────────────────────────────── */
const Channels = () => (
  <section className="bg-white py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <FadeIn className="max-w-2xl mb-14">
        <span className="text-xs font-bold uppercase tracking-[3px] text-[#22C55E]">
          Where We Focus
        </span>
        <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-[#1e2d50]">
          One team, every channel that matters
        </h2>
        <p className="mt-4 text-gray-500">
          You don't need six vendors who don't talk to each other. We run the channels that
          drive your business, under one strategy.
        </p>
      </FadeIn>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {channels.map((channel, i) => {
          const Icon = channel.icon;
          return (
            <FadeIn key={channel.name} delay={i * 0.06}>
              <div
                className="group relative h-64 rounded-2xl overflow-hidden border border-gray-100 bg-gray-100 bg-cover bg-center"
                style={{ backgroundImage: `url(${channel.image})` }}
              >
                {/* Dark gradient so the text stays readable over any photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c40]/95 via-[#0f1c40]/40 to-[#0f1c40]/10 transition-opacity duration-300 group-hover:from-[#0f1c40]/90" />

                <div className="relative z-10 h-full flex flex-col justify-end p-7">
                  <div className="w-11 h-11 rounded-xl bg-[#22C55E]/20 backdrop-blur-sm border border-[#22C55E]/30 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:-translate-y-1">
                    <Icon className="text-[#22C55E]" size={20} />
                  </div>
                  <h3 className="font-bold text-white text-base mb-1.5">{channel.name}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{channel.desc}</p>
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
   Section 3 — Horizontal process timeline
───────────────────────────────────────────── */
const ProcessTimeline = () => (
  <section className="bg-gray-50 py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <FadeIn className="max-w-2xl mb-16">
        <span className="text-xs font-bold uppercase tracking-[3px] text-[#22C55E]">
          The Process
        </span>
        <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-[#1e2d50]">
          From audit to live campaign in four weeks
        </h2>
      </FadeIn>

      <div className="relative">
        <div className="hidden lg:block absolute top-[22px] left-0 right-0 h-px bg-gray-200" />
        <div className="grid lg:grid-cols-4 gap-10">
          {timeline.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.step} delay={i * 0.1}>
                <div className="relative">
                  <div className="hidden lg:flex w-11 h-11 rounded-full bg-[#1e2d50] items-center justify-center relative z-10 mb-6">
                    <Icon className="text-[#22C55E]" size={18} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    {item.window}
                  </span>
                  <h3 className="text-lg font-bold text-[#1e2d50] mt-1 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   Section 4 — Pricing with billing toggle
───────────────────────────────────────────── */
const Pricing = () => {
  const [cycle, setCycle] = useState('monthly');
  const plans = billing[cycle];

  return (
    <section className="bg-[#162660] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-[3px] text-[#22C55E]">
            Investment
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-white">
            Pricing that scales with your budget
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} className="flex justify-center mb-14">
          <div className="inline-flex bg-[#1e2d50] border border-white/10 rounded-full p-1">
            {['monthly', 'quarterly'].map((option) => (
              <button
                key={option}
                onClick={() => setCycle(option)}
                className={`px-5 py-2 rounded-full text-sm font-bold capitalize transition-all duration-300 ${
                  cycle === option
                    ? 'bg-[#22C55E] text-white'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {option}
                {option === 'quarterly' && (
                  <span className="ml-1.5 text-[10px] font-bold opacity-80">Save 15%</span>
                )}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.1}>
              <div
                className={`h-full rounded-2xl p-8 border ${
                  plan.featured
                    ? 'bg-white border-[#22C55E]/30 shadow-2xl lg:-translate-y-3'
                    : 'bg-[#1e2d50] border-white/10'
                }`}
              >
                {plan.featured && (
                  <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#22C55E]/15 text-[#22C55E] text-[11px] font-bold uppercase tracking-widest">
                    Most Popular
                  </span>
                )}
                <h3
                  className={`text-lg font-bold ${plan.featured ? 'text-[#1e2d50]' : 'text-white'}`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mt-1 mb-6 ${
                    plan.featured ? 'text-gray-500' : 'text-white/50'
                  }`}
                >
                  {plan.blurb}
                </p>
                <div className="flex items-baseline gap-1.5 mb-8">
                  <span
                    className={`text-3xl font-extrabold ${
                      plan.featured ? 'text-[#1e2d50]' : 'text-white'
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-xs ${plan.featured ? 'text-gray-400' : 'text-white/40'}`}
                  >
                    {plan.per}
                  </span>
                </div>
                <Link
                  to="/contact"
                  className={`block text-center py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                    plan.featured
                      ? 'bg-[#22C55E] hover:bg-[#16A34A] text-white'
                      : 'border border-white/20 text-white hover:border-[#22C55E] hover:text-[#22C55E]'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   Section 5 — FAQ accordion
───────────────────────────────────────────── */
const FaqItem = ({ item, isOpen, onToggle }) => (
  <div className="border-b border-gray-200 py-6">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between text-left gap-4"
    >
      <span className="font-bold text-[#1e2d50] text-base">{item.q}</span>
      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
        {isOpen ? <Minus size={14} className="text-[#22C55E]" /> : <Plus size={14} className="text-gray-500" />}
      </span>
    </button>
    <motion.div
      initial={false}
      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="overflow-hidden"
    >
      <p className="text-gray-500 text-sm leading-relaxed pt-4 pr-10">{item.a}</p>
    </motion.div>
  </div>
);

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="mb-12">
          <span className="text-xs font-bold uppercase tracking-[3px] text-[#22C55E]">
            Common Questions
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-[#1e2d50]">
            Before you reach out
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div>
            {faqs.map((item, i) => (
              <FaqItem
                key={item.q}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   Section 6 — Final CTA
───────────────────────────────────────────── */
const FinalCta = () => (
  <section className="bg-gray-50 py-24 px-6">
    <div className="max-w-5xl mx-auto">
      <FadeIn>
        <div className="relative rounded-3xl bg-[#1e2d50] px-8 md:px-16 py-16 text-center overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[#22C55E]/10 blur-3xl pointer-events-none" />
          <h2 className="relative z-10 text-3xl md:text-4xl font-extrabold text-white leading-snug">
            Let's find the channels worth your budget
          </h2>
          <p className="relative z-10 text-white/60 mt-4 max-w-xl mx-auto">
            A 30-minute call is enough for us to tell you honestly where the opportunity is —
            no pitch deck required.
          </p>
          <Link
            to="/contact"
            className="relative z-10 inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Book A Strategy Call
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
const DigitalMarketingConsulting = () => (
  <main className="bg-white">
    <Hero />
    <Channels />
    <ProcessTimeline />
    <Pricing />
    <Faq />
    <FinalCta />
  </main>
);

export default DigitalMarketingConsulting;