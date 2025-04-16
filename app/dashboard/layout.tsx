import Sidebar from '../../components/Sidebar';
// import AppBar from '../../components/Appbar';
import Link from "next/link";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
      data-sidebar-position="fixed" data-header-position="fixed">
      
      {/* Fixed Top Header - Enhanced with more specific positioning */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundImage: "url('/top_header.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50px",
          padding: "0 15px",
          zIndex: 1001,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}
      >
        <Link href="/dashboard" className="text-nowrap logo-img">
          <Image
            src="/assets/images/logos/logo.png"
            alt="Logo"
            width={100}
            height={70}
            style={{ 
              objectFit: "contain",
              marginTop: "50px",
              position: 'relative',
              zIndex: 1
            }}
          />
        </Link>
        <button
          className="close-btn d-xl-none d-block sidebartoggler cursor-pointer bg-transparent border-0 text-white"
          id="sidebarCollapse"
        >
          <i className="ti ti-x fs-6"></i>
        </button>
      </div>

      <Sidebar />
      <div className="body-wrapper" style={{ 
        paddingTop: '0px',
        paddingBottom: '50px'
      }}>
        {/* <AppBar /> */}
        <div className="body-wrapper-inner">
          {children}
        </div>
      </div>
      
      {/* Fixed Bottom Image */}
      <div 
        style={{ 
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30px', 
          zIndex: 1000,
          background: 'linear-gradient(to right, #2c3e50, #4ca1af)'
        }}
      >
        <Image 
          src="/bottom_header.png" 
          alt="Bottom Banner"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
    </div>
  );
}