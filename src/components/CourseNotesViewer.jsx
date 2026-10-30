import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/courseNotesViewer.css";
import MCQ from "../pages/MCQ";

const API_URL = "http://localhost:5000";

function getAssetUrl(path) {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${API_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

function CourseNotesViewer({ course, subCourseId, onClose }) {
  const [showMCQ, setShowMCQ] = useState(false);
  const [subCourse, setSubCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [zoom, setZoom] = useState(100);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSubCourse() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/subcourses/${subCourseId}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load subcourse notes.");
        }

        const result = data.subCourse || data.subcourse || data;
        setSubCourse(result);
      } catch (err) {
        console.error("Error loading subcourse PDF:", err);
        setError(err.message || "Unable to load notes.");
      } finally {
        setLoading(false);
      }
    }

    if (subCourseId) {
      fetchSubCourse();
    }
  }, [subCourseId]);

  const pdfUrl = getAssetUrl(subCourse?.pdf);

  const handleZoomIn = () => {
    setZoom((previous) => Math.min(previous + 10, 150));
  };

  const handleZoomOut = () => {
    setZoom((previous) => Math.max(previous - 10, 70));
  };
  if (showMCQ) {
    return (
      <MCQ
        subCourseId={subCourseId}
        course={course}
        onClose={() => setShowMCQ(false)}
      />
    );
  }

  return (
    <div className="course-notes-overlay">
      <div className="course-notes-viewer">
        <div className="course-notes-toolbar">
          <div className="course-notes-toolbar-title">
            {course || subCourse?.sub || "Course Notes"}
          </div>

          <div className="course-notes-controls">
            <button type="button" onClick={handleZoomOut}>
              −
            </button>

            <span>{zoom}%</span>

            <button type="button" onClick={handleZoomIn}>
              +
            </button>

            <button
              type="button"
              className="course-notes-close"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        </div>

        <div className="course-notes-body">
          {loading ? (
            <p>Loading study PDF...</p>
          ) : error ? (
            <p>{error}</p>
          ) : !pdfUrl ? (
            <p>No study PDF has been uploaded for this subcourse yet.</p>
          ) : (
            <iframe
              key={pdfUrl}
              src={`${pdfUrl}#toolbar=1&zoom=${zoom}`}
              title={`${course || "Course"} study notes`}
              width="100%"
              height="100%"
              style={{
                border: "none",
                minHeight: "70vh",
              }}
            />
          )}
        </div>
        <div className="course-notes-footer">
          <button
            type="button"
            className="course-card-button"
            onClick={() =>
              navigate(`/mcq/${subCourseId}`, {
                state: { course },
              })
            }
          >
            Take MCQ →
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseNotesViewer;
