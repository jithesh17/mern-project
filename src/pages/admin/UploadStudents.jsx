import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";


import "../../css/theme.css";
import "../../css/admin.css";

const API_URL = "http://localhost:5000/api";

function UploadStudents() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);

  // -----------------------------------------
  // File selection
  // -----------------------------------------
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    setResult(null);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const fileName = selectedFile.name.toLowerCase();

    if (!fileName.endsWith(".xlsx") && !fileName.endsWith(".xls")) {
      alert("Please select an Excel file (.xlsx or .xls)");
      event.target.value = "";
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  // -----------------------------------------
  // Upload Excel
  // -----------------------------------------
  const handleUpload = async () => {
    if (!file) {
      alert("Please select an Excel file first");
      return;
    }

    try {
      setUploading(true);
      setResult(null);

      const formData = new FormData();

      // IMPORTANT:
      // This name must match uploadExcel.single("file")
      formData.append("file", file);

      const response = await fetch(`${API_URL}/students/upload-excel`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log("Excel upload response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload Excel file");
      }

      setResult(data);

      // Clear selected file
      setFile(null);

      // Clear file input
      document.getElementById("studentExcelFile").value = "";
    } catch (error) {
      console.error("Excel upload error:", error);

      setResult({
        success: false,
        message: error.message,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        {/* -----------------------------------------
            PAGE HEADER
        ----------------------------------------- */}
        <div className="admin-page-header">
          <div>
            <h2>Upload Students</h2>
            <p>Upload multiple students using an Excel file.</p>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/admin/student")}
          >
            <span className="material-icons">arrow_back</span>
            Back to Students
          </button>
        </div>

        {/* -----------------------------------------
            UPLOAD CARD
        ----------------------------------------- */}
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h4 className="mb-3">Select Excel File</h4>

                <p className="text-muted">Supported files: .xlsx and .xls</p>

                {/* File input */}
                <div className="form-group mb-4">
                  <label htmlFor="studentExcelFile">Excel File</label>

                  <input
                    id="studentExcelFile"
                    type="file"
                    className="form-control"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                  />
                </div>

                {/* Selected file */}
                {file && (
                  <div className="alert alert-info">
                    <strong>Selected file:</strong> {file.name}
                  </div>
                )}

                {/* Upload button */}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpload}
                  disabled={!file || uploading}
                >
                  <span className="material-icons">upload_file</span>

                  {uploading ? "Uploading..." : "click to upload"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* -----------------------------------------
            UPLOAD RESULT
        ----------------------------------------- */}
        {result && (
          <div className="row mt-4">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="mb-3">Upload Result</h4>

                  {result.success === false ? (
                    <div className="alert alert-danger">{result.message}</div>
                  ) : (
                    <>
                      <div className="alert alert-success">
                        {result.message}
                      </div>

                      <div className="row">
                        {/* Total */}
                        <div className="col-md-4">
                          <div className="card bg-light">
                            <div className="card-body">
                              <h6>Total Rows</h6>
                              <h3>{result.totalRows ?? 0}</h3>
                            </div>
                          </div>
                        </div>

                        {/* Inserted */}
                        <div className="col-md-4">
                          <div className="card bg-light">
                            <div className="card-body">
                              <h6>Inserted</h6>
                              <h3>{result.inserted ?? 0}</h3>
                            </div>
                          </div>
                        </div>

                        {/* Failed */}
                        <div className="col-md-4">
                          <div className="card bg-light">
                            <div className="card-body">
                              <h6>Failed</h6>
                              <h3>{result.failed ?? 0}</h3>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* -----------------------------------------
                          SUCCESSFUL STUDENTS
                      ----------------------------------------- */}
                      {result.insertedStudents &&
                        result.insertedStudents.length > 0 && (
                          <div className="mt-4">
                            <h5>Successfully Added Students</h5>

                            <table className="table table-hover">
                              <thead>
                                <tr>
                                  <th>Excel Row</th>
                                  <th>Student</th>
                                </tr>
                              </thead>

                              <tbody>
                                {result.insertedStudents.map(
                                  (student, index) => (
                                    <tr key={index}>
                                      <td>{student.row}</td>
                                      <td>{student.student}</td>
                                    </tr>
                                  ),
                                )}
                              </tbody>
                            </table>
                          </div>
                        )}

                      {/* -----------------------------------------
                          FAILED STUDENTS
                      ----------------------------------------- */}
                      {result.failedStudents &&
                        result.failedStudents.length > 0 && (
                          <div className="mt-4">
                            <h5>Failed Rows</h5>

                            <table className="table table-hover">
                              <thead>
                                <tr>
                                  <th>Excel Row</th>
                                  <th>Student</th>
                                  <th>Reason</th>
                                </tr>
                              </thead>

                              <tbody>
                                {result.failedStudents.map((student, index) => (
                                  <tr key={index}>
                                    <td>{student.row}</td>

                                    <td>{student.student}</td>

                                    <td>{student.reason}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                      {/* Go back button */}
                      <div className="mt-4">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => navigate("/admin/student")}
                        >
                          <span className="material-icons">groups</span>
                          View Students
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default UploadStudents;
