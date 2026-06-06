import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

const ClientMessage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `${process.env.VITE_BASE_URL}/api/messages`
        );

        if (!response.ok) throw new Error("Failed to fetch messages");

        const data = await response.json();
        setMessages(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return <p className="text-white">Loading messages...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

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
            All <span className="text-gradient">Clients</span> Message
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#475569] max-w-2xl mx-auto text-lg"
          >
            Have a question or a project in mind? We'd love to hear from you.
          </motion.p>
        </div>

        {/* Table */}
        <div className="p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700 rounded-lg">
              <thead className="bg-gray-800">
                <tr className="text-center">
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Subject</th>
                  <th className="p-3 border">Company</th>
                  <th className="p-3 border">Message</th>
                  <th className="p-3 border">Date</th>
                </tr>
              </thead>

              <tbody>
                {messages.length > 0 ? (
                  messages.map((msg) => (
                    <tr key={msg._id} className="text-center">
                      <td className="p-3 border">{msg.fullName}</td>
                      <td className="p-3 border">{msg.email}</td>
                      <td className="p-3 border">{msg.subject}</td>
                      <td className="p-3 border">{msg.company || "-"}</td>
                      <td className="p-3 border">{msg.message}</td>
                      <td className="p-3 border">
                        {new Date(msg.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="p-4 text-gray-400 text-center"
                      colSpan={6}
                    >
                      No messages found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ClientMessage;