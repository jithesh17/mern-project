import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useState } from "react";
import CourseNotesViewer from "../components/CourseNotesViewer";
import htmlImage from "../assets/images/coures/Hello.jpeg";
import cssImage from "../assets/images/coures/newcss.jpeg";
import jsImage from "../assets/images/coures/js.jpeg";
import mernImage from "../assets/images/coures/MERN.jpeg";
import nodeImage from "../assets/images/coures/node.jpeg";
import expressImage from "../assets/images/coures/express.jpeg";
import mongoImage from "../assets/images/coures/mongo.jpeg";
import react from "../assets/images/coures/reactt.jpeg";

import "../css/course.css";
import "../css/theme.css";

function Course() {
  const [notesOpen, setNotesOpen] = useState(false);

  const courses = [
    {
      name: "HTML",
      image: htmlImage,
      description: "Learn the fundamentals of HTML and build web pages.",
      level: "Beginner",
      questions: "20 MCQ Questions",
      time: "15 Minutes",
      link: "/course/html",
      locked: false,
    },

    {
      name: "CSS",
      image: cssImage,
      description: "Learn styling, layouts and responsive web design.",
      level: "Beginner",
      questions: "20 MCQ Questions",
      time: "15 Minutes",
      link: "/course/css",
      locked: true,
    },

    {
      name: "JavaScript",
      image: jsImage,
      description: "Learn JavaScript and build interactive web applications.",
      level: "Intermediate",
      questions: "20 MCQ Questions",
      time: "20 Minutes",
      link: "/course/javascript",
      locked: true,
    },

    {
      name: "React",
      image: react,
      description: "Build modern single-page applications using React.",
      level: "Intermediate",
      questions: "20 MCQ Questions",
      time: "20 Minutes",
      link: "/course/react",
      locked: true,
    },

    {
      name: "Node.js",
      image: nodeImage,
      description: "Learn backend development using Node.js.",
      level: "Intermediate",
      questions: "20 MCQ Questions",
      time: "20 Minutes",
      link: "/course/node",
      locked: true,
    },

    {
      name: "Express.js",
      image: expressImage,
      description: "Build backend APIs using Express.js.",
      level: "Intermediate",
      questions: "20 MCQ Questions",
      time: "20 Minutes",
      link: "/course/express",
      locked: true,
    },

    {
      name: "MongoDB",
      image: mongoImage,
      description: "Learn MongoDB and work with application databases.",
      level: "Intermediate",
      questions: "20 MCQ Questions",
      time: "20 Minutes",
      link: "/course/mongodb",
      locked: true,
    },
  ];

  return (
    <Layout>
      <div className="course-page">
        {/* ============================= */}
        {/* MERN STACK BANNER */}
        {/* ============================= */}

        <div
          className="mern-banner"
          style={{ backgroundImage: `url(${mernImage})` }}
        ></div>

        {/* ============================= */}
        {/* LEARNING PATH */}
        {/* ============================= */}

        <div className="course-section">
          <div className="course-section-header">
            <p className="course-learning-text">
              Complete each course to unlock the next course.
            </p>
          </div>

          {/* ============================= */}
          {/* SUB COURSES */}
          {/* ============================= */}

          <div className="course-grid">
            {courses.map((course) => (
              <div
                className={`course-card ${
                  course.locked ? "course-locked" : "course-active"
                }`}
                key={course.name}
              >
                {/* Lock */}

                {course.locked && <div className="course-lock">🔒</div>}

                {/* Course Image */}

                <img
                  src={course.image}
                  alt={course.name}
                  className="course-card-image"
                />

                {/* Course Content */}

                <div className="course-card-content">
                  <h3 className="course-card-title">{course.name}</h3>

                  <p className="course-card-description">
                    {course.description}
                  </p>

                  {/* Course Details */}

                  <div className="course-card-details">
                    <p className="course-card-detail">📘 {course.level}</p>

                    <p className="course-card-detail">📝 {course.questions}</p>

                    <p className="course-card-detail">⏱ {course.time}</p>
                  </div>

                  {/* Button */}

                  {!course.locked ? (
                    <button
                      type="button"
                      className="course-card-button"
                      onClick={() => setNotesOpen(true)}
                    >
                      Start Learning →
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
            ))}
          </div>
        </div>
      </div>
     {notesOpen && (
    <CourseNotesViewer
        course="html"
        onClose={() => setNotesOpen(false)}
    />
)}

    </Layout>
  );
}

export default Course;
