// import React, { useState } from 'react';
// import { motion } from 'motion/react';
// import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     subject: 'Web Development',
//     company: '',
//     message: ''
//   });
//   const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatus('loading');
//     setErrorMessage('');

//     console.log("FormDate Old = ", formData)
//     try {
//       const response = await fetch('/api/contact', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setStatus('success');
//         setFormData({ fullName: '', email: '', subject: 'Web Development', company: '', message: '' });
//       } else {
//         setStatus('error');
//         setErrorMessage(data.error || 'Something went wrong');
//       }
//     } catch (error) {
//       setStatus('error');
//       setErrorMessage('Failed to connect to the server');
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="pt-32 pb-24 px-6"
//     >
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-20">
//           <motion.span
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-[#162660] font-bold uppercase tracking-widest text-sm"
//           >
//             Get In Touch
//           </motion.span>
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="text-5xl md:text-7xl font-display font-extrabold mt-4 mb-6"
//           >
//             Let's Start A <span className="text-gradient">Project</span>
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="text-[#475569] max-w-2xl mx-auto text-lg"
//           >
//             Have a question or a project in mind? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
//           </motion.p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//           <div className="lg:col-span-1 space-y-8">
//             <div className="bg-white border border-[#162660]/10 shadow-md p-8 rounded-3xl">
//               <div className="flex items-start gap-6">
//                 <div className="w-12 h-12 rounded-2xl bg-[#D0E6FD] flex items-center justify-center shrink-0">
//                   <Mail className="text-[#162660]" />
//                 </div>
//                 <div>
//                   <h4 className="text-white font-bold mb-1">Email Us</h4>
//                    <p className="text-[#475569]">info@ZOZOWeb.com</p>
//                   <p className="text-[#475569]">hello@ZOZOWeb.com</p>
//                   <p className="text-[#475569]">support@ZOZOWeb.com</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white border border-[#162660]/10 shadow-md p-8 rounded-3xl">
//               <div className="flex items-start gap-6">
//                 <div className="w-12 h-12 rounded-2xl bg-[#D0E6FD]/10 flex items-center justify-center shrink-0">
//                   <Phone className="text-[#D0E6FD]" />
//                 </div>
//                 <div>
//                   <h4 className="text-white font-bold mb-1">Call Us</h4>
//                   <p className="text-[#475569]">+880 01534 733 799</p>
//                   <p className="text-[#475569]">Mon - Fri, 9am - 6pm EST</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white border border-[#162660]/10 shadow-md p-8 rounded-3xl">
//               <div className="flex items-start gap-6">
//                 <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center shrink-0">
//                   <MapPin className="text-brand-accent" />
//                 </div>
//                 <div>
//                   <h4 className="text-white font-bold mb-1">Visit Us</h4>
//                   <p className="text-[#475569]">123 Innovation Drive, Suite 400</p>
//                   <p className="text-[#475569]">San Francisco, CA 94103</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="lg:col-span-2">
//             {status === 'success' ? (
//               <motion.div 
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="bg-white border border-[#162660]/10 shadow-md p-12 rounded-[40px] text-center space-y-6"
//               >
//                 <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
//                   <CheckCircle className="text-emerald-500 w-10 h-10" />
//                 </div>
//                 <h2 className="text-3xl font-bold text-white">Message Sent!</h2>
//                 <p className="text-[#475569] text-lg">Thank you for reaching out. Our team will get back to you shortly.</p>
//                 <button 
//                   onClick={() => setStatus('idle')}
//                   className="px-8 py-3 bg-[#162660] text-white font-bold rounded-xl hover:bg-[#162660]/90 transition-all"
//                 >
//                   Send Another Message
//                 </button>
//               </motion.div>
//             ) : (
//               <form onSubmit={handleSubmit} className="bg-white border border-[#162660]/10 shadow-md p-10 md:p-12 rounded-[40px] space-y-8">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                   <div className="space-y-2">
//                     <label className="text-sm font-bold text-white/80 uppercase tracking-wider">Full Name</label>
//                     <input
//                       required
//                       name="fullName"
//                       value={formData.fullName}
//                       onChange={handleChange}
//                       type="text"
//                       placeholder="John Doe"
//                       className="w-full px-6 py-4 bg-[#F1E4D1]/30 border border-[#162660]/10 rounded-2xl text-white focus:outline-none focus:border-[#162660] transition-colors"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm font-bold text-white/80 uppercase tracking-wider">Email Address</label>
//                     <input
//                       required
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       type="email"
//                       placeholder="john@example.com"
//                       className="w-full px-6 py-4 bg-[#F1E4D1]/30 border border-[#162660]/10 rounded-2xl text-white focus:outline-none focus:border-[#162660] transition-colors"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                   <div className="space-y-2">
//                     <label className="text-sm font-bold text-white/80 uppercase tracking-wider">Subject</label>
//                     <select 
//                       name="subject"
//                       value={formData.subject}
//                       onChange={handleChange}
//                       className="w-full px-6 py-4 bg-[#F1E4D1]/30 border border-[#162660]/10 rounded-2xl text-white focus:outline-none focus:border-[#162660] transition-colors appearance-none"
//                     >
//                       <option className="bg-[#162660]">Web Development</option>
//                       <option className="bg-[#162660]">Digital Marketing</option>
//                       <option className="bg-[#162660]">UI/UX Design</option>
//                       <option className="bg-[#162660]">Other</option>
//                     </select>
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm font-bold text-white/80 uppercase tracking-wider">Company</label>
//                     <input
//                       name="company"
//                       value={formData.company}
//                       onChange={handleChange}
//                       type="text"
//                       placeholder="Acme Inc."
//                       className="w-full px-6 py-4 bg-[#F1E4D1]/30 border border-[#162660]/10 rounded-2xl text-white focus:outline-none focus:border-[#162660] transition-colors"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-bold text-white/80 uppercase tracking-wider">Message</label>
//                   <textarea
//                     required
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     rows={6}
//                     placeholder="Tell us about your project..."
//                     className="w-full px-6 py-4 bg-[#F1E4D1]/30 border border-[#162660]/10 rounded-2xl text-white focus:outline-none focus:border-[#162660] transition-colors resize-none"
//                   />
//                 </div>

//                 {status === 'error' && (
//                   <p className="text-rose-500 font-bold text-sm">{errorMessage}</p>
//                 )}

//                 <button 
//                   disabled={status === 'loading'}
//                   type="submit"
//                   className="w-full py-5 bg-[#162660] text-white font-bold rounded-2xl text-lg flex items-center justify-center gap-3 hover:bg-[#162660]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {status === 'loading' ? (
//                     <>Sending... <Loader2 className="animate-spin" size={20} /></>
//                   ) : (
//                     <>Send Message <Send size={20} /></>
//                   )}
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>

//         {/* Map Placeholder */}
//         <div className="mt-24 h-[500px] rounded-[40px] overflow-hidden glass relative">
//           <div className="absolute inset-0 bg-[#162660] flex items-center justify-center">
//             <div className="text-center">
//               <MapPin className="text-[#162660] w-12 h-12 mx-auto mb-4" />
//               <p className="text-[#475569] font-bold">Interactive Map Integration</p>
//               <p className="text-[#475569] text-sm">San Francisco, CA</p>
//             </div>
//           </div>
//           {/* Real Google Map Embed would go here */}
//           <iframe
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019297806766!2d-122.406417!3d37.785089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580898a683039%3A0x400ca147475c44b!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1647351234567!5m2!1sen!2sus"
//             width="100%"
//             height="100%"
//             style={{ border: 0, opacity: 0.4 }}
//             allowFullScreen
//             loading="lazy"
//           ></iframe>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Contact;



import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { navLinks } from "../components/Navbar";

const Contact = () => {

  const servicesSubMenu = navLinks.find(link => link.name === 'Services')?.subMenu || [];
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "Web Development",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setStatus("loading");
    setErrorMessage("");
console.log('form value=', formData )
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");

        setFormData({
          fullName: "",
          email: "",
          subject: "Web Development",
          company: "",
          message: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Server connection failed");
    }
  };

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
{/* all client */}

<Link to="/new-client">
  <button className="cursore-pointer">
    All Clients Messages
  </button>
</Link>
        {/* Heading */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#162660] font-bold uppercase tracking-widest text-sm"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-extrabold mt-4 mb-6"
          >
            Let's Start A <span className="text-gradient">Project</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#475569] max-w-2xl mx-auto text-lg"
          >
            Have a question or a project in mind? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
          </motion.p>
        </div>


        {/* Form */}
        <div className="max-w-3xl mx-auto mb-20">

          {status === "success" ? (
            <div className="text-center p-12 bg-[#162660] rounded-3xl">
              <CheckCircle className="mx-auto text-green-500 mb-4" size={60} />
              <h2 className="text-2xl font-bold text-white mb-2">
                Message Sent Successfully
              </h2>
              <p className="text-[#475569]">
                Our team will contact you shortly.
              </p>

              <button
                onClick={() => setStatus("idle")}
                className="mt-6 bg-[#162660] px-6 py-3 rounded-xl text-white"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-[#162660] p-10 rounded-3xl space-y-6"
            >
              {/* Name */}
              <input
                required
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white border border-[#162660]/20 text-[#162660]"
              />

              {/* Email */}
              <input
                required
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white border border-[#162660]/20 text-[#162660]"
              />

              {/* Subject */}
              {/* <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white border border-[#162660]/20 text-[#162660]"
              >
                <option>Website Design & Development</option>
                <option>Landing Page Design</option>
                <option>E-Commerce Solution</option>
                <option>Logo Design</option>
                <option>UX/UI Design</option>
                <option>Digital Marketing & SEO</option>
                <option>Branding</option>
                <option>Mobile App Development</option>
                <option>Amazon FBA business</option>
                <option>Other</option>
              </select> */}


<select
  name="subject"
  value={formData.subject}
  onChange={handleChange}
  className="w-full p-4 rounded-xl bg-white border border-[#162660]/20 text-[#162660]"
>
  {servicesSubMenu.map((item) => (
    <option key={item.name} value={item.name}>
      {item.name}
    </option>
  ))}
  <option value="Other">Other</option>
</select>

              {/* Company */}
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white border border-[#162660]/20 text-[#162660]"
              />

              {/* Message */}
              <textarea
                required
                name="message"
                rows={6}
                placeholder="Tell us about your project"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white border border-[#162660]/20 text-[#162660]"
              />

              {status === "error" && (
                <p className="text-red-500">{errorMessage}</p>
              )}

              <button
                disabled={status === "loading"}
                type="submit"
                className="w-full bg-[#162660] py-4 rounded-xl text-white flex justify-center items-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    Sending <Loader2 className="animate-spin" />
                  </>
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

{/* contact details */}
<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white border border-[#162660]/10 shadow-md p-8 rounded-3xl h-full">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-[#D0E6FD] flex items-center justify-center shrink-0">
                  <Mail className="text-[#162660]" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Email Us</h4>
                   <p className="text-[#475569]">info@ZOZOWeb.com</p>
                  <p className="text-[#475569]">hello@ZOZOWeb.com</p>
                  <p className="text-[#475569]">support@ZOZOWeb.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#162660]/10 shadow-md p-8 rounded-3xl h-full">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-[#D0E6FD]/10 flex items-center justify-center shrink-0">
                  <Phone className="text-[#D0E6FD]" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Call Us</h4>
                  <p className="text-[#475569]">+880 01534 733 799</p>
                  <p className="text-[#475569]">Mon - Fri, 9am - 6pm EST</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#162660]/10 shadow-md p-8 rounded-3xl h-full">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Visit Us</h4>
                  <p className="text-[#475569]">123 Innovation Drive, Suite 400</p>
                  <p className="text-[#475569]">San Francisco, CA 94103</p>
                </div>
              </div>
            </div>
</div>

      </div>
    </div>
  );
};

export default Contact;