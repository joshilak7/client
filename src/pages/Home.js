import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  FaCar,
  FaMapMarkerAlt,
  FaStar,
  FaUsers,
  FaShieldAlt,
  FaHeadset,
  FaChevronLeft,
  FaChevronRight,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [featuredPlaces, setFeaturedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Demo Cars
  const getDemoCars = () => {
    return [
      {
        _id: "1",
        name: "Maruti Suzuki Swift",
        description:
          "Perfect hatchback for city rides and family trips. Excellent fuel efficiency.",
        type: "Hatchback",
        seatingCapacity: 5,
        image:
          "https://www.marutisuzuki.com/-/media/marutisuzuki/global/swift/2022/swift-2022-left-front-three-quarter-5.webp",
        rating: 4.5,
      },
      {
        _id: "2",
        name: "Hyundai Creta",
        description:
          "Premium SUV with modern features, spacious interior, and powerful engine.",
        type: "SUV",
        seatingCapacity: 5,
        image:
          "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta/gallery/creta-exterior-right-front-three-quarter-3.png",
        rating: 4.7,
      },
      {
        _id: "3",
        name: "Tata Nexon EV",
        description:
          "Electric SUV with zero emissions, powerful performance, and impressive range.",
        type: "Electric SUV",
        seatingCapacity: 5,
        image:
          "https://www.tatamotors.com/wp-content/uploads/2023/04/Nexon-EV-front-view.jpg",
        rating: 4.6,
      },
      {
        _id: "4",
        name: "Toyota Innova",
        description:
          "Spacious MPV perfect for group travel with 7-8 seats. Comfortable for long journeys.",
        type: "MPV",
        seatingCapacity: 7,
        image:
          "https://www.toyotabharat.com/img/innova-crysta/gallery/exterior/Innova-Crysta-Exterior-1.webp",
        rating: 4.8,
      },
    ];
  };

  // Demo Places
  const getDemoPlaces = () => {
    return [
      {
        _id: "1",
        name: "Taj Mahal",
        city: "Agra",
        state: "Uttar Pradesh",
        description:
          "World famous white marble monument and wonder of the world.",
        image:
          "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop",
        rating: 4.9,
      },
      {
        _id: "2",
        name: "Goa Beaches",
        city: "Goa",
        state: "India",
        description:
          "Beautiful beaches, amazing nightlife, and Portuguese architecture.",
        image:
          "https://images.unsplash.com/photo-1512343879784-a960bf40e7b2?q=80&w=1200&auto=format&fit=crop",
        rating: 4.7,
      },
      {
        _id: "3",
        name: "Manali",
        city: "Himachal",
        state: "Pradesh",
        description:
          "Snow-capped mountains, adventure sports, and beautiful hill station views.",
        image:
          "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop",
        rating: 4.8,
      },
      {
        _id: "4",
        name: "Jaipur City Palace",
        city: "Jaipur",
        state: "Rajasthan",
        description:
          "Royal palace complex with museums, courtyards, and stunning architecture.",
        image:
          "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200&auto=format&fit=crop",
        rating: 4.6,
      },
    ];
  };

  const testimonials = [
    {
      id: 1,
      name: "Robert Smith",
      country: "United Kingdom",
      text: "Amazing experience with Dhwani Tourist! The car was in excellent condition and the driver was very professional. Highly recommended!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      country: "USA",
      text: "Best travel agency! They arranged everything perfectly from car rental to hotel booking. The tour guides were knowledgeable and friendly.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Priya Sharma",
      country: "India",
      text: "Very professional service! Booked a car for my family trip and everything went smoothly. Will definitely use their services again.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carsRes, placesRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/cars`),
          axios.get(`${process.env.REACT_APP_API_URL}/places`),
        ]);

        if (carsRes.data?.cars && carsRes.data.cars.length > 0) {
          setFeaturedCars(carsRes.data.cars.slice(0, 4));
        } else {
          setFeaturedCars(getDemoCars());
        }

        if (placesRes.data?.places && placesRes.data.places.length > 0) {
          setFeaturedPlaces(placesRes.data.places.slice(0, 4));
        } else {
          setFeaturedPlaces(getDemoPlaces());
        }
      } catch (error) {
        console.log("Using Demo Data");
        setFeaturedCars(getDemoCars());
        setFeaturedPlaces(getDemoPlaces());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div style={styles.wrapper}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.overlay}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              Explore Amazing Destinations & Rent Cars
            </h1>
            <p style={styles.heroSubtitle}>
              Discover beautiful places and rent cars for your next adventure
              with Dhwani Tourist
            </p>
            <div style={styles.heroButtons}>
              <Link to="/cars" style={styles.heroBtnPrimary}>
                Explore Cars
              </Link>
              <Link to="/places" style={styles.heroBtnSecondary}>
                Explore Places
              </Link>
              <Link to="/booking" style={styles.heroBtnBooking}>
                Book Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
          <p style={styles.sectionSubtitle}>
            We provide the best travel experience
          </p>
          <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>
                <FaCar size={40} color="#007bff" />
              </div>
              <h3 style={styles.featureTitle}>Best Car Rental</h3>
              <p style={styles.featureText}>
                Wide range of well-maintained cars at affordable prices
              </p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>
                <FaHeadset size={40} color="#007bff" />
              </div>
              <h3 style={styles.featureTitle}>24/7 Support</h3>
              <p style={styles.featureText}>
                Round-the-clock customer support for all your needs
              </p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>
                <FaUsers size={40} color="#007bff" />
              </div>
              <h3 style={styles.featureTitle}>Experienced Drivers</h3>
              <p style={styles.featureText}>
                Professional and knowledgeable local drivers
              </p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>
                <FaShieldAlt size={40} color="#007bff" />
              </div>
              <h3 style={styles.featureTitle}>Safe & Secure</h3>
              <p style={styles.featureText}>
                Fully insured cars with safety measures
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section style={styles.sectionLight}>
        <div style={styles.container}>
          <div style={styles.headingContainer}>
            <div>
              <h2 style={styles.sectionTitle}>Featured Cars</h2>
              <p style={styles.sectionSubtitle}>
                Choose from our premium fleet
              </p>
            </div>
            <Link to="/cars" style={styles.moreBtn}>
              View All Cars →
            </Link>
          </div>
          <div style={styles.grid}>
            {featuredCars.map((car) => (
              <div key={car._id} style={styles.card}>
                <div style={styles.cardImageWrapper}>
                  <img
                    src={
                      car.image ||
                      "https://via.placeholder.com/400x250?text=Car"
                    }
                    alt={car.name}
                    style={styles.cardImg}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x250?text=Car";
                    }}
                  />
                  <div style={styles.cardBadge}>{car.type}</div>
                  <div style={styles.cardRating}>
                    <FaStar style={styles.starIcon} />
                    <span>{car.rating}</span>
                  </div>
                </div>
                <div style={styles.cardBody}>
                  <h3 style={styles.cardTitle}>{car.name}</h3>
                  <div style={styles.cardDetails}>
                    <span>👥 {car.seatingCapacity} Seats</span>
                    <span>⚡ {car.type}</span>
                  </div>
                  <p style={styles.cardText}>
                    {car.description.substring(0, 100)}...
                  </p>
                  <Link to={`/booking?carId=${car._id}`} style={styles.bookBtn}>
                    Book Now →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.headingContainer}>
            <div>
              <h2 style={styles.sectionTitle}>Popular Destinations</h2>
              <p style={styles.sectionSubtitle}>
                Explore breathtaking locations
              </p>
            </div>
            <Link to="/places" style={styles.moreBtn}>
              View All Places →
            </Link>
          </div>
          <div style={styles.grid}>
            {featuredPlaces.map((place) => (
              <div key={place._id} style={styles.card}>
                <img
                  src={
                    place.image ||
                    "https://via.placeholder.com/400x250?text=Place"
                  }
                  alt={place.name}
                  style={styles.cardImg}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x250?text=Place";
                  }}
                />
                <div style={styles.cardBody}>
                  <div style={styles.cardHeader}>
                    <h3 style={styles.cardTitle}>{place.name}</h3>
                    <div style={styles.cardRating}>
                      <FaStar style={styles.starIcon} />
                      <span>{place.rating}</span>
                    </div>
                  </div>
                  <p style={styles.location}>
                    <FaMapMarkerAlt style={styles.locationIcon} />
                    {place.city}, {place.state}
                  </p>
                  <p style={styles.cardText}>
                    {place.description.substring(0, 100)}...
                  </p>
                  <Link
                    to={`/booking?placeId=${place._id}`}
                    style={styles.bookBtn}
                  >
                    Book Tour →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={styles.testimonialSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>What Our Customers Say</h2>
          <p style={styles.sectionSubtitle}>
            Real experiences from real travelers
          </p>
          <div style={styles.testimonialContainer}>
            <button
              onClick={prevTestimonial}
              style={styles.testimonialNav}
              aria-label="Previous"
            >
              <FaChevronLeft />
            </button>
            <div style={styles.testimonialCard}>
              <div style={styles.testimonialImageWrapper}>
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  style={styles.testimonialImage}
                />
              </div>
              <div style={styles.testimonialContent}>
                <div style={styles.testimonialRating}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} style={styles.testimonialStar} />
                  ))}
                </div>
                <p style={styles.testimonialText}>
                  "{testimonials[currentTestimonial].text}"
                </p>
                <h4 style={styles.testimonialName}>
                  {testimonials[currentTestimonial].name}
                </h4>
                <p style={styles.testimonialCountry}>
                  {testimonials[currentTestimonial].country}
                </p>
              </div>
            </div>
            <button
              onClick={nextTestimonial}
              style={styles.testimonialNav}
              aria-label="Next"
            >
              <FaChevronRight />
            </button>
          </div>
          <div style={styles.testimonialDots}>
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                style={{
                  ...styles.dot,
                  backgroundColor:
                    currentTestimonial === idx ? "#007bff" : "#ddd",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section style={styles.contactSection}>
        <div style={styles.container}>
          <div style={styles.contactGrid}>
            <div style={styles.contactInfo}>
              <h2 style={styles.contactTitle}>Need Help?</h2>
              <p style={styles.contactText}>
                Contact us anytime. We're here to help you 24/7.
              </p>
              <div style={styles.contactDetails}>
                <div style={styles.contactItem}>
                  <FaPhone style={styles.contactIcon} />
                  <div>
                    <h4>Call Us</h4>
                    <p>+91 92747 13544</p>
                  </div>
                </div>
                <div style={styles.contactItem}>
                  <FaWhatsapp style={styles.contactIcon} />
                  <div>
                    <h4>WhatsApp</h4>
                    <p>+91 92747 13544</p>
                  </div>
                </div>
                <div style={styles.contactItem}>
                  <FaEnvelope style={styles.contactIcon} />
                  <div>
                    <h4>Email Us</h4>
                    <p>dhwanitourist@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={styles.contactForm}>
              <h3>Quick Inquiry</h3>
              <input
                type="text"
                placeholder="Your Name"
                style={styles.contactInput}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                style={styles.contactInput}
              />
              <textarea
                placeholder="Your Message"
                rows="3"
                style={styles.contactTextarea}
              ></textarea>
              <button style={styles.contactBtn}>Send Message</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready for Your Next Adventure?</h2>
          <p style={styles.ctaText}>
            Book your dream car or plan your perfect trip today!
          </p>
          <div style={styles.ctaButtons}>
            <Link to="/booking" style={styles.ctaBtnPrimary}>
              Book Now
            </Link>
            <Link to="/cars" style={styles.ctaBtnSecondary}>
              View Cars
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  wrapper: { width: "100%", overflowX: "hidden" },
  hero: {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "500px",
    height: "85vh",
    position: "relative",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  heroContent: {
    textAlign: "center",
    color: "#fff",
    maxWidth: "800px",
    width: "100%",
  },
  heroTitle: {
    fontSize: "clamp(28px, 5vw, 52px)",
    fontWeight: "bold",
    marginBottom: "20px",
    lineHeight: "1.2",
  },
  heroSubtitle: {
    fontSize: "clamp(14px, 3vw, 20px)",
    marginBottom: "35px",
    color: "#f1f1f1",
  },
  heroButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
  },
  heroBtnPrimary: {
    padding: "12px 24px",
    fontSize: "clamp(14px, 3vw, 16px)",
    borderRadius: "8px",
    textDecoration: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "600",
    transition: "all 0.3s",
    display: "inline-block",
  },
  heroBtnSecondary: {
    padding: "12px 24px",
    fontSize: "clamp(14px, 3vw, 16px)",
    borderRadius: "8px",
    textDecoration: "none",
    backgroundColor: "transparent",
    color: "#fff",
    fontWeight: "600",
    border: "2px solid #fff",
    transition: "all 0.3s",
    display: "inline-block",
  },
  heroBtnBooking: {
    padding: "12px 24px",
    fontSize: "clamp(14px, 3vw, 16px)",
    borderRadius: "8px",
    textDecoration: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    fontWeight: "600",
    transition: "all 0.3s",
    display: "inline-block",
  },
  container: { maxWidth: "1200px", margin: "0 auto", padding: "0 20px" },
  section: { padding: "60px 20px", backgroundColor: "#fff" },
  sectionLight: { padding: "60px 20px", backgroundColor: "#f8f9fa" },
  headingContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    flexWrap: "wrap",
    gap: "15px",
  },
  sectionTitle: {
    fontSize: "clamp(24px, 4vw, 38px)",
    fontWeight: "bold",
    color: "#222",
    marginBottom: "10px",
    textAlign: "center",
  },
  sectionSubtitle: {
    fontSize: "clamp(14px, 3vw, 16px)",
    color: "#666",
    textAlign: "center",
  },
  moreBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "14px",
    display: "inline-block",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
    marginTop: "40px",
  },
  featureCard: {
    textAlign: "center",
    padding: "30px 20px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    transition: "transform 0.3s",
  },
  featureIcon: { marginBottom: "20px" },
  featureTitle: {
    fontSize: "clamp(18px, 3vw, 20px)",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#333",
  },
  featureText: {
    fontSize: "clamp(12px, 2.5vw, 14px)",
    color: "#666",
    lineHeight: "1.6",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    transition: "transform 0.3s",
  },
  cardImageWrapper: { position: "relative" },
  cardImg: { width: "100%", height: "200px", objectFit: "cover" },
  cardBadge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "600",
  },
  cardRating: {
    position: "absolute",
    bottom: "10px",
    left: "10px",
    backgroundColor: "#ffc107",
    padding: "4px 8px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  starIcon: { color: "#000", fontSize: "10px" },
  cardBody: { padding: "16px" },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  cardTitle: {
    fontSize: "clamp(16px, 3vw, 18px)",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#222",
  },
  cardDetails: {
    display: "flex",
    gap: "12px",
    marginBottom: "10px",
    fontSize: "12px",
    color: "#666",
    flexWrap: "wrap",
  },
  cardText: {
    color: "#666",
    lineHeight: "1.5",
    fontSize: "13px",
    marginBottom: "12px",
  },
  location: {
    color: "#007bff",
    marginBottom: "8px",
    fontSize: "13px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    flexWrap: "wrap",
  },
  locationIcon: { fontSize: "11px" },
  bookBtn: {
    display: "block",
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    textAlign: "center",
    width: "100%",
  },
  testimonialSection: { padding: "60px 20px", backgroundColor: "#f0f7ff" },
  testimonialContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    maxWidth: "800px",
    margin: "40px auto 0",
  },
  testimonialNav: {
    backgroundColor: "#fff",
    border: "none",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    minWidth: "44px",
    minHeight: "44px",
  },
  testimonialCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "30px 20px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  testimonialImageWrapper: {
    width: "80px",
    height: "80px",
    margin: "0 auto 20px",
    borderRadius: "50%",
    overflow: "hidden",
  },
  testimonialImage: { width: "100%", height: "100%", objectFit: "cover" },
  testimonialRating: {
    display: "flex",
    justifyContent: "center",
    gap: "5px",
    marginBottom: "15px",
    flexWrap: "wrap",
  },
  testimonialStar: { color: "#ffc107", fontSize: "clamp(14px, 3vw, 18px)" },
  testimonialText: {
    fontSize: "clamp(13px, 2.5vw, 16px)",
    lineHeight: "1.6",
    color: "#555",
    marginBottom: "20px",
    fontStyle: "italic",
  },
  testimonialName: {
    fontSize: "clamp(16px, 3vw, 18px)",
    fontWeight: "600",
    color: "#333",
    marginBottom: "5px",
  },
  testimonialCountry: { fontSize: "clamp(12px, 2.5vw, 14px)", color: "#666" },
  testimonialDots: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "30px",
    flexWrap: "wrap",
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s",
    minWidth: "10px",
    minHeight: "10px",
  },
  contactSection: { padding: "60px 20px", backgroundColor: "#fff" },
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "40px",
    alignItems: "center",
  },
  contactInfo: { padding: "20px" },
  contactTitle: {
    fontSize: "clamp(24px, 4vw, 32px)",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#222",
  },
  contactText: {
    color: "#666",
    marginBottom: "25px",
    fontSize: "clamp(14px, 3vw, 16px)",
  },
  contactDetails: { display: "flex", flexDirection: "column", gap: "20px" },
  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
  },
  contactIcon: { fontSize: "24px", color: "#007bff" },
  contactForm: {
    backgroundColor: "#f8f9fa",
    padding: "25px",
    borderRadius: "12px",
  },
  contactInput: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
  },
  contactTextarea: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    resize: "vertical",
  },
  contactBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    width: "100%",
  },
  ctaSection: {
    padding: "60px 20px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    textAlign: "center",
  },
  ctaContent: { maxWidth: "600px", margin: "0 auto" },
  ctaTitle: {
    fontSize: "clamp(24px, 4vw, 36px)",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  ctaText: {
    fontSize: "clamp(14px, 3vw, 18px)",
    marginBottom: "30px",
    opacity: 0.95,
  },
  ctaButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  ctaBtnPrimary: {
    backgroundColor: "#fff",
    color: "#667eea",
    padding: "12px 30px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    display: "inline-block",
  },
  ctaBtnSecondary: {
    backgroundColor: "transparent",
    color: "#fff",
    padding: "12px 30px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    border: "2px solid #fff",
    display: "inline-block",
  },
};

