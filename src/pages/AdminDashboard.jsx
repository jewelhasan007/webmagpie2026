
Claude finished the response
newpage.jpg

import React, { useState, useEffect, useRef, useCallback } from "react"; import { useNavigate } from "react-router-dom"; import { Rocket, LogOut, Users, Mail, Send, History, ImagePlus, X, Image, } from "lucide-react"; const API = import.meta.env.VITE_BASE_URL; // ─── Loaders ────────────

pasted

in the attached adminDashboard i want to add another page where i can show some topics and record that looks like the attached image

1:15 PM

Reading frontend design skill
Reading frontend design skill
Now I have a clear picture of both the existing dashboard design and the target UI from the screenshot. Let me build a new ResourcesPage component that matches the accordion-style layout shown in the image, using the existing dashboard's color palette (
#162660, 
#F1E4D1).


Created a file, read a file
Created a file, read a file
Here's your new ResourcesPage.jsx. It matches the accordion layout from your screenshot and uses the same design language as your existing dashboard (
#162660, 
#F1E4D1, rounded-2xl, shadow cards, etc.).

What's included:

Stats bar — platforms count, total prompts, best for beginners, highest value leads
7 platform sections — Upwork/Fiverr, LinkedIn, Facebook Groups, X (Twitter), Cold Email, Google/Local SEO, Referral — each with 3 copy-ready prompts
Accordion toggle — click any row to expand/collapse its prompts
One-click copy — each prompt card has a "Copy" button that flashes "Copied!" feedback
Navigation — a "← Dashboard" button to go back + the same Logout button
To wire it up in your router, add two things:

jsx
// In your router (e.g. App.jsx)
import ResourcesPage from "./ResourcesPage";

<Route path="/admin/resources" element={<ResourcesPage />} />
Then add a nav link in your AdminDashboard header:

jsx
<button onClick={() => navigate("/admin/resources")}
  className="flex items-center gap-2 px-4 py-2 bg-[#162660]/10 text-[#162660] rounded-xl hover:bg-[#162660]/20 transition-colors">
  <BookOpen size={16} />
  Resources
</button>

Resourcespage
Code · JSX 

import React, { useState, useEffect, useRef, useCallback } from "react"; import { useNavigate } from "react-router-dom"; import { Rocket, LogOut, Users, Mail, Send, History, ImagePlus, X, Image, } from "lucide-react"; const API = import.meta.env.VITE_BASE_URL; // ─── Loaders ────────────

pasted

please give me the complete adminDashboard component as the existing attached

1:22 PM
Here's the complete AdminDashboard with the Resources nav button added:


Created a file, read a file
Created a file, read a file
The only two changes from your original are:

BookOpen added to the lucide-react import at the top
Header buttons — the single Logout button is now wrapped in a flex div alongside a new Resources button that navigates to /admin/resources
Everything else is byte-for-byte identical to what you had.


Admindashboard
Code · JSX 

import React, { useState, useEffect } from 'react'; import { Link, useLocation } from 'react-router-dom'; import { motion, AnimatePresence } from 'motion/react'; import { Menu, X, Rocket, ChevronDown, Phone, } from 'lucide-react'; import { cn } from '../lib/utils'; export cons

pasted

also add the logout button in the resources page and give me the full resources page component
the adminDashboard page logout button under the navbar. Give me the complete adminDashboard page and the attached navbar component is like

1:50 PM
Looking at your navbar, the logout button in AdminDashboard should sit below the navbar (which is fixed at z-50). Let me give you both complete files.


Created 2 files, ran a command, read a file
Created 2 files, ran a command, read a file
Both files are ready. Here's a summary of every change made:

AdminDashboard.jsx

Outer wrapper changed from p-8 → pt-24 pb-12 px-8 so the content clears your fixed navbar (~72px tall)
Header now has a flex row with both the Resources button and Logout button side by side
BookOpen added to the lucide import
ResourcesPage.jsx

