import { Link } from "react-router-dom";
import logo from "../assets/SDT_OFFLOGO.jpeg";

function Header() {
    return (
        <header className="header">
            <div className="header-container">

                <div className="brand">
                    <div className="brand-logo">
                        <img src={logo} alt="Shakthi Divine Trip Logo" />
                    </div>

                    <div className="brand-text">
                        <h2>Sakthi Divine Trip</h2>
                        <span>Explore • Pray • Reconnect</span>
                    </div>
                </div>

                <nav className="navigation">
                    <Link to="/">Home</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/trips">Our Trips</Link>
                    <Link to="/gallery">Gallery</Link>
                    <Link to="/contact">Contact</Link>
                </nav>

                <a
                    href="https://wa.me/919566009530?text=Hi%2C%20I%20am%20interested%20in%20booking%20a%20trip%20with%20Sakthi%20Divine%20Trip."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="book-button"
                >
                    Book Your Trip
                </a>

            </div>
        </header>
    );
}

export default Header;