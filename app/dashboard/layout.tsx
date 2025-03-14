import Sidebar from '../../components/Sidebar';
import AppBar from '../../components/Appbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
      data-sidebar-position="fixed" data-header-position="fixed">
      <Sidebar />
      <div className="body-wrapper">
        <AppBar />
        <div className="body-wrapper-inner">
          {children}
        </div>
      </div>
    </div>
  );
}