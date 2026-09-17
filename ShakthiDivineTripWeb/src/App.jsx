import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TourDetails from "./pages/TourDetails";
import About from "./pages/About";
import Trips from "./pages/Trips";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import TourCard from "./Components/TourCard";
import { getUpcomingTours } from "./services/api";
import "./App.css";

function App() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTours = async () => {
      try {
        const data = await getUpcomingTours();
        setTours(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load tours.");
      } finally {
        setLoading(false);
      }
    };

    loadTours();
  }, []);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Hero />

              <section className="tours-section" id="tours">

                <div className="section-heading">
                  <p>EXPLORE OUR JOURNEYS</p>

                  <h2>Upcoming Divine Trips</h2>

                  <span>
                    Discover meaningful journeys to sacred destinations.
                  </span>
                </div>

                {loading && (
                  <p className="tour-message">
                    Loading our trips...
                  </p>
                )}

                {error && (
                  <p className="tour-message error">
                    {error}
                  </p>
                )}

                {!loading && !error && tours.length === 0 && (
                  <p className="tour-message">
                    No tours are currently available.
                  </p>
                )}

                {!loading && !error && tours.length > 0 && (
                  <div className="tours-grid">
                    {tours.map((tour) => (
                      <TourCard
                        key={tour.tourId}
                        tour={tour}
                      />
                    ))}
                  </div>
                )}

              </section>
            </main>
          }
        />

        <Route
          path="/tour/:id"
          element={<TourDetails />}
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/trips"
          element={<Trips />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />



      </Routes>

    </BrowserRouter>
  );
}

export default App;