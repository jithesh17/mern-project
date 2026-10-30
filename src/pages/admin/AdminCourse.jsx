import { useEffect, useState } from "react";

import AdminLayout from "../../components/AdminLayout";

import "../../css/dashboard.css";
import "../../css/theme.css";
import "../../css/admin.css";

function AdminCourse() {
  // =====================================================
  // API
  // =====================================================

  const API_URL = "http://localhost:5000/api/courses";

  const API_BASE_URL = "http://localhost:5000";

  // =====================================================
  // STATE
  // =====================================================

  const [courses, setCourses] = useState([]);

  const [view, setView] = useState("list");

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    duration: "",
    logo: "",
    logoFile: null,
    logoPreview: "",
  });

  // =====================================================
  // GET COURSES
  // =====================================================

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await response.json();

      console.log("GET courses response:", data);

      if (Array.isArray(data)) {
        setCourses(data);
      } else {
        setCourses([]);
        throw new Error("Invalid courses response");
      }
    } catch (error) {
      console.error("Fetch courses error:", error);

      setError(error.message || "Unable to load courses.");
    } finally {
      setLoading(false);
    }
  }

  // =====================================================
  // RESET FORM
  // =====================================================

  function resetForm() {
    // Revoke old preview URL if it exists
    if (form.logoPreview) {
      URL.revokeObjectURL(form.logoPreview);
    }

    setForm({
      name: "",
      duration: "",
      logo: "",
      logoFile: null,
      logoPreview: "",
    });
  }

  // =====================================================
  // OPEN CREATE FORM
  // =====================================================

  function openCreateForm() {
    resetForm();

    setError("");

    setView("form");
  }

  // =====================================================
  // BACK TO LIST
  // =====================================================

  function handleBack() {
    resetForm();

    setError("");

    setView("list");
  }

  // =====================================================
  // TEXT INPUT CHANGE
  // =====================================================

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // =====================================================
  // LOGO CHANGE
  // =====================================================

  function handleLogoChange(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    // ---------------------------------------------
    // Validate file type
    // ---------------------------------------------

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      alert("Please select a PNG or JPG image.");

      event.target.value = "";

      return;
    }

    // ---------------------------------------------
    // Validate file size
    // ---------------------------------------------

    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Logo size must be less than 2MB.");

      event.target.value = "";

      return;
    }

    // ---------------------------------------------
    // Remove previous preview URL
    // ---------------------------------------------

    if (form.logoPreview) {
      URL.revokeObjectURL(form.logoPreview);
    }

    // ---------------------------------------------
    // Create preview URL
    // ---------------------------------------------

    const previewUrl = URL.createObjectURL(file);

    // ---------------------------------------------
    // Store file + preview
    // ---------------------------------------------

    setForm((previous) => ({
      ...previous,
      logo: file.name,
      logoFile: file,
      logoPreview: previewUrl,
    }));
  }

  // =====================================================
  // SAVE COURSE
  // =====================================================

  async function handleSave(event) {
    event.preventDefault();

    // ---------------------------------------------
    // Validation
    // ---------------------------------------------

    if (!form.name.trim()) {
      alert("Please enter the course name.");
      return;
    }

    if (!form.duration.trim()) {
      alert("Please enter the duration.");
      return;
    }

    if (!form.logoFile) {
      alert("Please select a course logo.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      // ---------------------------------------------
      // Create FormData
      // ---------------------------------------------

      const formData = new FormData();

      // These names must match backend
      formData.append("course", form.name.trim());

      formData.append("duration", form.duration.trim());

      formData.append("logo", form.logoFile);

      // ---------------------------------------------
      // POST API
      // ---------------------------------------------

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      // ---------------------------------------------
      // Read response
      // ---------------------------------------------

      const data = await response.json();

      console.log("POST course response:", data);

      // ---------------------------------------------
      // API ERROR
      // ---------------------------------------------

      if (!response.ok) {
        throw new Error(data.message || "Failed to create course");
      }

      // ---------------------------------------------
      // SUCCESS
      // ---------------------------------------------

      alert(data.message || "Course created successfully");

      // ---------------------------------------------
      // Reset form
      // ---------------------------------------------

      resetForm();

      // ---------------------------------------------
      // Go back to list
      // ---------------------------------------------

      setView("list");

      // ---------------------------------------------
      // Fetch latest courses
      // ---------------------------------------------

      await fetchCourses();
    } catch (error) {
      console.error("Create course error:", error);

      setError(
        error.message || "Something went wrong while creating the course.",
      );

      alert(error.message || "Something went wrong while creating the course.");
    } finally {
      setSaving(false);
    }
  }

  // =====================================================
  // IMAGE URL
  // =====================================================

  function getLogoUrl(logo) {
    if (!logo) {
      return "";
    }

    // If MongoDB already stores:
    // /uploads/courses/filename.jpeg
    if (logo.startsWith("/uploads/")) {
      return `http://localhost:5000${logo}`;
    }

    // If it is already a complete URL
    if (logo.startsWith("http://") || logo.startsWith("https://")) {
      return logo;
    }

    // Fallback if only filename is stored
    return `http://localhost:5000/uploads/courses/${logo}`;
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <AdminLayout>
      <div className="admin-page">
        {/* ================================================= */}
        {/* LIST VIEW */}
        {/* ================================================= */}

        {view === "list" && (
          <>
            {/* PAGE HEADER */}

            <div className="admin-page-header">
              <div>
                <h2>Course</h2>

                <p>All courses offered by the academy.</p>
              </div>

              <button
                type="button"
                className="btn btn-primary admin-create-btn"
                onClick={openCreateForm}
              >
                <span className="material-icons">add</span>
                Create
              </button>
            </div>

            {/* ERROR */}

            {error && (
              <div
                className="alert alert-danger"
                style={{
                  marginBottom: "20px",
                }}
              >
                {error}
              </div>
            )}

            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    {/* LOADING */}

                    {loading ? (
                      <div className="admin-empty">
                        <span className="material-icons">sync</span>

                        <p>Loading courses...</p>
                      </div>
                    ) : courses.length === 0 ? (
                      /* EMPTY */

                      <div className="admin-empty">
                        <span className="material-icons">menu_book</span>

                        <p>No courses yet. Click Create to add one.</p>
                      </div>
                    ) : (
                      /* TABLE */

                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Course</th>

                            <th>Duration</th>

                            <th>Logo</th>

                            <th>Preview</th>
                          </tr>
                        </thead>

                        <tbody>
                          {courses.map((course) => (
                            <tr key={course._id}>
                              {/* COURSE */}

                              <td>{course.course}</td>

                              {/* DURATION */}

                              <td>{course.duration}</td>

                              {/* LOGO NAME */}

                              <td>
                                {course.logo ? (
                                  <span className="badge badge-info">
                                    {course.logo.split("/").pop()}
                                  </span>
                                ) : (
                                  <span className="badge badge-warning">
                                    No logo
                                  </span>
                                )}
                              </td>

                              {/* IMAGE */}

                              <td>
                                {course.logo ? (
                                  <img
                                    src={getLogoUrl(course.logo)}
                                    alt={course.course}
                                    style={{
                                      width: "60px",
                                      height: "60px",
                                      objectFit: "cover",
                                      borderRadius: "8px",
                                    }}
                                  />
                                ) : (
                                  <span>No image</span>
                                )}
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
          </>
        )}

        {/* ================================================= */}
        {/* CREATE FORM */}
        {/* ================================================= */}

        {view === "form" && (
          <>
            {/* BACK */}

            <button
              type="button"
              className="admin-back-link"
              onClick={handleBack}
              disabled={saving}
            >
              <span className="material-icons">arrow_back</span>
              Back to Courses
            </button>

            <div className="row">
              <div className="col-lg-12">
                <div className="card admin-form-card">
                  {/* HEADER */}

                  <div className="card-header">
                    <h4 className="card-title">Create Course</h4>
                  </div>

                  {/* BODY */}

                  <div className="card-body">
                    <form onSubmit={handleSave}>
                      {/* ================================================= */}
                      {/* COURSE */}
                      {/* ================================================= */}

                      <div className="admin-form-group">
                        <label htmlFor="course-name">Course</label>

                        <input
                          id="course-name"
                          name="name"
                          type="text"
                          placeholder="e.g. React"
                          value={form.name}
                          onChange={handleChange}
                          disabled={saving}
                          required
                        />
                      </div>

                      {/* ================================================= */}
                      {/* DURATION */}
                      {/* ================================================= */}

                      <div className="admin-form-group">
                        <label htmlFor="course-duration">Duration</label>

                        <input
                          id="course-duration"
                          name="duration"
                          type="text"
                          placeholder="e.g. 4 Weeks"
                          value={form.duration}
                          onChange={handleChange}
                          disabled={saving}
                          required
                        />
                      </div>

                      {/* ================================================= */}
                      {/* LOGO */}
                      {/* ================================================= */}

                      <div className="admin-form-group">
                        <label htmlFor="course-logo">Logo</label>

                        <input
                          id="course-logo"
                          name="logo"
                          type="file"
                          accept="image/png,image/jpeg"
                          onChange={handleLogoChange}
                          disabled={saving}
                        />

                        <p className="admin-form-hint">
                          PNG or JPG, up to 2MB.
                        </p>

                        {/* ================================================= */}
                        {/* IMAGE PREVIEW */}
                        {/* ================================================= */}

                        {form.logoPreview && (
                          <div className="admin-logo-preview">
                            <img
                              src={form.logoPreview}
                              alt={form.logo}
                              style={{
                                width: "120px",
                                height: "120px",
                                objectFit: "cover",
                                borderRadius: "10px",
                                display: "block",
                                marginBottom: "10px",
                              }}
                            />

                            <span>{form.logo}</span>
                          </div>
                        )}
                      </div>

                      {/* ================================================= */}
                      {/* BUTTONS */}
                      {/* ================================================= */}

                      <div className="admin-form-actions">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={saving}
                        >
                          {saving ? "Saving..." : "Save"}
                        </button>

                        <button
                          type="button"
                          className="btn btn-light"
                          onClick={handleBack}
                          disabled={saving}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminCourse;
