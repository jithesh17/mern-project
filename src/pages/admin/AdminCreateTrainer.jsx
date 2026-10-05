import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/AdminLayout";

import "../../css/dashboard.css";
import "../../css/theme.css";
import "../../css/admin.css";

function AdminCreateTrainer() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    course: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.course
    ) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/trainers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create trainer"
        );
      }

      alert("Trainer created successfully");

      navigate("/admin/trainer");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page">

        <div className="admin-page-header">
          <div>
            <button
              type="button"
              className="admin-back-btn"
              onClick={() =>
                navigate("/admin/trainer")
              }
            >
              <span className="material-icons">
                arrow_back
              </span>
              Back to Trainers
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">

            <div className="card">

              <div className="card-header">
                <h3>Create Trainer</h3>
              </div>

              <div className="card-body">

                <form onSubmit={handleSubmit}>

                  {/* NAME */}
                  <div className="form-group">
                    <label>Name</label>

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Trainer name"
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="form-group">
                    <label>Email</label>

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="trainer@gmail.com"
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="form-group">
                    <label>Password</label>

                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                    />
                  </div>

                  {/* COURSE */}
                  <div className="form-group">
                    <label>Course</label>

                    <input
                      type="text"
                      name="course"
                      value={form.course}
                      onChange={handleChange}
                      placeholder="e.g. MERN Stack"
                    />
                  </div>

                  {/* BUTTONS */}
                  <div className="admin-form-actions">

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading
                        ? "Saving..."
                        : "Save"}
                    </button>

                    <button
                      type="button"
                      className="btn btn-secondary"
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

export default AdminCreateTrainer;