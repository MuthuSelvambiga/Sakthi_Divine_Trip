import { UserCircle, LogOut } from "lucide-react";

function AdminHeader() {
    return (
        <header className="admin-header">

            <div className="admin-header-title">
                <h1>Admin Panel</h1>
                <p>Manage Sakthi Divine Trip</p>
            </div>

            <div className="admin-header-actions">

                <div className="admin-user">
                    <UserCircle size={24} />
                    <span>Admin</span>
                </div>

                <button
                    className="logout-button"
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/";
                    }}
                >
                    <LogOut size={17} />
                    <span>Logout</span>
                </button>

            </div>

        </header>
    );
}

export default AdminHeader;