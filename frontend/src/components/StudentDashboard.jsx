import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {

  // ===== STATES =====
  const [nominees, setNominees] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  // voted nominee IDs
  const [votedNominees, setVotedNominees] = useState([]);

  const navigate = useNavigate();
  const { token, role } = useAuth();

  // ===== ROUTE PROTECTION =====
  useEffect(() => {
    if (!token) navigate("/login");
    if (role !== "student") navigate("/");
  }, [token, role, navigate]);

  // ===== FETCH NOMINEES =====
  useEffect(() => {
    const fetchNominees = async () => {
      try {
        const res = await api.get("/api/nominees");
        setNominees(res.data);
      } catch {
        setError("Failed to load nominees");
      } finally {
        setLoading(false);
      }
    };
    fetchNominees();
  }, []);

  // ===== FETCH MY VOTES =====
  useEffect(() => {
    const fetchMyVotes = async () => {
      try {
        const res = await api.get("/api/votes/my-votes", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setVotedNominees(res.data); // array of nominee IDs
      } catch {
        console.log("Failed to fetch my votes");
      }
    };

    if (token) fetchMyVotes();
  }, [token]);

  // ===== VOTE FUNCTION =====
  const handleVote = async (nomineeId, position, name) => {

    if (votedNominees.includes(nomineeId.toString())) return;

    try {
      await api.post(
        "/api/votes",
        { nomineeId, position },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // update UI instantly
      setVotedNominees([...votedNominees, nomineeId.toString()]);
      setSuccess(`You voted for ${name}`);
      setError("");
    } catch (err) {
      setError(err.response?.data?.msg || "Voting failed");
      setSuccess("");
    }
  };

  // ===== LOADING UI =====
  if (loading) {
    return <p className="text-center text-white mt-10">Loading…</p>;
  }

  return (
    <div className="min-h-screen py-10 bg-gradient-to-br from-red-200 via-blue-300 to-indigo-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-black mb-6">
          Student Dashboard
        </h2>

        {success && (
          <p className="text-green-700 bg-green-100 p-3 rounded mb-4">
            {success}
          </p>
        )}

        {error && (
          <p className="text-red-600 bg-white p-3 rounded mb-4">
            {error}
          </p>
        )}

        {nominees.length === 0 ? (
          <p className="text-white bg-black/40 p-4 rounded">
            No nominees available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nominees.map((nominee) => {

              const isVoted = votedNominees.includes(nominee._id.toString());

              return (
                <div
                  key={nominee._id}
                  className="bg-white/80 p-6 rounded-xl shadow-xl border"
                >
                  <h3 className="text-xl font-semibold">
                    {nominee.name}
                  </h3>

                  <p className="mt-1">
                    <strong>Position:</strong> {nominee.position}
                  </p>

                  <button
                    disabled={isVoted}
                    onClick={() =>
                      handleVote(
                        nominee._id,
                        nominee.position,
                        nominee.name
                      )
                    }
                    className={`mt-4 w-full p-3 rounded-lg text-white
                      ${
                        isVoted
                          ? "bg-green-600 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                  >
                    {isVoted ? "Voted" : "Vote"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
