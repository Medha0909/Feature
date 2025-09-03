import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import TeacherPage from "./pages/TeacherPage";
import "./styles/globals.css";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ display:"flex", gap: 12, padding: 12, borderBottom: "1px solid #ddd" }}>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/teachers">Teachers</Link>
      </nav>
      <div style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/teachers" element={<PrivateRoute><TeacherPage /></PrivateRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
