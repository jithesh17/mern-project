import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/AdminLayout";

import "../../css/theme.css";
import "../../css/admin.css";

function AdminMCQ() {
  const navigate = useNavigate();

  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedGroups, setExpandedGroups] = useState({});

  // GET ALL MCQs
  const fetchMCQs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/mcqs");

      if (!response.ok) {
        throw new Error("Failed to fetch MCQs");
      }

      const data = await response.json();

      // Support an array or a wrapped API response
      const questions = Array.isArray(data)
        ? data
        : data.mcqs || data.data || [];

      setMcqs(questions);
    } catch (err) {
      console.error("Fetch MCQs error:", err);
      setError("Unable to load MCQ questions. Please check the backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMCQs();
  }, []);

  // GROUP QUESTIONS BY SUBCOURSE
  const groupedMCQs = mcqs.reduce((groups, mcq) => {
    const courseName =
      typeof mcq.course === "object"
        ? mcq.course?.course || "Unknown Course"
        : mcq.course || "Unknown Course";

    const subCourseName =
      typeof mcq.subCourse === "object"
        ? mcq.subCourse?.sub || "Unassigned Subcourse"
        : mcq.subCourse || "Unassigned Subcourse";

    const groupKey = `${courseName}|||${subCourseName}`;

    if (!groups[groupKey]) {
      groups[groupKey] = {
        courseName,
        subCourseName,
        questions: [],
      };
    }

    groups[groupKey].questions.push(mcq);

    return groups;
  }, {});

  // Sort groups alphabetically by subcourse name
  const sortedGroups = Object.entries(groupedMCQs).sort(([, a], [, b]) =>
    a.subCourseName.localeCompare(b.subCourseName),
  );

  // OPEN OR CLOSE A SUBCOURSE
  const toggleGroup = (groupKey) => {
    setExpandedGroups((previous) => ({
      ...previous,
      [groupKey]: !previous[groupKey],
    }));
  };

  // CREATE
  const handleCreate = () => {
    navigate("/admin/mcq/create");
  };

  // EDIT
  const handleEdit = (id) => {
    navigate(`/admin/mcq/edit/${id}`);
  };

  // DELETE
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this MCQ?",
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/api/mcqs/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete MCQ");
      }

      alert("MCQ deleted successfully.");

      await fetchMCQs();
    } catch (err) {
      console.error("Delete MCQ error:", err);
      alert(err.message || "Unable to delete MCQ.");
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        {/* PAGE HEADER */}
        <div className="admin-page-header">
          <div>
            <h2>MCQ Test</h2>
            <p>Quiz questions organized by course and subcourse.</p>
          </div>

          <div className="admin-header-actions">
            <button
              className="btn btn-success admin-create-btn"
              onClick={() => navigate("/admin/mcq/upload")}
            >
              <span className="material-icons">upload_file</span>
              Upload Excel
            </button>

            <button
              className="btn btn-primary admin-create-btn"
              onClick={handleCreate}
            >
              <span className="material-icons">add</span>
              CREATE MCQ
            </button>
          </div>
        </div>

        {/* ERROR */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* MCQ DROPDOWNS */}
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                {loading ? (
                  <div className="admin-empty">
                    <span className="material-icons">sync</span>
                    <p>Loading MCQs...</p>
                  </div>
                ) : mcqs.length === 0 ? (
                  <div className="admin-empty">
                    <span className="material-icons">quiz</span>
                    <p>No MCQ questions yet. Create or upload questions.</p>
                  </div>
                ) : (
                  <>
                    <div className="mcq-summary">
                      <h4>Question Bank</h4>
                      <p>
                        {mcqs.length} total questions across{" "}
                        {sortedGroups.length} subcourse groups.
                      </p>
                    </div>

                    <div className="mcq-accordion">
                      {sortedGroups.map(([groupKey, group]) => {
                        const isOpen = !!expandedGroups[groupKey];

                        return (
                          <div className="mcq-group" key={groupKey}>
                            {/* DROPDOWN HEADER */}
                            <button
                              type="button"
                              className="mcq-group-header"
                              onClick={() => toggleGroup(groupKey)}
                              aria-expanded={isOpen}
                            >
                              <div className="mcq-group-info">
                                <span className="material-icons mcq-folder-icon">
                                  {isOpen ? "folder_open" : "folder"}
                                </span>

                                <div>
                                  <h5>{group.subCourseName}</h5>
                                  <small>{group.courseName}</small>
                                </div>

                                <span className="mcq-question-count">
                                  {group.questions.length} questions
                                </span>
                              </div>

                              <span className="material-icons">
                                {isOpen ? "expand_less" : "expand_more"}
                              </span>
                            </button>

                            {/* QUESTIONS */}
                            {isOpen && (
                              <div className="table-responsive mcq-group-content">
                                <table className="table table-hover">
                                  <thead>
                                    <tr>
                                      <th>S.No</th>
                                      <th>Question</th>
                                      <th>Actions</th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {group.questions.map((mcq, index) => (
                                      <tr key={mcq._id}>
                                        <td>{index + 1}</td>
                                        <td>{mcq.question}</td>
                                        <td>
                                          <div className="admin-table-actions">
                                            <button
                                              type="button"
                                              className="admin-icon-btn"
                                              onClick={() =>
                                                handleEdit(mcq._id)
                                              }
                                              aria-label="Edit question"
                                              title="Edit MCQ"
                                            >
                                              <span className="material-icons">
                                                edit
                                              </span>
                                            </button>

                                            <button
                                              type="button"
                                              className="admin-icon-btn"
                                              onClick={() =>
                                                handleDelete(mcq._id)
                                              }
                                              aria-label="Delete question"
                                              title="Delete MCQ"
                                            >
                                              <span className="material-icons">
                                                delete
                                              </span>
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
                        );
                      })}
                    </div>
                  </>
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
