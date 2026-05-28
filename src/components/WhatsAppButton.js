import React from "react";

const WhatsAppButton = () => {
  const phoneNumber = "919274713544";

  const displayNumber = "+91 92747 13544";

  const message = encodeURIComponent(
    "Hello! I'm interested in your travel services.",
  );

  const handleClick = () => {
    // Opens WhatsApp app if installed
    // Otherwise redirects to WhatsApp Web
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div style={styles.container}>
      {/* Phone Number */}
      <div style={styles.numberBox}>{displayNumber}</div>

      {/* WhatsApp Button */}
      <button
        onClick={handleClick}
        style={styles.whatsappButton}
        aria-label="Chat on WhatsApp"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          style={styles.whatsappIcon}
        />
      </button>
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    zIndex: 1000,
  },

  numberBox: {
    backgroundColor: "#ffffff",
    padding: "10px 16px",
    borderRadius: "30px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    fontWeight: "bold",
    color: "#333",
    fontSize: "14px",
  },

  whatsappButton: {
    backgroundColor: "#25D366",
    border: "none",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  whatsappIcon: {
    width: "35px",
    height: "35px",
  },
};

export default WhatsAppButton;
