import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  FaCheckCircle,
  FaWhatsapp,
  FaHome,
  FaCar,
  FaMapMarkerAlt,
} from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";

const BookingSuccess = () => {
  const location = useLocation();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = new URLSearchParams(location.search);
  const reference = params.get("ref");

  useEffect(() => {
    if (reference) {
      fetchBooking();
    } else {
      setLoading(false);
    }
  }, [reference]);

  const fetchBooking = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/bookings/${reference}`,
      );
      if (res.data.success) {
        setBooking(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching booking:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <LoadingSpinner type="dots" message="Loading booking details..." />;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconWrapper}>
          <FaCheckCircle size={80} color="#28a745" />
        </div>

        <h1 style={styles.title}>Request Sent! 🎉</h1>
        <p style={styles.message}>
          Thank you for your booking request. We'll contact you within 30
          minutes.
        </p>

        {booking && (
          <div style={styles.refBox}>
            <strong>Booking ID:</strong> {booking.bookingReference}
          </div>
        )}

        <div style={styles.infoBox}>
          <h4>📌 What happens next?</h4>
          <ul>
            <li>✓ Our team reviews your request</li>
            <li>✓ We contact you within 30 minutes</li>
            <li>✓ Confirm all details with you</li>
            <li>✓ Finalize your trip plan</li>
          </ul>
        </div>

        <div style={styles.contactBox}>
          <FaWhatsapp size={24} color="#25D366" />
          <span>
            Need help? <strong>+91 92747 13544</strong>
          </span>
        </div>

        <div style={styles.buttons}>
          <Link to="/" style={styles.btnHome}>
            🏠 Home
          </Link>
          <Link to="/cars" style={styles.btnCars}>
            🚗 Cars
          </Link>
          <Link to="/places" style={styles.btnPlaces}>
            📍 Places
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "calc(100vh - 200px)",
    padding: "40px 20px",
    backgroundColor: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    maxWidth: "500px",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "40px 30px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  iconWrapper: { marginBottom: "20px" },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  message: { color: "#666", lineHeight: "1.6", marginBottom: "25px" },
  refBox: {
    backgroundColor: "#f0f7ff",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "14px",
  },
  infoBox: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "left",
    marginBottom: "20px",
  },
  contactBox: {
    backgroundColor: "#e8f5e9",
    padding: "15px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "25px",
  },
  buttons: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  btnHome: {
    backgroundColor: "#6c757d",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "14px",
  },
  btnCars: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "14px",
  },
  btnPlaces: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "14px",
  },
};

export default BookingSuccess;
