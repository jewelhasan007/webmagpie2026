import React, { useState } from "react";
import { motion } from "motion/react";
import Footer from "../components/Footer";

const API = import.meta.env.VITE_BASE_URL;

const SubscriberList = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  // Fetch subscribers
 const fetchSubscribers = async () => {
  setLoading(true);

  try {
    console.log("API URL =", API);

    const res = await fetch(`${API}/api/newsletter`);

    console.log("Response status =", res.status);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    console.log("Fetched data =", data);

    setSubscribers(data);
  } catch (err) {
    console.error("Fetch error:", err);
  } finally {
    setLoading(false);
  }
};

  // Toggle table
  const handleToggle = async () => {
    if (show) {
      setShow(false);
      return;
    }

    if (subscribers.length === 0) await fetchSubscribers();
    setShow(true);
  };

  // Send email to all subscribers
 const handleSend = async () => {
  if (!subject || !message) {
    setStatus("⚠️ Please enter subject and message.");
    return;
  }

  setStatus("Sending...");

  try {
    const res = await fetch(`${API}/api/newsletter/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, message }),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus("✅ Emails sent successfully!");
      setSubject("");   // ✅ clear fields after success
      setMessage("");
    } else {
      setStatus(`❌ ${data?.error || "Failed to send emails"}`);
    }
  } catch (err) {
    console.error(err);
    setStatus(`❌ Network error: ${err.message}`); // ✅ shows real error
  }
};
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">

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
            Let's See All <span className="text-gradient">Subscribers</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#475569] max-w-2xl mx-auto text-lg"
          >
            Manage newsletter subscribers and send bulk emails easily.
          </motion.p>
        </div>

        {/* Toggle Button */}
        <div className="mt-6">
          <button
            onClick={handleToggle}
            className="px-4 py-2 bg-[#162660] text-white rounded-xl hover:bg-[#162660]/90"
          >
            {loading
              ? "Loading..."
              : show
              ? "Hide Subscribers"
              : "Show Subscribers"}
          </button>

          {/* Table */}
          {show && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm text-left text-[#475569] border border-[#162660]/10 rounded-xl overflow-hidden">
                <thead className="bg-[#F1E4D1] text-[#162660]">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Subscribed At</th>
                  </tr>
                </thead>

                <tbody>
                  {subscribers.map((sub, index) => (
                    <tr
                      key={sub._id || index}
                      className="border-t border-[#162660]/10 hover:bg-[#F1E4D1]/30"
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{sub.email}</td>
                      <td className="px-4 py-3">
                        {sub.subscribedAt
                          ? new Date(sub.subscribedAt).toLocaleString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {subscribers.length === 0 && (
                <p className="text-[#475569] mt-2">
                  No subscribers found.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Send Email Section */}
        <div className="mt-10 space-y-3">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <button
            onClick={handleSend}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Send to All Subscribers
          </button>

          {status && <p className="text-sm text-gray-600">{status}</p>}
        </div>
      </div>

      <Footer onNewSubscriber={fetchSubscribers} />
    </div>
  );
};

export default SubscriberList;