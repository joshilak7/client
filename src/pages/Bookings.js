import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // FIX: remove unused user
  useAuth();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/bookings`,
      );

      setBookings(response.data.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/bookings/${bookingId}/cancel`,
        );

        fetchBookings();
        alert("Booking cancelled successfully");
      } catch (error) {
        console.error("Error cancelling booking:", error);
        alert("Failed to cancel booking");
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: { backgroundColor: "#ffc107", color: "#856404" },
      confirmed: { backgroundColor: "#28a745", color: "#155724" },
      cancelled: { backgroundColor: "#dc3545", color: "#721c24" },
      completed: { backgroundColor: "#17a2b8", color: "#0c5460" },
    };

    const style = statusStyles[status] || statusStyles.pending;

    return (
      <span style={{ ...styles.badge, ...style }}>{status.toUpperCase()}</span>
    );
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container" style={styles.container}>
      <h1 style={styles.title}>My Bookings</h1>

      {bookings.length === 0 ? (
        <p style={styles.noBookings}>You have no bookings yet.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} style={styles.bookingCard}>
            <div style={styles.bookingHeader}>
              <h3>{booking.itemId?.name || "Booking Item"}</h3>
              {getStatusBadge(booking.status)}
            </div>

            <div style={styles.bookingDetails}>
              <p>
                <strong>Type:</strong> {booking.bookingType?.toUpperCase()}
              </p>

              <p>
                <strong>Start Date:</strong>{" "}
                {new Date(booking.startDate).toLocaleDateString()}
              </p>

              <p>
                <strong>End Date:</strong>{" "}
                {new Date(booking.endDate).toLocaleDateString()}
              </p>

              {booking.guests > 1 && (
                <p>
                  <strong>Guests:</strong> {booking.guests}
                </p>
              )}

              <p>
                <strong>Total Price:</strong> ₹{booking.totalPrice}
              </p>

              <p>
                <strong>Payment Status:</strong> {booking.paymentStatus}
              </p>

              {booking.specialRequests && (
                <p>
                  <strong>Special Requests:</strong> {booking.specialRequests}
                </p>
              )}

              <p>
                <strong>Booked on:</strong>{" "}
                {new Date(booking.createdAt).toLocaleDateString()}
              </p>
            </div>

            {booking.status === "pending" && (
              <button
                onClick={() => cancelBooking(booking._id)}
                className="btn btn-danger"
                style={styles.cancelBtn}
              >
                Cancel Booking
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px 20px",
  },
  title: {
    fontSize: "36px",
    marginBottom: "30px",
    textAlign: "center",
  },
  bookingCard: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    padding: "20px",
    marginBottom: "20px",
  },
  bookingHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    paddingBottom: "10px",
    borderBottom: "1px solid #dee2e6",
  },
  bookingDetails: {
    lineHeight: "1.8",
  },
  badge: {
    padding: "5px 10px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  cancelBtn: {
    marginTop: "15px",
  },
  noBookings: {
    textAlign: "center",
    fontSize: "18px",
    color: "#6c757d",
    marginTop: "50px",
  },
};

export default Bookings;
