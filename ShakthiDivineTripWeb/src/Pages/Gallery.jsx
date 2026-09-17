const API_BASE_URL = "http://localhost:5066";

function Gallery() {
    const galleryItems = [
        {
            image: `${API_BASE_URL}/images/ecr_yatra.png`,
            title: "ECR Divine Temple Yatra",
            location: "Chennai - ECR"
        },
        {
            image: `${API_BASE_URL}/images/madurai_trip.png`,
            title: "Madurai Temple Journey",
            location: "Madurai"
        },
        {
            image: `${API_BASE_URL}/images/kanchi_trip.png`,
            title: "Kanchi Divine Journey",
            location: "Kanchipuram"
        }
    ];

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

                    {galleryItems.map((item, index) => (
                        <div className="gallery-card" key={index}>

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

                </div>

            </section>


            <section className="gallery-cta">

                <h2>Be Part of Our Next Journey</h2>

                <p>
                    Create your own divine memories with Sakthi Divine Trip.
                </p>

                <a
                    href="https://wa.me/YOUR_PHONE_NUMBER"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    WhatsApp Us
                </a>

            </section>

        </main>
    );
}

export default Gallery;