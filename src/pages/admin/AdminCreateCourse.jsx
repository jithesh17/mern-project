import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/AdminLayout";

import "../../css/dashboard.css";
import "../../css/theme.css";
import "../../css/admin.css";

function AdminCreateCourse() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    duration: "",
    logo: "",
    logoFile: null,
    logoPreview: "",
  });

  const [loading, setLoading] = useState(false);

  /*
   * Handle text input changes
   */
  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  /*
   * Handle logo/image selection
   */
  function handleLogoChange(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    // Validate file type
    const allowedTypes = ["image/png", "image/jpeg"];

    if (!allowedTypes.includes(file.type)) {
      alert("Please select a PNG or JPG image.");
      event.target.value = "";
      return;
    }

    // Validate file size - 2MB
    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Logo size must be less than 2MB.");
      event.target.value = "";
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    setForm((previous) => ({
      ...previous,
      logo: file.name,
      logoFile: file,
      logoPreview: previewUrl,
    }));
  }

  /*
   * Submit course
   */
  async function handleSave(event) {
    event.preventDefault();

    // Basic validation
    if (!form.name.trim()) {
      alert("Please enter the course name.");
      return;
    }

    if (!form.duration.trim()) {
      alert("Please enter the course duration.");
      return;
    }

    if (!form.logoFile) {
      alert("Please select a course logo.");
      return;
    }

    try {
      setLoading(true);

      /*
       * FormData is required because
       * we are sending an image/file.
       */
      const formData = new FormData();

      /*
       * These names MUST match your backend/Postman fields:
       *
       * course
       * duration
       * logo
       */
      formData.append("course", form.name);
      formData.append("duration", form.duration);
      formData.append("logo", form.logoFile);

      /*
       * API request
       */
      const response = await fetch(
        "http://localhost:5000/api/courses",
        {
          method: "POST",
          body: formData,
        }
      );

      /*
       * Try to read JSON response
       */
      const data = await response.json();

      console.log("API Response:", data);

      /*
       * Handle API errors
       */
      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create course"
        );
      }

      /*
       * Success
       */
      alert(data.message || "Course created successfully");

      /*
       * Navigate back to course list
       */
      navigate("/admin/course");

    } catch (error) {
      console.error("Create course error:", error);

      alert(
        error.message ||
          "Something went wrong while creating the course."
      );
    } finally {
      setLoading(false);
    }
  }

  /*
   * Cancel
   */
  function handleCancel() {
    navigate("/admin/course");
  }

  return (
    <AdminLayout>

      <div className="admin-page">

        {/* BACK */}
        <button
          type="button"
          className="admin-back-link"
          onClick={handleCancel}
        >
          <span className="material-icons">
            arrow_back
          </span>

          Back to Courses
        </button>

        <div className="row">

          <div className="col-lg-12">

            <div className="card admin-form-card">

              {/* HEADER */}
              <div className="card-header">

                <h4 className="card-title">
                  Create Course
                </h4>

              </div>

              {/* FORM */}
              <div className="card-body">

              <form onSubmit={handleSave}>

                  {/* COURSE */}
                  <div className="admin-form-group">

                    <label htmlFor="course-name">
                      Course
                    </label>

                    <input
                      id="course-name"
                      name="name"
                      type="text"
                      placeholder="e.g. React"
                      value={form.name}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />

                  </div>

                  {/* DURATION */}
                  <div className="admin-form-group">

                    <label htmlFor="course-duration">
                      Duration
                    </label>

                    <input
                      id="course-duration"
                      name="duration"
                      type="text"
                      placeholder="e.g. 4 Weeks"
                      value={form.duration}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />

                  </div>

                  {/* LOGO */}
                  <div className="admin-form-group">

                    <label htmlFor="course-logo">
                      Logo
                    </label>

                    <input
                      id="course-logo"
                      name="logo"
                      type="file"
                      accept="image/png,image/jpeg"
                      onChange={handleLogoChange}
                      disabled={loading}
                    />

                    <p className="admin-form-hint">
                      PNG or JPG, up to 2MB.
                    </p>

                    {/* LOGO PREVIEW */}
                    {form.logoPreview && (
                      <div className="admin-logo-preview">

                        <img
                          src={form.logoPreview}
                          alt="Logo preview"
                        />

                        <span>
                          {form.logo}
                        </span>

                      </div>
                    )}

                  </div>

                  {/* BUTTONS */}
                  <div className="admin-form-actions">

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>

                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={handleCancel}
                      disabled={loading}
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

export default AdminCreateCourse;
