import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { navLinks } from "../components/Navbar";

/* Pull every service item name from the groups structure */
const serviceOptions = navLinks
  .find((link) => link.name === "Services")
  ?.groups?.flatMap((group) => group.items.map((item) => item.name)) || [];

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: serviceOptions[0] || "Web Development",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({
          fullName: "",
          email: "",
          subject: serviceOptions[0] || "Web Development",
          company: "",
          message: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to connect to the server. Please try again.");
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* ── Page Heading ── */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-[#22C55E] font-bold uppercase tracking-widest text-sm mb-4"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold text-[#162660] mt-2 mb-5 leading-tight"
          >
            Let's Start A{" "}
            <span className="text-[#22C55E]">Project</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#475569] max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Have a question or a project in mind? We'd love to hear from you.
            Fill out the form below and we'll get back to you as soon as possible.
          </motion.p>
        </div>

        {/* ── Main Grid: Info cards + Form ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">

          {/* LEFT — Contact Info Cards */}
          <div className="flex flex-col gap-6">

            {/* Email */}
            <div className="bg-white border border-[#162660]/10 shadow-md p-7 rounded-3xl">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-[#162660]/10 flex items-center justify-center shrink-0">
                  <Mail className="text-[#162660]" size={20} />
                </div>
                <div>
                  <h4 className="text-[#162660] font-bold mb-2">Email Us</h4>
                  <p className="text-[#475569] text-sm">info@webmagpie.com</p>
                  <p className="text-[#475569] text-sm">hello@webmagpie.com</p>
                  <p className="text-[#475569] text-sm">support@webmagpie.com</p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white border border-[#162660]/10 shadow-md p-7 rounded-3xl">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-[#22C55E]/10 flex items-center justify-center shrink-0">
                  <Phone className="text-[#22C55E]" size={20} />
                </div>
                <div>
                  <h4 className="text-[#162660] font-bold mb-2">Call Us</h4>
                  <p className="text-[#475569] text-sm">+880 01534 733 799</p>
                  <p className="text-[#475569] text-sm">Mon – Fri, 9am – 6pm EST</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white border border-[#162660]/10 shadow-md p-7 rounded-3xl">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-[#162660]/10 flex items-center justify-center shrink-0">
                  <MapPin className="text-[#162660]" size={20} />
                </div>
                <div>
                  <h4 className="text-[#162660] font-bold mb-2">Visit Us</h4>
                  <p className="text-[#475569] text-sm">123 Innovation Drive, Suite 400</p>
                  <p className="text-[#475569] text-sm">San Francisco, CA 94103</p>
                </div>
              </div>
            </div>

            {/* Admin shortcut */}
            <Link
              to="/admin/messages"
              className="mt-auto inline-flex items-center justify-center gap-2 bg-[#162660] hover:bg-[#1e2d50] text-white text-sm font-bold py-3 px-6 rounded-2xl transition-all"
            >
              View All Messages →
            </Link>

          </div>

          {/* RIGHT — Form (spans 2 cols) */}
          <div className="lg:col-span-2">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#162660] p-12 rounded-3xl text-center flex flex-col items-center gap-5 h-full justify-center"
              >
                <div className="w-20 h-20 bg-[#22C55E]/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-[#22C55E] w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-white">Message Sent!</h2>
                <p className="text-white/60 text-lg max-w-sm">
                  Thank you for reaching out. Our team will get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 px-8 py-3 bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold rounded-xl transition-all hover:scale-105"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#162660] p-10 rounded-3xl space-y-6"
              >
                {/* Row 1 — Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-white/70 text-xs font-bold uppercase tracking-wider">
                      Full Name <span className="text-[#22C55E]">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#22C55E] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-white/70 text-xs font-bold uppercase tracking-wider">
                      Email Address <span className="text-[#22C55E]">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#22C55E] transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2 — Subject + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-white/70 text-xs font-bold uppercase tracking-wider">
                      Service Interested In <span className="text-[#22C55E]">*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:border-[#22C55E] transition-colors appearance-none"
                    >
                      {serviceOptions.map((name) => (
                        <option key={name} value={name} className="bg-[#162660]">
                          {name}
                        </option>
                      ))}
                      <option value="Other" className="bg-[#162660]">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-white/70 text-xs font-bold uppercase tracking-wider">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Acme Inc."
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#22C55E] transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-white/70 text-xs font-bold uppercase tracking-wider">
                    Message <span className="text-[#22C55E]">*</span>
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={6}
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#22C55E] transition-colors resize-none"
                  />
                </div>

                {/* Error */}
                {status === "error" && (
                  <p className="text-rose-400 text-sm font-semibold">{errorMessage}</p>
                )}

                {/* Submit */}
                <button
                  disabled={status === "loading"}
                  type="submit"
                  className="w-full py-4 bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold rounded-xl text-base flex items-center justify-center gap-3 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {status === "loading" ? (
                    <><Loader2 className="animate-spin" size={20} /> Sending…</>
                  ) : (
                    <>Send Message <Send size={18} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── Google Map ── */}
        <div className="h-[420px] rounded-3xl overflow-hidden border border-[#162660]/10 shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019297806766!2d-122.406417!3d37.785089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580898a683039%3A0x400ca147475c44b!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1647351234567!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </div>
  );
};

export default Contact;