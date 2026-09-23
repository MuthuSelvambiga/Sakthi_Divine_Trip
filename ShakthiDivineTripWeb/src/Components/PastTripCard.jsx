import { CalendarDays, MapPin, CheckCircle } from "lucide-react";

const API_BASE_URL = "http://localhost:5066";

function PastTripCard({ tour }) {

    const imageUrl = tour.coverImage
        ? tour.coverImage.startsWith("http")
            ? tour.coverImage
            : `${API_BASE_URL}${tour.coverImage.startsWith("/") ? "" : "/images/"}${tour.coverImage}`
        : null;

    const formatDate = (date) => {
        if (!date) return "";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    return (
        <article className="past-trip-card">

            {/* Trip Image */}
            <div className="past-trip-image">

                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={tour.tourName}
                    />
                ) : (
                    <div className="tour-image-placeholder">
                        No Image
                    </div>
                )}

            </div>

            {/* Trip Content */}
            <div className="past-trip-content">

                {/* Completed Badge */}
                <div className="completed-badge">
                    <CheckCircle className="completed-icon" size={18} />
                    <span>Completed Journey</span>
                </div>

                {/* Trip Name */}
                <h3>{tour.tourName}</h3>

                {/* Location & Date */}
                <div className="past-trip-meta">

                    <div className="past-trip-meta-item">
                        <MapPin size={17} className="meta-icon" />

                        <div>
                            <span className="past-trip-meta-label">
                                LOCATION
                            </span>

                            <span className="past-trip-meta-value">
                                {tour.location}
                            </span>
                        </div>
                    </div>

                    <div className="past-trip-meta-item">
                        <CalendarDays size={17} className="meta-icon" />

                        <div>
                            <span className="past-trip-meta-label">
                                TRAVEL DATE
                            </span>

                            <span className="past-trip-meta-value">
                                {formatDate(tour.startDate)}
                            </span>
                        </div>
                    </div>

                </div>

                {/* Description */}
                <p>
                    A memorable spiritual journey with Sakthi Divine Trip.
                </p>

            </div>

        </article>
    );
}

export default PastTripCard;