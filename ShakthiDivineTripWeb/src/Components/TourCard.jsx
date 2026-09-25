import { Link } from "react-router-dom";

function TourCard({ tour }) {

    const imageUrl = tour.coverImage || null;

    return (
        <div className="tour-card">

            {/* Tour Image */}
            <div className="tour-card-image">
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

            {/* Tour Details */}
            <div className="tour-card-content">

                <h3>{tour.tourName}</h3>

                <p className="tour-location">
                    📍 {tour.location}
                </p>

                <p className="tour-date">
                    📅 {tour.startDate}
                </p>

                <div className="tour-price">
                    From <strong>₹{tour.price}</strong>
                </div>

                {tour.isEarlyBirdActive &&
                    tour.earlyBirdPrice && (
                        <div className="early-bird">
                            Early Bird ₹{tour.earlyBirdPrice}
                        </div>
                    )}

                <div className="tour-actions">

                    <Link
                        className="tour-button"
                        to={`/tour/${tour.tourId}`}
                    >
                        View Details
                    </Link>

                    <a
                        className="whatsapp-button"
                        href={`https://wa.me/919566009530?text=${encodeURIComponent(
                            `Hi, I am interested in the ${tour.tourName} tour.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        WhatsApp
                    </a>

                </div>

            </div>

        </div>
    );
}

export default TourCard;