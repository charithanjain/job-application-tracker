import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateJob, getJobs } from "../services/jobService";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await getJobs();
        const found = res.data.find((j) => j._id === id);
        setJob(found);
      } catch (error) {
        console.error("Failed to fetch job:", error);
      }
    };
    fetchJob();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateJob(id, job);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to update job:", error);
    }
  };

  if (!job)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-8">
      <h1 className="mb-6 text-2xl font-medium text-center">
        Edit Job Application Details
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-6 rounded-md shadow-sm space-y-4"
      >
        <input
          className="border border-gray-300 px-3 py-2 w-full rounded-md"
          value={job.companyName}
          onChange={(e) => setJob({ ...job, companyName: e.target.value })}
        />

        <input
          className="border border-gray-300 px-3 py-2 w-full rounded-md"
          value={job.jobRole}
          onChange={(e) => setJob({ ...job, jobRole: e.target.value })}
        />

        <select
          className="border border-gray-300 px-3 py-2 w-full rounded-md"
          value={job.status}
          onChange={(e) => setJob({ ...job, status: e.target.value })}
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
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
            value={job.followUpDate ? job.followUpDate.split("T")[0] : ""}
            onChange={(e) => setJob({ ...job, followUpDate: e.target.value })}
          />
        </div>

        <textarea
          className="border border-gray-300 px-3 py-2 w-full rounded-md"
          rows={4}
          value={job.notes || ""}
          onChange={(e) => setJob({ ...job, notes: e.target.value })}
        />

        <button className="bg-blue-600 hover:bg-blue-700 transition text-white w-full py-2 rounded-md disabled:opacity-60">
          Update Job
        </button>
      </form>
    </div>
  );
}

export default EditJob;
