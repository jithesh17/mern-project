import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../css/UploadMCQ.css";
import AdminLayout from "../../components/AdminLayout";


const UploadMCQ = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // ==========================================
  // SELECT FILE
  // ==========================================

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setError("");
    setResult(null);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const allowedExtensions = [".xlsx", ".xls"];

    const fileName = selectedFile.name.toLowerCase();

    const isExcelFile = allowedExtensions.some((extension) =>
      fileName.endsWith(extension)
    );

    if (!isExcelFile) {
      setError("Please select an Excel file (.xlsx or .xls)");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  // ==========================================
  // UPLOAD EXCEL
  // ==========================================

  const handleUpload = async (e) => {
    e.preventDefault();

    setError("");
    setResult(null);

    if (!file) {
      setError("Please select an Excel file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(
        "http://localhost:5000/api/mcqs/upload-excel",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Excel upload failed"
        );
      }

      setResult(data);

      setFile(null);

      document.getElementById("excelFile").value = "";
    } catch (error) {
      console.error("Excel upload error:", error);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

return (
    <AdminLayout>
  <div className="upload-mcq-page">

    {/* PAGE HEADER */}

    <div className="upload-mcq-header">

      <div className="upload-mcq-title">
        <h2>Upload MCQs</h2>

        <p>
          Upload multiple MCQ questions using an Excel file
        </p>
      </div>

      <button
        className="upload-back-btn"
        onClick={() => navigate("/admin/mcq")}
      >
        ← Back
      </button>

    </div>


    {/* UPLOAD CARD */}

    <div className="upload-mcq-card">

      <form onSubmit={handleUpload}>

        <label
          htmlFor="excelFile"
          className="upload-file-label"
        >
          Select Excel File
        </label>

        <input
          id="excelFile"
          type="file"
          className="upload-file-input"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
        />

        <span className="upload-supported">
          Supported formats: .xlsx, .xls
        </span>


        {/* SELECTED FILE */}

        {file && (
          <div className="upload-selected-file">
            <strong>Selected file:</strong>{" "}
            {file.name}
          </div>
        )}


        {/* ERROR */}

        {error && (
          <div className="upload-error">
            {error}
          </div>
        )}


        {/* UPLOAD */}

        <button
          type="submit"
          className="upload-submit-btn"
          disabled={loading || !file}
        >
          {loading ? "Uploading..." : "Upload Excel"}
        </button>

      </form>

    </div>


    {/* RESULT */}

    {result && (

      <div className="upload-result-card">

        <h3>Upload Result</h3>

        <div className="upload-result-grid">

          <div className="upload-result-box total">
            <span>Total Rows</span>
            <strong>
              {result.totalRows}
            </strong>
          </div>

          <div className="upload-result-box success">
            <span>Successfully Inserted</span>
            <strong>
              {result.insertedCount}
            </strong>
          </div>

          <div className="upload-result-box failed">
            <span>Failed</span>
            <strong>
              {result.failedCount}
            </strong>
          </div>

        </div>


        {/* FAILED ROWS */}

        {result.failedCount > 0 && (

          <div className="upload-failed-section">

            <h4>Failed Rows</h4>

            <div className="table-responsive">

              <table className="upload-failed-table">

                <thead>
                  <tr>
                    <th>Row</th>
                    <th>Question</th>
                    <th>Error</th>
                  </tr>
                </thead>

                <tbody>

                  {result.failed.map(
                    (item, index) => (
                      <tr key={index}>

                        <td>
                          {item.row}
                        </td>

                        <td>
                          {item.question}
                        </td>

                        <td>
                          {item.error}
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        )}


        {/* SUCCESSFUL QUESTIONS */}

        {result.insertedCount > 0 && (

          <div className="upload-success-section">

            <h4>
              Successfully Uploaded Questions
            </h4>

            <ul>

              {result.inserted.map(
                (item, index) => (
                  <li key={index}>
                    Row {item.row} — {item.question}
                  </li>
                )
              )}

            </ul>

          </div>

        )}

      </div>

    )}

  </div>
  </AdminLayout>
)};

export default UploadMCQ;