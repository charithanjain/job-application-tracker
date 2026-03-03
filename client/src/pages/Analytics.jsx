import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Analytics() {
  const { token } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/jobs`, {
        headers: { Authorization: token },
      })
      .then((res) => setJobs(res.data))
      .catch(() => setJobs([]));
  }, [token]);

  if (jobs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-8 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          No Analytics to Display
        </h2>
        <p className="text-gray-600 max-w-md">
          You haven't added any job applications yet. Add your job application
          details first to see insights and analytics here.
        </p>
      </div>
    );
  }

  const statusCounts = ["Applied", "Interview", "Offer", "Rejected"].map(
    (status) => ({
      name: status,
      value: jobs.filter((job) => job.status === status).length,
    }),
  );

  const monthlyStats = {};
  jobs.forEach((job) => {
    const month = new Date(job.createdAt).toLocaleString("default", {
      month: "short",
    });
    monthlyStats[month] = (monthlyStats[month] || 0) + 1;
  });

  const monthlyData = Object.keys(monthlyStats).map((month) => ({
    month,
    count: monthlyStats[month],
  }));

  const COLORS = ["#3b82f6", "#f59e0b", "#10b981", "#ef4444"];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h2 className="text-3xl font-semibold text-gray-800">
          Analytics Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Applications by Status
            </h3>

            <div className="w-full h-72">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={statusCounts}
                    dataKey="value"
                    outerRadius={100}
                    label
                  >
                    {statusCounts.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Monthly Applications
            </h3>

            <div className="w-full h-72">
              <ResponsiveContainer>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
