import { useState, useMemo } from "react";
import AdminLayout from "../../components/AdminLayout";
import {
  initialStudents,
  initialCourses,
  batches,
  statuses,
  initialAllocations,
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

function trainerForBatch(batchName) {
  const allocation = initialAllocations.find((item) => item.batch === batchName);
  return allocation ? allocation.trainer : "—";
}

function AdminStudentReport() {

  const [courseFilter, setCourseFilter] = useState("All");
  const [batchFilter, setBatchFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredStudents = useMemo(() => {
    return initialStudents.filter((student) => {
      const matchesCourse = courseFilter === "All" || student.course === courseFilter;
      const matchesBatch = batchFilter === "All" || student.batch === batchFilter;
      const matchesStatus = statusFilter === "All" || student.status === statusFilter;
      return matchesCourse && matchesBatch && matchesStatus;
    });
  }, [courseFilter, batchFilter, statusFilter]);

  const summary = useMemo(() => {
    const total = initialStudents.length;
    const active = initialStudents.filter((s) => s.status === "Active").length;
    const completed = initialStudents.filter((s) => s.status === "Completed").length;
    const dropped = initialStudents.filter((s) => s.status === "Dropped").length;
    return { total, active, completed, dropped };
  }, []);

  return (
    <AdminLayout>

      <div className="admin-page">

        <div className="admin-page-header">
          <div>
            <h2>Student Report</h2>
            <p>Enrollment summary across every course and batch.</p>
          </div>
        </div>


        {/* Summary cards */}

        <div className="row">

          <div className="col-xl-3 col-md-6">
            <div className="admin-stat-card admin-stat-purple">
              <div className="admin-stat-icon">
                <span className="material-icons">groups</span>
              </div>
              <div>
                <div className="admin-stat-value">{summary.total}</div>
                <div className="admin-stat-label">Total Students</div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="admin-stat-card admin-stat-blue">
              <div className="admin-stat-icon">
                <span className="material-icons">play_circle</span>
              </div>
              <div>
                <div className="admin-stat-value">{summary.active}</div>
                <div className="admin-stat-label">Active</div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="admin-stat-card admin-stat-green">
              <div className="admin-stat-icon">
                <span className="material-icons">task_alt</span>
              </div>
              <div>
                <div className="admin-stat-value">{summary.completed}</div>
                <div className="admin-stat-label">Completed</div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="admin-stat-card admin-stat-orange">
              <div className="admin-stat-icon">
                <span className="material-icons">cancel</span>
              </div>
              <div>
                <div className="admin-stat-value">{summary.dropped}</div>
                <div className="admin-stat-label">Dropped</div>
              </div>
            </div>
          </div>

        </div>


        {/* Filters + table */}

        <div className="row">
          <div className="col-lg-12">

            <div className="card">

              <div className="card-header">
                <h4 className="card-title">All Students</h4>
              </div>

              <div className="card-body">

                <div className="row" style={{ marginBottom: "16px" }}>

                  <div className="col-md-4">
                    <div className="admin-form-group" style={{ marginBottom: 0 }}>
                      <label htmlFor="filter-course">Course</label>
                      <select
                        id="filter-course"
                        value={courseFilter}
                        onChange={(event) => setCourseFilter(event.target.value)}
                      >
                        <option value="All">All Courses</option>
                        {initialCourses.map((course) => (
                          <option key={course.id} value={course.name}>
                            {course.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="admin-form-group" style={{ marginBottom: 0 }}>
                      <label htmlFor="filter-batch">Batch</label>
                      <select
                        id="filter-batch"
                        value={batchFilter}
                        onChange={(event) => setBatchFilter(event.target.value)}
                      >
                        <option value="All">All Batches</option>
                        {batches.map((batch) => (
                          <option key={batch} value={batch}>
                            {batch}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="admin-form-group" style={{ marginBottom: 0 }}>
                      <label htmlFor="filter-status">Status</label>
                      <select
                        id="filter-status"
                        value={statusFilter}
                        onChange={(event) => setStatusFilter(event.target.value)}
                      >
                        <option value="All">All Statuses</option>
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                </div>

                {filteredStudents.length === 0 ? (
                  <div className="admin-empty">
                    <span className="material-icons">groups</span>
                    <p>No students match this filter.</p>
                  </div>
                ) : (
                  <table className="table table-hover">

                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Student</th>
                        <th>Course</th>
                        <th>Batch</th>
                        <th>Trainer</th>
                        <th>Start Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.id}>
                          <td>{student.sno}</td>
                          <td>{student.name}</td>
                          <td>{student.course}</td>
                          <td>{student.batch}</td>
                          <td>{trainerForBatch(student.batch)}</td>
                          <td>{student.startDate}</td>
                          <td>
                            <span className={`badge ${statusBadge[student.status] || "badge-info"}`}>
                              {student.status}
                            </span>
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

export default AdminStudentReport;
