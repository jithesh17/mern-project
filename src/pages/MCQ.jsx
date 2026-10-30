import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import "../css/mcq.css";
import "../css/theme.css";

const API_URL = "http://localhost:5000";

function MCQ() {
  // Read the subcourse ID from /mcq/:subCourseId
  const { subCourseId } = useParams();
  const location = useLocation();

  const course = location.state?.course || "Subcourse";

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  // Fetch questions for the selected subcourse
  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        setError("");
        setQuestions([]);
        setAnswers({});
        setCurrentQuestion(0);

        if (!subCourseId) {
          throw new Error("Subcourse ID is missing from the URL.");
        }

        const response = await fetch(
          `${API_URL}/api/mcqs/subcourse/${subCourseId}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load quiz questions.");
        }

        if (!Array.isArray(data) || data.length === 0) {
          setQuestions([]);
          return;
        }

        setQuestions(data);
      } catch (err) {
        console.error("MCQ loading error:", err);
        setError(err.message || "Unable to load quiz.");
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [subCourseId]);

  const q = questions[currentQuestion];

  // Save the selected answer for each question
  const handleAnswerChange = (questionId, answerKey) => {
    setAnswers((previous) => ({
      ...previous,
      [questionId]: answerKey,
    }));
  };

  // Submit answers to the backend for scoring
  const handleSubmit = async () => {
    const unanswered = questions.some((question) => !answers[question._id]);

    if (unanswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const token = sessionStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in again to submit your quiz.");
      }

      const response = await fetch(`${API_URL}/api/mcqs/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subCourseId, answers }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to submit quiz.");
      }

      setResult(data);
    } catch (err) {
      console.error("Quiz submission error:", err);
      setError(err.message || "Unable to submit quiz.");
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <Layout>
        <div className="mcq-page">
          <p>Loading quiz questions...</p>
        </div>
      </Layout>
    );
  }

  // Error state
  if (error) {
    return (
      <Layout>
        <div className="mcq-page">
          <p>{error}</p>
        </div>
      </Layout>
    );
  }

  // No questions available
  if (questions.length === 0) {
    return (
      <Layout>
        <div className="mcq-page">
          <div className="mcq-header">
            <h2>{course} Quiz</h2>
            <p>No MCQ questions have been added for this subcourse yet.</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Quiz result screen
  if (result) {
    return (
      <Layout>
        <div className="mcq-page">
          <div className="mcq-header">
            <h2>{course} Quiz Result</h2>
            <p>You have completed the quiz.</p>
          </div>

          <div className="mcq-card">
            <h3>
              Score: {result.correctAnswers} / {result.totalQuestions}
            </h3>

            <h2>{result.percentage}%</h2>

            <h4>
              {result.passed
                ? "Congratulations! You passed."
                : "You need at least 70% to pass."}
            </h4>

            {result.passed && <p>You can proceed to the next learning step.</p>}

            <button
              type="button"
              className="mcq-submit-btn"
              onClick={() => {
                setResult(null);
                setAnswers({});
                setCurrentQuestion(0);
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mcq-page">
        <div className="mcq-header">
          <h2>{course} Quiz</h2>
          <p>Read every question carefully before selecting your answer.</p>
        </div>

        <div className="mcq-card">
          <div className="mcq-top-row">
            <h5>
              Question {currentQuestion + 1} of {questions.length}
            </h5>

            <span className="mcq-timer">
              {Object.keys(answers).length} answered
            </span>
          </div>

          <div className="mcq-progress">
            <div
              className="mcq-progress-bar"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          <div className="mcq-question">
            <h4>{q.question}</h4>
          </div>

          <div className="mcq-options">
            {Object.entries(q.options).map(([key, option]) => (
              <div
                key={key}
                className={`mcq-option ${
                  answers[q._id] === key ? "mcq-option-selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name={`answer-${q._id}`}
                  id={`option-${q._id}-${key}`}
                  checked={answers[q._id] === key}
                  onChange={() => handleAnswerChange(q._id, key)}
                />

                <label htmlFor={`option-${q._id}-${key}`}>
                  {key}. {option}
                </label>
              </div>
            ))}
          </div>

          <div className="mcq-navigation">
            <button
              type="button"
              className="mcq-prev-btn"
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion((previous) => previous - 1)}
            >
              ← Previous
            </button>

            <button
              type="button"
              className="mcq-next-btn"
              disabled={currentQuestion === questions.length - 1}
              onClick={() => setCurrentQuestion((previous) => previous + 1)}
            >
              Next →
            </button>
          </div>

          <div className="mcq-submit">
            <button
              type="button"
              className="mcq-submit-btn"
              disabled={submitting}
              onClick={handleSubmit}
            >
              {submitting ? "Submitting..." : "Submit Quiz"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MCQ;
