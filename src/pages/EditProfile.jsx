import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../css/theme.css";
import "../css/editProfile.css";

function EditProfile() {
  const navigate = useNavigate();

  const [student] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("currentStudent"));
    } catch {
      return null;
    }
  });

  const [name, setName] = useState(student?.student || "");
  const [email, setEmail] = useState(student?.email || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const courseName =
    typeof student?.course === "object"
      ? student?.course?.course
      : student?.course;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!student?._id && !student?.id) {
      setMessage("Student ID not found. Please log in again.");
      setMessageType("error");
      return;
    }

    if (!name.trim() || !email.trim()) {
      setMessage("Please fill in all fields.");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const studentId = student._id || student.id;

      const response = await fetch(
        `http://localhost:5000/api/students/${studentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student: name.trim(),
            email: email.trim(),

            course:
              typeof student.course === "object"
                ? student.course?._id
                : student.course,

            batch: student.batch,
            startDate: student.startDate,
            status: student.status,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile.");
      }

      // Update the logged-in student's saved details.
      const updatedStudent = {
        ...student,
        ...(data.student || {}),
        student: name.trim(),
        email: email.trim(),
      };

      sessionStorage.setItem("currentStudent", JSON.stringify(updatedStudent));

      setMessage("Profile updated successfully!");
      setMessageType("success");

      // Return to the profile page after saving.
      setTimeout(() => {
        navigate("/profile");
      }, 800);
    } catch (error) {
      setMessage(error.message || "Unable to update profile.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  if (!student) {
    return (
      <Layout>
        <div className="edit-profile-page">
          <div className="edit-profile-card">
            <h2>Student details not found</h2>
            <p>Please log in again to edit your profile.</p>
            <button
              type="button"
              className="edit-profile-cancel"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="edit-profile-page">
        <div className="edit-profile-card">
          <div className="edit-profile-header">
            <div>
              <h2>Edit Profile</h2>
              <p>Update your personal information below.</p>
            </div>
            <i className="fa fa-user-circle"></i>
          </div>

          {message && (
            <div
              className={`edit-profile-message ${messageType}`}
              role="status"
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="edit-profile-field">
              <label htmlFor="studentName">Full Name</label>
              <input
                id="studentName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="edit-profile-field">
              <label htmlFor="studentEmail">Email Address</label>
              <input
                id="studentEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>

            <div className="edit-profile-field">
              <label htmlFor="assignedCourse">Assigned Course</label>
              <input
                id="assignedCourse"
                type="text"
                value={courseName || "Not available"}
                readOnly
              />
            </div>

            <div className="edit-profile-field">
              <label htmlFor="studentBatch">Batch</label>
              <input
                id="studentBatch"
                type="text"
                value={student.batch || "Not available"}
                readOnly
              />
            </div>

            <div className="edit-profile-actions">
              <button
                type="button"
                className="edit-profile-cancel"
                onClick={() => navigate("/profile")}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="edit-profile-save"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default EditProfile;
