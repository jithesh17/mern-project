import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import {
  initialMCQs,
  initialCourses,
  initialSubCourses,
  answerOptions,
} from "../../data/adminData";

import "../../css/dashboard.css";
import "../../css/theme.css";
import "../../css/admin.css";

const emptyForm = {
  course: initialCourses[0]?.name || "",
  subCourse: "",
  question: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  correctAnswer: "A",
};

function AdminMCQ() {

  const [mcqs, setMcqs] = useState(initialMCQs);
  const [view, setView] = useState("list"); // "list" | "form"
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const subCourseOptions = initialSubCourses.filter(
    (subCourse) => subCourse.course === form.course
  );

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function openCreateForm() {
    resetForm();
    setView("form");
  }

  function openEditForm(mcq) {
    setForm({
      course: mcq.course,
      subCourse: mcq.subCourse,
      question: mcq.question,
      optionA: mcq.optionA,
      optionB: mcq.optionB,
      optionC: mcq.optionC,
      optionD: mcq.optionD,
      correctAnswer: mcq.correctAnswer,
    });
    setEditingId(mcq.id);
    setView("form");
  }

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "course") {
      setForm((previous) => ({ ...previous, course: value, subCourse: "" }));
      return;
    }

    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function handleSave(event) {
    event.preventDefault();

    if (!form.course || !form.subCourse || !form.question.trim()) {
      return;
    }

    if (editingId) {
      setMcqs((previous) =>
        previous.map((mcq) =>
          mcq.id === editingId ? { ...mcq, ...form } : mcq
        )
      );
    } else {
      setMcqs((previous) => [
        ...previous,
        { id: Date.now(), sno: previous.length + 1, ...form },
      ]);
    }

    resetForm();
    setView("list");
  }

  function handleDelete(id) {
    setMcqs((previous) =>
      previous
        .filter((mcq) => mcq.id !== id)
        .map((mcq, index) => ({ ...mcq, sno: index + 1 }))
    );
  }

  return (
    <AdminLayout>

      <div className="admin-page">

        {view === "list" && (
          <>
            <div className="admin-page-header">

              <div>
                <h2>MCQ Test</h2>
                <p>Quiz questions per course and sub course.</p>
              </div>

              <button
                type="button"
                className="btn btn-primary admin-create-btn"
                onClick={openCreateForm}
              >
                <span className="material-icons">add</span>
                MCQ
              </button>

            </div>

            <div className="row">
              <div className="col-lg-12">

                <div className="card">

                  <div className="card-body">

                    {mcqs.length === 0 ? (
                      <div className="admin-empty">
                        <span className="material-icons">quiz</span>
                        <p>No MCQ questions yet. Click Create to add one.</p>
                      </div>
                    ) : (
                      <table className="table table-hover">

                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Course</th>
                            <th>Sub Course</th>
                            <th>Question</th>
                            <th>Actions</th>
                          </tr>
                        </thead>

                        <tbody>
                          {mcqs.map((mcq) => (
                            <tr key={mcq.id}>
                              <td>{mcq.sno}</td>
                              <td>
                                <span className="badge badge-primary">{mcq.course}</span>
                              </td>
                              <td>{mcq.subCourse}</td>
                              <td>{mcq.question}</td>
                              <td>
                                <div className="admin-table-actions">
                                  <button
                                    type="button"
                                    className="admin-icon-btn"
                                    onClick={() => openEditForm(mcq)}
                                    aria-label="Edit question"
                                  >
                                    <span className="material-icons">edit</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="admin-icon-btn"
                                    onClick={() => handleDelete(mcq.id)}
                                    aria-label="Delete question"
                                  >
                                    <span className="material-icons">delete</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>

                      </table>
                    )}

                  </div>

                </div>

              </div>
            </div>
          </>
        )}


        {view === "form" && (
          <>
            <button
              type="button"
              className="admin-back-link"
              onClick={() => { resetForm(); setView("list"); }}
            >
              <span className="material-icons">arrow_back</span>
              Back to MCQ Test
            </button>

            <div className="row">
              <div className="col-lg-12">

                <div className="card admin-form-card">

                  <div className="card-header">
                    <h4 className="card-title">
                      {editingId ? "Edit Question" : "Create Question"}
                    </h4>
                  </div>

                  <div className="card-body">

                    <form onSubmit={handleSave}>

                      <div className="admin-form-group">
                        <label htmlFor="mcq-course">Course</label>
                        <select
                          id="mcq-course"
                          name="course"
                          value={form.course}
                          onChange={handleChange}
                        >
                          {initialCourses.map((course) => (
                            <option key={course.id} value={course.name}>
                              {course.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="admin-form-group">
                        <label htmlFor="mcq-subcourse">Sub Course</label>
                        <select
                          id="mcq-subcourse"
                          name="subCourse"
                          value={form.subCourse}
                          onChange={handleChange}
                        >
                          <option value="">Select Sub Course</option>
                          {subCourseOptions.map((subCourse) => (
                            <option key={subCourse.id} value={subCourse.sub}>
                              {subCourse.sub}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="admin-form-group">
                        <label htmlFor="mcq-question">MCQ Question</label>
                        <textarea
                          id="mcq-question"
                          name="question"
                          rows="3"
                          placeholder="Type the question here"
                          value={form.question}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Options</label>

                        <div className="admin-mcq-option">
                          <span className="admin-mcq-option-label">A</span>
                          <input
                            name="optionA"
                            type="text"
                            placeholder="Option 1"
                            value={form.optionA}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="admin-mcq-option">
                          <span className="admin-mcq-option-label">B</span>
                          <input
                            name="optionB"
                            type="text"
                            placeholder="Option 2"
                            value={form.optionB}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="admin-mcq-option">
                          <span className="admin-mcq-option-label">C</span>
                          <input
                            name="optionC"
                            type="text"
                            placeholder="Option 3"
                            value={form.optionC}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="admin-mcq-option">
                          <span className="admin-mcq-option-label">D</span>
                          <input
                            name="optionD"
                            type="text"
                            placeholder="Option 4"
                            value={form.optionD}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="admin-form-group">
                        <label htmlFor="mcq-correct">Correct Answer</label>
                        <select
                          id="mcq-correct"
                          name="correctAnswer"
                          value={form.correctAnswer}
                          onChange={handleChange}
                        >
                          {answerOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="admin-form-actions">
                        <button type="submit" className="btn btn-primary">
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-light"
                          onClick={() => { resetForm(); setView("list"); }}
                        >
                          Cancel
                        </button>
                      </div>

                    </form>

                  </div>

                </div>

              </div>
            </div>
          </>
        )}

      </div>

    </AdminLayout>
  );
}

export default AdminMCQ;
