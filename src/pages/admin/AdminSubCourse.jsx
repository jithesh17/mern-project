import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import "../../css/dashboard.css";
import "../../css/theme.css";
import "../../css/admin.css";

const API_URL = "http://localhost:5000";

function AdminSubCourse() {
  // =====================================================
  // ROUTER
  // =====================================================

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // =====================================================
  // STATE
  // =====================================================

  const [subCourses, setSubCourses] = useState([]);
  const [courses, setCourses] = useState([]);

  const [view, setView] = useState("list");
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    course: "",
    sub: "",
    description: "",
    notes: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const [imagePreview, setImagePreview] = useState("");

  // =====================================================
  // FETCH COURSES + SUB COURSES
  // =====================================================

  useEffect(() => {
    fetchCourses();
    fetchSubCourses();
  }, []);

  // =====================================================
  // HANDLE ROUTE CHANGE
  // =====================================================

  useEffect(() => {
    // CREATE PAGE
    if (location.pathname === "/admin/sub-course/create") {
      resetForm();
      setView("form");
      return;
    }

    // EDIT PAGE
    if (location.pathname.startsWith("/admin/sub-course/edit/") && id) {
      fetchSubCourseById(id);
      return;
    }

    // LIST PAGE
    if (location.pathname === "/admin/sub-course") {
      setView("list");
      setEditingId(null);
    }
  }, [location.pathname, id]);

  // =====================================================
  // GET ALL COURSES
  // =====================================================

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_URL}/api/courses`);

      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await response.json();

      console.log("GET courses response:", data);

      setCourses(data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  // =====================================================
  // GET ALL SUB COURSES
  // =====================================================

  const fetchSubCourses = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/subcourses`);

      if (!response.ok) {
        throw new Error("Failed to fetch sub courses");
      }

      const data = await response.json();

      console.log("GET subcourses response:", data);

      setSubCourses(data);
    } catch (error) {
      console.error("Failed to fetch sub courses:", error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // GET SINGLE SUB COURSE
  // =====================================================

  const fetchSubCourseById = async (subCourseId) => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/subcourses/${subCourseId}`);

      const data = await response.json();

      console.log("GET subcourse by ID:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch sub course");
      }

      const subCourse = data;

      // Populate form
      setForm({
        course: subCourse.course?._id || "",
        sub: subCourse.sub || "",
        description: subCourse.description || "",
        notes: subCourse.notes || "",
      });

      // Existing image
      if (subCourse.image) {
        setImagePreview(`${API_URL}${subCourse.image}`);
      } else {
        setImagePreview("");
      }

      // Reset file inputs
      setImageFile(null);
      setPdfFile(null);

      // Set edit ID
      setEditingId(subCourse._id);

      // Show form
      setView("form");
    } catch (error) {
      console.error("Failed to fetch sub course:", error);

      alert(error.message);

      navigate("/admin/sub-course");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setForm({
      course: "",
      sub: "",
      description: "",
      notes: "",
    });

    setImageFile(null);
    setPdfFile(null);
    setImagePreview("");

    setEditingId(null);
  };

  // =====================================================
  // HANDLE TEXT INPUT
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // HANDLE IMAGE
  // =====================================================

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  // =====================================================
  // HANDLE PDF
  // =====================================================

  const handlePdfChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setPdfFile(file);
  };

  // =====================================================
  // SAVE / UPDATE SUB COURSE
  // =====================================================

  const handleSave = async (event) => {
    event.preventDefault();

    // Course validation
    if (!form.course) {
      alert("Please select a course");
      return;
    }

    // Sub course validation
    if (!form.sub.trim()) {
      alert("Please enter sub course name");
      return;
    }

    // Description validation
    if (!form.description.trim()) {
      alert("Please enter description");
      return;
    }

    try {
      setLoading(true);

      // =================================================
      // CREATE FORMDATA
      // =================================================

      const formData = new FormData();

      formData.append("course", form.course);
      formData.append("sub", form.sub);
      formData.append("description", form.description);
      formData.append("notes", form.notes);

      // Image
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // PDF
      if (pdfFile) {
        formData.append("pdf", pdfFile);
      }

      // =================================================
      // CREATE
      // =================================================

      if (!editingId) {
        const response = await fetch(`${API_URL}/api/subcourses`, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        console.log("POST subcourse response:", data);

        if (!response.ok) {
          throw new Error(data.message || "Failed to create sub course");
        }

        alert("Sub course created successfully");
      }

      // =================================================
      // UPDATE
      // =================================================
      else {
        const response = await fetch(`${API_URL}/api/subcourses/${editingId}`, {
          method: "PUT",
          body: formData,
        });

        const data = await response.json();

        console.log("PUT subcourse response:", data);

        if (!response.ok) {
          throw new Error(data.message || "Failed to update sub course");
        }

        alert("Sub course updated successfully");
      }

      // =================================================
      // REFRESH TABLE
      // =================================================

      await fetchSubCourses();

      // Reset form
      resetForm();

      // Go back to list
      navigate("/admin/sub-course");
    } catch (error) {
      console.error(error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // DELETE SUB COURSE
  // =====================================================

  const handleDelete = async (subCourse) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${subCourse.sub}"?`,
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/subcourses/${subCourse._id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete sub course");
      }

      alert(`Sub course "${subCourse.sub}" deleted successfully`);

      // Refresh table
      await fetchSubCourses();
    } catch (error) {
      console.error(error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // RETURN UI
  // =====================================================

  return (
    <AdminLayout>
      <div className="admin-page">
        {/* ================================================= */}
        {/* LIST VIEW */}
        {/* ================================================= */}

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
                onClick={() => navigate("/admin/sub-course/create")}
              >
                <span className="material-icons">add</span>
                Create
              </button>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    {loading ? (
                      <div className="admin-empty">
                        <p>Loading...</p>
                      </div>
                    ) : subCourses.length === 0 ? (
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
                          {subCourses.map((subCourse, index) => (
                            <tr key={subCourse._id}>
                              {/* S.NO */}

                              <td>{index + 1}</td>

                              {/* COURSE */}

                              <td>
                                <span className="badge badge-primary">
                                  {subCourse.course?.course || "Unknown Course"}
                                </span>
                              </td>

                              {/* SUB */}

                              <td>{subCourse.sub}</td>

                              {/* DESCRIPTION */}

                              <td>{subCourse.description}</td>

                              {/* ACTIONS */}

                              <td>
                                <div className="admin-table-actions">
                                  {/* EDIT */}

                                  <button
                                    type="button"
                                    className="admin-icon-btn"
                                    onClick={() =>
                                      navigate(
                                        `/admin/sub-course/edit/${subCourse._id}`,
                                      )
                                    }
                                  >
                                    <span className="material-icons">edit</span>
                                  </button>

                                  {/* DELETE */}

                                  <button
                                    type="button"
                                    className="admin-icon-btn"
                                    onClick={() => handleDelete(subCourse)}
                                    aria-label="Delete sub course"
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
          </>
        )}

        {/* ================================================= */}
        {/* FORM VIEW */}
        {/* ================================================= */}

        {view === "form" && (
          <>
            {/* BACK */}

            <button
              type="button"
              className="admin-back-link"
              onClick={() => navigate("/admin/sub-course")}
            >
              <span className="material-icons">arrow_back</span>
              Back to Sub Courses
            </button>

            <div className="row">
              <div className="col-lg-12">
                <div className="card admin-form-card">
                  {/* HEADER */}

                  <div className="card-header">
                    <h4 className="card-title">
                      {editingId ? "Edit Sub Course" : "Create Sub Course"}
                    </h4>
                  </div>

                  {/* BODY */}

                  <div className="card-body">
                    <form onSubmit={handleSave}>
                      {/* ================================================= */}
                      {/* COURSE */}
                      {/* ================================================= */}

                      <div className="admin-form-group">
                        <label htmlFor="sub-course-course">Course</label>

                        <select
                          id="sub-course-course"
                          name="course"
                          value={form.course}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Course</option>

                          {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                              {course.course}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* ================================================= */}
                      {/* SUB COURSE */}
                      {/* ================================================= */}

                      <div className="admin-form-group">
                        <label htmlFor="sub-course-sub">Sub</label>

                        <input
                          id="sub-course-sub"
                          name="sub"
                          type="text"
                          placeholder="e.g. HTML"
                          value={form.sub}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* ================================================= */}
                      {/* DESCRIPTION */}
                      {/* ================================================= */}

                      <div className="admin-form-group">
                        <label htmlFor="sub-course-description">
                          Description
                        </label>

                        <input
                          id="sub-course-description"
                          name="description"
                          type="text"
                          placeholder="Short description"
                          value={form.description}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* ================================================= */}
                      {/* NOTES */}
                      {/* ================================================= */}

                      <div className="admin-form-group">
                        <label htmlFor="sub-course-notes">Notes</label>

                        <textarea
                          id="sub-course-notes"
                          name="notes"
                          placeholder="Enter notes for students"
                          value={form.notes}
                          onChange={handleChange}
                          rows="5"
                        />
                      </div>

                      {/* ================================================= */}
                      {/* IMAGE */}
                      {/* ================================================= */}

                      <div className="admin-form-group">
                        <label htmlFor="sub-course-image">Course Image</label>

                        <input
                          id="sub-course-image"
                          type="file"
                          accept="image/jpeg,image/jpg,image/png"
                          onChange={handleImageChange}
                        />

                        <p className="admin-form-hint">
                          PNG or JPG, up to 2MB.
                        </p>

                        {imagePreview && (
                          <div className="admin-logo-preview">
                            <img src={imagePreview} alt="Sub course preview" />
                          </div>
                        )}
                      </div>

                      {/* ================================================= */}
                      {/* PDF */}
                      {/* ================================================= */}

                      <div className="admin-form-group">
                        <label htmlFor="sub-course-pdf">Study PDF</label>

                        <input
                          id="sub-course-pdf"
                          type="file"
                          accept="application/pdf"
                          onChange={handlePdfChange}
                        />

                        {pdfFile && (
                          <p className="admin-form-hint">
                            Selected PDF: {pdfFile.name}
                          </p>
                        )}

                        {!pdfFile && editingId && (
                          <p className="admin-form-hint">
                            Leave empty to keep the existing PDF.
                          </p>
                        )}
                      </div>

                      {/* ================================================= */}
                      {/* BUTTONS */}
                      {/* ================================================= */}

                      <div className="admin-form-actions">
                        {/* SAVE */}

                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={loading}
                        >
                          {loading ? "Saving..." : "Save"}
                        </button>

                        {/* CANCEL */}

                        <button
                          type="button"
                          className="btn btn-light"
                          onClick={() => {
                            resetForm();
                            navigate("/admin/sub-course");
                          }}
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
