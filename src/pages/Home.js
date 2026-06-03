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
} from "react-icons/fa";

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [featuredPlaces, setFeaturedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Demo Cars (without price)
  const getDemoCars = () => {
    return [
      {
        _id: "1",
        name: "Maruti Suzuki Swift",
        description:
          "Perfect hatchback for city rides and family trips. Excellent fuel efficiency and comfortable seating for 5.",
        type: "Hatchback",
        seatingCapacity: 5,
        image:
          "https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti/Swift/9226/1680586822716/front-left-side-47.jpg",
        rating: 4.5,
      },
      {
        _id: "2",
        name: "Hyundai Creta",
        description:
          "Premium SUV with modern features, spacious interior, and powerful engine. Perfect for family trips.",
        type: "SUV",
        seatingCapacity: 5,
        image:
          "https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Creta/9824/1697697424167/front-left-side-47.jpg",
        rating: 4.7,
      },
      {
        _id: "3",
        name: "Tata Nexon EV",
        description:
          "Electric SUV with zero emissions, powerful performance, and impressive range. Eco-friendly travel.",
        type: "Electric SUV",
        seatingCapacity: 5,
        image:
          "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Nexon-EV/11047/1694146347051/front-left-side-47.jpg",
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
          "https://stimg.cardekho.com/images/carexteriorimages/930x620/Toyota/Innova-Crysta/10012/1662111712695/front-left-side-47.jpg",
        rating: 4.8,
      },
    ];
  };

  // Demo Places (without entry fee) - Fixed Goa image URL
  const getDemoPlaces = () => {
    return [
      {
        _id: "1",
        name: "Taj Mahal",
        city: "Agra",
        state: "Uttar Pradesh",
        description:
          "World famous white marble monument and wonder of the world. A symbol of eternal love.",
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
          "Beautiful beaches, amazing nightlife, and Portuguese architecture. Perfect for vacation.",
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
      text: "Amazing experience with Dhwani Tourist! The car was in excellent condition and the driver was very professional. Highly recommended for Udaipur sightseeing.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      country: "USA",
      text: "Best travel agency in town! They arranged everything perfectly from car rental to hotel booking. The tour guides were knowledgeable and friendly.",
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
    {
      id: 4,
      name: "Michael Brown",
      country: "Australia",
      text: "Excellent car rental service! The pickup was on time, car was clean, and prices are reasonable. Great experience overall.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/4.jpg",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        console.log("Using Demo Data", error);
        setFeaturedCars(getDemoCars());
        setFeaturedPlaces(getDemoPlaces());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-rotate testimonials
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
    <div>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.overlay}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              Explore Amazing Destinations & Rent Cars
            </h1>
            <p style={styles.heroSubtitle}>
              Discover beautiful places and rent cars for your next adventure
            </p>
            <div style={styles.heroButtons}>
              <Link to="/cars" style={styles.heroBtnPrimary}>
                Explore Cars
              </Link>
              <Link to="/places" style={styles.heroBtnSecondary}>
                Explore Places
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
          <p style={styles.sectionSubtitle}>
            We provide the best travel experience
          </p>

          <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>
                <FaCar size={32} color="#007bff" />
              </div>
              <h3 style={styles.featureTitle}>Best Car Rental</h3>
              <p style={styles.featureText}>
                Wide range of well-maintained cars at affordable prices
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>
                <FaHeadset size={32} color="#007bff" />
              </div>
              <h3 style={styles.featureTitle}>24/7 Support</h3>
              <p style={styles.featureText}>
                Round-the-clock customer support for all your needs
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>
                <FaUsers size={32} color="#007bff" />
              </div>
              <h3 style={styles.featureTitle}>Experienced Drivers</h3>
              <p style={styles.featureText}>
                Professional and knowledgeable local drivers
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>
                <FaShieldAlt size={32} color="#007bff" />
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
                      "https://via.placeholder.com/400x250?text=Car+Image"
                    }
                    alt={car.name}
                    style={styles.cardImg}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x250?text=Car+Image";
                    }}
                  />
                  <div style={styles.cardBadge}>{car.type}</div>
                </div>
                <div style={styles.cardBody}>
                  <div style={styles.cardHeader}>
                    <h3 style={styles.cardTitle}>{car.name}</h3>
                    <div style={styles.rating}>
                      <FaStar style={styles.starIcon} />
                      <span>{car.rating || 4.5}</span>
                    </div>
                  </div>
                  <div style={styles.cardDetails}>
                    <span>👥 {car.seatingCapacity || 5} Seats</span>
                    <span>⚡ {car.type}</span>
                  </div>
                  <p style={styles.cardText}>
                    {car.description?.substring(0, 100) || car.description}...
                  </p>
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
                    "https://via.placeholder.com/400x250?text=Place+Image"
                  }
                  alt={place.name}
                  style={styles.cardImg}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x250?text=Place+Image";
                  }}
                />
                <div style={styles.cardBody}>
                  <div style={styles.cardHeader}>
                    <h3 style={styles.cardTitle}>{place.name}</h3>
                    <div style={styles.rating}>
                      <FaStar style={styles.starIcon} />
                      <span>{place.rating || 4.5}</span>
                    </div>
                  </div>
                  <p style={styles.location}>
                    <FaMapMarkerAlt style={styles.locationIcon} />
                    {place.city}, {place.state}
                  </p>
                  <p style={styles.cardText}>
                    {place.description?.substring(0, 100) || place.description}
                    ...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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
                  loading="lazy"
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
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
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
            <Link to="/cars" style={styles.ctaBtnPrimary}>
              Book a Car
            </Link>
            <Link to="/places" style={styles.ctaBtnSecondary}>
              Plan a Trip
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Responsive Styles - Works on all devices
const styles = {
  hero: {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "500px",
    height: "90vh",
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
    fontSize: "clamp(28px, 5vw, 56px)",
    fontWeight: "bold",
    marginBottom: "20px",
    lineHeight: "1.2",
  },
  heroSubtitle: {
    fontSize: "clamp(16px, 3vw, 22px)",
    marginBottom: "35px",
    color: "#f1f1f1",
  },
  heroButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  heroBtnPrimary: {
    padding: "14px 32px",
    fontSize: "16px",
    borderRadius: "8px",
    textDecoration: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "600",
    transition: "all 0.3s",
    display: "flex",
    alignItems: "center",
    minHeight: "50px",
  },
  heroBtnSecondary: {
    padding: "14px 32px",
    fontSize: "16px",
    borderRadius: "8px",
    textDecoration: "none",
    backgroundColor: "transparent",
    color: "#fff",
    fontWeight: "600",
    border: "2px solid #fff",
    transition: "all 0.3s",
    display: "flex",
    alignItems: "center",
    minHeight: "50px",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },
  section: {
    padding: "60px 20px",
    backgroundColor: "#fff",
  },
  sectionLight: {
    padding: "60px 20px",
    backgroundColor: "#f8f9fa",
  },
  headingContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    flexWrap: "wrap",
    gap: "15px",
  },
  sectionTitle: {
    fontSize: "clamp(28px, 4vw, 42px)",
    fontWeight: "bold",
    color: "#222",
    marginBottom: "10px",
    textAlign: "center",
  },
  sectionSubtitle: {
    fontSize: "16px",
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
    display: "flex",
    alignItems: "center",
    minHeight: "44px",
    transition: "all 0.3s",
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
    cursor: "pointer",
  },
  featureIcon: {
    marginBottom: "20px",
  },
  featureTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#333",
  },
  featureText: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.6",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    transition: "transform 0.3s",
    cursor: "pointer",
  },
  cardImageWrapper: {
    position: "relative",
  },
  cardImg: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
  },
  cardBadge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },
  cardBody: {
    padding: "20px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#222",
    margin: 0,
  },
  rating: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    backgroundColor: "#f8f9fa",
    padding: "4px 8px",
    borderRadius: "20px",
  },
  starIcon: {
    color: "#ffc107",
    fontSize: "14px",
  },
  cardDetails: {
    display: "flex",
    gap: "15px",
    marginBottom: "10px",
    fontSize: "13px",
    color: "#666",
  },
  cardText: {
    color: "#666",
    lineHeight: "1.6",
    fontSize: "14px",
    marginBottom: "15px",
  },
  location: {
    color: "#007bff",
    marginBottom: "10px",
    fontWeight: "500",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  locationIcon: {
    fontSize: "12px",
  },
  testimonialSection: {
    padding: "60px 20px",
    backgroundColor: "#f0f7ff",
  },
  testimonialContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    maxWidth: "800px",
    margin: "40px auto 0",
    position: "relative",
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
    transition: "all 0.3s",
    minWidth: "44px",
    minHeight: "44px",
  },
  testimonialCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "30px",
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
  testimonialImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  testimonialContent: {
    textAlign: "center",
  },
  testimonialRating: {
    display: "flex",
    justifyContent: "center",
    gap: "5px",
    marginBottom: "15px",
  },
  testimonialStar: {
    color: "#ffc107",
    fontSize: "18px",
  },
  testimonialText: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#555",
    marginBottom: "20px",
    fontStyle: "italic",
  },
  testimonialName: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "5px",
  },
  testimonialCountry: {
    fontSize: "14px",
    color: "#666",
  },
  testimonialDots: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "30px",
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s",
    padding: 0,
  },
  ctaSection: {
    padding: "60px 20px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    textAlign: "center",
  },
  ctaContent: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  ctaTitle: {
    fontSize: "clamp(24px, 4vw, 36px)",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  ctaText: {
    fontSize: "18px",
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
    transition: "all 0.3s",
    minHeight: "48px",
    display: "flex",
    alignItems: "center",
  },
  ctaBtnSecondary: {
    backgroundColor: "transparent",
    color: "#fff",
    padding: "12px 30px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    border: "2px solid #fff",
    transition: "all 0.3s",
    minHeight: "48px",
    display: "flex",
    alignItems: "center",
  },
};

