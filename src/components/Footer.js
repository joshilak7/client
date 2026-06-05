import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCar,
  FaHome,
  FaInfoCircle,
  FaLock,
  FaUsers,
} from "react-icons/fa";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Top Footer */}
        <div style={styles.topSection}>
          {/* Logo & About */}
          <div style={styles.section}>
            <div
              style={styles.logoWrapper}
              onClick={scrollToTop}
              role="button"
              tabIndex={0}
            >
              <FaCar style={styles.logoIcon} />
              <h2 style={styles.logo}>Dhwani Tourist</h2>
            </div>
            <p style={styles.description}>
              Explore beautiful destinations and rent amazing cars for your
              perfect journey across India. We provide the best travel
              experience with quality service and customer satisfaction.
            </p>
          </div>

          {/* Quick Links */}
          <div style={styles.section}>
            <h3 style={styles.heading}>Quick Links</h3>
            <ul style={styles.linkList}>
              <li>
                <Link to="/" style={styles.link} onClick={scrollToTop}>
                  <FaHome style={styles.linkIcon} />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cars" style={styles.link} onClick={scrollToTop}>
                  <FaCar style={styles.linkIcon} />
                  Cars
                </Link>
              </li>
              <li>
                <Link to="/places" style={styles.link} onClick={scrollToTop}>
                  <FaMapMarkerAlt style={styles.linkIcon} />
                  Places
                </Link>
              </li>
              <li>
                <Link to="/bookings" style={styles.link} onClick={scrollToTop}>
                  <FaUsers style={styles.linkIcon} />
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to="/about" style={styles.link} onClick={scrollToTop}>
                  <FaInfoCircle style={styles.linkIcon} />
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Places */}
          <div style={styles.section}>
            <h3 style={styles.heading}>Popular Destinations</h3>
            <ul style={styles.placeList}>
              <li style={styles.placeItem}>
                <span style={styles.placeIcon}>🏖️</span>
                <span>Goa - Beaches & Nightlife</span>
              </li>
              <li style={styles.placeItem}>
                <span style={styles.placeIcon}>🏔️</span>
                <span>Manali - Mountains & Adventure</span>
              </li>
              <li style={styles.placeItem}>
                <span style={styles.placeIcon}>🏛️</span>
                <span>Jaipur - Royal Heritage</span>
              </li>
              <li style={styles.placeItem}>
                <span style={styles.placeIcon}>🌊</span>
                <span>Kerala - Backwaters</span>
              </li>
              <li style={styles.placeItem}>
                <span style={styles.placeIcon}>🕌</span>
                <span>Agra - Taj Mahal</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div style={styles.section}>
            <h3 style={styles.heading}>Contact Us</h3>
            <div style={styles.contactInfo}>
              <div style={styles.contactItem}>
                <FaEnvelope style={styles.contactIcon} />
                <div>
                  <span style={styles.contactLabel}>Email</span>
                  <a
                    href="mailto:dhwanitourist@gmail.com"
                    style={styles.contactLink}
                  >
                    dhwanitourist@gmail.com
                  </a>
                </div>
              </div>
              <div style={styles.contactItem}>
                <FaPhone style={styles.contactIcon} />
                <div>
                  <span style={styles.contactLabel}>Phone</span>
                  <a href="tel:+919274713544" style={styles.contactLink}>
                    +91 92747 13544
                  </a>
                  <a href="tel:+919274713544" style={styles.contactLink}>
                    +91 
                  </a>
                </div>
              </div>
              <div style={styles.contactItem}>
                <FaMapMarkerAlt style={styles.contactIcon} />
                <div>
                  <span style={styles.contactLabel}>Address</span>
                  <span style={styles.contactText}>Gujarat, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div style={styles.bottom}>
          <p style={styles.bottomText}>
            © {currentYear} Dhwani Tourist. All Rights Reserved.
          </p>
          <div style={styles.bottomLinks}>
            <Link to="/privacy" style={styles.bottomLink}>
              <FaLock style={styles.bottomLinkIcon} />
              Privacy Policy
            </Link>
            <Link to="/terms" style={styles.bottomLink}>
              <FaInfoCircle style={styles.bottomLinkIcon} />
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        style={styles.backToTop}
        aria-label="Back to top"
      >
        ↑
      </button>
    </footer>
  );
};

