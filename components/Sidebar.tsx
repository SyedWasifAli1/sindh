import Link from "next/link";
import Image from "next/image";
import {
  FaHome,
  FaChartLine,
  FaList,
  FaPencilAlt,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="left-sidebar">
      <div>
        <div className="brand-logo d-flex align-items-center justify-content-between">
          <Link href="/dashboard" className="text-nowrap logo-img">
            <Image
              src="/assets/images/logos/logo.png"
              alt="Logo"
              width={100}
              height={90}
              style={{ height: "90px" }}
            />
          </Link>
          <button
            className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
            id="sidebarCollapse"
          >
            <i className="ti ti-x fs-6"></i>
          </button>
        </div>
        <nav className="sidebar-nav scroll-sidebar">
          <ul id="sidebarnav">
            <li className="nav-small-cap">
              <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
              <span className="hide-menu">Home</span>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" href="/dashboard">
                <FaHome className="me-2" />
                <span className="hide-menu">Dashboard</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" href="/dashboard/reporting">
                <FaChartLine className="me-2" />
                <span className="hide-menu">Reports</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" href="/dashboard/list-of-facility">
                <FaList className="me-2" />
                <span className="hide-menu">List of Facility</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" href="/dashboard/registered">
                <FaList className="me-2" />
                <span className="hide-menu">Registered</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" href="/dashboard/unregistered">
                <FaPencilAlt className="me-2" />
                <span className="hide-menu">UnRegistered</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" href="/">
                <FaSignOutAlt className="me-2" />
                <span className="hide-menu">Signout</span>
              </Link>
            </li>
          </ul>
          <div className="unlimited-access hide-menu bg-light-secondary position-relative mb-7 mt-5 rounded">
            <div className="d-flex">
              <div className="unlimited-access-title me-3">
                <h6 className="fw-semibold fs-4 mb-6 text-dark w-85">
                  Sindh Healthcare Commission
                </h6>
                <Link
                  href="/dashboard"
                  target="_blank"
                  className="btn btn-secondary fs-2 fw-semibold"
                >
                  Check
                </Link>
              </div>
              <div className="unlimited-access-img">
                <Image
                  src="/assets/images/backgrounds/rocket.png"
                  alt="Rocket"
                  width={100}
                  height={100}
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}



// export default function Sidebar() {
//     return (

//       <>
//             <link rel="stylesheet" href="/assets/css/styles.min.css" />

//       <aside className="left-sidebar">
//         <div>
//           <div className="brand-logo d-flex align-items-center justify-content-between">
//             <a href="./index.html" className="text-nowrap logo-img">
//               <img style={{ height: '90px' }} src="/assets/images/logos/logo.png" alt="" />
//             </a>
//             <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
//               <i className="ti ti-x fs-6"></i>
//             </div>
//           </div>
//           <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
//             <ul id="sidebarnav">
//               <li className="nav-small-cap">
//                 <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
//                 <span className="hide-menu">Home</span>
//               </li>
//               <li className="sidebar-item">
//                 <a className="sidebar-link" href="./index.html" aria-expanded="false">
//                   <i className="ti ti-dashboard"></i>
//                   <span className="hide-menu">Dashboard</span>
//                 </a>
//               </li>
//               <li className="sidebar-item">
//                 <a className="sidebar-link" href="./reporting.html" aria-expanded="false">
//                   <i className="ti ti-chart-bar"></i>
//                   <span className="hide-menu">Reports</span>
//                 </a>
//               </li>
//               <li className="sidebar-item">
//                 <a className="sidebar-link" href="./facility.html" aria-expanded="false">
//                   <i className="ti ti-list-check"></i>
//                   <span className="hide-menu">List of Facility</span>
//                 </a>
//               </li>
//               <li className="sidebar-item">
//                 <a className="sidebar-link" href="./Registered.html" aria-expanded="false">
//                   <i className="ti ti-list-check"></i>
//                   <span className="hide-menu">Registered</span>
//                 </a>
//               </li>
//               <li className="sidebar-item">
//                 <a className="sidebar-link" href="./unregistered.html" aria-expanded="false">
//                   <i className="ti ti-pencil"></i>
//                   <span className="hide-menu">UnRegistered</span>
//                 </a>
//               </li>
//               <li className="sidebar-item">
//                 <a className="sidebar-link" href="./authentication-login.html" aria-expanded="false">
//                   <i className="ti ti-list"></i>
//                   <span className="hide-menu">Signout</span>
//                 </a>
//               </li>
//             </ul>
//             <div className="unlimited-access hide-menu bg-light-secondary position-relative mb-7 mt-5 rounded">
//               <div className="d-flex">
//                 <div className="unlimited-access-title me-3">
//                   <h6 className="fw-semibold fs-4 mb-6 text-dark w-85">Sindh Healthcare Commission</h6>
//                   <a href="https://adminmart.com/product/modernize-bootstrap-5-admin-template/?ref=56" target="_blank"
//                     className="btn btn-secondary fs-2 fw-semibold">Check</a>
//                 </div>
//                 <div className="unlimited-access-img">
//                   <img src="/assets/images/backgrounds/rocket.png" alt="" className="img-fluid" />
//                 </div>
//               </div>
//             </div>
//           </nav>
//         </div>
//       </aside>
//       <script src="../assets/libs/jquery/dist/jquery.min.js"></script>
//   <script src="../assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
//   <script src="../assets/js/sidebarmenu.js"></script>
//   <script src="../assets/js/app.min.js"></script>
//   <script src="../assets/libs/apexcharts/dist/apexcharts.min.js"></script>
//   <script src="../assets/libs/simplebar/dist/simplebar.js"></script>
//   <script src="../assets/js/dashboard.js"></script>
//   <script src="https://cdn.jsdelivr.net/npm/iconify-icon@1.0.8/dist/iconify-icon.min.js"></script>
  
//       </>
//     );
//   }