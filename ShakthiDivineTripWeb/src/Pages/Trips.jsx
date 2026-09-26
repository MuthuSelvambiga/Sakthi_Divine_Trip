import { useEffect, useState } from "react";
import PastTripCard from "../Components/PastTripCard";
import { getPastTours, getTourDetails } from "../Services/api";

function Trips() {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadPastTours = async () => {
            try {
                const pastTours = await getPastTours();

                const toursWithDetails = await Promise.all(
                    pastTours.map(async (tour) => {
                        try {
                            const details = await getTourDetails(tour.tourId);

                            return {
                                ...tour,
                                ...details
                            };
                        } catch (error) {
                            console.error(
                                `Failed to load details for tour ${tour.tourId}`,
                                error
                            );

                            return tour;
                        }
                    })
                );

                setTours(toursWithDetails);
            } catch (err) {
                console.error(err);
                setError("Unable to load past trips.");
            } finally {
                setLoading(false);
            }
        };

        loadPastTours();
    }, []);

    return (
        <main className="trips-page">

            {/* Page Header */}
            <section className="trips-hero">
                <span>OUR JOURNEYS</span>

                <h1>Memories From Our Divine Journeys</h1>

                <p>
                    Explore the spiritual journeys we have completed
                    with our travelers and discover their experiences.
                </p>
            </section>

            {/* Completed Trips */}
            <section className="past-trips-section">

                <div className="trips-section-heading">
                    <span>COMPLETED JOURNEYS</span>

                    <h2>Our Past Trips</h2>

                    <p>
                        Every journey is a memory, every destination a blessing.
                    </p>
                </div>

                {loading && (
                    <p className="tour-message">
                        Loading past trips...
                    </p>
                )}

                {error && (
                    <p className="tour-message error">
                        {error}
                    </p>
                )}

                {!loading && !error && tours.length === 0 && (
                    <p className="tour-message">
                        No past trips available.
                    </p>
                )}

                {!loading && !error && tours.length > 0 && (
                    <div className="past-trips-grid">
                        {tours.map((tour) => (
                            <PastTripCard
                                key={tour.tourId}
                                tour={tour}
                            />
                        ))}
                    </div>
                )}

            </section>

            {/* Customer Experiences */}
            {!loading &&
                !error &&
                tours.some(
                    (tour) =>
                        tour.experiences &&
                        tour.experiences.length > 0
                ) && (

                    <section className="past-experiences-section">

                        <div className="trips-section-heading">
                            <span>TRAVELER EXPERIENCES</span>

                            <h2>What Our Travelers Say</h2>

                            <p>
                                Real experiences shared by devotees who
                                travelled with Sakthi Divine Trip.
                            </p>
                        </div>

                        <div className="past-experiences-grid">

                            {tours.flatMap(
                                (tour) =>
                                    tour.experiences?.map(
                                        (experience) => (
                                            <article
                                                className="past-experience-card"
                                                key={experience.experienceId}
                                            >

                                                <div className="experience-stars">
                                                    {"★".repeat(
                                                        experience.rating || 5
                                                    )}
                                                </div>

                                                {experience.experienceTitle && (
                                                    <h3>
                                                        {experience.experienceTitle}
                                                    </h3>
                                                )}

                                                <p>
                                                    {experience.experienceText}
                                                </p>

                                                <strong>
                                                    — {experience.customerName}
                                                </strong>

                                                <span>
                                                    {tour.tourName}
                                                </span>

                                            </article>
                                        )
                                    ) || []
                            )}

                        </div>

                    </section>
                )}

        </main>
    );
}

export default Trips;