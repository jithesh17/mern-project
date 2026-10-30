import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Course from "./pages/Course";
import MCQ from "./pages/MCQ";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCourse from "./pages/admin/AdminCourse";
import AdminCreateCourse from "./pages/admin/AdminCreateCourse";
import AdminSubCourse from "./pages/admin/AdminSubCourse";
import AdminTrainer from "./pages/admin/AdminTrainer";
import AdminCreateTrainer from "./pages/admin/AdminCreateTrainer";
import AdminEditTrainer from "./pages/admin/AdminEditTrainer";
import AdminStudent from "./pages/admin/AdminStudent";
import AdminAllocate from "./pages/admin/AdminAllocate";
import AdminCreateAllocate from "./pages/admin/AdminCreateAllocate";
import AdminEditAllocation from "./pages/admin/AdminEditAllocation";
import AdminStudentReport from "./pages/admin/AdminStudentReport";
import AdminTrainerReport from "./pages/admin/AdminTrainerReport";
import AdminMCQ from "./pages/admin/AdminMCQ";
import UploadStudents from "./pages/admin/UploadStudents";
import UploadMCQ from "./pages/admin/UploadMCQ";

import CreateSubCourse from "./pages/admin/CreateSubCourse";
import EditSubCourse from "./pages/admin/EditSubCourse";
import CreateStudent from "./pages/admin/CreateStudent";
import EditStudent from "./pages/admin/EditStudent";
import CreateMCQ from "./pages/admin/CreateMCQ";
import EditMCQ from "./pages/admin/EditMCQ";

import TrainerLogin from "./pages/trainer/TrainerLogin";
import TrainerDashboard from "./pages/trainer/TrainerDashboard";
import TrainerLayout from "./components/TrainerLayout";
import Attendance from "./pages/trainer/Attendance";
import BatchReport from "./pages/trainer/BatchReport";
import StudentReport from "./pages/trainer/StudentReport";
import Students from "./pages/trainer/Students";
import Batches from "./pages/trainer/Batches";
import TrainerProfile from "./pages/trainer/TrainerProfile";
import CourseContent from "./pages/CourseContent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/course" element={<Course />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/mcq" element={<MCQ />} />
          <Route path="/mcq/:subCourseId" element={<MCQ />} />
          <Route path="/course/:course/:topic" element={<CourseContent />} />
        </Route>
        {/* ===================== ADMIN MODULE ===================== */}

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/course" element={<AdminCourse />} />
        <Route path="/admin/course/create" element={<AdminCreateCourse />} />

        <Route path="/admin/sub-course" element={<AdminSubCourse />} />
        <Route path="/admin/trainer" element={<AdminTrainer />} />
        <Route path="/admin/student" element={<AdminStudent />} />
        <Route path="/admin/allocate" element={<AdminAllocate />} />
        <Route path="/admin/student-report" element={<AdminStudentReport />} />
        <Route path="/admin/trainer-report" element={<AdminTrainerReport />} />
        <Route path="/admin/mcq" element={<AdminMCQ />} />

        <Route path="/admin/sub-course" element={<AdminSubCourse />} />

        <Route path="/admin/sub-course/create" element={<CreateSubCourse />} />

        <Route path="/admin/sub-course/edit/:id" element={<EditSubCourse />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/admin/student/upload" element={<UploadStudents />} />

        <Route path="/admin/sub-course" element={<AdminSubCourse />} />

        <Route path="/admin/trainer" element={<AdminTrainer />} />

        <Route path="/admin/trainer/create" element={<AdminCreateTrainer />} />

        <Route path="/admin/trainer/edit/:id" element={<AdminEditTrainer />} />

        <Route
          path="/admin/allocate/create"
          element={<AdminCreateAllocate />}
        />

        <Route
          path="/admin/allocate/edit/:id"
          element={<AdminEditAllocation />}
        />

        <Route path="/admin/sub-course" element={<AdminSubCourse />} />

        <Route path="/trainer/login" element={<TrainerLogin />} />

        <Route path="/admin/student" element={<AdminStudent />} />

        <Route path="/admin/student/create" element={<CreateStudent />} />

        <Route path="/admin/student/edit/:id" element={<EditStudent />} />

        <Route path="/admin/mcq" element={<AdminMCQ />} />

        <Route path="/admin/mcq/create" element={<CreateMCQ />} />

        <Route path="/admin/mcq/edit/:id" element={<EditMCQ />} />

        <Route path="/admin/mcq/upload" element={<UploadMCQ />} />

        <Route
          path="/trainer/dashboard"
          element={
            <TrainerLayout>
              <TrainerDashboard />
            </TrainerLayout>
          }
        />

        <Route
          path="/trainer/attendance"
          element={
            <TrainerLayout>
              <Attendance />
            </TrainerLayout>
          }
        />
        <Route
          path="/trainer/reports/batch"
          element={
            <TrainerLayout>
              <BatchReport />
            </TrainerLayout>
          }
        />
        <Route
          path="/trainer/reports/student"
          element={
            <TrainerLayout>
              <StudentReport />
            </TrainerLayout>
          }
        />
        <Route
          path="/trainer/students"
          element={
            <TrainerLayout>
              <Students />
            </TrainerLayout>
          }
        />

        <Route
          path="/trainer/batches"
          element={
            <TrainerLayout>
              <Batches />
            </TrainerLayout>
          }
        />

        <Route
          path="/trainer/profile"
          element={
            <TrainerLayout>
              <TrainerProfile />
            </TrainerLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
