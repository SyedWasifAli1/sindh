"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "../../components/Sidebar";
import {  FaSignOutAlt,  FaUserCircle,   } from "react-icons/fa";
import { auth } from '../lib/firebase-config';
import { signOut } from "firebase/auth";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // const handleSignOut = () => {
  //   console.log("Signing out...");
  //   router.push("/login");
  // };
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user from Firebases
      alert('You have been logged out!');
      router.push('/'); // Redirect to login page (or wherever you want to redirect the user)
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Failed to sign out. Please try again.');
    }
  };
  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="page-wrapper"
      id="main-wrapper"
      data-layout="vertical"
      data-navbarbg="skin6"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
    >
      {/* Top Header */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundImage: "url('/top_header.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50px",
          padding: "0 15px",
          zIndex: 1001,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        {/* Logo */}
        <Link href="/dashboard" className="text-nowrap logo-img">
          <Image
            src="/assets/images/logos/logo.png"
            alt="Logo"
            width={100}
            height={70}
            style={{
              objectFit: "contain",
              marginTop: "50px",
              position: "relative",
              zIndex: 1,
            }}
          />
        </Link>

        {/* React-based Dropdown */}
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-transparent border-0 mt-4"
            style={{ padding: 0 }}
          >
            {/* <Image
              src="/assets/images/profile/user-1.jpg"
              alt="Profile"
              width={55}
              height={55}
              className="rounded-circle"
              style={{ cursor: "pointer" }}
            /> */}
       <FaUserCircle 
    size={55} 
    className="text-white" 
    style={{ 
        cursor: "pointer",
        backgroundColor: "#f0f0f0",  // Light grey color
        borderRadius: "50%",         // Makes background circular
        padding: "5px",             // Adds some space around the icon
    }}
/>
          </button>

          {showDropdown && (
            <ul
              className="dropdown-menu dropdown-menu-end show"
              style={{
                position: "absolute",
                right: 0,
                top: "110%",
                backgroundColor: "#fff",
                borderRadius: "4px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                padding: "8px 0",
                minWidth: "180px",
                zIndex: 2000,
              }}
            >
              {/* <li>
                <Link
                  href="#"
                  className="dropdown-item d-flex align-items-center gap-2"
                >
                  <FaUser className="fs-6" />
                  <span>My Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="dropdown-item d-flex align-items-center gap-2"
                >
                  <FaEnvelope className="fs-6" />
                  <span>My Account</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="dropdown-item d-flex align-items-center gap-2"
                >
                  <FaTasks className="fs-6" />
                  <span>My Task</span>
                </Link>
              </li> */}
              {/* <li>
                <hr className="dropdown-divider" />
              </li> */}
              <li>
                <button
                  onClick={handleLogout}
                  className="dropdown-item d-flex align-items-center gap-2 text-danger border-0 bg-transparent w-100 text-start"
                >
                  <FaSignOutAlt className="fs-6" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Sidebar & Content */}
      <Sidebar />
      <div
        className="body-wrapper"
        style={{ paddingTop: "0px", paddingBottom: "50px" }}
      >
        <div className="body-wrapper-inner">{children}</div>
      </div>

      {/* Bottom Banner */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "30px",
          zIndex: 1000,
          pointerEvents: "none",
        }}
      >
        <Image
          src="/bottom_header.png"
          alt="Bottom Banner"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
    </div>
  );
}
