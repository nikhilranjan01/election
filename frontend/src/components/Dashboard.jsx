import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [nominees, setNominees] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { token, role } = useAuth();

  // 🔒 Protect route
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    if (role !== "student") {
      navigate("/");
    }
  }, [token, role, navigate]);

  // 📥 Fetch nominees
  useEffect(() => {
    const fetchNominees = async () => {
      try {
        const res = await api.get("/api/nominees");
        setNominees(res.data);
      } catch (err) {
        setError("Failed to load nominees");
      } finally {
        setLoading(false);
      }
    };

    fetchNominees();
  }, []);

  // 🗳️ Vote
  const handleVote = async (nomineeId, position, name) => {
    if (
      !window.confirm(
        `Are you sure you want to vote for ${name} (${position})?`
      )
    )
      return;

    try {
      await api.post(
        "/api/votes",
        { nomineeId, position },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Vote cast successfully!");
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          "Voting failed. You may have already voted."
      );
    }
  };

  if (loading) {
    return (
      <p className="text-center text-white text-lg mt-10">Loading nominees…</p>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center py-10"
      style={{ backgroundImage: "url('/images/background.jpeg')" }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-6 drop-shadow">
          Student Dashboard
        </h2>

        {error && (
          <p className="text-red-600 bg-white/80 p-3 rounded mb-4 w-fit shadow">
            {error}
          </p>
        )}

        {nominees.length === 0 ? (
          <p className="text-white bg-black/40 p-4 rounded w-fit">
            No nominees available for voting.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nominees.map((nominee) => (
              <div
                key={nominee._id}
                className="bg-white/80 p-6 rounded-xl shadow-xl border hover:shadow-2xl transition"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {nominee.name}
                </h3>

                <p className="mt-1 text-gray-700">
                  <strong>Position:</strong> {nominee.position}
                </p>

                <button
                  onClick={() =>
                    handleVote(
                      nominee._id,
                      nominee.position,
                      nominee.name
                    )
                  }
                  className="mt-4 w-full p-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                >
                  Vote
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
