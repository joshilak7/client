import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
    });

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Registration failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>Create an Account</h2>
          <p style={styles.subtitle}>Join us for amazing travel experiences</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={styles.alert}>
            <span style={styles.alertIcon}>⚠️</span>
            <span style={styles.alertText}>{error}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Name Field */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <FaUser style={styles.labelIcon} />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              style={styles.input}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Field */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <FaEnvelope style={styles.labelIcon} />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              style={styles.input}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone Field */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <FaPhone style={styles.labelIcon} />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="9876543210"
              style={styles.input}
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <small style={styles.helperText}>10-digit mobile number</small>
          </div>

          {/* Password Field */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <FaLock style={styles.labelIcon} />
              Password
            </label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                style={styles.passwordInput}
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                style={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <small style={styles.helperText}>Minimum 6 characters</small>
          </div>

          {/* Confirm Password Field */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <FaLock style={styles.labelIcon} />
              Confirm Password
            </label>
            <div style={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="••••••••"
                style={styles.passwordInput}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                style={styles.passwordToggle}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
          >
            {loading ? (
              <span style={styles.loadingSpinner}></span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            Already have an account?{" "}
            <Link to="/login" style={styles.link}>
              Login here
            </Link>
          </p>
          <p style={styles.terms}>
            By registering, you agree to our{" "}
            <Link to="/terms" style={styles.link}>
              Terms
            </Link>{" "}
            and{" "}
            <Link to="/privacy" style={styles.link}>
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Responsive Styles - Works on all devices
const styles = {
  container: {
    minHeight: "calc(100vh - 200px)",
    padding: (isMobile) => (isMobile ? "20px 16px" : "40px 20px"),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    maxWidth: "500px",
    width: "100%",
    backgroundColor: "#fff",
    padding: "30px 25px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "0",
  },
  alert: {
    backgroundColor: "#fee",
    border: "1px solid #fcc",
    borderRadius: "8px",
    padding: "12px 16px",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    animation: "shake 0.5s ease",
  },
  alertIcon: {
    fontSize: "20px",
  },
  alertText: {
    color: "#d32f2f",
    fontSize: "14px",
    flex: 1,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#555",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  labelIcon: {
    fontSize: "14px",
    color: "#007bff",
  },
  input: {
    padding: "12px 16px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    outline: "none",
    fontFamily: "inherit",
    width: "100%",
    boxSizing: "border-box",
  },
  passwordWrapper: {
    position: "relative",
    width: "100%",
  },
  passwordInput: {
    padding: "12px 45px 12px 16px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    outline: "none",
    fontFamily: "inherit",
    width: "100%",
    boxSizing: "border-box",
  },
  passwordToggle: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "44px",
    minHeight: "44px",
    color: "#666",
  },
  helperText: {
    fontSize: "12px",
    color: "#999",
    marginTop: "4px",
  },
  button: {
    width: "100%",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "10px",
    minHeight: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingSpinner: {
    display: "inline-block",
    width: "20px",
    height: "20px",
    border: "2px solid #fff",
    borderTopColor: "transparent",
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite",
  },
  footer: {
    marginTop: "25px",
    textAlign: "center",
  },
  footerText: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "10px",
  },
  terms: {
    fontSize: "12px",
    color: "#999",
    marginTop: "15px",
    lineHeight: "1.5",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "500",
  },
};

// Add animations and responsive styles
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  @keyframes shake {
    0%, 100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
    }
  }
  
  /* Input focus styles */
  input:focus {
    border-color: #007bff !important;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1) !important;
  }
  
  /* Button hover effect */
  button[type="submit"]:hover:not(:disabled) {
    background-color: #0056b3 !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }
  
  /* Link hover effect */
  a:hover {
    text-decoration: underline !important;
  }
  
  /* Responsive Styles */
  @media (max-width: 768px) {
    .form-container {
      padding: 25px 20px !important;
      margin: 0 16px;
    }
    
    h2 {
      font-size: 24px !important;
    }
    
    input,
    button {
      font-size: 16px !important; /* Prevents zoom on iOS */
    }
  }
  
  @media (max-width: 480px) {
    .form-container {
      padding: 20px 16px !important;
    }
    
    .title {
      font-size: 22px !important;
    }
    
    .form-group {
      gap: 6px !important;
    }
    
    input {
      padding: 10px 14px !important;
    }
    
    button {
      padding: 12px !important;
    }
  }
  
  /* Touch-friendly improvements */
  @media (max-width: 768px) {
    button,
    a,
    input,
    [role="button"] {
      min-height: 44px;
    }
    
    input,
    button {
      font-size: 16px;
    }
  }
  
  /* Tablet styles */
  @media (min-width: 769px) and (max-width: 1024px) {
    .form-container {
      max-width: 550px !important;
      padding: 35px 30px !important;
    }
  }
  
  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    body {
      background-color: #121212;
    }
  }
`;

document.head.appendChild(styleSheet);

export default Register;
