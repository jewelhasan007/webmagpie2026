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

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!token) navigate("/admin/login");
    else fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/newsletter`, {
        headers: { Authorization: `Bearer ${token}` }, // ✅ send token
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
          Authorization: `Bearer ${token}`, // ✅ send token
        },
        body: JSON.stringify({ subject, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Emails sent successfully!");
        setSubject("");
        setMessage("");
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
        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-[#162660] font-bold text-lg">
            Total Subscribers: {subscribers.length}
          </p>
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
          {status && <p className="text-sm">{status}</p>}
        </div>

        {/* Subscriber List */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold text-[#162660] mb-4">
            Subscriber List
          </h2>
          {loading ? (
            <p>Loading...</p>
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
                  <tr key={sub._id} className="border-t">
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

      </div>
    </div>
  );
};

export default AdminDashboard;