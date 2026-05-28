import React, { useState, useEffect } from "react";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchBar from "../components/SearchBar";

const Places = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      setLoading(true);

      const response = await api.get("/places");

      if (response.data && response.data.places) {
        setPlaces(response.data.places);
        setFilteredPlaces(response.data.places);
      }
    } catch (error) {
      console.log("Using Demo Places");

      const demoPlaces = getDemoPlaces();
      setPlaces(demoPlaces);
      setFilteredPlaces(demoPlaces);
    } finally {
      setLoading(false);
    }
  };

  // Demo Places with Fixed Images
  const getDemoPlaces = () => {
    return [
      {
        _id: "1",
        name: "Taj Mahal",
        city: "Agra",
        state: "Uttar Pradesh",
        category: "Historical",
        description:
          "One of the seven wonders of the world built with white marble.",
        image:
          "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200",
        rating: 4.9,
      },

      {
        _id: "2",
        name: "Manali",
        city: "Manali",
        state: "Himachal Pradesh",
        category: "Mountain",
        description: "Beautiful hill station surrounded by snow mountains.",
        image:
          "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200",
        rating: 4.8,
      },

      {
        _id: "3",
        name: "Goa Beaches",
        city: "Panaji",
        state: "Goa",
        category: "Beach",
        description: "Famous for beaches, nightlife and water sports.",
        image:
          "https://images.unsplash.com/photo-1512343879784-a960bf40e7b2?q=80&w=1200",
        rating: 4.7,
      },

      {
        _id: "4",
        name: "Jaipur City Palace",
        city: "Jaipur",
        state: "Rajasthan",
        category: "Historical",
        description: "Royal palace with beautiful architecture and museums.",
        image:
          "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200",
        rating: 4.7,
      },

      {
        _id: "5",
        name: "Kerala Backwaters",
        city: "Alleppey",
        state: "Kerala",
        category: "Nature",
        description: "Enjoy peaceful houseboat rides in Kerala backwaters.",
        image:
          "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200",
        rating: 4.8,
      },

      {
        _id: "6",
        name: "Golden Temple",
        city: "Amritsar",
        state: "Punjab",
        category: "Temple",
        description: "Most famous Sikh temple covered with gold.",
        image:
          "https://images.unsplash.com/photo-1588096344356-9b3f2f6c4c77?q=80&w=1200",
        rating: 4.9,
      },

      {
        _id: "7",
        name: "Mysore Palace",
        city: "Mysore",
        state: "Karnataka",
        category: "Historical",
        description: "Magnificent royal palace with colorful lighting.",
        image:
          "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?q=80&w=1200",
        rating: 4.8,
      },

      {
        _id: "8",
        name: "Dal Lake",
        city: "Srinagar",
        state: "Jammu & Kashmir",
        category: "Lake",
        description: "Famous lake with beautiful houseboats and mountains.",
        image:
          "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1200",
        rating: 4.9,
      },

      {
        _id: "9",
        name: "Rann of Kutch",
        city: "Kutch",
        state: "Gujarat",
        category: "Desert",
        description: "White desert famous for Rann Utsav festival.",
        image:
          "https://images.unsplash.com/photo-1617469165786-8007eda3caa7?q=80&w=1200",
        rating: 4.7,
      },

      {
        _id: "10",
        name: "Ooty",
        city: "Ooty",
        state: "Tamil Nadu",
        category: "Mountain",
        description: "Cool hill station with tea gardens and lakes.",
        image:
          "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200",
        rating: 4.6,
      },
    ];
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredPlaces(places);
      return;
    }

    const filtered = places.filter(
      (place) =>
        place.name.toLowerCase().includes(query.toLowerCase()) ||
        place.city.toLowerCase().includes(query.toLowerCase()) ||
        place.state.toLowerCase().includes(query.toLowerCase()) ||
        place.category.toLowerCase().includes(query.toLowerCase()),
    );

    setFilteredPlaces(filtered);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Beach: "🏖️",
      Mountain: "⛰️",
      Historical: "🏛️",
      Temple: "🛕",
      Nature: "🌿",
      Lake: "🏞️",
      Desert: "🏜️",
    };

    return icons[category] || "📍";
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Explore Amazing Destinations</h1>

      <p style={styles.subtitle}>Discover beautiful places in India</p>

      <SearchBar onSearch={handleSearch} placeholder="Search places..." />

      <div style={styles.grid}>
        {filteredPlaces.map((place) => (
          <div key={place._id} style={styles.card}>
            <div style={styles.imageContainer}>
              <img
                src={place.image}
                alt={place.name}
                style={styles.image}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x250?text=Place+Image";
                }}
              />

              <div style={styles.category}>
                {getCategoryIcon(place.category)} {place.category}
              </div>

              <div style={styles.rating}>⭐ {place.rating}</div>
            </div>

            <div style={styles.cardBody}>
              <h2 style={styles.placeName}>{place.name}</h2>

              <p style={styles.location}>
                📍 {place.city}, {place.state}
              </p>

              <p style={styles.description}>{place.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "1300px",
    margin: "auto",
  },

  title: {
    textAlign: "center",
    fontSize: "42px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#222",
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: "30px",
    fontSize: "18px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
    marginTop: "30px",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    transition: "0.3s",
  },

  imageContainer: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: "230px",
    objectFit: "cover",
  },

  category: {
    position: "absolute",
    top: "12px",
    left: "12px",
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  rating: {
    position: "absolute",
    top: "12px",
    right: "12px",
    backgroundColor: "#ffc107",
    color: "#000",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  cardBody: {
    padding: "20px",
  },

  placeName: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#222",
  },

  location: {
    color: "#666",
    marginBottom: "12px",
    fontSize: "14px",
  },

  description: {
    color: "#555",
    lineHeight: "1.6",
    fontSize: "14px",
  },
};

export default Places;
