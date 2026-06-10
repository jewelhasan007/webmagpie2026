/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import ProjectDetails from './pages/ProjectDetails';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import LearnMore from './pages/LearnMore';
import MoreAboutStats from './pages/MoreAboutStats';
import CreateBlog from './pages/CreateBlog';
import ClientMessage from './pages/ClientMessage';
import SubscriberList from './pages/SubscriberList ';
import BlogDetails from './pages/BlogDetails';
import ProcessDetail from './pages/ProcessDetails';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import RouteLoader from './components/RouteLoader';
import ResourcesPage from "./ResourcesPage";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// Option 3 — Secret Keyboard Shortcut for admin dashboard
// ✅ Separate component inside Router so useNavigate works
const KeyboardShortcut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "L" || e.key === "l")) {
        e.preventDefault();
        navigate("/admin/login");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return null;
};
export default function App() {

  return (
    <Router>
      <ScrollToTop />
      <KeyboardShortcut /> {/* ✅ inside Router */}
       <RouteLoader /> {/* ✅ add this */}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:id" element={<ProjectDetails />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
              <Route path="/create-blog" element={<CreateBlog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services/:slug" element={<LearnMore />} />
              <Route path="/about-stats" element={<MoreAboutStats />} />
              <Route path="/new-client" element={<ClientMessage />} />
              <Route path="/subscriber-list" element={<SubscriberList />} />
              <Route path="/process/:id" element={<ProcessDetail />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/resources" element={<ResourcesPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
