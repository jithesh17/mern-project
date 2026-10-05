import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { useNavigate } from "react-router-dom";

import "../../css/dashboard.css";
import "../../css/theme.css";
import "../../css/admin.css";

const API_URL = "http://localhost:5000";

function CreateSubCourse() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
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
  // GET COURSES
  // =====================================================

  useEffect(() => {
    fetchCourses();
  }, []);

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

      alert(error.message);
    }
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
  // CREATE SUB COURSE
  // =====================================================

  const handleCreate = async (event) => {
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
      // FORM DATA
      // =================================================

      const formData = new FormData();

      formData.append("course", form.course);

      formData.append("sub", form.sub);

      formData.append("description", form.description);

      formData.append("notes", form.notes);

      // IMAGE

      if (imageFile) {
        formData.append("image", imageFile);
      }

      // PDF

      if (pdfFile) {
        formData.append("pdf", pdfFile);
      }

      // =================================================
      // POST
      // =================================================

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
  // UI
  // =====================================================

  return (
    <AdminLayout>
      <div className="admin-page">
        {/* ================================================= */}
        {/* BACK */}
        {/* ================================================= */}

        <button
          type="button"
          className="admin-back-link"
          onClick={() => navigate("/admin/sub-course")}
        >
          <span className="material-icons">arrow_back</span>
          Back to Sub Courses
        </button>

        {/* ================================================= */}
        {/* FORM */}
        {/* ================================================= */}

        <div className="row">
          <div className="col-lg-12">
            <div className="card admin-form-card">
              {/* HEADER */}

              <div className="card-header">
                <h4 className="card-title">Create Sub Course</h4>
              </div>

              {/* BODY */}

              <div className="card-body">
                <form onSubmit={handleCreate}>
                  {/* COURSE */}

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

                  {/* SUB COURSE */}

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

                  {/* DESCRIPTION */}

                  <div className="admin-form-group">
                    <label htmlFor="sub-course-description">Description</label>

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

                  {/* NOTES */}

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

                  {/* IMAGE */}

                  <div className="admin-form-group">
                    <label htmlFor="sub-course-image">Course Image</label>

                    <input
                      id="sub-course-image"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      onChange={handleImageChange}
                    />

                    <p className="admin-form-hint">PNG or JPG, up to 2MB.</p>

                    {imagePreview && (
                      <div className="admin-logo-preview">
                        <img src={imagePreview} alt="Sub course preview" />
                      </div>
                    )}
                  </div>

                  {/* PDF */}

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
                  </div>

                  {/* BUTTONS */}

                  <div className="admin-form-actions">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Creating..." : "Create"}
                    </button>

                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => navigate("/admin/sub-course")}
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

export default CreateSubCourse;
