/* =========================================================
   ADMIN MODULE - MOCK DATA
   Replace these arrays with real API calls when the
   backend is ready. Every admin page imports from here so
   dropdowns (Trainer, Course, Batch) stay in sync.
   ========================================================= */

export const initialCourses = [
  {
    id: 1,
    name: "HTML",
    duration: "2 Weeks",
    logo: "",
  },
  {
    id: 2,
    name: "CSS",
    duration: "2 Weeks",
    logo: "",
  },
  {
    id: 3,
    name: "JavaScript",
    duration: "4 Weeks",
    logo: "",
  },
  {
    id: 4,
    name: "React",
    duration: "4 Weeks",
    logo: "",
  },
];

export const initialTrainers = [
  {
    id: 1,
    name: "Priya Ramesh",
    department: "Front End",
    phone: "9876543210",
    address: "Coimbatore, Tamil Nadu",
  },
  {
    id: 2,
    name: "Arun Kumar",
    department: "Back End",
    phone: "9123456780",
    address: "Tiruppur, Tamil Nadu",
  },
];

export const course = [
];

export const initialStudents = [
  {
    id: 1,
    sno: 1,
    name: "Karthik S",
    course: "React",
    batch: "Batch A",
    startDate: "2026-06-01",
    status: "Active",
  },
  {
    id: 2,
    sno: 2,
    name: "Divya M",
    course: "JavaScript",
    batch: "Batch B",
    startDate: "2026-07-15",
    status: "Completed",
  },
];

export const batches = ["Batch A", "Batch B", "Batch C", "Batch D"];

export const statuses = ["Active", "Completed", "On Hold", "Dropped"];

export const initialAllocations = [
  {
    id: 1,
    trainer: "Priya Ramesh",
    batch: "Batch A",
    startDate: "2026-06-01",
    endDate: "2026-07-25",
    status: "Active",
  },
];

/* =========================================================
   SUB COURSE — topics/modules under a main course
   e.g. Course "MERN" -> Sub Courses: HTML, CSS, JS
   ========================================================= */

export const initialSubCourses = [
  {
    id: 1,
    sno: 1,
    course: "React",
    sub: "HTML",
    description: "Basics of HTML tags, forms and semantic markup.",
    image: "",
  },
  {
    id: 2,
    sno: 2,
    course: "React",
    sub: "CSS",
    description: "Styling, flexbox, grid and responsive design.",
    image: "",
  },
  {
    id: 3,
    sno: 3,
    course: "React",
    sub: "JS",
    description: "Core JavaScript concepts before moving into React.",
    image: "",
  },
];

/* =========================================================
   MCQ TEST — quiz questions per Course / Sub Course
   ========================================================= */

export const answerOptions = ["A", "B", "C", "D"];

export const initialMCQs = [
  {
    id: 1,
    sno: 1,
    course: "React",
    subCourse: "HTML",
    question: "Which tag is used to create a hyperlink in HTML?",
    optionA: "<link>",
    optionB: "<a>",
    optionC: "<href>",
    optionD: "<hyper>",
    correctAnswer: "B",
  },
];
