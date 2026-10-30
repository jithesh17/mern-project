import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../css/dashboard.css";
import "../../css/theme.css";
import "../../css/trainer-profile.css";
import "../../css/trainer.css";


const TrainerProfile = () => {
  const navigate = useNavigate();

  const [trainer, setTrainer] = useState(null);
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTrainerData = async () => {
      try {
        setLoading(true);
        setError("");

        // =====================================
        // GET LOGGED-IN TRAINER FROM LOCALSTORAGE
        // =====================================
        
const storedTrainerData =
  localStorage.getItem("currentTrainer") ||
  sessionStorage.getItem("currentTrainer");
        
const storedTrainer = storedTrainerData
  ? JSON.parse(storedTrainerData)
  : null;

if (!storedTrainer || !storedTrainer._id) {
  setError("Trainer login session not found. Please login again.");
  setLoading(false);
  return;
}


        // =====================================
        // 1. FETCH TRAINER DETAILS
        // =====================================
        const trainerResponse = await fetch(
          `http://localhost:5000/api/trainers/${storedTrainer._id}`
        );

        const trainerData = await trainerResponse.json();

        if (!trainerResponse.ok) {
          throw new Error(
            trainerData.message ||
              "Failed to fetch trainer details"
          );
        }

        // Some APIs return { trainer: {...} }
        // Some return {...}
        const trainerDetails =
          trainerData.trainer || trainerData;

        setTrainer(trainerDetails);

        // =====================================
        // 2. FETCH ALL ALLOCATIONS
        // =====================================
        const allocationResponse = await  fetch(
          "http://localhost:5000/api/allocations"
        );

        const allocationData =
          await allocationResponse.json();

        if (!allocationResponse.ok) {
          throw new Error(
            allocationData.message ||
              "Failed to fetch allocations"
          );
        }

        const allAllocations = Array.isArray(
          allocationData
        )
          ? allocationData
          : allocationData.data || [];

        // =====================================
        // 3. FILTER ALLOCATIONS FOR THIS TRAINER
        // =====================================
        const trainerAllocations =
          allAllocations.filter((allocation) => {
            const allocationTrainerId =
              allocation.trainer?._id ||
              allocation.trainer;

            return (
              String(allocationTrainerId) ===
              String(storedTrainer._id)
            );
          });

        setBatches(trainerAllocations);

        // =====================================
        // 4. FETCH ALL STUDENTS
        // =====================================
        const studentResponse = await fetch(
          "http://localhost:5000/api/students"
        );

        const studentData =
          await studentResponse.json();

        if (!studentResponse.ok) {
          throw new Error(
            studentData.message ||
              "Failed to fetch students"
          );
        }

        const allStudents = Array.isArray(
          studentData
        )
          ? studentData
          : studentData.data || [];

        // =====================================
        // 5. GET TRAINER BATCH NAMES
        // =====================================
        const trainerBatchNames =
          trainerAllocations
            .map(
              (allocation) =>
                allocation.studentBatch
            )
            .filter(Boolean);

        // =====================================
        // 6. FILTER STUDENTS BY TRAINER BATCH
        // =====================================
        const trainerStudents =
          allStudents.filter((student) =>
            trainerBatchNames.includes(
              student.batch
            )
          );

        setStudents(trainerStudents);

        // Debugging
        console.log(
          "Logged-in trainer:",
          trainerDetails
        );

        console.log(
          "Trainer allocations:",
          trainerAllocations
        );

        console.log(
          "Trainer batches:",
          trainerBatchNames
        );

        console.log(
          "Trainer students:",
          trainerStudents
        );
      } catch (err) {
        console.error(
          "Trainer profile error:",
          err
        );

        setError(
          err.message ||
            "Failed to load trainer profile"
        );
      } finally {
        setLoading(false);
      }
    };

    loadTrainerData();
  }, []);

  // =====================================
  // LOGOUT
  // =====================================
  const handleLogout = () => {
    localStorage.removeItem("trainerLoggedIn");
    localStorage.removeItem("currentTrainer");
     sessionStorage.removeItem("trainerLoggedIn");
     sessionStorage.removeItem("currentTrainer");

    navigate("/trainer/login");
  };

  // =====================================
  // LOADING
  // =====================================
  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-container">
          <div className="profile-loading">
            <h3>Loading Trainer Profile...</h3>
          </div>
        </div>
      </div>
    );
  }

  // =====================================
  // ERROR
  // =====================================
  if (error) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-container">
          <div className="profile-error">
            <h3>Something went wrong</h3>

            <p>{error}</p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =====================================
  // TRAINER DATA
  // =====================================
  const trainerName =
    trainer?.name || "Trainer";

  const trainerEmail =
    trainer?.email || "-";

  const trainerCourse =
    trainer?.course || "-";

  const trainerId =
    trainer?._id || "-";

  const totalStudents =
    students.length;

  const totalBatches =
    batches.length;

  // =====================================
  // JOINED DATE
  // =====================================
  const joinedDate = trainer?.createdAt
    ? new Date(
        trainer.createdAt
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        {/* ================================= */}
        {/* PAGE HEADER */}
        {/* ================================= */}

        <div className="page-header">
          <div>
            <h2>Trainer Profile</h2>

            <p>
              View your trainer information,
              assigned batches and students.
            </p>
          </div>

          <button
            type="button"
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* ================================= */}
        {/* PROFILE TOP SECTION */}
        {/* ================================= */}

        <div className="trainer-profile-top">

          {/* PROFILE CARD */}

          <div className="trainer-profile-card">

            <div className="trainer-avatar-large">
              {trainerName
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="trainer-profile-main">

              <h2>{trainerName}</h2>

              <p className="trainer-designation">
                {trainer?.designation ||
                  "Trainer"}
              </p>

              <p className="trainer-email">
                {trainerEmail}
              </p>

            </div>

          </div>

          {/* STATS */}

          <div className="trainer-stats">

            <div className="trainer-stat-card">
              <span>Total Batches</span>
              <strong>
                {totalBatches}
              </strong>
            </div>

            <div className="trainer-stat-card">
              <span>Total Students</span>
              <strong>
                {totalStudents}
              </strong>
            </div>

          </div>

        </div>

        {/* ================================= */}
        {/* TRAINER INFORMATION */}
        {/* ================================= */}

        <div className="profile-section">

          <div className="section-title">
            <h3>Trainer Information</h3>
          </div>

          <div className="trainer-info-grid">

            <div className="trainer-info-item">
              <span>Trainer Name</span>
              <strong>
                {trainerName}
              </strong>
            </div>

            <div className="trainer-info-item">
              <span>Email</span>
              <strong>
                {trainerEmail}
              </strong>
            </div>

            <div className="trainer-info-item">
              <span>Course</span>
              <strong>
                {trainerCourse}
              </strong>
            </div>

            <div className="trainer-info-item">
              <span>Trainer ID</span>
              <strong>
                {trainerId}
              </strong>
            </div>

            <div className="trainer-info-item">
              <span>Designation</span>
              <strong>
                {trainer?.designation ||
                  "Trainer"}
              </strong>
            </div>

            <div className="trainer-info-item">
              <span>Joined Date</span>
              <strong>
                {joinedDate}
              </strong>
            </div>

            {trainer?.phone && (
              <div className="trainer-info-item">
                <span>Phone</span>
                <strong>
                  {trainer.phone}
                </strong>
              </div>
            )}

            {trainer?.specialization && (
              <div className="trainer-info-item">
                <span>Specialization</span>
                <strong>
                  {trainer.specialization}
                </strong>
              </div>
            )}

          </div>

        </div>

        {/* ================================= */}
        {/* ASSIGNED BATCHES */}
        {/* ================================= */}

        <div className="profile-section">

          <div className="section-title">
            <h3>Assigned Batches</h3>

            <span>
              {totalBatches} Batches
            </span>
          </div>

          {batches.length === 0 ? (
            <div className="empty-state">
              <h4>No Batches Assigned</h4>

              <p>
                You currently don't have
                any assigned batches.
              </p>
            </div>
          ) : (
            <div className="assigned-batches-grid">

              {batches.map((batch) => (
                <div
                  className="assigned-batch-card"
                  key={batch._id}
                >

                  <div className="batch-card-header">

                    <div>
                      <span className="batch-label">
                        Batch
                      </span>

                      <h4>
                        {batch.studentBatch ||
                          "-"}
                      </h4>
                    </div>

                    <span
                      className={`batch-status ${
                        (
                          batch.status ||
                          "Active"
                        ).toLowerCase()
                      }`}
                    >
                      {batch.status ||
                        "Active"}
                    </span>

                  </div>

                  <div className="batch-card-details">

                    <div>
                      <span>Course</span>

                      <strong>
                        {batch.course?.course ||
                          batch.course?.name ||
                          "-"}
                      </strong>
                    </div>

                    <div>
                      <span>Start Date</span>

                      <strong>
                        {batch.startDate
                          ? new Date(
                              batch.startDate
                            ).toLocaleDateString(
                              "en-IN"
                            )
                          : "-"}
                      </strong>
                    </div>

                    <div>
                      <span>End Date</span>

                      <strong>
                        {batch.endDate
                          ? new Date(
                              batch.endDate
                            ).toLocaleDateString(
                              "en-IN"
                            )
                          : "-"}
                      </strong>
                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

        {/* ================================= */}
        {/* STUDENT LIST */}
        {/* ================================= */}

        <div className="profile-section">

          <div className="section-title">

            <div>
              <h3>My Students</h3>

              <p>
                Students from your assigned
                batches.
              </p>
            </div>

            <span>
              {totalStudents} Students
            </span>

          </div>

          {batches.length === 0 ? (
            <div className="empty-state">

              <h4>No Batches Assigned</h4>

              <p>
                Students will appear here
                after a batch is assigned.
              </p>

            </div>
          ) : (
            <div className="batch-students-grid">

              {batches.map((batch) => {

                // Students belonging to
                // this particular batch
                const batchStudents =
                  students.filter(
                    (student) =>
                      student.batch ===
                      batch.studentBatch
                  );

                return (
                  <div
                    className="batch-student-group"
                    key={batch._id}
                  >

                    {/* BATCH HEADER */}

                    <div className="batch-student-group-header">

                      <div>
                        <h5>
                          {batch.studentBatch ||
                            "-"}
                        </h5>

                        <span>
                          {batch.course?.course ||
                            batch.course?.name ||
                            "-"}
                        </span>
                      </div>

                      <strong>
                        {
                          batchStudents.length
                        }{" "}
                        Students
                      </strong>

                    </div>

                    {/* STUDENTS */}

                    <div className="student-mini-list">

                      {batchStudents.length ===
                      0 ? (
                        <div className="student-mini-item">

                          <div className="student-mini-avatar">
                            -
                          </div>

                          <span>
                            No students found
                            in this batch.
                          </span>

                        </div>
                      ) : (
                        batchStudents.map(
                          (student) => (
                            <div
                              className="student-mini-item"
                              key={
                                student._id
                              }
                            >

                              <div className="student-mini-avatar">
                                {student.student
                                  ?.charAt(
                                    0
                                  )
                                  .toUpperCase() ||
                                  "S"}
                              </div>

                              <div className="student-mini-info">

                                <strong>
                                  {
                                    student.student
                                  }
                                </strong>

                                <span>
                                  {
                                    student.batch
                                  }
                                </span>

                              </div>

                            </div>
                          )
                        )
                      )}

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default TrainerProfile;