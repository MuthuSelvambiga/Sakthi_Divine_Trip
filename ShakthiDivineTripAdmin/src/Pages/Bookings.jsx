import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchParams] = useSearchParams();

    // Read status from URL
    const statusFromUrl = searchParams.get("status") || "";

    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState(statusFromUrl);

    const bookingsPerPage = 7;

    // Reset page whenever filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [statusFilter]);

    // Load bookings
    useEffect(() => {
        const loadBookings = async () => {
            try {
                setLoading(true);
                setError("");

                const token = localStorage.getItem("token");

                // Only send status parameter when a specific status is selected
                const url = statusFilter
                    ? `http://localhost:5066/api/AdminBooking?status=${statusFilter}`
                    : "http://localhost:5066/api/AdminBooking";

                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to load bookings.");
                }

                const data = await response.json();

                setBookings(data);
            } catch (error) {
                console.error("Load bookings error:", error);
                setError("Unable to load bookings.");
            } finally {
                setLoading(false);
            }
        };

        loadBookings();
    }, [statusFilter]);

    const totalPages = Math.ceil(
        bookings.length / bookingsPerPage
    );

    const startIndex =
        (currentPage - 1) * bookingsPerPage;

    const currentBookings = bookings.slice(
        startIndex,
        startIndex + bookingsPerPage
    );

    // Confirm booking
    const handleConfirm = async (bookingId) => {
        const confirmAction = window.confirm(
            "Are you sure you want to confirm this booking?"
        );

        if (!confirmAction) return;

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5066/api/AdminBooking/confirm/${bookingId}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                const message = await response.text();

                throw new Error(
                    message || "Failed to confirm booking."
                );
            }

            alert("Booking confirmed successfully.");

            // Reload filtered data
            const url = statusFilter
                ? `http://localhost:5066/api/AdminBooking?status=${statusFilter}`
                : "http://localhost:5066/api/AdminBooking";

            const refreshResponse = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const refreshedData = await refreshResponse.json();

            setBookings(refreshedData);

        } catch (error) {
            console.error("Confirm booking error:", error);
            alert(error.message);
        }
    };

    // Cancel booking
    const handleCancel = async (bookingId) => {
        const cancellationReason = window.prompt(
            "Enter cancellation reason:"
        );

        if (
            !cancellationReason ||
            !cancellationReason.trim()
        ) {
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5066/api/AdminBooking/cancel/${bookingId}?cancellationReason=${encodeURIComponent(
                    cancellationReason.trim()
                )}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                const message = await response.text();

                throw new Error(
                    message || "Failed to cancel booking."
                );
            }

            const updatedBooking = await response.json();

            alert(
                `Booking cancelled successfully.\nRefund: ₹${updatedBooking.refundAmount}`
            );

            // Reload filtered data
            const url = statusFilter
                ? `http://localhost:5066/api/AdminBooking?status=${statusFilter}`
                : "http://localhost:5066/api/AdminBooking";

            const refreshResponse = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const refreshedData = await refreshResponse.json();

            setBookings(refreshedData);

        } catch (error) {
            console.error("Cancel booking error:", error);
            alert(error.message);
        }
    };

    return (
        <div className="bookings-page">

            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h1>Bookings</h1>
                    <p>View and manage customer tour bookings.</p>
                </div>

                <div className="booking-filter">
                    <label>Booking Status</label>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Bookings</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Booking Table */}
            {!loading && !error && bookings.length > 0 && (
                <div className="booking-table-card">

                    <div className="booking-table-header">
                        <div>
                            <h2>All Bookings</h2>
                            <p>Manage customer reservations and booking status.</p>
                        </div>

                        <span className="booking-count">
                            {bookings.length} Bookings
                        </span>
                    </div>

                    <div className="booking-table-wrapper">
                        <table className="booking-table">
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Phone</th>
                                    <th>Tour</th>
                                    <th>Seats</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Booking Date</th>
                                    <th className="actions-column">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentBookings.map((booking) => (
                                    <tr key={booking.bookingId}>

                                        <td className="customer-name">
                                            {booking.customerName}
                                        </td>

                                        <td>
                                            {booking.customerPhone}
                                        </td>

                                        <td>
                                            {booking.tourName}
                                        </td>

                                        <td className="center-cell">
                                            {booking.numberOfSeats}
                                        </td>

                                        <td className="amount-cell">
                                            ₹{booking.totalAmount}
                                        </td>

                                        <td>
                                            <span
                                                className={`booking-status ${booking.bookingStatus
                                                    .toLowerCase()
                                                    }`}
                                            >
                                                <span className="status-dot"></span>
                                                {booking.bookingStatus}
                                            </span>
                                        </td>

                                        <td>
                                            {new Date(
                                                booking.bookingDate
                                            ).toLocaleDateString("en-IN")}
                                        </td>

                                        <td className="actions-cell">
                                            {booking.bookingStatus !== "Cancelled" && (
                                                <button
                                                    className="cancel-booking-button"
                                                    onClick={() =>
                                                        handleCancel(booking.bookingId)
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                            )}

                                            {booking.bookingStatus === "Cancelled" && (
                                                <span className="no-action">
                                                    —
                                                </span>
                                            )}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="booking-pagination">
                        <button
                            disabled={currentPage === 1}
                            onClick={() =>
                                setCurrentPage((page) => page - 1)
                            }
                        >
                            Previous
                        </button>

                        <span>
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() =>
                                setCurrentPage((page) => page + 1)
                            }
                        >
                            Next
                        </button>
                    </div>

                </div>
            )}

            {!loading && !error && bookings.length === 0 && (
                <div className="empty-bookings">
                    <h3>No bookings found</h3>
                    <p>There are no bookings for the selected status.</p>
                </div>
            )}

            {loading && (
                <p className="booking-loading">Loading bookings...</p>
            )}

            {error && (
                <p className="booking-error">{error}</p>
            )}

        </div>
    );
}

export default Bookings;