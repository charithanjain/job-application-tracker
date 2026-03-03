function SummaryCards({ jobs }) {
  const total = jobs.length;
  const applied = jobs.filter((j) => j.status === "Applied").length;
  const interview = jobs.filter((j) => j.status === "Interview").length;
  const rejected = jobs.filter((j) => j.status === "Rejected").length;
  const offer = jobs.filter((j) => j.status === "Offer").length;

  const cardStyle = "bg-white p-4 rounded-md shadow-sm text-center";

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 m-5">
      <div className={cardStyle}>
        <p className="text-gray-500">Total</p>
        <h2 className="text-xl font-bold">{total}</h2>
      </div>

      <div className={cardStyle}>
        <p className="text-blue-600">Applied</p>
        <h2 className="text-xl font-bold">{applied}</h2>
      </div>

      <div className={cardStyle}>
        <p className="text-yellow-600">Interview</p>
        <h2 className="text-xl font-bold">{interview}</h2>
      </div>

      <div className={cardStyle}>
        <p className="text-red-600">Rejected</p>
        <h2 className="text-xl font-bold">{rejected}</h2>
      </div>

      <div className={cardStyle}>
        <p className="text-green-600">Offer</p>
        <h2 className="text-xl font-bold">{offer}</h2>
      </div>
    </div>
  );
}

export default SummaryCards;
