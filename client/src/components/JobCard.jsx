import { Link } from "react-router-dom";

function JobCard({ job, onDelete }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const followDate = job.followUpDate ? new Date(job.followUpDate) : null;

  if (followDate) {
    followDate.setHours(0, 0, 0, 0);
  }

  const isOverdue = followDate && followDate < today;
  const isToday = followDate && followDate.getTime() === today.getTime();

  const statusColor =
    job.status === "Applied"
      ? "bg-blue-50 text-blue-700 border-blue-200"
      : job.status === "Interview"
        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
        : job.status === "Rejected"
          ? "bg-red-50 text-red-700 border-red-200"
          : "bg-green-50 text-green-700 border-green-200";

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition duration-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 wrap-break-word">
              {job.companyName}
            </h2>
            <p className="text-sm text-gray-500 wrap-break-word">
              {job.jobRole}
            </p>
          </div>

          <div className="text-sm text-gray-500 space-y-1">
            <p>
              Applied:
              <span className="ml-1 font-medium text-gray-700">
                {new Date(job.createdAt).toLocaleDateString("en-GB")}
              </span>
            </p>

            {job.followUpDate && (
              <p>
                Follow-up:
                <span className="ml-1 font-medium text-gray-700">
                  {new Date(job.followUpDate).toLocaleDateString("en-GB")}
                </span>
              </p>
            )}
          </div>

          {isOverdue && (
            <p className="text-xs text-red-600 font-medium">
              Overdue follow-up
            </p>
          )}

          {isToday && (
            <p className="text-xs text-orange-600 font-medium">
              Follow up today
            </p>
          )}
        </div>

        <div>
          {job.notes ? (
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-sm text-gray-600 h-full">
              <p className="font-medium text-gray-700 mb-2">Notes</p>
              <p className="whitespace-pre-line leading-relaxed wrap-break-word">
                {job.notes}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic">No notes added</p>
          )}
        </div>

        <div className="flex flex-row md:flex-col gap-3 md:gap-4 text-sm md:items-end">
          <Link
            to={`/edit/${job._id}`}
            className="w-full md:w-28 text-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-200"
          >
            Edit
          </Link>

          <button
            onClick={() => onDelete(job._id)}
            className="w-full md:w-28 px-3 py-2 border border-red-200 text-red-600 rounded-md hover:bg-red-50 transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-6">
        <span
          className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${statusColor}`}
        >
          {job.status}
        </span>
      </div>
    </div>
  );
}

export default JobCard;
