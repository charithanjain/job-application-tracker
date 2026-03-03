function FilterBar({ filterStatus, setFilterStatus, sortOrder, setSortOrder }) {
  return (
    <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
      <select
        className="w-full sm:w-auto border p-2 rounded bg-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
        <option value="Offer">Offer</option>
      </select>

      <select
        className="w-full sm:w-auto border p-2 rounded bg-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
}

export default FilterBar;
