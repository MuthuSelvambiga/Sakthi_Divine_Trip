import SDTLogo from "../assets/SDT_LOGO.jpeg";

function Hero() {
    return (
        <section className="hero">

            {/* Left corner artwork */}
            <img
                src={SDTLogo}
                alt=""
                className="hero-decoration hero-decoration-left"
            />

            {/* Right corner artwork */}
            <img
                src={SDTLogo}
                alt=""
                className="hero-decoration hero-decoration-right"
            />

            <div className="hero-content">

                <p className="hero-subtitle">
                    Sacred Journeys • Divine Blessings • Unforgettable Experiences
                </p>

                <h1>
                    Sakthi Divine Trip
                </h1>

                <h2>
                    Sacred Journeys&nbsp; | &nbsp;Divine Blessings&nbsp; | &nbsp;Unforgettable Experiences
                </h2>

                <p className="hero-description">
                    Discover the divine side of life through
                    <br />
                    our carefully curated temple trips.
                </p>

                <a href="#tours" className="primary-button">
                    Explore Our Trips →
                </a>

            </div>

        </section>
    );
}

export default Hero;