// Add hover effects and responsive styles
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .hero-btn-primary:hover, .hero-btn-secondary:hover, .hero-btn-booking:hover { transform: translateY(-2px); }
  .hero-btn-primary:hover { background-color: #0056b3 !important; }
  .hero-btn-secondary:hover { background-color: rgba(255,255,255,0.1) !important; }
  .hero-btn-booking:hover { background-color: #218838 !important; }
  .card:hover { transform: translateY(-3px); box-shadow: 0 5px 20px rgba(0,0,0,0.1); }
  .feature-card:hover { transform: translateY(-5px); }
  .more-btn:hover { background-color: #c82333 !important; transform: translateX(3px); }
  .book-btn:hover { background-color: #218838 !important; }
  .testimonial-nav:hover { background-color: #007bff !important; color: #fff !important; }
  .contact-btn:hover { background-color: #0056b3 !important; }
  .cta-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
  .cta-btn-secondary:hover { background-color: rgba(255,255,255,0.1) !important; transform: translateY(-2px); }
  
  @media (max-width: 768px) {
    .hero-buttons { flex-direction: column; align-items: center; }
    .hero-btn-primary, .hero-btn-secondary, .hero-btn-booking { width: 100%; max-width: 220px; text-align: center; }
    .heading-container { flex-direction: column; text-align: center; }
    .testimonial-container { gap: 10px; }
    .testimonial-card { padding: 20px 15px; }
    .testimonial-nav { width: 36px; height: 36px; min-width: 36px; min-height: 36px; }
    .testimonial-image-wrapper { width: 60px; height: 60px; }
    .contact-grid { grid-template-columns: 1fr !important; text-align: center; }
    .contact-item { justify-content: center; }
    .contact-details { align-items: center; }
  }
  
  @media (max-width: 480px) {
    .section, .section-light, .testimonial-section, .contact-section, .cta-section { padding: 40px 16px; }
    .grid { gap: 16px; }
    .card-img { height: 160px; }
    .card-body { padding: 12px; }
    .card-title { font-size: 16px; }
    .testimonial-text { font-size: 13px; }
    .testimonial-name { font-size: 16px; }
    .contact-form { padding: 20px; margin: 0 10px; }
    .hero-title { font-size: 28px; }
    .hero-subtitle { font-size: 14px; }
    .features-grid { gap: 20px; }
    .feature-card { padding: 20px 15px; }
    .cta-buttons { flex-direction: column; align-items: center; }
    .cta-btn-primary, .cta-btn-secondary { width: 100%; max-width: 200px; text-align: center; }
    .more-btn { font-size: 12px; padding: 8px 16px; }
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    .grid { grid-template-columns: repeat(2, 1fr) !important; }
    .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }
  
  @media (min-width: 1025px) {
    .grid { grid-template-columns: repeat(4, 1fr) !important; }
    .features-grid { grid-template-columns: repeat(4, 1fr) !important; }
  }
  
  button, a, [role="button"] { min-height: 44px; min-width: 44px; }
  img { max-width: 100%; height: auto; }
`;
document.head.appendChild(styleSheet);

export default Home;
