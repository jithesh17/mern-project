import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { useNavigate } from "react-router-dom";

import "../../css/dashboard.css";
import "../../css/theme.css";
import "../../css/admin.css";

const API_URL = "http://localhost:5000/api";

const batches = ["Batch A", "Batch B", "Batch C"];

const statuses = ["Active", "Completed"];

function CreateStudent() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    student: "",
    course: "",
    batch: batches[0],
    startDate: "",
    status: "Active",
  });

  // =====================================================
  // GET COURSES
  // =====================================================

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_URL}/courses`);

      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await response.json();

      console.log("GET courses response:", data);

      setCourses(data);

      // Select first course automatically

      if (data.length > 0) {
        setForm((previous) => ({
          ...previous,
          course: previous.course || data[0]._id,
        }));
      }
    } catch (error) {
      console.error("Error fetching courses:", error);

      alert(error.message);
    }
  };

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // CREATE STUDENT
  // =====================================================

  const handleCreate = async (event) => {
    event.preventDefault();

    // Validation

    if (!form.student.trim()) {
      alert("Please enter student name");
      return;
    }

    if (!form.course) {
      alert("Please select a course");
      return;
    }

    if (!form.batch) {
      alert("Please select a batch");
      return;
    }

    if (!form.startDate) {
      alert("Please select start date");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/students`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      });

      const data = await response.json();

      console.log("POST student response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to create student");
      }

      alert("Student created successfully");

      // Go back to list

      navigate("/admin/student");
    } catch (error) {
      console.error("Create student error:", error);

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
          onClick={() => navigate("/admin/student")}
        >
          <span className="material-icons">arrow_back</span>
          Back to Students
        </button>

        {/* ================================================= */}
        {/* FORM */}
        {/* ================================================= */}

        <div className="row">
          <div className="col-lg-12">
            <div className="card admin-form-card">
              {/* HEADER */}

              <div className="card-header">
                <h4 className="card-title">Create Student</h4>
              </div>

              {/* BODY */}

              <div className="card-body">
                <form onSubmit={handleCreate}>
                  {/* ================================================= */}
                  {/* STUDENT */}
                  {/* ================================================= */}

                  <div className="admin-form-group">
                    <label htmlFor="student-name">Student</label>

                    <input
                      id="student-name"
                      name="student"
                      type="text"
                      placeholder="Enter student name"
                      value={form.student}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* ================================================= */}
                  {/* COURSE */}
                  {/* ================================================= */}

                  <div className="admin-form-group">
                    <label htmlFor="student-course">Course</label>

                    <select
                      id="student-course"
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
                  {/* BATCH */}
                  {/* ================================================= */}

                  <div className="admin-form-group">
                    <label htmlFor="student-batch">Batch</label>

                    <select
                      id="student-batch"
                      name="batch"
                      value={form.batch}
                      onChange={handleChange}
                      required
                    >
                      {batches.map((batch) => (
                        <option key={batch} value={batch}>
                          {batch}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* ================================================= */}
                  {/* START DATE */}
                  {/* ================================================= */}

                  <div className="admin-form-group">
                    <label htmlFor="student-start">Start Date</label>

                    <input
                      id="student-start"
                      name="startDate"
                      type="date"
                      value={form.startDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* ================================================= */}
                  {/* STATUS */}
                  {/* ================================================= */}

                  <div className="admin-form-group">
                    <label htmlFor="student-status">Status</label>

                    <select
                      id="student-status"
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* ================================================= */}
                  {/* BUTTONS */}
                  {/* ================================================= */}

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
                      onClick={() => navigate("/admin/student")}
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

export default CreateStudent;
