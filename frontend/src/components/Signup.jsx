import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Signup = () => {

  // ===== STATE =====
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // 🔄 spinner control

  const navigate = useNavigate();
  const { login } = useAuth(); // 🔐 central auth

  // ===== SIGNUP FUNCTION =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ College email validation
    const emailRegex = /^[a-zA-Z0-9._]+@jietjodhpur\.ac\.in$/;
    if (!emailRegex.test(email)) {
      setError(
        "Please use a valid JIET college email (e.g., student@jietjodhpur.ac.in)."
      );
      return;
    }

    setLoading(true); // 🔄 start spinner

    try {
      // 🔥 API call
      const res = await api.post("/api/auth/signup", {
        email,
        password,
      });

      // 🔐 decode token
      const payload = JSON.parse(atob(res.data.token.split(".")[1]));

      // 🔥 auto login after signup
      login(res.data.token, payload.role);

      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    } finally {
      setLoading(false); // 🛑 stop spinner
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500"
    >
      {/* ===== CARD ===== */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="/vite.jpg" alt="Logo" className="h-16 w-16" />
        </div>

        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          Create an Account
        </h2>

        {/* ===== ERROR MESSAGE ===== */}
        {error && (
          <p className="text-red-600 text-center bg-red-100 p-2 rounded mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* ===== EMAIL INPUT ===== */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              JIET Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading} // 🔒 disable during request
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none disabled:opacity-70"
              placeholder="student@jietjodhpur.ac.in"
              required
            />
          </div>

          {/* ===== PASSWORD INPUT ===== */}
          <div className="relative">
            <label className="block text-gray-800 font-medium mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none disabled:opacity-70"
              required
            />

            {/* 👁 Show / Hide Password */}
            <button
              type="button"
              disabled={loading}
              className="absolute right-3 top-9 text-gray-600 hover:text-gray-800"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaRegEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          {/* ===== SUBMIT BUTTON ===== */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-70 flex items-center justify-center"
          >
            {loading ? (
              <ClipLoader size={20} color="#ffffff" /> // 🔄 spinner inside button
            ) : (
              "Signup"
            )}
          </button>

        </form>

        {/* ===== LOGIN LINK ===== */}
        <p className="text-center mt-6 text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-800"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
