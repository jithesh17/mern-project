
import { useEffect, useState } from "react";
import "../../css/attendance.css";

const API_URL = "http://localhost:5000/api/attendance";

function Attendance() {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [message, setMessage] = useState("");
  const [loadingBatches, setLoadingBatches] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch unique batch names from MongoDB-backed students API
  useEffect(() => {
    const fetchBatches = async () => {
      setLoadingBatches(true);

      try {
        const response = await fetch("http://localhost:5000/api/students");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load batches");
        }

        // Supports APIs returning an array or { students: [...] }
        const studentList = Array.isArray(data)
          ? data
          : data.students || data.data || [];

        const uniqueNames = [
          ...new Set(
            studentList
              .map((student) => student.batch)
              .filter((batch) => typeof batch === "string" && batch.trim())
              .map((batch) => batch.trim())
          ),
        ];

        setBatches(uniqueNames);
      } catch (error) {
        console.error("Fetch batches error:", error);
        setMessage("Could not load batches. Check the backend API.");
      } finally {
        setLoadingBatches(false);
      }
    };

    fetchBatches();
  }, []);

  // Load students for selected batch and load saved attendance for date
  const handleLoadStudents = async () => {
    if (!selectedBatch) {
      setMessage("Please select a batch.");
      return;
    }

    if (!selectedDate) {
      setMessage("Please select a date.");
      return;
    }

    setLoadingStudents(true);
    setMessage("");
    setStudents([]);
    setAttendance({});

    try {
      const studentUrl =
        `${API_URL}/batches/${encodeURIComponent(selectedBatch)}/students`;

      const studentResponse = await fetch(studentUrl);
      const studentData = await studentResponse.json();

      if (!studentResponse.ok) {
        throw new Error(studentData.message || "Failed to load students");
      }

      const studentList = Array.isArray(studentData)
        ? studentData
        : studentData.students || [];

      setStudents(studentList);

      // Default every student to Present
      const defaultAttendance = {};
      studentList.forEach((student) => {
        defaultAttendance[student._id] = "Present";
      });

      // Load saved attendance for the chosen batch/date
      const attendanceUrl =
        `${API_URL}?batchId=${encodeURIComponent(selectedBatch)}` +
        `&date=${encodeURIComponent(selectedDate)}`;

      const attendanceResponse = await fetch(attendanceUrl);
      const attendanceData = await attendanceResponse.json();

      if (attendanceResponse.ok) {
        const savedRecords =
          attendanceData.attendance || attendanceData.records || [];

        savedRecords.forEach((record) => {
          const studentId =
            typeof record.student === "object"
              ? record.student?._id
              : record.student;

          if (studentId && defaultAttendance[studentId] !== undefined) {
            defaultAttendance[studentId] = record.status;
          }
        });
      }

      setAttendance(defaultAttendance);

      if (studentList.length === 0) {
        setMessage("No students found in this batch.");
      }
    } catch (error) {
      console.error("Load attendance error:", error);
      setMessage(error.message || "Failed to load students.");
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((previous) => ({
      ...previous,
      [studentId]: status,
    }));
  };

  // Save attendance to MongoDB through the backend API
  const handleSaveAttendance = async () => {
    if (students.length === 0) {
      setMessage("Please load students first.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const records = students.map((student) => ({
        student: student._id,
        status: attendance[student._id] || "Present",
      }));

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          batch: selectedBatch,
          date: selectedDate,
          records,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save attendance");
      }

      setMessage(data.message || "Attendance saved successfully!");
    } catch (error) {
      console.error("Save attendance error:", error);
      setMessage(error.message || "Failed to save attendance.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="attendance-page">
      <div className="attendance-heading">
        <h2>Attendance</h2>
        <p>Mark and manage student attendance.</p>
      </div>

      <div className="attendance-filter-card">
        <div className="attendance-filter-row">
          <div className="attendance-form-group">
            <label htmlFor="batch">Select Batch</label>

            <select
              id="batch"
              value={selectedBatch}
              disabled={loadingBatches}
              onChange={(e) => {
                setSelectedBatch(e.target.value);
                setStudents([]);
                setAttendance({});
                setMessage("");
              }}
            >
              <option value="">
                {loadingBatches ? "Loading batches..." : "Select Batch"}
              </option>

              {batches.map((batch) => (
                <option key={batch} value={batch}>
                  {batch}
                </option>
              ))}
            </select>
          </div>

          <div className="attendance-form-group">
            <label htmlFor="attendanceDate">Select Date</label>

            <input
              type="date"
              id="attendanceDate"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setMessage("");
              }}
            />
          </div>

          <div className="attendance-button-wrapper">
            <button
              type="button"
              className="load-students-btn"
              onClick={handleLoadStudents}
              disabled={loadingStudents || loadingBatches}
            >
              <span className="material-icons">search</span>
              {loadingStudents ? "Loading..." : "Load Students"}
            </button>
          </div>
        </div>

        {message && (
          <div className="attendance-message" role="status">
            {message}
          </div>
        )}
      </div>

      {students.length > 0 && (
        <div className="attendance-students-card">
          <div className="attendance-card-header">
            <div>
              <h3>{selectedBatch}</h3>
              <p>{students.length} Students</p>
            </div>

            <span>{selectedDate}</span>
          </div>

          <div className="attendance-table-wrapper">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student Name</th>
                  <th>Attendance</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student, index) => {
                  const studentId = student._id;
                  const studentName =
                    student.student || student.name || "Unnamed Student";

                  const status = attendance[studentId] || "Present";

                  return (
                    <tr key={studentId}>
                      <td>{index + 1}</td>

                      <td>
                        <div className="student-name">{studentName}</div>
                      </td>

                      <td>
                        <select
                          className={`attendance-status ${status.toLowerCase()}`}
                          value={status}
                          onChange={(e) =>
                            handleAttendanceChange(
                              studentId,
                              e.target.value
                            )
                          }
                        >
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                          <option value="Late">Late</option>
                          <option value="Leave">Leave</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="attendance-save-section">
            <button
              type="button"
              className="save-attendance-btn"
              onClick={handleSaveAttendance}
              disabled={saving}
            >
              <span className="material-icons">save</span>
              {saving ? "Saving..." : "Save Attendance"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Attendance;
