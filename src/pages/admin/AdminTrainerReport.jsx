import { useState, useMemo } from "react";
import AdminLayout from "../../components/AdminLayout";
import {
  initialTrainers,
  initialAllocations,
  initialStudents,
} from "../../data/adminData";

import "../../css/dashboard.css";
import "../../css/theme.css";
import "../../css/admin.css";

const statusBadge = {
  Active: "badge-success",
  Completed: "badge-primary",
  "On Hold": "badge-warning",
  Dropped: "badge-danger",
};

function studentCountForBatch(batchName) {
  return initialStudents.filter((student) => student.batch === batchName).length;
}

function AdminTrainerReport() {

  const [trainerFilter, setTrainerFilter] = useState("All");
  const [appliedFilter, setAppliedFilter] = useState("All");

  const trainerRows = useMemo(() => {
    return initialTrainers
      .filter((trainer) => appliedFilter === "All" || trainer.name === appliedFilter)
      .map((trainer) => {
        const allocations = initialAllocations.filter(
          (allocation) => allocation.trainer === trainer.name
        );
        const totalStudents = allocations.reduce(
          (sum, allocation) => sum + studentCountForBatch(allocation.batch),
          0
        );
        return { ...trainer, allocations, totalStudents };
      });
  }, [appliedFilter]);

  function handleSearch() {
    setAppliedFilter(trainerFilter);
  }

  function handleClear() {
    setTrainerFilter("All");
    setAppliedFilter("All");
  }

  const summary = useMemo(() => {
    const totalTrainers = initialTrainers.length;
    const totalAllocations = initialAllocations.length;
    const activeAllocations = initialAllocations.filter((a) => a.status === "Active").length;
    return { totalTrainers, totalAllocations, activeAllocations };
  }, []);

  return (
    <AdminLayout>

      <div className="admin-page">

        <div className="admin-page-header">
          <div>
            <h2>Trainer Report</h2>
            <p>Batch allocations and workload per trainer.</p>
          </div>
        </div>


        {/* Summary cards */}

        <div className="row">

          <div className="col-xl-4 col-md-6">
            <div className="admin-stat-card admin-stat-purple">
              <div className="admin-stat-icon">
                <span className="material-icons">badge</span>
              </div>
              <div>
                <div className="admin-stat-value">{summary.totalTrainers}</div>
                <div className="admin-stat-label">Total Trainers</div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6">
            <div className="admin-stat-card admin-stat-blue">
              <div className="admin-stat-icon">
                <span className="material-icons">event_available</span>
              </div>
              <div>
                <div className="admin-stat-value">{summary.totalAllocations}</div>
                <div className="admin-stat-label">Total Allocations</div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6">
            <div className="admin-stat-card admin-stat-green">
              <div className="admin-stat-icon">
                <span className="material-icons">play_circle</span>
              </div>
              <div>
                <div className="admin-stat-value">{summary.activeAllocations}</div>
                <div className="admin-stat-label">Active Allocations</div>
              </div>
            </div>
          </div>

        </div>


        {/* Trainer-wise table */}

        <div className="row">
          <div className="col-lg-12">

            <div className="card">

              <div className="card-header">
                <h4 className="card-title">Trainer Workload</h4>
              </div>

              <div className="card-body">

                <div className="row" style={{ marginBottom: "16px", alignItems: "flex-end" }}>

                  <div className="col-md-4">
                    <div className="admin-form-group" style={{ marginBottom: 0 }}>
                      <label htmlFor="filter-trainer-name">Trainer Name</label>
                      <select
                        id="filter-trainer-name"
                        value={trainerFilter}
                        onChange={(event) => setTrainerFilter(event.target.value)}
                      >
                        <option value="All">All Trainers</option>
                        {initialTrainers.map((trainer) => (
                          <option key={trainer.id} value={trainer.name}>
                            {trainer.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4" style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSearch}
                    >
                      Search
                    </button>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={handleClear}
                    >
                      Clear
                    </button>
                  </div>

                </div>

                {trainerRows.length === 0 ? (
                  <div className="admin-empty">
                    <span className="material-icons">badge</span>
                    <p>No trainers match this filter.</p>
                  </div>
                ) : (
                  <table className="table table-hover">

                    <thead>
                      <tr>
                        <th>Trainer</th>
                        <th>Department</th>
                        <th>Batches</th>
                        <th>Students</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {trainerRows.map((trainer) => (
                        <tr key={trainer.id}>
                          <td>{trainer.name}</td>
                          <td>
                            <span className="badge badge-primary">{trainer.department}</span>
                          </td>
                          <td>
                            {trainer.allocations.length === 0 ? (
                              "—"
                            ) : (
                              trainer.allocations.map((allocation) => allocation.batch).join(", ")
                            )}
                          </td>
                          <td>{trainer.totalStudents}</td>
                          <td>
                            {trainer.allocations.length === 0 ? (
                              <span className="badge badge-info">Unassigned</span>
                            ) : (
                              trainer.allocations.map((allocation) => (
                                <span
                                  key={allocation.id}
                                  className={`badge ${statusBadge[allocation.status] || "badge-info"}`}
                                  style={{ marginRight: "6px" }}
                                >
                                  {allocation.status}
                                </span>
                              ))
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                )}

              </div>

            </div>

          </div>
        </div>

      </div>

    </AdminLayout>
  );
}

export default AdminTrainerReport;
