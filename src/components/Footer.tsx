import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Twitter, Github, Linkedin, Mail, Phone, MapPin, Loader2, Facebook, Instagram, Youtube } from 'lucide-react';
import { cn } from '../lib/utils';
import { navLinks } from './Navbar';

const Footer = ({ onNewSubscriber }: { onNewSubscriber?: () => void }) => {
  const services = navLinks.find(link => link.name === 'Services')?.subMenu || [];
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setMessage('');
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (response.ok) {
        setStatus('success');
        setMessage('Subscribed successfully!');
        setEmail('');
        if (onNewSubscriber) onNewSubscriber();
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to connect to server');
    }
  };

  return (
    <footer className="bg-[#162660] border-t border-[#D0E6FD]/10 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#D0E6FD]/20 rounded-xl flex items-center justify-center">
              <Rocket className="text-[#D0E6FD] w-6 h-6" />
            </div>
            <span className="text-xl font-display font-bold text-white">ZOZOWeb</span>
          </Link>
          <p className="text-white/60 leading-relaxed">
            Empowering brands through innovative digital solutions. We build high-performance products that drive growth and engagement.
          </p>
          <div className="flex gap-4">
            {[Twitter, Linkedin, Facebook, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-[#D0E6FD]/10 flex items-center justify-center text-white/60 hover:bg-[#D0E6FD] hover:text-[#162660] transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <div className="flex gap-4">
            {[Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-[#D0E6FD]/10 flex items-center justify-center text-white/60 hover:bg-[#D0E6FD] hover:text-[#162660] transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Services</h4>
          <ul className="space-y-4">
            {services.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="text-white/60 hover:text-[#D0E6FD] transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Company</h4>
          <ul className="space-y-4">
            {['About Us', 'Our Projects', 'Latest News', 'Contact', 'Careers'].map((item) => (
              <li key={item}>
                <Link to={item === 'Contact' ? '/contact' : '/about'} className="text-white/60 hover:text-[#D0E6FD] transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Newsletter</h4>
          <p className="text-white/60 mb-4">Subscribe to get the latest digital trends and agency updates.</p>
          <form onSubmit={handleSubscribe} className="space-y-3">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full px-4 py-3 bg-[#D0E6FD]/10 border border-[#D0E6FD]/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#D0E6FD]"
            />
            <button
              disabled={status === 'loading'}
              className="w-full py-3 bg-[#D0E6FD] text-[#162660] font-bold rounded-xl hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {status === 'loading' ? <Loader2 className="animate-spin" size={18} /> : 'Subscribe'}
            </button>
            {message && (
              <p className={cn(
                "text-xs font-bold",
                status === 'success' ? "text-[#D0E6FD]" : "text-rose-400"
              )}>
                {message}
              </p>
            )}
          </form>
          {/* <Link to="/subscriber-list">
            <button className="mt-2 text-white/40 hover:text-[#D0E6FD] text-sm transition-colors">
              Subscribers Lists
            </button>
          </Link> */}
        </div>
      </div>
{/* ── Payment platforms ── */}
      <div className="max-w-7xl mx-auto mt-14 mb-2">
        <p className="text-white/30 text-xs uppercase tracking-widest mb-4 text-right">
          Secure payments via
        </p>
        <div className="flex flex-wrap items-center justify-end gap-3">
          {[
 {
  name: "Visa",
  svg: (
    <svg viewBox="0 0 48 24" className="h-5 w-auto">
      <text
        x="2"
        y="18"
        fontSize="16"
        fontWeight="900"
        fontFamily="Arial, sans-serif"
        fill="#1A1F71"
        fontStyle="regular"
      >
        VISA
      </text>
    </svg>
  ),
},
            {
              name: "Mastercard",
              svg: (
                <svg viewBox="0 0 38 24" className="h-5 w-auto">
                  <circle cx="13" cy="12" r="10" fill="#EB001B" opacity="0.9"/>
                  <circle cx="25" cy="12" r="10" fill="#F79E1B" opacity="0.9"/>
                  <path d="M19 5.5a10 10 0 0 1 0 13 10 10 0 0 1 0-13z" fill="#FF5F00" opacity="0.9"/>
                </svg>
              ),
            },
         {
  name: "PayPal",
  svg: (
    <svg viewBox="0 0 48 24" className="h-5 w-auto">
      <path
        d="M16.5 5.5c2.8 0 4.5 1.2 4.5 3.7 0 3.1-2.2 5-5.6 5h-1.6l-.7 4.3H10l2.1-13h4.4zM14.7 12c1.8 0 2.8-.8 2.8-2.3 0-1.1-.7-1.7-2.1-1.7h-1.1L13.7 12h1z"
        fill="#003087"
      />
      <path
        d="M25.5 7.5c2.7 0 4.2 1.2 4.2 3.5 0 3.4-2.1 5.5-5.4 5.5h-1.2l-.5 3H19.8l2-12h3.7zM23.9 14c1.6 0 2.6-.9 2.6-2.5 0-1-.6-1.6-1.9-1.6h-.8l-.7 4.1h.8z"
        fill="#009CDE"
      />
    </svg>
  ),
},
              {
      name: "Stripe",
      svg: (
        <svg viewBox="0 0 60 25" className="h-4 w-auto" fill="none">
          <rect width="60" height="25" rx="4" fill="#635bff"/>
          <text x="8" y="17" fontFamily="Arial" fontWeight="700" fontSize="13" fill="#fff">stripe</text>
        </svg>
      ),
    },
          {
      name: "bKash",
      svg: (
        <svg viewBox="0 0 68 25" className="h-4 w-auto" fill="none">
          <rect width="68" height="25" rx="4" fill="#e2136e"/>
          <circle cx="12" cy="12.5" r="7" fill="#c0005e"/>
          <text x="23" y="17" fontFamily="Arial" fontWeight="800" fontSize="12" fill="#fff">bKash</text>
        </svg>
      ),
    },
             {
      name: "Nagad",
      svg: (
        <svg viewBox="0 0 70 25" className="h-4 w-auto" fill="none">
          <rect width="70" height="25" rx="4" fill="#f6a01b"/>
          <circle cx="12" cy="12.5" r="7" fill="#e05c00"/>
          <text x="23" y="17" fontFamily="Arial" fontWeight="800" fontSize="12" fill="#fff">nagad</text>
        </svg>
      ),
    },
            {
              name: "Wise",
              svg: (
                <svg viewBox="0 0 44 20" className="h-5 w-auto" fill="none">
                  <text x="0" y="15" fontFamily="Arial" fontWeight="800" fontSize="14" fill="#9fe870">wise</text>
                </svg>
              ),
            },
           {
      name: "AMEX",
      svg: (
        <svg viewBox="0 0 70 25" className="h-4 w-auto" fill="none">
          <rect width="70" height="25" rx="4" fill="#2557d6"/>
          <text x="5" y="17" fontFamily="Arial" fontWeight="800" fontSize="11" fill="#fff" letterSpacing="1.5">AMEX</text>
          <path d="M52 5 L68 5 L68 20 Q60 25 52 20 Z" fill="#1a44b8"/>
          <text x="53" y="16" fontFamily="Arial" fontWeight="700" fontSize="8" fill="#fff">®</text>
        </svg>
      ),
    },
          ].map((p) => (
            <div
              key={p.name}
              title={p.name}
              className="px-3 py-2 rounded-lg bg-white/5 border border-[#D0E6FD]/10 hover:bg-white/10 hover:border-[#D0E6FD]/30 transition-all flex items-center justify-center"
              style={{ minWidth: 56 }}
            >
              {p.svg}
            </div>
          ))}
        </div>
      </div>
      {/* ── end payment platforms ── */}

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[#D0E6FD]/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/40 text-sm">
          © {new Date().getFullYear()} ZOZOWeb Digital Agency. All rights reserved.
        </p>
        <div className="flex gap-8 text-sm text-white/40">
          <a href="#" className="hover:text-[#D0E6FD] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#D0E6FD] transition-colors">Terms of Service</a>

           {/* ✅ Hidden admin link - almost invisible, only you know it's there */}
          <Link
            to="/admin/login"
            className="text-white/10 hover:text-white/40 transition-opacity text-xs"
            title=""
          >
            ·
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
