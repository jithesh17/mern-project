import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/AdminLayout";

import "../../css/dashboard.css";
import "../../css/theme.css";
import "../../css/admin.css";

function AdminStudentReport() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [batchFilter, setBatchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // GET STUDENT REPORT
  const fetchStudentReport = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/student-report"
      );

      const result = await response.json();

      console.log("Student Report Response:", result);

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch student report"
        );
      }

      setReports(result.data || []);
    } catch (error) {
      console.error("Student report error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentReport();
  }, []);

  // UNIQUE BATCHES
  const batches = useMemo(() => {
    return [
      ...new Set(
        reports
          .map((item) => item.studentBatch)
          .filter(Boolean)
      ),
    ];
  }, [reports]);

  // FILTER DATA
  const filteredReports = useMemo(() => {
    return reports.filter((item) => {
      const batchMatch =
        !batchFilter ||
        item.studentBatch === batchFilter;

      const statusMatch =
        !statusFilter ||
        item.status?.toLowerCase() ===
          statusFilter.toLowerCase();

      return batchMatch && statusMatch;
    });
  }, [reports, batchFilter, statusFilter]);

  // COUNTS
  const totalStudents = reports.length;

  const activeStudents = reports.filter(
    (item) =>
      item.status?.toLowerCase() === "active"
  ).length;

  const completedStudents = reports.filter(
    (item) =>
      item.status?.toLowerCase() === "completed"
  ).length;

  const droppedStudents = reports.filter(
    (item) =>
      item.status?.toLowerCase() === "dropped"
  ).length;

  // DATE FORMAT
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date)
      .toISOString()
      .slice(0, 10);
  };

  return (
    <AdminLayout>
      <div className="admin-page">

        {/* HEADER */}
        <div className="admin-page-header">
          <div>
            <h2>Student Report</h2>
            <p>
              Enrollment summary across every
              course and batch.
            </p>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="row">

          <div className="col-lg-3 col-md-6">
            <div className="card">
              <div className="card-body">
                <h3>{totalStudents}</h3>
                <p>Total Students</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card">
              <div className="card-body">
                <h3>{activeStudents}</h3>
                <p>Active</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card">
              <div className="card-body">
                <h3>{completedStudents}</h3>
                <p>Completed</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card">
              <div className="card-body">
                <h3>{droppedStudents}</h3>
                <p>Dropped</p>
              </div>
            </div>
          </div>

        </div>

        {/* REPORT TABLE */}
        <div className="row">
          <div className="col-lg-12">

            <div className="card">

              <div className="card-header">
                <h4 className="card-title">
                  All Students
                </h4>
              </div>

              <div className="card-body">

                {/* FILTERS */}
                <div className="row">

                  <div className="col-lg-6">
                    <div className="admin-form-group">
                      <label>Batch</label>

                      <select
                        value={batchFilter}
                        onChange={(e) =>
                          setBatchFilter(e.target.value)
                        }
                      >
                        <option value="">
                          All Batches
                        </option>

                        {batches.map((batch) => (
                          <option
                            key={batch}
                            value={batch}
                          >
                            {batch}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="admin-form-group">
                      <label>Status</label>

                      <select
                        value={statusFilter}
                        onChange={(e) =>
                          setStatusFilter(e.target.value)
                        }
                      >
                        <option value="">
                          All Statuses
                        </option>

                        <option value="Active">
                          Active
                        </option>

                        <option value="Completed">
                          Completed
                        </option>

                        <option value="Dropped">
                          Dropped
                        </option>
                      </select>
                    </div>
                  </div>

                </div>

                {/* TABLE */}
                {loading ? (
                  <div className="admin-empty">
                    <p>Loading student report...</p>
                  </div>
                ) : filteredReports.length === 0 ? (
                  <div className="admin-empty">
                    <span className="material-icons">
                      people
                    </span>

                    <p>
                      No student report data found.
                    </p>
                  </div>
                ) : (
                  <div className="table-responsive">

                    <table className="table table-hover">

                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Trainer</th>
                          <th>Batch</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredReports.map(
                          (item, index) => (
                            <tr
                              key={
                                item._id || index
                              }
                            >
                              <td>{index + 1}</td>

                              <td>
                                {item.trainer?.name ||
                                  "-"}
                              </td>

                              <td>
                                {item.studentBatch ||
                                  "-"}
                              </td>

                              <td>
                                {formatDate(
                                  item.startDate
                                )}
                              </td>

                              <td>
                                {formatDate(
                                  item.endDate
                                )}
                              </td>

                              <td>
                                <span className="badge badge-success">
                                  {item.status || "-"}
                                </span>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>

                    </table>

                  </div>
                )}

              </div>
            </div>

          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

export default AdminStudentReport;
