// import { NavLink } from "react-router-dom";
// import "../css/sidebar.css";
// import "../css/theme.css";
// function Sidebar({ sidebarOpen, setSidebarOpen }) {

//   return (
//     <div
//       className={`sidebar-wrapper ${
//         sidebarOpen ? "sidebar-open" : ""
//       }`}
//     >

//       {/* Sidebar Brand */}

//       <div className="nav-header">

//         <NavLink
//           to="/dashboard"
//           className="brand-logo"
//           onClick={() => setSidebarOpen(false)}
//         >

//           <div className="logo-abbr">
//             BR
//           </div>

//           <div className="brand-title">
//             <h2>
//                Academy
//             </h2>
//           </div>

//         </NavLink>

//       </div>


//       {/* Sidebar Navigation */}

//       <div className="dlabnav">

//         <div className="dlabnav-scroll">

//           <ul className="metismenu" id="menu">

//             <li>
//               <NavLink
//                 to="/dashboard"
//                 className={({ isActive }) =>
//                   isActive ? "active" : ""
//                 }
//                 onClick={() => setSidebarOpen(false)}
//               >

//                 <span className="material-icons">
//                   home
//                 </span>

//                 <span className="nav-text">
//                   Dashboard
//                 </span>

//               </NavLink>
//             </li>


//             <li>
//               <NavLink
//                 to="/profile"
//                 className={({ isActive }) =>
//                   isActive ? "active" : ""
//                 }
//                 onClick={() => setSidebarOpen(false)}
//               >

//                 <span className="material-icons">
//                   person
//                 </span>

//                 <span className="nav-text">
//                   Profile
//                 </span>

//               </NavLink>
//             </li>


//             <li>
//               <NavLink
//                 to="/course"
//                 className={({ isActive }) =>
//                   isActive ? "active" : ""
//                 }
//                 onClick={() => setSidebarOpen(false)}
//               >

//                 <span className="material-icons">
//                   menu_book
//                 </span>

//                 <span className="nav-text">
//                   Course
//                 </span>

//               </NavLink>
//             </li>


//             {/* <li>
//               <NavLink
//                 to="/mcq"
//                 className={({ isActive }) =>
//                   isActive ? "active" : ""
//                 }
//                 onClick={() => setSidebarOpen(false)}
//               >

//                 <span className="material-icons">
//                   quiz
//                 </span>

//                 <span className="nav-text">
//                   MCQ Test
//                 </span>

//               </NavLink>
//             </li> */}

//           </ul>


//           <div className="copyright">

//             <p>
//               <strong>
//                 Student Dashboard
//               </strong>
//             </p>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Sidebar;


import { NavLink } from "react-router-dom";
import "../css/sidebar.css";

function Sidebar({ sidebarOpen, setSidebarOpen }) {

    // Close sidebar after selecting a menu item
    const handleNavClick = () => {
        if (setSidebarOpen) {
            setSidebarOpen(false);
        }
    };

    return (
        <aside
            className={`sidebar-wrapper ${
                sidebarOpen ? "sidebar-open" : ""
            }`}
        >

            {/* =================================================
                LOGO
            ================================================= */}

            <div className="nav-header">

                <NavLink to="/dashboard" className="brand-logo">

                    <span className="logo-abbr">
                        BR
                    </span>

                    <span className="brand-title">
                        Academy
                    </span>

                </NavLink>

            </div>


            {/* =================================================
                SIDEBAR NAVIGATION
            ================================================= */}

            <div className="dlabnav">

                <div className="dlabnav-scroll">

                    <ul className="metismenu">

                        {/* Dashboard */}

                        <li>
                            <NavLink
                                to="/dashboard"
                                onClick={handleNavClick}
                            >
                                <span className="material-icons">
                                    home
                                </span>

                                <span className="nav-text">
                                    Dashboard
                                </span>
                            </NavLink>
                        </li>


                        {/* Profile */}

                        <li>
                            <NavLink
                                to="/profile"
                                onClick={handleNavClick}
                            >
                                <span className="material-icons">
                                    person
                                </span>

                                <span className="nav-text">
                                    Profile
                                </span>
                            </NavLink>
                        </li>


                        {/* Course */}

                        <li>
                            <NavLink
                                to="/course"
                                onClick={handleNavClick}
                            >
                                <span className="material-icons">
                                    menu_book
                                </span>

                                <span className="nav-text">
                                    Course
                                </span>
                            </NavLink>
                        </li>


                        {/* MCQ Test */}

                        <li>
                            <NavLink
                                to="/mcq/html"
                                onClick={handleNavClick}
                            >
                                <span className="material-icons">
                                    quiz
                                </span>

                                <span className="nav-text">
                                    MCQ Test
                                </span>
                            </NavLink>
                        </li>

                    </ul>


                    {/* =================================================
                        SIDEBAR FOOTER
                    ================================================= */}

                    <div className="copyright">
                        <p>
                            <strong>Student Dashboard</strong>
                        </p>
                    </div>

                </div>

            </div>

        </aside>
    );
}

export default Sidebar;