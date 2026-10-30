import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/AdminLayout";

import "../../css/dashboard.css";
import "../../css/theme.css";
import "../../css/admin.css";

const API_URL = "http://localhost:5000/api";

const statusBadge = {
  Active: "badge-success",
  Completed: "badge-primary",
  Dropped: "badge-danger",
};

function StudentReport() {
  // =====================================================
  // STATE
  // =====================================================

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // =====================================================
  // GET STUDENTS
  // =====================================================

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/students`);

      if (!response.ok) {
        throw new Error("Failed to fetch student report");
      }

      const data = await response.json();

      console.log("Student report data:", data);

      setStudents(data);
    } catch (error) {
      console.error("Student report error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    fetchStudents();
  }, []);

  // =====================================================
  // BATCHES
  // Get unique batches from database
  // =====================================================

  const batches = useMemo(() => {
    const uniqueBatches = [
      ...new Set(
        students
          .map((student) => student.batch)
          .filter(Boolean)
      ),
    ];

    return uniqueBatches;
  }, [students]);

  // =====================================================
  // FILTER STUDENTS
  // =====================================================

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const batchMatch =
        !selectedBatch ||
        student.batch === selectedBatch;

      const statusMatch =
        !selectedStatus ||
        student.status === selectedStatus;

      return batchMatch && statusMatch;
    });
  }, [students, selectedBatch, selectedStatus]);

  // =====================================================
  // REPORT COUNTS
  // =====================================================

  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  const completedStudents = students.filter(
    (student) => student.status === "Completed"
  ).length;

  const droppedStudents = students.filter(
    (student) => student.status === "Dropped"
  ).length;

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {
    setSelectedBatch("");
    setSelectedStatus("");
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <AdminLayout>
      <div className="admin-page">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="admin-page-header">

          <div>
            <h2>Student Report</h2>

            <p>
              Enrollment summary across every course and batch.
            </p>
          </div>

        </div>

        {/* =================================================
            REPORT CARDS
        ================================================= */}

        <div className="row">

          {/* TOTAL STUDENTS */}

          <div className="col-lg-6 col-md-6 mb-3">
            <div className="card">
              <div className="card-body">

                <h2>
                  {loading ? "..." : totalStudents}
                </h2>

                <p className="mb-0">
                  Total Students
                </p>

              </div>
            </div>
          </div>

          {/* ACTIVE */}

          <div className="col-lg-6 col-md-6 mb-3">
            <div className="card">
              <div className="card-body">

                <h2>
                  {loading ? "..." : activeStudents}
                </h2>

                <p className="mb-0">
                  Active
                </p>

              </div>
            </div>
          </div>

          {/* COMPLETED */}

          <div className="col-lg-6 col-md-6 mb-3">
            <div className="card">
              <div className="card-body">

                <h2>
                  {loading ? "..." : completedStudents}
                </h2>

                <p className="mb-0">
                  Completed
                </p>

              </div>
            </div>
          </div>

          {/* DROPPED */}

          <div className="col-lg-6 col-md-6 mb-3">
            <div className="card">
              <div className="card-body">

                <h2>
                  {loading ? "..." : droppedStudents}
                </h2>

                <p className="mb-0">
                  Dropped
                </p>

              </div>
            </div>
          </div>

        </div>

        {/* =================================================
            FILTER + REPORT TABLE
        ================================================= */}

        <div className="row mt-3">

          <div className="col-lg-12">

            <div className="card">

              {/* CARD HEADER */}

              <div className="card-header">

                <h4 className="card-title">
                  All Students
                </h4>

              </div>

              {/* CARD BODY */}

              <div className="card-body">

                {/* =================================================
                    FILTERS
                ================================================= */}

                <div className="row">

                  {/* BATCH */}

                  <div className="col-md-6">

                    <div className="admin-form-group">

                      <label htmlFor="batch-filter">
                        Batch
                      </label>

                      <select
                        id="batch-filter"
                        value={selectedBatch}
                        onChange={(event) =>
                          setSelectedBatch(
                            event.target.value
                          )
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

                  {/* STATUS */}

                  <div className="col-md-6">

                    <div className="admin-form-group">

                      <label htmlFor="status-filter">
                        Status
                      </label>

                      <select
                        id="status-filter"
                        value={selectedStatus}
                        onChange={(event) =>
                          setSelectedStatus(
                            event.target.value
                          )
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

                {/* =================================================
                    CLEAR FILTER
                ================================================= */}

                {(selectedBatch || selectedStatus) && (
                  <div className="mb-3">

                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </button>

                  </div>
                )}

                {/* =================================================
                    LOADING
                ================================================= */}

                {loading ? (
                  <div className="admin-empty">

                    <p>
                      Loading student report...
                    </p>

                  </div>
                ) : filteredStudents.length === 0 ? (

                  /* =================================================
                     NO DATA
                  ================================================= */

                  <div className="admin-empty">

                    <span className="material-icons">
                      groups
                    </span>

                    <p>
                      No student report data found.
                    </p>

                  </div>
                ) : (

                  /* =================================================
                     TABLE
                  ================================================= */

                  <div className="table-responsive">

                    <table className="table table-hover">

                      <thead>

                        <tr>

                          <th>S.No</th>

                          <th>Student</th>

                          <th>Email</th>

                          <th>Course</th>

                          <th>Batch</th>

                          <th>Start Date</th>

                          <th>Status</th>

                        </tr>

                      </thead>

                      <tbody>

                        {filteredStudents.map(
                          (student, index) => (
                            <tr key={student._id}>

                              {/* S.NO */}

                              <td>
                                {index + 1}
                              </td>

                              {/* STUDENT */}

                              <td>
                                {student.student}
                              </td>

                              {/* EMAIL */}

                              <td>
                                {student.email || "-"}
                              </td>

                              {/* COURSE */}

                              <td>

                                {student.course?.course ||
                                  "Unknown"}

                              </td>

                              {/* BATCH */}

                              <td>
                                {student.batch}
                              </td>

                              {/* START DATE */}

                              <td>

                                {student.startDate
                                  ? student.startDate.substring(
                                      0,
                                      10
                                    )
                                  : "-"}

                              </td>

                              {/* STATUS */}

                              <td>

                                <span
                                  className={`badge ${
                                    statusBadge[
                                      student.status
                                    ] ||
                                    "badge-primary"
                                  }`}
                                >
                                  {student.status}
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

export default StudentReport;