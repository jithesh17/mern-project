
import { useEffect, useMemo, useState } from "react";
import "../../css/Batches.css";

function Batches() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/batches"
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to fetch batches"
          );
        }

        setBatches(data.batches || []);
      } catch (err) {
        console.error("Fetch batches error:", err);
        setError(err.message || "Unable to load batches");
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, []);

  const getStatus = (batch) => {
    if (batch.status === "Dropped") return "Dropped";
    if (batch.status === "Completed") return "Completed";

    if (
      batch.endDate &&
      new Date(batch.endDate) < new Date()
    ) {
      return "Completed";
    }

    return batch.status || "Active";
  };

  const filteredBatches = useMemo(() => {
    return batches.filter((batch) => {
      const searchText = search.toLowerCase();

      const matchesSearch = [
        batch.studentBatch,
        batch.course?.course,
        batch.trainer?.name,
      ].some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(searchText)
      );

      const matchesStatus =
        statusFilter === "All Status" ||
        getStatus(batch) === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [batches, search, statusFilter]);

  const activeCount = batches.filter(
    (batch) => getStatus(batch) === "Active"
  ).length;

  const completedCount = batches.filter(
    (batch) => getStatus(batch) === "Completed"
  ).length;

  const totalStudents = batches.reduce(
    (total, batch) => total + Number(batch.studentCount || 0),
    0
  );

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "UTC",
    });
  };

  
return (
  <div className="batches-page">

    <div className="batches-header">
      <h2>Batches</h2>
      <p>Manage your assigned batches</p>
    </div>

    {/* Summary Cards */}
    <div className="batches-summary">

      <div className="batch-summary-card total-batch-card">
        <div className="batch-summary-icon">
          <span className="material-icons">book</span>
        </div>
        <div>
          <h3>{batches.length}</h3>
          <p>Total Batches</p>
        </div>
      </div>

      <div className="batch-summary-card active-batch-card">
        <div className="batch-summary-icon">
          <span className="material-icons">play_circle</span>
        </div>
        <div>
          <h3>
            {batches.filter(b => b.status === "Active").length}
          </h3>
          <p>Active Batches</p>
        </div>
      </div>

      <div className="batch-summary-card completed-batch-card">
        <div className="batch-summary-icon">
          <span className="material-icons">check_circle</span>
        </div>
        <div>
          <h3>
            {batches.filter(b => b.status === "Completed").length}
          </h3>
          <p>Completed Batches</p>
        </div>
      </div>

      <div className="batch-summary-card students-batch-card">
        <div className="batch-summary-icon">
          <span className="material-icons">groups</span>
        </div>
        <div>
          <h3>
            {batches.reduce(
              (total, batch) =>
                total + (batch.studentCount || 0),
              0
            )}
          </h3>
          <p>Total Students</p>
        </div>
      </div>

    </div>

    {/* Search and Status */}
    <div className="batches-filter-card">
      <div className="batches-filter">

        <div className="batch-filter-group">
          <label htmlFor="batchSearch">Search Batch</label>
          <div className="batch-search-box">
            <span className="material-icons">search</span>
            <input
              id="batchSearch"
              type="text"
              placeholder="Search by batch, course or trainer"
            />
          </div>
        </div>

        <div className="batch-filter-group">
          <label htmlFor="batchStatus">Status</label>
          <select id="batchStatus" defaultValue="">
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Dropped">Dropped</option>
          </select>
        </div>

      </div>
    </div>

    {/* Batch List */}
    <div className="batches-table-card">

      <div className="batches-table-header">
        <div>
          <h4>Batch List</h4>
          <span>{batches.length} batches</span>
        </div>
      </div>

      <div className="batches-table-wrapper">
        <table className="batches-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Batch</th>
              <th>Course</th>
              <th>Trainer</th>
              <th>Students</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {batches.length > 0 ? (
              batches.map((batch, index) => (
                <tr key={batch._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="batch-name-cell">
                      <div className="batch-icon">
                        <span className="material-icons">
                          book
                        </span>
                      </div>
                      <strong>{batch.studentBatch}</strong>
                    </div>
                  </td>
                  <td>{batch.course?.course || "Not assigned"}</td>
                  <td>
                    <div className="batch-trainer-cell">
                      {batch.trainer?.name || "Not assigned"}
                    </div>
                  </td>
                  <td>
                    {batch.studentCount ?? "-"}
                  </td>
                  <td>
                    {batch.startDate
                      ? new Date(batch.startDate).toLocaleDateString("en-CA")
                      : "-"}
                  </td>
                  <td>
                    {batch.endDate
                      ? new Date(batch.endDate).toLocaleDateString("en-CA")
                      : "-"}
                  </td>
                  <td>
                    <span className={`batch-status ${
                      batch.status === "Completed"
                        ? "batch-status-completed"
                        : "batch-status-active"
                    }`}>
                      {batch.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="batches-no-data">
                  <span className="material-icons">
                    search_off
                  </span>
                  <p>No batches assigned to you.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>

  </div>
);

}

export default Batches;
