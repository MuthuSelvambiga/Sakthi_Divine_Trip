import { useEffect, useState } from "react";
import { getPastTours } from "../Services/api";

function Contact() {
    const [pastTours, setPastTours] = useState([]);

    const [formData, setFormData] = useState({
        customerName: "",
        customerPhone: "",
        tourId: "",
        rating: "",
        experienceText: "",
        photo: null
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();

            formDataToSend.append("customerName", formData.customerName);
            formDataToSend.append("tourId", formData.tourId);
            formDataToSend.append("rating", formData.rating);
            formDataToSend.append(
                "experienceTitle",
                "Traveler Experience"
            );
            formDataToSend.append(
                "experienceText",
                formData.experienceText
            );

            // Photo is optional
            if (formData.photo) {
                formDataToSend.append("photo", formData.photo);
            }

            const response = await fetch(
                "http://localhost:5066/api/CustomerExp",
                {
                    method: "POST",
                    body: formDataToSend
                }
            );

            const responseText = await response.text();

            if (!response.ok) {
                throw new Error(
                    responseText || "Failed to submit feedback."
                );
            }

            alert("Thank you! Your experience has been submitted.");

            setFormData({
                customerName: "",
                customerPhone: "",
                tourId: "",
                rating: "",
                experienceText: "",
                photo: null
            });

        } catch (error) {
            console.error("Feedback submission failed:", error);

            alert(
                error.message ||
                "Unable to submit feedback. Please try again."
            );
        }
    };

    useEffect(() => {
        const loadPastTours = async () => {
            try {
                const data = await getPastTours();
                setPastTours(data);
            } catch (error) {
                console.error("Failed to load past tours:", error);
            }
        };

        loadPastTours();
    }, []);

    return (
        <main className="contact-page">

            <section className="contact-hero">
                <span>GET IN TOUCH</span>

                <h1>We're Here to Help</h1>

                <p>
                    Have questions about our spiritual journeys?
                    Planning your next temple trip? Get in touch with us.
                </p>
            </section>

            <section className="contact-main">

                <div className="contact-info">

                    <span className="contact-label">
                        CONTACT SAKTHI DIVINE TRIP
                    </span>

                    <h2>
                        Let’s Plan Your
                        <br />
                        Divine Journey
                    </h2>

                    <p>
                        Our team is happy to help you with tour details,
                        availability, pickup information and booking assistance.
                    </p>

                    <div className="contact-item">
                        <div className="contact-icon">📞</div>

                        <div>
                            <h3>Phone</h3>
                            <p>+91 95660 09530</p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-icon">💬</div>

                        <div>
                            <h3>WhatsApp</h3>
                            <a
                                href="https://wa.me/919566009530?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20your%20trips."
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Chat with us for booking assistance
                            </a>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-icon">📧</div>

                        <div>
                            <h3>Email</h3>
                            <p>sakthidivinetrip@gmail.com</p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-icon">📍</div>

                        <div>
                            <h3>Location</h3>
                            <p>Chennai, Tamil Nadu</p>
                        </div>
                    </div>

                </div>

                <div className="contact-card">

                    <h2>Share Your Experience</h2>

                    <p>
                        Have you travelled with Sakthi Divine Trip?
                        We would love to hear about your experience.
                    </p>

                    <form onSubmit={handleSubmit}>

                        <label>Name</label>

                        <input
                            type="text"
                            name="customerName"
                            placeholder="Your name"
                            value={formData.customerName}
                            onChange={handleChange}
                            required
                        />

                        <label>Phone Number</label>

                        <input
                            type="tel"
                            name="customerPhone"
                            placeholder="Your phone number"
                            value={formData.customerPhone}
                            onChange={handleChange}
                            required
                        />

                        <div className="form-group">

                            <label>Which trip did you travel with?</label>

                            <select
                                name="tourId"
                                value={formData.tourId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select your trip
                                </option>

                                {pastTours.map((tour) => (
                                    <option
                                        key={tour.tourId}
                                        value={tour.tourId}
                                    >
                                        {tour.tourName}
                                    </option>
                                ))}
                            </select>

                        </div>

                        <div className="form-group">

                            <label>
                                How would you rate your experience?
                            </label>

                            <select
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select rating
                                </option>

                                <option value="5">
                                    ★★★★★ Excellent
                                </option>

                                <option value="4">
                                    ★★★★ Very Good
                                </option>

                                <option value="3">
                                    ★★★ Good
                                </option>

                                <option value="2">
                                    ★★ Fair
                                </option>

                                <option value="1">
                                    ★ Poor
                                </option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>
                                Share Your Experience
                            </label>

                            <textarea
                                name="experienceText"
                                rows="5"
                                placeholder="Tell us about your journey..."
                                value={formData.experienceText}
                                onChange={handleChange}
                                required
                            ></textarea>

                        </div>
                        <div className="form-group">

                            <label>
                                Share a Photo (Optional)
                            </label>

                            <input
                                type="file"
                                name="photo"
                                accept="image/*"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        photo: e.target.files[0]
                                    })
                                }
                            />

                            <p>
                                You can optionally share a photo from your journey.
                            </p>

                        </div>
                        <button type="submit">
                            Submit Feedback
                        </button>

                    </form>

                </div>

            </section>

        </main>
    );
}

export default Contact;