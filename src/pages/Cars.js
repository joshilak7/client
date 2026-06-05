import React, { useState, useEffect } from "react";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchBar from "../components/SearchBar";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Demo Cars
  const getDemoCars = () => {
    return [
      {
        _id: "1",
        name: "Maruti Suzuki Swift",
        brand: "Maruti Suzuki",
        model: "Swift",
        year: 2024,
        seats: 5,
        transmission: "Manual",
        fuelType: "Petrol",
        image:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
        description:
          "Compact hatchback with excellent mileage and city driving comfort.",
        rating: 4.5,
      },
      {
        _id: "2",
        name: "Hyundai Creta",
        brand: "Hyundai",
        model: "Creta",
        year: 2024,
        seats: 5,
        transmission: "Automatic",
        fuelType: "Diesel",
        image:
          "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800",
        description: "Stylish SUV with premium features and spacious interior.",
        rating: 4.7,
      },
      {
        _id: "3",
        name: "Tata Nexon EV",
        brand: "Tata",
        model: "Nexon EV",
        year: 2024,
        seats: 5,
        transmission: "Automatic",
        fuelType: "Electric",
        image:
          "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800",
        description: "Eco-friendly electric SUV with modern technology.",
        rating: 4.8,
      },
      {
        _id: "4",
        name: "Toyota Innova Crysta",
        brand: "Toyota",
        model: "Innova",
        year: "2024",
        seats: 7,
        transmission: "Manual",
        fuelType: "Diesel",
        image:
          "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800",
        description:
          "Perfect family MPV with comfortable seating and reliability.",
        rating: 4.8,
      },
      {
        _id: "5",
        name: "Honda City",
        brand: "Honda",
        model: "City",
        year: 2024,
        seats: 5,
        transmission: "CVT",
        fuelType: "Petrol",
        image:
          "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?w=800",
        description: "Premium sedan offering smooth driving and comfort.",
        rating: 4.6,
      },
      {
        _id: "6",
        name: "Mahindra XUV700",
        brand: "Mahindra",
        model: "XUV700",
        year: 2024,
        seats: 7,
        transmission: "Automatic",
        fuelType: "Diesel",
        image:
          "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800",
        description:
          "Luxury SUV with advanced safety and powerful performance.",
        rating: 4.9,
      },
    ];
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await api.get("/cars");
        if (
          response.data &&
          response.data.cars &&
          response.data.cars.length > 0
        ) {
          setCars(response.data.cars);
          setFilteredCars(response.data.cars);
        } else {
          setCars(getDemoCars());
          setFilteredCars(getDemoCars());
        }
      } catch (error) {
        console.log("Using Demo Cars");
        setCars(getDemoCars());
        setFilteredCars(getDemoCars());
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredCars(cars);
      return;
    }
    const filtered = cars.filter(
      (car) =>
        car.name.toLowerCase().includes(query.toLowerCase()) ||
        car.brand.toLowerCase().includes(query.toLowerCase()) ||
        car.model.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredCars(filtered);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Our Fleet</h1>
      <p style={styles.subtitle}>Choose your perfect car for every journey</p>

      <SearchBar onSearch={handleSearch} placeholder="Search cars by name..." />

      <div style={styles.grid}>
        {filteredCars.map((car) => (
          <div key={car._id} style={styles.card}>
            <div style={styles.imageContainer}>
              <img
                src={car.image}
                alt={car.name}
                style={styles.image}
                loading="lazy"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x250/007bff/white?text=Car+Image";
                }}
              />
              <div style={styles.rating}>⭐ {car.rating}</div>
            </div>
            <div style={styles.cardBody}>
              <h2 style={styles.carTitle}>{car.name}</h2>
              <div style={styles.specs}>
                <span>👥 {car.seats} Seats</span>
                <span>⚙️ {car.transmission}</span>
                <span>⛽ {car.fuelType}</span>
                <span>📅 {car.year}</span>
              </div>
              <p style={styles.description}>{car.description}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredCars.length === 0 && (
        <div style={styles.noResults}>
          <p>No cars found matching your search.</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "1200px",
    margin: "auto",
  },
  title: {
    textAlign: "center",
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#222",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: "30px",
    fontSize: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "25px",
    marginTop: "30px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    transition: "transform 0.3s",
  },
  imageContainer: {
    position: "relative",
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  rating: {
    position: "absolute",
    top: "10px",
    left: "10px",
    backgroundColor: "#ffc107",
    color: "#000",
    padding: "4px 10px",
    borderRadius: "20px",
    fontWeight: "bold",
    fontSize: "12px",
  },
  cardBody: {
    padding: "16px",
  },
  carTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#222",
  },
  specs: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "12px",
    fontSize: "12px",
    color: "#666",
  },
  description: {
    color: "#666",
    lineHeight: "1.5",
    fontSize: "13px",
  },
  noResults: {
    textAlign: "center",
    padding: "60px",
    color: "#666",
    fontSize: "16px",
  },
};

// Add hover effects
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .card:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  }
  
  @media (max-width: 768px) {
    .title {
      font-size: 28px !important;
    }
    
    .grid {
      grid-template-columns: 1fr !important;
      gap: 16px !important;
    }
    
    .image {
      height: 180px !important;
    }
    
    .car-title {
      font-size: 16px !important;
    }
  }
  
  @media (max-width: 480px) {
    .container {
      padding: 20px 15px !important;
    }
    
    .title {
      font-size: 24px !important;
    }
    
    .subtitle {
      font-size: 14px !important;
    }
    
    .card-body {
      padding: 12px !important;
    }
    
    .specs {
      gap: 8px !important;
      font-size: 11px !important;
    }
    
    .description {
      font-size: 12px !important;
    }
  }
`;

document.head.appendChild(styleSheet);

export default Cars;
