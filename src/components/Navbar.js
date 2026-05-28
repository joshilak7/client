import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaCar,
  FaMapMarkedAlt,
  FaUser,
  FaBars,
  FaTimes,
  FaHome,
  FaBook,
  FaPhone,
  FaInfoCircle,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* Navbar */}
      <nav
        style={{
          ...styles.navbar,
          backgroundColor: isScrolled ? "#fff" : "#fff",
          boxShadow: isScrolled
            ? "0 2px 10px rgba(0,0,0,0.1)"
            : "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div style={styles.container}>
          {/* Logo */}
          <Link to="/" style={styles.logo} onClick={closeMenu}>
            <span style={styles.logoText}>Dhwani Tourist</span>
          </Link>

          {/* Desktop Navigation */}
          {isDesktop && (
            <div style={styles.desktopNav}>
              <Link to="/" style={styles.link}>
                Home
              </Link>
              <Link to="/cars" style={styles.link}>
                Cars
              </Link>
              <Link to="/places" style={styles.link}>
                Places
              </Link>
              {user ? (
                <>
                  <Link to="/bookings" style={styles.link}>
                    My Bookings
                  </Link>
                  <span style={styles.userName}>
                    Hi, {user.name?.split(" ")[0]}
                  </span>
                  <button onClick={handleLogout} style={styles.logoutBtn}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" style={styles.link}>
                    Login
                  </Link>
                  <Link to="/register" style={styles.registerBtn}>
                    Register
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          {!isDesktop && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={styles.menuBtn}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {!isDesktop && isMenuOpen && (
        <div style={styles.overlay} onClick={closeMenu} />
      )}

      {/* Mobile Menu Panel */}
      {!isDesktop && (
        <div
          style={{
            ...styles.mobileMenu,
            transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
          }}
        >
          {/* Mobile Menu Header */}
          <div style={styles.mobileHeader}>
            <div style={styles.mobileLogo}>
              <span style={styles.mobileLogoText}>Dhwani Tourist</span>
            </div>
            <button
              onClick={closeMenu}
              style={styles.mobileCloseBtn}
              aria-label="Close menu"
            >
              <FaTimes size={24} />
            </button>
          </div>

          {/* User Info Section */}
          {user && (
            <div style={styles.mobileUserInfo}>
              <div style={styles.mobileUserIcon}>
                <FaUser size={24} />
              </div>
              <div>
                <div style={styles.mobileUserName}>{user.name}</div>
                <div style={styles.mobileUserEmail}>{user.email}</div>
              </div>
            </div>
          )}

          {/* Mobile Navigation Links */}
          <div style={styles.mobileNavLinks}>
            <Link to="/" style={styles.mobileLink} onClick={closeMenu}>
              <FaHome style={styles.mobileIcon} />
              Home
            </Link>
            <Link to="/cars" style={styles.mobileLink} onClick={closeMenu}>
              <FaCar style={styles.mobileIcon} />
              Cars
            </Link>
            <Link to="/places" style={styles.mobileLink} onClick={closeMenu}>
              <FaMapMarkedAlt style={styles.mobileIcon} />
              Places
            </Link>
            {user && (
              <Link
                to="/bookings"
                style={styles.mobileLink}
                onClick={closeMenu}
              >
                <FaBook style={styles.mobileIcon} />
                My Bookings
              </Link>
            )}
            <Link to="/contact" style={styles.mobileLink} onClick={closeMenu}>
              <FaPhone style={styles.mobileIcon} />
              Contact
            </Link>
            <Link to="/about" style={styles.mobileLink} onClick={closeMenu}>
              <FaInfoCircle style={styles.mobileIcon} />
              About
            </Link>
          </div>

          {/* Mobile Auth Buttons */}
          {!user ? (
            <div style={styles.mobileAuth}>
              <Link
                to="/login"
                style={styles.mobileLoginBtn}
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={styles.mobileRegisterBtn}
                onClick={closeMenu}
              >
                Register
              </Link>
            </div>
          ) : (
            <button onClick={handleLogout} style={styles.mobileLogoutBtn}>
              Logout
            </button>
          )}
        </div>
      )}
    </>
  );
};

// Styles object - defined once, not modified
const styles = {
  navbar: {
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    padding: "0.75rem 0",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    transition: "all 0.3s ease",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    textDecoration: "none",
    zIndex: 1001,
  },
  logoText: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#007bff",
  },
  desktopNav: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontSize: "1rem",
    fontWeight: "500",
    padding: "0.5rem 0",
    transition: "color 0.3s",
    cursor: "pointer",
  },
  userName: {
    color: "#007bff",
    fontWeight: "500",
    fontSize: "0.95rem",
  },
  logoutBtn: {
    padding: "0.5rem 1rem",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "0.375rem",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "500",
    transition: "all 0.3s",
    minHeight: "40px",
  },
  registerBtn: {
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "0.375rem",
    fontSize: "0.9rem",
    fontWeight: "500",
    transition: "all 0.3s",
    display: "inline-block",
  },
  menuBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "44px",
    minHeight: "44px",
    backgroundColor: "#f8f9fa",
    borderRadius: "0.375rem",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
  mobileMenu: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "85%",
    maxWidth: "320px",
    height: "100%",
    backgroundColor: "#fff",
    zIndex: 1000,
    transition: "transform 0.3s ease",
    boxShadow: "-2px 0 10px rgba(0,0,0,0.1)",
    overflowY: "auto",
  },
  mobileHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "#fff",
  },
  mobileLogo: {
    flex: 1,
  },
  mobileLogoText: {
    fontSize: "1.125rem",
    fontWeight: "bold",
    color: "#007bff",
  },
  mobileCloseBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "44px",
    minHeight: "44px",
    color: "#666",
  },
  mobileUserInfo: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "1rem",
    backgroundColor: "#f8f9fa",
    margin: "1rem",
    borderRadius: "0.5rem",
  },
  mobileUserIcon: {
    width: "48px",
    height: "48px",
    backgroundColor: "#007bff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  mobileUserName: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#333",
  },
  mobileUserEmail: {
    fontSize: "0.75rem",
    color: "#666",
    marginTop: "0.25rem",
  },
  mobileNavLinks: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1rem",
  },
  mobileLink: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.875rem 1rem",
    textDecoration: "none",
    color: "#333",
    fontSize: "1rem",
    fontWeight: "500",
    borderBottom: "1px solid #f0f0f0",
    transition: "background-color 0.3s",
  },
  mobileIcon: {
    color: "#007bff",
    fontSize: "1.25rem",
  },
  mobileAuth: {
    padding: "1rem",
    display: "flex",
    gap: "0.75rem",
    borderTop: "1px solid #e5e7eb",
    marginTop: "auto",
  },
  mobileLoginBtn: {
    flex: 1,
    padding: "0.75rem",
    backgroundColor: "#fff",
    color: "#007bff",
    textDecoration: "none",
    textAlign: "center",
    borderRadius: "0.375rem",
    fontWeight: "500",
    border: "1px solid #007bff",
    minHeight: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mobileRegisterBtn: {
    flex: 1,
    padding: "0.75rem",
    backgroundColor: "#007bff",
    color: "#fff",
    textDecoration: "none",
    textAlign: "center",
    borderRadius: "0.375rem",
    fontWeight: "500",
    minHeight: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mobileLogoutBtn: {
    margin: "1rem",
    padding: "0.75rem",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "0.375rem",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    width: "calc(100% - 2rem)",
    minHeight: "44px",
  },
};

// Add hover styles using a style tag
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  /* Hover effects */
  .nav-link-hover:hover {
    color: #007bff !important;
  }
  
  button:hover {
    opacity: 0.9;
  }
  
  .logout-btn:hover {
    background-color: #c82333 !important;
  }
  
  .register-btn:hover {
    background-color: #0056b3 !important;
  }
  
  .mobile-link-hover:hover {
    background-color: #f8f9fa !important;
  }
  
  /* Touch-friendly adjustments for mobile */
  @media (max-width: 767px) {
    button, 
    a,
    [role="button"] {
      min-height: 44px;
      min-width: 44px;
    }
  }
  
  /* Animation for overlay */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  .overlay {
    animation: fadeIn 0.3s ease;
  }
`;

document.head.appendChild(styleSheet);

export default Navbar;
