import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Receipt,
  Settings2,
  Plane,
  Smartphone,
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ── Quick action shortcuts ── */
const QUICK_ACTIONS = [
  { id: 'prepaid', label: 'Prepaid', icon: FileText, to: '/prepaid' },
  { id: 'postpaid', label: 'Postpaid', icon: Receipt, to: '/postpaid' },
  { id: 'sim', label: 'SIM Services', icon: Settings2, to: '/sim-services' },
  { id: 'roaming', label: 'Roaming', icon: Plane, to: '/roaming' },
];

/* ── Rotating offers shown on the promo card ── */
const OFFERS = [
  {
    eyebrow: 'Login করলেই পাচ্ছেন',
    pill: 'শুধুমাত্র আপনার জন্য',
    label: 'সার্কেল-এর',
    headline: 'Best Offers!',
  },
  {
    eyebrow: 'রিচার্জ করলেই পাচ্ছেন',
    pill: 'প্রতি রিচার্জে বোনাস',
    label: 'সার্কেল-এর',
    headline: 'Extra Data!',
  },
  {
    eyebrow: 'নতুন গ্রাহকদের জন্য',
    pill: 'সীমিত সময়ের অফার',
    label: 'সার্কেল-এর',
    headline: 'Welcome Bonus!',
  },
];

/* Small illustrated mascot pair used on the promo card */
const Mascots = () => (
  <svg width="64" height="46" viewBox="0 0 64 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <circle cx="16" cy="16" r="13" fill="#0F766E" />
      <circle cx="12" cy="13" r="2.1" fill="white" />
      <circle cx="20" cy="13" r="2.1" fill="white" />
      <circle cx="12" cy="13" r="0.9" fill="#0F172A" />
      <circle cx="20" cy="13" r="0.9" fill="#0F172A" />
      <path d="M11 20c1.6 1.6 4.4 1.6 6 0" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 3c-2 0-3 1.4-3 3" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" />
      <rect x="4" y="26" width="24" height="16" rx="8" fill="#0F766E" />
    </g>
    <g>
      <circle cx="46" cy="20" r="13" fill="#DC2626" />
      <circle cx="42" cy="17" r="2.1" fill="white" />
      <circle cx="50" cy="17" r="2.1" fill="white" />
      <circle cx="42" cy="17" r="0.9" fill="#0F172A" />
      <circle cx="50" cy="17" r="0.9" fill="#0F172A" />
      <path d="M41 24c1.6 1.6 4.4 1.6 6 0" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="34" y="30" width="24" height="16" rx="8" fill="#DC2626" />
    </g>
  </svg>
);

const Hero3 = () => {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [offerIndex, setOfferIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOfferIndex((prev) => (prev + 1) % OFFERS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleRecharge = (e) => {
    e.preventDefault();
    // hook up to real recharge flow here
    console.log('Recharge requested', { phone, amount });
  };

  const offer = OFFERS[offerIndex];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#FCEEF3] via-white to-[#F1EEFB]">
      {/* Ambient background glow */}
      <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] bg-[#FBD5E1]/50 blur-[110px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -right-10 w-[26rem] h-[26rem] bg-[#D9D2F7]/50 blur-[110px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* ── Left column ── */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-white border border-slate-200 rounded-full px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm mb-6"
          >
            Cirkle
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-3xl md:text-4xl font-semibold text-slate-900 leading-tight mb-1"
          >
            Welcome to Cirkle
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-8"
          >
            Same Number, Best Offers
          </motion.h2>

          {/* Recharge widget */}
          <motion.form
            onSubmit={handleRecharge}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-0 bg-white rounded-2xl sm:rounded-full shadow-lg shadow-slate-200/70 border border-slate-100 p-2 mb-8 max-w-xl"
          >
            <label className="flex items-center gap-2 flex-1 px-4 py-2.5 min-w-0">
              <Smartphone size={18} className="text-rose-500 flex-shrink-0" strokeWidth={2} />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="016XXXXXXXX"
                className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400 text-sm"
              />
            </label>

            <div className="hidden sm:block w-px bg-slate-200 my-2" />

            <label className="flex items-center gap-2 flex-1 px-4 py-2.5 min-w-0 sm:border-none border-t border-slate-100">
              <span className="flex-shrink-0 w-[18px] h-[18px] rounded-full bg-rose-50 text-rose-500 text-xs font-bold flex items-center justify-center">
                ৳
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400 text-sm"
              />
            </label>

            <button
              type="submit"
              className="flex-shrink-0 px-8 py-3 rounded-full font-bold text-white bg-gradient-to-r from-rose-500 to-violet-600 hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Recharge
            </button>
          </motion.form>

          {/* Quick actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="grid grid-cols-4 gap-3 max-w-xl"
          >
            {QUICK_ACTIONS.map(({ id, label, icon: Icon, to }) => (
              <Link
                key={id}
                to={to}
                className="flex flex-col items-center justify-center gap-2 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all py-5 px-2"
              >
                <Icon size={22} className="text-rose-500" strokeWidth={2} />
                <span className="text-xs font-semibold text-slate-700 text-center leading-tight">
                  {label}
                </span>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* ── Right column — promo card ── */}
        <div className="relative flex flex-col items-center lg:items-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative w-full max-w-md rounded-[28px] border-[3px] border-rose-500/90 shadow-2xl shadow-slate-300/50 overflow-hidden"
            style={{
              background:
                'radial-gradient(circle, rgba(15,118,110,0.18) 1.5px, transparent 1.5px) 0 0/16px 16px, linear-gradient(135deg, #CDEFE4, #BFEADB)',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={offerIndex}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.4 }}
                className="relative px-8 py-9 sm:px-10 sm:py-11"
              >
                <Mascots />

                <p className="mt-4 text-lg sm:text-xl font-bold text-slate-900">
                  {offer.eyebrow}
                </p>

                <span className="inline-block mt-3 bg-rose-600 text-white text-xs sm:text-sm font-semibold rounded-full px-4 py-1.5">
                  {offer.pill}
                </span>

                <p className="mt-4 text-lg sm:text-xl font-bold text-slate-900">
                  {offer.label}
                </p>

                <p className="mt-1 text-4xl sm:text-5xl font-extrabold text-rose-600 italic tracking-tight">
                  {offer.headline}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Decorative torn-ticket ribbon, bottom right */}
            <div className="absolute -bottom-6 -right-10 w-40 h-40 rotate-45 pointer-events-none">
              <div
                className="w-full h-full"
                style={{
                  background:
                    'repeating-linear-gradient(90deg, #E11D48 0 10px, transparent 10px 14px)',
                  clipPath: 'polygon(40% 0, 60% 0, 100% 100%, 80% 100%)',
                }}
              />
            </div>
          </motion.div>

          {/* Carousel dots */}
          <div className="flex items-center gap-2 mt-5">
            {OFFERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setOfferIndex(i)}
                aria-label={`Show offer ${i + 1}`}
                className={`rounded-full border-none cursor-pointer transition-all duration-300 ${
                  i === offerIndex
                    ? 'bg-gradient-to-r from-rose-500 to-violet-600 w-7 h-2'
                    : 'bg-slate-300 w-2 h-2 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero3;