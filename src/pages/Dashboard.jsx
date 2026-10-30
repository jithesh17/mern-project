import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import "../css/dashboard.css";
import "../css/theme.css";

const API_URL = "http://localhost:5000";

function getId(value) {
  if (!value) return "";
  if (typeof value === "object") {
    return String(value._id || value.id || "");
  }
  return String(value);
}

function getResultSubCourseId(result) {
  return getId(result.subCourse || result.subcourse);
}

function Dashboard() {
  const [assignedCourse, setAssignedCourse] = useState(null);
  const [subCourses, setSubCourses] = useState([]);
  const [mcqResults, setMcqResults] = useState([]);
  const [courseLoading, setCourseLoading] = useState(true);
  const [resultsLoading, setResultsLoading] = useState(true);
  const [courseError, setCourseError] = useState("");
  const [resultsError, setResultsError] = useState("");

  const currentStudent = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem("currentStudent") || "{}");
    } catch {
      return {};
    }
  }, []);

  const studentName =
    currentStudent.student || currentStudent.name || "Student";

  useEffect(() => {
    let cancelled = false;

    async function fetchAssignedCourseAndSubCourses() {
      try {
        setCourseLoading(true);
        setCourseError("");

        const student = JSON.parse(
          sessionStorage.getItem("currentStudent") || "{}",
        );
        const token = sessionStorage.getItem("token");

        if (!student._id) {
          throw new Error(
            "Student information not found. Please log in again.",
          );
        }
        if (!token) {
          throw new Error("Login session not found. Please log in again.");
        }

        const studentResponse = await fetch(
          `${API_URL}/api/students/${student._id}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        const studentData = await studentResponse.json();
        if (!studentResponse.ok) {
          throw new Error(
            studentData.message || "Unable to fetch your assigned course.",
          );
        }

        // Support APIs that return either the student object or { student: ... }.
        const studentDetails =
          studentData.student &&
          typeof studentData.student === "object" &&
          !Array.isArray(studentData.student)
            ? studentData.student
            : studentData;

        const courseValue = studentDetails.course;
        const course =
          courseValue && typeof courseValue === "object" ? courseValue : null;

        if (cancelled) return;
        setAssignedCourse(course);

        if (!course?._id) {
          setSubCourses([]);
          return;
        }

        // This route should match the subcourse-by-course route in your backend.
        const subCourseResponse = await fetch(
          `${API_URL}/api/subcourses/course/${course._id}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        const subCourseData = await subCourseResponse.json();
        if (!subCourseResponse.ok) {
          throw new Error(
            subCourseData.message || "Unable to fetch your subcourses.",
          );
        }

        const list = Array.isArray(subCourseData)
          ? subCourseData
          : subCourseData.subCourses ||
            subCourseData.subcourses ||
            subCourseData.data ||
            [];

        list.sort(
          (a, b) =>
            new Date(a.createdAt || 0).getTime() -
            new Date(b.createdAt || 0).getTime(),
        );

        if (!cancelled) setSubCourses(list);
      } catch (error) {
        console.error("Dashboard course error:", error);
        if (!cancelled)
          setCourseError(error.message || "Unable to load course.");
      } finally {
        if (!cancelled) setCourseLoading(false);
      }
    }

    async function fetchMCQResults() {
      try {
        setResultsLoading(true);
        setResultsError("");

        const token = sessionStorage.getItem("token");
        if (!token) {
          throw new Error("Login session not found. Please log in again.");
        }

        const response = await fetch(`${API_URL}/api/mcqs/my-results`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Unable to load MCQ results.");
        }

        const list = Array.isArray(data)
          ? data
          : data.results || data.data || [];

        if (!cancelled) setMcqResults(list);
      } catch (error) {
        console.error("Dashboard MCQ results error:", error);
        if (!cancelled)
          setResultsError(error.message || "Unable to load MCQ results.");
      } finally {
        if (!cancelled) setResultsLoading(false);
      }
    }

    fetchAssignedCourseAndSubCourses();
    fetchMCQResults();

    return () => {
      cancelled = true;
    };
  }, []);

  const mcqTests = mcqResults.length;

  const averageScore = mcqTests
    ? Math.round(
        mcqResults.reduce(
          (total, result) => total + (Number(result.percentage) || 0),
          0,
        ) / mcqTests,
      )
    : 0;

  const hasPassed = (subCourseId) =>
    mcqResults.some(
      (result) =>
        getResultSubCourseId(result) === String(subCourseId) &&
        (result.passed === true || Number(result.percentage) >= 70),
    );

  const getBestScore = (subCourseId) => {
    const scores = mcqResults
      .filter((result) => getResultSubCourseId(result) === String(subCourseId))
      .map((result) => Number(result.percentage))
      .filter((score) => Number.isFinite(score));

    return scores.length ? Math.max(...scores) : null;
  };

  const completedIds = new Set(
    mcqResults
      .filter(
        (result) => result.passed === true || Number(result.percentage) >= 70,
      )
      .map(getResultSubCourseId)
      .filter(Boolean),
  );

  const completedSubCourses = subCourses.filter((subCourse) =>
    completedIds.has(String(subCourse._id)),
  ).length;

  const currentIndex = subCourses.findIndex(
    (subCourse) => !hasPassed(subCourse._id),
  );

  const lockedCount = subCourses.filter((subCourse, index) => {
    return index > 0 && !hasPassed(subCourses[index - 1]._id);
  }).length;
  const inProgressCount = Math.max(
    0,
    subCourses.length - completedSubCourses - lockedCount,
  );
  const completionPercentage = subCourses.length
    ? Math.round((completedSubCourses / subCourses.length) * 100)
    : 0;

  const recentResults = [...mcqResults]
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.updatedAt || 0).getTime() -
        new Date(a.createdAt || a.updatedAt || 0).getTime(),
    )
    .slice(0, 5);

  return (
    <Layout>
      <div className="dashboard-content">
        <div className="dashboard-main">
          <div className="container-fluid">
            {/* Welcome banner */}
            <div className="row">
              <div className="col-xl-12">
                <div
                  className="card"
                  style={{
                    background: "linear-gradient(90deg,#4F46E5,#6366F1)",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  <div className="card-body d-flex justify-content-between align-items-center flex-wrap">
                    <div>
                      <h2 className="text-white mb-2">
                        Welcome Back, {studentName}
                      </h2>
                      <p className="mb-3 text-white">
                        Continue your learning journey and track your progress.
                      </p>
                      <Link to="/course" className="btn btn-light">
                        Resume Learning
                      </Link>
                    </div>
                    <div className="text-right mt-3 mt-md-0">
                      <h5 className="text-white mb-1">Your Course</h5>
                      <h2 className="text-warning">
                        {courseLoading
                          ? "Loading..."
                          : assignedCourse?.course || "Not assigned"}
                      </h2>
                      <small className="text-white">
                        {completedSubCourses} of {subCourses.length} subcourses
                        completed
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic statistics */}
            <div className="row">
              <div className="col-xl-3 col-md-6">
                <div className="card">
                  <div className="card-body d-flex align-items-center">
                    <div className="mr-4">
                      <div style={iconCircle("#4F46E5")}>
                        <span className="material-icons text-white">
                          menu_book
                        </span>
                      </div>
                    </div>
                    <div>
                      <h2>{courseLoading ? "..." : assignedCourse ? 1 : 0}</h2>
                      <h5>Enrolled Courses</h5>
                      <small className="text-success">
                        {assignedCourse
                          ? "Course assigned"
                          : "No course assigned"}
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6">
                <div className="card">
                  <div className="card-body d-flex align-items-center">
                    <div className="mr-4">
                      <div style={iconCircle("#22C55E")}>
                        <span className="material-icons text-white">check</span>
                      </div>
                    </div>
                    <div>
                      <h2>
                        {courseLoading || resultsLoading
                          ? "..."
                          : completedSubCourses}
                      </h2>
                      <h5>Subcourses Completed</h5>
                      <small className="text-success">
                        {courseLoading
                          ? "Loading progress"
                          : `${completionPercentage}% complete`}
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6">
                <div className="card">
                  <div className="card-body d-flex align-items-center">
                    <div className="mr-4">
                      <div style={iconCircle("#F59E0B")}>
                        <span className="material-icons text-white">edit</span>
                      </div>
                    </div>
                    <div>
                      <h2>{resultsLoading ? "..." : mcqTests}</h2>
                      <h5>MCQ Tests Taken</h5>
                      <small className="text-muted">Submitted attempts</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6">
                <div className="card">
                  <div className="card-body d-flex align-items-center">
                    <div className="mr-4">
                      <div style={iconCircle("#EF4444")}>
                        <span className="material-icons text-white">
                          emoji_events
                        </span>
                      </div>
                    </div>
                    <div>
                      <h2>{resultsLoading ? "..." : `${averageScore}%`}</h2>
                      <h5>Average Score</h5>
                      <small className="text-muted">
                        {mcqTests
                          ? "Across submitted attempts"
                          : "No tests submitted yet"}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue learning + learning path */}
            <div className="row">
              <div className="col-xl-6">
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h4 className="card-title mb-0">Continue Learning</h4>
                    <Link to="/course" className="btn btn-sm btn-primary">
                      View All
                    </Link>
                  </div>
                  <div className="card-body">
                    {courseLoading ? (
                      <p>Loading your learning path...</p>
                    ) : courseError ? (
                      <p className="text-danger">{courseError}</p>
                    ) : subCourses.length === 0 ? (
                      <p>
                        No subcourses are available for your assigned course
                        yet.
                      </p>
                    ) : (
                      subCourses.slice(0, 5).map((subCourse, index) => {
                        const completed = hasPassed(subCourse._id);
                        const locked =
                          index > 0 && !hasPassed(subCourses[index - 1]._id);
                        const score = getBestScore(subCourse._id);
                        return (
                          <div key={subCourse._id} className="mb-4">
                            <div className="d-flex justify-content-between align-items-center">
                              <h6 className="mb-1">
                                {subCourse.sub || subCourse.name || "Subcourse"}
                              </h6>
                              <small>
                                {locked
                                  ? "Locked"
                                  : completed
                                    ? "Completed"
                                    : score !== null
                                      ? "Quiz attempted"
                                      : "Not started"}
                              </small>
                            </div>
                            {score !== null && (
                              <>
                                <div className="d-flex justify-content-between mt-2">
                                  <small className="text-muted">
                                    Best quiz score
                                  </small>
                                  <strong>{score}%</strong>
                                </div>
                                <div className="progress mt-2">
                                  <div
                                    className={`progress-bar ${completed ? "bg-success" : "bg-primary"}`}
                                    style={{
                                      width: `${Math.min(100, Math.max(0, score))}%`,
                                    }}
                                  />
                                </div>
                              </>
                            )}
                            {locked && (
                              <small className="text-muted">
                                Pass the previous subcourse to unlock this one.
                              </small>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              <div className="col-xl-6">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">My Learning Path</h4>
                  </div>
                  <div className="card-body">
                    {courseLoading || resultsLoading ? (
                      <p>Calculating your progress...</p>
                    ) : courseError ? (
                      <p className="text-danger">{courseError}</p>
                    ) : subCourses.length === 0 ? (
                      <p>
                        Your learning path will appear here once subcourses are
                        added.
                      </p>
                    ) : (
                      <>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Course completion</span>
                          <strong>{completionPercentage}%</strong>
                        </div>
                        <div className="progress mb-4">
                          <div
                            className="progress-bar bg-success"
                            style={{ width: `${completionPercentage}%` }}
                          />
                        </div>
                        <div className="learning-status-container">
                          <div className="learning-status-item">
                            <h4>{completedSubCourses}</h4>
                            <p>Completed</p>
                          </div>

                          <div className="learning-status-item">
                            <h4>{inProgressCount}</h4>
                            <p>In Progress</p>
                          </div>

                          <div className="learning-status-item">
                            <h4>{lockedCount}</h4>
                            <p>Locked</p>
                          </div>
                        </div>
                        <hr />
                        <div className="learning-status-container">
                          <div className="learning-status-item">
                            <h5>
                              {currentIndex === -1
                                ? "All subcourses completed!"
                                : `Next: ${
                                    subCourses[currentIndex].sub ||
                                    subCourses[currentIndex].name ||
                                    "Subcourse"
                                  }`}
                            </h5>

                            <p className="text-muted">
                              {currentIndex === -1
                                ? "Congratulations! You have passed every subcourse."
                                : "Continue learning and pass the MCQ test to unlock the next subcourse."}
                            </p>
                          </div>

                          <div className="learning-status-action">
                            <Link to="/course" className="btn btn-primary">
                              {currentIndex === -1
                                ? "Review Course"
                                : "Open My Course"}
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Assigned course */}
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-header d-flex justify-content-between">
                    <h4 className="card-title">My Enrolled Course</h4>
                    <Link to="/course" className="btn btn-sm btn-primary">
                      View Course
                    </Link>
                  </div>
                  <div className="card-body">
                    {courseLoading ? (
                      <p>Loading your course...</p>
                    ) : courseError ? (
                      <p className="text-danger">{courseError}</p>
                    ) : assignedCourse ? (
                      <div className="border rounded p-3">
                        <h5>{assignedCourse.course || assignedCourse.name}</h5>
                        <p className="text-muted mb-0">
                          Duration: {assignedCourse.duration || "Not specified"}
                        </p>
                      </div>
                    ) : (
                      <p>You have not been assigned a course yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent saved MCQ results */}
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Recent MCQ Results</h4>
                  </div>
                  <div className="card-body">
                    {resultsLoading ? (
                      <p>Loading results...</p>
                    ) : resultsError ? (
                      <p className="text-danger">{resultsError}</p>
                    ) : recentResults.length === 0 ? (
                      <p>No MCQ attempts have been submitted yet.</p>
                    ) : (
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Subject</th>
                              <th>Score</th>
                              <th>Status</th>
                              <th>Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentResults.map((result, index) => {
                              const subCourseValue =
                                result.subCourse || result.subcourse;

                              const matchedSubCourse =
                                typeof subCourseValue === "object"
                                  ? subCourseValue
                                  : subCourses.find(
                                      (item) =>
                                        String(item._id) ===
                                        String(subCourseValue),
                                    );

                              const subject =
                                matchedSubCourse?.sub ||
                                matchedSubCourse?.name ||
                                (typeof matchedSubCourse?.course === "string"
                                  ? matchedSubCourse.course
                                  : "") ||
                                result.subCourseName ||
                                result.subcourseName ||
                                "Subcourse";
                              const percentage = Number(result.percentage) || 0;
                              const passed =
                                result.passed === true || percentage >= 70;
                              const dateValue =
                                result.createdAt || result.updatedAt;
                              return (
                                <tr key={result._id || index}>
                                  <td>{subject}</td>
                                  <td>{percentage}%</td>
                                  <td>
                                    <span
                                      className={`badge ${passed ? "badge-success" : "badge-danger"}`}
                                    >
                                      {passed ? "Pass" : "Needs improvement"}
                                    </span>
                                  </td>
                                  <td>
                                    {dateValue
                                      ? new Date(dateValue).toLocaleDateString()
                                      : "—"}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer footer-outer">
          <div className="copyright">
            <p>
              Copyright © Designed &amp; Developed by{" "}
              <a href="https://dexignlab.com/" target="_blank" rel="noreferrer">
                DexignLab
              </a>{" "}
              2023
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function iconCircle(background) {
  return {
    width: "70px",
    height: "70px",
    background,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
}

export default Dashboard;