Same pt-24 pb-12 px-8 navbar offset applied
Header has a flex row with Dashboard button (navigates to /admin) and Logout button side by side — matching the exact same pattern as AdminDashboard
BookOpen icon used for the page header instead of Rocket to visually distinguish the two pages

Admindashboard
Code · JSX 

Resourcespage
Code · JSX 





Claude is AI and can make mistakes. Please double-check responses.


raw
Admindashboard · JSX
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Rocket, LogOut, Users, Mail, Send, History, ImagePlus, X, Image, BookOpen,
} from "lucide-react";
 
const API = import.meta.env.VITE_BASE_URL;
 
// ─── Loaders ────────────────────────────────────────────────────────────────
 
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
 
const SendingLoader = () => (
  <div className="flex items-center gap-2">
    <div className="w-4 h-4 rounded-full border-2 border-t-white border-white/30 animate-spin" />
    Sending...
  </div>
);
 
// ─── Helpers ────────────────────────────────────────────────────────────────
 
const compressImage = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 800;
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
 
const buildHtml = (subject, message, imageUrl) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: #162660; padding: 20px; border-radius: 12px 12px 0 0; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">ZOZOWeb</h1>
    </div>
    <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 12px 12px;">
      <h2 style="color: #162660;">${subject}</h2>
      <p style="color: #475569; line-height: 1.8; white-space: pre-line;">${message}</p>
      ${
        imageUrl
          ? `<div style="margin-top: 20px; text-align: center;">
               <img src="${imageUrl}" alt="Newsletter Image"
                    style="max-width: 100%; border-radius: 12px;" />
             </div>`
          : ""
      }
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
      <p style="color: #94a3b8; font-size: 12px; text-align: center;">
        © ${new Date().getFullYear()} ZOZOWeb Digital Agency. All rights reserved.<br/>
        You are receiving this because you subscribed to our newsletter.
      </p>
    </div>
  </div>
