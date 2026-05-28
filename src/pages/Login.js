import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
} from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);

    // Load saved email if remember me was checked
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!formData.password) {
      setError("Password is required");
      return;
    }

    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      // Save email if remember me is checked
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      navigate("/");
    } else {
      setError(result.error || "Invalid email or password");
    }

    setLoading(false);
  };

  const handleSocialLogin = (provider) => {
    // Implement social login logic here
    console.log(`Login with ${provider}`);
    // You can integrate Google/Facebook OAuth here
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>✈️</span>
          </div>
          <h2 style={styles.title}>Welcome Back!</h2>
          <p style={styles.subtitle}>Sign in to continue your journey</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={styles.alert}>
            <span style={styles.alertIcon}>⚠️</span>
            <span style={styles.alertText}>{error}</span>
            <button
              style={styles.alertClose}
              onClick={() => setError("")}
              aria-label="Close error"
            >
              ×
            </button>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
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
              autoComplete="email"
            />
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
                autoComplete="current-password"
              />
              <button
                type="button"
                style={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div style={styles.options}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>Remember me</span>
            </label>
            <Link to="/forgot-password" style={styles.forgotLink}>
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
          >
            {loading ? <span style={styles.loadingSpinner}></span> : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div style={styles.divider}>
          <span style={styles.dividerLine}></span>
          <span style={styles.dividerText}>Or continue with</span>
          <span style={styles.dividerLine}></span>
        </div>

        {/* Social Login Buttons */}
        <div style={styles.socialButtons}>
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            style={styles.socialBtn}
            aria-label="Login with Google"
          >
            <FaGoogle style={styles.socialIcon} />
            <span style={styles.socialBtnText}>Google</span>
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("facebook")}
            style={styles.socialBtn}
            aria-label="Login with Facebook"
          >
            <FaFacebook style={styles.socialIcon} />
            <span style={styles.socialBtnText}>Facebook</span>
          </button>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            Don't have an account?{" "}
            <Link to="/register" style={styles.link}>
              Create Account
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
    padding: "20px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    maxWidth: "450px",
    width: "100%",
    backgroundColor: "#fff",
    padding: "30px 25px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  logo: {
    marginBottom: "16px",
  },
  logoIcon: {
    fontSize: "48px",
    display: "inline-block",
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
    borderRadius: "10px",
    padding: "12px 16px",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    position: "relative",
  },
  alertIcon: {
    fontSize: "18px",
  },
  alertText: {
    color: "#d32f2f",
    fontSize: "14px",
    flex: 1,
  },
  alertClose: {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#999",
    padding: "0 4px",
    minWidth: "30px",
    minHeight: "30px",
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
    borderRadius: "10px",
    transition: "all 0.3s ease",
    outline: "none",
    fontFamily: "inherit",
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#fff",
  },
  passwordWrapper: {
    position: "relative",
    width: "100%",
  },
  passwordInput: {
    padding: "12px 45px 12px 16px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    transition: "all 0.3s ease",
    outline: "none",
    fontFamily: "inherit",
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#fff",
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
    minWidth: "40px",
    minHeight: "40px",
    color: "#666",
  },
  options: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "-5px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#666",
  },
  checkbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
    margin: 0,
  },
  checkboxText: {
    userSelect: "none",
  },
  forgotLink: {
    fontSize: "14px",
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "500",
  },
  button: {
    width: "100%",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
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
  divider: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    margin: "25px 0 20px",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    backgroundColor: "#e0e0e0",
  },
  dividerText: {
    padding: "0 15px",
    fontSize: "12px",
    color: "#999",
    textTransform: "uppercase",
  },
  socialButtons: {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
  },
  socialBtn: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    minHeight: "44px",
  },
  socialIcon: {
    fontSize: "18px",
  },
  socialBtnText: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#555",
  },
  footer: {
    marginTop: "20px",
    textAlign: "center",
  },
  footerText: {
    fontSize: "14px",
    color: "#666",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "600",
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
  
  /* Input focus styles */
  input:focus {
    border-color: #007bff !important;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1) !important;
  }
  
  /* Button hover effects */
  button[type="submit"]:hover:not(:disabled) {
    background-color: #0056b3 !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }
  
  .social-btn:hover {
    background-color: #f8f9fa !important;
    border-color: #007bff !important;
    transform: translateY(-1px);
  }
  
  /* Link hover effects */
  a:hover {
    text-decoration: underline !important;
  }
  
  .forgot-link:hover {
    color: #0056b3 !important;
  }
  
  /* Responsive Styles - Mobile First */
  @media (max-width: 768px) {
    .form-container {
      padding: 25px 20px !important;
    }
    
    .title {
      font-size: 24px !important;
    }
    
    input,
    button {
      font-size: 16px !important; /* Prevents zoom on iOS */
    }
    
    .social-btn-text {
      font-size: 13px !important;
    }
  }
  
  @media (max-width: 480px) {
    .form-container {
      padding: 20px 16px !important;
      margin: 0 10px;
    }
    
    .title {
      font-size: 22px !important;
    }
    
    .subtitle {
      font-size: 13px !important;
    }
    
    input {
      padding: 10px 14px !important;
    }
    
    button {
      padding: 12px !important;
    }
    
    .social-buttons {
      gap: 8px !important;
    }
    
    .social-btn {
      padding: 10px !important;
    }
    
    .social-btn-text {
      display: none !important;
    }
    
    .social-icon {
      font-size: 20px !important;
    }
  }
  
  /* Touch-friendly improvements for all mobile devices */
  @media (max-width: 768px) {
    button,
    a,
    input,
    [role="button"] {
      min-height: 44px;
    }
    
    input,
    button {
      font-size: 16px !important;
    }
    
    .password-toggle {
      min-width: 44px !important;
      min-height: 44px !important;
    }
    
    .checkbox {
      width: 20px !important;
      height: 20px !important;
    }
  }
  
  /* Tablet styles */
  @media (min-width: 769px) and (max-width: 1024px) {
    .form-container {
      max-width: 500px !important;
      padding: 35px 30px !important;
    }
    
    .title {
      font-size: 26px !important;
    }
  }
  
  /* Landscape mode for phones */
  @media (max-width: 768px) and (orientation: landscape) {
    .container {
      min-height: auto !important;
      padding: 30px 16px !important;
    }
    
    .form-container {
      margin: 20px auto !important;
    }
  }
  
  /* High-resolution displays */
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .form-container {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }
  
  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    body {
      background-color: #121212;
    }
  }
  
  /* Accessibility - Reduce motion */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  
  /* High contrast mode */
  @media (prefers-contrast: high) {
    .form-container {
      border: 2px solid #000;
    }
    
    input {
      border: 2px solid #000;
    }
    
    button {
      border: 2px solid #fff;
    }
  }
  
  /* Specific device optimizations */
  
  /* iPhone SE, 6, 7, 8 */
  @media (max-width: 375px) {
    .title {
      font-size: 20px !important;
    }
    
    .subtitle {
      font-size: 12px !important;
    }
    
    .label {
      font-size: 13px !important;
    }
  }
  
  /* iPhone 12, 13, 14, 15 Pro Max */
  @media (max-width: 430px) and (min-width: 390px) {
    .form-container {
      padding: 25px 20px !important;
    }
  }
  
  /* Samsung Galaxy S20, S21, S22, S23 series */
  @media (max-width: 412px) and (min-width: 360px) {
    .form-container {
      padding: 20px 16px !important;
    }
    
    .options {
      font-size: 13px !important;
    }
  }
  
  /* Google Pixel series */
  @media (max-width: 412px) {
    .social-btn-text {
      display: inline !important;
      font-size: 12px !important;
    }
  }
  
  /* OnePlus devices */
  @media (max-width: 414px) {
    input, button {
      font-size: 14px !important;
    }
  }
  
  /* Foldable devices */
  @media (max-width: 280px) {
    .form-container {
      padding: 15px 12px !important;
    }
    
    .title {
      font-size: 18px !important;
    }
    
    .options {
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;
    }
  }
`;

document.head.appendChild(styleSheet);

export default Login;
