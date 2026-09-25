import { useEffect, useState } from "react";
import { getPublishedExperiences } from "../Services/api";

const IMAGE_BASE_URL =
    "https://sakthidivinetrip-api-dhdcfhdvdfewekau.westus3-01.azurewebsites.net";

function Gallery() {
    const [customerExperiences, setCustomerExperiences] = useState([]);

    const galleryItems = [
        {
            image: `${IMAGE_BASE_URL}/images/ecr_yatra.png`,
            title: "ECR Divine Temple Yatra",
            location: "Chennai - ECR"
        },
        {
            image: `${IMAGE_BASE_URL}/images/madurai_trip.png`,
            title: "Madurai Temple Journey",
            location: "Madurai"
        },
        {
            image: `${IMAGE_BASE_URL}/images/kanchi_trip.png`,
            title: "Kanchi Divine Journey",
            location: "Kanchipuram"
        }
    ];

    useEffect(() => {
        const loadCustomerExperiences = async () => {
            try {
                const data = await getPublishedExperiences();

                setCustomerExperiences(
                    data.filter(
                        (experience) => experience.photoPath
                    )
                );
            } catch (error) {
                console.error(
                    "Failed to load customer experiences:",
                    error
                );
            }
        };

        loadCustomerExperiences();
    }, []);

    return (
        <main className="gallery-page">

            <section className="gallery-hero">
                <span>OUR MEMORIES</span>

                <h1>Moments From Our Journeys</h1>

                <p>
                    A glimpse of the sacred places, beautiful journeys
                    and memorable moments shared with our travelers.
                </p>
            </section>

            <section className="gallery-section">

                <div className="gallery-heading">
                    <span>DIVINE JOURNEYS</span>
                    <h2>Travel. Pray. Remember.</h2>
                </div>

                <div className="gallery-grid">

                    {/* Existing Gallery Images */}

                    {galleryItems.map((item, index) => (
                        <div
                            className="gallery-card"
                            key={`gallery-${index}`}
                        >

                            <div className="gallery-image-wrapper">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                />
                            </div>

                            <div className="gallery-card-content">
                                <span>{item.location}</span>
                                <h3>{item.title}</h3>
                            </div>

                        </div>
                    ))}

                    {/* Customer Uploaded Photos */}

                    {customerExperiences.map((experience) => (
                        <div
                            className="gallery-card"
                            key={`experience-${experience.experienceId}`}
                        >

                            <div className="gallery-image-wrapper">
                                <img
                                    src={
                                        experience.photoPath.startsWith("http")
                                            ? experience.photoPath
                                            : `${IMAGE_BASE_URL}${experience.photoPath}`
                                    }
                                    alt={`${experience.customerName}'s travel experience`}
                                    onError={(e) => {
                                        e.currentTarget
                                            .closest(".gallery-card")
                                            .remove();
                                    }}
                                />
                            </div>

                            <div className="gallery-card-content">

                                <span>
                                    {experience.tourName ||
                                        "Traveler Experience"}
                                </span>

                                <h3>
                                    {experience.customerName}
                                </h3>

                            </div>

                        </div>
                    ))}

                </div>

            </section>

        </main>
    );
}

export default Gallery;