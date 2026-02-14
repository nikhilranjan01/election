// import React from "react";
import { useNavigate } from "react-router-dom";

function Greeting() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4
    bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">

      {/* MAIN CONTAINER */}
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-3xl w-full text-center">

        {/* TITLE */}
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">
          Student Voting System
        </h1>

        {/* SUBTITLE */}
        <p className="text-gray-600 text-lg mb-6">
          Welcome to the official campus election platform.
          Vote securely, view live results, and be a part of your
          institution’s leadership selection process.
        </p>

        {/* FEATURE BOXES */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

          <div className="bg-indigo-50 p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold text-indigo-700 mb-1">
              Secure Voting
            </h3>
            <p className="text-sm text-gray-600">
              Your vote is encrypted and protected.
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold text-green-700 mb-1">
              Live Results
            </h3>
            <p className="text-sm text-gray-600">
              Track election results in real-time.
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold text-purple-700 mb-1">
              Easy Access
            </h3>
            <p className="text-sm text-gray-600">
              Simple login and fast voting process.
            </p>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center">

          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-md"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow-md"
          >
            Create Account
          </button>

        </div>

        {/* FOOTER TEXT */}
        <p className="mt-10 text-sm text-gray-500">
          © 2026 Student Election Portal • Secure • Transparent • Reliable
        </p>

      </div>
    </div>
  );
}

export default Greeting;
