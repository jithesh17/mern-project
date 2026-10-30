import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { useNavigate } from "react-router-dom";

import "../../css/theme.css";
import "../../css/admin.css";

const API_URL = "http://localhost:5000/api";

const statusBadge = {
  Active: "badge-success",
  Completed: "badge-primary",
};

function AdminStudent() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // =====================================================
  // GET STUDENTS
  // =====================================================

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/students`);

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();

      console.log("GET students response:", data);

      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // DELETE STUDENT
  // =====================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/students/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      console.log("DELETE student response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete student");
      }

      alert(`${data.deletedStudent || "Student"} deleted successfully`);

      await fetchStudents();
    } catch (error) {
      console.error("Delete student error:", error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <AdminLayout>
      <div className="admin-page">
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="admin-page-header">
          {/* LEFT SIDE */}
          <div>
            <h2>Student</h2>
            <p>Students enrolled across every batch.</p>
          </div>

          {/* RIGHT SIDE */}
          <div className="admin-header-actions">
            <button
              type="button"
              className="btn btn-success admin-create-btn"
              onClick={() => navigate("/admin/student/upload")}
            >
              <span className="material-icons">upload_file</span>
              Upload Excel
            </button>

            <button
              type="button"
              className="btn btn-primary admin-create-btn"
              onClick={() => navigate("/admin/student/create")}
            >
              <span className="material-icons">add</span>
              Create
            </button>
          </div>
        </div>

        {/* ================================================= */}
        {/* TABLE */}
        {/* ================================================= */}

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                {loading ? (
                  <div className="admin-empty">
                    <p>Loading...</p>
                  </div>
                ) : students.length === 0 ? (
                  <div className="admin-empty">
                    <span className="material-icons">groups</span>

                    <p>No students yet. Click Create to add one.</p>
                  </div>
                ) : (
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
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {students.map((student, index) => (
                        <tr key={student._id}>
                          {/* S.NO */}

                          <td>{index + 1}</td>

                          {/* STUDENT */}

                          <td>{student.student}</td>

                          <td>{student.email}</td>

                          {/* COURSE */}

                          <td>
                            <span className="badge badge-primary">
                              {student.course?.course || "Unknown"}
                            </span>
                          </td>

                          {/* BATCH */}

                          <td>{student.batch}</td>

                          {/* START DATE */}

                          <td>
                            {student.startDate
                              ? student.startDate.substring(0, 10)
                              : "-"}
                          </td>

                          {/* STATUS */}

                          <td>
                            <span
                              className={`badge ${
                                statusBadge[student.status] || "badge-primary"
                              }`}
                            >
                              {student.status}
                            </span>
                          </td>

                          {/* ACTIONS */}

                          <td>
                            <div className="admin-table-actions">
                              {/* EDIT */}

                              <button
                                type="button"
                                className="admin-icon-btn"
                                onClick={() =>
                                  navigate(`/admin/student/edit/${student._id}`)
                                }
                                aria-label="Edit student"
                              >
                                <span className="material-icons">edit</span>
                              </button>

                              {/* DELETE */}

                              <button
                                type="button"
                                className="admin-icon-btn"
                                onClick={() => handleDelete(student._id)}
                                aria-label="Delete student"
                              >
                                <span className="material-icons">delete</span>
                              </button>
                            </div>
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

export default AdminStudent;
