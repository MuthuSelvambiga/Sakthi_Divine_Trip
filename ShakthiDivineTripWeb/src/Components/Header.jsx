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
                    href="https://wa.me/YOUR_PHONE_NUMBER"
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