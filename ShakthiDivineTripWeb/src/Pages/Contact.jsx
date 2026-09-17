function Contact() {
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
                            <p>Chat with us for booking assistance</p>
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

                    <h2>Send Us a Message</h2>

                    <p>
                        Tell us how we can help you with your journey.
                    </p>

                    <form>

                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Your name"
                        />

                        <label>Phone Number</label>
                        <input
                            type="tel"
                            placeholder="Your phone number"
                        />

                        <label>Message</label>
                        <textarea
                            rows="5"
                            placeholder="How can we help you?"
                        ></textarea>

                        <button type="button">
                            Send Message
                        </button>

                    </form>

                </div>

            </section>


            <section className="contact-cta">

                <h2>Ready for Your Next Divine Journey?</h2>

                <p>
                    Speak with us directly and let's plan your pilgrimage.
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

export default Contact;