import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

/* ─────────────────────────────────────────────
   FAQ data — grouped by the same service
   categories used on the Pricing page so the
   nav submenu / anchors line up.
───────────────────────────────────────────── */
export const faqCategories = [
  {
    id: 'web-development',
    label: 'Web Development',
    faqs: [
      {
        question: 'How long does it take to build a website?',
        answer:
          'Most standard sites (3–10 pages) take 3–5 weeks from kickoff to launch, depending on scope, content readiness, and revision rounds. Larger custom web apps or e-commerce builds typically run 6–10 weeks. We\'ll give you a firm timeline once we scope your project.',
      },
      {
        question: 'What platforms or technologies do you build with?',
        answer:
          'We build custom sites with modern React and Tailwind CSS for speed, flexibility, and long-term maintainability. For content-heavy sites we can pair that with a headless CMS so your team can update pages without touching code.',
      },
      {
        question: 'Do you offer ongoing website maintenance after launch?',
        answer:
          'Yes. Every project includes a post-launch support window (30–180 days depending on package), and we offer ongoing maintenance plans after that for updates, security patches, backups, and small content changes.',
      },
      {
        question: "Can you redesign my existing website without losing my SEO rankings?",
        answer:
          'Yes — this is standard practice for us. We audit your current site structure, preserve or properly redirect existing URLs, maintain metadata and heading hierarchy, and monitor rankings closely in the weeks after launch.',
      },
      {
        question: 'Will my website be mobile-responsive?',
        answer:
          'Every site we build is fully responsive and tested across mobile, tablet, and desktop breakpoints. We also optimize for Core Web Vitals so pages load fast on real-world mobile connections, not just in a lab test.',
      },
    ],
  },
  {
    id: 'seo',
    label: 'Search Engine Optimisation',
    faqs: [
      {
        question: 'How long does it take to see SEO results?',
        answer:
          'Most clients start seeing measurable movement in rankings and organic traffic within 3–4 months, with more significant gains at the 6–12 month mark. SEO is a compounding investment — early technical and on-page fixes tend to show results fastest.',
      },
      {
        question: 'Do you guarantee first-page rankings?',
        answer:
          'No reputable SEO agency can honestly guarantee specific rankings — search algorithms change constantly and rankings depend on competition in your market. What we do guarantee is a transparent, documented strategy and monthly reporting so you can see exactly what\'s being done and why.',
      },
      {
        question: "What's included in your SEO packages?",
        answer:
          'Depending on the tier, this typically includes a technical SEO audit, keyword research and mapping, on-page optimization, content production, link-building, local SEO/Google Business Profile management, and monthly ranking and traffic reports.',
      },
      {
        question: 'Do you do local SEO for small businesses?',
        answer:
          'Yes. Local SEO — Google Business Profile optimization, local citations, review strategy, and location-based keyword targeting — is core to our Starter SEO package and especially effective for service-area businesses.',
      },
      {
        question: 'How do you measure SEO success?',
        answer:
          'We track organic traffic, keyword ranking positions, click-through rate, and — most importantly — conversions and leads generated from organic search. Rankings alone don\'t pay the bills, so we tie reporting back to business outcomes.',
      },
    ],
  },
  {
    id: 'digital-marketing-ppc',
    label: 'Digital Marketing & PPC',
    faqs: [
      {
        question: 'Which advertising platforms do you manage?',
        answer:
          'We run campaigns across Google Ads, Meta (Facebook & Instagram), and LinkedIn Ads, with platform choice depending on where your audience actually spends time and what your funnel looks like.',
      },
      {
        question: "What's a good budget to start with paid ads?",
        answer:
          "It depends on your industry and goals, but we typically recommend a minimum ad spend of $1,500–$3,000/month to gather enough data to optimize effectively, separate from our management fee. We'll help you set a realistic budget during strategy planning.",
      },
      {
        question: 'How do you optimize ad campaigns?',
        answer:
          'We run structured A/B tests on creative, copy, and audience targeting, monitor performance against cost-per-acquisition and ROAS targets, and adjust bids and budgets weekly based on what the data shows — not guesswork.',
      },
      {
        question: 'Do you handle ad creative and copywriting?',
        answer:
          'Yes, ad creative, copywriting, and landing page recommendations are included in our Growth and Scale packages. For Launch Ads we can work with creative you already have or scope design as an add-on.',
      },
    ],
  },
  {
    id: 'working-with-us',
    label: 'Working With Us',
    faqs: [
      {
        question: "What's your process for a new project?",
        answer:
          'It starts with a free discovery call to understand your goals, followed by a proposal with clear scope, pricing, and timeline. Once approved, we move into design/strategy, build/execution, review rounds, and launch — with regular check-ins throughout.',
      },
      {
        question: 'How much does a project typically cost?',
        answer:
          'Pricing varies by service and scope — check our Pricing page for package-level detail across web development, SEO, PPC, branding, analytics, and content. Every quote is scoped to your specific goals rather than a one-size-fits-all number.',
      },
      {
        question: 'Do you work with businesses outside your local area?',
        answer:
          'Yes, we work with clients remotely across time zones using video calls, shared project boards, and async updates. Most of our client relationships are run entirely remotely.',
      },
      {
        question: "What if I'm not happy with the work?",
        answer:
          'Every package includes structured revision rounds, and we don\'t consider a project finished until it meets the brief we agreed on. If something isn\'t working, tell us early — it\'s far easier to adjust course during a project than after launch.',
      },
      {
        question: 'How do I get started?',
        answer:
          'Book a free consultation through our Contact page and tell us a bit about your goals. We\'ll follow up to schedule a call, scope the right package, and get a proposal in front of you — usually within 1–2 business days.',
      },
    ],
  },
];

