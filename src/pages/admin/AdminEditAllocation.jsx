import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import AdminLayout from "../../components/AdminLayout";

import "../../css/dashboard.css";
import "../../css/theme.css";
import "../../css/admin.css";

function AdminEditAllocation() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [trainers, setTrainers] = useState([]);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    trainer: "",
    course: "",
    studentBatch: "",
    startDate: "",
    endDate: "",
    status: "Active",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          allocationResponse,
          trainerResponse,
          courseResponse,
        ] = await Promise.all([
          fetch(
            `http://localhost:5000/api/allocations/${id}`
          ),

          fetch(
            "http://localhost:5000/api/trainers"
          ),

          fetch(
            "http://localhost:5000/api/courses"
          ),
        ]);

        const allocation = await allocationResponse.json();
        const trainerData = await trainerResponse.json();
        const courseData = await courseResponse.json();

        if (!allocationResponse.ok) {
          throw new Error(
            allocation.message ||
              "Failed to fetch allocation"
          );
        }

        setTrainers(trainerData);

        if (Array.isArray(courseData)) {
          setCourses(courseData);
        } else if (Array.isArray(courseData.data)) {
          setCourses(courseData.data);
        }

        setForm({
          trainer:
            allocation.trainer?._id ||
            allocation.trainer ||
            "",

          course:
            allocation.course?._id ||
            allocation.course ||
            "",

          studentBatch:
            allocation.studentBatch || "",

          startDate: allocation.startDate
            ? allocation.startDate.substring(0, 10)
            : "",

          endDate: allocation.endDate
            ? allocation.endDate.substring(0, 10)
            : "",

          status:
            allocation.status || "Active",
        });
      } catch (error) {
        console.error(error);
        alert(error.message);

        navigate("/admin/allocate");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);

      const response = await fetch(
        `http://localhost:5000/api/allocations/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update allocation"
        );
      }

      alert("Allocation updated successfully");

      navigate("/admin/allocate");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-page">
          <p>Loading allocation...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-page">

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
          <div className="col-lg-8">

            <div className="card admin-form-card">

              <div className="card-header">
                <h4 className="card-title">
                  Edit Allocation
                </h4>
              </div>

              <div className="card-body">

                <form onSubmit={handleSubmit}>

                  {/* TRAINER */}
                  <div className="admin-form-group">
                    <label>Trainer</label>

                    <select
                      name="trainer"
                      value={form.trainer}
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        Select Trainer
                      </option>

                      {trainers.map((trainer) => (
                        <option
                          key={trainer._id}
                          value={trainer._id}
                        >
                          {trainer.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* COURSE */}
                  <div className="admin-form-group">
                    <label>Course</label>

                    <select
                      name="course"
                      value={form.course}
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        Select Course
                      </option>

                      {courses.map((course) => (
                        <option
                          key={course._id}
                          value={course._id}
                        >
                          {course.name || course.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* STUDENT BATCH */}
                  <div className="admin-form-group">
                    <label>Student Batch</label>

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

                  {/* START DATE */}
                  <div className="admin-form-group">
                    <label>Start Date</label>

                    <input
                      type="date"
                      name="startDate"
                      value={form.startDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* END DATE */}
                  <div className="admin-form-group">
                    <label>End Date</label>

                    <input
                      type="date"
                      name="endDate"
                      value={form.endDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* STATUS */}
                  <div className="admin-form-group">
                    <label>Status</label>

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

                  <div className="admin-form-actions">

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={saving}
                    >
                      {saving
                        ? "Updating..."
                        : "Update"}
                    </button>

                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() =>
                        navigate("/admin/allocate")
                      }
                    >
                      Cancel
                    </button>

                  </div>

                </form>

              </div>
            </div>

          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

export default AdminEditAllocation;