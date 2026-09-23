import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Tours() {
    const navigate = useNavigate();
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadTours = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5066/api/Tours"
                );

                if (!response.ok) {
                    throw new Error("Failed to load tours.");
                }

                const data = await response.json();

                setTours(data);
            } catch (error) {
                console.error(error);
                setError("Unable to load tours.");
            } finally {
                setLoading(false);
            }
        };

        loadTours();
    }, []);
    const handleDeactivate = async (tourId) => {

        const confirmDeactivate = window.confirm(
            "Are you sure you want to deactivate this tour?"
        );

        if (!confirmDeactivate) {
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5066/api/Tours/${tourId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                const message = await response.text();
                throw new Error(message || "Failed to deactivate tour.");
            }

            alert("Tour deactivated successfully.");

            // Reload the tour list
            window.location.reload();

        } catch (error) {
            console.error("Deactivate tour error:", error);
            alert(error.message);
        }
    };
    const handleActivate = async (tourId) => {

        const confirmActivate = window.confirm(
            "Are you sure you want to activate this tour?"
        );

        if (!confirmActivate) {
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5066/api/Tours/${tourId}/activate`,
                {
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                const message = await response.text();
                throw new Error(message || "Failed to activate tour.");
            }

            alert("Tour activated successfully.");

            window.location.reload();

        } catch (error) {
            console.error("Activate tour error:", error);
            alert(error.message);
        }
    };
    return (
        <div className="tours-page">

            {/* Page Header */}



            <div className="page-header">
                <div>
                    <h1>Tours</h1>
                    <p>Manage and organize your Sakthi Divine Trip tours.</p>
                </div>

                <button
                    className="primary-button"
                    onClick={() => navigate("/tours/add")}
                >
                    + Add Tour
                </button>
            </div>

            {/* Loading */}
            {loading && (
                <div className="page-loading">
                    Loading tours...
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="page-error">
                    {error}
                </div>
            )}

            {/* Empty */}
            {!loading && !error && tours.length === 0 && (
                <div className="empty-tours">
                    <h3>No tours found</h3>
                    <p>Add a tour to get started.</p>
                </div>
            )}

            {/* Tours */}
            {!loading && !error && tours.length > 0 && (
                <div className="tours-card">

                    <div className="tours-card-header">
                        <div>
                            <h2>All Tours</h2>
                            <p>View and manage your available trips.</p>
                        </div>

                        <div className="tour-count">
                            {tours.length} Tours
                        </div>
                    </div>

                    <div className="tour-table-wrapper">

                        <table className="tour-table">

                            <thead>
                                <tr>
                                    <th>Tour</th>
                                    <th>Location</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Price</th>
                                    <th>Seats</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {tours.map((tour) => (

                                    <tr key={tour.tourId}>

                                        <td>
                                            <div className="tour-name">
                                                {tour.tourName}
                                            </div>
                                        </td>

                                        <td>
                                            <div className="tour-location">
                                                <span className="location-icon">
                                                    ●
                                                </span>
                                                {tour.location}
                                            </div>
                                        </td>

                                        <td>
                                            <span className="tour-date">
                                                {tour.startDate}
                                            </span>
                                        </td>

                                        <td>
                                            <span className="tour-date">
                                                {tour.endDate || "-"}
                                            </span>
                                        </td>

                                        <td>
                                            <strong className="tour-price">
                                                ₹{tour.price}
                                            </strong>
                                        </td>

                                        <td>
                                            <span className="tour-seats">
                                                {tour.availableSeats}
                                            </span>
                                        </td>

                                        <td>
                                            <span
                                                className={
                                                    tour.isActive
                                                        ? "tour-status-active"
                                                        : "tour-status-inactive"
                                                }
                                            >
                                                <span className="status-dot"></span>

                                                {tour.isActive
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="tour-actions">

                                                <button
                                                    className="edit-tour-button"
                                                    onClick={() =>
                                                        navigate(
                                                            `/tours/edit/${tour.tourId}`
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                {tour.isActive ? (

                                                    <button
                                                        className="deactivate-tour-button"
                                                        onClick={() =>
                                                            handleDeactivate(
                                                                tour.tourId
                                                            )
                                                        }
                                                    >
                                                        Deactivate
                                                    </button>

                                                ) : (

                                                    <button
                                                        className="activate-tour-button"
                                                        onClick={() =>
                                                            handleActivate(
                                                                tour.tourId
                                                            )
                                                        }
                                                    >
                                                        Activate
                                                    </button>

                                                )}

                                            </div>
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>
            )}

        </div>
    );
}

export default Tours;