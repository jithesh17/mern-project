import Layout from "../components/Layout";
import profileImage from "../assets/images/profile/profile.png";
import "../css/profile.css";
import "../css/theme.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [passwordStage, setPasswordStage] = useState("initial");
  const [otpSent, setOtpSent] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordMessageType, setPasswordMessageType] = useState("");

  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!student?.email) {
      setPasswordMessage(
        "Student email is not available. Please log in again.",
      );
      setPasswordMessageType("error-message");
      return;
    }

    setLoading(true);
    setPasswordMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/students/send-password-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: student.email }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP.");
      }

      setOtpSent(true);
      setPasswordStage("otp");
      setPasswordMessage(
        "OTP sent to your registered email. It expires in 5 minutes.",
      );
      setPasswordMessageType("success-message");
    } catch (error) {
      setPasswordMessage(error.message || "Unable to send OTP.");
      setPasswordMessageType("error-message");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      setPasswordMessage("Please enter the OTP.");
      setPasswordMessageType("error-message");
      return;
    }

    setLoading(true);
    setPasswordMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/students/verify-password-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: student.email,
            otp: otp.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed.");
      }

      setPasswordStage("verified");

      setPasswordMessage("OTP verified successfully.");
      setPasswordMessageType("success-message");
    } catch (error) {
      setPasswordMessage(error.message || "Unable to verify OTP.");
      setPasswordMessageType("error-message");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (!student?.email) {
      setPasswordMessage("Student email not found. Please log in again.");
      setPasswordMessageType("error-message");
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage("Please fill in all password fields.");
      setPasswordMessageType("error-message");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordMessage("New password must be at least 8 characters.");
      setPasswordMessageType("error-message");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage("New passwords do not match.");
      setPasswordMessageType("error-message");
      return;
    }

    setLoading(true);
    setPasswordMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/students/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: student.email,
            currentPassword,
            newPassword,
            confirmPassword,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password.");
      }

      // Clear password fields after successful update
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setOtp("");
      setOtpSent(false);

      // Return to the initial screen
      setPasswordStage("initial");

      setPasswordMessage(data.message || "Password changed successfully!");
      setPasswordMessageType("success-message");
    } catch (error) {
      setPasswordMessage(error.message || "Unable to change password.");
      setPasswordMessageType("error-message");
    } finally {
      setLoading(false);
    }
  };

  const [student] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("currentStudent"));
    } catch {
      return null;
    }
  });

  const formatDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const studentName = student?.student || "Student";
  const studentEmail = student?.email || "Not available";
  const courseName =
    typeof student?.course === "object"
      ? student?.course?.course
      : student?.course;
  return (
    <Layout>
      <div className="profile-page">
        {/* =====================================================
            PROFILE HERO
        ===================================================== */}

        <div className="profile-hero">
          <img
            src={profileImage}
            alt="Profile"
            className="profile-hero-image"
          />

          <div className="profile-hero-content">
            <h1>{studentName}</h1>

            <h4>{courseName || "BR Academy Student"}</h4>

            <p>
              Welcome to your BR Academy profile. Here you can view your student
              information and assigned course details.
            </p>
          </div>
          <button
            type="button"
            className="profile-edit-btn"
            onClick={() => navigate("/edit-profile")}
          >
            <i className="fa fa-edit"></i>
            &nbsp; Edit Profile
          </button>
        </div>

        {/* =====================================================
            PERSONAL INFORMATION + QUICK PROFILE
        ===================================================== */}

        <div className="profile-row profile-row-two">
          {/* PERSONAL INFORMATION */}

          <div className="profile-card personal-information">
            <div className="profile-card-header">
              <h3>Personal Information</h3>
            </div>

            <div className="profile-card-body">
              <div className="personal-grid">
                <div className="personal-item">
                  <span className="personal-label">Full Name</span>

                  <span className="personal-value">Manjunathan M</span>
                </div> 

                <div className="personal-item">
                  <span className="personal-label">Email</span>
                  <span className="personal-value">{studentEmail}</span>
                </div>
 
                <div className="personal-item">
                  <span className="personal-label">Assigned Course</span>
                  <span className="personal-value">
                    {courseName || "Not available"}
                  </span>
                </div>

                <div className="personal-item">
                  <span className="personal-label">Batch</span>
                  <span className="personal-value">
                    {student?.batch || "Not available"}
                  </span>
                </div>

                <div className="personal-item">
                  <span className="personal-label">Start Date</span>
                  <span className="personal-value">
                    {formatDate(student?.startDate)}
                  </span>
                </div>

                <div className="personal-item">
                  <span className="personal-label">Status</span>
                  <span className="personal-value">
                    {student?.status || "Not available"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* QUICK PROFILE */}

          {/* CHANGE PASSWORD */}

          <div className="profile-card quick-profile">
            <div className="profile-card-header">
              <h3>Change Password</h3>
            </div>

            <div className="quick-profile-body">
              <div className="quick-profile-icon">
                <i className="fa fa-lock"></i>
              </div>

              {passwordStage === "initial" && (
                <>
                  <h3 className="quick-profile-title">Secure Your Account</h3>

                  <p className="quick-profile-text">
                    Verify your registered email to change your password.
                  </p>

                  {passwordMessage && (
                    <p className={passwordMessageType} role="status">
                      {passwordMessage}
                    </p>
                  )}

                  <button
                    type="button"
                    className="update-profile-btn"
                    disabled={loading}
                    onClick={handleSendOTP}
                  >
                    {loading ? "Sending OTP..." : "Change Password"}
                  </button>
                </>
              )}

              {passwordStage === "otp" && (
                <>
                  <h3 className="quick-profile-title">Verify Your Email</h3>

                  <p className="quick-profile-text">
                    Enter the OTP sent to your registered email address.
                  </p>

                  <form onSubmit={handleVerifyOTP}>
                    <div className="form-group">
                      <label htmlFor="passwordOtp">Email OTP</label>

                      <input
                        id="passwordOtp"
                        type="text"
                        className="form-control"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) =>
                          setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                        }
                        inputMode="numeric"
                        maxLength={6}
                        pattern="[0-9]{6}"
                        required
                        disabled={loading}
                      />
                    </div>

                    {passwordMessage && (
                      <p className={passwordMessageType} role="status">
                        {passwordMessage}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="update-profile-btn"
                      disabled={loading}
                    >
                      {loading ? "Verifying..." : "Verify OTP"}
                    </button>

                    <button
                      type="button"
                      className="update-profile-btn"
                      style={{ marginTop: "10px" }}
                      disabled={loading}
                      onClick={() => {
                        setPasswordStage("initial");
                        setOtpSent(false);
                        setOtp("");
                        setPasswordMessage("");
                        setPasswordMessageType("");
                      }}
                    >
                      Back
                    </button>
                  </form>
                </>
              )}

              {passwordStage === "verified" && (
                <>
                  <h3 className="quick-profile-title">Set New Password</h3>

                  <p className="quick-profile-text">
                    OTP verified successfully. Enter your current password and
                    choose a new password.
                  </p>
                  <form onSubmit={handlePasswordUpdate}>
                    <div className="form-group">
                      <label htmlFor="currentPassword">Current Password</label>

                      <div className="password-input-wrapper">
                        <input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          className="form-control"
                          placeholder="Enter current password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          autoComplete="current-password"
                          required
                        />

                        <button
                          type="button"
                          className="password-toggle-btn"
                          onClick={() =>
                            setShowCurrentPassword((prev) => !prev)
                          }
                          aria-label={
                            showCurrentPassword
                              ? "Hide current password"
                              : "Show current password"
                          }
                        >
                          <i
                            className={`fa ${showCurrentPassword ? "fa-eye-slash" : "fa-eye"}`}
                          ></i>
                        </button>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="newPassword">New Password</label>

                      <div className="password-input-wrapper">
                        <input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          className="form-control"
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          minLength={8}
                          autoComplete="new-password"
                          required
                        />

                        <button
                          type="button"
                          className="password-toggle-btn"
                          onClick={() => setShowNewPassword((prev) => !prev)}
                          aria-label={
                            showNewPassword
                              ? "Hide new password"
                              : "Show new password"
                          }
                        >
                          <i
                            className={`fa ${showNewPassword ? "fa-eye-slash" : "fa-eye"}`}
                          ></i>
                        </button>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword">
                        Confirm New Password
                      </label>

                      <div className="password-input-wrapper">
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          className="form-control"
                          placeholder="Confirm new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          minLength={8}
                          autoComplete="new-password"
                          required
                        />

                        <button
                          type="button"
                          className="password-toggle-btn"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                          aria-label={
                            showConfirmPassword
                              ? "Hide confirm password"
                              : "Show confirm password"
                          }
                        >
                          <i
                            className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
                          ></i>
                        </button>
                      </div>
                    </div>

                    {passwordMessage && (
                      <p className={passwordMessageType} role="status">
                        {passwordMessage}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="update-profile-btn"
                      disabled={loading}
                    >
                      Change Password
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>


        {/* =====================================================
            RECENT CERTIFICATES
        ===================================================== */}

        <div className="profile-card certificates-card">
          <div className="profile-card-header certificates-header">
            <h3>Recent Certificates</h3>

            <button type="button" className="view-all-btn">
              View All
            </button>
          </div>

          <div className="profile-card-body">
            <div className="certificates-grid">
              {/* HTML & CSS */}

              <div className="certificate-item">
                <div className="certificate-badge badge-yellow">
                  <i className="fa fa-certificate"></i>
                </div>

                <h4 className="certificate-name">HTML &amp; CSS</h4>

                <span className="certificate-status">
                  Completed Successfully
                </span>
              </div>

              {/* JAVASCRIPT */}

              <div className="certificate-item">
                <div className="certificate-badge badge-green">
                  <i className="fa fa-certificate"></i>
                </div>

                <h4 className="certificate-name">JavaScript</h4>

                <span className="certificate-status">Certified</span>
              </div>

              {/* BOOTSTRAP */}

              <div className="certificate-item">
                <div className="certificate-badge badge-purple">
                  <i className="fa fa-certificate"></i>
                </div>

                <h4 className="certificate-name">Bootstrap</h4>

                <span className="certificate-status">Completed</span>
              </div>

              {/* REACT */}

              <div className="certificate-item">
                <div className="certificate-badge badge-red">
                  <i className="fa fa-certificate"></i>
                </div>

                <h4 className="certificate-name">React.js</h4>

                <span className="certificate-status">In Progress</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
