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
        <p className="text-white/30 text-xs uppercase tracking-widest mb-4 text-center">
          Secure payments via
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            {
              name: "Visa",
              svg: (
                <svg viewBox="0 0 48 16" className="h-5 w-auto" fill="none">
                  <text x="0" y="13" fontFamily="Arial" fontWeight="800" fontSize="15" fill="#fff" letterSpacing="-0.5">VISA</text>
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
                <svg viewBox="0 0 60 20" className="h-5 w-auto" fill="none">
                  <text x="0" y="15" fontFamily="Arial" fontWeight="800" fontSize="14" fill="#009cde">Pay</text>
                  <text x="22" y="15" fontFamily="Arial" fontWeight="800" fontSize="14" fill="#012169">Pal</text>
                </svg>
              ),
            },
            {
              name: "Stripe",
              svg: (
                <svg viewBox="0 0 52 20" className="h-5 w-auto" fill="none">
                  <text x="0" y="15" fontFamily="Arial" fontWeight="700" fontSize="15" fill="#635bff">stripe</text>
                </svg>
              ),
            },
            {
              name: "bKash",
              svg: (
                <svg viewBox="0 0 52 20" className="h-5 w-auto" fill="none">
                  <text x="0" y="15" fontFamily="Arial" fontWeight="800" fontSize="14" fill="#e2136e">bKash</text>
                </svg>
              ),
            },
            {
              name: "Nagad",
              svg: (
                <svg viewBox="0 0 52 20" className="h-5 w-auto" fill="none">
                  <text x="0" y="15" fontFamily="Arial" fontWeight="800" fontSize="14" fill="#f6a01b">Nagad</text>
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
                <svg viewBox="0 0 52 20" className="h-5 w-auto" fill="none">
                  <text x="0" y="15" fontFamily="Arial" fontWeight="800" fontSize="12" fill="#2557d6" letterSpacing="1">AMEX</text>
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