// Add hover effects and responsive styles
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  /* Hover effects */
  .hero-btn-primary:hover {
    background-color: #0056b3 !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }
  
  .hero-btn-secondary:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
    transform: translateY(-2px);
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
  
  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  }
  
  .testimonial-nav:hover {
    background-color: #007bff !important;
    color: #fff !important;
    transform: scale(1.1);
  }
  
  .more-btn:hover {
    background-color: #c82333 !important;
    transform: translateX(5px);
  }
  
  .cta-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }
  
  .cta-btn-secondary:hover {
    background-color: rgba(255,255,255,0.15) !important;
    transform: translateY(-2px);
  }
  
  .dot:hover {
    transform: scale(1.3);
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .hero-buttons {
      flex-direction: column;
      align-items: center;
    }
    
    .hero-btn-primary,
    .hero-btn-secondary {
      width: 100%;
      max-width: 250px;
      justify-content: center;
    }
    
    .heading-container {
      flex-direction: column;
      text-align: center;
    }
    
    .testimonial-container {
      gap: 10px;
    }
    
    .testimonial-card {
      padding: 20px;
    }
    
    .testimonial-nav {
      width: 36px;
      height: 36px;
    }
    
    .section-title {
      font-size: 28px !important;
    }
  }
  
  @media (max-width: 480px) {
    .section {
      padding: 40px 16px;
    }
    
    .grid {
      gap: 20px;
    }
    
    .card-img {
      height: 180px;
    }
    
    .card-body {
      padding: 15px;
    }
    
    .card-title {
      font-size: 18px;
    }
    
    .testimonial-text {
      font-size: 14px;
    }
    
    .testimonial-name {
      font-size: 16px;
    }
    
    .cta-buttons {
      flex-direction: column;
      align-items: center;
    }
    
    .cta-btn-primary,
    .cta-btn-secondary {
      width: 100%;
      max-width: 250px;
      justify-content: center;
    }
    
    .testimonial-image-wrapper {
      width: 60px;
      height: 60px;
    }
    
    .testimonial-star {
      font-size: 14px;
    }
  }
  
  /* Touch-friendly improvements */
  @media (max-width: 768px) {
    button,
    a,
    [role="button"] {
      min-height: 44px;
      min-width: 44px;
    }
    
    .more-btn {
      min-height: 40px;
    }
    
    .testimonial-nav {
      min-width: 44px;
      min-height: 44px;
    }
    
    .dot {
      min-width: 10px;
      min-height: 10px;
    }
  }
  
  /* Landscape mode */
  @media (max-width: 768px) and (orientation: landscape) {
    .hero {
      height: auto;
      min-height: 400px;
    }
    
    .testimonial-container {
      max-width: 90%;
    }
  }
  
  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .card {
      background-color: #2a2a2a;
    }
    
    .card-title {
      color: #fff;
    }
    
    .card-text,
    .feature-text {
      color: #ccc;
    }
    
    .feature-card {
      background-color: #2a2a2a;
    }
    
    .feature-title {
      color: #fff;
    }
    
    .testimonial-card {
      background-color: #2a2a2a;
    }
    
    .testimonial-text {
      color: #ccc;
    }
    
    .testimonial-name {
      color: #fff;
    }
    
    .rating {
      background-color: #3a3a3a;
    }
  }
  
  /* Smooth animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .card {
    animation: fadeIn 0.5s ease;
  }
  
  .feature-card {
    animation: fadeIn 0.5s ease;
  }
  
  /* Loading state */
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
  }
  
  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

document.head.appendChild(styleSheet);

export default Home;
