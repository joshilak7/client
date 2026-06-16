import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaMapMarkerAlt,
  FaCar,
  FaUsers,
  FaWhatsapp,
  FaPaperPlane,
} from "react-icons/fa";

const BookingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [places, setPlaces] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "car",
    carId: "",
    carName: "",
    placeId: "",
    placeName: "",
    pickupDate: "",
    pickupLocation: "",
    passengers: "1",
    message: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const carId = params.get("carId");
    const placeId = params.get("placeId");

    if (carId) {
      setFormData((prev) => ({ ...prev, service: "car", carId }));
    }
    if (placeId) {
      setFormData((prev) => ({ ...prev, service: "tour", placeId }));
    }

    fetchCarsAndPlaces();
  }, [location]);

  const fetchCarsAndPlaces = async () => {
    try {
      const [carsRes, placesRes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/cars`),
        axios.get(`${process.env.REACT_APP_API_URL}/places`),
      ]);
      setCars(carsRes.data.cars || []);
      setPlaces(placesRes.data.places || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setCars([
        { _id: "1", name: "Maruti Suzuki Swift" },
        { _id: "2", name: "Maruti Suzuki Dzire" },
        { _id: "3", name: "Maruti Suzuki Ertiga" },
      ]);
      setPlaces([
        { _id: "1", name: "Taj Mahal", city: "Agra" },
        { _id: "2", name: "Goa Beaches", city: "Goa" },
        { _id: "3", name: "Manali", city: "Himachal" },
      ]);
    }
  };

  const handleCarChange = (e) => {
    const carId = e.target.value;
    const car = cars.find((c) => c._id === carId);
    setFormData((prev) => ({
      ...prev,
      carId: carId,
      carName: car ? car.name : "",
    }));
    if (errors.carId) {
      setErrors((prev) => ({ ...prev, carId: "" }));
    }
  };

  const handlePlaceChange = (e) => {
    const placeId = e.target.value;
    const place = places.find((p) => p._id === placeId);
    setFormData((prev) => ({
      ...prev,
      placeId: placeId,
      placeName: place ? place.name : "",
    }));
    if (errors.placeId) {
      setErrors((prev) => ({ ...prev, placeId: "" }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Name required";
    if (!formData.email.trim()) newErrors.email = "Email required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone required";
    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "10 digits required";
    if (!formData.pickupDate) newErrors.pickupDate = "Date required";
    if (!formData.pickupLocation.trim())
      newErrors.pickupLocation = "Location required";

    if (formData.service === "car" && !formData.carId) {
      newErrors.carId = "Please select a car";
    }
    if (formData.service === "tour" && !formData.placeId) {
      newErrors.placeId = "Please select a destination";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to send WhatsApp message
  const sendWhatsAppMessage = () => {
    // Create message content
    let message = `*NEW BOOKING REQUEST*%0A%0A`;
    message += `*Customer Details*%0A`;
    message += `👤 Name: ${formData.fullName}%0A`;
    message += `📞 Phone: ${formData.phone}%0A`;
    message += `📧 Email: ${formData.email}%0A%0A`;

    message += `*Trip Details*%0A`;
    message += `🚗 Service: ${formData.service === "car" ? "Car Rental" : formData.service === "tour" ? "Tour Package" : "Both"}%0A`;

    if (formData.carName) {
      message += `🚙 Car: ${formData.carName}%0A`;
    }
    if (formData.placeName) {
      message += `📍 Destination: ${formData.placeName}%0A`;
    }

    message += `📅 Travel Date: ${formData.pickupDate}%0A`;
    message += `📍 Pickup Location: ${formData.pickupLocation}%0A`;
    message += `👥 Passengers: ${formData.passengers}%0A`;

    if (formData.message) {
      message += `%0A*Special Requests*%0A${formData.message}%0A`;
    }

    message += `%0A_This is an automated booking request from Dhwani Tourist Website_`;

    // WhatsApp number (without +)
    const whatsappNumber = "919274713544";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      // Send to backend
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/bookings/inquiry`,
        formData,
      );

      if (response.data.success) {
        toast.success(
          `Booking request sent! ID: ${response.data.bookingReference}`,
        );

        // Send WhatsApp message
        sendWhatsAppMessage();

        setTimeout(() => {
          navigate(`/booking-success?ref=${response.data.bookingReference}`);
        }, 2000);
      }
    } catch (error) {
      console.error("Booking error:", error);
      // Even if backend fails, send WhatsApp
      sendWhatsAppMessage();
      toast.success("Request sent via WhatsApp! We'll contact you soon.");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <LoadingSpinner type="dots" message="Sending request..." />;

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.title}>Book Your Trip</h2>
        <p style={styles.subtitle}>
          Fill the form, we'll contact you within 30 minutes
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Name */}
          <div style={styles.field}>
            <label style={styles.label}>
              <FaUser style={styles.icon} /> Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your name"
              value={formData.fullName}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.fullName && (
              <span style={styles.error}>{errors.fullName}</span>
            )}
          </div>

          {/* Email & Phone */}
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>
                <FaEnvelope style={styles.icon} /> Email *
              </label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.email && <span style={styles.error}>{errors.email}</span>}
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                <FaPhone style={styles.icon} /> Phone *
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="9876543210"
                value={formData.phone}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.phone && <span style={styles.error}>{errors.phone}</span>}
            </div>
          </div>

          {/* Service Type */}
          <div style={styles.field}>
            <label style={styles.label}>
              <FaCar style={styles.icon} /> Service Type *
            </label>
            <div style={styles.serviceBtns}>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    service: "car",
                    carId: "",
                    carName: "",
                    placeId: "",
                    placeName: "",
                  }))
                }
                style={{
                  ...styles.serviceBtn,
                  ...(formData.service === "car"
                    ? styles.serviceBtnActive
                    : {}),
                }}
              >
                🚗 Car Rental
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    service: "tour",
                    carId: "",
                    carName: "",
                    placeId: "",
                    placeName: "",
                  }))
                }
                style={{
                  ...styles.serviceBtn,
                  ...(formData.service === "tour"
                    ? styles.serviceBtnActive
                    : {}),
                }}
              >
                📍 Tour Package
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, service: "both" }))
                }
                style={{
                  ...styles.serviceBtn,
                  ...(formData.service === "both"
                    ? styles.serviceBtnActive
                    : {}),
                }}
              >
                ✈️ Both
              </button>
            </div>
          </div>

          {/* Car Selection */}
          {(formData.service === "car" || formData.service === "both") && (
            <div style={styles.field}>
              <label style={styles.label}>
                <FaCar style={styles.icon} /> Select Car *
              </label>
              <select
                name="carId"
                value={formData.carId}
                onChange={handleCarChange}
                style={styles.select}
              >
                <option value="">-- Choose a car --</option>
                {cars.map((car) => (
                  <option key={car._id} value={car._id}>
                    {car.name}
                  </option>
                ))}
              </select>
              {errors.carId && <span style={styles.error}>{errors.carId}</span>}
            </div>
          )}

          {/* Place Selection */}
          {(formData.service === "tour" || formData.service === "both") && (
            <div style={styles.field}>
              <label style={styles.label}>
                <FaMapMarkerAlt style={styles.icon} /> Select Destination *
              </label>
              <select
                name="placeId"
                value={formData.placeId}
                onChange={handlePlaceChange}
                style={styles.select}
              >
                <option value="">-- Choose a destination --</option>
                {places.map((place) => (
                  <option key={place._id} value={place._id}>
                    {place.name}, {place.city}
                  </option>
                ))}
              </select>
              {errors.placeId && (
                <span style={styles.error}>{errors.placeId}</span>
              )}
            </div>
          )}

          {/* Date & Passengers */}
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>
                <FaCalendar style={styles.icon} /> Travel Date *
              </label>
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                style={styles.input}
              />
              {errors.pickupDate && (
                <span style={styles.error}>{errors.pickupDate}</span>
              )}
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                <FaUsers style={styles.icon} /> Passengers
              </label>
              <select
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                style={styles.select}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Person" : "People"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pickup Location */}
          <div style={styles.field}>
            <label style={styles.label}>
              <FaMapMarkerAlt style={styles.icon} /> Pickup Location *
            </label>
            <input
              type="text"
              name="pickupLocation"
              placeholder="City or full address"
              value={formData.pickupLocation}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.pickupLocation && (
              <span style={styles.error}>{errors.pickupLocation}</span>
            )}
          </div>

          {/* Message */}
          <div style={styles.field}>
            <label style={styles.label}>Special Requests</label>
            <textarea
              name="message"
              placeholder="Any special requirements? (car type, preferences, etc.)"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              style={styles.textarea}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" style={styles.submitBtn}>
            <FaWhatsapp style={styles.whatsappIcon} />
            Send Booking Request on WhatsApp
          </button>

          <p style={styles.note}>
            <FaWhatsapp style={styles.whatsappIcon} />
            We'll contact you via WhatsApp within 30 minutes
          </p>
        </form>
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
  formCard: {
    maxWidth: "550px",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: "8px",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    fontSize: "14px",
    marginBottom: "25px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#555",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  icon: {
    fontSize: "14px",
    color: "#007bff",
  },
  input: {
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.3s",
  },
  select: {
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
  textarea: {
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    resize: "vertical",
    fontFamily: "inherit",
  },
  error: {
    color: "#dc3545",
    fontSize: "12px",
  },
  serviceBtns: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
  },
  serviceBtn: {
    padding: "10px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s",
  },
  serviceBtnActive: {
    borderColor: "#007bff",
    backgroundColor: "#e7f3ff",
    color: "#007bff",
  },
  submitBtn: {
    backgroundColor: "#25D366",
    color: "#fff",
    padding: "14px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.3s",
    marginTop: "10px",
  },
  whatsappIcon: {
    fontSize: "20px",
  },
  note: {
    textAlign: "center",
    fontSize: "12px",
    color: "#28a745",
    marginTop: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
  },
};

export default BookingForm;
