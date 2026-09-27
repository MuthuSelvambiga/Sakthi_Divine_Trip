import { useState } from "react";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";

function AdminLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebar = () => setIsSidebarOpen(true);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="admin-layout">

            <Sidebar isOpen={isSidebarOpen} onNavigate={closeSidebar} />

            {/* Dark backdrop behind the sidebar on mobile, tap to close */}
            <div
                className={`sidebar-overlay ${isSidebarOpen ? "visible" : ""}`}
                onClick={closeSidebar}
            />

            <div className="admin-main">

                <AdminHeader onMenuClick={openSidebar} />

                <main className="admin-content">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default AdminLayout;