// Fully Responsive Styles - Works on all devices
const styles = {
  footer: {
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    color: "#fff",
    marginTop: "60px",
    position: "relative",
  },
  container: {
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "50px 20px 20px",
  },
  topSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "40px",
    marginBottom: "40px",
  },
  section: {
    display: "flex",
    flexDirection: "column",
  },
  logoWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
    cursor: "pointer",
    transition: "transform 0.3s",
  },
  logoIcon: {
    fontSize: "32px",
    color: "#38bdf8",
  },
  logo: {
    fontSize: "clamp(24px, 4vw, 28px)",
    fontWeight: "bold",
    color: "#38bdf8",
    margin: 0,
  },
  description: {
    color: "#cbd5e1",
    lineHeight: "1.6",
    fontSize: "14px",
    marginBottom: "20px",
  },
  socials: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  socialLink: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s",
    textDecoration: "none",
    color: "#fff",
  },
  socialIcon: {
    fontSize: "18px",
  },
  heading: {
    fontSize: "clamp(18px, 3vw, 20px)",
    marginBottom: "18px",
    color: "#fff",
    fontWeight: "600",
    position: "relative",
    paddingBottom: "10px",
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
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "all 0.3s",
    fontSize: "14px",
    padding: "5px 0",
  },
  linkIcon: {
    fontSize: "14px",
  },
  placeList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  placeItem: {
    marginBottom: "12px",
    color: "#cbd5e1",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  placeIcon: {
    fontSize: "16px",
  },
  contactInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  contactItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    color: "#cbd5e1",
    fontSize: "14px",
  },
  contactIcon: {
    fontSize: "16px",
    marginTop: "2px",
    color: "#38bdf8",
  },
  contactLabel: {
    display: "block",
    fontSize: "12px",
    color: "#94a3b8",
    marginBottom: "4px",
  },
  contactLink: {
    color: "#cbd5e1",
    textDecoration: "none",
    transition: "color 0.3s",
    fontSize: "14px",
  },
  contactText: {
    color: "#cbd5e1",
    fontSize: "14px",
  },
  bottom: {
    borderTop: "1px solid rgba(255,255,255,0.1)",
    paddingTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px",
  },
  bottomText: {
    color: "#94a3b8",
    fontSize: "13px",
  },
  bottomLinks: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  bottomLink: {
    color: "#94a3b8",
    fontSize: "13px",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    transition: "color 0.3s",
  },
  bottomLinkIcon: {
    fontSize: "11px",
  },
  backToTop: {
    position: "fixed",
    bottom: "80px",
    right: "20px",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    backgroundColor: "#38bdf8",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    transition: "all 0.3s",
    zIndex: 100,
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  },
};

// Add hover effects and responsive styles
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  /* Hover Effects */
  .social-link:hover {
    background-color: #38bdf8 !important;
    transform: translateY(-3px);
  }
  
  .link:hover {
    color: #38bdf8 !important;
    transform: translateX(5px);
  }
  
  .contact-link:hover {
    color: #38bdf8 !important;
  }
  
  .bottom-link:hover {
    color: #38bdf8 !important;
  }
  
  .logo-wrapper:hover {
    transform: scale(1.05);
  }
  
  .back-to-top:hover {
    background-color: #0ea5e9 !important;
    transform: translateY(-3px);
  }
  
  /* Responsive Styles */
  @media (max-width: 1024px) {
    .top-section {
      gap: 30px;
    }
  }
  
  @media (max-width: 768px) {
    .container {
      padding: 40px 16px 20px;
    }
    
    .top-section {
      gap: 35px;
    }
    
    .section {
      text-align: center;
      align-items: center;
    }
    
    .logo-wrapper {
      justify-content: center;
    }
    
    .description {
      text-align: center;
    }
    
    .socials {
      justify-content: center;
    }
    
    .link {
      justify-content: center;
    }
    
    .place-item {
      justify-content: center;
    }
    
    .contact-item {
      justify-content: center;
    }
    
    .heading::after {
      left: 50%;
      transform: translateX(-50%);
    }
    
    .bottom {
      flex-direction: column;
      text-align: center;
    }
    
    .bottom-links {
      justify-content: center;
    }
    
    .back-to-top {
      bottom: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
      font-size: 20px;
    }
  }
  
  @media (max-width: 480px) {
    .container {
      padding: 30px 12px 20px;
    }
    
    .top-section {
      gap: 30px;
    }
    
    .logo {
      font-size: 22px;
    }
    
    .logo-icon {
      font-size: 28px;
    }
    
    .description {
      font-size: 13px;
    }
    
    .heading {
      font-size: 18px;
    }
    
    .link, .place-item, .contact-item {
      font-size: 13px;
    }
    
    .social-link {
      width: 35px;
      height: 35px;
    }
    
    .social-icon {
      font-size: 16px;
    }
    
    .bottom-text, .bottom-link {
      font-size: 11px;
    }
    
    .back-to-top {
      bottom: 70px;
      width: 38px;
      height: 38px;
      font-size: 18px;
    }
  }
  
  /* Add heading underline effect */
  .heading::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background: #38bdf8;
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    .heading::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
  
  /* Touch-friendly improvements */
  @media (max-width: 768px) {
    .social-link,
    .link,
    .bottom-link,
    .back-to-top {
      min-height: 44px;
      min-width: 44px;
    }
    
    .link {
      padding: 8px 0;
    }
  }
  
  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .footer {
      background: linear-gradient(135deg, #0a0f1a 0%, #1a1a2e 100%);
    }
  }
  
  /* Animations */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .section {
    animation: fadeInUp 0.5s ease;
  }
  
  /* Smooth scrolling for anchor links */
  html {
    scroll-behavior: smooth;
  }
  
  /* Print styles */
  @media print {
    .footer {
      display: none;
    }
  }
`;

document.head.appendChild(styleSheet);

export default Footer;
