import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Top Footer */}
        <div style={styles.topSection}>
          {/* Logo & About */}
          <div style={styles.section}>
            <h2 style={styles.logo}>TravelBooking</h2>

            <p style={styles.description}>
              Explore beautiful destinations and rent amazing cars for your
              perfect journey across India.
            </p>

            <div style={styles.socials}>
              <span style={styles.socialIcon}>🌐</span>
              <span style={styles.socialIcon}>📘</span>
              <span style={styles.socialIcon}>📸</span>
              <span style={styles.socialIcon}>▶️</span>
            </div>
          </div>

          {/* Quick Links */}
          <div style={styles.section}>
            <h3 style={styles.heading}>Quick Links</h3>

            <ul style={styles.linkList}>
              <li>
                <Link to="/" style={styles.link}>
                  🏠 Home
                </Link>
              </li>

              <li>
                <Link to="/cars" style={styles.link}>
                  🚗 Cars
                </Link>
              </li>

              <li>
                <Link to="/places" style={styles.link}>
                  📍 Places
                </Link>
              </li>

              <li>
                <Link to="/bookings" style={styles.link}>
                  📖 My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Places */}
          <div style={styles.section}>
            <h3 style={styles.heading}>Popular Destinations</h3>

            <ul style={styles.linkList}>
              <li style={styles.placeItem}>🏖️ Goa</li>
              <li style={styles.placeItem}>🏔️ Manali</li>
              <li style={styles.placeItem}>🏛️ Jaipur</li>
              <li style={styles.placeItem}>🌊 Kerala</li>
            </ul>
          </div>

          {/* Contact */}
          <div style={styles.section}>
            <h3 style={styles.heading}>Contact Us</h3>

            <p style={styles.contact}>📧 dhwanitourist@gmail.com</p>

            <p style={styles.contact}>📞 +91 92747 13544</p>

            <p style={styles.contact}>📍 Gujarat, India</p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div style={styles.bottom}>
          <p style={styles.bottomText}>
            © 2026 TravelBooking. All Rights Reserved.
          </p>

          <div style={styles.bottomLinks}>
            <span style={styles.bottomLink}>Privacy Policy</span>
            <span style={styles.bottomLink}>Terms & Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "#fff",
    marginTop: "60px",
  },

  container: {
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "60px 20px 20px",
  },

  topSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "40px",
    marginBottom: "40px",
  },

  section: {
    display: "flex",
    flexDirection: "column",
  },

  logo: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#38bdf8",
  },

  description: {
    color: "#cbd5e1",
    lineHeight: "1.8",
    fontSize: "15px",
    marginBottom: "20px",
  },

  socials: {
    display: "flex",
    gap: "12px",
  },

  socialIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "18px",
    transition: "0.3s",
  },

  heading: {
    fontSize: "20px",
    marginBottom: "18px",
    color: "#fff",
  },

  linkList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },

  link: {
    color: "#cbd5e1",
    textDecoration: "none",
    marginBottom: "12px",
    display: "inline-block",
    transition: "0.3s",
    fontSize: "15px",
  },

  placeItem: {
    marginBottom: "12px",
    color: "#cbd5e1",
    fontSize: "15px",
  },

  contact: {
    color: "#cbd5e1",
    marginBottom: "12px",
    fontSize: "15px",
  },

  bottom: {
    borderTop: "1px solid rgba(255,255,255,0.1)",
    paddingTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
  },

  bottomText: {
    color: "#94a3b8",
    fontSize: "14px",
  },

  bottomLinks: {
    display: "flex",
    gap: "20px",
  },

  bottomLink: {
    color: "#94a3b8",
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default Footer;
