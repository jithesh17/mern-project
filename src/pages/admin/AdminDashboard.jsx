import { Link } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";

import { initialCourses, initialTrainers, initialStudents, initialAllocations } from "../../data/adminData";

import "../../css/dashboard.css";
import "../../css/theme.css";
import "../../css/admin.css";

function AdminDashboard() {

  return (
    <AdminLayout>

      <div className="admin-page">

        <div className="admin-page-header">

          <div>
            <h2>Welcome Back, Admin!</h2>
            <p>Here's what's happening across the academy today.</p>
          </div>

        </div>


        {/* Stat cards */}

        <div className="row">

          <div className="col-xl-3 col-md-6">
            <div className="admin-stat-card admin-stat-purple">
              <div className="admin-stat-icon">
                <span className="material-icons">menu_book</span>
              </div>
              <div>
                <div className="admin-stat-value">{initialCourses.length}</div>
                <div className="admin-stat-label">Total Courses</div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="admin-stat-card admin-stat-blue">
              <div className="admin-stat-icon">
                <span className="material-icons">badge</span>
              </div>
              <div>
                <div className="admin-stat-value">{initialTrainers.length}</div>
                <div className="admin-stat-label">Total Trainers</div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="admin-stat-card admin-stat-green">
              <div className="admin-stat-icon">
                <span className="material-icons">groups</span>
              </div>
              <div>
                <div className="admin-stat-value">{initialStudents.length}</div>
                <div className="admin-stat-label">Total Students</div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="admin-stat-card admin-stat-orange">
              <div className="admin-stat-icon">
                <span className="material-icons">event_available</span>
              </div>
              <div>
                <div className="admin-stat-value">{initialAllocations.length}</div>
                <div className="admin-stat-label">Active Batches</div>
              </div>
            </div>
          </div>

        </div>


        {/* Quick links */}

        <div className="row">

          <div className="col-lg-12">

            <div className="card">

              <div className="card-header">
                <h4 className="card-title">Quick Actions</h4>
              </div>

              <div className="card-body" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>

                <Link to="/admin/course" className="btn btn-primary">
                  Manage Courses
                </Link>


                <Link to="/admin/Subcourse" className="btn btn-success">
                sub course
                </Link>


                <Link to="/admin/trainer" className="btn btn-info">
                  Manage Trainers
                </Link>       

                <Link to="/admin/student" className="btn btn-warning">
                  Manage Students
                </Link>

                <Link to="/admin/allocate" className="btn btn-success">
                  Allocate Batch
                </Link>

                <Link to="/admin/student-report" className="btn btn-primary">
                StudentReport
                </Link>

                <Link to="/admin/trainer-report" className="btn btn-info">
                  Trainer report
                </Link>

              

              </div>

            </div>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}

export default AdminDashboard;      