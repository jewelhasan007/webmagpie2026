import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import { cn } from '../lib/utils';

/* ─────────────────────────────────────────────
   Pricing data — one entry per service category.
   Only "Web Development" mirrors the real figures
   from the reference design; the rest are sample
   placeholders — swap in real numbers/copy per
   category before shipping.
───────────────────────────────────────────── */
export const pricingCategories = [
  {
    id: 'web-development',
    label: 'Web Development',
    plans: [
      {
        name: 'Basic Package',
        description:
          'Ideal for startups needing a fast, professional, and fully responsive web presence.',
        price: '$499',
        priceNote: 'ONE-TIME',
        features: [
          '3-Page Premium Responsive Design',
          'Built with Modern React & Tailwind CSS',
          'Secure Standard Contact Form Setup',
          'Core Mobile & Load Speed Optimization',
          '30 Days Post-Launch Maintenance Support',
        ],
        cta: 'Book Basic Package Consultation',
        popular: false,
      },
      {
        name: 'Premium Package',
        description:
          'Perfect for growing brands requiring custom CMS controls, integrations, and animations.',
        price: '$1,499',
        priceNote: 'ONE-TIME',
        features: [
          'Up to 10 Pages Bespoke Web App',
          'Complete Content Management (CMS) Setup',
          'Advanced API & Database Integrations',
          'Custom Framer Motion Page Animations',
          'Strict Core Web Vitals Optimization',
          '90 Days Priority Developer SLA Support',
        ],
        cta: 'Book Premium Package Consultation',
        popular: true,
      },
      {
        name: 'Advanced Package',
        description:
          'Enterprise full-stack platform with custom databases, subscriptions, and security.',
        price: '$2,999',
        priceNote: 'ONE-TIME',
        features: [
          'Custom Full-Stack SaaS Architecture',
          'Dynamic PostgreSQL/NoSQL Integrations',
          'Stripe & PayPal Secure Billing Pipeline',
          'Live Client Analytics & Chart Dashboards',
          'Role-Based Multi-User Configurations',
          '180 Days Dedicated Developer Support',
        ],
        cta: 'Book Advanced Package Consultation',
        popular: false,
      },
    ],
  },
  {
    id: 'seo',
    label: 'Search Engine Optimisation',
    plans: [
      {
        name: 'Starter SEO',
        description: 'Foundational on-page SEO for businesses just getting found online.',
        price: '$699',
        priceNote: '/ MONTH',
        features: [
          'Technical SEO Audit & Fixes',
          'Keyword Research & Mapping',
          'On-Page Optimization (10 Pages)',
          'Monthly Ranking Report',
        ],
        cta: 'Book Starter SEO Consultation',
        popular: false,
      },
      {
        name: 'Growth SEO',
        description: 'Ongoing content and link-building for businesses ready to scale traffic.',
        price: '$1,499',
        priceNote: '/ MONTH',
        features: [
          'Everything in Starter SEO',
          '4 SEO-Optimized Blog Posts / Month',
          'Authoritative Link-Building Campaign',
          'Local SEO & Google Business Profile',
          'Bi-Weekly Strategy Calls',
        ],
        cta: 'Book Growth SEO Consultation',
        popular: true,
      },
      {
        name: 'Enterprise SEO',
        description: 'Full-funnel SEO strategy for competitive, multi-location businesses.',
        price: '$3,299',
        priceNote: '/ MONTH',
        features: [
          'Everything in Growth SEO',
          'Multi-Location / Multi-Language SEO',
          'Dedicated SEO Strategist',
          'Custom Analytics Dashboard',
          'Priority Support SLA',
        ],
        cta: 'Book Enterprise SEO Consultation',
        popular: false,
      },
    ],
  },
  {
    id: 'digital-marketing-ppc',
    label: 'Digital Marketing & PPC',
    plans: [
      {
        name: 'Launch Ads',
        description: 'A single-channel campaign to start generating qualified leads.',
        price: '$899',
        priceNote: '/ MONTH',
        features: [
          'Single-Platform Ad Management',
          'Audience Research & Targeting',
          'Landing Page Conversion Review',
          'Monthly Performance Report',
        ],
        cta: 'Book Launch Ads Consultation',
        popular: false,
      },
      {
        name: 'Growth Ads',
        description: 'Cross-channel campaigns with ongoing testing and optimization.',
        price: '$1,999',
        priceNote: '/ MONTH',
        features: [
          'Everything in Launch Ads',
          'Multi-Platform Campaign Management',
          'A/B Creative & Copy Testing',
          'Conversion Tracking & Attribution',
          'Weekly Optimization Cycles',
        ],
        cta: 'Book Growth Ads Consultation',
        popular: true,
      },
      {
        name: 'Scale Ads',
        description: 'Full-service paid media management for aggressive growth targets.',
        price: '$4,499',
        priceNote: '/ MONTH',
        features: [
          'Everything in Growth Ads',
          'Dedicated Media Buyer',
          'Advanced Audience & Retargeting Suite',
          'Custom ROAS Dashboard',
          'Priority Support SLA',
        ],
        cta: 'Book Scale Ads Consultation',
        popular: false,
      },
    ],
  },
  {
    id: 'ui-ux-branding',
    label: 'UI/UX & Branding',
    plans: [
      {
        name: 'Brand Starter',
        description: 'Core identity essentials for new and early-stage businesses.',
        price: '$1,199',
        priceNote: 'ONE-TIME',
        features: [
          'Logo & Visual Identity Design',
          'Color Palette & Typography System',
          'Basic Brand Guidelines PDF',
          '2 Rounds of Revisions',
        ],
        cta: 'Book Brand Starter Consultation',
        popular: false,
      },
      {
        name: 'Brand & Product Design',
        description: 'A complete identity plus UI/UX design system for your product.',
        price: '$2,999',
        priceNote: 'ONE-TIME',
        features: [
          'Everything in Brand Starter',
          'Full UI/UX Design System',
          'High-Fidelity Prototypes',
          'Design Handoff & Dev Documentation',
          '90 Days Design Support',
        ],
        cta: 'Book Brand & Product Consultation',
        popular: true,
      },
      {
        name: 'Enterprise Design',
        description: 'Ongoing design partnership for evolving, multi-product brands.',
        price: '$5,499',
        priceNote: 'ONE-TIME',
        features: [
          'Everything in Brand & Product Design',
          'Multi-Product Design System',
          'Dedicated Product Designer',
          'Quarterly Brand Refresh Reviews',
          '180 Days Design Support',
        ],
        cta: 'Book Enterprise Design Consultation',
        popular: false,
      },
    ],
  }

];

