import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  // ================= STATE =================
  const [results, setResults] = useState([]); // election results
  const [nominees, setNominees] = useState([]); // nominee list
  const [nomineeName, setNomineeName] = useState(""); // input nominee name
  const [position, setPosition] = useState("president"); // input position
  const [error, setError] = useState(""); // error messages

  const navigate = useNavigate();
  const { token, role } = useAuth();

  // ================= ROUTE PROTECTION =================
  useEffect(() => {
    if (!token) navigate("/login"); // not logged in
    if (role !== "admin") navigate("/"); // not admin
  }, [token, role, navigate]);

  // ================= FETCH RESULTS =================
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await api.get("/api/votes/results", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResults(res.data);
      } catch (err) {
        setError(err.response?.data?.msg || "Failed to load results.");
      }
    };
    if (token) fetchResults();
  }, [token]);

  // ================= FETCH NOMINEES =================
  useEffect(() => {
    const fetchNominees = async () => {
      try {
        const res = await api.get("/api/nominees", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNominees(res.data);
      } catch (err) {
        setError(err.response?.data?.msg || "Failed to load nominees.");
      }
    };
    if (token) fetchNominees();
  }, [token]);

  // ================= ADD NOMINEE =================
  const addNominee = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        "/api/nominees",
        { name: nomineeName, position },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNominees([...nominees, res.data]); // add in UI
      setNomineeName(""); // clear input
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to add nominee.");
    }
  };

  // ================= DELETE NOMINEE =================
  const deleteNominee = async (id) => {
    try {
      await api.delete(`/api/nominees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNominees(nominees.filter((n) => n._id !== id)); // remove from UI
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to delete nominee.");
    }
  };

  // ================= DELETE RESULT (FRONTEND ONLY) =================
  const deleteResult = (indexToDelete) => {
    const updated = results.filter((_, i) => i !== indexToDelete);
    setResults(updated);
  };

  return (
    <div
      className="min-h-screen pt-24 
  bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200"
    >
      <div className="backdrop-blur-md bg-white bg-opacity-70 max-w-5xl mx-auto p-6 rounded-2xl shadow-xl">

        {/* ================= TITLE ================= */}
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          Admin Dashboard
        </h2>

        {/* ================= ERROR ================= */}
        {error && (
          <p className="text-center text-red-500 bg-red-100 p-2 rounded mb-4">
            {error}
          </p>
        )}

        {/* ================= ADD NOMINEE ================= */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Add Nominee
          </h3>

          <form onSubmit={addNominee} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={nomineeName}
              onChange={(e) => setNomineeName(e.target.value)}
              placeholder="Nominee Name"
              className="flex-1 p-3 border rounded-lg"
              required
            />

            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="p-3 border rounded-lg"
            >
              <option value="president">President</option>
              <option value="vice-president">Vice-President</option>
              <option value="secretary">Secretary</option>
              <option value="treasurer">Treasurer</option>
            </select>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg"
            >
              Add
            </button>
          </form>
        </div>

        {/* ================= NOMINEES LIST ================= */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Nominees List
          </h3>

          {nominees.length === 0 ? (
            <p>No nominees added yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {nominees.map((nominee) => (
                <div key={nominee._id} className="p-4 border rounded-lg shadow-sm bg-white">
                  <p className="font-semibold text-lg">{nominee.name}</p>
                  <p className="capitalize">Position: {nominee.position}</p>

                  <button
                    onClick={() => deleteNominee(nominee._id)}
                    className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= RESULTS ================= */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Election Results
          </h3>

          {results.length === 0 ? (
            <p>No votes cast yet.</p>
          ) : (
            <div className="space-y-4">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg bg-gray-50 shadow-sm flex justify-between items-center"
                >
                  <div>
                    <p><strong>Nominee:</strong> {result.nomineeName}</p>
                    <p><strong>Position:</strong> {result.position}</p>
                    <p><strong>Votes:</strong> {result.votes}</p>
                  </div>

                  {/* DELETE RESULT BUTTON */}
                  <button
                    onClick={() => deleteResult(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
