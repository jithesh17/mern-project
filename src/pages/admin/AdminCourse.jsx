import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { initialCourses } from "../../data/adminData";


import "../../css/dashboard.css";
import "../../css/theme.css";
import "../../css/admin.css";

function AdminCourse() {

  const [courses, setCourses] = useState(initialCourses); 
  const [view, setView] = useState("list"); // "list" | "form"
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    duration: "",
    logo: "",
    logoPreview: "",
  });
  
  function resetForm() {
    setForm({ name: "", duration: "", logo: "", logoPreview: "" });
    setEditingId(null);
  }

  function openCreateForm() {
    resetForm();
    setView("form");
  }

  function openEditForm(course) {
    setForm({
      name: course.name,
      duration: course.duration,
      logo: course.logo,
      logoPreview: course.logo,
    });
    setEditingId(course.id);
    setView("form");
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function handleLogoChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setForm((previous) => ({
      ...previous,
      logo: file.name,
      logoPreview: previewUrl,
    }));
  }

  function handleSave(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.duration.trim()) {
      return;
    }

    if (editingId) {
      setCourses((previous) =>
        previous.map((course) =>
          course.id === editingId
            ? { ...course, name: form.name, duration: form.duration, logo: form.logo }
            : course
        )
      );
    } else {
      setCourses((previous) => [
        ...previous,
        {
          id: Date.now(),
          name: form.name,
          duration: form.duration,
          logo: form.logo,
        },
      ]);
    }

    resetForm();
    setView("list");
  }

  function handleDelete(id) {
    setCourses((previous) => previous.filter((course) => course.id !== id));
  }

  return (
    <AdminLayout>

      <div className="admin-page">

        {view === "list" && (
          <>
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

            <div className="row">
              <div className="col-lg-12">

                <div className="card">

                  <div className="card-body">

                    {courses.length === 0 ? (
                      <div className="admin-empty">
                        <span className="material-icons">menu_book</span>
                        <p>No courses yet. Click Create to add one.</p>
                      </div>
                    ) : (
                      <table className="table table-hover">

                        <thead>
                          <tr>
                            <th>Course</th>
                            <th>Duration</th>
                            <th>Logo</th>
                            <th>Actions</th>
                          </tr>
                        </thead>

                        <tbody>
                          {courses.map((course) => (
                            <tr key={course.id}>
                              <td>{course.name}</td>
                              <td>{course.duration}</td>
                              <td>
                                {course.logo ? (
                                  <span className="badge badge-info">{course.logo}</span>
                                ) : (
                                  <span className="badge badge-warning">No logo</span>
                                )}
                              </td>
                              <td>
                                <div className="admin-table-actions">
                                  <button
                                    type="button"
                                    className="admin-icon-btn"
                                    onClick={() => openEditForm(course)}
                                    aria-label="Edit course"
                                  >
                                    <span className="material-icons">edit</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="admin-icon-btn"
                                    onClick={() => handleDelete(course.id)}
                                    aria-label="Delete course"
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
          </>
        )}


        {view === "form" && (
          <>
            <button
              type="button"
              className="admin-back-link"
              onClick={() => { resetForm(); setView("list"); }}
            >
              <span className="material-icons">arrow_back</span>
              Back to Courses
            </button>

            <div className="row">
              <div className="col-lg-12">

                <div className="card admin-form-card">

                  <div className="card-header">
                    <h4 className="card-title">
                      {editingId ? "Edit Course" : "Create Course"}
                    </h4>
                  </div>

                  <div className="card-body">

                    <form onSubmit={handleSave}>

                      <div className="admin-form-group">
                        <label htmlFor="course-name">Course</label>
                        <input
                          id="course-name"
                          name="name"
                          type="text"
                          placeholder="e.g. React"
                          value={form.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="admin-form-group">
                        <label htmlFor="course-duration">Duration</label>
                        <input
                          id="course-duration"
                          name="duration"
                          type="text"
                          placeholder="e.g. 4 Weeks"
                          value={form.duration}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="admin-form-group">
                        <label htmlFor="course-logo">Logo</label>
                        <input
                          id="course-logo"
                          name="logo"
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                        />
                        <p className="admin-form-hint">PNG or JPG, up to 2MB.</p>

                        {form.logoPreview && (                          <div className="admin-logo-preview">
                            <img src={form.logoPreview} alt="Logo preview" />
                            <span>{form.logo}</span>
                          </div>
                        )}
                      </div>

                      <div className="admin-form-actions">
                        <button type="submit" className="btn btn-primary">
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-light"
                          onClick={() => { resetForm(); setView("list"); }}
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
