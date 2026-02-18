import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // current path

  const { token, role, logout } = useAuth();

  // safe login check
  const isLoggedIn =
    token && token !== "null" && token !== "undefined";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isAdmin = role === "admin";

  // active page checks
  const isHomePage = location.pathname === "/";
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  return (
    <nav className="bg-linear-to-r from-cyan-600 via-blue-600 to-indigo-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">

          {/* LOGO + TITLE */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="/vite.jpg"
              alt="Logo"
              className="h-10 w-10 mr-2 rounded-full shadow-md"
            />
            <h1 className="text-lg md:text-xl font-bold tracking-wide">
              Student Voting System
            </h1>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-4">

            {/* HOME */}
            <Link
              to="/"
              className={`px-3 py-2 rounded-md transition
                ${isHomePage ? "bg-green-500" : "hover:bg-white/20"}`}
            >
              Home
            </Link>

            {isLoggedIn && (
              <Link
                to={isAdmin ? "/admin-dashboard" : "/dashboard"}
                className="hover:bg-white/20 px-3 py-2 rounded-md transition"
              >
                {isAdmin ? "Admin Dashboard" : "Student Dashboard"}
              </Link>
            )}

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md transition"
              >
                Logout
              </button>
            ) : (
              <>
                {/* LOGIN */}
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-md transition
                    ${isLoginPage ? "bg-green-500" : "hover:bg-white/20"}`}
                >
                  Login
                </Link>

                {/* SIGNUP */}
                <Link
                  to="/signup"
                  className={`px-3 py-2 rounded-md transition
                    ${isSignupPage ? "bg-green-500" : "hover:bg-white/20"}`}
                >
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-linear-to-b from-blue-700 to-indigo-800 px-3 py-2 space-y-2">

          {/* HOME */}
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md
              ${isHomePage ? "bg-green-500" : "hover:bg-white/20"}`}
          >
            Home
          </Link>

          {isLoggedIn && (
            <Link
              to={isAdmin ? "/admin-dashboard" : "/dashboard"}
              className="block hover:bg-white/20 px-3 py-2 rounded-md"
            >
              {isAdmin ? "Admin Dashboard" : "Student Dashboard"}
            </Link>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full text-left bg-red-500 px-3 py-2 rounded-md"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className={`block px-3 py-2 rounded-md
                  ${isLoginPage ? "bg-green-500" : "hover:bg-white/20"}`}
              >
                Login
              </Link>

              <Link
                to="/signup"
                className={`block px-3 py-2 rounded-md
                  ${isSignupPage ? "bg-green-500" : "hover:bg-white/20"}`}
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