const PricingPackages = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(pricingCategories[0].id);

  // Deep-link support: /pricing#seo, /pricing#digital-marketing-ppc, etc.
  useEffect(() => {
    const hash = location.hash?.replace('#', '');
    if (hash && pricingCategories.some((c) => c.id === hash)) {
      setActiveCategory(hash);
    }
  }, [location.hash]);

  const category = pricingCategories.find((c) => c.id === activeCategory) ?? pricingCategories[0];

  return (
    <section className="bg-[#F7F8FA] py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* ── HEADER ── */}
        <div className="mb-10">
          <p className="text-[#22C55E] text-xs font-bold uppercase tracking-[2px] mb-3">
            Premium Pricing Packages
          </p>
          <h2 className="text-[#1e2d50] text-3xl md:text-4xl font-extrabold mb-4">
            Results-Driven Agency Plans
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl leading-relaxed">
            Transparent, value-focused service levels tailored to scale your brand. Toggle our
            core service divisions below to view target specifications.
          </p>
        </div>

        {/* ── CATEGORY TABS ── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {pricingCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
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

        {/* ── PRICING CARDS ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
          >
            {category.plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  'relative bg-white rounded-2xl border p-8 flex flex-col',
                  plan.popular
                    ? 'border-[#22C55E] shadow-2xl md:scale-[1.04] z-10'
                    : 'border-gray-200 shadow-sm'
                )}
              >
                {/* "Most Popular" badge */}
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#22C55E] text-white text-[10px] font-bold uppercase tracking-[1.5px] px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
                    Most Popular Plan
                  </span>
                )}

                <h3 className="text-[#1e2d50] font-bold text-lg mb-2">{plan.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{plan.description}</p>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-[#1e2d50] text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-wide">
                    / {plan.priceNote}
                  </span>
                </div>

                <div className="border-t border-gray-100 mb-6" />

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <Check size={15} className="text-[#22C55E] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  state={{ package: plan.name, category: category.label }}
                  className={cn(
                    'w-full py-3 rounded-xl text-sm font-bold text-center transition-all duration-200',
                    plan.popular
                      ? 'bg-[#22C55E] hover:bg-[#16A34A] text-white shadow-lg hover:scale-[1.02]'
                      : 'bg-white border border-[#1e2d50]/20 text-[#1e2d50] hover:bg-[#1e2d50] hover:text-white'
                  )}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PricingPackages;