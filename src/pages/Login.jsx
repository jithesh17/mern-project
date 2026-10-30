import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // =====================================================
  // LOGIN
  // =====================================================

  async function handleSubmit(e) {
    e.preventDefault();

    // Clear previous message
    setMessage("");
    setMessageType("");

    try {
      // Send login request to backend
      const response = await fetch("http://localhost:5000/api/students/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      // =====================================================
      // LOGIN FAILED
      // =====================================================

      if (!response.ok) {
        setMessage(data.message || "Invalid email or password.");
        setMessageType("error-message");
        return;
      }

      // =====================================================
      // LOGIN SUCCESSFUL
      // =====================================================

      setMessage("Login successful!");
      setMessageType("success-message");

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("loggedIn", "true");
      sessionStorage.setItem("currentStudent", JSON.stringify(data.student));

      // =====================================================
      // GO TO DASHBOARD
      // =====================================================

      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      console.error("Login error:", error);

      setMessage("Unable to connect to the server.");
      setMessageType("error-message");
    }
  }

  // =====================================================
  // FORGOT PASSWORD
  // =====================================================

  function handleForgotPassword(e) {
    e.preventDefault();

    alert("Password reset feature will be added later.");
  }

  return (
    <div className="auth-container">
      {/* =====================================================
          LEFT SIDE
      ===================================================== */}

      <div className="auth-left">
        <div className="brand">
          <div className="brand-logo">B</div>

          <span>BR Academy</span>
        </div>

        <div className="welcome-content">
          <h1>Welcome Back Buddy!</h1>

          <p>Login to continue your learning journey with BR Academy.</p>

          <div className="features">
            <div className="feature">
              <span>✓</span>
              <p>Access your courses</p>
            </div>

            <div className="feature">
              <span>✓</span>
              <p>Track your learning progress</p>
            </div>

            <div className="feature">
              <span>✓</span>
              <p>Take MCQ tests</p>
            </div>

            <div className="feature">
              <span>✓</span>
              <p>View your achievements</p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          RIGHT SIDE
      ===================================================== */}

      <div className="auth-right">
        <div className="login-box">
          <h2>Login</h2>

          <p className="subtitle">Sign in to your BR Academy account</p>

          {/* =====================================================
              MESSAGE
          ===================================================== */}

          <div className={messageType}>{message}</div>

          {/* =====================================================
              LOGIN FORM
          ===================================================== */}

          <form id="loginForm" onSubmit={handleSubmit}>
            {/* =====================================================
                EMAIL
            ===================================================== */}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>

              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* =====================================================
                PASSWORD
            ===================================================== */}

            <div className="form-group">
              <div className="password-label">
                <label htmlFor="password">Password</label>

                <a href="#" id="forgotPassword" onClick={handleForgotPassword}>
                  Forgot Password?
                </a>
              </div>

              <div className="password-box">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  id="togglePassword"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* =====================================================
                REMEMBER ME
            ===================================================== */}

            <div className="remember">
              <label>
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
            </div>

            {/* =====================================================
                LOGIN BUTTON
            ===================================================== */}

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          {/* =====================================================
              ADMIN CREATES STUDENT MESSAGE
          ===================================================== */}

          <div className="register-link">
            <span>Don't have an account? Contact your administrator.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
