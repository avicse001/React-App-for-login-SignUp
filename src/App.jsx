import React from "react";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  const location = useLocation();
  return (
    <div className="app-bg">
      <header className="site-header">
        <Link to="/login" className="brand">
          <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2l3.5 7.1L23 9l-5.5 5.3L19 22l-7-3.7L5 22l1.5-7.7L1 9l7.5-.9L12 2z" fill="currentColor" />
          </svg>
          <span></span>
        </Link>
        <nav className="nav">
          <Link className={location.pathname === "/login" ? "active" : ""} to="/login"></Link>
          <Link className={location.pathname === "/signup" ? "active" : ""} to="/signup"></Link>
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} · Design & Developed By Avinash</p>
      </footer>
    </div>
  );
}
