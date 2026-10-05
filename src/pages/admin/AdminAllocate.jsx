import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/AdminLayout";

import "../../css/dashboard.css";
import "../../css/theme.css";
import "../../css/admin.css";

function AdminAllocate() {
  const navigate = useNavigate();

  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllocations = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/allocations"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch allocations"
        );
      }

      setAllocations(data);
    } catch (error) {
      console.error("Fetch allocations error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllocations();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this allocation?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/allocations/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete allocation"
        );
      }

      alert("Allocation deleted successfully");

      setAllocations((previous) =>
        previous.filter(
          (allocation) => allocation._id !== id
        )
      );
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page">

        {/* HEADER */}
        <div className="admin-page-header">
          <div>
            <h2>Allocate</h2>

            <p>
              Trainers allocated to each batch.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-primary admin-create-btn"
            onClick={() =>
              navigate("/admin/allocate/create")
            }
          >
            <span className="material-icons">
              add
            </span>

            Create
          </button>
        </div>


        {/* TABLE */}
        <div className="row">
          <div className="col-lg-12">

            <div className="card">
              <div className="card-body">

                {loading ? (
                  <div className="admin-empty">
                    <p>
                      Loading allocations...
                    </p>
                  </div>
                ) : allocations.length === 0 ? (
                  <div className="admin-empty">

                    <span className="material-icons">
                      event
                    </span>

                    <p>
                      No allocations found.
                    </p>

                  </div>
                ) : (

                  <table className="table table-hover">

                    <thead>
                      <tr>
                        <th>Trainer</th>
                        <th>Course</th>
                        <th>Batch</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>


                    <tbody>

                      {allocations.map(
                        (allocation) => (

                          <tr
                            key={allocation._id}
                          >

                            {/* TRAINER */}
                            <td>
                              {allocation.trainer?.name ||
                                "-"}
                            </td>


                            {/* COURSE */}
                            <td>
                              {allocation.course?.course ||
                                "-"}
                            </td>


                            {/* BATCH */}
                            <td>
                              {allocation.studentBatch ||
                                "-"}
                            </td>


                            {/* START DATE */}
                            <td>
                              {allocation.startDate
                                ? new Date(
                                    allocation.startDate
                                  ).toLocaleDateString()
                                : "-"}
                            </td>


                            {/* END DATE */}
                            <td>
                              {allocation.endDate
                                ? new Date(
                                    allocation.endDate
                                  ).toLocaleDateString()
                                : "-"}
                            </td>


                            {/* STATUS */}
                            <td>
                              <span className="badge badge-info">
                                {allocation.status ||
                                  "Active"}
                              </span>
                            </td>


                            {/* ACTIONS */}
                            <td>

                              <div className="admin-table-actions">

                                {/* EDIT */}
                                <button
                                  type="button"
                                  className="admin-icon-btn"
                                  onClick={() =>
                                    navigate(
                                      `/admin/allocate/edit/${allocation._id}`
                                    )
                                  }
                                >
                                  <span className="material-icons">
                                    edit
                                  </span>
                                </button>


                                {/* DELETE */}
                                <button
                                  type="button"
                                  className="admin-icon-btn"
                                  onClick={() =>
                                    handleDelete(
                                      allocation._id
                                    )
                                  }
                                >
                                  <span className="material-icons">
                                    delete
                                  </span>
                                </button>

                              </div>

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                )}

              </div>
            </div>

          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

export default AdminAllocate;