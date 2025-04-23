"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from '../app/lib/firebase-config';
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('You have been logged out!');
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Failed to sign out. Please try again.');
    }
  };

  // Improved function to check if a link is active
  const isActive = (href: string) => {
    // Exact match for dashboard
    if (href === '/dashboard') {
      return pathname === href;
    }
    // For other links, check if path starts with href
    return pathname.startsWith(href);
  };

  return (
    <aside className="left-sidebar">
      <div>
        <nav style={{ marginTop: '100px' }} className="sidebar-nav scroll-sidebar">
          <ul id="sidebarnav">
            <li className="sidebar-item">
              <Link 
                className="sidebar-link" 
                href="/dashboard"
                style={{
                  color: isActive('/dashboard') ? '#FF0000' : 'inherit',
                  position: 'relative',
                  paddingRight: '15px' // Space for the dot
                }}
              >
                <Image 
                  src="/Home.png"
                  alt="Dashboard"
                  width={15}
                  height={18}
                  className="me-2"
                />
                <span className="hide-menu">Dashboard</span>
                {isActive('/dashboard') && (
                  <span 
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '6px',
                      height: '6px',
                      backgroundColor: '#FF0000',
                      borderRadius: '50%'
                    }}
                  />
                )}
              </Link>
            </li>
            <li className="sidebar-item">
              <Link 
                className="sidebar-link"
                href="/dashboard/reporting"
                style={{
                  color: isActive('/dashboard/reporting') ? '#FF0000' : 'inherit',
                  position: 'relative',
                  paddingRight: '15px'
                }}
              >
                <Image 
                  src="/icon.png"
                  alt="Reports"
                  width={15}
                  height={18}
                  className="me-2"
                />
                <span className="hide-menu">Reports</span>
                {isActive('/dashboard/reporting') && (
                  <span 
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '6px',
                      height: '6px',
                      backgroundColor: '#FF0000',
                      borderRadius: '50%'
                    }}
                  />
                )}
              </Link>
            </li>
            <li className="sidebar-item">
              <Link 
                className="sidebar-link"
                href="/dashboard/list-of-facility"
                style={{
                  color: isActive('/dashboard/list-of-facility') ? '#FF0000' : 'inherit',
                  position: 'relative',
                  paddingRight: '15px'
                }}
              >
                <Image 
                  src="/icon1.png"
                  alt="List"
                  width={15}
                  height={18}
                  className="me-2"
                />
                <span className="hide-menu">List of Facility</span>
                {isActive('/dashboard/list-of-facility') && (
                  <span 
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '6px',
                      height: '6px',
                      backgroundColor: '#FF0000',
                      borderRadius: '50%'
                    }}
                  />
                )}
              </Link>
            </li>
            <li className="sidebar-item">
              <Link 
                className="sidebar-link"
                href="/dashboard/Un-Registered"
                style={{
                  color: isActive('/dashboard/Un-Registered') ? '#FF0000' : 'inherit',
                  position: 'relative',
                  paddingRight: '15px'
                }}
              >
                <Image 
                  src="/vector.png"
                  alt="Un-Registered"
                  width={15}
                  height={18}
                  className="me-2"
                />
                <span className="hide-menu">Un-Registered</span>
                {isActive('/dashboard/Un-Registered') && (
                  <span 
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '6px',
                      height: '6px',
                      backgroundColor: '#FF0000',
                      borderRadius: '50%'
                    }}
                  />
                )}
              </Link>
            </li>
            <li className="sidebar-item">
              <Link 
                className="sidebar-link"
                href="/dashboard/registered"
                style={{
                  color: isActive('/dashboard/registered') ? '#FF0000' : 'inherit',
                  position: 'relative',
                  paddingRight: '15px'
                }}
              >
                <Image 
                  src="/vector1.png"
                  alt="Registered"
                  width={15}
                  height={18}
                  className="me-2"
                />
                <span className="hide-menu">Registered</span>
                {isActive('/dashboard/registered') && (
                  <span 
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '6px',
                      height: '6px',
                      backgroundColor: '#FF0000',
                      borderRadius: '50%'
                    }}
                  />
                )}
              </Link>
            </li>
            <li className="sidebar-item">
              <Link 
                className="sidebar-link"
                href="/dashboard/licensed"
                style={{
                  color: isActive('/dashboard/licensed') ? '#FF0000' : 'inherit',
                  position: 'relative',
                  paddingRight: '15px'
                }}
              >
                <Image 
                  src="/Star.png"
                  alt="Licensed"
                  width={15}
                  height={18}
                  className="me-2"
                />
                <span className="hide-menu">licensed</span>
                {isActive('/dashboard/licensed') && (
                  <span 
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '6px',
                      height: '6px',
                      backgroundColor: '#FF0000',
                      borderRadius: '50%'
                    }}
                  />
                )}
              </Link>
            </li>
            <li className="sidebar-item">
              <button 
                className="sidebar-link-button" 
                onClick={handleLogout}
                style={{
                  color: 'inherit',
                  position: 'relative'
                }}
              >
                <Image 
                  src="/logout.png"
                  alt="Signout"
                  width={15}
                  height={18}
                  className="me-2"
                />
                <span className="hide-menu">Signout</span>
              </button>
            </li>
          </ul>
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
//                 <a className="sidebar-link" href="./Un-Registered.html" aria-expanded="false">
//                   <i className="ti ti-pencil"></i>
//                   <span className="hide-menu">Un-Registered</span>
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