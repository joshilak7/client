import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({
    startDate: "",
    endDate: "",
    contactNumber: "",
    specialRequests: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCar();
  }, [id]);

  const fetchCar = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/cars/${id}`,
      );
      setCar(response.data.car);
    } catch (error) {
      console.error("Error fetching car:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = () => {
    if (booking.startDate && booking.endDate) {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return days * car.pricePerDay;
    }
    return 0;
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const bookingData = {
        bookingType: "car",
        itemId: car._id,
        startDate: booking.startDate,
        endDate: booking.endDate,
        contactNumber: booking.contactNumber,
        specialRequests: booking.specialRequests,
      };

      const response = await axios.post(
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
  if (!car) return <div>Car not found</div>;

  return (
    <div className="container" style={styles.container}>
      <div style={styles.grid}>
        <div>
          <img
            src={car.images?.[0] || "https://via.placeholder.com/600x400"}
            alt={car.name}
            style={styles.image}
          />
          <div style={styles.details}>
            <h1>{car.name}</h1>
            <p>
              <strong>Brand:</strong> {car.brand}
            </p>
            <p>
              <strong>Model:</strong> {car.model}
            </p>
            <p>
              <strong>Year:</strong> {car.year}
            </p>
            <p>
              <strong>Seats:</strong> {car.seats}
            </p>
            <p>
              <strong>Transmission:</strong> {car.transmission}
            </p>
            <p>
              <strong>Fuel Type:</strong> {car.fuelType}
            </p>
            <p>
              <strong>Location:</strong> {car.location}
            </p>
            <p>
              <strong>Description:</strong> {car.description}
            </p>
            <p>
              <strong>Rating:</strong> {car.rating} ⭐
            </p>
          </div>
        </div>

        <div style={styles.bookingCard}>
          <h2>Book This Car</h2>
          <p style={styles.price}>₹{car.pricePerDay}/day</p>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleBooking}>
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={booking.startDate}
                onChange={(e) =>
                  setBooking({ ...booking, startDate: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                value={booking.endDate}
                onChange={(e) =>
                  setBooking({ ...booking, endDate: e.target.value })
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
                  setBooking({ ...booking, contactNumber: e.target.value })
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
                  setBooking({ ...booking, specialRequests: e.target.value })
                }
              ></textarea>
            </div>

            {booking.startDate && booking.endDate && (
              <div className="form-group">
                <strong>Total Price: ₹{calculateTotalPrice()}</strong>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={styles.bookBtn}
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px 20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 400px",
    gap: "40px",
  },
  image: {
    width: "100%",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  details: {
    lineHeight: "1.8",
  },
  bookingCard: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    position: "sticky",
    top: "100px",
  },
  price: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: "20px",
  },
  bookBtn: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
  },
};

export default CarDetail;
