function About() {
    return (
        <main className="about-page">

            {/* About Hero */}

            <section className="about-hero">

                <span>ABOUT SAKTHI DIVINE TRIP</span>

                <h1>
                    Meaningful Journeys.
                    <br />
                    Divine Experiences.
                </h1>

                <p>
                    Discover thoughtfully planned spiritual journeys that
                    bring together devotion, comfort and memorable experiences.
                </p>

            </section>


            {/* About Content */}

            <section className="about-main">

                <div className="about-intro">

                    <span className="about-section-label">
                        WHO WE ARE
                    </span>

                    <h2>
                        Your Journey to Faith,
                        <br />
                        Comfort & Peace
                    </h2>

                    <p>
                        <strong>Sakthi Divine Trip</strong> is a spiritual
                        travel company dedicated to organizing comfortable
                        and meaningful pilgrimage journeys across India.
                    </p>

                    <p>
                        We offer well-planned temple tours, devotional trips,
                        and customized spiritual journeys with reliable
                        transportation, quality accommodation, and
                        personalized service.
                    </p>

                    <p>
                        Our mission is to provide every devotee with a safe,
                        peaceful, and memorable pilgrimage experience.
                    </p>

                </div>


                {/* Why Choose Us */}

                <div className="about-why">

                    <span className="about-section-label">
                        WHY CHOOSE US
                    </span>

                    <h2>
                        Travel With Trust
                    </h2>

                    <div className="about-values">

                        <div className="about-value">

                            <div className="about-value-icon">
                                🛕
                            </div>

                            <div>
                                <h3>Spiritual Journeys</h3>

                                <p>
                                    Carefully planned pilgrimages to sacred
                                    temples and destinations.
                                </p>
                            </div>

                        </div>


                        <div className="about-value">

                            <div className="about-value-icon">
                                🚌
                            </div>

                            <div>
                                <h3>Comfortable Travel</h3>

                                <p>
                                    Reliable transportation, food and support
                                    throughout your journey.
                                </p>
                            </div>

                        </div>


                        <div className="about-value">

                            <div className="about-value-icon">
                                🤝
                            </div>

                            <div>
                                <h3>Personal Service</h3>

                                <p>
                                    Friendly assistance to make every
                                    pilgrimage smooth and stress-free.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* Closing CTA */}

            <section className="about-cta">

                <h2>
                    Your Next Divine Journey Awaits
                </h2>

                <p>
                    Travel with faith, discover sacred places and create
                    memories that stay with you.
                </p>

            </section>

        </main>
    );
}

export default About;