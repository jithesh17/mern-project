import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";

import "../../css/dashboard.css";
import "../../css/theme.css";
import "../../css/admin.css";

function AdminEditTrainer() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    course: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // GET TRAINER BY ID
  const fetchTrainer = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/trainers/${id}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch trainer"
        );
      }

      setForm({
        name: data.name || "",
        course: data.course || "",
      });

    } catch (error) {
      console.error("Fetch trainer error:", error);
      alert(error.message);
      navigate("/admin/trainer");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainer();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // UPDATE TRAINER
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.course.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        `http://localhost:5000/api/trainers/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: form.name,
            course: form.course,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update trainer"
        );
      }

      alert("Trainer updated successfully");

      navigate("/admin/trainer");

    } catch (error) {
      console.error("Update trainer error:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-page">
          <p>Loading trainer...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      <div className="admin-page">

        {/* BACK */}
        <button
          type="button"
          className="admin-back-link"
          onClick={() => navigate("/admin/trainer")}
        >
          <span className="material-icons">
            arrow_back
          </span>

          Back to Trainers
        </button>

        <div className="row">
          <div className="col-lg-12">

            <div className="card admin-form-card">

              <div className="card-header">
                <h4 className="card-title">
                  Edit Trainer
                </h4>
              </div>

              <div className="card-body">

                <form onSubmit={handleSubmit}>

                  {/* NAME */}
                  <div className="admin-form-group">

                    <label htmlFor="trainer-name">
                      Name
                    </label>

                    <input
                      id="trainer-name"
                      name="name"
                      type="text"
                      placeholder="Trainer name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* COURSE */}
                  <div className="admin-form-group">

                    <label htmlFor="trainer-course">
                      Course
                    </label>

                    <input
                      id="trainer-course"
                      name="course"
                      type="text"
                      placeholder="e.g. MERN Stack"
                      value={form.course}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* BUTTONS */}
                  <div className="admin-form-actions">

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={saving}
                    >
                      {saving ? "Updating..." : "Update"}
                    </button>

                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() =>
                        navigate("/admin/trainer")
                      }
                    >
                      Cancel
                    </button>

                  </div>

                </form>

              </div>
            </div>

          </div>
        </div>

      </div>

    </AdminLayout>
  );
}

export default AdminEditTrainer;