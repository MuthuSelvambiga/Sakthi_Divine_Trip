import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Map,
    CalendarCheck,
    Star
} from "lucide-react";

function Sidebar({ isOpen, onNavigate }) {
    return (
        <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>

            <div className="sidebar-brand">
                <img
                    src="/SDT_LOGO.jpeg"
                    alt="Sakthi Divine Trip"
                    className="sidebar-logo"
                />

                <span>Admin Panel</span>
            </div>

            <nav className="sidebar-nav">

                <NavLink to="/dashboard" onClick={onNavigate}>
                    <LayoutDashboard size={19} />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/tours" onClick={onNavigate}>
                    <Map size={19} />
                    <span>Tours</span>
                </NavLink>

                <NavLink to="/bookings" onClick={onNavigate}>
                    <CalendarCheck size={19} />
                    <span>Bookings</span>
                </NavLink>

                <NavLink to="/experiences" onClick={onNavigate}>
                    <Star size={19} />
                    <span>Experiences</span>
                </NavLink>

            </nav>

        </aside>
    );
}

export default Sidebar;
