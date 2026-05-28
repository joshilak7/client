import React, { useState, useEffect } from "react";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchBar from "../components/SearchBar";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);

      const response = await api.get("/cars");

      if (response.data && response.data.cars) {
        const normalCars = response.data.cars.filter(
          (car) => !["Mercedes-Benz", "BMW", "Audi"].includes(car.brand),
        );

        setCars(normalCars);
        setFilteredCars(normalCars);
      }
    } catch (error) {
      console.log("Using Demo Cars");

      const demoCars = getDemoCars();
      setCars(demoCars);
      setFilteredCars(demoCars);
    } finally {
      setLoading(false);
    }
  };

  // Demo Cars with Working Images
  const getDemoCars = () => {
    return [
      {
        _id: "1",
        name: "Economy Hatchback",
        brand: "Maruti Suzuki",
        model: "Swift",
        year: 2023,
        seats: 5,
        transmission: "Manual",
        fuelType: "Petrol",
        image:
          "https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti/Swift/9226/1680586822716/front-left-side-47.jpg",
        description: "Perfect for city driving and budget-conscious travelers.",
        location: "Bangalore",
        rating: 4.5,
      },
      {
        _id: "2",
        name: "Compact SUV",
        brand: "Hyundai",
        model: "Creta",
        year: 2023,
        seats: 5,
        transmission: "Automatic",
        fuelType: "Diesel",
        image:
          "https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Creta/9824/1697697424167/front-left-side-47.jpg",
        description:
          "Popular compact SUV with great features and fuel efficiency.",
        location: "Chennai",
        rating: 4.6,
      },
      {
        _id: "3",
        name: "Electric Car",
        brand: "Tata",
        model: "Tiago EV",
        year: 2023,
        seats: 5,
        transmission: "Automatic",
        fuelType: "Electric",
        image:
          "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Tiago-EV/8778/1679909163441/front-left-side-47.jpg",
        description: "Go green with our electric hatchback.",
        location: "Bangalore",
        rating: 4.7,
      },
      {
        _id: "4",
        name: "Family Sedan",
        brand: "Honda",
        model: "City",
        year: 2023,
        seats: 5,
        transmission: "CVT",
        fuelType: "Petrol",
        image:
          "https://stimg.cardekho.com/images/carexteriorimages/930x620/Honda/City/9421/1677914238296/front-left-side-47.jpg",
        description: "Reliable and comfortable sedan for family use.",
        location: "Hyderabad",
        rating: 4.6,
      },
      {
        _id: "5",
        name: "Electric SUV",
        brand: "Tata",
        model: "Nexon EV",
        year: 2024,
        seats: 5,
        transmission: "Automatic",
        fuelType: "Electric",
        image:
          "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Nexon-EV/11047/1694146347051/front-left-side-47.jpg",
        description: "Premium electric SUV with long driving range.",
        location: "Pune",
        rating: 4.8,
      },
    ];
  };

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
      <h1 style={styles.title}>Explore Cars</h1>

      <p style={styles.subtitle}>Find your perfect car for every journey</p>

      <SearchBar onSearch={handleSearch} placeholder="Search cars..." />

      <div style={styles.grid}>
        {filteredCars.map((car) => (
          <div key={car._id} style={styles.card}>
            <div style={styles.imageContainer}>
              <img
                src={car.image}
                alt={car.model}
                style={styles.image}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x250?text=Car+Image";
                }}
              />

              <div style={styles.rating}>⭐ {car.rating}</div>
            </div>

            <div style={styles.cardBody}>
              <h2 style={styles.carTitle}>
                {car.brand} {car.model}
              </h2>

              <p style={styles.carName}>{car.name}</p>

              <div style={styles.specs}>
                <span>🚗 {car.seats} Seats</span>
                <span>⚙️ {car.transmission}</span>
                <span>⛽ {car.fuelType}</span>
              </div>

              <p style={styles.description}>{car.description}</p>

              <p style={styles.location}>📍 {car.location}</p>
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

  rating: {
    position: "absolute",
    top: "12px",
    left: "12px",
    backgroundColor: "#ffc107",
    color: "#000",
    padding: "5px 10px",
    borderRadius: "20px",
    fontWeight: "bold",
    fontSize: "13px",
  },

  cardBody: {
    padding: "20px",
  },

  carTitle: {
    fontSize: "24px",
    marginBottom: "5px",
    color: "#222",
  },

  carName: {
    color: "#777",
    marginBottom: "15px",
    fontSize: "14px",
  },

  specs: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "15px",
    color: "#555",
    fontSize: "14px",
  },

  description: {
    color: "#666",
    lineHeight: "1.6",
    marginBottom: "15px",
    fontSize: "14px",
  },

  location: {
    color: "#444",
    fontWeight: "500",
    fontSize: "14px",
  },
};

export default Cars;
