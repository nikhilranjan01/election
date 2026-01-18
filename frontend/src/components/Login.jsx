import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // 🔥 central auth

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      // token payload decode (safe)
      const payload = JSON.parse(atob(res.data.token.split(".")[1]));

      // 🔐 central login
      login(res.data.token, payload.role);

      // role-based redirect
      navigate(payload.role === "admin" ? "/admin-dashboard" : "/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/images/background.jpeg')" }}
    >
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/30">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="/images/jiet-logo.png" alt="Logo" className="h-16 w-16" />
        </div>

        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          Login Page
        </h2>

        {error && (
          <p className="text-red-600 text-center bg-red-100 p-2 rounded mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g., name@jietjodhpur.ac.in"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-800 font-medium mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-600 hover:text-gray-800"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaRegEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-gray-700">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:text-blue-800"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
