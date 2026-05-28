import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [featuredPlaces, setFeaturedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [carsRes, placesRes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/cars`),
        axios.get(`${process.env.REACT_APP_API_URL}/places`),
      ]);

      if (carsRes.data?.cars) {
        setFeaturedCars(carsRes.data.cars.slice(0, 3));
      }

      if (placesRes.data?.places) {
        setFeaturedPlaces(placesRes.data.places.slice(0, 3));
      }
    } catch (error) {
      console.log("Using Demo Data");

      setFeaturedCars(getDemoCars());
      setFeaturedPlaces(getDemoPlaces());
    } finally {
      setLoading(false);
    }
  };

  // Demo Cars
  const getDemoCars = () => {
    return [
      {
        _id: "1",
        name: "Maruti Suzuki Swift",
        description: "Perfect hatchback for city rides and family trips.",
        image:
          "https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti/Swift/9226/1680586822716/front-left-side-47.jpg",
      },

      {
        _id: "2",
        name: "Hyundai Creta",
        description: "Premium SUV with modern features and comfort.",
        image:
          "https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Creta/9824/1697697424167/front-left-side-47.jpg",
      },

      {
        _id: "3",
        name: "Tata Nexon EV",
        description: "Electric SUV with powerful performance and range.",
        image:
          "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Nexon-EV/11047/1694146347051/front-left-side-47.jpg",
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
        description: "World famous white marble monument and wonder.",
        image:
          "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200",
      },

      {
        _id: "2",
        name: "Goa Beaches",
        city: "Goa",
        state: "India",
        description: "Beautiful beaches and amazing nightlife destination.",
        image:
          "https://images.unsplash.com/photo-1512343879784-a960bf40e7b2?q=80&w=1200",
      },

      {
        _id: "3",
        name: "Manali",
        city: "Himachal",
        state: "Pradesh",
        description: "Snow mountains and beautiful hill station views.",
        image:
          "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200",
      },
    ];
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
              <Link
                to="/cars"
                className="btn btn-primary"
                style={styles.heroBtn}
              >
                Explore Cars
              </Link>

              <Link
                to="/places"
                className="btn btn-secondary"
                style={styles.heroBtn}
              >
                Explore Places
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section style={styles.section}>
        <div className="container">
          <div style={styles.headingContainer}>
            <h2 style={styles.sectionTitle}>Featured Cars</h2>

            <Link to="/cars" style={styles.moreBtn}>
              View More Cars →
            </Link>
          </div>

          <div style={styles.grid}>
            {featuredCars.map((car) => (
              <div key={car._id} style={styles.card}>
                <img
                  src={
                    car.image ||
                    car.images?.[0] ||
                    "https://via.placeholder.com/400x250"
                  }
                  alt={car.name}
                  style={styles.cardImg}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x250?text=Car+Image";
                  }}
                />

                <div style={styles.cardBody}>
                  <h3 style={styles.cardTitle}>{car.name}</h3>

                  <p style={styles.cardText}>{car.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section style={styles.sectionLight}>
        <div className="container">
          <div style={styles.headingContainer}>
            <h2 style={styles.sectionTitle}>Popular Destinations</h2>

            <Link to="/places" style={styles.moreBtn}>
              View More Places →
            </Link>
          </div>

          <div style={styles.grid}>
            {featuredPlaces.map((place) => (
              <div key={place._id} style={styles.card}>
                <img
                  src={
                    place.image ||
                    place.images?.[0] ||
                    "https://via.placeholder.com/400x250"
                  }
                  alt={place.name}
                  style={styles.cardImg}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x250?text=Place+Image";
                  }}
                />

                <div style={styles.cardBody}>
                  <h3 style={styles.cardTitle}>{place.name}</h3>

                  <p style={styles.location}>
                    📍 {place.city}, {place.state}
                  </p>

                  <p style={styles.cardText}>{place.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  hero: {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600')",
    backgroundSize: "cover",
    backgroundPosition: "center",
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
  },

  heroTitle: {
    fontSize: "56px",
    fontWeight: "bold",
    marginBottom: "20px",
    lineHeight: "1.2",
  },

  heroSubtitle: {
    fontSize: "22px",
    marginBottom: "35px",
    color: "#f1f1f1",
  },

  heroButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

  heroBtn: {
    padding: "14px 32px",
    fontSize: "16px",
    borderRadius: "8px",
    textDecoration: "none",
  },

  section: {
    padding: "80px 20px",
    backgroundColor: "#fff",
  },

  sectionLight: {
    padding: "80px 20px",
    backgroundColor: "#f8f9fa",
  },

  headingContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
  },

  sectionTitle: {
    fontSize: "42px",
    fontWeight: "bold",
    color: "#222",
  },

  moreBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    transition: "0.3s",
  },

  cardImg: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
  },

  cardBody: {
    padding: "20px",
  },

  cardTitle: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#222",
  },

  cardText: {
    color: "#666",
    lineHeight: "1.6",
    fontSize: "14px",
  },

  location: {
    color: "#007bff",
    marginBottom: "10px",
    fontWeight: "600",
  },
};

export default Home;
