import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";

function AdminLayout({ children }) {
    return (
        <div className="admin-layout">

            <Sidebar />

            <div className="admin-main">

                <AdminHeader />

                <main className="admin-content">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default AdminLayout;