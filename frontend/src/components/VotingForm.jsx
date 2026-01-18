import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function VotingForm({ nominees }) {
  const [votes, setVotes] = useState({
    president: "",
    "vice-president": "",
    secretary: "",
    treasurer: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useAuth();

  const handleVote = async () => {
    setIsLoading(true);

    try {
      const hasVotes = Object.values(votes).some(Boolean);
      if (!hasVotes) {
        toast.error("Please select at least one candidate.");
        return;
      }

      for (const [position, nomineeId] of Object.entries(votes)) {
        if (!nomineeId) continue;

        await api.post(
          "/api/votes",
          { nomineeId, position },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      toast.success("Votes submitted successfully!");
    } catch (error) {
      console.error("Voting error:", error);
      toast.error(
        error.response?.data?.msg || "Failed to submit votes."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Cast Your Vote
      </h3>

      {["president", "vice-president", "secretary", "treasurer"].map(
        (position) => (
          <div key={position} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              {position.replace("-", " ").toUpperCase()}
            </label>

            <select
              value={votes[position]}
              onChange={(e) =>
                setVotes({ ...votes, [position]: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            >
              <option value="">Select Candidate</option>
              {nominees
                .filter((n) => n.position === position)
                .map((n) => (
                  <option key={n._id} value={n._id}>
                    {n.name}
                  </option>
                ))}
            </select>
          </div>
        )
      )}

      <button
        onClick={handleVote}
        disabled={isLoading}
        className={`w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition ${
          isLoading ? "cursor-not-allowed bg-blue-400" : ""
        }`}
      >
        {isLoading ? "Submitting..." : "Submit Votes"}
      </button>
    </div>
  );
}

export default VotingForm;
