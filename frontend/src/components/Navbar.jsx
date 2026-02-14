import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // mobile toggle
  const navigate = useNavigate();

  const { token, role, logout } = useAuth();

  // safe login check
  const isLoggedIn =
    token && token !== "null" && token !== "undefined";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isAdmin = role === "admin";

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">

          {/* LOGO + TITLE */}
          <div className="flex items-center">
            <img
              src="/images/jiet-logo.png"
              alt="Logo"
              className="h-10 w-10 mr-2 rounded-full"
            />
            <h1 className="text-lg md:text-xl font-bold">
              Student Council Election
            </h1>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-4">

            {/* Dashboard only if login */}
            {isLoggedIn && (
              <Link
                to={isAdmin ? "/admin-dashboard" : "/dashboard"}
                className="hover:bg-indigo-700 px-3 py-2 rounded-md"
              >
                {isAdmin ? "Admin Dashboard" : "Student Dashboard"}
              </Link>
            )}

            {/* Login / Logout */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:bg-indigo-700 px-3 py-2 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="hover:bg-green-700 px-3 py-2 rounded-md"
                >
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-indigo-700 px-3 py-2 space-y-2">

          {isLoggedIn && (
            <Link
              to={isAdmin ? "/admin-dashboard" : "/dashboard"}
              className="block hover:bg-indigo-600 px-3 py-2 rounded-md"
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
                className="block hover:bg-indigo-600 px-3 py-2 rounded-md"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block hover:bg-green-600 px-3 py-2 rounded-md"
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
