import { useEffect, useState } from "react";

import AdminLayout from "../../components/AdminLayout";
 
import "../../css/dashboard.css";
import "../../css/theme.css";
import "../../css/admin.css";

function AdminTrainerReport() {
  const [trainerReports, setTrainerReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrainerReport = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/trainer-report"
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch trainer report"
        );
      }

      console.log("TRAINER REPORT:", result);

      setTrainerReports(result.data || []);
    } catch (error) {
      console.error("Trainer report error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainerReport();
  }, []);

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB");
  };

  return (
    <AdminLayout>
      <div className="admin-page">

        {/* HEADER */}
        <div className="admin-page-header">
          <div>
            <h2>Trainer Report</h2>
            <p>
              Trainer allocation and batch details.
            </p>
          </div>
        </div>

        {/* TABLE */}
        <div className="row">
          <div className="col-lg-12">

            <div className="card">
              <div className="card-body">

                {loading ? (
                  <p>Loading trainer report...</p>
                ) : trainerReports.length === 0 ? (
                  <div className="admin-empty">
                    <span className="material-icons">
                      assessment
                    </span>

                    <p>
                      No trainer reports found.
                    </p>
                  </div>
                ) : (
                  <div className="table-responsive">

                    <table className="table table-hover">

                      <thead>
                        <tr>
                          <th>S.NO</th>
                          <th>TRAINER</th>
                          <th>COURSE</th>
                          <th>BATCH</th>
                          <th>START DATE</th>
                          <th>END DATE</th>
                          <th>STATUS</th>
                        </tr>
                      </thead>

                      <tbody>
                        {trainerReports.map(
                          (trainer, index) => {

                            // First allocation
                            const allocation =
                              trainer.allocations?.[0];

                            return (
                              <tr key={trainer._id}>

                                {/* S.NO */}
                                <td>
                                  {index + 1}
                                </td>

                                {/* TRAINER */}
                                <td>
                                  {trainer.name || "-"}
                                </td>

                                {/* COURSE */}
                                <td>
                                  {allocation?.course ||
                                    trainer.course ||
                                    "-"}
                                </td>

                                {/* BATCH */}
                                <td>
                                  {allocation?.studentBatch ||
                                    "-"}
                                </td>

                                {/* START DATE */}
                                <td>
                                  {formatDate(
                                    allocation?.startDate
                                  )}
                                </td>

                                {/* END DATE */}
                                <td>
                                  {formatDate(
                                    allocation?.endDate
                                  )}
                                </td>

                                {/* STATUS */}
                                <td>
                                  <span className="badge badge-info">
                                    {allocation?.status || "-"}
                                  </span>
                                </td>

                              </tr>
                            );
                          }
                        )}
                      </tbody>

                    </table>

                  </div>
                )}

              </div>
            </div>

          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

export default AdminTrainerReport;