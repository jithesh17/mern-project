import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import CourseNotesViewer from "../components/CourseNotesViewer";

import "../css/course.css";
import "../css/theme.css";

const API_URL = "http://localhost:5000";

function getAssetUrl(path) {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${API_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

// Handle subCourse as either a MongoDB ID or a populated object
function getSubCourseId(value) {
  if (!value) return "";

  if (typeof value === "object") {
    return String(value._id || value.id || "");
  }

  return String(value);
}

function Course() {
  const [mcqResults, setMcqResults] = useState([]);
  const [assignedCourse, setAssignedCourse] = useState(null);
  const [subCourses, setSubCourses] = useState([]);
  const [selectedSubCourse, setSelectedSubCourse] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCourseData() {
      try {
        setLoading(true);
        setError("");

        // 1. Get the logged-in student
        const currentStudent = JSON.parse(
          sessionStorage.getItem("currentStudent") || "{}",
        );

        if (!currentStudent._id) {
          throw new Error(
            "Student information not found. Please log in again.",
          );
        }

        const token = sessionStorage.getItem("token");

        if (!token) {
          throw new Error("Login session expired. Please log in again.");
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // 2. Fetch student details and assigned course
        const studentResponse = await fetch(
          `${API_URL}/api/students/${currentStudent._id}`,
          { headers },
        );

        if (!studentResponse.ok) {
          throw new Error("Unable to fetch student information.");
        }

        const studentData = await studentResponse.json();

        const student =
          studentData.student && typeof studentData.student === "object"
            ? studentData.student
            : studentData;

        const course = student.course;

        if (!course || typeof course !== "object" || !course._id) {
          throw new Error("Your assigned course could not be found.");
        }

        setAssignedCourse(course);

        // 3. Fetch subcourses for the assigned course
        const subCourseResponse = await fetch(
          `${API_URL}/api/subcourses/course/${course._id}`,
          { headers },
        );

        if (!subCourseResponse.ok) {
          throw new Error("Unable to fetch your subcourses.");
        }

        const subCourseData = await subCourseResponse.json();

        const subCourseList = Array.isArray(subCourseData)
          ? subCourseData
          : subCourseData.subCourses ||
            subCourseData.subcourses ||
            subCourseData.data ||
            [];

        // Keep subcourses in their creation order
        const orderedSubCourses = [...subCourseList].sort(
          (a, b) =>
            new Date(a.createdAt || 0).getTime() -
            new Date(b.createdAt || 0).getTime(),
        );

        setSubCourses(orderedSubCourses);

        // 4. Fetch the logged-in student's quiz results
        const resultsResponse = await fetch(`${API_URL}/api/mcqs/my-results`, {
          headers,
        });

        if (!resultsResponse.ok) {
          throw new Error("Unable to fetch your quiz results.");
        }

        const resultsData = await resultsResponse.json();

        const resultsList = Array.isArray(resultsData)
          ? resultsData
          : resultsData.results ||
            resultsData.mcqResults ||
            resultsData.data ||
            [];

        if (!Array.isArray(resultsList)) {
          throw new Error(
            "Quiz results were returned in an unexpected format.",
          );
        }

        setMcqResults(resultsList);

        console.log("Subcourses:", orderedSubCourses);
        console.log("MCQ results:", resultsList);
      } catch (err) {
        console.error("Course page error:", err);
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchCourseData();
  }, []);

  // A subcourse is passed if the student has a passing result for it.
  // If multiple attempts exist, any passing attempt unlocks the next step.
  function hasPassed(subCourseId) {
    return mcqResults.some((result) => {
      const resultSubCourseId = getSubCourseId(
        result.subCourse || result.subcourse,
      );

      const percentage = Number(result.percentage);

      const passed =
        result.passed === true || result.passed === "true" || percentage >= 70;

      return (
        resultSubCourseId === String(subCourseId) && passed && percentage >= 70
      );
    });
  }

  return (
    <Layout>
      <div className="course-page">
        {loading ? (
          <p>Loading your assigned course...</p>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : assignedCourse ? (
          <>
            {/* Assigned Course Banner */}
            {assignedCourse.logo && (
              <div
                className="mern-banner"
                style={{
                  backgroundImage: `url("${getAssetUrl(assignedCourse.logo)}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                role="img"
                aria-label={`${assignedCourse.course} banner`}
              />
            )}

            {/* Course Heading */}
            <div className="course-section">
              <div className="course-section-header">
                <h2>{assignedCourse.course}</h2>

                <p className="course-learning-text">
                  Complete each subcourse to unlock the next subcourse.
                </p>

                {assignedCourse.duration && (
                  <p className="course-learning-text">
                    Duration: {assignedCourse.duration}
                  </p>
                )}
              </div>

              {/* Dynamic Subcourses */}
              {subCourses.length === 0 ? (
                <p>No subcourses have been added to this course yet.</p>
              ) : (
                <div className="course-grid">
                  {subCourses.map((subCourse, index) => {
                    // First subcourse is always unlocked
                    const previousSubCourse = subCourses[index - 1];

                    // Each subsequent subcourse depends on the
                    // previous subcourse's passing quiz result
                    const locked = previousSubCourse
                      ? !hasPassed(previousSubCourse._id)
                      : false;

                    const completed = hasPassed(subCourse._id);

                    const bestResult = mcqResults
                      .filter(
                        (result) =>
                          getSubCourseId(
                            result.subCourse || result.subcourse,
                          ) === String(subCourse._id) &&
                          Number(result.percentage) >= 70 &&
                          (result.passed === true ||
                            result.passed === "true" ||
                            Number(result.percentage) >= 70),
                      )
                      .sort(
                        (a, b) => Number(b.percentage) - Number(a.percentage),
                      )[0];

                    return (
                      <div
                        className={`course-card ${
                          locked ? "course-locked" : "course-active"
                        }`}
                        key={subCourse._id}
                      >
                        {locked && <div className="course-lock">🔒</div>}

                        {subCourse.image && (
                          <img
                            src={getAssetUrl(subCourse.image)}
                            alt={subCourse.sub}
                            className="course-card-image"
                          />
                        )}

                        <div className="course-card-content">
                          <div className="course-card-title-row">
                            <h3 className="course-card-title">
                              {subCourse.sub}
                            </h3>

                            {completed && (
                              <span className="course-completed-badge">
                                ✓ Completed
                              </span>
                            )}
                          </div>

                          {completed && bestResult && (
                            <p className="course-completed-score">
                              Your best score: {bestResult.percentage}%
                            </p>
                          )}

                          <p className="course-card-description">
                            {subCourse.description ||
                              "Start learning this subcourse."}
                          </p>

                          {!locked ? (
                            <button
                              type="button"
                              className="course-card-button"
                              onClick={() => setSelectedSubCourse(subCourse)}
                            >
                              {completed ? "✓ Completed" : "Start Learning →"}
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="course-card-button course-locked-button"
                              disabled
                            >
                              🔒 Locked
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        ) : null}

        {/* Selected Subcourse */}
        {selectedSubCourse && (
          <CourseNotesViewer
            course={selectedSubCourse.sub}
            subCourseId={selectedSubCourse._id}
            onClose={() => setSelectedSubCourse(null)}
          />
        )}
      </div>
    </Layout>
  );
}

export default Course;
