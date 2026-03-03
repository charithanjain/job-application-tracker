import { useEffect, useState, useMemo } from "react";
import { getJobs, deleteJob } from "../services/jobService";
import JobCard from "../components/JobCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import SummaryCards from "../components/SummaryCards";
import { Link } from "react-router-dom";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");

  const fetchJobs = async () => {
    const res = await getJobs();
    setJobs(res.data);
  };

  const handleDelete = async (id) => {
    await deleteJob(id);
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    let updated = [...jobs];

    if (searchTerm) {
      updated = updated.filter((job) =>
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (filterStatus !== "All") {
      updated = updated.filter((job) => job.status === filterStatus);
    }

    if (sortOrder === "newest") {
      updated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      updated.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    return updated;
  }, [jobs, searchTerm, filterStatus, sortOrder]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <SummaryCards jobs={jobs} />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold">My Applications</h2>

          <Link
            to="/add-job"
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-md text-center sm:w-auto w-full"
          >
            + Add Job
          </Link>
        </div>

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <FilterBar
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        {jobs.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <h3 className="text-lg">No applications yet</h3>
            <p>Start by adding your first job 🚀</p>
          </div>
        )}

        <div className="space-y-4 mt-6">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
