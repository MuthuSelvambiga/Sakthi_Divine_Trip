import { useEffect, useState } from "react";
import {
    Bus,
    Utensils,
    Coffee,
    Droplets,
    UserRound,
    MapPin
} from "lucide-react";
import { useParams } from "react-router-dom";
import { getTourDetails } from "../Services/api";

const IMAGE_BASE_URL =
    "https://sakthidivinetrip-api-dhdcfhdvdfewekau.westus3-01.azurewebsites.net";

function TourDetails() {
    const { id } = useParams();

    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadTourDetails = async () => {
            try {
                const data = await getTourDetails(id);
                setTour(data);
            } catch (err) {
                console.error(err);
                setError("Unable to load tour details.");
            } finally {
                setLoading(false);
            }
        };

        loadTourDetails();
    }, [id]);

    if (loading) {
        return <p className="tour-message">Loading tour details...</p>;
    }

    if (error) {
        return <p className="tour-message error">{error}</p>;
    }

    if (!tour) {
        return <p className="tour-message">Tour not found.</p>;
    }

    const imageUrl = tour.coverImage
        ? tour.coverImage.startsWith("http")
            ? tour.coverImage
            : `${IMAGE_BASE_URL}/images/${tour.coverImage}`
        : null;

    const formatDate = (date) => {
        if (!date) return "";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const isPastTrip = tour && new Date(tour.startDate) < new Date();

    const getInclusionIcon = (text) => {
        const value = text.toLowerCase();

        if (value.includes("bus")) {
            return <Bus size={22} strokeWidth={1.8} />;
        }

        if (
            value.includes("food") ||
            value.includes("breakfast") ||
            value.includes("lunch") ||
            value.includes("dinner")
        ) {
            return <Utensils size={22} strokeWidth={1.8} />;
        }

        if (value.includes("tea")) {
            return <Coffee size={22} strokeWidth={1.8} />;
        }

        if (value.includes("water")) {
            return <Droplets size={22} strokeWidth={1.8} />;
        }

        if (value.includes("guide")) {
            return <UserRound size={22} strokeWidth={1.8} />;
        }

        if (value.includes("sightseeing")) {
            return <MapPin size={22} strokeWidth={1.8} />;
        }

        return <MapPin size={22} strokeWidth={1.8} />;
    };

    return (
        <main className="tour-details-page">

            {/* Breadcrumb */}
            <div className="tour-breadcrumb">
                Home <span>›</span> Our Trips <span>›</span> {tour.tourName}
            </div>

            {/* Main Tour Header */}
            <section className="tour-details-top">

                {/* Image */}
                <div className="tour-details-image-wrapper">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={tour.tourName}
                            className="tour-details-image"
                        />
                    ) : (
                        <div className="tour-image-placeholder">
                            No Image
                        </div>
                    )}
                </div>

                {/* Tour Information */}
                <div className="tour-details-summary">

                    <span className="tour-details-label">
                        DIVINE JOURNEY
                    </span>

                    <h1>{tour.tourName}</h1>

                    <p className="tour-details-location">
                        📍 {tour.location}
                    </p>

                    <div className="tour-details-meta">

                        <div>
                            <span>DATE</span>
                            <strong>
                                {formatDate(tour.startDate)}
                                {tour.endDate &&
                                    ` - ${formatDate(tour.endDate)}`}
                            </strong>
                        </div>

                        <div>
                            <span>DURATION</span>
                            <strong>{tour.durationDays} Days</strong>
                        </div>

                        {!isPastTrip && (
                            <div>
                                <span>SEATS AVAILABLE</span>
                                <strong>{tour.availableSeats}</strong>
                            </div>
                        )}

                    </div>

                    {!isPastTrip && (
                        <div className="tour-details-price-box">

                            <span>Starting from</span>

                            <div className="tour-details-price">
                                ₹{tour.price}
                            </div>

                            <small>per person</small>

                            {tour.isEarlyBirdActive &&
                                tour.earlyBirdPrice && (
                                    <div className="tour-details-early-bird">
                                        Early Bird ₹{tour.earlyBirdPrice}
                                    </div>
                                )}

                        </div>
                    )}

                    {!isPastTrip && (
                        <div className="tour-details-actions">

                            <a
                                className="tour-whatsapp-button"
                                href={`https://wa.me/919566009530?text=${encodeURIComponent(
                                    `Hi, I am interested in the ${tour.tourName} tour.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Book This Trip on WhatsApp
                            </a>

                        </div>
                    )}

                </div>
            </section>

            {/* About */}
            <section className="tour-details-section">

                <h2>About This Divine Journey</h2>

                <p className="tour-details-description">
                    {tour.description}
                </p>

            </section>

            {/* Inclusions */}
            {tour.inclusions && tour.inclusions.length > 0 && (
                <section className="tour-details-section">

                    <h2>What's Included</h2>

                    <div className="tour-inclusions-grid">

                        {tour.inclusions.map((item) => (
                            <div
                                className="tour-inclusion-item"
                                key={item.inclusionId}
                            >

                                <span className="inclusion-icon">
                                    {getInclusionIcon(item.inclusionText)}
                                </span>

                                <p>{item.inclusionText}</p>

                            </div>
                        ))}

                    </div>

                </section>
            )}

            {/* Itinerary */}
            {tour.itinerary && tour.itinerary.length > 0 && (
                <section className="tour-details-section">

                    <h2>Tour Itinerary</h2>

                    <div className="tour-itinerary">

                        {tour.itinerary.map((item) => (
                            <div
                                className="itinerary-item"
                                key={item.itineraryId}
                            >

                                <div className="itinerary-day">
                                    {item.eventTime
                                        ? new Date(
                                            `1970-01-01T${item.eventTime}`
                                        ).toLocaleTimeString("en-IN", {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })
                                        : "—"}
                                </div>

                                <div>

                                    <span className="itinerary-type">
                                        {item.activityType}
                                    </span>

                                    <h3>{item.title}</h3>

                                    {item.description && (
                                        <p>{item.description}</p>
                                    )}

                                </div>

                            </div>
                        ))}

                    </div>

                </section>
            )}

            {/* Customer Experiences */}
            {tour.experiences && tour.experiences.length > 0 && (
                <section className="tour-details-section">

                    <div className="experience-heading">
                        <span>CUSTOMER STORIES</span>
                        <h2>Experiences From Our Travelers</h2>
                    </div>

                    <div className="experiences-grid">

                        {tour.experiences.map((experience) => (
                            <div
                                className="experience-card"
                                key={experience.experienceId}
                            >

                                <div className="experience-rating">
                                    {"★".repeat(experience.rating)}
                                </div>

                                <h3>
                                    {experience.experienceTitle}
                                </h3>

                                <p>
                                    "{experience.experienceText}"
                                </p>

                                <strong>
                                    — {experience.customerName}
                                </strong>

                            </div>
                        ))}

                    </div>

                </section>
            )}

        </main>
    );
}

export default TourDetails;