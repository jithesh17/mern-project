
import { useEffect, useMemo, useState } from "react";
import "../../css/students.css";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch students created in Admin panel
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/students"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch students"
          );
        }

        // Backend returns a direct array
        if (!Array.isArray(data)) {
          throw new Error("Invalid students API response");
        }

        setStudents(data);
      } catch (err) {
        console.error("Fetch students error:", err);
        setError(
          err.message ||
            "Unable to load students. Check your backend server."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Get unique batches dynamically from student records
  const batches = useMemo(() => {
    return [
      ...new Set(
        students
          .map((student) => student.batch)
          .filter((batch) => batch && batch.trim())
      ),
    ].sort((a, b) => a.localeCompare(b));
  }, [students]);

  // Summary counts
  const activeCount = students.filter(
    (student) => student.status === "Active"
  ).length;

  const inactiveCount = students.filter(
    (student) => student.status === "Inactive"
  ).length;

  // Filter students
  const filteredStudents = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return students.filter((student) => {
      const name = student.student || "";
      const email = student.email || "";
      const batch = student.batch || "";
      const status = student.status || "Active";

      const matchesSearch =
        name.toLowerCase().includes(searchValue) ||
        email.toLowerCase().includes(searchValue);

      const matchesBatch =
        selectedBatch === "All" ||
        batch === selectedBatch;

      const matchesStatus =
        selectedStatus === "All" ||
        status === selectedStatus;

      return (
        matchesSearch &&
        matchesBatch &&
        matchesStatus
      );
    });
  }, [students, search, selectedBatch, selectedStatus]);

  // View student details
  const handleViewStudent = (student) => {
    const courseName =
      typeof student.course === "object"
        ? student.course?.course || "Not assigned"
        : "Not assigned";

    const startDate = student.startDate
      ? new Date(student.startDate).toLocaleDateString()
      : "—";

    window.alert(
      `Student: ${student.student || "—"}\n` +
        `Course: ${courseName}\n` +
        `Batch: ${student.batch || "—"}\n` +
        `Start Date: ${startDate}\n` +
        `Status: ${student.status || "Active"}`
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="students-page">
        <div className="students-header">
          <div>
            <h2>Students</h2>
            <p>Loading student details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="students-page">
        <div className="students-header">
          <div>
            <h2>Students</h2>
            <p>{error}</p>
          </div>
        </div>

        <button
          type="button"
          className="student-view-button"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="students-page">
      {/* Page Header */}
      <div className="students-header">
        <div>
          <h2>Students</h2>
          <p>
            View and manage students assigned to your batches.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="students-summary">
        <div className="student-summary-card total-students">
          <div className="student-summary-icon">
            <span className="material-icons">
              groups
            </span>
          </div>

          <div>
            <h3>{students.length}</h3>
            <p>Total Students</p>
          </div>
        </div>

        <div className="student-summary-card active-students">
          <div className="student-summary-icon">
            <span className="material-icons">
              person
            </span>
          </div>

          <div>
            <h3>{activeCount}</h3>
            <p>Active Students</p>
          </div>
        </div>

        <div className="student-summary-card inactive-students">
          <div className="student-summary-icon">
            <span className="material-icons">
              person_off
            </span>
          </div>

          <div>
            <h3>{inactiveCount}</h3>
            <p>Inactive Students</p>
          </div>
        </div>

        <div className="student-summary-card batches-count">
          <div className="student-summary-icon">
            <span className="material-icons">
              class
            </span>
          </div>

          <div>
            <h3>{batches.length}</h3>
            <p>Total Batches</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="students-filter-card">
        <div className="students-filter">
          {/* Search */}
          <div className="student-filter-group">
            <label htmlFor="studentSearch">
              Search Student
            </label>

            <div className="student-search-box">
              <span className="material-icons">
                search
              </span>

              <input
                id="studentSearch"
                type="text"
                placeholder="Search by name or email"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>
          </div>

          {/* Dynamic Batch Filter */}
          <div className="student-filter-group">
            <label htmlFor="studentBatch">
              Batch
            </label>

            <select
              id="studentBatch"
              value={selectedBatch}
              onChange={(e) =>
                setSelectedBatch(e.target.value)
              }
            >
              <option value="All">
                All Batches
              </option>

              {batches.map((batch) => (
                <option key={batch} value={batch}>
                  {batch}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="student-filter-group">
            <label htmlFor="studentStatus">
              Status
            </label>

            <select
              id="studentStatus"
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value)
              }
            >
              <option value="All">
                All Status
              </option>
              <option value="Active">
                Active
              </option>
              <option value="Inactive">
                Inactive
              </option>
              <option value="Completed">
                Completed
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Student Table */}
      <div className="students-table-card">
        <div className="students-table-header">
          <div>
            <h4>Student List</h4>

            <span>
              {filteredStudents.length} student
              {filteredStudents.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="students-table-wrapper">
          <table className="students-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Email</th>
                <th>Batch</th>
                <th>Attendance</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <tr key={student._id}>
                    <td>{index + 1}</td>

                    <td>
                      <div className="student-name-cell">
                        <div className="student-avatar">
                          {(student.student || "S")
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <strong>
                          {student.student || "Unknown"}
                        </strong>
                      </div>
                    </td>

                    <td>
                      {student.email || "—"}
                    </td>

                    <td>
                      <span className="batch-badge">
                        {student.batch || "Not assigned"}
                      </span>
                    </td>

                    <td>
                      {typeof student.attendance === "number" ? (
                        <div className="attendance-cell">
                          <div className="attendance-progress">
                            <div
                              className="attendance-progress-bar"
                              style={{
                                width: `${Math.min(
                                  100,
                                  Math.max(
                                    0,
                                    student.attendance
                                  )
                                )}%`,
                              }}
                            />
                          </div>

                          <span>
                            {student.attendance}%
                          </span>
                        </div>
                      ) : (
                        "—"
                      )}
                    </td>

                    <td>
                      <span
                        className={`student-status ${
                          student.status === "Active"
                            ? "status-active"
                            : student.status === "Completed"
                            ? "status-completed"
                            : "status-inactive"
                        }`}
                      >
                        {student.status || "Active"}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="student-view-button"
                        title="View Student"
                        onClick={() =>
                          handleViewStudent(student)
                        }
                      >
                        <span className="material-icons">
                          visibility
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="students-no-data"
                  >
                    <span className="material-icons">
                      search_off
                    </span>

                    <p>
                      No students found.
                    </p>
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

export default Students;
