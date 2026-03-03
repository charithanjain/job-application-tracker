import { useState } from "react";
import { createJob } from "../services/jobService";
import { useNavigate } from "react-router-dom";

function AddJob() {
  const [companyName, setCompanyName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [followUpDate, setFollowUpDate] = useState("");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!companyName.trim()) return "Company name is required.";
    if (!jobRole.trim()) return "Job role is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      await createJob({
        companyName: companyName.trim(),
        jobRole: jobRole.trim(),
        status,
        followUpDate: followUpDate || null,
        notes: notes.trim(),
      });

      navigate("/dashboard");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to create job. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-8">
      <h1 className="mb-6 text-2xl font-medium text-center">
        Add Job Application Details
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-6 rounded-md shadow-sm space-y-4"
      >
        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded">
            {error}
          </div>
        )}

        <input
          className="border border-gray-300 px-3 py-2 w-full rounded-md"
          placeholder="Company"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <input
          className="border border-gray-300 px-3 py-2 w-full rounded-md"
          placeholder="Role"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
        />

        <select
          className="border border-gray-300 px-3 py-2 w-full rounded-md"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
          <option>Offer</option>
        </select>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="text-sm text-gray-600 sm:w-1/3">
            Follow-up Date
          </label>
          <input
            type="date"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>

        <textarea
          placeholder="Notes (Interview rounds, topics, contacts, etc.)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border border-gray-300 px-3 py-2 w-full rounded-md"
          rows={4}
        />

        <button
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 transition text-white w-full py-2 rounded-md disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add Job"}
        </button>
      </form>
    </div>
  );
}

export default AddJob;
