import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const PlaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  const [booking, setBooking] = useState({
    startDate: "",
    endDate: "",
    guests: 1,
    contactNumber: "",
    specialRequests: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/places/${id}`,
        );

        setPlace(response.data.place);
      } catch (error) {
        console.error("Error fetching place:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [id]);

  const calculateTotalPrice = () => {
    return place.entryFee * booking.guests;
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const bookingData = {
        bookingType: "place",
        itemId: place._id,
        startDate: booking.startDate,
        endDate: booking.endDate,
        guests: booking.guests,
        contactNumber: booking.contactNumber,
        specialRequests: booking.specialRequests,
      };

      await axios.post(
        `${process.env.REACT_APP_API_URL}/bookings`,
        bookingData,
      );

      alert("Booking created successfully!");
      navigate("/bookings");
    } catch (error) {
      setError(error.response?.data?.message || "Booking failed");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!place) return <div>Place not found</div>;

  return (
    <div style={styles.page}>
      {/* HERO IMAGE */}
      <div style={styles.heroContainer}>
        <img
          src={
            place.images?.[0] ||
            "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1400&auto=format&fit=crop"
          }
          alt={place.name}
          style={styles.heroImage}
        />

        <div style={styles.overlay}>
          <h1 style={styles.heroTitle}>{place.name}</h1>

          <p style={styles.heroLocation}>
            📍 {place.city}, {place.state}, {place.country}
          </p>
        </div>
      </div>

      <div className="container" style={styles.container}>
        <div style={styles.grid}>
          {/* LEFT SIDE */}
          <div>
            {/* GALLERY */}
            <div style={styles.gallery}>
              {place.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Place ${index}`}
                  style={styles.galleryImage}
                />
              ))}
            </div>

            {/* DETAILS */}
            <div style={styles.detailsCard}>
              <h2 style={styles.sectionTitle}>About This Place</h2>

              <p style={styles.description}>{place.description}</p>

              <div style={styles.infoGrid}>
                <div style={styles.infoBox}>
                  <h4>🏞 Category</h4>
                  <p>{place.category}</p>
                </div>

                <div style={styles.infoBox}>
                  <h4>⭐ Rating</h4>
                  <p>{place.rating} / 5</p>
                </div>

                <div style={styles.infoBox}>
                  <h4>🕒 Opening Hours</h4>
                  <p>{place.openingHours}</p>
                </div>

                <div style={styles.infoBox}>
                  <h4>🌤 Best Time</h4>
                  <p>{place.bestTimeToVisit}</p>
                </div>
              </div>

              {/* EXTRA DETAILS */}
              <div style={styles.extraSection}>
                <h2 style={styles.sectionTitle}>Why Visit {place.name}?</h2>

                <p style={styles.description}>
                  {place.name} is one of the most beautiful tourist destinations
                  in India. Visitors come here to enjoy nature, culture,
                  architecture, spirituality, and local traditions. The place is
                  famous for its historical importance, peaceful environment,
                  and unforgettable sightseeing experience.
                </p>

                <p style={styles.description}>
                  Tourists can explore nearby attractions, local food markets,
                  temples, lakes, mountains, photography spots, and traditional
                  festivals. It is a perfect destination for family trips,
                  couples, solo travelers, and adventure lovers.
                </p>
              </div>

              {/* POPULAR ATTRACTIONS */}
              {place.popularAttractions &&
                place.popularAttractions.length > 0 && (
                  <div style={styles.attractions}>
                    <h2 style={styles.sectionTitle}>Popular Attractions</h2>

                    <div style={styles.attractionGrid}>
                      {place.popularAttractions.map((attraction, index) => (
                        <div key={index} style={styles.attractionCard}>
                          ✨ {attraction}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>

          {/* RIGHT SIDE BOOKING */}
          {place.entryFee > 0 && (
            <div style={styles.bookingCard}>
              <h2 style={styles.bookingTitle}>Book Tickets</h2>

              <p style={styles.price}>
                ₹{place.entryFee} <span>/ person</span>
              </p>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleBooking}>
                <div className="form-group">
                  <label className="form-label">Visit Date</label>

                  <input
                    type="date"
                    className="form-control"
                    value={booking.startDate}
                    onChange={(e) =>
                      setBooking({
                        ...booking,
                        startDate: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Number of Guests</label>

                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    max="20"
                    value={booking.guests}
                    onChange={(e) =>
                      setBooking({
                        ...booking,
                        guests: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Contact Number</label>

                  <input
                    type="tel"
                    className="form-control"
                    value={booking.contactNumber}
                    onChange={(e) =>
                      setBooking({
                        ...booking,
                        contactNumber: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Special Requests</label>

                  <textarea
                    className="form-control"
                    rows="3"
                    value={booking.specialRequests}
                    onChange={(e) =>
                      setBooking({
                        ...booking,
                        specialRequests: e.target.value,
                      })
                    }
                  ></textarea>
                </div>

                <div style={styles.totalPrice}>
                  Total Price: ₹{calculateTotalPrice()}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={styles.bookBtn}
                >
                  Book Now
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: "#f5f7fb",
    minHeight: "100vh",
  },

  heroContainer: {
    position: "relative",
    height: "450px",
    overflow: "hidden",
  },

  heroImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "60px",
    color: "#fff",
  },

  heroTitle: {
    fontSize: "54px",
    fontWeight: "bold",
    marginBottom: "10px",
  },

  heroLocation: {
    fontSize: "22px",
  },

  container: {
    padding: "50px 20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "35px",
  },

  gallery: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginBottom: "30px",
  },

  galleryImage: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "12px",
  },

  detailsCard: {
    backgroundColor: "#fff",
    padding: "35px",
    borderRadius: "16px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  },

  sectionTitle: {
    fontSize: "30px",
    marginBottom: "20px",
    color: "#222",
  },

  description: {
    lineHeight: "1.9",
    color: "#555",
    marginBottom: "20px",
    fontSize: "17px",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "30px",
    marginBottom: "30px",
  },

  infoBox: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "12px",
  },

  extraSection: {
    marginTop: "40px",
  },

  attractions: {
    marginTop: "40px",
  },

  attractionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
  },

  attractionCard: {
    backgroundColor: "#eef4ff",
    padding: "15px",
    borderRadius: "10px",
    fontWeight: "500",
  },

  bookingCard: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    position: "sticky",
    top: "100px",
    height: "fit-content",
  },

  bookingTitle: {
    fontSize: "32px",
    marginBottom: "15px",
  },

  price: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: "25px",
  },

  totalPrice: {
    marginTop: "20px",
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "bold",
  },

  bookBtn: {
    width: "100%",
    padding: "14px",
    fontSize: "18px",
    borderRadius: "10px",
  },
};

export default PlaceDetail;
