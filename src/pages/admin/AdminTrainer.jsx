import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/AdminLayout";

import "../../css/dashboard.css";
import "../../css/theme.css";
import "../../css/admin.css";

function AdminTrainer() {
  const navigate = useNavigate();

  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  // GET ALL TRAINERS
  const fetchTrainers = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/trainers"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch trainers");
      }

      const data = await response.json();

      setTrainers(data);
    } catch (error) {
      console.error("Fetch trainer error:", error);
      alert("Failed to load trainers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  // DELETE TRAINER
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trainer?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/trainers/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete trainer"
        );
      }

      alert("Trainer deleted successfully");

      // Remove deleted trainer from UI
      setTrainers((previousTrainers) =>
        previousTrainers.filter(
          (trainer) => trainer._id !== id
        )
      );
    } catch (error) {
      console.error("Delete trainer error:", error);
      alert(error.message);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page">

        {/* HEADER */}
        <div className="admin-page-header">
          <div>
            <h2>Trainer</h2>
            <p>Trainers on staff, by name and course.</p>
          </div>

          <button
            type="button"
            className="btn btn-primary admin-create-btn"
            onClick={() =>
              navigate("/admin/trainer/create")
            }
          >
            <span className="material-icons">add</span>
            Create
          </button>
        </div>

        {/* TRAINER TABLE */}
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">

                {loading ? (
                  <div className="admin-empty">
                    <p>Loading trainers...</p>
                  </div>
                ) : trainers.length === 0 ? (
                  <div className="admin-empty">
                    <span className="material-icons">
                      person
                    </span>

                    <p>
                      No trainers yet. Click Create to add one.
                    </p>
                  </div>
                ) : (
                  <table className="table table-hover">

                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {trainers.map((trainer) => (
                        <tr key={trainer._id}>

                          <td>
                            {trainer.name}
                          </td>

                          <td>
                            <span className="badge badge-info">
                              {trainer.course}
                            </span>
                          </td>

                          <td>
                            <div className="admin-table-actions">

                              {/* EDIT */}
                              <button
                                type="button"
                                className="admin-icon-btn"
                                onClick={() =>
                                  navigate(
                                    `/admin/trainer/edit/${trainer._id}`
                                  )
                                }
                              >
                                <span className="material-icons">
                                  edit
                                </span>
                              </button>

                              {/* DELETE */}
                              <button
                                type="button"
                                className="admin-icon-btn"
                                onClick={() =>
                                  handleDelete(trainer._id)
                                }
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
                )}

              </div>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

export default AdminTrainer;  