
import userImage from "../assets/images/user.jpg";
import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import "../css/dashboard.css";
import "../css/theme.css";
console.log("DASHBOARD JSX LOADED");
function Dashboard() {
  return (
    <Layout>
    <div className="dashboard-content">

      {/* =========================
          NAV HEADER
      ========================= */}
      


      {/* =========================
          HEADER
      ========================= */}
      


      {/* =========================
          SIDEBAR
      ========================= */}
      

                             
      


      {/* =========================
          CONTENT BODY
      ========================= */}
      <div
        className="dashboard-main"
        
      >

        <div className="container-fluid">


          {/* =========================
              WELCOME BANNER
          ========================= */}
          <div className="row">

            <div className="col-xl-12">

              <div
                className="card"
                style={{
                  background:
                    "linear-gradient(90deg,#4F46E5,#6366F1)",
                  color: "#fff",
                  border: "none"
                }}
              >

                <div className="card-body d-flex justify-content-between align-items-center">

                  <div>

                    <h2 className="text-white mb-2">
                      Welcome Back, Manjunathan
                    </h2>

                    <p className="mb-3 text-white">
                      Continue your learning journey and become a
                      Full Stack Developer.
                    </p>

                    <Link
                      to="/course"
                      className="btn btn-light"
                    >
                      Resume Learning
                    </Link>

                  </div>


                  <div className="text-right">

                    <h5 className="text-white mb-1">
                      Today's Goal
                    </h5>

                    <h2 className="text-warning">
                      3 Lessons
                    </h2>

                    <small className="text-white">
                      Keep your learning streak alive
                    </small>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* =========================
              STATISTICS
          ========================= */}
          <div className="row">


            {/* Enrolled Courses */}
            <div className="col-xl-3 col-md-6">

              <div className="card">

                <div className="card-body d-flex align-items-center">

                  <div className="mr-4">

                    <div
                      style={{
                        width: "70px",
                        height: "70px",
                        background: "#4F46E5",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >

                      <span className="material-icons text-white">
                        menu_book
                      </span>

                    </div>

                  </div>

                  <div>

                    <h2>
                      12
                    </h2>

                    <h5>
                      Enrolled Courses
                    </h5>

                    <small className="text-success">
                      +2 New Courses
                    </small>

                  </div>

                </div>

              </div>

            </div>


            {/* Completed */}
            <div className="col-xl-3 col-md-6">

              <div className="card">

                <div className="card-body d-flex align-items-center">

                  <div className="mr-4">

                    <div
                      style={{
                        width: "70px",
                        height: "70px",
                        background: "#22C55E",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >

                      <span className="material-icons text-white">
                        check
                      </span>

                    </div>

                  </div>

                  <div>

                    <h2>
                      8
                    </h2>

                    <h5>
                      Completed
                    </h5>

                    <small className="text-success">
                      67% Completed
                    </small>

                  </div>

                </div>

              </div>

            </div>


            {/* MCQ */}
            <div className="col-xl-3 col-md-6">

              <div className="card">

                <div className="card-body d-flex align-items-center">

                  <div className="mr-4">

                    <div
                      style={{
                        width: "70px",
                        height: "70px",
                        background: "#F59E0B",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >

                      <span className="material-icons text-white">
                        edit
                      </span>

                    </div>

                  </div>

                  <div>

                    <h2>
                      5
                    </h2>

                    <h5>
                      MCQ Tests
                    </h5>

                    <small className="text-primary">
                      2 Pending
                    </small>

                  </div>

                </div>

              </div>

            </div>


            {/* Score */}
            <div className="col-xl-3 col-md-6">

              <div className="card">

                <div className="card-body d-flex align-items-center">

                  <div className="mr-4">

                    <div
                      style={{
                        width: "70px",
                        height: "70px",
                        background: "#EF4444",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >

                      <span className="material-icons text-white">
                        emoji_events
                      </span>

                    </div>

                  </div>

                  <div>

                    <h2>
                      88%
                    </h2>

                    <h5>
                      Average Score
                    </h5>

                    <small className="text-danger">
                      Excellent Performance
                    </small>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* =========================
              CONTINUE LEARNING
              + WEEKLY PROGRESS
          ========================= */}
          <div className="row">


            {/* Continue Learning */}
            <div className="col-xl-6">

              <div className="card">

                <div className="card-header d-flex justify-content-between align-items-center">

                  <h4 className="card-title mb-0">
                    Continue Learning
                  </h4>

                  <Link
                    to="/course"
                    className="btn btn-sm btn-primary"
                  >
                    View All
                  </Link>

                </div>


                <div className="card-body">


                  {/* HTML */}
                  <div className="mb-4">

                    <div className="d-flex justify-content-between">

                      <h6>
                        HTML & CSS Masterclass
                      </h6>

                      <strong>
                        95%
                      </strong>

                    </div>

                    <div className="progress mt-2">

                      <div
                        className="progress-bar bg-primary"
                        style={{ width: "95%" }}
                      >
                        95%
                      </div>

                    </div>

                  </div>


                  {/* JavaScript */}
                  <div className="mb-4">

                    <div className="d-flex justify-content-between">

                      <h6>
                        JavaScript Essentials
                      </h6>

                      <strong>
                        80%
                      </strong>

                    </div>

                    <div className="progress mt-2">

                      <div
                        className="progress-bar bg-success"
                        style={{ width: "80%" }}
                      >
                        80%
                      </div>

                    </div>

                  </div>


                  {/* React */}
                  <div className="mb-4">

                    <div className="d-flex justify-content-between">

                      <h6>
                        React.js Bootcamp
                      </h6>

                      <strong>
                        75%
                      </strong>

                    </div>

                    <div className="progress mt-2">

                      <div
                        className="progress-bar bg-warning"
                        style={{ width: "75%" }}
                      >
                        75%
                      </div>

                    </div>

                  </div>


                  {/* Node */}
                  <div>

                    <div className="d-flex justify-content-between">

                      <h6>
                        Node.js Basics
                      </h6>

                      <strong>
                        40%
                      </strong>

                    </div>

                    <div className="progress mt-2">

                      <div
                        className="progress-bar bg-danger"
                        style={{ width: "40%" }}
                      >
                        40%
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* Weekly Progress */}
            <div className="col-xl-6">

              <div className="card">

                <div className="card-header">

                  <h4 className="card-title">
                    Weekly Progress
                  </h4>

                </div>


                <div className="card-body">


                  <div className="mb-4">

                    <small>
                      Monday
                    </small>

                    <div className="progress">

                      <div
                        className="progress-bar bg-primary"
                        style={{ width: "65%" }}
                      />

                    </div>

                  </div>


                  <div className="mb-4">

                    <small>
                      Tuesday
                    </small>

                    <div className="progress">

                      <div
                        className="progress-bar bg-success"
                        style={{ width: "90%" }}
                      />

                    </div>

                  </div>


                  <div className="mb-4">

                    <small>
                      Wednesday
                    </small>

                    <div className="progress">

                      <div
                        className="progress-bar bg-warning"
                        style={{ width: "75%" }}
                      />

                    </div>

                  </div>


                  <div className="mb-4">

                    <small>
                      Thursday
                    </small>

                    <div className="progress">

                      <div
                        className="progress-bar bg-info"
                        style={{ width: "85%" }}
                      />

                    </div>

                  </div>


                  <div>

                    <small>
                      Friday
                    </small>

                    <div className="progress">

                      <div
                        className="progress-bar bg-danger"
                        style={{ width: "95%" }}
                      />

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* =========================
              POPULAR COURSES
          ========================= */}
          <div className="row">

            <div className="col-xl-12">

              <div className="card">

                <div className="card-header d-flex justify-content-between">

                  <h4 className="card-title">
                    Popular Courses
                  </h4>

                  <Link
                    to="/course"
                    className="btn btn-sm btn-primary"
                  >
                    View All
                  </Link>

                </div>


                <div className="card-body">

                  <div className="row">


                    {/* HTML */}
                    <div className="col-md-6 mb-4">

                      <div className="border rounded p-3">

                        <h5>
                          HTML & CSS
                        </h5>

                        <p className="text-muted">
                          Build responsive websites using HTML5 & CSS3.
                        </p>

                        <span className="badge badge-primary">
                          Beginner
                        </span>

                        <div className="mt-3">
                          ⭐⭐⭐⭐⭐
                        </div>

                        <Link
                          to="/course"
                          className="btn btn-primary btn-sm mt-3"
                        >
                          Continue
                        </Link>

                      </div>

                    </div>


                    {/* JavaScript */}
                    <div className="col-md-6 mb-4">

                      <div className="border rounded p-3">

                        <h5>
                          JavaScript
                        </h5>

                        <p className="text-muted">
                          Learn modern JavaScript from scratch.
                        </p>

                        <span className="badge badge-success">
                          Intermediate
                        </span>

                        <div className="mt-3">
                          ⭐⭐⭐⭐☆
                        </div>

                        <Link
                          to="/course"
                          className="btn btn-success btn-sm mt-3"
                        >
                          Continue
                        </Link>

                      </div>

                    </div>


                    {/* React */}
                    <div className="col-md-6">

                      <div className="border rounded p-3">

                        <h5>
                          React.js
                        </h5>

                        <p className="text-muted">
                          Build powerful frontend applications.
                        </p>

                        <span className="badge badge-warning">
                          Advanced
                        </span>

                        <div className="mt-3">
                          ⭐⭐⭐⭐⭐
                        </div>

                        <Link
                          to="/course"
                          className="btn btn-warning btn-sm mt-3"
                        >
                          Continue
                        </Link>

                      </div>

                    </div>


                    {/* Node */}
                    <div className="col-md-6">

                      <div className="border rounded p-3">

                        <h5>
                          Node.js
                        </h5>

                        <p className="text-muted">
                          Learn backend development using Node.js.
                        </p>

                        <span className="badge badge-info">
                          New
                        </span>

                        <div className="mt-3">
                          ⭐⭐⭐⭐☆
                        </div>

                        <Link
                          to="/course"
                          className="btn btn-info btn-sm mt-3"
                        >
                          Start
                        </Link>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* =========================
              RECENT MCQ RESULTS
          ========================= */}
          <div className="row">

            <div className="col-lg-12">

              <div className="card">

                <div className="card-header">

                  <h4 className="card-title">
                    Recent MCQ Results
                  </h4>

                </div>


                <div className="card-body">

                  <table className="table table-hover">

                    <thead>

                      <tr>

                        <th>
                          Subject
                        </th>

                        <th>
                          Score
                        </th>

                        <th>
                          Status
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      <tr>

                        <td>
                          HTML
                        </td>

                        <td>
                          95%
                        </td>

                        <td>
                          <span className="badge badge-success">
                            Pass
                          </span>
                        </td>

                      </tr>


                      <tr>

                        <td>
                          CSS
                        </td>

                        <td>
                          90%
                        </td>

                        <td>
                          <span className="badge badge-success">
                            Pass
                          </span>
                        </td>

                      </tr>


                      <tr>

                        <td>
                          JavaScript
                        </td>

                        <td>
                          82%
                        </td>

                        <td>
                          <span className="badge badge-warning">
                            Good
                          </span>
                        </td>

                      </tr>


                      <tr>

                        <td>
                          React
                        </td>

                        <td>
                          75%
                        </td>

                        <td>
                          <span className="badge badge-primary">
                            Average
                          </span>
                        </td>

                      </tr>

                    </tbody>

                  </table>

                </div>

              </div>

            </div>

          </div>


          {/* =========================
              ACHIEVEMENTS + GOALS
          ========================= */}
          <div className="row">


            {/* Achievements */}
            <div className="col-xl-6">

              <div className="card">

                <div className="card-header d-flex justify-content-between">

                  <h4 className="card-title">
                    Achievements
                  </h4>

                  <span className="badge badge-primary">
                    Latest
                  </span>

                </div>


                <div className="card-body">


                  <div className="media mb-4">

                    <div className="mr-3">

                      <span className="material-icons fa-2x text-warning">
                        emoji_events
                      </span>

                    </div>

                    <div className="media-body">

                      <h5 className="mb-1">
                        Top Learner
                      </h5>

                      <small>
                        Completed 8 Courses Successfully
                      </small>

                    </div>

                  </div>


                  <div className="media mb-4">

                    <div className="mr-3">

                      <span className="material-icons fa-2x text-success">
                        workspace_premium
                      </span>

                    </div>

                    <div className="media-body">

                      <h5 className="mb-1">
                        5 Certificates
                      </h5>

                      <small>
                        Verified Course Certificates
                      </small>

                    </div>

                  </div>


                  <div className="media mb-4">

                    <div className="mr-3">

                      <span className="material-icons fa-2x text-primary">
                        schedule
                      </span>

                    </div>

                    <div className="media-body">

                      <h5 className="mb-1">
                        120 Learning Hours
                      </h5>

                      <small>
                        Keep Going!
                      </small>

                    </div>

                  </div>


                  <div className="media">

                    <div className="mr-3">

                      <span className="material-icons fa-2x text-danger">
                        local_fire_department
                      </span>

                    </div>

                    <div className="media-body">

                      <h5 className="mb-1">
                        15 Day Streak
                      </h5>

                      <small>
                        Daily Learning Active
                      </small>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* Learning Goals */}
            <div className="col-xl-6">

              <div className="card">

                <div className="card-header">

                  <h4 className="card-title">
                    Learning Goals
                  </h4>

                </div>


                <div className="card-body">


                  <div className="mb-4">

                    <div className="d-flex justify-content-between">

                      <span>
                        Complete React Course
                      </span>

                      <strong>
                        75%
                      </strong>

                    </div>

                    <div className="progress mt-2">

                      <div
                        className="progress-bar bg-primary"
                        style={{ width: "75%" }}
                      />

                    </div>

                  </div>


                  <div className="mb-4">

                    <div className="d-flex justify-content-between">

                      <span>
                        Finish Node.js
                      </span>

                      <strong>
                        40%
                      </strong>

                    </div>

                    <div className="progress mt-2">

                      <div
                        className="progress-bar bg-success"
                        style={{ width: "40%" }}
                      />

                    </div>

                  </div>


                  <div className="mb-4">

                    <div className="d-flex justify-content-between">

                      <span>
                        MCQ Score Target
                      </span>

                      <strong>
                        88%
                      </strong>

                    </div>

                    <div className="progress mt-2">

                      <div
                        className="progress-bar bg-warning"
                        style={{ width: "88%" }}
                      />

                    </div>

                  </div>


                  <div className="alert alert-primary mt-4">

                    <strong>
                      Today's Goal
                    </strong>

                    <p className="mb-0 mt-2">
                      Complete one lesson and attempt one MCQ test.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* =========================
              RECENT ACTIVITY
              + UPCOMING CLASSES
          ========================= */}
          <div className="row">


            {/* Recent Activity */}
            <div className="col-xl-6 col-lg-6">

              <div className="card">

                <div className="card-header border-0 pb-2">

                  <h4 className="card-title">
                    Recent Activity
                  </h4>

                </div>


                <div className="card-body">


                  <div className="activity-item d-flex align-items-center mb-4">

                    <div className="activity-icon bg-primary">

                      <span className="material-icons text-white">
                        menu_book
                      </span>

                    </div>

                    <div className="ms-3">

                      <h6 className="mb-1">
                        Completed HTML Module
                      </h6>

                      <small className="text-muted">
                        Today • 10:30 AM
                      </small>

                    </div>

                  </div>


                  <div className="activity-item d-flex align-items-center mb-4">

                    <div className="activity-icon bg-success">

                      <span className="material-icons text-white">
                        check
                      </span>

                    </div>

                    <div className="ms-3">

                      <h6 className="mb-1">
                        Passed JavaScript Quiz
                      </h6>

                      <small className="text-muted">
                        Yesterday • 5:15 PM
                      </small>

                    </div>

                  </div>


                  <div className="activity-item d-flex align-items-center mb-4">

                    <div className="activity-icon bg-warning">

                      <span className="material-icons text-white">
                        workspace_premium
                      </span>

                    </div>

                    <div className="ms-3">

                      <h6 className="mb-1">
                        Earned CSS Certificate
                      </h6>

                      <small className="text-muted">
                        2 Days Ago
                      </small>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* Upcoming Classes */}
            <div className="col-xl-6 col-lg-6">

              <div className="card">

                <div className="card-header border-0 pb-2">

                  <h4 className="card-title">
                    Upcoming Classes
                  </h4>

                </div>


                <div className="card-body">


                  <div className="class-item mb-4">

                    <h6>
                      React.js Advanced
                    </h6>

                    <small className="text-muted">
                      Tomorrow • 10:00 AM
                    </small>

                  </div>


                  <hr />


                  <div className="class-item mb-4">

                    <h6>
                      Bootstrap Workshop
                    </h6>

                    <small className="text-muted">
                      Friday • 2:00 PM
                    </small>

                  </div>


                  <hr />


                  <div className="class-item">

                    <h6>
                      Node.js Basics
                    </h6>

                    <small className="text-muted">
                      Saturday • 11:00 AM
                    </small>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>  

      {/* =========================
          FOOTER
      ========================= */}
      <div className="footer footer-outer">

        <div className="copyright">

          <p>
            Copyright © Designed & Developed by
            <a
              href="https://dexignlab.com/"
              target="_blank"
              rel="noreferrer"
            >
              {" "}DexignLab
            </a>
            {" "}2023
          </p>

        </div>

      </div>

    </div>

</Layout>

  );
}

export default Dashboard;