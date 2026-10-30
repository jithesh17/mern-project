import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/auth.css";

function TrainerLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // Get registered trainer
    const storedTrainer = JSON.parse(localStorage.getItem("brAcademyTrainer"));

    // Check whether trainer exists
    if (!storedTrainer) {
      setMessage("No trainer account found.");
      setMessageType("error-message");
      return;
    }

    // Check email and password
    if (
      email.trim() === storedTrainer.email &&
      password === storedTrainer.password
    ) {
      // Save trainer login status
      localStorage.setItem("trainerLoggedIn", "true");

      // Save current trainer
      localStorage.setItem("currentTrainer", JSON.stringify(storedTrainer));

      setMessage("Login successful!");
      setMessageType("success-message");

      // Go to trainer dashboard
      setTimeout(() => {
        navigate("/trainer/dashboard");
      }, 500);
    } else {
      setMessage("Invalid email or password.");
      setMessageType("error-message");
    }
  }

  function handleForgotPassword(e) {
    e.preventDefault();

    alert("Password reset feature will be added later.");
  }

  return (
    <div className="auth-container">
      {/* LEFT SIDE */}

      <div className="auth-left">
        <div className="brand">
          <div className="brand-logo">B</div>

          <span>BR Academy</span>
        </div>

        <div className="welcome-content">
          <h1>Welcome Back Trainer!</h1>

          <p>Login to manage your batches, attendance and students.</p>

          <div className="features">
            <div className="feature">
              <span>✓</span>
              <p>Manage your batches</p>
            </div>

            <div className="feature">
              <span>✓</span>
              <p>Mark student attendance</p>
            </div>

            <div className="feature">
              <span>✓</span>
              <p>View batch reports</p>
            </div>

            <div className="feature">
              <span>✓</span>
              <p>Track student performance</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="auth-right">
        <div className="login-box">
          <h2>Trainer Login</h2>

          <p className="subtitle">Sign in to your BR Academy trainer account</p>

          {/* MESSAGE */}

          <div className={messageType}>{message}</div>

          {/* LOGIN FORM */}

          <form id="trainerLoginForm" onSubmit={handleSubmit}>
            {/* EMAIL */}

            <div className="form-group">
              <label htmlFor="trainerEmail">Email Address</label>

              <input
                type="email"
                id="trainerEmail"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD */}

            <div className="form-group">
              <div className="password-label">
                <label htmlFor="trainerPassword">Password</label>

                <a
                  href="#"
                  id="forgotTrainerPassword"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </a>
              </div>

              <div className="password-box">
                <input
                  type={showPassword ? "text" : "password"}
                  id="trainerPassword"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  id="toggleTrainerPassword"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* REMEMBER ME */}

            <div className="remember">
              <label>
                <input
                  type="checkbox"
                  id="trainerRememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
            </div>

            {/* LOGIN BUTTON */}

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TrainerLogin;
