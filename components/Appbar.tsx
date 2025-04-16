import Link from "next/link";
import Image from "next/image";
import {
  FaBars,
  FaBell,
  FaUser,
  FaEnvelope,
  FaTasks,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AppBar() {
  return (
    <header
      className="app-header"
     
    >
      <nav className="navbar navbar-expand-lg navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item d-block d-xl-none">
            <button className="nav-link sidebartoggler" id="headerCollapse">
              <FaBars className="fs-5" />
            </button>
          </li>
          <li className="nav-item dropdown">
            <button className="nav-link" id="drop1" data-bs-toggle="dropdown">
              <FaBell className="fs-5" />
              <div className="notification bg-primary rounded-circle"></div>
            </button>
            <div className="dropdown-menu dropdown-menu-animate-up">
              <div className="message-body">
                <Link href="#" className="dropdown-item">
                  Item 1
                </Link>
                <Link href="#" className="dropdown-item">
                  Item 2
                </Link>
              </div>
            </div>
          </li>
        </ul>
        <div className="navbar-collapse justify-content-end px-0">
          <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
            <li className="nav-item dropdown">
              <button className="nav-link" id="drop2" data-bs-toggle="dropdown">
                <Image
                  src="/assets/images/profile/user-1.jpg"
                  alt="Profile"
                  width={35}
                  height={35}
                  className="rounded-circle"
                />
              </button>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up">
                <div className="message-body">
                  <Link href="#" className="d-flex align-items-center gap-2 dropdown-item">
                    <FaUser className="fs-6" />
                    <p className="mb-0 fs-3">My Profile</p>
                  </Link>
                  <Link href="#" className="d-flex align-items-center gap-2 dropdown-item">
                    <FaEnvelope className="fs-6" />
                    <p className="mb-0 fs-3">My Account</p>
                  </Link>
                  <Link href="#" className="d-flex align-items-center gap-2 dropdown-item">
                    <FaTasks className="fs-6" />
                    <p className="mb-0 fs-3">My Task</p>
                  </Link>
                  <Link
                    href="./authentication-login.html"
                    className="btn btn-outline-primary mx-3 mt-2 d-block"
                  >
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
