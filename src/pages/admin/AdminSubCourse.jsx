import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { initialSubCourses, initialCourses } from "../../data/adminData";

import "../../css/dashboard.css";
import "../../css/theme.css";
import "../../css/admin.css";

function AdminSubCourse() {

  const [subCourses, setSubCourses] = useState(initialSubCourses);
  const [view, setView] = useState("list"); // "list" | "form"
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    course: initialCourses[0]?.name || "",
    sub: "",
    description: "",
    image: "",
    imagePreview: "",
  });

  function resetForm() {
    setForm({
      course: initialCourses[0]?.name || "",
      sub: "",
      description: "",
      image: "",
      imagePreview: "",
    });
    setEditingId(null);
  }

  function openCreateForm() {
    resetForm();
    setView("form");
  }

  function openEditForm(subCourse) {
    setForm({
      course: subCourse.course,
      sub: subCourse.sub,
      description: subCourse.description,
      image: subCourse.image,
      imagePreview: subCourse.image,
    });
    setEditingId(subCourse.id);
    setView("form");
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setForm((previous) => ({
      ...previous,
      image: file.name,
      imagePreview: previewUrl,
    }));
  }

  function handleSave(event) {
    event.preventDefault();

    if (!form.course || !form.sub.trim()) {
      return;
    }

    if (editingId) {
      setSubCourses((previous) =>
        previous.map((subCourse) =>
          subCourse.id === editingId
            ? { ...subCourse, course: form.course, sub: form.sub, description: form.description, image: form.image }
            : subCourse
        )
      );
    } else {
      setSubCourses((previous) => [
        ...previous,
        {
          id: Date.now(),
          sno: previous.length + 1,
          course: form.course,
          sub: form.sub,
          description: form.description,
          image: form.image,
        },
      ]);
    }

    resetForm();
    setView("list");
  }

  function handleDelete(id) {
    setSubCourses((previous) =>
      previous
        .filter((subCourse) => subCourse.id !== id)
        .map((subCourse, index) => ({ ...subCourse, sno: index + 1 }))
    );
  }

  return (
    <AdminLayout>

      <div className="admin-page">

        {view === "list" && (
          <>
            <div className="admin-page-header">

              <div>
                <h2>Sub Course</h2>
                <p>Topics/modules under each course.</p>
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

                    {subCourses.length === 0 ? (
                      <div className="admin-empty">
                        <span className="material-icons">menu_book</span>
                        <p>No sub courses yet. Click Create to add one.</p>
                      </div>
                    ) : (
                      <table className="table table-hover">

                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Course</th>
                            <th>Sub</th>
                            <th>Description</th>
                            <th>Actions</th>
                          </tr>
                        </thead>

                        <tbody>
                          {subCourses.map((subCourse) => (
                            <tr key={subCourse.id}>
                              <td>{subCourse.sno}</td>
                              <td>
                                <span className="badge badge-primary">{subCourse.course}</span>
                              </td>
                              <td>{subCourse.sub}</td>
                              <td>{subCourse.description}</td>
                              <td>
                                <div className="admin-table-actions">
                                  <button
                                    type="button"
                                    className="admin-icon-btn"
                                    onClick={() => openEditForm(subCourse)}
                                    aria-label="Edit sub course"
                                  >
                                    <span className="material-icons">edit</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="admin-icon-btn"
                                    onClick={() => handleDelete(subCourse.id)}
                                    aria-label="Delete sub course"
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
              Back to Sub Courses
            </button>

            <div className="row">
              <div className="col-lg-12">

                <div className="card admin-form-card">

                  <div className="card-header">
                    <h4 className="card-title">
                      {editingId ? "Edit Sub Course" : "Create Sub Course"}
                    </h4>
                  </div>

                  <div className="card-body">

                    <form onSubmit={handleSave}>

                      <div className="admin-form-group">
                        <label htmlFor="sub-course-course">Course</label>
                        <select
                          id="sub-course-course"
                          name="course"
                          value={form.course}
                          onChange={handleChange}
                        >
                          {initialCourses.map((course) => (
                            <option key={course.id} value={course.name}>
                              {course.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="admin-form-group">
                        <label htmlFor="sub-course-sub">Sub</label>
                        <input
                          id="sub-course-sub"
                          name="sub"
                          type="text"
                          placeholder="e.g. React"
                          value={form.sub}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="admin-form-group">
                        <label htmlFor="sub-course-description">Description</label>
                        <input
                          id="sub-course-description"
                          name="description"
                          type="text"
                          placeholder="Short description"
                          value={form.description}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label htmlFor="sub-course-image">Image</label>
                        <input
                          id="sub-course-image"
                          name="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        <p className="admin-form-hint">PNG or JPG, up to 2MB.</p>

                        {form.imagePreview && (
                          <div className="admin-logo-preview">
                            <img src={form.imagePreview} alt="Preview" />
                            <span>{form.image}</span>
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

export default AdminSubCourse;
