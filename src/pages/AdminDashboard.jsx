import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_BASE_URL;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [subscribers, setSubscribers] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]); // ✅ email logs state
  const [logsLoading, setLogsLoading] = useState(false); // ✅ logs loading state

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!token) navigate("/admin/login");
    else {
      fetchSubscribers();
      fetchLogs(); // ✅ fetch logs on load
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

  // ✅ Fetch email logs
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

    setStatus("Sending...");

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
        fetchLogs(); // ✅ refresh logs after sending
      } else {
        setStatus(`❌ ${data?.error || "Failed"}`);
      }
    } catch (err) {
      setStatus(`❌ Network error: ${err.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#162660]">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-xl"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500 text-sm uppercase tracking-widest mb-1">
              Total Subscribers
            </p>
            <p className="text-4xl font-bold text-[#162660]">
              {subscribers.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500 text-sm uppercase tracking-widest mb-1">
              Emails Sent
            </p>
            <p className="text-4xl font-bold text-green-600">
              {logs.filter((l) => l.status === "success").length}
            </p>
          </div>
        </div>

        {/* Send Email */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-4">
          <h2 className="text-xl font-bold text-[#162660]">
            Send Email to All Subscribers
          </h2>
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 border rounded-xl"
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="w-full p-3 border rounded-xl"
          />
          <button
            type="button"
            onClick={handleSend}
            className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold"
          >
            Send to All Subscribers
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
          <h2 className="text-xl font-bold text-[#162660] mb-4">
            Subscriber List
          </h2>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : subscribers.length === 0 ? (
            <p className="text-gray-500">No subscribers yet.</p>
          ) : (
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
                  <tr key={sub._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{sub.email}</td>
                    <td className="px-4 py-3">
                      {new Date(sub.subscribedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Email Send History */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold text-[#162660] mb-4">
            📧 Email Send History
          </h2>
          {logsLoading ? (
            <p className="text-gray-500">Loading logs...</p>
          ) : logs.length === 0 ? (
            <p className="text-gray-500">No emails sent yet.</p>
          ) : (
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
                  <tr key={log._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>
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
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;