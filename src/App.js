import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import GoogleAnalytics from "./components/GoogleAnalytics";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetail from "./pages/CarDetail";
import Places from "./pages/Places";
import PlaceDetail from "./pages/PlaceDetail";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookingForm from "./pages/BookingForm";
import BookingSuccess from "./pages/BookingSuccess";

function App() {
  return (
    <AuthProvider>
      <Router>
        <GoogleAnalytics />
        <div className="App">
          <Navbar />
          <main style={{ minHeight: "calc(100vh - 200px)" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cars" element={<Cars />} />
              <Route path="/cars/:id" element={<CarDetail />} />
              <Route path="/places" element={<Places />} />
              <Route path="/places/:id" element={<PlaceDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/booking" element={<BookingForm />} />
              <Route
                path="/booking-success/:reference"
                element={<BookingSuccess />}
              />
              <Route
                path="/bookings"
                element={
                  <PrivateRoute>
                    <Bookings />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <WhatsAppButton />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
