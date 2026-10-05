import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/AdminLayout";

import "../../css/dashboard.css";
import "../../css/theme.css";
import "../../css/admin.css";

function CreateMCQ() {
  const navigate = useNavigate();

  // ==================================================
  // STATE
  // ==================================================

  const [courses, setCourses] = useState([]);
  const [subCourses, setSubCourses] = useState([]);

  const [loadingCourses, setLoadingCourses] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    course: "",
    subCourse: "",
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "A",
  });

  // ==================================================
  // GET COURSES
  // ==================================================

  const fetchCourses = async () => {
    try {
      setLoadingCourses(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/courses");

      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await response.json();

      setCourses(data);

      // Automatically select first course
      if (data.length > 0) {
        setForm((previous) => ({
          ...previous,
          course: data[0]._id,
        }));
      }
    } catch (error) {
      console.error("Fetch courses error:", error);

      setError("Unable to load courses. Please check the backend.");
    } finally {
      setLoadingCourses(false);
    }
  };

  // ==================================================
  // GET SUBCOURSES
  // ==================================================

  const fetchSubCourses = async (courseId) => {
    try {
      setSubCourses([]);

      if (!courseId) {
        return;
      }

      const response = await fetch("http://localhost:5000/api/subcourses");

      if (!response.ok) {
        throw new Error("Failed to fetch sub courses");
      }

      const data = await response.json();

      // Filter subcourses belonging to selected course
      const filteredSubCourses = data.filter(
        (subCourse) =>
          String(subCourse.course?._id || subCourse.course) ===
          String(courseId),
      );

      setSubCourses(filteredSubCourses);
    } catch (error) {
      console.error("Fetch sub courses error:", error);

      setError("Unable to load sub courses.");
    }
  };

  // ==================================================
  // INITIAL LOAD
  // ==================================================

  useEffect(() => {
    fetchCourses();
  }, []);

  // ==================================================
  // LOAD SUBCOURSES WHEN COURSE CHANGES
  // ==================================================

  useEffect(() => {
    if (form.course) {
      fetchSubCourses(form.course);
    }
  }, [form.course]);

  // ==================================================
  // HANDLE INPUT
  // ==================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "course") {
      setForm((previous) => ({
        ...previous,
        course: value,
        subCourse: "",
      }));

      return;
    }

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==================================================
  // SUBMIT
  // ==================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    // -----------------------------
    // Validation
    // -----------------------------

    if (!form.course) {
      setError("Please select a course.");
      return;
    }

    if (!form.subCourse) {
      setError("Please select a sub course.");
      return;
    }

    if (!form.question.trim()) {
      setError("Please enter the question.");
      return;
    }

    if (
      !form.optionA.trim() ||
      !form.optionB.trim() ||
      !form.optionC.trim() ||
      !form.optionD.trim()
    ) {
      setError("Please enter all four options.");
      return;
    }

    try {
      setSaving(true);

      // -----------------------------
      // Request body
      // -----------------------------

      const requestData = {
        course: form.course,

        subCourse: form.subCourse,

        question: form.question.trim(),

        options: {
          A: form.optionA.trim(),
          B: form.optionB.trim(),
          C: form.optionC.trim(),
          D: form.optionD.trim(),
        },

        correctAnswer: form.correctAnswer,
      };

      // -----------------------------
      // POST
      // -----------------------------

      const response = await fetch("http://localhost:5000/api/mcq", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create MCQ");
      }

      alert("MCQ created successfully.");

      navigate("/admin/mcq");
    } catch (error) {
      console.error("Create MCQ error:", error);

      setError(error.message || "Unable to create MCQ.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        {/* ============================= */}
        {/* BACK */}
        {/* ============================= */}

        <button
          type="button"
          className="admin-back-link"
          onClick={() => navigate("/admin/mcq")}
        >
          <span className="material-icons">arrow_back</span>
          Back to MCQ Test
        </button>

        {/* ============================= */}
        {/* ERROR */}
        {/* ============================= */}

        {error && <div className="alert alert-danger">{error}</div>}

        {/* ============================= */}
        {/* FORM */}
        {/* ============================= */}

        <div className="row">
          <div className="col-lg-12">
            <div className="card admin-form-card">
              <div className="card-header">
                <h4 className="card-title">Create MCQ Question</h4>
              </div>

              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {/* ============================= */}
                  {/* COURSE */}
                  {/* ============================= */}

                  <div className="admin-form-group">
                    <label htmlFor="mcq-course">Course</label>

                    <select
                      id="mcq-course"
                      name="course"
                      value={form.course}
                      onChange={handleChange}
                      disabled={loadingCourses}
                    >
                      <option value="">
                        {loadingCourses
                          ? "Loading courses..."
                          : "Select Course"}
                      </option>

                      {courses.map((course) => (
                        <option key={course._id} value={course._id}>
                          {course.course}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* ============================= */}
                  {/* SUB COURSE */}
                  {/* ============================= */}

                  <div className="admin-form-group">
                    <label htmlFor="mcq-subcourse">Sub Course</label>

                    <select
                      id="mcq-subcourse"
                      name="subCourse"
                      value={form.subCourse}
                      onChange={handleChange}
                      disabled={!form.course}
                    >
                      <option value="">Select Sub Course</option>

                      {subCourses.map((subCourse) => (
                        <option key={subCourse._id} value={subCourse._id}>
                          {subCourse.sub}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* ============================= */}
                  {/* QUESTION */}
                  {/* ============================= */}

                  <div className="admin-form-group">
                    <label htmlFor="mcq-question">MCQ Question</label>

                    <textarea
                      id="mcq-question"
                      name="question"
                      rows="4"
                      placeholder="Type your question here..."
                      value={form.question}
                      onChange={handleChange}
                    />
                  </div>

                  {/* ============================= */}
                  {/* OPTIONS */}
                  {/* ============================= */}

                  <div className="admin-form-group">
                    <label>Options</label>

                    {/* A */}

                    <div className="admin-mcq-option">
                      <span className="admin-mcq-option-label">A</span>

                      <input
                        name="optionA"
                        type="text"
                        placeholder="Enter option A"
                        value={form.optionA}
                        onChange={handleChange}
                      />
                    </div>

                    {/* B */}

                    <div className="admin-mcq-option">
                      <span className="admin-mcq-option-label">B</span>

                      <input
                        name="optionB"
                        type="text"
                        placeholder="Enter option B"
                        value={form.optionB}
                        onChange={handleChange}
                      />
                    </div>

                    {/* C */}

                    <div className="admin-mcq-option">
                      <span className="admin-mcq-option-label">C</span>

                      <input
                        name="optionC"
                        type="text"
                        placeholder="Enter option C"
                        value={form.optionC}
                        onChange={handleChange}
                      />
                    </div>

                    {/* D */}

                    <div className="admin-mcq-option">
                      <span className="admin-mcq-option-label">D</span>

                      <input
                        name="optionD"
                        type="text"
                        placeholder="Enter option D"
                        value={form.optionD}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* ============================= */}
                  {/* CORRECT ANSWER */}
                  {/* ============================= */}

                  <div className="admin-form-group">
                    <label htmlFor="mcq-correct">Correct Answer</label>

                    <select
                      id="mcq-correct"
                      name="correctAnswer"
                      value={form.correctAnswer}
                      onChange={handleChange}
                    >
                      <option value="A">A</option>

                      <option value="B">B</option>

                      <option value="C">C</option>

                      <option value="D">D</option>
                    </select>
                  </div>

                  {/* ============================= */}
                  {/* BUTTONS */}
                  {/* ============================= */}

                  <div className="admin-form-actions">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Save MCQ"}
                    </button>

                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => navigate("/admin/mcq")}
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
      </div>
    </AdminLayout>
  );
}

export default CreateMCQ;
