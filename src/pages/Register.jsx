// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../css/auth.css";
// function Register() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     terms: false,
//   });

//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("");

//   // Handle input changes
//   function handleChange(e) {
//     const { name, value, type, checked } = e.target;

//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   }

//   // Handle form submit
//   function handleSubmit(e) {
//     e.preventDefault();

//     const {
//       name,
//       email,
//       phone,
//       password,
//       confirmPassword,
//       terms,
//     } = formData;

//     // Password validation
//     if (password !== confirmPassword) {
//       setMessage("Passwords do not match.");
//       setMessageType("error-message");
//       return;
//     }

//     // Terms validation
//     if (!terms) {
//       setMessage("Please accept the Terms & Conditions.");
//       setMessageType("error-message");
//       return;
//     }

//     // Create user object
//     const user = {
//       name,
//       email,
//       phone,
//       password,
//     };

//     // Save user to localStorage
//     localStorage.setItem("brAcademyUser", JSON.stringify(user));

//     setMessage("Registration successful! Redirecting to login...");
//     setMessageType("success-message");

//     // Go to login page
//     setTimeout(() => {
//       navigate("/login");
//     }, 1000);
//   }

//   return (
//     <div className="auth-container">

//       {/* LEFT SIDE */}

//       <div className="auth-left">

//         <div className="brand">
//           <div className="brand-logo">B</div>

//           <span>BR Academy</span>
//         </div>

//         <div className="welcome-content">

//           <h1>Start Learning Today!</h1>

//           <p>
//             Create your BR Academy account and begin your learning journey.
//           </p>

//           <div className="features">

//             <div className="feature">
//               <span>✓</span>
//               <p>Learn from structured courses</p>
//             </div>

//             <div className="feature">
//               <span>✓</span>
//               <p>Practice with MCQ tests</p>
//             </div>

//             <div className="feature">
//               <span>✓</span>
//               <p>Track your progress</p>
//             </div>

//             <div className="feature">
//               <span>✓</span>
//               <p>Build your skills</p>
//             </div>

//           </div>

//         </div>

//       </div>

//       {/* RIGHT SIDE */}

//       <div className="auth-right">

//         <div className="login-box register-box">

//           <h2>Create Account</h2>

//           <p className="subtitle">
//             Register for your BR Academy account
//           </p>

//           {/* MESSAGE */}

//           <div className={messageType}>
//             {message}
//           </div>

//           {/* REGISTER FORM */}

//           <form id="registerForm" onSubmit={handleSubmit}>

//             {/* FULL NAME */}

//             <div className="form-group">

//               <label htmlFor="name">
//                 Full Name
//               </label>

//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 placeholder="Enter your full name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />

//             </div>

//             {/* EMAIL */}

//             <div className="form-group">

//               <label htmlFor="email">
//                 Email Address
//               </label>

//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />

//             </div>

//             {/* PHONE */}

//             <div className="form-group">

//               <label htmlFor="phone">
//                 Phone Number
//               </label>

//               <input
//                 type="tel"
//                 id="phone"
//                 name="phone"
//                 placeholder="Enter your phone number"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//               />

//             </div>

//             {/* PASSWORD */}

//             <div className="form-group">

//               <label htmlFor="password">
//                 Password
//               </label>

//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 placeholder="Create a password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />

//             </div>

//             {/* CONFIRM PASSWORD */}

//             <div className="form-group">

//               <label htmlFor="confirmPassword">
//                 Confirm Password
//               </label>

//               <input
//                 type="password"
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 placeholder="Confirm your password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 required
//               />

//             </div>

//             {/* TERMS */}

//             <div className="remember">

//               <label>

//                 <input
//                   type="checkbox"
//                   id="terms"
//                   name="terms"
//                   checked={formData.terms}
//                   onChange={handleChange}
//                 />

//                 I agree to the Terms & Conditions

//               </label>

//             </div>

//             {/* REGISTER BUTTON */}

//             <button
//               type="submit"
//               className="login-btn"
//             >
//               Create Account
//             </button>

//           </form>

//           {/* LOGIN LINK */}

//           <div className="register-link">

//             <span>
//               Already have an account?
//             </span>

//             <a
//               href="/login"
//               onClick={(e) => {
//                 e.preventDefault();
//                 navigate("/login");
//               }}
//             >
//               Login
//             </a>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Register;