`;
 
// ─── Component ───────────────────────────────────────────────────────────────
 
const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");
  const fileInputRef = useRef(null);
 
  const [subscribers, setSubscribers] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const [sending, setSending] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [modalImage, setModalImage] = useState(null);
 
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    } else {
      Promise.all([fetchSubscribers(), fetchLogs()]).finally(() =>
        setPageReady(true)
      );
    }
  }, []);
 
  // ─── Data fetchers ─────────────────────────────────────────────────────────
 
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
 
  const fetchLogs = useCallback(async () => {
    setLogsLoading(true);
    try {
      const res = await fetch(`${API}/api/newsletter/logs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return [];
      }
      const data = await res.json();
      setLogs(data);
      return data;
    } catch (err) {
      console.error(err);
      return [];
    } finally {
      setLogsLoading(false);
    }
  }, [token]);
 
  // ─── Image handling ────────────────────────────────────────────────────────
 
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setStatus("❌ Image must be under 5MB");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };
 
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
 
  // ─── Polling helper ────────────────────────────────────────────────────────
 
  const pollLogsUntilDone = async (previousSuccessCount) => {
    const MAX_ATTEMPTS = 6;
    const INTERVAL_MS = 5000;
 
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      setStatus(`⏳ Delivering… (check ${attempt}/${MAX_ATTEMPTS})`);
      await new Promise((r) => setTimeout(r, INTERVAL_MS));
 
      const freshLogs = await fetchLogs();
      const newSuccessCount = freshLogs.filter(
        (l) => l.status === "success"
      ).length;
 
      if (newSuccessCount > previousSuccessCount) {
        setStatus("✅ Emails delivered to all subscribers!");
        return;
      }
    }
 
    setStatus("⚠️ Still sending — check logs in a moment.");
  };
 
  // ─── Send handler ──────────────────────────────────────────────────────────
 
  const handleSend = async () => {
    if (!subject || !message) {
      setStatus("⚠️ Please enter subject and message.");
      return;
    }
 
    setSending(true);
    setStatus("⏳ Preparing email…");
 
    const previousSuccessCount = logs.filter(
      (l) => l.status === "success"
    ).length;
 
    try {
      let imageUrl = null;
 
      if (imageFile) {
        setStatus("⏳ Compressing image…");
        const imageBase64 = await compressImage(imageFile);
 
        setStatus("⏳ Uploading image…");
        const uploadRes = await fetch(`${API}/api/newsletter/upload-image`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ imageBase64 }),
        });
 
        if (!uploadRes.ok) {
          const uploadErr = await uploadRes.json();
          setStatus(`❌ Image upload failed: ${uploadErr.error || "Unknown error"}`);
          return;
        }
 
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      }
 
      const htmlContent = buildHtml(subject, message, imageUrl);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);
 
      let res;
      try {
        setStatus("⏳ Submitting…");
        res = await fetch(`${API}/api/newsletter/send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ subject, message, html: htmlContent, imageUrl }),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
      } catch (fetchErr) {
        clearTimeout(timeoutId);
        if (fetchErr.name === "AbortError") {
          setStatus("⏳ Request timed out — checking delivery in background…");
          await pollLogsUntilDone(previousSuccessCount);
          return;
        }
        throw fetchErr;
      }
 
      let data;
      try {
        const text = await res.text();
        data = JSON.parse(text);
      } catch {
        setStatus("❌ Server returned an unexpected response — check logs.");
        return;
      }
 
      if (res.ok) {
        setSubject("");
        setMessage("");
        handleRemoveImage();
        await pollLogsUntilDone(previousSuccessCount);
      } else {
        setStatus(`❌ ${data?.error || "Something went wrong."}`);
      }
    } catch (err) {
      setStatus(`❌ Network error: ${err.message}`);
    } finally {
      setSending(false);
    }
  };
 
  // ─── Logout ────────────────────────────────────────────────────────────────
 
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };
 
  // ─── Render ────────────────────────────────────────────────────────────────
 
  if (!pageReady) return <PageLoader />;
 
  return (
    // pt-24 pushes content below the fixed navbar (navbar is ~72px tall)
    <div className="min-h-screen bg-gray-100 pt-24 pb-12 px-8">
      <div className="max-w-5xl mx-auto space-y-8">
 
        {/* ── Page header bar ── */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#162660] rounded-xl flex items-center justify-center">
              <Rocket className="text-white w-5 h-5" />
            </div>
            <h1 className="text-3xl font-bold text-[#162660]">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/admin/resources")}
              className="flex items-center gap-2 px-4 py-2 bg-[#162660]/10 text-[#162660] rounded-xl hover:bg-[#162660]/20 transition-colors font-medium"
            >
              <BookOpen size={16} />
              Resources
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
 
        {/* ── Stats ── */}
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
 
        {/* ── Send Email ── */}
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
            disabled={sending}
            className="w-full p-3 border rounded-xl focus:outline-none focus:border-[#162660] disabled:opacity-50"
          />
 
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            disabled={sending}
            className="w-full p-3 border rounded-xl focus:outline-none focus:border-[#162660] disabled:opacity-50"
          />
 
          {/* Image upload */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">
              Attach Image (optional, max 5MB)
            </p>
            {imagePreview ? (
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-48 h-48 object-cover rounded-xl border border-gray-200"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={sending}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 disabled:opacity-50"
                >
                  <X size={12} />
                </button>
                <p className="text-xs text-gray-400 mt-1 truncate w-48">
                  {imageFile?.name}
                </p>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={sending}
                className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-[#162660]/30 rounded-xl text-[#162660]/60 hover:border-[#162660] hover:text-[#162660] transition-colors w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ImagePlus size={20} />
                Click to upload image
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
 
          <button
            type="button"
            onClick={handleSend}
            disabled={sending}
            className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {sending ? <SendingLoader /> : "Send to All Subscribers"}
          </button>
 
          {status && (
            <p
              className={`text-sm font-medium ${
                status.startsWith("✅")
                  ? "text-green-600"
                  : status.startsWith("❌")
                  ? "text-red-500"
                  : status.startsWith("⚠️")
                  ? "text-yellow-500"
                  : "text-gray-600"
              }`}
            >
              {status}
            </p>
          )}
        </div>
 
        {/* ── Subscriber List ── */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex items-center gap-2 mb-4">
            <Users className="text-[#162660] w-5 h-5" />
            <h2 className="text-xl font-bold text-[#162660]">Subscriber List</h2>
            <span className="ml-auto bg-[#162660]/10 text-[#162660] text-xs font-bold px-3 py-1 rounded-full">
              {subscribers.length} total
            </span>
          </div>
          {loading ? (
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
                    <tr
                      key={sub._id}
                      className="border-t hover:bg-gray-50 transition-colors"
                    >
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
 
        {/* ── Email Send History ── */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex items-center gap-2 mb-4">
            <History className="text-[#162660] w-5 h-5" />
            <h2 className="text-xl font-bold text-[#162660]">Email Send History</h2>
            <span className="ml-auto bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
              {logs.filter((l) => l.status === "success").length} successful
            </span>
          </div>
          {logsLoading ? (
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
                <thead className="bg-[#F1E4D1] text-[#162660] text-xs uppercase tracking-wide">
                  <tr>
                    <th className="px-3 py-2">#</th>
                    <th className="px-3 py-2">Subject</th>
                    <th className="px-3 py-2">Message</th>
                    <th className="px-3 py-2">Image</th>
                    <th className="px-3 py-2">Sent To</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Date</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {logs.map((log, index) => (
                    <tr
                      key={log._id}
                      className="border-t hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-3 py-1.5 text-gray-400">{index + 1}</td>
                      <td className="px-3 py-1.5 font-medium max-w-[140px] truncate">{log.subject}</td>
                      <td className="px-3 py-1.5 max-w-[160px] truncate text-gray-500">
                        {log.message}
                      </td>
                      <td className="px-3 py-1.5">
                        {log.imageUrl ? (
                          <div className="relative inline-block group">
                            <img
                              src={log.imageUrl}
                              alt="Email attachment"
                              className="w-8 h-8 object-cover rounded border border-gray-200 cursor-pointer transition-transform group-hover:scale-110"
                              onClick={() => setModalImage(log.imageUrl)}
                              title="Click to view"
                            />
                            <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block pointer-events-none">
                              <img
                                src={log.imageUrl}
                                alt="Preview"
                                className="w-40 h-40 object-cover rounded-xl border-2 border-white shadow-2xl"
                              />
                              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-gray-200" />
                            </div>
                          </div>
                        ) : log.hasImage ? (
                          <span className="flex items-center gap-1 text-[#162660] font-medium">
                            <Image size={12} />
                            Yes
                          </span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-3 py-1.5 text-gray-600">{log.sentTo} recipients</td>
                      <td className="px-3 py-1.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            log.status === "success"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                      <td className="px-3 py-1.5 text-gray-500 whitespace-nowrap">
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
 
      {/* ── Image modal ── */}
      {modalImage && (
        <div
          onClick={() => setModalImage(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.72)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", width: "40%" }}
          >
            <button
              onClick={() => setModalImage(null)}
              style={{
                position: "absolute", top: "-12px", right: "-12px",
                width: "28px", height: "28px", borderRadius: "50%",
                background: "white", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)", zIndex: 1,
              }}
            >
              <X size={14} />
            </button>
            <img
              src={modalImage}
              alt="Preview"
              style={{
                width: "100%", display: "block",
                borderRadius: "16px",
                border: "4px solid white",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              }}
            />
          </div>
        </div>
      )}
 
    </div>
  );
};
 
export default AdminDashboard;
 






