import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Rocket, LogOut, Users, Mail, Send, History } from "lucide-react";

const API = import.meta.env.VITE_BASE_URL;

// ✅ Inline PageLoader component
const PageLoader = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 rounded-full border-4 border-[#162660]/10" />
      <div className="absolute inset-0 rounded-full border-4 border-t-[#162660] animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Rocket className="text-[#162660] w-8 h-8" />
      </div>
    </div>
    <p className="mt-4 text-[#162660] font-bold text-lg tracking-widest uppercase">
      ZOZOWeb
    </p>
    <p className="text-gray-400 text-sm mt-1">Loading Dashboard...</p>
  </div>
);

// ✅ Inline sending loader
const SendingLoader = () => (
  <div className="flex items-center gap-2">
    <div className="w-4 h-4 rounded-full border-2 border-t-white border-white/30 animate-spin" />
    Sending...
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [subscribers, setSubscribers] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [pageReady, setPageReady] = useState(false); // ✅ page loader state
  const [sending, setSending] = useState(false); // ✅ send button loader state

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    } else {
      // ✅ Wait for both to finish before showing page
      Promise.all([fetchSubscribers(), fetchLogs()]).finally(() => {
        setPageReady(true);
      });
    }
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/newsletter`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      const data = await res.json();
      setSubscribers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogs = async () => {
    setLogsLoading(true);
    try {
      const res = await fetch(`${API}/api/newsletter/logs`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      const data = await res.json();
      setLogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLogsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!subject || !message) {
      setStatus("⚠️ Please enter subject and message.");
      return;
    }

    setSending(true); // ✅ show send loader
    setStatus("");

    try {
      const res = await fetch(`${API}/api/newsletter/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subject, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Emails sent successfully!");
        setSubject("");
        setMessage("");
        fetchLogs();
      } else {
        setStatus(`❌ ${data?.error || "Failed"}`);
      }
    } catch (err) {
      setStatus(`❌ Network error: ${err.message}`);
    } finally {
      setSending(false); // ✅ hide send loader
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // ✅ Show full page loader until data is ready
  if (!pageReady) return <PageLoader />;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#162660] rounded-xl flex items-center justify-center">
              <Rocket className="text-white w-5 h-5" />
            </div>
            <h1 className="text-3xl font-bold text-[#162660]">
              Admin Dashboard
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
            <div className="w-12 h-12 bg-[#162660]/10 rounded-xl flex items-center justify-center">
              <Users className="text-[#162660] w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm uppercase tracking-widest">
                Total Subscribers
              </p>
              <p className="text-4xl font-bold text-[#162660]">
                {subscribers.length}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Mail className="text-green-600 w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm uppercase tracking-widest">
                Emails Sent
              </p>
              <p className="text-4xl font-bold text-green-600">
                {logs.filter((l) => l.status === "success").length}
              </p>
            </div>
          </div>
        </div>

        {/* Send Email */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Send className="text-[#162660] w-5 h-5" />
            <h2 className="text-xl font-bold text-[#162660]">
              Send Email to All Subscribers
            </h2>
          </div>
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none focus:border-[#162660]"
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="w-full p-3 border rounded-xl focus:outline-none focus:border-[#162660]"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={sending} // ✅ disable while sending
            className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {sending ? <SendingLoader /> : "Send to All Subscribers"}
          </button>
          {status && (
            <p className={`text-sm font-medium ${
              status.includes("✅") ? "text-green-600" :
              status.includes("❌") ? "text-red-500" :
              status.includes("⚠️") ? "text-yellow-500" :
              "text-gray-600"
            }`}>
              {status}
            </p>
          )}
        </div>

        {/* Subscriber List */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex items-center gap-2 mb-4">
            <Users className="text-[#162660] w-5 h-5" />
            <h2 className="text-xl font-bold text-[#162660]">
              Subscriber List
            </h2>
            <span className="ml-auto bg-[#162660]/10 text-[#162660] text-xs font-bold px-3 py-1 rounded-full">
              {subscribers.length} total
            </span>
          </div>

          {loading ? (
            // ✅ Table skeleton loader
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : subscribers.length === 0 ? (
            <p className="text-gray-500">No subscribers yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#F1E4D1] text-[#162660]">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Subscribed At</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((sub, index) => (
                    <tr key={sub._id} className="border-t hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-400">{index + 1}</td>
                      <td className="px-4 py-3 font-medium">{sub.email}</td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(sub.subscribedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Email Send History */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex items-center gap-2 mb-4">
            <History className="text-[#162660] w-5 h-5" />
            <h2 className="text-xl font-bold text-[#162660]">
              Email Send History
            </h2>
            <span className="ml-auto bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
              {logs.filter((l) => l.status === "success").length} successful
            </span>
          </div>

          {logsLoading ? (
            // ✅ Logs skeleton loader
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : logs.length === 0 ? (
            <p className="text-gray-500">No emails sent yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#F1E4D1] text-[#162660]">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Subject</th>
                    <th className="px-4 py-3">Message</th>
                    <th className="px-4 py-3">Sent To</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, index) => (
                    <tr key={log._id} className="border-t hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-400">{index + 1}</td>
                      <td className="px-4 py-3 font-medium">{log.subject}</td>
                      <td className="px-4 py-3 max-w-xs truncate text-gray-500">
                        {log.message}
                      </td>
                      <td className="px-4 py-3">{log.sentTo} recipients</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          log.status === "success"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(log.sentAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;