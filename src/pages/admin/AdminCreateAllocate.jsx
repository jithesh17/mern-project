import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/AdminLayout";

import "../../css/dashboard.css";
import "../../css/theme.css";
import "../../css/admin.css";

function AdminCreateAllocation() {
  const navigate = useNavigate();

  const [trainers, setTrainers] = useState([]);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

  const [form, setForm] = useState({
    trainer: "",
    course: "",
    studentBatch: "",
    startDate: "",
    endDate: "",
    status: "Active",
  });


  // FETCH TRAINERS + COURSES
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trainerResponse, courseResponse] =
          await Promise.all([
            fetch(
              "http://localhost:5000/api/trainers"
            ),
            fetch(
              "http://localhost:5000/api/courses"
            ),
          ]);

        const trainerData =
          await trainerResponse.json();

        const courseData =
          await courseResponse.json();

        if (!trainerResponse.ok) {
          throw new Error(
            trainerData.message ||
              "Failed to fetch trainers"
          );
        }

        if (!courseResponse.ok) {
          throw new Error(
            courseData.message ||
              "Failed to fetch courses"
          );
        }

        setTrainers(trainerData);

        setCourses(courseData);
      } catch (error) {
        console.error(error);
        alert(error.message);
      } finally {
        setFetchingData(false);
      }
    };

    fetchData();
  }, []);


  // HANDLE CHANGE
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  // SUBMIT
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !form.trainer ||
      !form.course ||
      !form.studentBatch ||
      !form.startDate ||
      !form.endDate
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/allocations",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            trainer: form.trainer,
            course: form.course,
            studentBatch: form.studentBatch,
            startDate: form.startDate,
            endDate: form.endDate,
            status: form.status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to create allocation"
        );
      }

      alert("Allocation created successfully");

      navigate("/admin/allocate");

    } catch (error) {
      console.error(error);
      alert(error.message);

    } finally {
      setLoading(false);
    }
  };


  return (
    <AdminLayout>

      <div className="admin-page">

        {/* BACK */}
        <button
          type="button"
          className="admin-back-link"
          onClick={() =>
            navigate("/admin/allocate")
          }
        >
          <span className="material-icons">
            arrow_back
          </span>

          Back to Allocations
        </button>


        <div className="row">

          <div className="col-lg-12">

            <div className="card admin-form-card">

              <div className="card-header">

                <h4 className="card-title">
                  Create Allocation
                </h4>

              </div>


              <div className="card-body">

                {fetchingData ? (

                  <p>
                    Loading trainers and courses...
                  </p>

                ) : (

                  <form onSubmit={handleSubmit}>

                    {/* TRAINER + COURSE */}
                    <div
                      className="row"
                    >

                      {/* TRAINER */}
                      <div className="col-lg-6">

                        <div className="admin-form-group">

                          <label>
                            Trainer
                          </label>

                          <select
                            name="trainer"
                            value={form.trainer}
                            onChange={handleChange}
                            required
                          >

                            <option value="">
                              Select Trainer
                            </option>

                            {trainers.map(
                              (trainer) => (

                                <option
                                  key={trainer._id}
                                  value={trainer._id}
                                >
                                  {trainer.name}
                                </option>

                              )
                            )}

                          </select>

                        </div>

                      </div>


                      {/* COURSE */}
                      <div className="col-lg-6">

                        <div className="admin-form-group">

                          <label>
                            Course
                          </label>

                          <select
                            name="course"
                            value={form.course}
                            onChange={handleChange}
                            required
                          >

                            <option value="">
                              Select Course
                            </option>

                            {courses.map(
                              (course) => (

                                <option
                                  key={course._id}
                                  value={course._id}
                                >
                                  {course.course}
                                </option>

                              )
                            )}

                          </select>

                        </div>

                      </div>

                    </div>


                    {/* BATCH */}
                    <div className="admin-form-group">

                      <label>
                        Student Batch
                      </label>

                      <select
                        name="studentBatch"
                        value={form.studentBatch}
                        onChange={handleChange}
                        required
                      >

                        <option value="">
                          Select Student Batch
                        </option>

                        <option value="Batch A">
                          Batch A
                        </option>

                        <option value="Batch B">
                          Batch B
                        </option>

                        <option value="Batch C">
                          Batch C
                        </option>

                      </select>

                    </div>


                    {/* DATES */}
                    <div className="row">

                      <div className="col-lg-6">

                        <div className="admin-form-group">

                          <label>
                            Start Date
                          </label>

                          <input
                            type="date"
                            name="startDate"
                            value={form.startDate}
                            onChange={handleChange}
                            required
                          />

                        </div>

                      </div>


                      <div className="col-lg-6">

                        <div className="admin-form-group">

                          <label>
                            End Date
                          </label>

                          <input
                            type="date"
                            name="endDate"
                            value={form.endDate}
                            onChange={handleChange}
                            required
                          />

                        </div>

                      </div>

                    </div>


                    {/* STATUS */}
                    <div className="admin-form-group">

                      <label>
                        Status
                      </label>

                      <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                      >

                        <option value="Active">
                          Active
                        </option>

                        <option value="Completed">
                          Completed
                        </option>

                        <option value="Dropped">
                          Dropped
                        </option>

                      </select>

                    </div>


                    {/* BUTTONS */}
                    <div className="admin-form-actions">

                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading
                          ? "Saving..."
                          : "Save"}
                      </button>


                      <button
                        type="button"
                        className="btn btn-light"
                        onClick={() =>
                          navigate(
                            "/admin/allocate"
                          )
                        }
                      >
                        Cancel
                      </button>

                    </div>

                  </form>

                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}

export default AdminCreateAllocation;