import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/AdminLayout";

import "../../css/dashboard.css";
import "../../css/theme.css";
import "../../css/admin.css";

function AdminMCQ() {
  const navigate = useNavigate();

  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==================================================
  // GET ALL MCQs
  // ==================================================

  const fetchMCQs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/mcq");

      if (!response.ok) {
        throw new Error("Failed to fetch MCQs");
      }

      const data = await response.json();

      setMcqs(data);
    } catch (error) {
      console.error("Fetch MCQs error:", error);

      setError("Unable to load MCQ questions. Please check the backend.");
    } finally {
      setLoading(false);
    }
  };

  // ==================================================
  // LOAD MCQs WHEN PAGE OPENS
  // ==================================================

  useEffect(() => {
    fetchMCQs();
  }, []);

  // ==================================================
  // CREATE
  // ==================================================

  const handleCreate = () => {
    navigate("/admin/mcq/create");
  };

  // ==================================================
  // EDIT
  // ==================================================

  const handleEdit = (id) => {
    navigate(`/admin/mcq/edit/${id}`);
  };

  // ==================================================
  // DELETE
  // ==================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this MCQ?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/mcq/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete MCQ");
      }

      alert("MCQ deleted successfully.");

      // Refresh list
      fetchMCQs();
    } catch (error) {
      console.error("Delete MCQ error:", error);

      alert(error.message || "Unable to delete MCQ.");
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        {/* ============================= */}
        {/* PAGE HEADER */}
        {/* ============================= */}

        <div className="admin-page-header">
          <div>
            <h2>MCQ Test</h2>

            <p>Quiz questions per course and sub course.</p>
          </div>

          <button
            type="button"
            className="btn btn-primary admin-create-btn"
            onClick={handleCreate}
          >
            <span className="material-icons">add</span>
            CREATE MCQ
          </button>
        </div>

        {/* ============================= */}
        {/* ERROR */}
        {/* ============================= */}

        {error && <div className="alert alert-danger">{error}</div>}

        {/* ============================= */}
        {/* TABLE */}
        {/* ============================= */}

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                {/* LOADING */}

                {loading ? (
                  <div className="admin-empty">
                    <span className="material-icons">sync</span>

                    <p>Loading MCQs...</p>
                  </div>
                ) : mcqs.length === 0 ? (
                  /* EMPTY */

                  <div className="admin-empty">
                    <span className="material-icons">quiz</span>

                    <p>No MCQ questions yet. Click MCQ to create one.</p>
                  </div>
                ) : (
                  /* TABLE */

                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>S.No</th>

                          <th>Course</th>

                          <th>Sub Course</th>

                          <th>Question</th>

                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {mcqs.map((mcq, index) => (
                          <tr key={mcq._id}>
                            <td>{index + 1}</td>

                            <td>
                              <span className="badge badge-primary">
                                {mcq.course?.course || "N/A"}
                              </span>
                            </td>

                            <td>{mcq.subCourse?.sub || "N/A"}</td>

                            <td>{mcq.question}</td>

                            <td>
                              <div className="admin-table-actions">
                                {/* EDIT */}

                                <button
                                  type="button"
                                  className="admin-icon-btn"
                                  onClick={() => handleEdit(mcq._id)}
                                  aria-label="Edit question"
                                  title="Edit MCQ"
                                >
                                  <span className="material-icons">edit</span>
                                </button>

                                {/* DELETE */}

                                <button
                                  type="button"
                                  className="admin-icon-btn"
                                  onClick={() => handleDelete(mcq._id)}
                                  aria-label="Delete question"
                                  title="Delete MCQ"
                                >
                                  <span className="material-icons">delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
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

export default AdminMCQ;
