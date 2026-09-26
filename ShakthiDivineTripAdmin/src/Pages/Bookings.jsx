import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_BASE_URL } from "../config";

function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchParams] = useSearchParams();

    // Read status from URL
    const statusFromUrl = searchParams.get("status") || "";

    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState(statusFromUrl);

    const [showAddBooking, setShowAddBooking] = useState(false);
    const [tours, setTours] = useState([]);
    const [creatingBooking, setCreatingBooking] = useState(false);

    const [newBooking, setNewBooking] = useState({
        customerName: "",
        customerPhone: "",
        tourId: "",
        numberOfSeats: 1
    });

    const bookingsPerPage = 7;

    // Reset page whenever filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [statusFilter]);

    // Load active tours for Add Booking form
    useEffect(() => {
        const loadTours = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${API_BASE_URL}/Tours`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to load tours.");
                }
                const data = await response.json();
                setTours(data.filter((tour) => tour.isActive));
            } catch (error) {
                console.error("Load tours error:", error);
            }
        };
        loadTours();
    }, []);

    const handleCreateBooking = async (e) => {
        e.preventDefault();
        if (!newBooking.customerName.trim()) {
            alert("Customer name is required.");
            return;
        }
        if (!newBooking.customerPhone.trim()) {
            alert("Customer phone is required.");
            return;
        }
        if (!newBooking.tourId) {
            alert("Please select a tour.");
            return;
        }
        if (Number(newBooking.numberOfSeats) <= 0) {
            alert("Number of seats must be greater than 0.");
            return;
        }
        try {
            setCreatingBooking(true);
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_BASE_URL}/AdminBooking`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    tourId: Number(newBooking.tourId),
                    customerName: newBooking.customerName.trim(),
                    customerPhone: newBooking.customerPhone.trim(),
                    numberOfSeats: Number(newBooking.numberOfSeats)
                })
            });
            if (!response.ok) {
                const message = await response.text();
                throw new Error(message || "Failed to create booking.");
            }
            const createdBooking = await response.json();
            alert(`Booking created successfully.\nBooking ID: ${createdBooking.bookingId}\nStatus: Pending`);
            setNewBooking({
                customerName: "",
                customerPhone: "",
                tourId: "",
                numberOfSeats: 1
            });
            setShowAddBooking(false);
            const url = statusFilter
                ? `${API_BASE_URL}/AdminBooking?status=${statusFilter}`
                : `${API_BASE_URL}/AdminBooking`;
            const refreshResponse = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (refreshResponse.ok) {
                const refreshedData = await refreshResponse.json();
                setBookings(refreshedData);
            }
        } catch (error) {
            console.error("Create booking error:", error);
            alert(error.message);
        } finally {
            setCreatingBooking(false);
        }
    };

    // Load bookings
    useEffect(() => {
        const loadBookings = async () => {
            try {
                setLoading(true);
                setError("");

                const token = localStorage.getItem("token");

                // Only send status parameter when a specific status is selected
                const url = statusFilter
                    ? `${API_BASE_URL}/AdminBooking?status=${statusFilter}`
                    : `${API_BASE_URL}/AdminBooking`;

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
                `${API_BASE_URL}/AdminBooking/confirm/${bookingId}`,
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
                ? `${API_BASE_URL}/AdminBooking?status=${statusFilter}`
                : `${API_BASE_URL}/AdminBooking`;

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
                `${API_BASE_URL}/AdminBooking/cancel/${bookingId}?cancellationReason=${encodeURIComponent(
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
                ? `${API_BASE_URL}/AdminBooking?status=${statusFilter}`
                : `${API_BASE_URL}/AdminBooking`;

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
            <div className="page-header" style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                gap: "22px",
                marginBottom: "30px"
            }}>
                {/* Title */}
                <div style={{
                    textAlign: "center"
                }}>
                    <h1>Bookings</h1>
                    <p>View and manage customer tour bookings.</p>
                </div>

                {/* Actions row */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "20px",
                    width: "100%"
                }}>
                    <button
                        type="button"
                        onClick={() => setShowAddBooking(!showAddBooking)}
                        style={{
                            padding: "13px 22px",
                            border: "none",
                            borderRadius: "9px",
                            backgroundColor: "#f5c451",
                            color: "#5c1f1f",
                            fontWeight: "700",
                            fontSize: "15px",
                            cursor: "pointer",
                            boxShadow: "0 3px 8px rgba(0,0,0,0.08)"
                        }}
                    >
                        + Add Booking
                    </button>

                    <div
                        className="booking-filter"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px"
                        }}
                    >
                        <label style={{
                            fontWeight: "700",
                            color: "#28153d",
                            whiteSpace: "nowrap"
                        }}>
                            Booking Status
                        </label>

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

                {showAddBooking && (
                    <div
                        style={{
                            position: "fixed",
                            inset: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.45)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 1000,
                            padding: "20px"
                        }}
                        onClick={() => setShowAddBooking(false)}
                    >
                        <div
                            style={{
                                width: "100%",
                                maxWidth: "560px",
                                backgroundColor: "#ffffff",
                                borderRadius: "16px",
                                padding: "30px",
                                boxShadow: "0 15px 40px rgba(0,0,0,0.25)"
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >

                            {/* Modal Header */}
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "8px"
                                }}
                            >
                                <h2
                                    style={{
                                        margin: 0,
                                        color: "#7d2525",
                                        fontSize: "24px"
                                    }}
                                >
                                    Add WhatsApp Booking
                                </h2>

                                <button
                                    type="button"
                                    onClick={() => setShowAddBooking(false)}
                                    style={{
                                        border: "none",
                                        background: "transparent",
                                        fontSize: "24px",
                                        cursor: "pointer",
                                        color: "#777"
                                    }}
                                >
                                    ×
                                </button>
                            </div>

                            <p
                                style={{
                                    marginTop: "5px",
                                    marginBottom: "25px",
                                    color: "#666"
                                }}
                            >
                                Enter the booking details received from the customer on WhatsApp.
                            </p>

                            <form onSubmit={handleCreateBooking}>

                                {/* Customer Name */}
                                <div style={{ marginBottom: "18px" }}>
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "7px",
                                            fontWeight: "600"
                                        }}
                                    >
                                        Customer Name
                                    </label>

                                    <input
                                        type="text"
                                        value={newBooking.customerName}
                                        onChange={(e) =>
                                            setNewBooking({
                                                ...newBooking,
                                                customerName: e.target.value
                                            })
                                        }
                                        placeholder="Enter customer name"
                                        style={{
                                            width: "100%",
                                            padding: "11px 12px",
                                            border: "1px solid #ddd",
                                            borderRadius: "7px",
                                            boxSizing: "border-box"
                                        }}
                                    />
                                </div>

                                {/* Customer Phone */}
                                <div style={{ marginBottom: "18px" }}>
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "7px",
                                            fontWeight: "600"
                                        }}
                                    >
                                        Customer Phone
                                    </label>

                                    <input
                                        type="text"
                                        value={newBooking.customerPhone}
                                        onChange={(e) =>
                                            setNewBooking({
                                                ...newBooking,
                                                customerPhone: e.target.value
                                            })
                                        }
                                        placeholder="Enter phone number"
                                        style={{
                                            width: "100%",
                                            padding: "11px 12px",
                                            border: "1px solid #ddd",
                                            borderRadius: "7px",
                                            boxSizing: "border-box"
                                        }}
                                    />
                                </div>

                                {/* Tour */}
                                <div style={{ marginBottom: "18px" }}>
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "7px",
                                            fontWeight: "600"
                                        }}
                                    >
                                        Tour
                                    </label>

                                    <select
                                        value={newBooking.tourId}
                                        onChange={(e) =>
                                            setNewBooking({
                                                ...newBooking,
                                                tourId: e.target.value
                                            })
                                        }
                                        style={{
                                            width: "100%",
                                            padding: "11px 12px",
                                            border: "1px solid #ddd",
                                            borderRadius: "7px",
                                            boxSizing: "border-box",
                                            backgroundColor: "#fff"
                                        }}
                                    >
                                        <option value="">
                                            Select Tour
                                        </option>

                                        {tours.map((tour) => (
                                            <option
                                                key={tour.tourId}
                                                value={tour.tourId}
                                            >
                                                {tour.tourName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Seats */}
                                <div style={{ marginBottom: "20px" }}>
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "7px",
                                            fontWeight: "600"
                                        }}
                                    >
                                        Number of Seats
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        value={newBooking.numberOfSeats}
                                        onChange={(e) =>
                                            setNewBooking({
                                                ...newBooking,
                                                numberOfSeats: e.target.value
                                            })
                                        }
                                        style={{
                                            width: "100%",
                                            padding: "11px 12px",
                                            border: "1px solid #ddd",
                                            borderRadius: "7px",
                                            boxSizing: "border-box"
                                        }}
                                    />
                                </div>

                                {/* Status */}
                                <div
                                    style={{
                                        backgroundColor: "#fff8df",
                                        borderRadius: "8px",
                                        padding: "14px",
                                        marginBottom: "25px"
                                    }}
                                >
                                    <strong>Booking Status: Pending</strong>

                                    <div
                                        style={{
                                            marginTop: "5px",
                                            color: "#666",
                                            fontSize: "14px"
                                        }}
                                    >
                                        Price and total amount will be calculated automatically.
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        gap: "10px"
                                    }}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setShowAddBooking(false)}
                                        disabled={creatingBooking}
                                        style={{
                                            padding: "10px 20px",
                                            border: "1px solid #ccc",
                                            borderRadius: "7px",
                                            backgroundColor: "#fff",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={creatingBooking}
                                        style={{
                                            padding: "10px 20px",
                                            border: "none",
                                            borderRadius: "7px",
                                            backgroundColor: "#7d2525",
                                            color: "#fff",
                                            fontWeight: "600",
                                            cursor: "pointer"
                                        }}
                                    >
                                        {creatingBooking
                                            ? "Creating..."
                                            : "Create Booking"}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                )}
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
                            {bookings.length}{" "}
                            {bookings.length === 1 ? "Booking" : "Bookings"}
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

                                            {/* Pending → Confirm + Cancel */}
                                            {booking.bookingStatus === "Pending" && (
                                                <>
                                                    <button
                                                        className="confirm-booking-button"
                                                        onClick={() => handleConfirm(booking.bookingId)}
                                                    >
                                                        Confirm
                                                    </button>

                                                    <button
                                                        className="cancel-booking-button"
                                                        onClick={() => handleCancel(booking.bookingId)}
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            )}

                                            {/* Confirmed → Cancel only */}
                                            {booking.bookingStatus === "Confirmed" && (
                                                <button
                                                    className="cancel-booking-button"
                                                    onClick={() => handleCancel(booking.bookingId)}
                                                >
                                                    Cancel
                                                </button>
                                            )}

                                            {/* Cancelled → no action */}
                                            {booking.bookingStatus === "Cancelled" && (
                                                <span className="no-action">—</span>
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
