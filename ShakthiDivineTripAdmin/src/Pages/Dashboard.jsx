import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Dashboard() {
    const [dashboard, setDashboard] = useState({
        totalTours: 0,
        totalBookings: 0,
        pendingBookings: 0,
        totalExperiences: 0
    });
    const navigate = useNavigate();

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:5066/api/AdminDashboard",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to load dashboard.");
                }

                const data = await response.json();

                setDashboard({
                    totalTours: data.totalTours,
                    totalBookings: data.totalBookings,
                    pendingBookings: data.pendingBookings,
                    totalExperiences: data.totalExperiences
                });
            } catch (error) {
                console.error("Dashboard error:", error);
            }
        };

        loadDashboard();
    }, []);

    return (
        <div className="dashboard-page">

            {/* Welcome Banner */}
            <section className="dashboard-welcome">
                <div className="welcome-content">
                    <h1>Welcome Back, Admin! 👋</h1>
                    <p>
                        Here’s an overview of Sakthi Divine Trip.
                    </p>
                </div>

                <div className="welcome-decoration">
                    <div className="temple-line">ॐ</div>
                    <span>DIVINE JOURNEYS</span>
                    <small>MEMORABLE EXPERIENCES</small>
                </div>
            </section>


            {/* Statistics Cards */}
            <section className="dashboard-stats">

                {/* Total Tours */}
                <div
                    className="dashboard-card tour-card"
                    onClick={() => navigate("/tours")}
                >
                    <div className="stat-card-top">
                        <div className="stat-icon">
                            🛕
                        </div>

                        <div className="stat-arrow">
                            →
                        </div>
                    </div>

                    <div className="stat-number">
                        {dashboard.totalTours}
                    </div>

                    <div className="stat-title">
                        Total Tours
                    </div>



                    <div className="card-wave"></div>
                </div>


                {/* Total Bookings */}
                <div
                    className="dashboard-card booking-card"
                    onClick={() => navigate("/bookings")}
                >
                    <div className="stat-card-top">
                        <div className="stat-icon">
                            👥
                        </div>

                        <div className="stat-arrow">
                            →
                        </div>
                    </div>

                    <div className="stat-number">
                        {dashboard.totalBookings}
                    </div>

                    <div className="stat-title">
                        Total Bookings
                    </div>



                    <div className="card-wave"></div>
                </div>


                {/* Pending Bookings */}
                <div
                    className="dashboard-card pending-card"
                    onClick={() => navigate("/bookings?status=Pending")}
                >
                    <div className="stat-card-top">
                        <div className="stat-icon">
                            🕐
                        </div>

                        <div className="stat-arrow">
                            →
                        </div>
                    </div>

                    <div className="stat-number">
                        {dashboard.pendingBookings}
                    </div>

                    <div className="stat-title">
                        Pending Bookings
                    </div>


                    <div className="card-wave"></div>
                </div>


                {/* Customer Experiences */}
                <div
                    className="dashboard-card experience-card"
                    onClick={() => navigate("/experiences")}
                >    <div className="stat-card-top">
                        <div className="stat-icon">
                            ☆
                        </div>

                        <div className="stat-arrow">
                            →
                        </div>
                    </div>

                    <div className="stat-number">
                        {dashboard.totalExperiences}
                    </div>

                    <div className="stat-title">
                        Customer Experiences
                    </div>



                    <div className="card-wave"></div>
                </div>

            </section>


            {/* Bottom Decorative Area */}
            <section className="dashboard-bottom">
                <div className="bottom-quote">
                    <span>ॐ</span>
                    <p>
                        Travel • Explore • Experience
                    </p>
                </div>

                <div className="bottom-decoration">
                    🏔️ &nbsp; 🛕
                </div>
            </section>

        </div>
    );
}

export default Dashboard;