const FAQItem = ({ faq, isOpen, onToggle }) => (
  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
    >
      <span
        className={cn(
          'text-sm md:text-base font-semibold transition-colors duration-200',
          isOpen ? 'text-[#22C55E]' : 'text-[#1e2d50]'
        )}
      >
        {faq.question}
      </span>
      <ChevronDown
        size={18}
        className={cn(
          'flex-shrink-0 text-gray-400 transition-transform duration-300',
          isOpen && 'rotate-180 text-[#22C55E]'
        )}
      />
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQPage = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].id);
  const [openIndex, setOpenIndex] = useState(0);

  // Deep-link support: /faq#seo, /faq#digital-marketing-ppc, etc.
  useEffect(() => {
    const hash = location.hash?.replace('#', '');
    if (hash && faqCategories.some((c) => c.id === hash)) {
      setActiveCategory(hash);
      setOpenIndex(0);
    }
  }, [location.hash]);

  const category = faqCategories.find((c) => c.id === activeCategory) ?? faqCategories[0];

  const handleCategoryClick = (id) => {
    setActiveCategory(id);
    setOpenIndex(0);
  };

  return (
    <section className="bg-[#F7F8FA] py-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* ── HEADER ── */}
        <div className="mb-10 text-center">
          <p className="text-[#22C55E] text-xs font-bold uppercase tracking-[2px] mb-3">
            Frequently Asked Questions
          </p>
          <h1 className="text-[#1e2d50] text-3xl md:text-4xl font-extrabold mb-4">
            Got Questions? We've Got Answers.
          </h1>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about working with us on web development, SEO, and
            digital marketing — organized by service so you can find what you're looking for fast.
          </p>
        </div>

        {/* ── CATEGORY TABS ── */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={cn(
                'px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200',
                activeCategory === cat.id
                  ? 'bg-[#1e2d50] text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#1e2d50]/40 hover:text-[#1e2d50]'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── ACCORDION LIST ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="flex flex-col gap-3"
          >
            {category.faqs.map((faq, i) => (
              <FAQItem
                key={faq.question}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── BOTTOM CTA ── */}
        <div className="relative mt-14 bg-[#1e2d50] rounded-2xl px-8 py-10 text-center overflow-hidden">
          <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-[#22C55E]/10 blur-3xl pointer-events-none" />
          <h3 className="relative z-10 text-white font-extrabold text-xl mb-2">
            Still Have Questions?
          </h3>
          <p className="relative z-10 text-white/60 text-sm mb-6">
            Can't find what you're looking for? Our team is happy to walk you through it.
          </p>
          <Link
            to="/contact"
            className="relative z-10 inline-flex items-center justify-center px-7 py-3 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-lg text-sm font-bold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Contact Us
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FAQPage;